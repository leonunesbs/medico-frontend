import { CustomButton, GradientHeading } from '@/components'
import { IPrescricaoTab } from '@/interfaces'
import { Text, Flex, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useEffect } from 'react'

export function PrescricaoTab({ paciente, ...rest }: IPrescricaoTab.IProps) {
  // const handleStart = () => {
  //   window.MdHub.command
  //     .send('plataforma.prescricao', 'setPaciente', {
  //       // Pode ser um documento criptografado do paciente, por exemplo
  //       // Usamos essa propriedade para destinguir nomes iguais
  //       // (obrigatório)
  //       idExterno: paciente.id,

  //       // Nome do paciente (obrigatório)
  //       nome: paciente.nome,

  //       // Endereço do paciente (opcional)
  //       endereco: 'Rua da Saúde, 123',

  //       // Cidade do paciente (opcional)
  //       cidade: 'São Paulo',

  //       // Telefone celular (obrigatório, DDD + digitos, somente números. NÃO ENVIAR PREFIXO "+55")
  //       telefone: '11999999999',

  //       // Usado no receituário de alto custo (Opcional)
  //       peso: 75,

  //       // Usado no receituário de alto custo (Opcional)
  //       altura: 1.8,

  //       // Usado no receituário de alto custo (Opcional)
  //       nome_mae: 'Nome da mãe',

  //       // Usado no receituário de alto custo (Opcional)
  //       dificuldade_locomocao: false
  //     })
  //     .then(() => {
  //       window.MdHub.module.show('plataforma.prescricao')
  //     })
  // }

  // const review = () => {
  //   window.MdHub.command.send('plataforma.prescricao', 'viewPrescription', 9140)
  // }

  // useEffect(() => {
  //   window.MdSinapsePrescricao.event.add(
  //     'core:moduleInit',
  //     function (moduleData) {
  //       if (moduleData.name === 'plataforma.prescricao') {
  //         // O módulo da prescrição foi iniciado.
  //         MdHub.event.add('prescricaoImpressa', function (prescriptionData) {
  //           console.log(prescriptionData)
  //         })
  //       }
  //     }
  //   )
  // }, [])

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
        <Flex flexDirection="column" p={6} w="100%">
          <CustomButton
            // onClick={handleStart}
            w="full"
          >
            Nova prescrição
          </CustomButton>
          <CustomButton
            // onClick={review}
            w="full"
          >
            Visualizar
          </CustomButton>
        </Flex>
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
          Histórico de prescrições
        </GradientHeading>
        <Flex flexDir="column" w="100%" mt={2}>
          <Flex justify="space-between">
            <Text textAlign="left">Data da prescrição</Text>
            <Text textAlign="right">Colaborador</Text>
          </Flex>
          {/* <Accordion mt={2} allowMultiple allowToggle defaultIndex={[0]}>
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
          </Accordion> */}
        </Flex>
        {/* <Stack isInline align="center" justify="center">
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
        </Stack> */}
      </WrapItem>
      <script
        type="text/javascript"
        src="https://sandbox.memed.com.br/modulos/plataforma.sinapse-prescricao/build/sinapse-prescricao.min.js"
        data-token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.WzMyNTUwLCJkNzNlMGI3MDc5MGQ5YTlmNzBlNWIyYzliMjMxZWI0ZiIsIjIwMjEtMDYtMjAiLCJzaW5hcHNlLnByZXNjcmljYW8iLCJwYXJ0bmVyLjMuMjc5NTIiXQ.B1r61skJI6oArSrNQY7jRgBauZHnZFyd6wF8m5gtqtk"
        data-color="#D63A56"
      ></script>
    </Wrap>
  )
}
