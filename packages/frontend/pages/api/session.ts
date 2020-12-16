import { NextApiRequest, NextApiResponse } from 'next'
import { get } from 'lodash'

import auth0 from '../../lib/auth0'

export default async function session(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await auth0.getSession(req)
    const accessToken = get(session, 'idToken')
    res.status(200).send({ accessToken })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
