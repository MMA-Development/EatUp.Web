import { defineSlotRecipe } from '@chakra-ui/react'

export const menuSlotRecipe = defineSlotRecipe({
  slots: ['item', 'content', 'trigger'],
  base: {
    content: {
      borderRadius: '!important lg'
    },
    item: {
      borderRadius: '!important lg',
      cursor: 'pointer'
    },
    trigger: {
      borderRadius: '!important lg'
    }
  }
})
