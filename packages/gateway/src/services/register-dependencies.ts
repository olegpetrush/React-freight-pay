const httpContext = require("express-cls-hooked");

import Container from "../lib/di/Container";

import DB from "./DatabaseConnector";

import queueService from "./queue-service";
import dwollaService from "./dwolla-service";

// import ibkrService from './ibkr-service';
// import plaidService from './plaid-service';
// import exchangeService from './exchange-service';
// import firebase from './firebase';
// import activeCampaignService from './activecampaign-service';

// import subscriptionManager from './SubscriptionManager';

// import PaymentType from './payment/model/PaymentType';
// import PaymentManager from './payment/PaymentManager';
// import NotificationManager from './NotificationManager';
// import CustomerActivated from '../hooks/customer/CustomerActivated';
// import CustomerDeactivated from '../hooks/customer/CustomerDeactivated';
// import CustomerSuspended from '../hooks/customer/CustomerSuspended';
// import CustomerVerified from '../hooks/customer/CustomerVerified';
// import DocumentNeeded from '../hooks/customer/DocumentNeeded';
// import KbaNeeded from '../hooks/customer/KbaNeeded';
// import KbaFailed from '../hooks/customer/KbaFailed';
// import KbaPassed from '../hooks/customer/KbaPassed';

// import transactional from '../units/decorator/transactions'
import userRepository from "../units/user";
import organizationRepository from "../units/organization";
import userToOrganizationRepository from "../units/user-to-organization";
import clientRepository from "../units/client";
import addressRepository from "../units/address";
import contactRepository from "../units/contact";
import controllerContactRepository from "../units/controller-contact";
import paymentRequestRepository from "../units/payment-request";
import businessClassificationRepository from "../units/business-classification";
import industryClassificationRepository from "../units/industry-classification";

import dwollaResponseLogRepository from "../units/dwolla-response-log";
import dwollaWebhookLogRepository from "../units/dwolla-webhook-log";

import { DATABASE_OPTIONS } from "../../config/vars";
import { DEPENDENCIES } from "../utils/constants";

export default async () => {
  const container = new Container();
  const db = new DB(DATABASE_OPTIONS, httpContext);

  await db.connect();

  container.register(DEPENDENCIES.DB, db);

  container.register(DEPENDENCIES.USER_REPOSITORY, userRepository(db));
  container.register(
    DEPENDENCIES.ORGANIZATION_REPOSITORY,
    organizationRepository(db)
  );
  container.register(
    DEPENDENCIES.USER_TO_ORGANIZATION_REPOSITORY,
    userToOrganizationRepository(db)
  );
  container.register(DEPENDENCIES.CLIENT_REPOSITORY, clientRepository(db));
  container.register(DEPENDENCIES.ADDRESS_REPOSITORY, addressRepository(db));
  container.register(DEPENDENCIES.CONTACT_REPOSITORY, contactRepository(db));
  container.register(
    DEPENDENCIES.CONTROLLER_CONTACT_REPOSITORY,
    controllerContactRepository(db)
  );
  container.register(
    DEPENDENCIES.PAYMENT_REQUEST_REPOSITORY,
    paymentRequestRepository(db)
  );
  container.register(
    DEPENDENCIES.BUSINESS_CLASSIFICATION_REPOSITORY,
    businessClassificationRepository(db)
  );
  container.register(
    DEPENDENCIES.INDUSTRY_CLASSIFICATION_REPOSITORY,
    industryClassificationRepository(db)
  );

  container.register(
    DEPENDENCIES.DWOLLA_RESPONSE_LOG_REPOSITORY,
    dwollaResponseLogRepository(db)
  );
  container.register(
    DEPENDENCIES.DWOLLA_WEBHOOK_LOG_REPOSITORY,
    dwollaWebhookLogRepository(db)
  );

  container.register(DEPENDENCIES.QUEUE_SERVICE, queueService);
  container.register(DEPENDENCIES.DWOLLA_SERVICE, new dwollaService(container));

  return container;
};
