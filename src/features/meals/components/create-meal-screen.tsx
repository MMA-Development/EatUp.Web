import { Flex } from '@chakra-ui/react'
import { AddMealForm } from '@features/meals/components/add-meal-form.tsx'

export function CreateMealScreen() {
  return (
    <Flex>
      <AddMealForm />
    </Flex>
  )
}
