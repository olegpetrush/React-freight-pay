import { Entity, Column, ManyToOne, OneToMany } from "typeorm";

import Base from "./BaseEntities/Base";
import BusinessClassification from "./BusinessClassification";
import Organization from "./Organization";

@Entity()
export default class IndustryClassification extends Base {
  @Column("text")
  name: string;

  @ManyToOne(
    () => BusinessClassification,
    (businessClassification) => businessClassification.industryClassifications
  )
  businessClassification: BusinessClassification;

  @OneToMany(
    () => Organization,
    (organization) => organization.industryClassification
  )
  organization: Organization;
}
