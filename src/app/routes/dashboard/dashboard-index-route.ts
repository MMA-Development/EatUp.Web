import { createRoute, redirect } from '@tanstack/react-router'
import { dashboardRoute } from './dashboard-route'

export const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/dashboard/stats' })
  }
})
