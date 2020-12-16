import { toNumber } from 'lodash'
import { ConnectionOptions } from 'typeorm'
const path = require('path')
const url = require('url')

export const NODE_PORT = toNumber(process.env.PORT) || 4000
export const NODE_ENV = process.env.NODE_ENV || 'staging'
export const APP_DIR = process.env.APP_DIR || 'gateway'

export const API_URL = process.env.API_URL
export const SECURE_KEY = process.env.SECURE_KEY

export const NOTIFICATION_URL = process.env.NOTIFICATION_URL

export const API_KEY = process.env.API_KEY
export const NOTIFICATION_API_KEY = process.env.NOTIFICATION_API_KEY

const DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgres://username:password@localhost:5432/my_db'

const db_url = url.parse(DATABASE_URL)

export const DATABASE_OPTIONS: ConnectionOptions = {
  type: db_url.protocol.substr(0, db_url.protocol.length - 1),
  host: db_url.hostname,
  username: db_url.auth.substr(0, db_url.auth.indexOf(':')),
  password: db_url.auth.substr(
    db_url.auth.indexOf(':') + 1,
    db_url.auth.length
  ),
  database: db_url.path.slice(1),
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, '../src/entities/**/*.{js,ts}')],
  ssl: true
}

export const REDIS_URL = process.env.REDIS_URL

export const AUTH0_OPTIONS = {
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_SCOPE: process.env.AUTH0_SCOPE
}

export const DWOLLA_OPTIONS = {
  DWOLLA_KEY: process.env.DWOLLA_KEY,
  DWOLLA_SECRET: process.env.DWOLLA_SECRET,
  DWOLLA_WEBHOOK_SECRET: process.env.DWOLLA_WEBHOOK_SECRET,
  DWOLLA_ENV: process.env.DWOLLA_ENV
}

// export const PLAID_OPTIONS = {
//   PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
//   PLAID_SECRET: process.env.PLAID_SECRET,
//   PLAID_PUBLIC_KEY: process.env.PLAID_PUBLIC_KEY,
//   PLAID_ENV: process.env.PLAID_ENV
// };

// export const VGS_OPTIONS = {
//   PROXY_HOST: process.env.VGS_HOST,
//   PROXY_AUTH: process.env.VGS_PROXY_AUTH,
//   PROXY_PORT: process.env.VGS_PROXY_PORT || 8080,
//   USE_VGS: process.env.VGS_USE_VGS === 'true'
// }

// export const IBKR_OPTIONS = {
//   CSID: process.env.IBKR_CSID,
//   ENCRYPTION_KEY: process.env.IBKR_ENCRYPTION_KEY.replace(/\\n/g, '\n'),
//   MASTER_ACCOUNT_ID: process.env.IBKR_MASTER_ACCOUNT_ID,
//   PASSPHRASE: process.env.IBKR_PASSPHRASE,
//   SIGNING_KEY: process.env.IBKR_SIGNING_KEY.replace(/\\n/g, '\n'),
//   DAM_API_URL: process.env.IBKR_DAM_API_URL,
//   DECRYPTOR_URL: process.env.DECRYPTOR_URL,
//   DEBUG: process.env.IBKR_DEBUG_SUBMISSION,
// };

// export const IEXCLOUD_OPTIONS = {
//   IEXCLOUD_URL: process.env.IEXCLOUD_OPTIONS__IEXCLOUD_URL,
//   IEXCLOUD_TOKEN: process.env.IEXCLOUD_OPTIONS__IEXCLOUD_TOKEN
// };

// export const ALPHA_EXCHANGE_OPTIONS = {
//   ALPHA_EXCHANGE_URL: process.env.ALPHA_EXCHANGE_OPTIONS__ALPHA_EXCHANGE_URL,
//   ALPHA_EXCHANGE_TOKEN: process.env.ALPHA_EXCHANGE_OPTIONS__ALPHA_EXCHANGE_TOKEN
// };

export const APOLLO_CONFIG = {
  localUri: './src/graphql'
}

// export const AWS_CONFIG = {
//   AWS_ACCESS_KEY: process.env.CLOUDCUBE_ACCESS_KEY_ID,
//   AWS_SECRET_ACCESS_KEY: process.env.CLOUDCUBE_SECRET_ACCESS_KEY,
//   S3_BUCKET_NAME: 'cloud-cube',
//   BUCKET_URL: process.env.CLOUDCUBE_URL,
// };

// export const TWILIO_CONFIG = {
//   TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
//   TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
//   TWILIO_FROM: process.env.TWILIO_FROM
// };

export const SENTRY_CONFIG = {
  SENTRY_DSN: process.env.SENTRY_DSN,
  SENTRY_ENV: NODE_ENV,
  SENTRY_SERVICE: APP_DIR,
  SENTRY_TRACES_SAMPLE_RATE: process.env.SENTRY_TRACES_SAMPLE_RATE || 1.0
}

// export const FIXIE_URL = process.env.FIXIE_URL;

// export const FIREBASE_CONFIG = {
//   CONFIG_BASE64: process.env.FIREBASE_CONFIG_BASE64,
//   DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
// };

// export const ACTIVECAMPAIGN_CONFIG = {
//   ACCOUNT_ID: process.env.ACTIVECAMPAIGN_ACCOUNT_ID,
//   EVENT_KEY: process.env.ACTIVECAMPAIGN_EVENT_KEY,
//   KEY: process.env.ACTIVECAMPAIGN_KEY,
//   URL: process.env.ACTIVECAMPAIGN_URL,
// };

// export const BROKER_SERVICE_URL = process.env.BROKER_SERVICE_URL
// export const MARKETDATA_SERVICE_URL = process.env.MARKETDATA_SERVICE_URL
