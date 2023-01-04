# Shoka Gallery

Super simple a11y headless image gallery for Vue users

## Example

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/shoka-gallery-examples?file=src/components/HelloWorld.vue)

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

## Keyboard interaction

| Command           | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `Esc`             | Closes open Gallery Panels                                 |
| `Tab`             | Cycles through an open Gallery Panels's contents           |
| `Shift` + `Tab`   | Cycles backwards through an open Gallery Panels's contents |
| `Arrow Right/Up`  | Go to next Image                                           |
| `Arrow Left/Down` | Go to previous Image                                       |

## Component API

### Gallery

| Prop           | Default | Description                                            |
| -------------- | ------- | ------------------------------------------------------ |
| **modelValue** | false   | Whether the Gallery is open or not.                    |
| **tag**        | 'div'   | The element or component the Gallery should render as. |

| Slot Prop        | Type      | Description                         |
| ---------------- | --------- | ----------------------------------- |
| **open**         | 'Boolean' | Whether the Gallery is open or not. |
| **items**        | 'Array'   | Images                              |
| **isLoading**    | 'Boolean' | Image is loading                    |
| **currentIndex** | 'Number'  | Current image index                 |
| **isStartIndex** | 'Boolean' | Current image is first              |
| **isEndIndex**   | 'Boolean' | Current image is last               |
| **currentItem**  | 'Object'  | Current image object                |
| **close**        | 'event'   | Call for closing gallery panel      |
| **next**         | 'event'   | Call for step next image            |
| **prev**         | 'event'   | Call for step previous image        |

### GalleryItem

| Prop       | Default | Description                                            |
| ---------- | ------- | ------------------------------------------------------ |
| **as**     | 'div'   | The element or component the Gallery should render as. |
| **src**    | ''      | The image URL                                          |
| **srcset** | ''      | Possible image sources                                 |
| **sizes**  | ''      | Set of source sizes                                    |
| **alt**    | ''      | Alternative text for accessibility                     |
| **title**  | ''      | Caption of image                                       |

| Slot Prop    | Type      | Description           |
| ------------ | --------- | --------------------- |
| **selected** | 'Boolean' | Selected/active Image |

### GalleryPanel

| Prop    | Default | Description                                            |
| ------- | ------- | ------------------------------------------------------ |
| **tag** | 'div'   | The element or component the Gallery should render as. |

| Slot Prop        | Type      | Description                    |
| ---------------- | --------- | ------------------------------ |
| **isLoading**    | 'Boolean' | Image is loading               |
| **items**        | 'Array'   | Images                              |
| **currentIndex** | 'Number'  | Current image index            |
| **isStartIndex** | 'Boolean' | Current image is first         |
| **isEndIndex**   | 'Boolean' | Current image is last          |
| **currentItem**  | 'Object'  | Current image object           |
| **close**        | 'event'   | Call for closing gallery panel |
| **next**         | 'event'   | Call for step next image       |
| **prev**         | 'event'   | Call for step previous image   |

### GalleryImage

| Events    | Description                                         |
| --------- | --------------------------------------------------- |
| **load**  | Image is loaded                                     |
| **error** | An error occurs while loading or rendering an image |

### GalleryTitle

| Prop    | Default | Description                                            |
| ------- | ------- | ------------------------------------------------------ |
| **tag** | 'h2'    | The element or component the Gallery should render as. |
