import { createRoute, retainSearchParams } from '@tanstack/react-router'
import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.ts'
import { MealScreen } from '@features/meals/components/meal-screen.tsx'
import { z } from 'zod'
import { zodValidator } from '@tanstack/zod-adapter'
import { meals } from '@features/meals/api/get-meals.ts'
import { store } from '@store/index.ts'

const MealRouteSearchSchema = z.object({
  query: z.string().optional(),
  page: z.number().optional().default(0),
  limit: z.number().optional().default(1)
})

export const mealsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/meals',
  component: MealScreen,
  loaderDeps: ({ search: { page, limit, query } }) => ({ page, limit, query }),
  loader: async ({ deps: { page, limit, query } }) => {
    const res = await store
      .dispatch(meals.endpoints.getMeals.initiate({ page, limit, query }))
      .unwrap()
    return {
      data: res.items,
      page: res.page,
      totalCount: res.totalCount,
      crumb: 'Meals'
    }
  },
  validateSearch: zodValidator(MealRouteSearchSchema),
  search: {
    middlewares: [retainSearchParams(true)]
  }
})
