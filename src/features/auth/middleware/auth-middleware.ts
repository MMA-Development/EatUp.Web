import { router } from '@app/router.ts'
import { vendor } from '@features/auth/api/get-vendor.ts'
import { authenticate } from '@features/auth/api/login.ts'
import { logout, selectVendor, setToken, setUser } from '@features/auth/store'
import { startAppListening } from '@store/listenerMiddleware.ts'
import { RootState } from '@store/types.ts'

/**
 * Sets up authentication listeners for the application.
 *
 * This method configures listeners to handle successful authentication, manage user session information
 * (such as token and username), fetch vendor data, and redirect to the appropriate destination upon successful login.
 * It ensures that only one listener is active at a time by canceling any previously active listeners.
 *
 * Listeners handle the following:
 * - Save the authentication token and username.
 * - Fetch the currently authenticated user's vendor information.
 * - Handle errors during the vendor fetch process by logging out the user.
 * - Redirect the user to the specified location (default is the dashboard) upon successful authentication.
 *
 * @return {void} This function does not return any value.
 */
export function setupAuthListeners(): void {
  startAppListening({
    matcher: authenticate.endpoints.authenticate.matchFulfilled,
    effect: async (action, listenerApi) => {
      listenerApi.cancelActiveListeners()

      // Get token and username from action
      const token = action.payload
      const { username } = action.meta.arg.originalArgs

      // Set user and token
      listenerApi.dispatch(setUser(username))
      listenerApi.dispatch(setToken(token))

      // Fetch the vendor
      const result = await listenerApi.dispatch(
        vendor.endpoints.getVendorMe.initiate(undefined, {
          forceRefetch: true
        })
      )

      if ('error' in result) {
        console.error('Failed to fetch vendor:', result.error)
        listenerApi.dispatch(logout())
        return
      }

      // wait for the vendor to be set
      await listenerApi.condition((_, state) => selectVendor(state as RootState) !== null)

      // now vendor is guaranteed set - redirect to dashboard or redirect search param
      const { redirect = '/dashboard' } = router.state.location.search
      router.navigate({ to: redirect })
    }
  })
}
