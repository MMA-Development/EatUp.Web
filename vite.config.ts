import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { PluginOptions } from 'babel-plugin-react-compiler'

const ReactCompilerConfig: Partial<PluginOptions> = {}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]]
      }
    })
  ],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/app'),
      '@components': resolve(__dirname, 'src/components'),
      '@lib': resolve(__dirname, 'src/lib'),
      '@locales': resolve(__dirname, 'src/locales'),
      '@features': resolve(__dirname, 'src/features'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@store': resolve(__dirname, 'src/store'),
      '@theme': resolve(__dirname, 'src/theme'),
      '@app-types': resolve(__dirname, 'src/types'),
      '@utils': resolve(__dirname, 'src/utils')
    }
  },
  build: {
    target: 'es2022'
  }
})
