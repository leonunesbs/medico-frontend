import React, { useEffect, useRef, useState } from 'react'
import {
  Avatar,
  Center,
  Circle,
  Button,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Collapse,
  useDisclosure,
  useOutsideClick
} from '@chakra-ui/react'

import { IColaboradorPage } from '@/interfaces'
import { GradientHeading, Layout } from '@/components'
import { GetServerSideProps } from 'next'
import { client } from '@/services/api'
import { gql } from 'graphql-request'
import { dynamicSort, dynamicSortNode } from '@/utils/dynamicSort'

const Colaborador: React.FC<IColaboradorPage.IProps> = ({ unidades }) => {
  return (
    <Layout height={['1480px', '720px']}>
      <Flex
        flexWrap="wrap"
        p={2}
        justify={['center', 'center', 'center', 'space-between']}
        maxH="240px"
      >
        <Circle
          size={['240px', '360px']}
          p={1}
          bgGradient="linear(to-br, brand.500,  brand.600)"
          mb={2}
        >
          <Avatar
            size="full"
            name="Ryan Florence"
            src="https://bit.ly/ryan-florence"
          />
        </Circle>
        <Flex
          flexDir="column"
          alignSelf="flex-start"
          maxW={['100%', '100%', '100%', '60%']}
        >
          <Flex flexDir="column" boxShadow="base" borderRadius="md" p={2}>
            <GradientHeading as="h1" textAlign="left">
              Leonardo Nunes
            </GradientHeading>
            <Text as="h2" fontWeight="semibold" lineHeight={0.8} mb={4}>
              Generalista
            </Text>
            <Text textAlign="justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </Flex>

          <Flex
            p={4}
            boxShadow="base"
            flexDir="column"
            borderRadius="md"
            mt={4}
          >
            <GradientHeading size="md" textAlign="left">
              Agenda
            </GradientHeading>
            {unidades?.map(
              ({ node: unidade }: IColaboradorPage.UnidadesProps) => {
                const { isOpen, onOpen, onClose } = useDisclosure()
                const [activeId, setActiveId] = useState('')

                const collapseRef = useRef<HTMLDivElement>(null)

                useOutsideClick({
                  ref: collapseRef,
                  handler: () => onClose()
                })

                useEffect(() => {
                  if (!isOpen) {
                    setActiveId('')
                  }
                }, [isOpen])

                const agendas = unidade.agendas.edges.sort(
                  dynamicSortNode('horario')
                )

                if (unidade.agendas.edges.length >= 1) {
                  return (
                    <Flex key={unidade.id} flexDir="column">
                      <GradientHeading
                        size="sm"
                        textAlign="left"
                        fontWeight="semibold"
                        mt={4}
                      >
                        <Text as="span" fontWeight="normal" color="brand.700">
                          Unidade:{' '}
                        </Text>
                        {unidade.nome}
                      </GradientHeading>
                      <Wrap mt={2}>
                        {agendas.map(({ node }) => {
                          return (
                            <WrapItem key={node.id}>
                              <Center>
                                <Button
                                  onClick={() => {
                                    onOpen()
                                    setActiveId(node.id)
                                  }}
                                  borderRadius="md"
                                  flexDir="column"
                                  h="70px"
                                  w="90px"
                                  bgColor="brand.100"
                                  boxShadow="base"
                                  _hover={{
                                    backgroundColor: 'brand.500',
                                    color: 'brand.100'
                                  }}
                                  _active={{
                                    backgroundColor: 'brand.600',
                                    color: 'brand.100'
                                  }}
                                  _focus={{}}
                                  isActive={node.id === activeId}
                                >
                                  <Text>
                                    {new Date(node.horario).getDate()}
                                  </Text>
                                  <Text>
                                    {new Date(node.horario).toLocaleDateString(
                                      'pt-BR',
                                      {
                                        month: 'long'
                                      }
                                    )}
                                  </Text>
                                  <Text>
                                    {new Date(node.horario).toLocaleDateString(
                                      'pt-BR',
                                      {
                                        year: 'numeric'
                                      }
                                    )}
                                  </Text>
                                </Button>
                              </Center>
                            </WrapItem>
                          )
                        })}
                      </Wrap>
                      <Collapse in={isOpen} animateOpacity>
                        <Flex
                          ref={collapseRef}
                          p={4}
                          color="brand.500"
                          mt={2}
                          rounded="md"
                          shadow="base"
                        >
                          {agendas.map(({ node }) => {
                            if (node.id === activeId) {
                              return (
                                <Button
                                  key={node.id}
                                  borderRadius="md"
                                  flexDir="column"
                                  h="50px"
                                  w="80px"
                                  bgColor="brand.100"
                                  boxShadow="base"
                                  _hover={{
                                    backgroundColor: 'brand.500',
                                    color: 'brand.100'
                                  }}
                                  _active={{
                                    backgroundColor: 'brand.600',
                                    color: 'brand.100'
                                  }}
                                  _focus={{}}
                                >
                                  <Text>
                                    {new Date(node.horario).toLocaleTimeString(
                                      'pt-BR',
                                      {
                                        hour: '2-digit'
                                      }
                                    )}
                                    h
                                    {new Date(node.horario).toLocaleTimeString(
                                      'pt-BR',
                                      {
                                        minute: '2-digit'
                                      }
                                    ).length < 2
                                      ? `0${new Date(
                                          node.horario
                                        ).toLocaleTimeString('pt-BR', {
                                          minute: '2-digit'
                                        })}`
                                      : new Date(
                                          node.horario
                                        ).toLocaleTimeString('pt-BR', {
                                          minute: '2-digit'
                                        })}
                                  </Text>
                                </Button>
                              )
                            } else {
                              return null
                            }
                          })}
                        </Flex>
                      </Collapse>
                    </Flex>
                  )
                } else {
                  return null
                }
              }
            )}
          </Flex>
        </Flex>
      </Flex>
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
