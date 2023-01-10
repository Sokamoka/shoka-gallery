import { App } from 'vue'

import {
  Gallery,
  GalleryItem,
  GalleryPanel,
  GalleryImage,
  GalleryCaption,
  GallerySwipe,
  GallerySwipeItem,
} from './gallery'

export { Gallery, GalleryItem, GalleryPanel, GalleryImage, GalleryCaption, GallerySwipe, GallerySwipeItem }

export function ShokaGallery(app: App) {
  app.component('Gallery', Gallery)
  app.component('GalleryItem', GalleryItem)
  app.component('GalleryPanel', GalleryPanel)
  app.component('GalleryImage', GalleryImage)
  app.component('GalleryCaption', GalleryCaption)
  app.component('GallerySwipe', GallerySwipe)
  app.component('GallerySwipeItem', GallerySwipeItem)
}
