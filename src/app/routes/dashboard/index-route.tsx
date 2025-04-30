import { createRoute } from '@tanstack/react-router'
import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.ts'

export const indexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: function Peter() {
    return <h1>TESTUS</h1>
  }
})
