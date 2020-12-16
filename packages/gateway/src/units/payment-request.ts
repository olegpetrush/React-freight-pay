import Unit from './Unit'
import PaymentRequestEntity from '../entities/PaymentRequest'

function PaymentRequest(db: any): void {
  this.entity = PaymentRequestEntity
  this.relations = [
    // { name: 'Organization.userToOrganizations', alias: 'userToOrganization' },
    // { name: 'userToOrganization.user', alias: 'user' },
    // { name: 'Organization.clients', alias: 'client' },
    // { name: 'client.organization', alias: 'organization' },
  ]
  this.db = db
  Unit.call(this, this.entity, this.relations, this.db)
}

PaymentRequest.prototype = Object.create(Unit.prototype)

export default (db: any) => new PaymentRequest(db)
