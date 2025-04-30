import { createRoute } from '@tanstack/react-router'
import { mealsRoute } from '@app/routes/dashboard/meals/meals-route.ts'

export const createMealRoute = createRoute({
  getParentRoute: () => mealsRoute,
  path: '/create',
  component: function Peter() {
    return <h1>Create meal</h1>
  },
  loader: () => {
    return {
      crumb: 'Opret'
    }
  }
})
