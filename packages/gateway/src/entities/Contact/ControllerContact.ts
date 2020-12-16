import { ChildEntity, Column, ManyToOne, JoinColumn } from "typeorm";

import Contact from "./Contact";
import Address from "../Address";
import Organization from "../Organization";

@ChildEntity()
export default class ControllerContact extends Contact {
  @Column("text", { nullable: true })
  ssn: string;

  @Column("text", { nullable: true })
  dateOfBirth: string;

  @Column("text", { nullable: true })
  title: string;

  @ManyToOne(() => Organization, (organization) => organization.controller, {
    nullable: true,
  })
  @JoinColumn()
  organization: Organization;

  @ManyToOne(() => Address, (address) => address.controller, { nullable: true })
  @JoinColumn()
  address: Address;
}
