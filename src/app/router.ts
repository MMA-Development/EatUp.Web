import { mealsRoute } from '@app/routes/dashboard/meals/meals-route.tsx'
import { createRootRouteWithContext, createRouter } from '@tanstack/react-router'
import { Root } from './routes/root.tsx'
import { authRoute } from '@app/routes/auth/auth-route.tsx'
import { loginRoute } from '@app/routes/auth/login-route.ts'
import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.tsx'
import { indexRoute } from '@app/routes/dashboard/index-route.tsx'
import { Auth } from '@features/auth/store'

export interface RouterContext {
  auth: Auth
}

// This should not render any layout. Just acts as a placeholder
export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Root,
  onEnter: () => {
    router.navigate({
      to: '/dashboard'
    })
  }
})

export const routeTree = rootRoute.addChildren([
  authRoute.addChildren([loginRoute]),
  dashboardRoute.addChildren([indexRoute, mealsRoute])
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  // defaultNotFoundComponent: NotFound,
  context: {
    auth: undefined! // This will be set after we wrap the app in an AuthProvider
  }
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
