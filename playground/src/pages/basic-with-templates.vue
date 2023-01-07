<script setup lang="ts">
import { ref } from 'vue'

const images = ref([
  {
    thumb: 'https://picsum.photos/id/11/200/200',
    title: 'Lorem ipsum 1',
    image: 'https://picsum.photos/id/11/600/600',
  },
  {
    thumb: 'https://picsum.photos/id/12/200/200',
    title: 'Lorem ipsum 2',
    image: 'https://picsum.photos/id/12/600/600',
  },
  {
    thumb: 'https://picsum.photos/id/13/200/200',
    title: 'Lorem ipsum 3',
    image: 'https://picsum.photos/id/13/600/600',
  },
  {
    thumb: 'https://picsum.photos/id/14/200/200',
    title: 'Lorem ipsum 4',
    image: 'https://picsum.photos/id/14/600/600',
  },
  {
    thumb: 'https://picsum.photos/id/15/200/200',
    title: 'Lorem ipsum 5',
    image: 'https://picsum.photos/id/15/600/600',
  },
  {
    thumb: 'https://picsum.photos/id/16/200/200',
    title: 'Lorem ipsum 6',
    image: 'https://picsum.photos/id/16/600/600',
  },
])
</script>

<template>
  <div>
    <Gallery>
      <GalleryPanel>
        <GalleryImage class="w-64 h-64" />
        <GalleryCaption />
      </GalleryPanel>
      <div class="flex gap-5">
        <template v-for="{ image, thumb, title } in images" key="image">
          <GalleryItem as="template" :src="image" :title="title" v-slot:default="{ selected }">
            <div :class="['overflow-hidden', selected ? 'outline outline-4 outline-indigo-500' : '']">
              <img :src="thumb" class="transition hover:scale-125" />
            </div>
          </GalleryItem>
        </template>
      </div>
    </Gallery>
  </div>
</template>
