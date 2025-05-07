import { Button, Field, Fieldset, HStack, Input, Separator, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginPayload, LoginPayloadSchema } from '../types'
import { PasswordInput } from '@components/ui/password-input.tsx'
import { useAuthenticateMutation } from '../api/login.ts'
import { CustomLink } from '@components/ui/custom-link.tsx'

export function LoginForm() {
  const { t } = useTranslation('auth')

  const [login, { isLoading, isError }] = useAuthenticateMutation()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<LoginPayload>({
    resolver: zodResolver(LoginPayloadSchema)
  })

  async function onSubmit(data: LoginPayload) {
    try {
      await login(data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>Login</Fieldset.Legend>
          <Fieldset.HelperText>{t('login.details.description')}</Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root required invalid={Boolean(errors.username)}>
            <Field.Label>{t('username')}</Field.Label>
            <Input {...register('username')} />
            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={Boolean(errors.password)}>
            <Field.Label>{t('password')}</Field.Label>
            <PasswordInput {...register('password')} />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        {isError && (
          <Text mt={1} color={'fg.error'}>
            Der skete en fejl
          </Text>
        )}

        <HStack>
          <Button loading={isLoading} type="submit" alignSelf="flex-start">
            {t('login')}
          </Button>
          <Separator orientation="vertical" h={8} />
          <Text>
            Ikke oprettet endnu? Opret dig{' '}
            <CustomLink colorPalette={'blue'} to={'/auth/signup'}>
              her.
            </CustomLink>
          </Text>
        </HStack>
      </Fieldset.Root>
    </form>
  )
}
