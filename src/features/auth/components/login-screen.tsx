import { AbsoluteCenter, Flex } from '@chakra-ui/react'
import { LoginForm } from './login-form'
import { LanguageSelector } from '@components/ui/language-selector.tsx'

export function LoginScreen() {
  return (
    <Flex h="100vh" w="100vw">
      <LanguageSelector w={'200px'} p={5} />
      <AbsoluteCenter>
        <LoginForm />
      </AbsoluteCenter>
    </Flex>
  )
}
