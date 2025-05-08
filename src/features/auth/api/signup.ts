import { eatupApi } from '@lib/api-slice.ts'
import { SignupPayload, SignupResponse } from '../types'
import { authenticate } from '@features/auth/api/login.ts'

export const signup = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupPayload>({
      query: (body) => ({
        url: '/vendors/signup',
        method: 'POST',
        body
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled

          dispatch(
            authenticate.endpoints.authenticate.initiate({
              username: credentials.username,
              password: credentials.password
            })
          )
        } catch {
          // no-op
        }
      }
    })
  })
})

export const { useSignupMutation } = signup
