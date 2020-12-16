import React from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { get } from "lodash";
import { Table, PageHeader } from "antd";
import moment from "moment";

import Layout from "../../../../components/Layout";

const GRAPHQL_QUERY = gql`
  query GET_CLIENT($clientId: ID!) {
    client(where: { id: $clientId }) {
      id
      name
      email
      phone
      createdAt
      createdBy {
        id
        fullName
      }
    }
  }
`;

export default function SingleOrganizationClient({ user }) {
  const router = useRouter();
  const { client: clientId } = router.query;

  const { loading, error, data } = useQuery(GRAPHQL_QUERY, {
    variables: {
      clientId,
    },
  });

  const client = get(data, "client", {});

  return (
    <Layout>
      {loading && <p>Loading client...</p>}
      {!loading && client && (
        <>
          <PageHeader title={client.name} />
          <p>
            <strong>Email: </strong> {client.email}
          </p>
          <p>
            <strong>Phone: </strong> {client.phone}
          </p>
          <p>
            <strong>Created At: </strong>{" "}
            {moment.unix(client.createdAt / 1000).format("LLLL")}
          </p>
        </>
      )}
    </Layout>
  );
}
