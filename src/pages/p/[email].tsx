// region GLOBAL
import React, { useEffect, useRef, useState } from 'react'
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
  Input,
  IconButton,
  Icon
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import { gql } from 'graphql-request'

import '@uiw/react-md-editor/dist/markdown-editor.css'
import '@uiw/react-markdown-preview/dist/markdown.css'

// endregion

// region LOCAL
import { IAgendaPage } from '@/interfaces'
import { Layout, Seo, GradientHeading, CustomButton } from '@/components'
import { ConsultaCard, UnformTextareaInput } from '@/components/atoms'
import { queryClient, client } from '@/utils/api'
import { useMutation, useQuery } from 'react-query'
import { GetStaticProps } from 'next'
import MDEditor from '@uiw/react-md-editor'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

// endregion

function getPaciente(email = 'email@email.com', initalData: any = {}) {
  return useQuery(
    'paciente',
    async () => {
      const data = await client.request(
        gql`
          query getPaciente($email: String!) {
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
          email: email
        }
      )
      return data.pacienteByEmail
    },
    {
      initialData: initalData
    }
  )
}

function getConsultas(email = 'email@email.com', first = 2, initalData = {}) {
  return useQuery(
    'consultas',
    async () => {
      const data = await client.request(
        gql`
          query getConsultas($email: String!, $first: Int) {
            consultas(
              orderBy: "-dataConsulta"
              paciente_User_Email: $email
              first: $first
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
            }
          }
        `,
        {
          email: email,
          first: first
        }
      )
      return data.consultas
    },
    {
      initialData: initalData
    }
  )
}

const listener = (ev: any) => {
  ev.preventDefault()
  return (ev.returnValue = 'Are you sure you want to close?')
}

const Paciente: React.FC<IAgendaPage.IProps> = ({
  paciente: initialPaciente,
  consultas: initialConsultas
}) => {
  const router = useRouter()
  const { email } = router.query
  const formRef = useRef<FormHandles>(null)
  const { data: paciente } = getPaciente(email?.toString(), initialPaciente)

  const [consultaDisplayQtd, setConsultaDisplayQtd] = useState(3)
  const {
    data: consultas,
    refetch: consultasRefetch,
    isLoading: consultasIsLoading
  } = getConsultas(email?.toString(), consultaDisplayQtd, initialConsultas)

  const [consulta, setConsulta] = useState(`
  ## Anamnese 
  ...
  ## Exame físico
  ...`)

  const novaConsulta = useMutation(
    (formData: any) => {
      return client.request(
        gql`
          mutation novaConsulta($pacienteId: ID!, $consulta: String) {
            novaConsulta(pacienteId: $pacienteId, consulta: $consulta) {
              consulta {
                id
                dataConsulta
                colaborador {
                  nome
                }
                consulta
              }
            }
          }
        `,
        formData
      )
    },
    {
      onSuccess: (data) => {
        formRef.current?.reset()
        setConsulta('')
        queryClient.setQueryData('consultas', {
          ...consultas,
          edges: [{ node: data.novaConsulta.consulta }, ...consultas.edges]
        })
        window.removeEventListener('beforeunload', listener)
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )

  useEffect(() => {
    window.addEventListener('beforeunload', listener)
  }, [])

  useEffect(() => {
    consultasRefetch()
  }, [consultaDisplayQtd])

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

  const handleNovaConsulta: SubmitHandler<IAgendaPage.FormData> = async () => {
    novaConsulta.mutate({
      pacienteId: paciente.id,
      consulta: consulta
    })
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(
      'token',
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imxlb251bmVzYnNAZ21haWwuY29tIiwiZXhwIjoxNjIyNTEyNjkwLCJvcmlnSWF0IjoxNjIyNTEyMzkwfQ.GVSqcAiHq1fL4H7aJgcpggcSghfNarnif4wdA7uDEso'
    )
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
            <GradientHeading size="sm" mb={2}>
              Nova consulta
            </GradientHeading>
            <Flex flexDir="column" w="100%">
              <Form ref={formRef} onSubmit={handleNovaConsulta}>
                <Flex
                  flexDir="column"
                  align="flex-start"
                  borderBottomRadius="md"
                >
                  <MDEditor
                    value={consulta}
                    onChange={(value) =>
                      value &&
                      (setConsulta(value),
                      localStorage.setItem('consulta', value))
                    }
                    style={{
                      display: 'flex',
                      width: '100%',
                      flexDirection: 'column'
                    }}
                    height={300}
                  />
                  <CustomButton
                    type="submit"
                    alignSelf="center"
                    my={2}
                    isLoading={novaConsulta.isLoading}
                  >
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
                <Text textAlign="left">Data da consulta</Text>
                <Text textAlign="right">Colaborador</Text>
              </Flex>
              <Stack mt={2}>
                {consultas.edges.length > 0 ? (
                  consultas.edges.map(
                    (edge: {
                      node: {
                        id: string
                        consulta: string
                        colaborador: { nome: string }
                        dataConsulta: string
                      }
                    }) => {
                      return <ConsultaCard key={edge.node.id} edge={edge} />
                    }
                  )
                ) : (
                  <Text textAlign="center" as="i">
                    Não há consultas anteriores.
                  </Text>
                )}
              </Stack>
            </Flex>
            <Stack isInline align="center" justify="center">
              {consultaDisplayQtd > 2 && (
                <IconButton
                  aria-label="ver menos"
                  onClick={() => setConsultaDisplayQtd(consultaDisplayQtd - 2)}
                  isLoading={consultasIsLoading}
                  bgColor="transparent"
                  _active={{ color: 'brand.800' }}
                  _hover={{ bgColor: 'transparent', color: 'brand.500' }}
                  _focus={{}}
                  color="brand.700"
                  icon={<Icon as={AiOutlineMinus} w={4} h={4} />}
                />
              )}
              <IconButton
                aria-label="ver mais"
                onClick={() => setConsultaDisplayQtd(consultaDisplayQtd + 2)}
                isLoading={consultasIsLoading}
                bgColor="transparent"
                _active={{ color: 'brand.800' }}
                _hover={{ bgColor: 'transparent', color: 'brand.500' }}
                _focus={{}}
                color="brand.700"
                icon={<Icon as={AiOutlinePlus} w={4} h={4} />}
              />
            </Stack>
          </WrapItem>
        </Wrap>
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
      email: params?.email,
      authorization: ''
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
