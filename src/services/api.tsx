import { GraphQLClient } from 'graphql-request'
import { parseCookies } from 'nookies'
import { QueryClient } from 'react-query'

export const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://leonunesbs-backend.herokuapp.com/graphql/'
    : 'http://localhost:8000/graphql/'

const getHeaders = () => {
  // get the authentication token from local storage if it exists
  const { 'medico:token': token } = parseCookies()
  if (token) {
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
