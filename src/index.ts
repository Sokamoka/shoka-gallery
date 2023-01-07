import { App } from 'vue'

import { Gallery, GalleryItem, GalleryPanel, GalleryImage, GalleryCaption } from './gallery'

export { Gallery, GalleryItem, GalleryPanel, GalleryImage, GalleryCaption }

export function ShokaGallery(app: App) {
  app.component('Gallery', Gallery)
  app.component('GalleryItem', GalleryItem)
  app.component('GalleryPanel', GalleryPanel)
  app.component('GalleryImage', GalleryImage)
  app.component('GalleryCaption', GalleryCaption)
}
