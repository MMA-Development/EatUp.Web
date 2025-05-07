import { createRoute } from '@tanstack/react-router'
import { authRoute } from '@app/routes/auth/auth-route.tsx'
import { SignupScreen } from '@features/auth/components/signup-screen.tsx'

export const signupRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/signup',
  component: SignupScreen
})
