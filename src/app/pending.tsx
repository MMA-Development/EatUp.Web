import { Center, Spinner, Text, VStack } from '@chakra-ui/react'

interface PendingProps {
  message?: string
}

export function Pending({ message }: PendingProps) {
  return (
    <Center h={'100%'}>
      <VStack>
        <Spinner size={'lg'} />
        <Text>Loading... {message ?? ''}</Text>
      </VStack>
    </Center>
  )
}
