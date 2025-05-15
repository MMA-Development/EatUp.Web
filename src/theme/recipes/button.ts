import { defineRecipe } from '@chakra-ui/react'

export const buttonRecipe = defineRecipe({
  base: {
    borderRadius: '!important lg'
  },
  variants: {
    variant: {
      icon: {
        borderWidth: '1px',
        minW: 'unset',
        p: 2,
        borderColor: 'colorPalette.muted',
        color: 'colorPalette.fg',
        _hover: {
          bg: 'colorPalette.subtle'
        },
        _expanded: {
          bg: 'colorPalette.subtle'
        }
      }
    },
    size: {
      icon: {
        h: '8',
        minW: '8',
        textStyle: 'xs',
        px: '2.5',
        gap: '1',
        _icon: {
          width: '3.5',
          height: '3.5'
        }
      }
    }
  }
})
