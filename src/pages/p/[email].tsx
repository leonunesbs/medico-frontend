// region GLOBAL
import React from 'react'
import { gql } from '@apollo/client'
import { GetStaticProps } from 'next'
import NextLink from 'next/link'
import {
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  Wrap,
  WrapItem,
  Button,
  Stack
} from '@chakra-ui/react'
// endregion

// region LOCAL
import { IAgendaPage } from '@/interfaces'
import { Layout, Seo, GradientHeading } from '@/components'
import { client } from '@/utils/api'
// endregion

const Paciente: React.FC<IAgendaPage.IProps> = ({ paciente }) => {
  return (
    <Layout height="800px">
      <Seo title={`${paciente.nome} | Paciente`} description="Paciente" />

      <Flex flexDir="column" flexGrow={1} my={4} p={2}>
        <Heading
          as="h1"
          textAlign="center"
          bgGradient="linear(to-br, brand.500,  brand.600)"
          bgClip="text"
        >
          {paciente.nome}
        </Heading>

        <Flex flexDir="column" boxShadow="base" borderRadius="md" my={4} p={4}>
          <Text>Idade: {paciente.idade} anos</Text>
          <Text>
            Data de nascimento:{' '}
            {new Date(paciente.dataDeNascimento).toLocaleString('pt-BR', {
              timeZone: 'UTC',
              dateStyle: 'short'
            }) || 'Not found'}
          </Text>
          <Text>CPF: {paciente.cpf}</Text>
        </Flex>

        <Wrap>
          <WrapItem
            flexDir="column"
            boxShadow="base"
            borderRadius="md"
            flexGrow={1}
            alignItems="center"
            p={4}
          >
            <GradientHeading size="sm">Histórico de consultas</GradientHeading>
            <Flex flexDir="column" w="100%" mt={2}>
              <Flex justify="space-between">
                <Text textAlign="left" fontWeight="semibold">
                  Data da consulta
                </Text>
                <Text textAlign="right" fontWeight="semibold">
                  Colaborador
                </Text>
              </Flex>
              <Stack mt={2}>
                {paciente.consultas.edges.map((edge) => {
                  return (
                    <LinkBox key={edge.node.dataConsulta}>
                      <NextLink href="/#" as="/#" passHref>
                        <LinkOverlay>
                          <Button
                            w="full"
                            justifyContent="space-between"
                            bgColor="transparent"
                            flexWrap="wrap"
                            fontWeight="normal"
                            _hover={{ fontWeight: 'bold' }}
                            _active={{ color: 'brand.500' }}
                            boxShadow="base"
                          >
                            <Text>
                              {new Date(edge.node.dataConsulta).toLocaleString(
                                'pt-BR',
                                {
                                  timeZone: 'UTC',
                                  dateStyle: 'short'
                                }
                              )}
                            </Text>
                            <Text>{edge.node.colaborador.nome}</Text>
                          </Button>
                        </LinkOverlay>
                      </NextLink>
                    </LinkBox>
                  )
                })}
              </Stack>
            </Flex>
          </WrapItem>
          <WrapItem
            flexDir="column"
            boxShadow="base"
            borderRadius="md"
            flexGrow={1}
            p={4}
          >
            {' '}
            Teste
          </WrapItem>
        </Wrap>
      </Flex>
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
              idade
              dataDeNascimento
              cpf
              consultas {
                edges {
                  node {
                    dataConsulta
                    colaborador {
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
