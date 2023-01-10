<template>
  <Gallery v-slot:default="{ open, items }">
    <GalleryPanel v-if="open" class="fixed flex items-center justify-center inset-0 z-50 overflow-hidden" static>
      <div class="fixed bg-black/70 backdrop-blur-sm inset-0 -z-10" aria-hidden="true" />
      <GallerySwipe class="flex duration-200 w-full pl-[10%] gap-2">
        <GallerySwipeItem v-for="{ id, src } in items" :key="id" class="flex-[0_0_90%] flex justify-start items-center">
          <img
            :src="src"
            :class="[
              'block shadow-md',
            ]"
          />
        </GallerySwipeItem>
      </GallerySwipe>
    </GalleryPanel>
    <div class="grid grid-cols-2 grid-rows-2 grid-flow-col gap-2 max-w-xl mx-auto overflow-hidden rounded-xl">
      <GalleryItem src="https://picsum.photos/id/28/600/600" title="title-1" class="row-span-2">
        <img src="https://picsum.photos/id/28/350/700" class="w-full h-full object-cover" />
      </GalleryItem>
      <GalleryItem src="https://picsum.photos/id/29/600/600" title="title-2" class="overflow-hidden object-cover">
        <img src="https://picsum.photos/id/29/350/350" class="w-full h-full object-cover" />
      </GalleryItem>
      <GalleryItem src="https://picsum.photos/id/30/600/600" title="title-3" class="overflow-hidden object-cover">
        <img src="https://picsum.photos/id/30/350/350" class="w-full h-full object-cover" />
      </GalleryItem>
    </div>
  </Gallery>
</template>
