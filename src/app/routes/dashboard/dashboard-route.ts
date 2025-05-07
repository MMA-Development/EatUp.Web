import { rootRoute } from '@app/router.ts'
import { DashboardLayout } from '@components/layout/dashboard-layout.tsx'
import { createRoute, redirect } from '@tanstack/react-router'

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardLayout,
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: location.href
        }
      })
    }
  },
  // Used to provide breadcrumb navigation data
  loader: () => {
    return {
      crumb: 'Dashboard'
    }
  }
})
