import React from 'react'

import { IColaboradorPage } from '@/interfaces'
import { ColaboradorComponent, Layout } from '@/components'
import { GetServerSideProps } from 'next'
import { client } from '@/services/api'
import { gql } from 'graphql-request'

const Colaborador: React.FC<IColaboradorPage.IProps> = ({ unidades }) => {
  return (
    <Layout height={['1480px', '720px']} isTokenExpirable={false}>
      <ColaboradorComponent unidades={unidades} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await client
    .request(
      gql`
        query($email: String!) {
          unidades {
            edges {
              node {
                id
                nome
                agendas(colaborador_User_Email: $email) {
                  edges {
                    node {
                      id
                      horario
                    }
                  }
                }
              }
            }
          }
        }
      `,
      {
        email: ctx.params?.email
      }
    )
    .then((data) => {
      return {
        props: {
          unidades: data.unidades.edges
        }
      }
    })

  return data
}

export default Colaborador
