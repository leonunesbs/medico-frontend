import { ConsultaTab } from '@/components'
import { IPacientePageTabs } from '@/interfaces'
import { getConsultas, getPaciente } from '@/queries'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const PacientePageTabs: React.FC<IPacientePageTabs.IProps> = ({
  consultas: initialConsultas,
  paciente: initialPaciente
}) => {
  const router = useRouter()
  const { email } = router.query
  const { data: paciente } = getPaciente(email?.toString(), initialPaciente)

  const [consultaDisplayQtd, setConsultaDisplayQtd] = useState(2)

  const { data: consultas, refetch: consultasRefetch } = getConsultas(
    email?.toString(),
    consultaDisplayQtd,
    initialConsultas
  )

  useEffect(() => {
    consultasRefetch()
    if (consultaDisplayQtd < 2) {
      setConsultaDisplayQtd(2)
    }
  }, [consultaDisplayQtd])
  return (
    <Tabs
      isLazy
      isFitted
      colorScheme="brand"
      boxShadow="base"
      borderRadius="md"
    >
      <TabList flexWrap="wrap">
        <Tab _focus={{}} _active={{}}>
          Consultas
        </Tab>
        <Tab _focus={{}} _active={{}}>
          Procedimentos
        </Tab>
        <Tab _focus={{}} _active={{}}>
          Prescrições
        </Tab>
        <Tab _focus={{}} _active={{}}>
          Agenda
        </Tab>
        <Tab _focus={{}} _active={{}}>
          Financeiro
        </Tab>
      </TabList>
      <TabPanels pt={4}>
        <TabPanel>
          <ConsultaTab
            consultas={consultas}
            paciente={paciente}
            setConsultaDisplayQtd={setConsultaDisplayQtd}
            consultaDisplayQtd={consultaDisplayQtd}
          />
        </TabPanel>
        <TabPanel>Procedimentos</TabPanel>
        <TabPanel>Prescrições</TabPanel>
        <TabPanel>Agenda</TabPanel>
        <TabPanel>Financeiro</TabPanel>
      </TabPanels>
    </Tabs>
  )
}
