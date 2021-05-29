import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: !(process.env.NODE_ENV === 'production')
    ? 'https://leonunesbs-backend.herokuapp.com/graphql/'
    : 'http://localhost:8000/graphql/',
  cache: new InMemoryCache()
})
