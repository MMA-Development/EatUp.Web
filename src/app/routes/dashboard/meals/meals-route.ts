import { Pending } from '@app/pending.tsx'
import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.ts'
import { meals } from '@features/meals/api/get-meals.ts'
import { MealScreen } from '@features/meals/components/meal-screen.tsx'
import { store } from '@store/index.ts'
import { createRoute, stripSearchParams } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

const defaultValues = {
  query: '',
  skip: 0,
  limit: 10
}

const MealRouteSearchSchema = z.object({
  query: z.string().optional(),
  skip: z.number().int().min(0).optional().default(defaultValues.skip),
  limit: z.number().int().min(1).optional().default(defaultValues.limit)
})

export const mealsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/meals',
  component: MealScreen,
  staticData: {
    name: 'overview'
  },
  pendingMinMs: 500,
  pendingComponent: () => Pending({ message: 'Overblik' }),
  // We separate search params from the loader to ensure caching/preloading works correctly
  // it makes the data uniquely tied to the URL and avoids bugs.
  loaderDeps: ({ search: { skip, limit, query } }) => ({ skip, limit, query }),
  loader: async ({ deps: { skip, limit, query } }) => {
    const res = await store
      .dispatch(meals.endpoints.getMeals.initiate({ skip, limit, query }))
      .unwrap()
    return {
      data: res.items,
      skip: res.skip,
      totalCount: res.totalCount,
      crumb: 'Meals'
    }
  },
  validateSearch: zodValidator(MealRouteSearchSchema),
  search: {
    middlewares: [stripSearchParams(defaultValues)]
  }
})
