import { eatupApi } from '@lib/api-slice.ts'
import { LoginPayload, LoginResponse, LoginResponseSchema } from '../types'
import { setToken, setUser } from '../store'

export const authenticate = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    authenticate: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({
        url: '/token',
        method: 'POST',
        body
      }),
      extraOptions: {
        dataSchema: LoginResponseSchema
      },
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(credentials.username))
          dispatch(setToken(data.token))
        } catch {
          dispatch(setUser(null))
          dispatch(setToken(null))
        }
      }
    })
  })
})

export const { useAuthenticateMutation } = authenticate
