import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";

import Customer from "./BaseEntities/Customer";
import Address from "./Address";
import UserToOrganization from "./UserToOrganization";
import Client from "./Client";
import ControllerContact from "./Contact/ControllerContact";
import PaymentRequest from "./PaymentRequest";
import DwollaResponseLog from "./DwollaResponseLog";
import IndustryClassification from "./IndustryClassification";

@Entity()
export default class Organization extends Customer {
  @Column("text")
  name: string;

  @Column("text", { unique: true })
  alias: string;

  @ManyToOne(() => Address, (address) => address.organization)
  @JoinColumn()
  address: Address;

  @OneToMany(() => ControllerContact, (contact) => contact.organization)
  controller: ControllerContact;

  @OneToMany(
    () => UserToOrganization,
    (userToOrganization) => userToOrganization.organization
  )
  userToOrganizations: UserToOrganization[];

  @OneToMany(() => Client, (client) => client.organization)
  clients: Client[];

  @OneToMany(
    () => PaymentRequest,
    (paymentRequest) => paymentRequest.organization
  )
  paymentRequests: PaymentRequest[];

  @OneToMany(
    () => DwollaResponseLog,
    (dwollaResponseLog) => dwollaResponseLog.organization
  )
  dwollaResponseLogs: DwollaResponseLog[];

  @ManyToOne(
    () => IndustryClassification,
    (industryClassification) => industryClassification.organization
  )
  industryClassification: IndustryClassification;
}
