const cuid = require("cuid");
import { get, isNil } from "lodash";

import { DwollaQueue } from "../../../services/queue-service";
import { DEPENDENCIES, DWOLLA_ACTION_TYPES } from "../../../utils/constants";

const dwollaWorkerQueue = (container: any) => {
  const userRepository = container.get(DEPENDENCIES.USER_REPOSITORY);
  const organizationRepository = container.get(
    DEPENDENCIES.ORGANIZATION_REPOSITORY
  );
  const dwollaService = container.get(DEPENDENCIES.DWOLLA_SERVICE);

  const addCustomer = async (job: any, done?: any) => {
    const {
      data: { userId },
    } = job;
    const user = await userRepository.getOne({ id: userId });

    const firstName = get(user, "firstName");
    const lastName = get(user, "lastName");
    const email = get(user, "email").replace("@", `+${cuid()}@`);

    const data = { firstName, lastName, email, correlationId: userId };

    dwollaService.setUser(user);
    const dwollaResponse = await dwollaService.customer.add(data);

    const dwollaCustomerId = dwollaResponse.headers
      .get("location")
      .toString()
      .split("/")
      .slice(-1)[0];

    const updatedUser = await userRepository.update(
      { id: userId },
      { dwollaCustomerId }
    );
    done(updatedUser);
  };

  const getCustomer = async (job: any, done?: any) => {
    const {
      data: { userId },
    } = job;
    const user = await userRepository.getOne({ id: userId });
    const { dwollaCustomerId } = user;

    if (isNil(dwollaCustomerId)) return new Error("No Dwolla Customer ID");

    dwollaService.setUser(user);
    const customer = await dwollaService.customer.get(dwollaCustomerId);

    done(customer);
  };

  const addBusinessCustomer = async (job: any, done?: any) => {
    const {
      data: { userId, organizationId },
    } = job;
    const user = await userRepository.getOne({ id: userId }); // Account Owner
    const organization = await organizationRepository.getOne({
      id: organizationRepository,
    });

    const firstName = get(user, "firstName");
    const lastName = get(user, "lastName");
    const email = get(user, "email").replace("@", `+${cuid()}@`);

    const { name: businessName, controller } = organization;
    const address1 = "123 Nowhere";
    const address2 = "Unit 99";
    const city = "Los Angeles";
    const state = "CA";
    const postalCode = "90025";
    const doingBusinessAs = businessName;
    const businessClassification = "9ed3a866-7d6f-11e3-a0ce-5404a6144203"; // from https://docs.dwolla.com/#retrieve-a-business-classification
    const businessType = "llc";
    const ein = "12-3456789";
    const website = "https://www.notasgoodasfps.com";
    const phone = "5551231234";

    const data = {
      firstName,
      lastName,
      email,
      type: "business",
      address1,
      address2,
      city,
      state,
      postalCode,
      businessName,
      doingBusinessAs,
      businessClassification,
      businessType,
      ein,
      website,
      phone,
      controller,
      correlationId: organizationId,
    };

    console.log("business data", data);

    done();

    // dwollaService.setUser(user);
    // const dwollaResponse = await dwollaService.customer.addBusiness(data);

    // const dwollaCustomerId = dwollaResponse.headers
    //   .get('location')
    //   .toString()
    //   .split('/')
    //   .slice(-1)[0];

    // const updatedUser = await userRepository.update({ id: userId }, { dwollaCustomerId });
    // done(updatedUser);
  };

  DwollaQueue.process(DWOLLA_ACTION_TYPES.ADD_CUSTOMER, addCustomer);
  DwollaQueue.process(DWOLLA_ACTION_TYPES.GET_CUSTOMER, getCustomer);
  DwollaQueue.process(
    DWOLLA_ACTION_TYPES.ADD_BUSINESS_CUSTOMER,
    addBusinessCustomer
  );
};

export default dwollaWorkerQueue;
