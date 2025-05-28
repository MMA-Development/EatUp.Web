import { colorPalettes } from '@theme/colors.ts'

/**
 * Generates a random color based on the given name.
 *
 * @param {string} name - The input string used to determine the color.
 * @return {string} A color string from the defined color palette.
 */
export function getRandomColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % colorPalettes.length
  return colorPalettes[index]
}
