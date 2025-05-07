import { Flex } from '@chakra-ui/react'
import { useLoaderData } from '@tanstack/react-router'
import { MealForm } from '@features/meals/components/meal-form.tsx'

export function EditMealScreen() {
  const { data } = useLoaderData({ from: '/dashboard/meals/$id' })

  return (
    <Flex direction={'column'}>
      <MealForm meal={data} />
    </Flex>
  )
}
