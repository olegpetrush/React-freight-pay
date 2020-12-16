import { Entity, Column } from "typeorm";

import Log from "./BaseEntities/Log";

@Entity()
export default class DwollaWebhookLog extends Log {
  @Column("text", { nullable: true })
  eventId: string;

  @Column("text", { nullable: true })
  resourceId: string;

  @Column("text", { nullable: true })
  topic: string;

  @Column("jsonb", { nullable: true })
  event: object;
}
