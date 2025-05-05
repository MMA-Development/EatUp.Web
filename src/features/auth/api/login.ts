import { eatupApi } from '@lib/api-slice.ts'
import { LoginPayload, LoginResponse, LoginResponseSchema } from '../types'
import { setToken, setUser } from '../store'
import { decodeJwtPayload } from '@utils/jwt.ts'
import { vendor } from '@features/auth/api/get-vendor.ts'

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
      },
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          const vendorId = decodeJwtPayload(data.accessToken).nameid
          dispatch(vendor.endpoints.getVendor.initiate(vendorId))

          dispatch(setUser(credentials.username))
          dispatch(setToken(data))
        } catch {
          dispatch(setUser(null))
          dispatch(setToken(null))
        }
      }
    })
  })
})

export const { useAuthenticateMutation } = authenticate
