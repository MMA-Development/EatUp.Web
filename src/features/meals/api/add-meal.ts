import { MealPayload } from '@features/meals/types'
import { eatupApi } from '@lib/api-slice.ts'

export const meals = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    addMeal: builder.mutation<string, MealPayload>({
      query: (body) => ({
        url: '/meals',
        method: 'POST',
        body
      }),
      invalidatesTags: (result) => [
        { type: 'Meals', id: 'LIST' },
        { type: 'Meals', id: result }
      ]
    })
  }),
  overrideExisting: true
})

export const { useAddMealMutation } = meals
