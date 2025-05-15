import { eatupApi } from '@lib/api-slice.ts'
import { Profile } from '../types'
import { vendor } from '@features/auth/api/get-vendor.ts'

export const profile = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<void, Profile>({
      query: (body) => ({
        url: '/vendors/me',
        method: 'PUT',
        body
      }),
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          vendor.util.updateQueryData('getVendorMe', undefined, (draft) => {
            Object.assign(draft, user)
          })
        )

        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      }
    })
  })
})

export const { useUpdateProfileMutation } = profile
