import { defineSlotRecipe } from '@chakra-ui/react'

export const selectSlotRecipe = defineSlotRecipe({
  slots: ['item', 'content', 'trigger'],
  base: {
    content: {
      borderRadius: '!important lg'
    },
    item: {
      borderRadius: '!important lg'
    },
    trigger: {
      borderRadius: '!important lg'
    }
  }
})
