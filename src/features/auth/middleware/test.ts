import { meals } from '@features/meals/api/get-meals.ts'
import { startAppListening } from '@store/listenerMiddleware.ts'

export function setupMealsListeners() {
  startAppListening({
    matcher: meals.endpoints.getMeals.matchFulfilled,
    effect: async (action, listenerApi) => {
      listenerApi.cancelActiveListeners()

      console.log(action)
    }
  })
}
