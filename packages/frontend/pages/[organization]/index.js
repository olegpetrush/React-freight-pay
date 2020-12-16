import React from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import get from "lodash/get";

import Layout from "../../components/Layout";
import { useFetchUser } from "../../lib/user";

const GRAPHQL_QUERY = gql`
  query GET_ORGANIZATION_BY_ALIAS($alias: String) {
    organization(where: { alias: $alias }) {
      id
      name
      alias
      members {
        data {
          id
        }
        count
      }
      clients {
        id
        name
      }
    }
  }
`;

export default function Organization() {
  const router = useRouter();
  const { organization } = router.query;
  const { user, loading } = useFetchUser();

  const { loading: organizationLoading, error, data } = useQuery(
    GRAPHQL_QUERY,
    {
      variables: {
        alias: organization,
      },
    }
  );

  const organizationName = get(data, "organization.name");

  // console.log('org data', data)

  return (
    <Layout user={user} loading={loading}>
      <h1>Organization: {organizationName}</h1>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to click in{" "}
            <i>Profile</i> and <i>Logout</i>
          </p>
        </>
      )}
      {user && (
        <>
          <h4>Rendered user info on the client</h4>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
}
