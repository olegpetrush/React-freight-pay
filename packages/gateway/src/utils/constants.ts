export enum ORGANIZATION_ROLES {
  OWNER = "OWNER",
  MEMBER = "MEMBER",
}

export enum DWOLLA_ACTION_TYPES {
  GET_CUSTOMER = "GET_CUSTOMER",
  ADD_CUSTOMER = "ADD_CUSTOMER",
  UPDATE_CUSTOMER = "UPDATE_CUSTOMER",
  ADD_BUSINESS_CUSTOMER = "ADD_BUSINESS_CUSTOMER",
  GET_FUNDING_SOURCES = "GET_FUNDING_SOURCES",
  ADD_FUNDING_SOURCE = "ADD_FUNDING_SOURCE",
  GET_FUNDING_SOURCE = "GET_FUNDING_SOURCE",
  UPDATE_FUNDING_SOURCE = "UPDATE_FUNDING_SOURCE",
  DELETE_FUNDING_SOURCE = "DELETE_FUNDING_SOURCE",
  PROCESS_TRANSFER = "PROCESS_TRANSFER",
  CREATE_TRANSFER = "CREATE_TRANSFER",
  GET_TRANSFER = "GET_TRANSFER",
  GET_CUSTOMER_TRANSFERS = "GET_CUSTOMER_TRANSFERS",
  CANCEL_TRANSFER = "CANCEL_TRANSFER",
  CANCEL_TRANSFER_FAILURE = "CANCEL_TRANSFER_FAILURE",
  GET_DOCUMENT = "GET_DOCUMENT",
  GET_DOCUMENTS = "GET_DOCUMENTS",
  DOCUMENT_NEEDED_FOR = "DOCUMENT_NEEDED_FOR",
  UPLOAD_DOCUMENT = "UPLOAD_DOCUMENT",
  RETRY_DWOLLA_WEBHOOK = "RETRY_DWOLLA_WEBHOOK",
  GET_WEBHOOK_SUBSCRIPTIONS = "GET_WEBHOOK_SUBSCRIPTIONS",
  INITIATE_KBA_SESSION = "INITIATE_KBA_SESSION",
  RETRIEVE_KBA_QUESTIONS = "RETRIEVE_KBA_QUESTIONS",
  VERIFY_KBA_QUESTIONS = "VERIFY_KBA_QUESTIONS",
  GET_BUSINESS_CLASSIFICATIONS = "GET_BUSINESS_CLASSIFICATIONS",
  GET_BUSINESS_CLASSIFICATION = "GET_BUSINESS_CLASSIFICATION",
}

