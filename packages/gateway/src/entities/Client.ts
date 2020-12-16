import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import Base from "./BaseEntities/Base";
import Organization from "./Organization";
import Address from "./Address";
import User from "./User";
import ClientContact from "./Contact/ClientContact";
import PaymentRequest from "./PaymentRequest";

@Entity()
export default class Client extends Base {
  @Column("text", { nullable: true }) // Company Name
  name: string;

  @Column("text", { nullable: true })
  phone: string;

  @Column("text", { nullable: true })
  email: string;

  @ManyToOne(() => Organization, (organization) => organization.clients)
  @JoinColumn()
  organization: Organization;

  @ManyToOne(() => Address, (address) => address.client, { nullable: true })
  @JoinColumn()
  address: Address;

  @ManyToOne(() => User, (user) => user.clientsCreated, { nullable: true })
  @JoinColumn()
  createdBy: User;

  @OneToMany(() => ClientContact, (contact) => contact.client)
  contacts: ClientContact[];

  @ManyToOne(() => PaymentRequest, (paymentRequest) => paymentRequest.client)
  paymentRequests: PaymentRequest[];
}
