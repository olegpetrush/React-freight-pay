import helmet from 'helmet'
import express from 'express'
import { isNil, get } from 'lodash'
import compress from 'compression'
import { createServer, Server } from 'http'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import httpContext from 'express-cls-hooked'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'

import apollo from './Apollo'
import logger from '../utils/logger'
import { errorMessages } from '../utils/error.msg'
import { handleOptions } from '../middlewares/handle-options'
import { dwollaWebhookMiddleware } from '../middlewares/dwolla-webhook'
import {
  publicRoutes,
  excludeMiddleware,
  checkJwt,
  checkUser
} from '../middlewares/security'
import { DEPENDENCIES } from '../utils/constants'

const httpServer = (port: number, { container }: any): Server => {
  const path = '/graphql'

  const app = express()

  app.set(DEPENDENCIES.CONTAINER, container)
  app.use(compress())
  app.use(methodOverride())
  app.use(helmet())
  app.use(handleOptions)
  app.use(bodyParser.json({ limit: '10mb' }))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
  app.use(httpContext.middleware)

  app.use('/dwolla-webhook', dwollaWebhookMiddleware)

  // app.use('/dwolla-webhook-subscription', dwollaService.utils.webhookSubscription);

  // app.use('/plaid-webhook/notification', plaidWebhookMiddleware);
  // app.use('/dwolla-webhook/notification', dwollaWebhookMiddleware);
  // app.use('/email-verification/verify', emailVerificationMiddleware);
  app.get('/', (_req, res) => {
    res.send('FPS API')
  })

  app.use(path, excludeMiddleware(publicRoutes, checkJwt))

  const server = new ApolloServer({
    schema: apollo.getSchema(),
    context: async ({ req }) => {
      const data = { container } as any
      if (req && (req as any).user === undefined) return data

      if (req && isNil((req as any).user)) {
        throw new AuthenticationError(errorMessages['auth/forbiden-access'])
      }

      // if (req && (req as any).user) {
      //   const { user, accessToken } = req as any;
      //   data.user = user;
      //   data.accessToken = accessToken;
      // }

      const auth0User = get(req, 'user')
      data.user = await checkUser(container, auth0User)

      return data
    }
  })

  server.applyMiddleware({ app, path })

  const httpServer = createServer(app)

  server.installSubscriptionHandlers(httpServer)

  // dwollaService.utils.webhookSubscription();

  return httpServer.listen({ port }, () =>
    logger.debug(`🚀  Server ready at port http://localhost:${port}${path}`)
  )
}

export default httpServer
