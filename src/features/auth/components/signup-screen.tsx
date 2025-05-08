import { AbsoluteCenter, Flex, Stack } from '@chakra-ui/react'
import { ColorModeButton } from '@components/ui/color-mode.tsx'
import { LanguageSelector } from '@components/ui/language-selector.tsx'
import { SignupForm } from '@features/auth/components/signup-form.tsx'

export function SignupScreen() {
  return (
    <Flex h="100vh" w="100vw">
      <Stack direction={'row'} p={5}>
        <LanguageSelector w={'200px'} />
        <ColorModeButton />
      </Stack>
      <AbsoluteCenter w={'90%'}>
        <SignupForm />
      </AbsoluteCenter>
    </Flex>
  )
}
