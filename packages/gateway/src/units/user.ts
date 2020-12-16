import Unit from './Unit'
import UserEntity from '../entities/User'

function User(db: any): void {
  this.entity = UserEntity
  this.relations = [
    { name: 'User.userToOrganizations', alias: 'userToOrganizations' },
    { name: 'userToOrganizations.organization', alias: 'organization' }
  ]
  this.db = db
  Unit.call(this, this.entity, this.relations, this.db)
}

User.prototype = Object.create(Unit.prototype)

export default (db: any) => new User(db)
