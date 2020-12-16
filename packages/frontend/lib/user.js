import React from "react";
import fetch from "isomorphic-unfetch";
import { useQuery, gql } from "@apollo/client";

import auth0 from "./auth0";
import { APP_URL } from "./config";

// Use a global to save the user, so we don't have to fetch it again after page navigations
let userState;

const User = React.createContext({ user: null, loading: false });

const PROFILE_QUERY = gql`
  {
    profile {
      id
      firstName
      lastName
      picture
    }
  }
`;

export const fetchUser = async () => {
  if (userState !== undefined) {
    return userState;
  }

  const res = await fetch(`${APP_URL}/api/me`);
  userState = res.ok ? await res.json() : null;
  return userState;
};

export const UserProvider = ({ children }) => {
  const { loading, error, data } = useQuery(PROFILE_QUERY, {
    variables: {},
  });

  console.log("data", data);

  return (
    <User.Provider
      value={{
        user: data,
        userLoading: loading,
        userError: error,
      }}
    >
      {children}
    </User.Provider>
  );
};

export const useUser = () => React.useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = React.useState({
    user: userState || null,
    loading: userState === undefined,
  });

  React.useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;

    fetchUser().then((user) => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        setUser({ user, loading: false });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [userState]);

  return data;
};
