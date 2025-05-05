import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { buttonRecipe } from './button.ts'
import { inputRecipe } from './input.ts'
import { textareaRecipe } from './textarea.ts'

const customConfig = defineConfig({
  theme: {
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
      textarea: textareaRecipe
    }
  }
})

export const system = createSystem(defaultConfig, customConfig)
