import { gql } from 'graphql-request'
import { client } from './api'

type SignInRequestData = {
  email: string
  password: string
}

export async function tokenAuth(data: SignInRequestData) {
  const requestData = await client.request(
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

  return requestData.tokenAuth
}

export async function recoverPayload(token: string) {
  const requestData = await client.request(
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

  return requestData.verifyToken
}
