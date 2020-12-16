import Unit from './Unit'
import ClientEntity from '../entities/Client'

function Client(db: any): void {
  this.entity = ClientEntity
  this.relations = [
    { name: 'Client.organization', alias: 'organization' },
    // { name: 'Client.address', alias: 'address' },
    { name: 'Client.createdBy', alias: 'createdBy' }
  ]
  this.db = db
  Unit.call(this, this.entity, this.relations, this.db)
}

Client.prototype = Object.create(Unit.prototype)

export default (db: any) => new Client(db)
