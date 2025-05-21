import { startAppListening } from '@store/listenerMiddleware.ts'
import { profile } from '@features/auth/api/update-profile.ts'
import { toaster } from '@components/ui/toaster.tsx'

export function setupProfileUpdateListener(): void {
  startAppListening({
    matcher: profile.endpoints.updateProfile.matchFulfilled,
    effect: async (_action, listenerApi) => {
      listenerApi.cancelActiveListeners()

      toaster.create({
        title: 'Profil opdateret',
        type: 'success'
      })
    }
  })
}
