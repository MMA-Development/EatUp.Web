import { defineSlotRecipe } from '@chakra-ui/react'

export const cardSlotRecipe = defineSlotRecipe({
  slots: ['root'],
  base: {
    root: {
      borderRadius: 'lg'
    }
  }
})
