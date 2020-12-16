require("dotenv").config({
  path: require("path").resolve(__dirname, "../../", ".env"),
});

import startQueueWorkers from "./queue";
import startSchedulerWorkers from "./scheduler";

const startWorkers = () => {
  startQueueWorkers();
  startSchedulerWorkers();
};

startWorkers();