export enum REQUEST_METHODS {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export enum Sex {
  MALE = "M",
  FEMALE = "F",
}

export enum Role {
  ADMIN = "admin",
  REGULAR = "regular",
}

export enum CUSTOMER_TYPES {
  USER = "USER",
  ORGANIZATION = "ORGANIZATION",
}

export enum CUSTOMER_STATUSES {
  RETRY = "retry",
  DOCUMENT = "document",
  VERIFIED = "verified",
  AWAITING = "awaiting",
  SUSPENDED = "suspended",
  UNVERIFIED = "unverifed",
  NO_CUSTOMER = "noCustomer",
  DEACTIVATED = "deactivated",
  AWAITING_RETRY = "awaitingRetry",
  AWAITING_DOCUMENT = "awaitingDocument",
  AWAITING_VERIFICATION = "awaitingVerification",
  KBA = "kba",
}

export enum TransactionStatuses {
  CREATED = "created",
  PENDING = "pending",
  CLEARED = "cleared",
  FAILED = "failed",
  CANCELLED = "cancelled",
  REVERSED = "reversed",
}

export enum TransactionAccountTypes {
  WALLET = "wallet", // Dwolla
  INVESTMENT = "investment", // Interactive Brokers
  BANK = "bank", // Plaid or ACH
}

export enum PlaidViewType {
  EXIT = "EXIT",
  OPEN = "OPEN",
  ERROR = "ERROR",
  HANDOFF = "HANDOFF",
  SUBMIT_MFA = "SUBMIT_MFA",
  OPEN_MY_PLAID = "OPEN_MY_PLAID",
  TRANSITION_VIEW = "TRANSITION_VIEW",
  SEARCH_INSTITUTION = "SEARCH_INSTITUTION",
  SELECT_INSTITUTION = "SELECT_INSTITUTION",
  SUBMIT_CREDENTIALS = "SUBMIT_CREDENTIALS",
}

export enum SymbolType {
  VT = "VT",
  VCSH = "VCSH",
  USMV = "USMV",
  MOAT = "MOAT",
  SWAN = "SWAN",
}

export enum ExchangeData {
  close = "4. close",
  metaData = "Meta Data",
  timeSeries = "Time Series (Daily)",
  lastRefreshed = "3. Last Refreshed",
}

export enum Period {
  DAY = "DAY",
  MONTH = "MONTH",
  YEAR = "YEAR",
}

export const PLAID_ERROR_TYPES = {
  ITEM_LOGIN_REQUIRED: "ITEM_LOGIN_REQUIRED",
  ITEM_ERROR: "ITEM_ERROR",
};

export const DEPENDENCIES = {
  CONTAINER: "container",

  DB: "db",

  // services
  QUEUE_SERVICE: "queueService",
  DWOLLA_SERVICE: "dwollaService",

  TRANSACTIONAL: "transactional",

  // database entities
  USER_REPOSITORY: "userRepository",
  ORGANIZATION_REPOSITORY: "organizationRepository",
  USER_TO_ORGANIZATION_REPOSITORY: "userToOrganizationRepository",
  CLIENT_REPOSITORY: "clientRepository",
  ADDRESS_REPOSITORY: "addressRepository",
  CONTACT_REPOSITORY: "contactRepository",
  CONTROLLER_CONTACT_REPOSITORY: "controllerContactRepository",
  PAYMENT_REQUEST_REPOSITORY: "paymentRequestRepository",
  USER_STATUS_REPOSITORY: "userStatusRepository",
  BUSINESS_CLASSIFICATION_REPOSITORY: "businessClassificationRepository",
  INDUSTRY_CLASSIFICATION_REPOSITORY: "industryClassificationRepository",

  // logs in database
  DWOLLA_RESPONSE_LOG_REPOSITORY: "dwollaResponseLogRepository",
  DWOLLA_WEBHOOK_LOG_REPOSITORY: "dwollaWebhookLogRepository",

  REQUEST_REPOSITORY: "requestRepository",
  REQUEST_TRACKING_REPOSITORY: "requestTrackingRepository",

  CUSTOMER_ACTIVATED_HOOK: "customerActivatedHook",
  CUSTOMER_DEACTIVATED_HOOK: "customerDeactivatedHook",
  CUSTOMER_SUSPENDED_HOOK: "customerSuspendedHook",
  DOCUMENT_NEEDED_HOOK: "documentNeededHook",
  CUSTOMER_VERIFIED_HOOK: "customerVerifiedHook",
  KBA_NEEDED_HOOK: "kbaNeededHook",
  KBA_FAILED_HOOK: "kbaFailedHook",
  KBA_PASSED_HOOK: "kbaPassedHook",
};

export const QUEUES = {
  DWOLLA: "dwollaQueue",
};

export enum ABILITY_ACTIONS {
  READ = "read",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  MANAGE = "manage",
}

export enum CALENDAR_EVENT_SCHEDULE {
  BI_MONTHLY = "biMonthly",
  BI_WEEKLY = "biWeekly",
  DAILY = "daily",
  HALF_YEARLY = "halfYearly",
  HOURLY = "hourly",
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  WEEKLY = "weekly",
  YEARLY = "yearly",
}

export enum CALENDAR_EVENT_TYPES {
  SHARING_TRANSACTION_EVENT = "Sharing Transaction Event",
  REBALANCING_TRANSACTION_EVENT = "Rebalancing Transaction Event",
  MONTHLY_DEPOSIT_TRANSACTION_EVENT = "Monthly Deposit Transaction Event",
  WITHDRAWAL_TRANSACTION_EVENT = "Withdrawal Transaction Event",
}

export enum ABILITY_SUBJECT {
  ALL = "All",
  TRANSACTION_ACCOUNTS = "TRANSACTION_ACCOUNTS",
}

export const SERVICE_NAME = "gate";

export enum SHARING_FREQUENCY {
  DAILY = "daily",
  WEEKLY = "weekly",
  BI_WEEKLY = "biWeekly",
  MONTHLY = "monthly",
  BI_MONTHLY = "biMonthly",
  QUARTERLY = "quarterly",
  HALF_YEARLY = "halfYearly",
  YEARLY = "yearly",
}

export enum INVESTEMENT_TYPE {
  ETF = "etf",
  STOCK = "stock",
}

export enum INVESTEMENT_CATEGORY {
  EQUITY_GROWTH = "Equities (Growth)",
  GROWTH_INCOME = "Growth & Income",
  FIXED_INCOME = "Fixed Income",
}

export const RESPONSES_WEIGHT = {
  freedom: 0.1,
  retirement: 0.1,
  college: 0.05,
  business: 0.05,
  vacation: 0.05,
  maximizing: 0.1,
  minimizing: 0.1,
  equally: 0.1,
  sellAll: 0.1,
  sellSome: 0.1,
  buyModerately: 0.15,
  buyAggressively: 0.1,
};

export const ENVS = {
  PRODUCTION: "PRODUCTION",
  STAGING: "STAGING",
  DEVELOPMENT: "DEVELOPMENT",
};

export enum SECURITY_TYPE {
  GROWTH_ETF = "GROWTH_ETF",
  GROWTH_EQUITY = "GROWTH_EQUITY",
  GROWTH_AND_INCOME = "GROWTH_AND_INCOME",
  FIXED_INCOME = "FIXED_INCOME",
}
