import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { ZodError, ZodSchema } from 'zod'
import { isProduction } from '@utils/env.ts'
import { toaster } from '@components/ui/toaster.tsx'
import { logout, setAccessToken } from '@features/auth/store'

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-EatUp-Adm-Env': isProduction() ? 'Production' : 'Development'
  },
  mode: 'cors'
})

export const baseQueryWithValidation: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { argumentSchema?: ZodSchema; dataSchema?: ZodSchema },
  FetchBaseQueryMeta
> = async (args, api, extraOptions = {}) => {
  if (extraOptions.argumentSchema) {
    try {
      extraOptions.argumentSchema.parse(args)
    } catch {
      toaster.create({
        title: 'API ERROR',
        description: 'The provided arguments does not match the expected arguments',
        type: 'error'
      })
      return { error: { status: 400, data: 'Invalid arguments' } }
    }
  }

  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery('/vendors/refresh', api, extraOptions)
    if (refreshResult.data) {
      const token = (refreshResult.data as { token: string }).token
      // store the new token
      api.dispatch(setAccessToken(token))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  if ('data' in result && extraOptions.dataSchema) {
    try {
      extraOptions.dataSchema.parse(result.data)
    } catch (e) {
      if (e instanceof ZodError) {
        console.error(`[base-query]: ${import.meta.env.VITE_API_BASE_URL + args} threw \n${e}`)
      }
      toaster.create({
        title: 'API ERROR',
        description: 'Returned data does not match the expected data',
        type: 'error'
      })
      return { error: { status: 400, data: 'Invalid data' } }
    }
  }

  return result
}
