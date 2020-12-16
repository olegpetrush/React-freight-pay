import Unit from './Unit'
import DwollaWebhookLogEntity from '../entities/DwollaWebhookLog'

function DwollaWebhookLog(db: any): void {
  this.entity = DwollaWebhookLogEntity
  this.relations = [
    { name: 'DwollaWebhookLog.organization', alias: 'organization' },
    { name: 'DwollaWebhookLog.user', alias: 'user' }
  ]
  this.db = db
  Unit.call(this, this.entity, this.relations, this.db)
}

DwollaWebhookLog.prototype = Object.create(Unit.prototype)

export default (db: any) => new DwollaWebhookLog(db)
