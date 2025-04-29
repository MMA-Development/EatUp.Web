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

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-EatUp-Adm-Env': isProduction() ? 'Production' : 'Development'
  }
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

  const result = await baseQuery(args, api, extraOptions)

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
