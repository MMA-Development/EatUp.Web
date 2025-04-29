import { Text } from '@chakra-ui/react'

export function Brand() {
  return (
    <Text
      overflow="hidden"
      as="h1"
      bgGradient="to-r"
      gradientFrom="green.400"
      gradientTo="green.500"
      bgClip="text"
      fontSize={'2.2rem'}
      fontWeight={700}
      userSelect="none"
      textAlign="center"
    >
      EatUp
    </Text>
  )
}
