<template>
  <div>
    <Gallery>
      <GalleryPanel>
        <GalleryImage class="w-64 h-64" />
        <GalleryTitle />
      </GalleryPanel>
      <div class="flex gap-5">
        <GalleryItem src="https://picsum.photos/id/28/256/256" title="title-1">
          <img src="https://picsum.photos/id/28/150/150" />
        </GalleryItem>
        <GalleryItem src="https://picsum.photos/id/29/256/256" title="title-2">
          <img src="https://picsum.photos/id/29/150/150" />
        </GalleryItem>
      </div>
    </Gallery>
  </div>
</template>
