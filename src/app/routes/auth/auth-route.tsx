import { rootRoute } from '@app/router.ts'
import { createRoute, Outlet } from '@tanstack/react-router'

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: () => <Outlet />
})
