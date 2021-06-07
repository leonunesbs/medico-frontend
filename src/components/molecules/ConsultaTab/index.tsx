import React, { useEffect, useRef, useState } from 'react'

import {
  Wrap,
  WrapItem,
  Flex,
  Stack,
  IconButton,
  Icon,
  Text,
  Accordion,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import { useMutation } from 'react-query'
import { gql } from 'graphql-request'

import MDEditor from '@uiw/react-md-editor'

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import { client, queryClient } from '@/services/api'

import { GradientHeading, CustomButton, ConsultaCard } from '@/components'
import { IConsultaTab } from '@/interfaces'

const listener = (ev: any) => {
  ev.preventDefault()
  return (ev.returnValue = 'Are you sure you want to close?')
}

export const ConsultaTab: React.FC<IConsultaTab.IProps> = ({
  consultas,
  paciente,
  consultaDisplayQtd,
  setConsultaDisplayQtd
}) => {
  const formRef = useRef<FormHandles>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<any>()

  const [consultaStarted, setConsultaStarted] = useState(false)
  const [consulta, setConsulta] = useState(`
  ## Anamnese 
  ...
  ## Exame físico
  ...
    `)

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
        setConsultaStarted(false)
        setConsultaDisplayQtd(consultaDisplayQtd + 1)
        queryClient.setQueryData('consultas', {
          ...consultas,
          edges: [{ node: data.novaConsulta.consulta }, ...consultas.edges]
        })
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )

  useEffect(() => {
    if (consultaStarted) {
      window.addEventListener('beforeunload', listener)
    } else {
      window.removeEventListener('beforeunload', listener)
    }
  }, [consultaStarted])

  const startConsulta = () => {
    onOpen()
  }

  const handleNovaConsulta: SubmitHandler = async () => {
    novaConsulta.mutate({
      pacienteId: paciente.id,
      consulta: consulta
    })
  }
  return (
    <Wrap spacing={4}>
      <WrapItem
        flexDir="column"
        boxShadow="base"
        borderRadius="md"
        flexGrow={1}
        p={2}
        alignItems="center"
        h="100%"
      >
        {consultaStarted ? (
          <>
            <GradientHeading size="md">Nova consulta</GradientHeading>
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
                  <Stack
                    m={4}
                    alignSelf="center"
                    align="center"
                    justify="center"
                  >
                    <CustomButton
                      type="submit"
                      isLoading={novaConsulta.isLoading}
                    >
                      Salvar consulta
                    </CustomButton>
                    <Button
                      bgColor="transparent"
                      _active={{ color: 'brand.800' }}
                      _hover={{ bgColor: 'transparent', color: 'brand.500' }}
                      _focus={{}}
                      size="sm"
                      onClick={() => setConsultaStarted(false)}
                    >
                      Cancelar
                    </Button>
                  </Stack>
                </Flex>
              </Form>
            </Flex>
          </>
        ) : (
          <Flex flexDirection="column" p={6}>
            <CustomButton onClick={startConsulta}>Nova consulta</CustomButton>
            <AlertDialog
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader>
                  Iniciar uma nova consulta?
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogFooter>
                  <Stack isInline justify="flex-end">
                    <Button
                      ref={cancelRef}
                      onClick={onClose}
                      bgColor="brand.100"
                      color="brand.700"
                    >
                      Cancelar
                    </Button>
                    <CustomButton
                      onClick={() => {
                        setConsultaStarted(true)
                        onClose()
                      }}
                    >
                      Iniciar
                    </CustomButton>
                  </Stack>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Flex>
        )}
      </WrapItem>

      <WrapItem
        flexDir="column"
        boxShadow="base"
        borderRadius="md"
        flexGrow={1}
        alignItems="center"
        h="100%"
        p={2}
      >
        <GradientHeading size="md">Histórico de consultas</GradientHeading>
        <Flex flexDir="column" w="100%" mt={2}>
          <Flex justify="space-between">
            <Text textAlign="left">Data da consulta</Text>
            <Text textAlign="right">Colaborador</Text>
          </Flex>
          <Accordion mt={2} allowMultiple allowToggle defaultIndex={[0]}>
            <Stack>
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
          </Accordion>
        </Flex>
        <Stack isInline align="center" justify="center">
          {consultas.edges.length >= 4 && (
            <IconButton
              aria-label="ver menos"
              onClick={() => setConsultaDisplayQtd(consultaDisplayQtd - 2)}
              bgColor="transparent"
              _active={{ color: 'brand.800' }}
              _hover={{ bgColor: 'transparent', color: 'brand.500' }}
              _focus={{}}
              color="brand.700"
              icon={<Icon as={AiOutlineMinus} w={4} h={4} />}
            />
          )}
          {consultas.pageInfo.hasNextPage && (
            <IconButton
              aria-label="ver mais"
              onClick={() => setConsultaDisplayQtd(consultaDisplayQtd + 2)}
              bgColor="transparent"
              _active={{ color: 'brand.800' }}
              _hover={{ bgColor: 'transparent', color: 'brand.500' }}
              _focus={{}}
              color="brand.700"
              icon={<Icon as={AiOutlinePlus} w={4} h={4} />}
            />
          )}
        </Stack>
      </WrapItem>
    </Wrap>
  )
}
