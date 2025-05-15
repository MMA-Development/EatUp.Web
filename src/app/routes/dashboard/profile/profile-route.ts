import { createRoute } from '@tanstack/react-router'
import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.ts'
import { Pending } from '@app/pending.tsx'
import { store } from '@store/index.ts'
import { vendor } from '@features/auth/api/get-vendor.ts'
import { ProfileScreen } from '@features/auth/components/profile-screen'

export const profileRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/profile',
  component: ProfileScreen,
  staticData: {
    displayOnNav: true,
    name: 'profile'
  },
  pendingMinMs: 500,
  pendingComponent: () => Pending({ message: 'profile' }),
  loader: async () => {
    const res = await store.dispatch(vendor.endpoints.getVendorMe.initiate()).unwrap()
    return {
      data: res,
      crumb: 'profile'
    }
  }
})
