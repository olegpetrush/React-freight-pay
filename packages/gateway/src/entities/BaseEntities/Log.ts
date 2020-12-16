import { ManyToOne, JoinColumn } from "typeorm";

import Base from "./Base";
import Organization from "../Organization";
import User from "../User";

export default abstract class Log extends Base {
  @ManyToOne(() => Organization)
  @JoinColumn()
  organization: Organization;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
