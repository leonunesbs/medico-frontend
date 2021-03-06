import React, { useCallback, useEffect, useRef, useState } from 'react'

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
  useDisclosure,
  Select,
  AlertDialogBody
} from '@chakra-ui/react'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import { useMutation } from 'react-query'
import { gql } from 'graphql-request'
import { useForm } from 'react-hook-form'

import MDEditor from '@uiw/react-md-editor'

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import { client, queryClient } from '@/services/api'

import { GradientHeading, CustomButton, ConsultaCard } from '@/components'
import { IConsultaTab } from '@/interfaces'
import { parseCookies } from 'nookies'
import { NovaConsultaTimer } from '@/components/atoms'

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

  const { register, handleSubmit, reset } = useForm()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<any>()

  const [consultaStarted, setConsultaStarted] = useState(false)

  const [consulta, setConsulta] = useState('')

  const { 'medico:token': token } = parseCookies()
  const novaConsulta = useMutation(
    (formData: any) => {
      return client.request(
        gql`
          mutation novaConsulta($pacienteId: ID!, $consulta: String) {
            novaConsulta(pacienteId: $pacienteId, consulta: $consulta) {
              consulta {
                id
                dataConsulta
                duracaoConsulta
                colaborador {
                  nome
                }
                consulta
              }
            }
          }
        `,
        formData,
        {
          authorization: `JWT ${token}`
        }
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

  const handleNovaConsulta: SubmitHandler = useCallback(() => {
    novaConsulta.mutate({
      pacienteId: paciente.id,
      consulta: consulta
    })
  }, [])

  const startConsulta = () => {
    onOpen()
  }

  const handleModelSelect = ({ modelo }: { modelo: string }) => {
    const modelos: any = {
      dermatologia: '## Anamnese\n## Exame f??sico dermatol??gico\n...',
      ginecologia: '## Anamnese\n...## Exame f??sico ginecol??gico\n...',
      cardiologia: '## Anamnese\n...## Exame f??sico cardiol??gico\n...'
    }
    if (!modelo || !modelos[modelo]) {
      setConsulta(`
      ## Anamnese 
      ...
      ## Exame f??sico
      ...
        `)
    } else {
      setConsulta(modelos[modelo])
    }
    setConsultaStarted(true)
    reset()
    onClose()
  }

  return (
    <Wrap spacing={4}>
      <WrapItem
        flexDir="column"
        boxShadow="base"
        borderRadius="md"
        flexGrow={1}
        p={2}
        h="100%"
      >
        {consultaStarted ? (
          <Flex flexDir="column" w="100%">
            <NovaConsultaTimer
              handle={{
                consultaStarted
              }}
            />
            <GradientHeading as="h2" size="sm" textAlign="left">
              Nova consulta
            </GradientHeading>

            <Flex flexDir="column" w="100%" mt={2}>
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
                    w="100%"
                  >
                    <CustomButton
                      type="submit"
                      width="full"
                      isLoading={novaConsulta.isLoading}
                    >
                      Salvar consulta
                    </CustomButton>
                    <Button
                      bgColor="transparent"
                      color="brand.700"
                      _active={{ color: 'brand.500' }}
                      _hover={{ bgColor: 'transparent', color: 'brand.800' }}
                      _focus={{}}
                      size="sm"
                      width="full"
                      onClick={() => setConsultaStarted(false)}
                    >
                      Cancelar
                    </Button>
                  </Stack>
                </Flex>
              </Form>
            </Flex>
          </Flex>
        ) : (
          <Flex flexDirection="column" p={6} w="100%">
            <CustomButton onClick={startConsulta} w="full">
              Nova consulta
            </CustomButton>
            <AlertDialog
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />

              <AlertDialogContent
                as="form"
                onSubmit={handleSubmit(handleModelSelect)}
              >
                <AlertDialogHeader>Iniciar uma nova consulta</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  <Select
                    {...register('modelo')}
                    focusBorderColor="brand.500"
                    my={2}
                    borderRadius="full"
                    boxShadow="base"
                    size="md"
                    placeholder="Selecione um modelo"
                  >
                    <option value="cardiologia">Cardiologia</option>
                    <option value="clinica geral">Cl??nica Geral</option>
                    <option value="dermatologia">Dermatologia</option>
                    <option value="ginecologia">Ginecologia</option>
                    <option value="psiquiatria">Psiquiatria</option>
                  </Select>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Stack isInline justify="flex-end">
                    <Button
                      ref={cancelRef}
                      onClick={onClose}
                      bgColor="brand.700"
                      color="brand.100"
                      borderRadius="full"
                      _active={{ bgColor: 'brand.800', color: 'brand.500' }}
                      _hover={{ bgColor: 'brand.800' }}
                    >
                      Cancelar
                    </Button>
                    <CustomButton type="submit">Iniciar</CustomButton>
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
        h="100%"
        p={2}
      >
        <GradientHeading as="h2" size="sm">
          Hist??rico de consultas
        </GradientHeading>
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
                  N??o h?? consultas anteriores.
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
