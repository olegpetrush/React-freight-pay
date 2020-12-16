import { CronJob } from "cron";

import registerDependencies from "../../services/register-dependencies";

import {
  checkDwollaWebhookSubscription,
  updateDwollaBusinessClassifications,
} from "./dwolla";

const startSchedulerWorkers = async () => {
  const container = await registerDependencies();

  const everyMinute = () => {};
  const everySecond = () => {};
  const everyTwentySeconds = () => {};
  const everyHour = () => {
    checkDwollaWebhookSubscription(container);
  };
  const everyDay = () => {
    updateDwollaBusinessClassifications(container);
  };

  const crons = [
    new CronJob("* * * * * *", () => everySecond()),
    new CronJob("*/20 * * * * *", () => everyTwentySeconds()),
    new CronJob("* * * * *", everyMinute),
    new CronJob("0 * * * *", () => everyHour()),
    new CronJob("0 0 * * *", () => everyDay()),
  ];
  crons.forEach((cron) => cron.start());
};

export default startSchedulerWorkers;
