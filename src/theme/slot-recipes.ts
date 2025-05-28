import { menuSlotRecipe } from './recipes/menu.ts'
import { selectSlotRecipe } from './recipes/select.ts'
import { cardSlotRecipe } from './recipes/card.ts'
import { numberInput } from './recipes/number-input.ts'

export const slotRecipes = {
  menu: menuSlotRecipe,
  select: selectSlotRecipe,
  card: cardSlotRecipe,
  numberInput: numberInput
}
