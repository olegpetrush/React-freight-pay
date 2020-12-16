import Unit from './Unit'
import BusinessClassificationEntity from '../entities/BusinessClassification'

function BusinessClassification(db: any): void {
  this.entity = BusinessClassificationEntity
  this.relations = [
    {
      name: 'BusinessClassification.industryClassifications',
      alias: 'industryClassifications'
    }
  ]
  this.db = db
  Unit.call(this, this.entity, this.relations, this.db)
}

BusinessClassification.prototype = Object.create(Unit.prototype)

export default (db: any) => new BusinessClassification(db)
