import { QueryClient } from 'react-query'

export const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://leonunesbs-backend.herokuapp.com/graphql/'
    : 'http://localhost:8000/graphql/'

export const queryClient = new QueryClient()
