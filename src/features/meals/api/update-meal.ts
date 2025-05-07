import { MealPayload } from '@features/meals/types'

import { eatupApi } from '@lib/api-slice.ts'

export const meal = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    updateMeal: builder.mutation<void, { id: string; meal: MealPayload }>({
      query: (body) => ({
        url: `/meals/${body.id}`,
        method: 'PUT',
        body: body.meal
      })
    })
  })
})

export const { useUpdateMealMutation } = meal
