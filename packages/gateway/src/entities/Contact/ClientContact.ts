import {
  ChildEntity,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import Contact from './Contact'
import PaymentRequest from '../PaymentRequest'
import Client from '../Client'

@ChildEntity()
export default class ClientContact extends Contact {
  @Column('text', { nullable: true })
  ssn: string

  @Column('text', { nullable: true })
  dateOfBirth: string

  @Column('text', { nullable: true })
  title: string

  @ManyToOne(() => Client, client => client.contacts, { nullable: true })
  @JoinColumn()
  client: Client

  @ManyToMany(() => PaymentRequest, paymentRequest => paymentRequest.contacts)
  @JoinTable({
    name: 'payment_request_contacts'
  })
  paymentRequests: PaymentRequest[]
}
