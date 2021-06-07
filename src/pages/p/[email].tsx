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
import { client } from '@/services/api'
import { GetServerSideProps } from 'next'
import { PacienteTabs } from '@/components/organisms'
import { parseCookies } from 'nookies'

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
    <Layout height="1440px">
      <Seo title={`${paciente.nome} | Paciente`} description="Paciente" />
      <Flex flexDir="column" flexGrow={1} p={2}>
        <IdPacienteCard paciente={paciente} />
        <PacienteTabs paciente={paciente} consultas={consultas} />
      </Flex>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'medico:token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

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
      email: ctx.params?.email
    }
  )
  return {
    props: {
      paciente: data.pacienteByEmail,
      consultas: data.consultas
    }
  }
}

export default Paciente
