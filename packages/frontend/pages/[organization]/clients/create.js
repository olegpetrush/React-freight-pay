import React from 'react'
import Router, { useRouter } from 'next/router'
import { useQuery, useMutation, gql } from '@apollo/client'
import { toLower, get } from 'lodash'
import { Form, Input, Button } from 'antd'

import Layout from '../../../components/Layout'
import LoadingAnimation from '../../../components/LoadingAnimation'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

const GRAPHQL_QUERY = gql`
  query GET_ORGANIZATION_BY_ALIAS($alias: String) {
    organization(where: { alias: $alias }) {
      id
      name
    }
  }
`

const GRAPHQL_MUTATION = gql`
  mutation CREATE_ORGANIZATION_CLIENT(
    $organizationId: ID!
    $name: String
    $phone: String
    $email: String
  ) {
    createClient(
      data: {
        organizationId: $organizationId
        name: $name
        phone: $phone
        email: $email
      }
    ) {
      id
      name
      email
      phone
    }
  }
`

const formatAlias = value =>
  toLower(value)
    .replace(/[^a-zA-Z ]/g, '')
    .replace(/\s/g, '')

export default function CreateOrganizationClient() {
  const router = useRouter()
  const { organization } = router.query
  const formRef = React.createRef()

  const [createClient, { loading, error, data }] = useMutation(GRAPHQL_MUTATION)

  const {
    loading: organizationLoading,
    error: organizationError,
    data: organizationData
  } = useQuery(GRAPHQL_QUERY, {
    variables: {
      alias: organization
    }
  })

  const organizationId = get(organizationData, 'organization.id')

  const onNameChange = value => {
    formRef.current.setFieldsValue({
      alias: formatAlias(value.target.value)
    })
  }

  const onFinish = values => {
    try {
      createClient({
        variables: {
          ...values,
          organizationId
        },
        update: (cache, { data: { createClient } }) => {
          console.log('update')
          const { id } = createClient
          console.log('createClient', createClient)
          Router.push(`/${organization}/clients/${id}`)
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Layout>
      <h2>Create Organization Client</h2>

      <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input onChange={onNameChange} autoComplete="off" />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          {organizationLoading ? (
            <LoadingAnimation />
          ) : (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>

      <h3>Data</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <h3>Loading</h3>
      <pre>{JSON.stringify(loading, null, 2)}</pre>

      <h3>Error</h3>
      <pre>{JSON.stringify(error, null, 2)}</pre>

      <h3>Org Data Error</h3>
      <pre>{JSON.stringify(organizationError, null, 2)}</pre>
    </Layout>
  )
}
