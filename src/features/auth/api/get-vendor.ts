import { eatupApi } from '@lib/api-slice.ts'
import { VendorResponse } from '@features/auth/types'
import { logout, setVendor } from '@features/auth/store'

export const vendor = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendor: builder.query<VendorResponse, string>({
      query: (vendorId) => `/vendors/${vendorId}`,
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
