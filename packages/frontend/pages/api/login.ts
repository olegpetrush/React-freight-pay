import { NextApiRequest, NextApiResponse } from 'next'

import auth0 from '../../lib/auth0'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    await auth0.handleLogin(req, res, {
      authParams: {
        scope: 'openid email profile'
      }
    })
  } catch (error) {
    res.status(error.status || 500).end(error.message)
  }
}
