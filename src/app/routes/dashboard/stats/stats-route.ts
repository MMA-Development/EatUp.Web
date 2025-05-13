import { createRoute } from '@tanstack/react-router'
import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.ts'
import { Dashboard } from '@app/routes/dashboard/stats/dashboard.tsx'

export const statsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/stats',
  component: Dashboard,
  staticData: {
    displayOnNav: false
  },
  loader: async () => {
    return {
      crumb: 'statistics'
    }
  }
})
