import { Center, Spinner, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface PendingProps {
  message?: string
}

export function Pending({ message }: PendingProps) {
  const { t } = useTranslation('common')

  return (
    <Center h={'100%'}>
      <VStack>
        <Spinner size={'lg'} />
        <Text>Loading... {message ? t(message) : ''}</Text>
      </VStack>
    </Center>
  )
}
