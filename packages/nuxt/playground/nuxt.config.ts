import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  alias: {
    'shoka-gallery': fileURLToPath(new URL('../../../src/index.ts', import.meta.url))
  },
  modules: [
    '../src/module.ts'
  ]
})
