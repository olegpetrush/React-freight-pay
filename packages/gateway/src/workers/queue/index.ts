import registerDependencies from "../../services/register-dependencies";

import dwollaWorkerQueue from "./dwolla";

const startQueueWorkers = async () => {
  const container = await registerDependencies();

  dwollaWorkerQueue(container);
};

export default startQueueWorkers;
