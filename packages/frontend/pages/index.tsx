import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { get, trim } from 'lodash'
import { Space } from 'antd'
import dynamic from 'next/dynamic'

import Layout from '../components/Layout'
import LoadingAnimation from '../components/LoadingAnimation'

const OrganizationCards = dynamic(
  () => import('../components/OrganizationCards'),
  { ssr: false }
)

const GRAPHQL_QUERY = gql`
  query {
    profile {
      firstName
    }
  }
`

export default function Home() {
  const { loading, data } = useQuery(GRAPHQL_QUERY, {
    variables: {}
  })

  const profile = get(data, 'profile', false)
  const firstName = get(profile, 'firstName', '')

  return (
    <Layout>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="my-organizations">
          {profile && <h1>{trim(`Welcome back ${firstName}!`)}</h1>}
          <Space align="center" size="large">
            <OrganizationCards />
          </Space>
        </div>
      )}
    </Layout>
  )
}
