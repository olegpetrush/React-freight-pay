import { Entity, Column, ManyToOne } from "typeorm";

import Base from "./BaseEntities/Base";
import User from "./User";
import Organization from "./Organization";

import { ORGANIZATION_ROLES } from "../utils/constants";

@Entity()
export default class UserToOrganization extends Base {
  @Column("enum", {
    enum: ORGANIZATION_ROLES,
    default: ORGANIZATION_ROLES.MEMBER,
  })
  role: string;

  @ManyToOne(() => User, (user) => user.userToOrganizations)
  user!: User;

  @ManyToOne(
    () => Organization,
    (organization) => organization.userToOrganizations
  )
  organization!: Organization;
}
