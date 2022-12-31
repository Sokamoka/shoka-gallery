# Shoka Gallery

Super simple headless image gallery for Vue and Nuxt users

## Usage

### Use as Vue plugin

```js
import { createApp } from 'vue'
import { ShokaGallery } from 'shoka-gallery'
import App from './App.vue'

const app = createApp(App)

app.use(ShokaGallery)
app.mount('#app')
```

### Direct import

```vue
<script setup>
  import { Gallery, GalleryItem, GalleryPanel, GalleryImage } from 'shoka-gallery'
</script>
<template>
  <Gallery v-slot:default="{ open }" class="grid grid-cols-3">
    <GalleryPanel
      v-if="open"
      class="fixed flex flex-col items-center justify-center inset-0 z-50"
      v-slot:default="{ isLoading, alt, isStartIndex, isEndIndex, close, next, prev }"
    >
      <div class="fixed bg-white/80 backdrop-blur-sm inset-0 -z-10" />
      <button
        class="absolute top-2 right-4 rounded-full bg-white hover:bg-rose-600 hover:text-white shadow-md p-2 cursor-pointer z-20"
        @click="close()"
      >
        Close
      </button>

      <GalleryImage
        :class="[
              'block max-w-[90%] max-h-[90%] overscroll-contain shadow-md transition-opacity duration-700 ease-out',
              isLoading ? 'opacity-0' : 'opacity-1',
            ]"
      >
        Loading....
      </GalleryImage>

      <button
        v-if="!isStartIndex"
        class="absolute left-4 top-1/2 rounded-full bg-white hover:bg-rose-600 hover:text-white shadow-md p-2 cursor-pointer z-20"
        @click="prev()"
      >
        Prev
      </button>

      <button
        v-if="!isEndIndex"
        class="absolute right-4 top-1/2 rounded-full bg-white hover:bg-rose-600 hover:text-white shadow-md p-2 cursor-pointer z-20"
        @click="next()"
      >
        Next
      </button>

      <div
        v-if="alt"
        class="absolute bottom-2 left-1/2 bg-rose-600 rounded-full shadow-md text-white text-sm font-medium transform -translate-x-1/2 px-5 py-2"
      >
        {{ alt }}
      </div>
    </GalleryPanel>
    <GalleryItem tabindex="0" src="https://picsum.photos/id/28/640/640" alt="Lorem ipsum" class="cursor-pointer">
      <img src="https://picsum.photos/id/28/200/200" />
    </GalleryItem>
    <GalleryItem tabindex="0" src="https://picsum.photos/id/29/640/640" alt="Lorem ipsum dolor" class="cursor-pointer">
      <img src="https://picsum.photos/id/29/200/200" />
    </GalleryItem>
    <GalleryItem tabindex="0" src="https://picsum.photos/id/10/640/640" alt="Lorem ipsum" class="cursor-pointer">
      <img src="https://picsum.photos/id/10/200/200" />
    </GalleryItem>
  </Gallery>
</template>
```
