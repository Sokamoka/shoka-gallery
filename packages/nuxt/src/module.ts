import { fileURLToPath } from 'url'
import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit'

const components = [
  'Gallery',
  'GalleryPanel',
  'GalleryItem',
  'GalleryImage',
  'GalleryCaption',
  'GallerySwipe',
  'GallerySwipeItem',
]

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-shoka-gallery',
    configKey: 'ShokaGallery',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },

  defaults: {},

  setup(options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    for (const component of components) {
      addComponent({
        name: component,
        export: component,
        filePath: 'shoka-gallery',
        global: true,
      })
    }
  },
})
