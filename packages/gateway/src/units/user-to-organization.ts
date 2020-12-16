import Unit from './Unit'
import UserToOrganizationEntity from '../entities/UserToOrganization'

function UserToOrganization(db: any): void {
  this.entity = UserToOrganizationEntity
  this.relations = [
    { name: 'UserToOrganization.user', alias: 'user' },
    { name: 'UserToOrganization.organization', alias: 'organization' }
  ]
  this.db = db
  Unit.call(this, this.entity, this.relations, this.db)
}

UserToOrganization.prototype = Object.create(Unit.prototype)

export default (db: any) => new UserToOrganization(db)
