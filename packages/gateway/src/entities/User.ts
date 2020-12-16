import { Entity, Column, OneToMany, AfterLoad } from 'typeorm'
import { trim } from 'lodash'

import Customer from './BaseEntities/Customer'
import Address from './Address'
import UserToOrganization from './UserToOrganization'
import Client from './Client'
import PaymentRequest from './PaymentRequest'
import DwollaResponseLog from './DwollaResponseLog'

@Entity()
export default class User extends Customer {
  fullName: string

  @AfterLoad()
  getFullName() {
    this.fullName = trim(`${this.firstName} ${this.lastName}`)
  }

  @Column('text', { unique: true })
  auth0UserId: string

  @Column('text', { unique: true })
  email: string

  @Column('boolean', { default: false })
  emailVerified: boolean

  @Column('text', { nullable: true })
  firstName: string

  @Column('text', { nullable: true })
  lastName: string

  @OneToMany(() => Address, address => address.user)
  address: Address

  @OneToMany(
    () => UserToOrganization,
    userToOrganization => userToOrganization.user
  )
  userToOrganizations: UserToOrganization[]

  @OneToMany(() => Client, client => client.createdBy)
  clientsCreated: Client[]

  @OneToMany(() => PaymentRequest, paymentRequest => paymentRequest.createdBy)
  paymentRequestsCreated: PaymentRequest[]

  @OneToMany(
    () => DwollaResponseLog,
    dwollaResponseLog => dwollaResponseLog.user
  )
  dwollaResponseLogs: DwollaResponseLog[]
}
