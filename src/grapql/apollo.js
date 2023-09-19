import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'https://magentoapi.merket.io/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  headers: {
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Content-Type:": "application/json; charset=UTF-8"
  }
})

// Local site
const httpLinkLocal = createHttpLink({
  uri: 'http://local.magento245/graphql',
})

const apolloClientLocal = new ApolloClient({
  link: httpLinkLocal,
  cache,
  headers: {
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Content-Type:": "application/json; charset=UTF-8"
  }
})

const apolloProvider = createApolloProvider({
  clients: {
    onlineClient: apolloClient,
    localClient: apolloClientLocal
  },
  defaultClient: apolloClient,
})

export default apolloProvider;
