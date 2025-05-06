import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { buttonRecipe } from './recipes/button.ts'
import { inputRecipe } from './recipes/input.ts'
import { textareaRecipe } from './recipes/textarea.ts'
import { menuSlotRecipe } from '@theme/recipes/menu.ts'
import { selectSlotRecipe } from '@theme/recipes/select.ts'

const customConfig = defineConfig({
  theme: {
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
      textarea: textareaRecipe
    },
    slotRecipes: {
      menu: menuSlotRecipe,
      select: selectSlotRecipe
    }
  }
})

export const system = createSystem(defaultConfig, customConfig)
