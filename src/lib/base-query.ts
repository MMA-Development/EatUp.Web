import { toaster } from '@components/ui/toaster.tsx'
import { logout, setToken } from '@features/auth/store'
import { LoginResponse } from '@features/auth/types'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { RootState } from '@store/types'
import { isProduction } from '@utils/env.ts'
import { ZodError, ZodSchema } from 'zod'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-EatUp-Adm-Env': isProduction() ? 'Production' : 'Development'
  },
  mode: 'cors',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token?.accessToken
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

/**
 * A custom base query wrapper for RTK Query that adds:
 *  - Zod argument validation (input schema)
 *  - Zod data validation (response schema)
 *  - Automatic token refresh handling with a mutex lock to prevent race conditions
 */
export const baseQueryWithValidation: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { argumentSchema?: ZodSchema; dataSchema?: ZodSchema },
  FetchBaseQueryMeta
> = async (args, api, extraOptions = {}) => {
  await mutex.waitForUnlock()
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
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      const refreshToken = (api.getState() as RootState).auth.token?.refreshToken
      try {
        // try to get a new token
        const refreshResult = await baseQuery(
          {
            url: '/vendors/token',
            method: 'POST',
            body: `"${refreshToken}"`
          },
          api,
          extraOptions
        )
        if (refreshResult.data) {
          const token = refreshResult.data as LoginResponse
          // store the new tokens
          api.dispatch(setToken(token))
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
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
