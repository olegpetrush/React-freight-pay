const Queue = require("bull");

import { REDIS_URL } from "../../config/vars";
import { QUEUES } from "../utils/constants";

export const DwollaQueue = new Queue(QUEUES.DWOLLA, REDIS_URL);

export default {
  DwollaQueue,
};
