import { z } from 'zod'

export const LoginPayloadSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(7)
})

export type LoginPayload = z.infer<typeof LoginPayloadSchema>

export const LoginResponseSchema = z.object({
  token: z.string()
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>
