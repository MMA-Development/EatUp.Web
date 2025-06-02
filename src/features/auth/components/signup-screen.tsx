import { Center, Flex, Stack } from '@chakra-ui/react'
import { ColorModeButton } from '@components/ui/color-mode.tsx'
import { LanguageSelector } from '@components/ui/language-selector.tsx'
import { SignupForm } from '@features/auth/components/signup-form.tsx'

export function SignupScreen() {
  return (
    <Flex h="100vh" w="100vw" flexDirection={'column'}>
      <Stack direction={'row'} p={5} pb={2}>
        <LanguageSelector w={'200px'} />
        <ColorModeButton />
      </Stack>
      <Center px={8}>
        <SignupForm />
      </Center>
    </Flex>
  )
}
