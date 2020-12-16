import React from "react";
import { Layout } from "antd";
import ReactLoading from "react-loading";
import { useQuery, gql } from "@apollo/client";
import { get, toUpper } from "lodash";
import Link from "next/link";
import { PlusOutlined, SmileOutlined } from "@ant-design/icons";

const GRAPHQL_QUERY = gql`
  query {
    myOrganizations {
      data {
        id
        name
        alias
      }
    }
  }
`;

function OrganizationCards() {
  const { loading, error, data } = useQuery(GRAPHQL_QUERY, {
    variables: {},
  });

  const myOrganizations = get(data, "myOrganizations.data", []);

  return (
    <>
      {myOrganizations.map((org) => {
        return (
          <div className={"organization-card"} key={`myorg-card-${org.id}`}>
            <Link href={`/${org.alias}`}>
              <a>
                <div className="organization-button">
                  <div className="circle-letter">
                    {toUpper(org.name).substr(0, 1)}
                  </div>
                  <h5>{org.name}</h5>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
      <div className={"organization-card"}>
        <Link href={`/create-organization`}>
          <a>
            <div className="organization-button">
              <PlusOutlined />
              <h5>New Organization</h5>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
}

export default OrganizationCards;
