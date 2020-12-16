require('newrelic')
require('dotenv').config({
  path: require('path').resolve(__dirname, '../', '.env')
})

import * as Sentry from '@sentry/node'
import { toNumber } from 'lodash'

import httpServer from './services/http-server'
import registerDependencies from './services/register-dependencies'

import logger from './utils/logger'
import apollo from './services/Apollo'
import { NODE_PORT, APOLLO_CONFIG, SENTRY_CONFIG } from '../config/vars'

Sentry.init({
  dsn: SENTRY_CONFIG.SENTRY_DSN,
  environment: SENTRY_CONFIG.SENTRY_ENV,
  tracesSampleRate: toNumber(SENTRY_CONFIG.SENTRY_TRACES_SAMPLE_RATE)
})
Sentry.configureScope(scope => {
  scope.setTag('service', SENTRY_CONFIG.SENTRY_SERVICE)
})

apollo
  .loadSchema({
    remoteUris: [],
    localUri: APOLLO_CONFIG.localUri
  })
  .then(async () => {
    const container = await registerDependencies()
    return httpServer(NODE_PORT, { container })
  })
  .catch(e => {
    logger.error('Unable to start service: ', e)
  })
