import "reflect-metadata";
import {
  createConnection,
  Connection,
  DeleteResult,
  ConnectionOptions,
} from "typeorm";

class DB {
  connection: Connection;
  options: ConnectionOptions;
  context: any;
  tracked: any = {};

  constructor(options: ConnectionOptions, context: any) {
    this.options = options;
    this.context = context;
  }

  async connect(): Promise<Connection> {
    this.connection = await createConnection(this.options);
    return this.connection;
  }

  getConnection(): Connection {
    if (!this.connection)
      throw Error("no database connection, make sure to connect");
    return this.connection;
  }

  async clearTable(name: string): Promise<DeleteResult> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(name)
      .execute();
    return result;
  }

  setTrack(queryRunner: any) {
    return this.context.set("queryRunner", queryRunner);
  }

  getTrack() {
    return this.context.get("queryRunner");
  }
}

export default DB;
