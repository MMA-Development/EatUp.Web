import { startAppListening } from '@store/listenerMiddleware.ts'
import { meals } from '@features/meals/api/get-meals.ts'
import { toaster } from '@components/ui/toaster.tsx'

export function setupMealsListener(): void {
  startAppListening({
    matcher: meals.endpoints.getMeals.matchRejected,
    effect: async (action, listenerApi) => {
      listenerApi.cancelActiveListeners()

      toaster.create({
        title: 'Could not fetch meals',
        description: action.error.message,
        type: 'error'
      })
    }
  })
}
