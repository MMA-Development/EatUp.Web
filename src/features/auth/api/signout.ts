import { eatupApi } from '@lib/api-slice.ts'

export const signout = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    signout: builder.mutation<void, string>({
      query: (body) => ({
        url: '/vendors/signout',
        method: 'POST',
        body: `"${body}"`
      })
    })
  })
})

export const { useSignoutMutation } = signout
