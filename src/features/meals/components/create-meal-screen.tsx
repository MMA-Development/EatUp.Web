import { Flex } from '@chakra-ui/react'
import { MealForm } from '@features/meals/components/meal-form.tsx'

export function CreateMealScreen() {
  return (
    <Flex>
      <MealForm />
    </Flex>
  )
}
