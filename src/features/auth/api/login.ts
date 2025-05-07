import { eatupApi } from '@lib/api-slice.ts'
import { LoginPayload, LoginResponse, LoginResponseSchema } from '../types'

export const authenticate = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    authenticate: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({
        url: '/vendors/signin',
        method: 'POST',
        body
      }),
      extraOptions: {
        dataSchema: LoginResponseSchema
      }
    })
  })
})

export const { useAuthenticateMutation } = authenticate
