import { createRoute } from '@tanstack/react-router'
import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.tsx'

export const indexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: function Peter() {
    return <h1>TESTUS</h1>
  }
})
