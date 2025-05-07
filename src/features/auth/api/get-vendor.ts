import { eatupApi } from '@lib/api-slice.ts'
import { VendorResponse } from '@features/auth/types'
import { logout, setVendor } from '@features/auth/store'

export const vendor = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendorMe: builder.query<VendorResponse, void>({
      query: () => `/vendors/me`,
      onQueryStarted: async (_credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(setVendor(data))
        } catch {
          dispatch(logout())
        }
      }
    })
  })
})

export const { useQueryState: useGetVendorMeQueryState } = vendor.endpoints.getVendorMe
