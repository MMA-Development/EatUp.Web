import { eatupApi } from '@lib/api-slice.ts'
import { meals } from '@features/meals/api/get-meals.ts'
import { toaster } from '@components/ui/toaster.tsx'

export const deleteMeals = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteMeal: builder.mutation<string, string>({
      query: (mealId) => ({
        url: `/meals/${mealId}`,
        method: 'DELETE'
      }),
      async onQueryStarted(mealId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          meals.util.updateQueryData('getMeals', undefined, (draft) => {
            if (draft.items) {
              draft.items = draft.items.filter((meal) => meal.id !== mealId)
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
          toaster.create({
            title: 'Could not delete meal',
            type: 'error'
          })
        }
      }
    })
  })
})

export const { useDeleteMealMutation } = deleteMeals
