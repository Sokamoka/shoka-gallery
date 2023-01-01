# Shoka Gallery

Super simple a11y headless image gallery for Vue users

## Installation
```sh
# npm:
npm install shoka-gallery

# pnpm:
pnpm add shoka-gallery
```

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
      v-slot:default="{ isLoading, alt, isStartIndex, isEndIndex, close, next, prev }"
    >
      <div class="fixed bg-white/80 backdrop-blur-sm inset-0 -z-10" />
      <button
        @click="close()"
      >
        Close
      </button>

      <GalleryImage>
        Loading....
      </GalleryImage>

      <button
        v-if="!isStartIndex"
        @click="prev()"
      >
        Prev
      </button>

      <button
        v-if="!isEndIndex"
        @click="next()"
      >
        Next
      </button>

      <div v-if="alt">
        {{ alt }}
      </div>
    </GalleryPanel>

    <GalleryItem tabindex="0" src="https://picsum.photos/id/28/640/640" alt="Lorem ipsum 1">
      <img src="https://picsum.photos/id/28/200/200" />
    </GalleryItem>

    <GalleryItem tabindex="0" src="https://picsum.photos/id/29/640/640" alt="Lorem ipsum 2">
      <img src="https://picsum.photos/id/29/200/200" />
    </GalleryItem>
    
    <GalleryItem tabindex="0" src="https://picsum.photos/id/10/640/640" alt="Lorem ipsum 3">
      <img src="https://picsum.photos/id/10/200/200" />
    </GalleryItem>
  </Gallery>
</template>
```

## Components

- Gallery
- GalleryItem
- GalleryPanel
- GalleryImage
