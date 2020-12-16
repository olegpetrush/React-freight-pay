import React from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { get } from "lodash";
import { Table, PageHeader } from "antd";
import Link from "next/link";

import Layout from "../../../components/Layout";

const GRAPHQL_QUERY = gql`
  query GET_ORGANIZATION_BY_ALIAS($alias: String) {
    organization(where: { alias: $alias }) {
      id
      name
      alias
      clients {
        id
        name
        email
        phone
      }
    }
  }
`;

export default function OrganizationClients({ user }) {
  const router = useRouter();
  const { organization: alias } = router.query;

  const { loading, error, data } = useQuery(GRAPHQL_QUERY, {
    variables: { alias },
  });

  const organization = get(data, "organization", {});
  const clients = get(organization, "clients", []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, client) => (
        <Link href={`/${alias}/clients/${client.id}`}>
          <a>{text}</a>
        </Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const clientData = clients.map((client) => ({
    key: client.id,
    ...client,
  }));

  return (
    <Layout>
      <PageHeader title="Clients" />

      {loading && <p>Loading clients...</p>}

      {!loading && organization && (
        <Table columns={columns} dataSource={clientData} />
      )}
    </Layout>
  );
}
