import cuid from "cuid";
import { CUSTOMER_STATUSES, DEPENDENCIES } from "../../utils/constants";

export default class CustomerCreated {
  container: any = {};
  constructor(container: any) {
    this.container = container;
  }

  async updateStatuses(data: any) {
    const { userId } = data;
    await this.container.get(DEPENDENCIES.USER_STATUS_REPOSITORY).create({
      id: cuid(),
      status: CUSTOMER_STATUSES.UNVERIFIED,
      user: { id: userId },
    });
    return this.container
      .get(DEPENDENCIES.USER_REPOSITORY)
      .update({ id: userId }, { status: CUSTOMER_STATUSES.UNVERIFIED });
  }
}
