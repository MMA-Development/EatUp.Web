import { CategoriesSchema, Category } from '@features/meals/types'
import { eatupApi } from '@lib/api-slice.ts'
import { PaginatedResponse } from '@app-types/api-types.ts'

export const categories = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<PaginatedResponse<Category>, void>({
      query: () => `/meals/categories`,
      extraOptions: {
        dataSchema: CategoriesSchema
      },
      keepUnusedDataFor: 300
    })
  })
})

export const { useGetCategoriesQuery } = categories
