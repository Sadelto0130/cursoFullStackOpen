import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"
import { authStorage } from "./authStorage";

const httpLink = new HttpLink({
  uri: process.env.EXPO_PUBLIC_URI_GRAPHQL,
  headers: {
    "apollo-require-preflight": "true",
    "Content-Type": "application/json"
  }
})

const authLink = setContext(async (_, {headers}) => {
  const token = await authStorage.getAccessToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    },
  };
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client;
