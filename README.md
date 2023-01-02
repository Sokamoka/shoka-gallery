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
import { Gallery, GalleryItem, GalleryPanel, GalleryImage, GalleryTitle } from 'shoka-gallery'
</script>
<template>
  <Gallery>
    <GalleryPanel>
      <GalleryImage> Loading.... </GalleryImage>
      <GalleryTitle />
    </GalleryPanel>

    <GalleryItem>
      <img src="..." />
    </GalleryItem>

    <GalleryItem>
      <img src="..." />
    </GalleryItem>

    <GalleryItem>
      <img src="..." />
    </GalleryItem>
  </Gallery>
</template>
```

### Keyboard interaction

| Command           | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `Esc`             | Closes any open Gallery Panels                             |
| `Tab`             | Cycles through an open Gallery Panels's contents           |
| `Shift` + `Tab`   | Cycles backwards through an open Gallery Panels's contents |
| `Arrow Right/Up`  | Go to next Image                                           |
| `Arrow Left/Down` | Go to previous Image                                       |

## Components

- Gallery
- GalleryItem
- GalleryPanel
- GalleryImage
