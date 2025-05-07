import { createListenerMiddleware } from '@reduxjs/toolkit'
import { authenticate } from '@features/auth/api/login.ts'
import { router } from '@app/router.ts'
import { RootState } from '@store/types.ts'
import { selectVendor } from '@features/auth/store'

// Create the middleware instance and methods
export const authRoutingMiddleware = createListenerMiddleware()

authRoutingMiddleware.startListening({
  matcher: authenticate.endpoints.authenticate.matchFulfilled,
  effect: async (_action, listenerApi) => {
    listenerApi.cancelActiveListeners()

    const { redirect } = router.state.location.search

    const conditionMet = await listenerApi.condition(
      (_, currentState) => selectVendor(currentState as RootState) !== null,
      1000
    )

    if (conditionMet) {
      router.navigate({ to: redirect ? redirect : '/dashboard' })
    }
  }
})
