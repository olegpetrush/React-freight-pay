import { Entity, Column } from 'typeorm'

import { DWOLLA_ACTION_TYPES } from '../utils/constants'

import Log from './BaseEntities/Log'

@Entity()
export default class DwollaResponseLog extends Log {
  @Column('enum', { enum: DWOLLA_ACTION_TYPES })
  type: string

  @Column('jsonb', { nullable: true })
  request: Record<string, unknown>

  @Column('jsonb', { nullable: true })
  responseBody: Record<string, unknown>

  @Column('jsonb', { nullable: true })
  responseHeaders: Record<string, unknown>

  @Column('decimal', { nullable: true })
  status: number
}
