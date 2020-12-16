import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";

import Customer from "./Customer";
import { CUSTOMER_STATUSES } from "../utils/constants";

@Entity()
export default class CustomerStatus {
  @PrimaryColumn("text")
  id: string;

  @Column("enum", {
    enum: CUSTOMER_STATUSES,
    default: CUSTOMER_STATUSES.NO_CUSTOMER,
  })
  status: CUSTOMER_STATUSES;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.customerStatuses)
  @JoinColumn()
  customer: Customer;
}
