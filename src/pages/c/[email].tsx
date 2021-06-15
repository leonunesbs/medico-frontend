import React from 'react'

import { IColaboradorPage } from '@/interfaces'
import { Colaborador as ColaboradorComponent, Layout } from '@/components'
import { GetServerSideProps } from 'next'
import { client } from '@/services/api'
import { gql } from 'graphql-request'

const Colaborador: React.FC<IColaboradorPage.IProps> = ({ unidades }) => {
  return (
    <Layout height={['1480px', '720px']}>
      <ColaboradorComponent unidades={unidades} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data: any = await client
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
                      unidade {
                        nome
                      }
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
