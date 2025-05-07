import { createListenerMiddleware } from '@reduxjs/toolkit'
import { authenticate } from '@features/auth/api/login.ts'
import { router } from '@app/router.ts'
import { RootState } from '@store/types.ts'
import { selectVendor } from '@features/auth/store'

export const authRoutingMiddleware = createListenerMiddleware()

authRoutingMiddleware.startListening({
  matcher: authenticate.endpoints.authenticate.matchFulfilled,
  effect: async (_action, listenerApi) => {
    listenerApi.cancelActiveListeners()

    await listenerApi.condition((_, state) => selectVendor(state as RootState) !== null)

    // now vendor is guaranteed set
    const { redirect = '/dashboard' } = router.state.location.search
    router.navigate({ to: redirect })
  }
})
