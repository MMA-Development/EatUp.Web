import { createRoute } from '@tanstack/react-router'
import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.tsx'

export const mealsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/meals',
  component: function Peter() {
    return <h1>MEALS</h1>
  },
  loader: () => {
    return {
      crumb: 'Meals'
    }
  }
})
