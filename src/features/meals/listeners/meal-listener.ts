import { startAppListening } from '@store/listenerMiddleware.ts'
import { meals } from '@features/meals/api/add-meal.ts'
import { toaster } from '@components/ui/toaster.tsx'

export function setupMealsListener(): void {
  startAppListening({
    matcher: meals.endpoints.addMeal.matchFulfilled,
    effect: async (_action, listenerApi) => {
      listenerApi.cancelActiveListeners()

      toaster.create({
        title: 'Måltid oprettet',
        type: 'success'
      })
    }
  })
}
