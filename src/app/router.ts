import { mealsRoute } from '@app/routes/dashboard/meals/meals-route.ts'
import { createRootRouteWithContext, createRouter } from '@tanstack/react-router'
import { Root } from './routes/root.tsx'
import { authRoute } from '@app/routes/auth/auth-route.tsx'
import { loginRoute } from '@app/routes/auth/login-route.ts'
import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.ts'
import { Auth } from '@features/auth/store'
import { createMealRoute } from '@app/routes/dashboard/meals/create-meal-route.tsx'

export interface RouterContext {
  auth: Auth
}

// This should not render any layout. Just acts as a placeholder
export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Root
})

export const routeTree = rootRoute.addChildren([
  authRoute.addChildren([loginRoute]),
  dashboardRoute.addChildren([mealsRoute.addChildren([createMealRoute])])
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
