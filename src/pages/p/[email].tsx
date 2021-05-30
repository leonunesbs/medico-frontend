// region GLOBAL
import React, { useRef } from 'react'
import { gql, useMutation } from '@apollo/client'
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
  Avatar
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
// endregion

// region LOCAL
import { IAgendaPage } from '@/interfaces'
import { Layout, Seo, GradientHeading, CustomButton } from '@/components'
import { client } from '@/utils/api'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import { UnformTextareaInput } from '@/components/atoms'
// endregion
const NOVA_CONSULTA = gql`
  mutation novaConsulta(
    $pacienteId: ID!
    $anamnese: String
    $exameFisico: String
  ) {
    novaConsulta(
      pacienteId: $pacienteId
      anamnese: $anamnese
      exameFisico: $exameFisico
    ) {
      consulta {
        anamnese
        exameFisico
      }
    }
  }
`

const Paciente: React.FC<IAgendaPage.IProps> = ({ paciente, consultas }) => {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [novaConsulta, { data: novaConsultaData }] = useMutation(NOVA_CONSULTA)

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback || !paciente || !consultas) {
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

  const handleNovaConsulta: SubmitHandler<IAgendaPage.FormData> = async (
    formData
  ) => {
    localStorage.setItem(
      'token',
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imxlb251bmVzYnNAZ21haWwuY29tIiwiZXhwIjoxNjIyMzgzNzg4LCJvcmlnSWF0IjoxNjIyMzgzNDg4fQ.-VT8YxF5d5YSFZW-GzXaiZsnt11kIXkHYv9qF71PmCQ'
    )
    novaConsulta({
      variables: {
        pacienteId: paciente.id,
        ...formData
      }
    })
  }

  return (
    <Layout height={['950px', '950px']}>
      <Seo title={`${paciente.nome} | Paciente`} description="Paciente" />
      <Flex flexDir="column" flexGrow={1} p={2}>
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
            alignItems="center"
            h="100%"
          >
            <GradientHeading size="sm">Nova consulta</GradientHeading>
            <Flex flexDir="column" w="100%">
              <Form ref={formRef} onSubmit={handleNovaConsulta}>
                <Flex
                  flexDir="column"
                  align="flex-start"
                  borderBottomRadius="md"
                >
                  <Text fontSize="sm" color="brand.700" fontWeight="semibold">
                    Anamnese
                  </Text>
                  <UnformTextareaInput name="anamnese" />
                  <Text
                    fontSize="sm"
                    color="brand.700"
                    fontWeight="semibold"
                    mt={2}
                  >
                    Exame físico
                  </Text>
                  <UnformTextareaInput name="exameFisico" />
                  <CustomButton type="submit" alignSelf="center" mt={2}>
                    Finalizar consulta
                  </CustomButton>
                </Flex>
              </Form>
            </Flex>
          </WrapItem>

          <WrapItem
            flexDir="column"
            boxShadow="base"
            borderRadius="md"
            flexGrow={1}
            alignItems="center"
            h="100%"
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
                {consultas.edges.length > 0 ? (
                  consultas.edges.map(
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
                            _hover={{ color: 'semibold' }}
                            _active={{
                              color: 'brand.100',
                              bgGradient:
                                'linear(to-br, brand.500,  brand.600)',
                              fontWeight: 'bold'
                            }}
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
      query getStaticProps($email: String!) {
        consultas(orderBy: "-dataConsulta", paciente_User_Email: $email) {
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
    variables: {
      email: params?.email
    }
  })
  return {
    props: {
      paciente: data.pacienteByEmail,
      consultas: data.consultas
    },
    revalidate: 1
  }
}

export default Paciente
