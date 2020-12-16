import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Layout, Menu, Button, Select } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useQuery, gql } from '@apollo/client'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import toArray from 'lodash/toArray'

import LoadingAnimation from './LoadingAnimation'

const { Header, Sider } = Layout
const { SubMenu } = Menu
const { Option } = Select

const GRAPHQL_QUERY = gql`
  query MY_PROFILE {
    profile {
      id
      firstName
      lastName
      fullName
      email
      userToOrganizations {
        id
        role
        organization {
          name
          alias
        }
      }
    }
  }
`

const organizationSelector = userToOrganizations => {
  if (isNil(userToOrganizations)) return null
  const userOrgs = toArray(userToOrganizations)
  if (userOrgs.length === 0) return null
  if (userOrgs.length === 1)
    return (
      <Link href={`/${userOrgs[0].organization.alias}`}>
        <Button className="organization-name">
          {userOrgs[0].organization.name}
        </Button>
      </Link>
    )
  return (
    <Select defaultValue={userOrgs[0].organization.alias}>
      {userOrgs.map(userOrg => (
        <Option key={userOrg.id} value={userOrg.organization.alias}>
          {userOrg.organization.name}
        </Option>
      ))}
    </Select>
  )
}

const getCurrentOrganizationAlias = userToOrganizations => {
  if (isNil(userToOrganizations)) return null
  const userOrgs = toArray(userToOrganizations)
  if (userOrgs.length === 0) return null
  return userOrgs[0].organization.alias
}

export default function LayoutComponent({ children }) {
  const { loading, data } = useQuery(GRAPHQL_QUERY, {
    variables: {}
  })

  const profile = get(data, 'profile')
  const name = get(profile, 'fullName', '')
  const userToOrganizations = get(profile, 'userToOrganizations', [])

  const organizationAlias = getCurrentOrganizationAlias(userToOrganizations)

  return (
    <Layout className="app-container">
      <Head>
        <title>Freight Pay</title>
      </Head>
      <Header className="header">
        <img
          className="logo"
          src="/assets/images/logo.svg"
          alt="Freight Pay Logo"
        />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          {!loading &&
            (profile ? (
              <SubMenu key="sub1" icon={<UserOutlined />} title={name}>
                <Menu.Item key="4">
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link href="/api/debug">
                    <a>Auth Header</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link href="/api/logout">
                    <a>Logout</a>
                  </Link>
                </Menu.Item>
              </SubMenu>
            ) : (
              <>
                <Menu.Item key="6">
                  <Link href="/api/login">
                    <a>Login or Create an Account</a>
                  </Link>
                </Menu.Item>
              </>
            ))}
        </Menu>
      </Header>
      {!loading ? (
        <Layout style={{ minHeight: '100vh' }}>
          {!isNil(organizationAlias) && (
            <Sider
              theme="light"
              collapsible
              collapsed={false}
              onCollapse={() => {
                console.log('onCollapse')
              }}
            >
              {organizationSelector(userToOrganizations)}
              <Menu theme="light" mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<PieChartOutlined />}>
                  <Link href={`/${organizationAlias}`}>
                    <a>My Organization</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<DesktopOutlined />}>
                  <Link href={`/${organizationAlias}/clients`}>
                    <a>Clients</a>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
          )}
          <Layout>
            <main>
              <div className="container">{children}</div>
            </main>
          </Layout>
        </Layout>
      ) : (
        <LoadingAnimation />
      )}
      <style jsx>{`
        .container {
          margin: 1.5rem auto;
        }
        .header ul {
          float: right;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          color: #333;
          font-family: -apple-system, 'Segoe UI';
        }
      `}</style>
    </Layout>
  )
}
