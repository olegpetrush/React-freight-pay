const Queue = require("bull");

const REDIS_URL = process.env.REDIS_URL;
import { QUEUES } from "../../gateway/src/utils/constants";

export const DwollaQueue = new Queue(QUEUES.DWOLLA, REDIS_URL);

export default {
  DwollaQueue,
};
