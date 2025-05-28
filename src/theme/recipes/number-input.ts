import { defineSlotRecipe } from '@chakra-ui/react'

export const numberInput = defineSlotRecipe({
  slots: ['root', 'input'],
  base: {
    root: {
      borderRadius: '!important lg'
    },
    input: {
      borderRadius: '!important lg'
    }
  }
})
