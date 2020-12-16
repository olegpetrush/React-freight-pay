import { isEmpty, isNil, get } from 'lodash'
import { getConnection, getRepository } from 'typeorm'
import cuid from 'cuid'

import sqlHelper from '../utils/sql-helper'

const { createSqlFilter } = sqlHelper

async function Unit(entity: any, relations: any, db?: any) {
  this.entity = entity
  this.relations = relations
  this.db = db
}

Unit.prototype = {
  create(data: any) {
    const repository = getRepository(this.entity)
    return repository.save(data)
  },
  async createMany(items: any) {
    const connection = await getConnection()
    return connection.manager.save(
      items.map((item: any) => {
        const { id = cuid(), ...rest } = item
        return Object.assign(new this.entity(), { id, ...rest })
      })
    )
  },
  async update(object: any, data: any) {
    const { updatedAt, ...rest } = data
    const connection = await getConnection()
    await connection.manager
      .createQueryBuilder()
      .update(this.entity)
      .set(rest)
      .where('id = :id', { id: object.id })
      .execute()
    return this.getOne({ id: object.id.toString() })
  },
  delete(where: any) {
    return getConnection()
      .createQueryBuilder()
      .delete()
      .from(this.entity)
      .where('id = :id', { id: where.id })
      .execute()
  },
  async get({ skip = 0, take = 20, gt, lt, like, isIn, ...where }: any) {
    const connection = getConnection()
    const name = this.entity.name

    let query = connection.manager.createQueryBuilder(this.entity, name)
    query = this.addQueryJoins(query, this.relations)
    query = await this.addQueryConditions(name, query, {
      gt,
      lt,
      like,
      isIn,
      where
    })

    const result = await query.skip(skip).take(take).getManyAndCount()

    const data = result[0]
    const count = result[1]
    return {
      data,
      count
    }
  },
  async getOne(where: any, orderBy = {}) {
    const connection = getConnection()
    const { name } = connection.getMetadata(this.entity)

    let query = connection.manager.createQueryBuilder(this.entity, name)
    query = this.addQueryJoins(query, this.relations)
    query = await this.addQueryConditions(name, query, { where })

    const result = await query.orderBy(orderBy).getOne()
    return result
  },
  contextualizedConnection() {
    const track = this.db.getTrack()
    return track ? new Promise(resolve => resolve(track)) : getConnection()
  },
  formatError: (error: any) => {
    if (error.detail) {
      return {
        message: `Database Error : ${error.detail}`
      }
    }
    return {
      message: `Database Error : ${error.message}`
    }
  },
  async addQueryConditions(alias: any, query: any, filters: any) {
    const { where, gt, lt, like, isIn } = filters

    let result = query
    const connection = await getConnection()
    const metadata = connection.getMetadata(this.entity)

    let conditionAdded = false
    if (where && !isEmpty(where)) {
      const condition = createSqlFilter(where, '=', metadata)
      if (condition !== '') {
        result = result.where(`(${condition})`)
        conditionAdded = true
      }
    }
    if (gt && !isEmpty(gt)) {
      const condition = createSqlFilter(gt, '>', metadata)
      if (condition !== '') {
        if (conditionAdded) result = result.andWhere(`(${condition})`)
        else result = result.where(`(${condition})`)
        conditionAdded = true
      }
    }
    if (lt && !isEmpty(lt)) {
      const condition = createSqlFilter(lt, '<', metadata)
      if (condition !== '') {
        if (conditionAdded) result = result.andWhere(`(${condition})`)
        else result = result.where(`(${condition})`)
        conditionAdded = true
      }
    }
    if (like && !isEmpty(like)) {
      const condition = createSqlFilter(like, 'LIKE', metadata)
      if (condition !== '') {
        if (conditionAdded) result = result.andWhere(`(${condition})`)
        else result = result.where(`(${condition})`)
        conditionAdded = true
      }
    }
    if (isIn && !isEmpty(isIn)) {
      result.andWhere(`${alias}.${Object.keys(isIn)[0]} IN (:...isIn)`, {
        isIn: Object.values(isIn)[0]
      })
      conditionAdded = true
    }
    return result
  },
  addQueryJoins(query: any, relations: any = this.relations) {
    const result = query
    relations.forEach(({ name, alias }: any) =>
      result.leftJoinAndSelect(name, alias)
    )
    return result
  },
  addQueryJoinsWithoutSelect(query: any, relations: any = this.relations) {
    const result = query
    relations.forEach(({ name, alias }: any) => result.leftJoin(name, alias))
    return result
  },
  async rawToObject(raw: any) {
    const connection = await getConnection()
    const metadatas = connection.getMetadata(this.entity).columns

    const result: any = {}
    metadatas.forEach((metadata: any) => {
      if (
        !isNil(get(metadata, 'relationMetadata.isManyToOne')) &&
        raw[metadata.databaseName]
      ) {
        return (result[metadata.propertyName] = {
          id: raw[metadata.databaseName]
        })
      }
      result[metadata.propertyName] = raw[metadata.databaseName]
    })
    return result
  }
}

export default Unit
