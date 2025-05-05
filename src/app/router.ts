import { authRoute } from '@app/routes/auth/auth-route.tsx'
import { loginRoute } from '@app/routes/auth/login-route.ts'
import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.ts'
import { createMealRoute } from '@app/routes/dashboard/meals/create-meal-route.ts'
import { mealsRoute } from '@app/routes/dashboard/meals/meals-route.ts'
import { Auth } from '@features/auth/store'
import { createRootRouteWithContext, createRouter, ErrorComponent } from '@tanstack/react-router'
import { Root } from './routes/root.tsx'

export interface RouterContext {
  auth: Auth
}

// This should not render any layout. Just acts as a placeholder
export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Root
})

export const routeTree = rootRoute.addChildren([
  authRoute.addChildren([loginRoute]),
  dashboardRoute.addChildren([mealsRoute, createMealRoute])
])

export const router = createRouter({
  routeTree,
  defaultErrorComponent: ({ error }) => ErrorComponent({ error }),
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

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    name?: string
  }
}
