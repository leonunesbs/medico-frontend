// region GLOBAL
import React from 'react'
import { gql } from '@apollo/client'
import { GetStaticProps } from 'next'
import { Flex } from '@chakra-ui/layout'
// endregion

// region LOCAL
import { IAgendaPage } from '@/interfaces'
import { Layout, Seo } from '@/components'
import { client } from '@/utils/api'
// endregion

const Paciente: React.FC<IAgendaPage.IProps> = ({ paciente }) => {
  return (
    <Layout>
      <Seo title={`${paciente.nome} | Paciente`} description="Paciente" />
      <Flex>{paciente.nome}</Flex>
    </Layout>
  )
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        pacientes {
          edges {
            node {
              user {
                email
              }
            }
          }
        }
      }
    `
  })

  return {
    paths: data.pacientes.edges.map(
      (edge: { node: { user: { email: any } } }) => ({
        params: {
          email: edge.node.user.email
        }
      })
    ),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: gql`
      query getPaciente($email: String!) {
        pacientes(user_Email: $email) {
          edges {
            node {
              nome
            }
          }
        }
      }
    `,
    variables: {
      email: params?.email
    }
  })

  return {
    props: {
      paciente: data.pacientes.edges[0].node
    },
    revalidate: 1
  }
}

export default Paciente
