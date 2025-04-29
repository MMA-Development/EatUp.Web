import { createRoute, redirect } from '@tanstack/react-router'
import { rootRoute } from '@app/router.ts'
import { DashboardLayout } from '@components/layout/dashboard-layout.tsx'

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardLayout,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/auth/login' })
    }
  }
})
