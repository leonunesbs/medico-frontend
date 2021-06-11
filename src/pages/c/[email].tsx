import { IColaboradorPage } from '@/interfaces'
import { Flex } from '@chakra-ui/layout'

function Colaborador({ ...rest }: IColaboradorPage.IProps) {
  return <Flex {...rest}>Colaborador</Flex>
}

export default Colaborador
