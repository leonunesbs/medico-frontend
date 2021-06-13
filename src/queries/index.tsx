import { client } from '@/services/api'
import { gql } from 'graphql-request'
import { parseCookies } from 'nookies'
import { useQuery } from 'react-query'

export function getConsultas(
  email = 'email@email.com',
  first = 2,
  initalData = {}
) {
  return useQuery(
    'consultas',
    async () => {
      const { 'medico:token': token } = parseCookies()
      const data = await client
        .request(
          gql`
            query getConsultas($email: String!, $first: Int) {
              consultas(
                orderBy: "-dataConsulta"
                paciente_User_Email: $email
                first: $first
              ) {
                edges {
                  node {
                    id
                    dataConsulta
                    colaborador {
                      nome
                    }
                    consulta
                  }
                }
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
              }
            }
          `,
          {
            email: email,
            first: first
          },
          {
            authorization: `JWT ${token}`
          }
        )
        .then((data) => data.consultas)
      return data
    },
    {
      initialData: initalData
    }
  )
}

export function getPaciente(email = 'email@email.com', initalData: any = {}) {
  const { 'medico:token': token } = parseCookies()
  return useQuery(
    'paciente',
    async () => {
      const data = await client
        .request(
          gql`
            query getPaciente($email: String!) {
              pacienteByEmail(email: $email) {
                id
                nome
                idade
                dataDeNascimento
                cpf
                user {
                  email
                }
              }
            }
          `,
          {
            email: email
          },
          {
            authorization: `JWT ${token}`
          }
        )
        .then((data) => data.pacienteByEmail)
      return data
    },
    {
      initialData: initalData
    }
  )
}
