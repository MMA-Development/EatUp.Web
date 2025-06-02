import { AbsoluteCenter, Flex, Stack } from '@chakra-ui/react'
import { LoginForm } from './login-form'
import { LanguageSelector } from '@components/ui/language-selector.tsx'
import { ColorModeButton } from '@components/ui/color-mode.tsx'

export function LoginScreen() {
  return (
    <Flex h="100vh" w="100vw">
      <Stack direction={'row'} p={5} pb={2}>
        <LanguageSelector w={'200px'} />
        <ColorModeButton />
      </Stack>
      <AbsoluteCenter w={'100%'}>
        <LoginForm />
      </AbsoluteCenter>
    </Flex>
  )
}
