import { z } from 'zod'

export const LoginPayloadSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(4)
})

export type LoginPayload = z.infer<typeof LoginPayloadSchema>

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string()
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>

export const VendorResponseSchema = z.object({
  name: z.string(),
  logo: z.string(),
  cvr: z.string(),
  username: z.string(),
  email: z.string().email(),
  longitude: z.number(),
  latitude: z.number()
})

export type VendorResponse = z.infer<typeof VendorResponseSchema>

export type Vendor = VendorResponse
