import { Button, Field, Fieldset, HStack, Input, Separator, Stack, Text } from '@chakra-ui/react'
import { CustomLink } from '@components/ui/custom-link.tsx'
import { PasswordInput } from '@components/ui/password-input.tsx'
import { useGetVendorMeQueryState } from '@features/auth/api/get-vendor.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAuthenticateMutation } from '../api/login.ts'
import { LoginPayload, LoginPayloadSchema } from '../types'

export function LoginForm() {
  const { t } = useTranslation('auth')

  const [login, { isLoading: isLoadingLogin, isError }] = useAuthenticateMutation()
  const { isFetching: isLoadingVendor } = useGetVendorMeQueryState()

  const isLoading = isLoadingLogin || isLoadingVendor

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
            {t('not.a.member.description')}&nbsp;
            <CustomLink colorPalette={'blue'} to={'/auth/signup'}>
              her.
            </CustomLink>
          </Text>
        </HStack>
      </Fieldset.Root>
    </form>
  )
}
