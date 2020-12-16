import { withApollo } from 'next-apollo'
import { ApolloClient, InMemoryCache } from '@apollo/client'

import { APP_URL } from './config'

// const link = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//       ),
//     );

//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  uri: `${APP_URL}/api/graphql`,
  cache: new InMemoryCache()
})

export default withApollo(apolloClient)
