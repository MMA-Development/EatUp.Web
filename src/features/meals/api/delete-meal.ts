import { eatupApi } from '@lib/api-slice.ts'

export const deleteMeals = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteMeal: builder.mutation<void, string>({
      query: (mealId) => ({
        url: `/meals/${mealId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, mealId) => [
        { type: 'Meals', id: 'LIST' },
        { type: 'Meals', id: mealId }
      ]
    })
  }),
  overrideExisting: true
})

export const { useDeleteMealMutation } = deleteMeals
