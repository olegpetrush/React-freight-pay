import { get } from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

import auth0 from '../../lib/auth0'
import { API_URL } from '../../configs/vars'

export default async function graphql(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await auth0.getSession(req)
    const accessToken = get(session, 'idToken', false)
    const body = get(req, 'body', {})

    if (accessToken) {
      const graphqlRequest = await axios({
        method: 'POST',
        url: `${API_URL}/graphql`,
        headers: {
          authorization: `Bearer ${accessToken}`
        },
        data: body
      })

      res.send(graphqlRequest.data)
    } else {
      throw new Error('No Access Token')
    }
  } catch (error) {
    res.status(error.status || 500).end(error.message)
  }
}
