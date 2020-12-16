import Unit from './Unit'
import ControllerContactEntity from '../entities/Contact/ControllerContact'

function ControllerContact(db: any): void {
  this.entity = ControllerContactEntity
  this.relations = [
    { name: 'ControllerContact.organization', alias: 'organization' },
    { name: 'ControllerContact.address', alias: 'address' }
  ]
  this.db = db
  Unit.call(this, this.entity, this.relations, this.db)
}

ControllerContact.prototype = Object.create(Unit.prototype)

export default (db: any) => new ControllerContact(db)
