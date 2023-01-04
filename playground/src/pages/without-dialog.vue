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
    <h1 class="text-3xl font-bold tracking-tight text-gray-900 my-8">Without modal</h1>
    <div class="grid grid-cols-2 gap-5">
      <Gallery class="grid grid-cols-4 gap-2" v-slot:default="{ isLoading }">
        <div
          class="col-span-4 object-cover overflow-hidden aspect-square relative bg-gray-200 rounded-xl flex items-center justify-center"
        >
          <GalleryImage
            :class="['block transition-opacity duration-1000 ease-out', isLoading ? 'opacity-0' : 'opacity-1']"
          >
            <svg
              class="animate-spin h-8 w-8 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </GalleryImage>
        </div>
        <template v-for="{ thumb, title, image } in images" :key="thumb">
          <GalleryItem tag="a" href="#" :src="image" :alt="title" v-slot="{ selected }">
            <img
              :src="thumb"
              :alt="title"
              :title="title"
              :class="['rounded-md', { 'outline outline-2 outline-indigo-500 outline-offset-1': selected }]"
            />
          </GalleryItem>
        </template>
      </Gallery>

      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">Product</h1>
        Lorem ipsum
      </div>
    </div>
  </div>
</template>
