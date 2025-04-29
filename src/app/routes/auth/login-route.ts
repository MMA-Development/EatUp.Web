import { createRoute } from '@tanstack/react-router'
import { authRoute } from '@app/routes/auth/auth-route.tsx'
import { LoginScreen } from '@features/auth/components/login-screen.tsx'
import { z } from 'zod'
import { zodValidator } from '@tanstack/zod-adapter'

const LoginRouteSearchSchema = z.object({
  redirect: z.string().optional()
})

export const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/login',
  validateSearch: zodValidator(LoginRouteSearchSchema),
  component: LoginScreen
})
