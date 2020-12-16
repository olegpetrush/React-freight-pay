import React from 'react'
import Cookie from 'js-cookie'

import Layout from '../components/Layout'

export default function LoggedOut() {
  Cookie.remove('accessToken')

  return (
    <Layout>
      <h1>You were successfully logged out</h1>
    </Layout>
  )
}
