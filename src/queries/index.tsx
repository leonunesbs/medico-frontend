import { client } from '@/utils/api'
import { gql } from 'graphql-request'
import { useQuery } from 'react-query'

export function getConsultas(
  email = 'email@email.com',
  first = 2,
  initalData = {}
) {
  return useQuery(
    'consultas',
    async () => {
      const data = await client.request(
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
        }
      )
      return data.consultas
    },
    {
      initialData: initalData
    }
  )
}

export function getPaciente(email = 'email@email.com', initalData: any = {}) {
  return useQuery(
    'paciente',
    async () => {
      const data = await client.request(
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
        }
      )
      return data.pacienteByEmail
    },
    {
      initialData: initalData
    }
  )
}
