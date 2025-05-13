import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { buttonRecipe } from './recipes/button.ts'
import { inputRecipe } from './recipes/input.ts'
import { textareaRecipe } from './recipes/textarea.ts'
import { menuSlotRecipe } from '@theme/recipes/menu.ts'
import { selectSlotRecipe } from '@theme/recipes/select.ts'
import { badgeRecipe } from '@theme/recipes/badge.ts'
import { cardSlotRecipe } from '@theme/recipes/card.ts'

const customConfig = defineConfig({
  theme: {
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
      textarea: textareaRecipe,
      badge: badgeRecipe
    },
    slotRecipes: {
      menu: menuSlotRecipe,
      select: selectSlotRecipe,
      card: cardSlotRecipe
    }
  }
})

export const system = createSystem(defaultConfig, customConfig)
