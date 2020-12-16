import Unit from './Unit'
import AddressEntity from '../entities/Address'

function Address(db: any): void {
  this.entity = AddressEntity
  this.relations = [
    // { name: 'Address.organization', alias: 'organization' },
    // { name: 'Address.address', alias: 'address' },
    // { name: 'Address.user', alias: 'user' },
    // { name: 'Address.contact', alias: 'contact' },
  ]
  this.db = db
  Unit.call(this, this.entity, this.relations, this.db)
}

Address.prototype = Object.create(Unit.prototype)

export default (db: any) => new Address(db)
