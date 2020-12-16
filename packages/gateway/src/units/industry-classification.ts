import Unit from './Unit'
import IndustryClassificationEntity from '../entities/IndustryClassification'

function IndustryClassification(db: any): void {
  this.entity = IndustryClassificationEntity
  this.relations = [
    {
      name: 'IndustryClassification.businessClassification',
      alias: 'businessClassification'
    }
  ]
  this.db = db
  Unit.call(this, this.entity, this.relations, this.db)
}

IndustryClassification.prototype = Object.create(Unit.prototype)

export default (db: any) => new IndustryClassification(db)
