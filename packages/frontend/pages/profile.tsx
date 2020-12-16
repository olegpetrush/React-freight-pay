import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { get } from 'lodash'

import Layout from '../components/Layout'

const GRAPHQL_QUERY = gql`
  query {
    profile {
      id
      firstName
    }
    myOrganizations {
      data {
        id
        name
      }
    }
  }
`

export default function Profile() {
  const { loading, data } = useQuery(GRAPHQL_QUERY, {
    variables: {}
  })

  const profile = get(data, 'profile', false)

  return (
    <Layout>
      <h1>Profile</h1>

      {loading && <p>Loading profile...</p>}

      {!loading && profile && (
        <>
          <p>Profile:</p>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </>
      )}
    </Layout>
  )
}
