import { Entity, Column, OneToMany } from "typeorm";

import Base from "./BaseEntities/Base";
import IndustryClassification from "./IndustryClassification";

@Entity()
export default class BusinessClassification extends Base {
  @Column("text")
  name: string;

  @OneToMany(
    () => IndustryClassification,
    (industryClassification) => industryClassification.businessClassification
  )
  industryClassifications: IndustryClassification[];
}
