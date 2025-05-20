import { dashboardRoute } from '@app/routes/dashboard/dashboard-route.ts'
import { createRoute } from '@tanstack/react-router'
import { getMeal } from '@features/meals/api/get-meal.ts'
import { EditMealScreen } from '@features/meals/components/edit-meal-screen.tsx'
import { z } from 'zod'
import { Pending } from '@app/pending.tsx'

export const editMealRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'meals/$id',
  component: EditMealScreen,
  staticData: {
    name: 'edit.meal',
    displayOnNav: false
  },
  pendingMinMs: 500,
  pendingComponent: () => Pending({ message: 'Måltid' }),
  loader: async ({ params }) => {
    const data = await getMeal(params.id)
    return {
      data,
      crumb: 'meals'
    }
  },
  params: {
    parse: (params) => ({
      id: z.string().uuid().parse(params.id)
    }),
    stringify: ({ id }) => ({ id: `${id}` })
  }
})
