import React from 'react'

import { IColaboradorPage } from '@/interfaces'
import { ColaboradorComponent, Layout } from '@/components'
import { GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { client } from '@/services/api'
import { gql } from 'graphql-request'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link
} from '@chakra-ui/react'

const Colaborador: React.FC<IColaboradorPage.IProps> = ({
  unidades,
  colaborador
}) => {
  return (
    <Layout height={['1480px', '720px']} isTokenExpirable={false}>
      <Flex direction="column">
        <Breadcrumb spacing="8px" separator=">" mt={4}>
          <BreadcrumbItem>
            <BreadcrumbLink as={NextLink} href="/agendas" passHref>
              <Link rounded="full">Agendas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage color="brand.500">
            <BreadcrumbLink
              as={NextLink}
              passHref
              href={`/c/${colaborador.user.email}`}
            >
              <Link rounded="full">{colaborador.nome}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <ColaboradorComponent unidades={unidades} colaborador={colaborador} />
      </Flex>
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
                      colaborador {
                        nome
                        ocupacao
                        user {
                          email
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          colaboradorByEmail(email: $email) {
            id
            nome
            user {
              email
            }
            ocupacao
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
          unidades: data.unidades.edges,
          colaborador: data.colaboradorByEmail[0]
        }
      }
    })

  return data
}

export default Colaborador
