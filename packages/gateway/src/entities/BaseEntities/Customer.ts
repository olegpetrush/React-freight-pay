import { PrimaryColumn, Column } from "typeorm";

import Base from "./Base";

export default abstract class Customer extends Base {
  @PrimaryColumn("text")
  id: string;

  @Column("text", { nullable: true })
  dwollaCustomerId: string;

  @Column("text", { nullable: true })
  picture: string;
}
