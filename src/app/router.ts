import { authRoute } from '@app/routes/auth/auth-route.tsx'
import { loginRoute } from '@app/routes/auth/login-route.ts'
import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.ts'
import { createMealRoute } from '@app/routes/dashboard/meals/create-meal-route.ts'
import { mealsRoute } from '@app/routes/dashboard/meals/meals-route.ts'
import { Auth } from '@features/auth/store'
import { createRootRouteWithContext, createRouter, ErrorComponent } from '@tanstack/react-router'
import { Root } from './routes/root.tsx'
import { editMealRoute } from '@app/routes/dashboard/meals/edit-meal-route.ts'
import { signupRoute } from '@app/routes/auth/signup-route.ts'
import { ordersRoute } from '@app/routes/dashboard/orders/orders-route.ts'
import { statsRoute } from '@app/routes/dashboard/stats/stats-route.ts'
import { profileRoute } from '@app/routes/dashboard/profile/profile-route.ts'

export interface RouterContext {
  auth: Auth
}

// This should not render any layout. Act as a placeholder
export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Root
})

export const routeTree = rootRoute.addChildren([
  authRoute.addChildren([loginRoute, signupRoute]),
  dashboardRoute.addChildren([
    mealsRoute,
    statsRoute,
    createMealRoute,
    editMealRoute,
    ordersRoute,
    profileRoute
  ])
])

export const router = createRouter({
  routeTree,
  defaultErrorComponent: ({ error }) => ErrorComponent({ error }),
  defaultPreload: 'intent',
  scrollRestoration: true,
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
    displayOnNav?: boolean
  }
}
