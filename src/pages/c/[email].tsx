import React from 'react'
import { Avatar, Circle, Flex, Text } from '@chakra-ui/react'

import { IColaboradorPage } from '@/interfaces'
import { GradientHeading, Layout } from '@/components'

const Colaborador: React.FC<IColaboradorPage.IProps> = () => {
  return (
    <Layout height="720px">
      <Flex
        flexWrap="wrap"
        p={2}
        justify={['center', 'center', 'center', 'space-between']}
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
          p={2}
          boxShadow="base"
          borderRadius="md"
          alignSelf="flex-start"
          maxW={['100%', '100%', '100%', '60%']}
        >
          <GradientHeading as="h1" textAlign="left">
            Leonardo Nunes
          </GradientHeading>
          <Text as="h2" fontWeight="semibold" lineHeight={0.8} mb={4}>
            Generalista
          </Text>
          <Text textAlign="justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default Colaborador
