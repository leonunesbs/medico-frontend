import { GraphQLClient } from 'graphql-request'
import { QueryClient } from 'react-query'

export const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://leonunesbs-backend.herokuapp.com/graphql/'
    : 'http://localhost:8000/graphql/'

const getHeaders = () => {
  // get the authentication token from local storage if it exists
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        authorization: token ? `JWT ${token}` : ''
      }
    }
  }
}

export const client: GraphQLClient = new GraphQLClient(endpoint, getHeaders())
export const queryClient = new QueryClient()
