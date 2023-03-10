# Shoka Gallery

Super simple a11y headless image gallery for Vue 3 users

## Example

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/shoka-gallery-examples?file=src/components/HelloWorld.vue)

More examples: [playground](https://github.com/Sokamoka/shoka-gallery/tree/main/playground/src/pages)

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
import { Gallery, GalleryItem, GalleryPanel, GalleryImage, GalleryCaption } from 'shoka-gallery'
</script>
<template>
  <Gallery>
    <GalleryPanel>
      <GalleryImage> Loading.... </GalleryImage>
      <GalleryCaption />
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

## Nuxt

### Install:

```sh
npm install nuxt-shoka-gallery
or
pnpm add nuxt-shoka-gallery
```

### Usage:
Add `nuxt-shoka-gallery` to modules in `nuxt.config.js`

```js
export default defineNuxtConfig({
  modules: ['nuxt-shoka-gallery']
})

```

## Focus management

## Keyboard interaction

To navigate through the **GalleryItem** using `Tab` keys and open the **GalleryPanel** by pressing the `Enter` key.

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
| **as**         | 'div'   | The element or component the Gallery should render as. |

| Slot Prop        | Type        | Description                         |
| ---------------- | ----------- | ----------------------------------- |
| **open**         | 'Boolean'   | Whether the Gallery is open or not. |
| **items**        | 'Array'     | Images                              |
| **isLoading**    | 'Boolean'   | Image is loading                    |
| **currentIndex** | 'Number'    | Current image index                 |
| **isStartIndex** | 'Boolean'   | Current image is first              |
| **isEndIndex**   | 'Boolean'   | Current image is last               |
| **currentItem**  | 'Object'    | Current image object                |
| **direction**    | 'PREV/NEXT' | Direction of image change           |
| **close**        | 'event'     | Call for closing gallery panel      |
| **next**         | 'event'     | Call for step next image            |
| **prev**         | 'event'     | Call for step previous image        |

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

| Prop   | Default  | Description                                            |
| ------ | -------- | ------------------------------------------------------ |
| **as** | 'figure' | The element or component the Gallery should render as. |

| Slot Prop        | Type        | Description                    |
| ---------------- | ----------- | ------------------------------ |
| **isLoading**    | 'Boolean'   | Image is loading               |
| **items**        | 'Array'     | Images                         |
| **currentIndex** | 'Number'    | Current image index            |
| **isStartIndex** | 'Boolean'   | Current image is first         |
| **isEndIndex**   | 'Boolean'   | Current image is last          |
| **currentItem**  | 'Object'    | Current image object           |
| **direction**    | 'PREV/NEXT' | Direction of image change      |
| **close**        | 'event'     | Call for closing gallery panel |
| **next**         | 'event'     | Call for step next image       |
| **prev**         | 'event'     | Call for step previous image   |

### GalleryImage

| Events    | Description                                         |
| --------- | --------------------------------------------------- |
| **load**  | Image is loaded                                     |
| **error** | An error occurs while loading or rendering an image |

### GalleryCaption

| Prop   | Default      | Description                                            |
| ------ | ------------ | ------------------------------------------------------ |
| **as** | 'figcaption' | The element or component the Gallery should render as. |

### GallerySwipe

| Prop   | Default | Description                                            |
| ------ | ------- | ------------------------------------------------------ |
| **as** | 'div'   | The element or component the Gallery should render as. |

| Slot Prop | Type      | Description         |
| --------- | --------- | ------------------- |
| **items** | 'Boolean' | Gallery swipe items |

### GallerySwipeItem

| Prop   | Default | Description                                            |
| ------ | ------- | ------------------------------------------------------ |
| **as** | 'div'   | The element or component the Gallery should render as. |
