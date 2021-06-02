// region GLOBAL
import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { gql } from 'graphql-request'

import '@uiw/react-md-editor/dist/markdown-editor.css'
import '@uiw/react-markdown-preview/dist/markdown.css'

// endregion

// region LOCAL
import { IAgendaPage } from '@/interfaces'
import { IdPacienteCard, Layout, Seo } from '@/components'
import { client } from '@/utils/api'
import { GetStaticProps } from 'next'
import { PacienteTabs } from '@/components/organisms'

// endregion

const Paciente: React.FC<IAgendaPage.IProps> = ({ paciente, consultas }) => {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <Layout height="100px">
        <Flex w="100%" justify="center">
          <Heading
            as="h1"
            bgGradient="linear(to-br, brand.500,  brand.600)"
            bgClip="text"
          >
            Carregando...
          </Heading>
        </Flex>
      </Layout>
    )
  }

  return (
    <Layout height={['1280px', '1280px']}>
      <Seo title={`${paciente.nome} | Paciente`} description="Paciente" />
      <Flex flexDir="column" flexGrow={1} p={2}>
        <IdPacienteCard paciente={paciente} />
        <PacienteTabs paciente={paciente} consultas={consultas} />
      </Flex>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const data: any = await client.request(
    gql`
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
  )
  return {
    paths: data.pacientes.edges.map(
      (edge: { node: { user: { email: any } } }) => ({
        params: {
          email: edge.node.user.email
        }
      })
    ),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data: any = await client.request(
    gql`
      query getStaticProps($email: String!) {
        consultas(
          orderBy: "-dataConsulta"
          paciente_User_Email: $email
          first: 2
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
      email: params?.email
    }
  )
  return {
    props: {
      paciente: data.pacienteByEmail,
      consultas: data.consultas
    },
    revalidate: 1
  }
}

export default Paciente
