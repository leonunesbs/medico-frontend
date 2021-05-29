// region GLOBAL
import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { GetStaticProps } from 'next'
import {
  Flex,
  Heading,
  Text,
  Wrap,
  WrapItem,
  Button,
  Stack,
  Circle,
  Avatar,
  Box,
  Collapse,
  useDisclosure
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
// endregion

// region LOCAL
import { IAgendaPage } from '@/interfaces'
import { Layout, Seo, GradientHeading } from '@/components'
import { client } from '@/utils/api'
// endregion

const Paciente: React.FC<IAgendaPage.IProps> = ({ paciente }) => {
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
    <Layout height={['950px', '950px']}>
      <Seo title={`${paciente.nome} | Paciente`} description="Paciente" />
      <Flex flexDir="column" flexGrow={1} my={4} p={2}>
        <Flex flexDir="column" align="center">
          <Circle size="140px" p={1} bgColor="brand.500" mb={2}>
            <Avatar
              size="full"
              name="Ryan Florence"
              src="https://bit.ly/ryan-florence"
            />
          </Circle>
          <Heading
            as="h1"
            textAlign="center"
            bgGradient="linear(to-br, brand.500,  brand.600)"
            bgClip="text"
          >
            {paciente.nome}
          </Heading>
        </Flex>
        <Flex flexDir="column" boxShadow="base" borderRadius="md" my={4} p={4}>
          <Text>Email: {paciente.user.email}</Text>
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
            p={4}
          >
            {' '}
            Teste
          </WrapItem>

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
                {paciente.consultas.edges.length > 0 ? (
                  paciente.consultas.edges.map(
                    (edge: {
                      node: {
                        id: string
                        dataConsulta: any
                        colaborador: {
                          nome: string
                        }
                        anamnese: string
                        exameFisico: string
                      }
                    }) => {
                      // eslint-disable-next-line no-irregular-whitespace
                      // Gambiarra
                      const { isOpen, onToggle } = useDisclosure()
                      return (
                        <Flex
                          flexDir="column"
                          boxShadow="base"
                          borderRadius="md"
                          key={edge.node.dataConsulta}
                        >
                          <Button
                            w="full"
                            justifyContent="space-between"
                            bgColor="transparent"
                            flexWrap="wrap"
                            fontWeight="normal"
                            _hover={{ fontWeight: 'semibold' }}
                            _active={{
                              color: 'brand.100',
                              bgGradient:
                                'linear(to-br, brand.500,  brand.600)',
                              fontWeight: 'bold'
                            }}
                            onClick={onToggle}
                            isActive={isOpen}
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
                          <Collapse in={isOpen} animateOpacity>
                            <Flex
                              flexDir="column"
                              p={4}
                              align="flex-start"
                              color="white"
                              borderBottomRadius="md"
                            >
                              <Text
                                fontSize="sm"
                                color="brand.700"
                                fontWeight="semibold"
                              >
                                Anamnese
                              </Text>
                              <Text color="brand.700">
                                {edge.node.anamnese}
                              </Text>
                              <Text
                                fontSize="sm"
                                color="brand.700"
                                fontWeight="semibold"
                              >
                                Exame físico
                              </Text>
                              <Text color="brand.700">
                                {edge.node.exameFisico}
                              </Text>
                            </Flex>
                          </Collapse>
                        </Flex>
                      )
                    }
                  )
                ) : (
                  <Text textAlign="center" as="i">
                    Não há consultas anteriores.
                  </Text>
                )}
              </Stack>
            </Flex>
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
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: gql`
      query getPaciente($email: String!) {
        pacienteByEmail(email: $email) {
          nome
          idade
          dataDeNascimento
          cpf
          user {
            email
          }
          consultas {
            edges {
              node {
                id
                dataConsulta
                colaborador {
                  nome
                }
                anamnese
                exameFisico
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
      paciente: data.pacienteByEmail
    },
    revalidate: 1
  }
}

export default Paciente
