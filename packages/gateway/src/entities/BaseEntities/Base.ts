const cuid = require("cuid");
import {
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from "typeorm";
import { isNil } from "lodash";

export default abstract class Base {
  @BeforeInsert()
  updateId() {
    console.log("update ID");
    if (isNil(this.id)) this.id = cuid();
  }

  @PrimaryColumn("text")
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
