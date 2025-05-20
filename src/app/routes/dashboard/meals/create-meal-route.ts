import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.ts'
import { CreateMealScreen } from '@features/meals/components/create-meal-screen.tsx'
import { createRoute } from '@tanstack/react-router'

export const createMealRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/meals/create',
  component: CreateMealScreen,
  staticData: {
    name: 'create.meal',
    displayOnNav: true
  },
  loader: () => {
    return {
      crumb: 'create'
    }
  }
})
