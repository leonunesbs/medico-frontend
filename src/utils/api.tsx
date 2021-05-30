import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all'
  }
}

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://leonunesbs-backend.herokuapp.com/graphql/'
      : 'http://localhost:8000/graphql/'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : ''
      }
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
})
