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

export const SignupPayloadSchema = z.object({
  name: z.string().min(3),
  password: z.string().min(4),
  username: z.string().min(4),
  cvr: z.string(),
  logo: z.string().optional(),
  email: z.string().email(),
  longitude: z.number(),
  latitude: z.number()
})

export type SignupPayload = z.infer<typeof SignupPayloadSchema>

export const SignupResponseSchema = z.object({
  created: z.number(),
  expires_at: z.number(),
  object: z.string(),
  url: z.string().url()
})

export type SignupResponse = z.infer<typeof SignupResponseSchema>

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

export const ProfileSchema = VendorResponseSchema.omit({ cvr: true, username: true, logo: true })

export type Profile = z.infer<typeof ProfileSchema>
