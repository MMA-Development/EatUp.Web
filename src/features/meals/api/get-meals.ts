import {
  ApiPaginationWithSearch,
  PaginatedResponse,
  PaginatedResponseSchema
} from '../../../types/api-types.ts'

import { eatupApi } from '@lib/api-slice.ts'
import { Meal, MealSchema } from '@features/meals/types'

export const meals = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeals: builder.query<PaginatedResponse<Meal>, ApiPaginationWithSearch | void>({
      query: (pagination) => ({
        url: `/meals?skip=${pagination?.skip}&take=${pagination?.limit}${pagination && pagination.query ? `&search=${pagination.query}` : ''}`
      }),
      extraOptions: {
        dataSchema: PaginatedResponseSchema(MealSchema)
      }
    })
  })
})

export const { useGetMealsQuery } = meals
export const {
  useQueryState: useGetMealQueryState,
  useQuerySubscription: useGetMealQuerySubscription
} = meals.endpoints.getMeals
