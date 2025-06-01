import { CategoriesSchema, Category } from '@features/meals/types'
import { eatupApi } from '@lib/api-slice.ts'
import { PaginatedResponse } from '../../../types/api-types.ts'

export const categories = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<PaginatedResponse<Category>, void>({
      query: () => `/meals/categories`,
      extraOptions: {
        dataSchema: CategoriesSchema
      }
    })
  })
})

export const { useGetCategoriesQuery } = categories
