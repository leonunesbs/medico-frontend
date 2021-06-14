// region GLOBAL
import React from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { Flex } from '@chakra-ui/react'
import { gql } from 'graphql-request'
import '@uiw/react-markdown-preview/dist/markdown.css'
import '@uiw/react-md-editor/dist/markdown-editor.css'

// endregion
// region LOCAL
import { IAgendaPage } from '@/interfaces'
import { client } from '@/services/api'

import { IdPacienteCard, Layout, PacientePageTabs, Seo } from '@/components'
// endregion

const Paciente: React.FC<IAgendaPage.IProps> = ({ paciente, consultas }) => {
  return (
    <Layout height="1440px">
      <Seo title={`${paciente.nome} | Paciente`} description="Paciente" />
      <Flex flexDir="column" flexGrow={1} p={2}>
        <IdPacienteCard paciente={paciente} />
        <PacientePageTabs paciente={paciente} consultas={consultas} />
      </Flex>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'medico:token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: `/login?next=${ctx.resolvedUrl}`,
        permanent: false
      }
    }
  }

  const data: any = await client
    .request(
      gql`
        query($email: String!) {
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
      },
      {
        authorization: `JWT ${token}`
      }
    )
    .then((data) => {
      return {
        props: {
          paciente: data.pacienteByEmail,
          consultas: data.consultas
        }
      }
    })

  return data
}

export default Paciente
