import Unit from './Unit'
import DwollaResponseLogEntity from '../entities/DwollaResponseLog'

function DwollaResponseLog(db: any): void {
  this.entity = DwollaResponseLogEntity
  this.relations = [
    { name: 'DwollaResponseLog.organization', alias: 'organization' },
    { name: 'DwollaResponseLog.user', alias: 'user' }
  ]
  this.db = db
  Unit.call(this, this.entity, this.relations, this.db)
}

DwollaResponseLog.prototype = Object.create(Unit.prototype)

export default (db: any) => new DwollaResponseLog(db)
