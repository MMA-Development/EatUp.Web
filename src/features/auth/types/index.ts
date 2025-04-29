import { z } from 'zod'
import i18n from '@lib/i18n.ts'

export const LoginPayloadSchema = z.object({
  username: z.string().min(
    3,
    i18n.t('validation.rules.atLeastChars', {
      attribute: i18n.t('username', { ns: 'auth' }),
      min: 2
    })
  ),
  password: z.string().min(
    7,
    i18n.t('validation.rules.atMostChars', {
      attribute: i18n.t('password', { ns: 'auth' }),
      max: 7
    })
  )
})

export type LoginPayload = z.infer<typeof LoginPayloadSchema>

export const LoginResponseSchema = z.object({
  token: z.string()
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>
