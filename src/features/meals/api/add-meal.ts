import { MealPayload } from '@features/meals/types'

import { eatupApi } from '@lib/api-slice.ts'

export const meals = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    addMeal: builder.mutation<string, MealPayload>({
      query: (body) => ({
        url: '/meals/b88ab0f9-4e15-4c21-37e2-08dd880e403c',
        method: 'POST',
        body
      })
      // extraOptions: {
      //   dataSchema: PaginatedResponseSchema(MealSchema)
      // }
    })
  })
})

export const { useAddMealMutation } = meals
