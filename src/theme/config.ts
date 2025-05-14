import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { buttonRecipe } from './recipes/button.ts'
import { inputRecipe } from './recipes/input.ts'
import { textareaRecipe } from './recipes/textarea.ts'
import { badgeRecipe } from './recipes/badge.ts'
import { slotRecipes } from './slot-recipes.ts'

const customConfig = defineConfig({
  theme: {
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
      textarea: textareaRecipe,
      badge: badgeRecipe
    },
    slotRecipes
  }
})

export const system = createSystem(defaultConfig, customConfig)
