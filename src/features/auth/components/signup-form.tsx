import { Button, Field, Fieldset, HStack, Input, Separator, Stack, Text } from '@chakra-ui/react'
import { useSignupMutation } from '@features/auth/api/signup.ts'
import { useForm } from 'react-hook-form'
import { SignupPayload, SignupPayloadSchema } from '@features/auth/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomLink } from '@components/ui/custom-link.tsx'

export function SignupForm() {
  const [signup, { isLoading, isError }] = useSignupMutation()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SignupPayload>({
    resolver: zodResolver(SignupPayloadSchema)
  })

  async function onSubmit(data: SignupPayload) {
    try {
      await signup(data).unwrap()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>Signup</Fieldset.Legend>
          <Fieldset.HelperText>Please provide your contact details below.</Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Stack direction={'row'}>
            <Field.Root required invalid={Boolean(errors.name)}>
              <Field.Label>Name</Field.Label>
              <Input {...register('name')} />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={Boolean(errors.email)}>
              <Field.Label>Email address</Field.Label>
              <Input {...register('email')} />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>

          <Stack direction={'row'}>
            <Field.Root required invalid={Boolean(errors.username)}>
              <Field.Label>Username</Field.Label>
              <Input {...register('username')} />
              <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={Boolean(errors.password)}>
              <Field.Label>Password</Field.Label>
              <Input type="password" {...register('password')} />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>

          <Field.Root required invalid={Boolean(errors.cvr)}>
            <Field.Label>CVR</Field.Label>
            <Input {...register('cvr')} />
            <Field.ErrorText>{errors.cvr?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={Boolean(errors.longitude)}>
            <Field.Label>Longitude</Field.Label>
            <Input {...register('longitude', { valueAsNumber: true })} />
            <Field.ErrorText>{errors.longitude?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={Boolean(errors.latitude)}>
            <Field.Label>Latitude</Field.Label>
            <Input {...register('latitude', { valueAsNumber: true })} />
            <Field.ErrorText>{errors.latitude?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        {isError && (
          <Text mt={1} color={'fg.error'}>
            An error occurred during signup
          </Text>
        )}

        <HStack>
          <Button loading={isLoading} type="submit" alignSelf="flex-start">
            Submit
          </Button>
          <Separator orientation="vertical" h={8} />
          <Text>
            Allerede oprettet? Log ind{' '}
            <CustomLink colorPalette={'blue'} to={'/auth/login'}>
              her.
            </CustomLink>
          </Text>
        </HStack>
      </Fieldset.Root>
    </form>
  )
}
