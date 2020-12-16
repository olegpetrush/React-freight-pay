import cuid from 'cuid'
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

import { get, isNil } from 'lodash'

import { API_KEY, SECURE_KEY, AUTH0_OPTIONS } from '../../../config/vars'
// import admin from '../../services/firebase';
// import NotificationType from '../../services/notification/model/NotificationType';
// import Notification from '../../services/notification/model/Notification';
// import activecampaignService from '../../services/activecampaign-service';
// import { CREATE_NOTIFICATION } from '../../utils/graphql/mutations';
import { DEPENDENCIES, DWOLLA_ACTION_TYPES } from '../../utils/constants'
// import miscellaneous from '../../utils/miscellaneous';

// const { generateEmailCode } = miscellaneous;

import { DwollaQueue } from '../../services/queue-service'

export const checkUser = async (
  container: any,
  auth0User: any
): Promise<any> => {
  const userRepository = container.get(DEPENDENCIES.USER_REPOSITORY)
  // const notificationManager = container.get('notification.manager');

  if (isNil(auth0User)) return null

  const auth0UserId = get(auth0User, 'sub')

  const user = await userRepository.getOne({ auth0UserId })
  if (!isNil(user)) return user

  const email = get(auth0User, 'email', null)
  const emailVerified = get(auth0User, 'email_verified', false)
  const firstName = get(auth0User, 'given_name', null)
  const lastName = get(auth0User, 'family_name', null)
  const picture = get(auth0User, 'picture', null)

  const userId = cuid()
  const newUser = await userRepository.create({
    id: userId,
    auth0UserId,
    email,
    emailVerified,
    firstName,
    lastName,
    picture
  })

  DwollaQueue.add(DWOLLA_ACTION_TYPES.ADD_CUSTOMER, { userId })

  return newUser
}

const getTokenFromRequest = (req: any) => {
  if (
    !isNil(req.headers.authorization) &&
    req.headers.authorization !== false
  ) {
    const token = req.headers.authorization
    return token.split(' ')[1]
  }
  return null
}

export const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_OPTIONS.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  // audience: 'LqLl32jaLcAzPQoVYRJ9tai5DeVPbexk',
  issuer: `https://${AUTH0_OPTIONS.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
  getToken: getTokenFromRequest
})

export const validateAccessToken = async (req: any, next: any) => {
  if (!isNil(req.header('apiKey')) && req.header('apiKey') === API_KEY)
    return next()
  if (
    !isNil(req.header('secure_key')) &&
    req.header('secure_key') === SECURE_KEY
  ) {
    console.log('---- Credentials Accepted')
    return next()
  }

  return next()

  // const { app } = req;
  // const container = app.get(DEPENDENCIES.CONTAINER);
  // const tokenHeader = req.headers.authorization;
  // if (!isEmpty(tokenHeader)) {
  //   try {
  //     const tokenAccess = tokenHeader.split(' ')[1];
  //     const verifyToken = await admin.auth().verifyIdToken(tokenAccess);
  //     const { uid, email } = verifyToken;

  //     const user = await checkUser(container, email, uid);
  //     (req as any).user = user;
  //     (req as any).accessToken = tokenAccess;
  //     next();
  //   } catch (e) {
  //     (req as any).user = null;
  //     next(e);
  //   }
  // } else {
  //   (req as any).user = null;
  //   next();
  // }
}
