import Unit from './Unit'
import ContactEntity from '../entities/Contact/Contact'

function Contact(db: any): void {
  this.entity = ContactEntity
  this.relations = [
    { name: 'Contact.organization', alias: 'organization' },
    { name: 'Contact.address', alias: 'address' }
  ]
  this.db = db
  Unit.call(this, this.entity, this.relations, this.db)
}

Contact.prototype = Object.create(Unit.prototype)

export default (db: any) => new Contact(db)
