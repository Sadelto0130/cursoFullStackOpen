import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloLink as CoreApolloLink } from '@apollo/client/core'
import {ApolloProvider} from '@apollo/client/react'
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const linkHttp = new HttpLink({uri: "http://localhost:4000"})

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('library-user-token')
  operation.setContext({
    headers: { authorization: token ? `Bearer ${token}` : '' }
  })
  return forward(operation)
})

const wsLink = new GraphQLWsLink(
  createClient({uri: `ws://localhost:4000/graphql`,})
)

const link = CoreApolloLink.split(
  ({query}) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(linkHttp)
)

const client = new ApolloClient({
  link, 
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
