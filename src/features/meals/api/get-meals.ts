import { eatupApi } from '@lib/api-slice.ts'
import { Meal, MealSchema } from '@features/meals/types'
import {
  ApiPaginationWithSearch,
  PaginatedResponse,
  PaginatedResponseSchema
} from '@app-types/api-types.ts'

export const meals = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeals: builder.query<PaginatedResponse<Meal>, ApiPaginationWithSearch | void>({
      query: (pagination) => {
        const { skip, take, query, categories } = pagination || {}

        const categoryParams =
          categories?.map((cat) => `categories=${encodeURIComponent(cat)}`).join('&') || ''

        const searchParam = query ? `&search=${encodeURIComponent(query)}` : ''
        const categoryQuery = categoryParams ? `&${categoryParams}` : ''

        return {
          url: `/meals/vendor?skip=${skip}&take=${take}${searchParam}${categoryQuery}`
        }
      },
      extraOptions: {
        dataSchema: PaginatedResponseSchema(MealSchema)
      }
    })
  })
})

export const { useGetMealsQuery, useLazyGetMealsQuery } = meals
export const {
  useQueryState: useGetMealQueryState,
  useQuerySubscription: useGetMealQuerySubscription
} = meals.endpoints.getMeals
