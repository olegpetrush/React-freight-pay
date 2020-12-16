import Unit from './Unit'
import OrganizationEntity from '../entities/Organization'

function Organization(db: any): void {
  this.entity = OrganizationEntity
  this.relations = [
    { name: 'Organization.userToOrganizations', alias: 'userToOrganization' },
    { name: 'userToOrganization.user', alias: 'user' },
    { name: 'Organization.clients', alias: 'client' },
    { name: 'client.organization', alias: 'organization' },
    { name: 'Organization.address', alias: 'address' }
  ]
  this.db = db
  Unit.call(this, this.entity, this.relations, this.db)
}

Organization.prototype = Object.create(Unit.prototype)

export default (db: any) => new Organization(db)
