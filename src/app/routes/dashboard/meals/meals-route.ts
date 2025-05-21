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
  take: 10,
  categories: [] as string[]
}

const MealRouteSearchSchema = z.object({
  query: z.string().optional(),
  skip: z.number().int().min(0).optional().default(defaultValues.skip),
  take: z.number().int().min(1).optional().default(defaultValues.take),
  categories: z.array(z.string()).optional().default(defaultValues.categories)
})

export const mealsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/meals',
  component: MealScreen,
  staticData: {
    displayOnNav: true,
    name: 'overview'
  },
  pendingMinMs: 500,
  pendingComponent: () => Pending({ message: 'overview' }),
  // We separate search params from the loader to ensure caching/preloading works correctly
  // it makes the data uniquely tied to the URL and avoids bugs.
  loaderDeps: ({ search: { skip, take, query, categories } }) => ({
    skip,
    take,
    query,
    categories
  }),
  loader: async ({ deps: { skip, take, query, categories } }) => {
    const res = await store
      .dispatch(meals.endpoints.getMeals.initiate({ skip, take, query, categories }))
      .unwrap()
    return {
      data: res.items,
      page: res.page,
      totalCount: res.totalCount,
      categories,
      crumb: 'meals'
    }
  },
  validateSearch: zodValidator(MealRouteSearchSchema),
  search: {
    middlewares: [stripSearchParams(defaultValues)]
  }
})
