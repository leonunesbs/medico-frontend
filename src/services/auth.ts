import { gql } from 'graphql-request'
import { client } from './api'

type SignInRequestData = {
  email: string
  password: string
}

export async function tokenAuth(data: SignInRequestData) {
  const requestData = await client
    .request(
      gql`
        mutation($email: String!, $password: String!) {
          tokenAuth(email: $email, password: $password) {
            token
            payload
            refreshExpiresIn
          }
        }
      `,
      {
        email: data.email,
        password: data.password
      }
    )
    .then((data) => data.tokenAuth)
    .catch((error) => error)

  return requestData
}

export async function refreshPayload(token: string) {
  const requestData = await client
    .request(
      gql`
        mutation($token: String!) {
          verifyToken(token: $token) {
            payload
          }
        }
      `,
      {
        token: token
      }
    )
    .then((data) => data.verifyToken)
    .catch((error) => error)

  return requestData
}

export async function refreshToken(token: string) {
  const requestData = await client
    .request(
      gql`
        mutation($token: String!) {
          refreshToken(token: $token) {
            payload
            token
          }
        }
      `,
      {
        token: token
      }
    )
    .then((data) => data.refreshToken)
    .catch((error) => error)

  return requestData
}
