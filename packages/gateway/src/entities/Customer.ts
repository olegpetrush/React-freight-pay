import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany
} from 'typeorm'

import { CUSTOMER_TYPES } from '../utils/constants'

import CustomerStatus from './CustomerStatus'

@Entity()
export default class Customer {
  @PrimaryColumn('text')
  id: string

  @Column('enum', { enum: CUSTOMER_TYPES, default: CUSTOMER_TYPES.USER })
  customerType: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @OneToMany(() => CustomerStatus, customerStatus => customerStatus.customer)
  @JoinColumn()
  customerStatuses: CustomerStatus
}
