import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { toLower } from 'lodash'
import { Form, Input, Button } from 'antd'
import Router from 'next/router'

import Layout from '../components/Layout'
import LoadingAnimation from '../components/LoadingAnimation'
import { OrganizationInput } from '../generated/graphql'
import { FormInstance } from 'antd/lib/form'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

const GRAPHQL_MUTATION = gql`
  mutation CREATE_ORGANIZATION($name: String!, $alias: String) {
    createOrganization(data: { name: $name, alias: $alias }) {
      id
      name
      alias
      userToOrganizations {
        id
        role
        user {
          fullName
        }
      }
      members {
        data {
          id
          role
          user {
            id
            fullName
          }
        }
      }
    }
  }
`

const formatAlias = (value: string): string =>
  toLower(value)
    .replace(/[^a-zA-Z ]/g, '')
    .replace(/\s/g, '')

export default function CreateOrganization() {
  const formRef = React.createRef<FormInstance>()

  const [createOrganization, { loading, error, data }] = useMutation(
    GRAPHQL_MUTATION
  )

  const onAliasChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    formRef.current.setFieldsValue({
      alias: formatAlias(el.target.value)
    })
  }

  const onNameChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    formRef.current.setFieldsValue({
      alias: formatAlias(el.target.value)
    })
  }

  const onFinish = (values: OrganizationInput) => {
    try {
      createOrganization({
        variables: values,
        // optimisticResponse: {
        //   __typename: "Mutation",
        //   createOrganization: {
        //     __typename: "Organization",
        //     ...values,
        //     createdAt: new Date(),
        //     updatedAt: new Date(),
        //   }
        // },
        update: (cache, { data: { createOrganization } }) => {
          console.log('update')
          const { alias } = createOrganization
          console.log('alias', alias)
          Router.push(`/${alias}`)
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Layout>
      <h2>{'Create Organization'}</h2>

      <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input onChange={onNameChange} autoComplete="off" />
        </Form.Item>

        <Form.Item
          name="alias"
          label="Alias"
          rules={[{ required: true }]}
          extra="This is a unqiue identifier for your organization"
        >
          <Input onChange={onAliasChange} autoComplete="off" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          {loading ? (
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
    </Layout>
  )
}
