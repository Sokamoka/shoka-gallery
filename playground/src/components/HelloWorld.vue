<script setup lang="ts">
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

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

const isGalleryOpen = ref(false)

watch(isGalleryOpen, (isOpen) => {
  if (isOpen) {
    document.body.classList.add('overflow-hidden')
    return
  }
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900 my-8">With modal dialog</h1>
    <Gallery v-model="isGalleryOpen" v-slot:default="{ open }" class="grid grid-cols-6 gap-2 mb-20">
      <Teleport to="body">
        <transition name="fade" mode="in-out">
          <GalleryPanel
            v-if="open"
            class="fixed flex flex-col items-center justify-center inset-0 z-50"
            v-slot:default="{ isLoading, title, isStartIndex, isEndIndex, close, next, prev }"
          >
            <div class="fixed bg-white/80 backdrop-blur-sm inset-0 -z-10" />
            <button
              class="absolute top-2 right-4 rounded-full bg-white hover:bg-rose-600 hover:text-white shadow-md p-2 cursor-pointer z-20"
              @click="close()"
            >
              <Icon icon="mdi:close" class="w-5 h-5" />
            </button>

            <GalleryImage
              :class="[
                'block max-w-[90%] max-h-[90%] overscroll-contain shadow-md transition-opacity duration-700 ease-out',
                isLoading ? 'opacity-0' : 'opacity-1',
              ]"
            >
              <svg
                class="absolute top-1/2 left-1/2 animate-spin h-8 w-8 text-rose-600"
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

            <button
              v-if="!isStartIndex"
              class="absolute left-4 top-1/2 rounded-full bg-white hover:bg-rose-600 hover:text-white shadow-md p-1 cursor-pointer z-20"
              @click="prev()"
            >
              <Icon icon="mdi:chevron-left" class="w-8 h-8" />
            </button>

            <button
              v-if="!isEndIndex"
              class="absolute right-4 top-1/2 rounded-full bg-white hover:bg-rose-600 hover:text-white shadow-md p-1 cursor-pointer z-20"
              @click="next()"
            >
              <Icon icon="mdi:chevron-right" class="w-8 h-8" />
            </button>

            <div
              v-if="title"
              class="absolute bottom-2 left-1/2 bg-rose-600 rounded-full shadow-md text-white text-sm font-medium transform -translate-x-1/2 px-5 py-2"
              aria-live="assertive"
            >
              {{ title }}
            </div>
          </GalleryPanel>
        </transition>
      </Teleport>
      <GalleryItem
        tabindex="0"
        src="https://picsum.photos/id/28/640/640"
        alt="Donec sollicitudin molestie malesuada."
        title="Donec sollicitudin molestie malesuada."
        class="cursor-pointer"
      >
        <img src="https://picsum.photos/id/28/250/250" />
      </GalleryItem>
      <GalleryItem
        tabindex="0"
        src="https://picsum.photos/id/29/640/640"
        alt="Pellentesque in ipsum id orci porta dapibus."
        title="Pellentesque in ipsum id orci porta dapibus."
        class="cursor-pointer"
      >
        <img src="https://picsum.photos/id/29/250/250" />
      </GalleryItem>
      <GalleryItem
        tabindex="0"
        src="https://picsum.photos/id/10/640/640"
        alt="Curabitur aliquet quam id dui posuere blandit."
        title="Curabitur aliquet quam id dui posuere blandit."
        class="cursor-pointer"
      >
        <img src="https://picsum.photos/id/10/250/250" />
      </GalleryItem>
      <GalleryItem
        tabindex="0"
        src="https://picsum.photos/id/12/640/640"
        alt="Pellentesque in ipsum id orci porta dapibus."
        title="Pellentesque in ipsum id orci porta dapibus."
        class="cursor-pointer"
      >
        <img src="https://picsum.photos/id/12/250/250" />
      </GalleryItem>
      <GalleryItem
        tabindex="0"
        src="https://picsum.photos/id/14/640/640"
        alt="Praesent sapien massa, convallis a pellentesque nec, egestas non nisi."
        title="Praesent sapien massa, convallis a pellentesque nec, egestas non nisi."
        class="cursor-pointer"
      >
        <img src="https://picsum.photos/id/14/250/250" />
      </GalleryItem>
      <GalleryItem
        tabindex="0"
        src="https://picsum.photos/id/16/640/640"
        alt="Donec sollicitudin molestie malesuada."
        title="Donec sollicitudin molestie malesuada."
        class="cursor-pointer"
      >
        <img src="https://picsum.photos/id/16/250/250" />
      </GalleryItem>
    </Gallery>

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
