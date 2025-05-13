import { Pending } from '@app/pending.tsx'
import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.ts'
import { store } from '@store/index.ts'
import { createRoute, stripSearchParams } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'
import { orders } from '@features/orders/api/get-orders.ts'
import { OrderScreen } from '@features/orders/components/order-screen.tsx'

const defaultValues = {
  query: '',
  skip: 0,
  limit: 10
}

const OrdersRouteSearchSchema = z.object({
  query: z.string().optional(),
  skip: z.number().int().min(0).optional().default(defaultValues.skip),
  limit: z.number().int().min(1).optional().default(defaultValues.limit)
})

export const ordersRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/orders',
  component: OrderScreen,
  staticData: {
    displayOnNav: true,
    name: 'overview'
  },
  pendingMinMs: 500,
  pendingComponent: () => Pending({ message: 'Overblik' }),
  // We separate search params from the loader to ensure caching/preloading works correctly
  // it makes the data uniquely tied to the URL and avoids bugs.
  loaderDeps: ({ search: { skip, limit, query } }) => ({ skip, limit, query }),
  loader: async ({ deps: { skip, limit, query } }) => {
    const res = await store
      .dispatch(orders.endpoints.getOrders.initiate({ skip, limit, query }))
      .unwrap()
    return {
      data: res.items,
      page: res.page,
      totalCount: res.totalCount,
      crumb: 'orders'
    }
  },
  validateSearch: zodValidator(OrdersRouteSearchSchema),
  search: {
    middlewares: [stripSearchParams(defaultValues)]
  }
})
