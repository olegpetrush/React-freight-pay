import { Entity, Column, ManyToOne, OneToMany } from "typeorm";

import Base from "./BaseEntities/Base";
import Organization from "./Organization";
import User from "./User";
import Client from "./Client";
import ControllerContact from "./Contact/ControllerContact";

@Entity()
export default class Address extends Base {
  @Column("text", { nullable: true })
  name: string;

  @Column("text", { nullable: true })
  address1: string;

  @Column("text", { nullable: true })
  address2: string;

  @Column("text", { nullable: true })
  address3: string;

  @Column("text")
  city: string;

  @Column("text")
  stateProvinceRegion: string;

  @Column("text")
  postalCode: string;

  @Column("text")
  country: string;

  @OneToMany(() => Organization, (organization) => organization.address)
  organization: Organization;

  @ManyToOne(() => User, (user) => user.address)
  user: User;

  @ManyToOne(() => Client, (client) => client.address)
  client: Client;

  @OneToMany(() => ControllerContact, (contact) => contact.address)
  controller: ControllerContact;
}
