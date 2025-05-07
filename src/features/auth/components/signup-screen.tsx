import { AbsoluteCenter, Flex } from '@chakra-ui/react'
import { SignupForm } from '@features/auth/components/signup-form.tsx'
import { LanguageSelector } from '@components/ui/language-selector.tsx'

export function SignupScreen() {
  return (
    <Flex h="100vh" w="100vw">
      <LanguageSelector w={'200px'} p={5} />
      <AbsoluteCenter>
        <SignupForm />
      </AbsoluteCenter>
    </Flex>
  )
}
