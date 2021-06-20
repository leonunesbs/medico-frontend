// region GLOBAL
import React from 'react'
// endregion

// region LOCAL
import { IAgendaPage } from '@/interfaces'
import { GradientHeading, Layout } from '@/components'
import { Avatar, Button, Circle, Flex, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { client } from '@/services/api'
import { gql } from 'graphql-request'
import { useRouter } from 'next/router'

// endregion

const Agenda: React.FC<IAgendaPage.IProps> = ({ colaboradores }) => {
  const router = useRouter()
  return (
    <Layout height="320px">
      <Flex flexGrow={1} direction="column" m={2} h="280px">
        <GradientHeading>Agendas</GradientHeading>
        <Flex wrap="wrap" p={4} boxShadow="base" rounded="md">
          {colaboradores.map(({ node: colaborador }) => {
            return (
              <Button
                key={colaborador.id}
                boxShadow="base"
                borderRadius="md"
                h="75px"
                w="100%"
                maxW={['100%', '100%', '270px']}
                size="lg"
                bgColor="transparent"
                _focus={{}}
                m={1}
                onClick={() => router.push(`/c/${colaborador.user.email}`)}
              >
                <Flex align="center" justify="flex-start" w="100%">
                  <Circle
                    size="45px"
                    p={0.5}
                    bgGradient="linear(to-br, brand.500,  brand.600)"
                    m={2}
                  >
                    <Avatar
                      size="full"
                      name="Ryan Florence"
                      src="https://bit.ly/ryan-florence"
                    />
                  </Circle>
                  <Flex direction="column" textAlign="left" justify="center">
                    <Text
                      color="brand.500"
                      fontSize="lg"
                      fontWeight="bold"
                      isTruncated
                      maxW={['170px']}
                    >
                      {colaborador.nome}
                    </Text>
                    <Text fontSize="sm">{colaborador.ocupacao}</Text>
                  </Flex>
                </Flex>
              </Button>
            )
          })}
        </Flex>
      </Flex>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await client
    .request(
      gql`
        query {
          colaboradores {
            edges {
              node {
                id
                nome
                ocupacao
                user {
                  email
                }
              }
            }
          }
        }
      `
    )
    .then((data) => {
      return {
        props: {
          colaboradores: data.colaboradores.edges
        }
      }
    })

  return data
}

export default Agenda
