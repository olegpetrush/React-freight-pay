import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import Base from "./BaseEntities/Base";
import Organization from "./Organization";
import User from "./User";
import Client from "./Client";
import ClientContact from "./Contact/ClientContact";

@Entity()
export default class PaymentRequest extends Base {
  @Column("text")
  description: string;

  @Column("decimal")
  amount: number;

  @Column("text", { nullable: true })
  invoiceNumber: string;

  @Column("date", { nullable: true })
  dueDate: Date;

  @ManyToOne(() => Organization, (organization) => organization.paymentRequests)
  organization: Organization;

  @ManyToOne(() => User, (user) => user.paymentRequestsCreated)
  createdBy: User;

  @ManyToOne(() => Client, (client) => client.paymentRequests)
  @JoinColumn()
  client: Client;

  @ManyToMany(() => ClientContact, (contact) => contact.paymentRequests, {
    cascade: true,
  })
  @JoinTable({
    name: "payment_request_contacts",
  })
  contacts: ClientContact[];
}
