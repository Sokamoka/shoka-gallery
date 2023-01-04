<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

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
    <h1 class="text-3xl font-bold tracking-tight text-gray-900 my-3">With modal dialog</h1>
    <Gallery v-model="isGalleryOpen" v-slot:default="{ open }" class="grid grid-cols-3 grid-rows-3 max-w-xl mx-auto">
      <Teleport to="body">
        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <GalleryPanel
            v-if="open"
            class="fixed flex flex-col items-center justify-center inset-0 z-50"
            v-slot:default="{ isLoading, isStartIndex, isEndIndex, close, next, prev }"
            static
          >
            <div class="fixed bg-white/80 backdrop-blur-sm inset-0 -z-10" aria-hidden="true" />
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

            <GalleryTitle
              class="absolute bottom-2 left-1/2 bg-rose-600 rounded-full shadow-md text-white text-sm font-medium transform -translate-x-1/2 px-5 py-2"
            />
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
      <GalleryItem
        tabindex="0"
        src="https://picsum.photos/id/17/640/640"
        alt="Donec sollicitudin molestie malesuada."
        title="Donec sollicitudin molestie malesuada."
        class="cursor-pointer"
      >
        <img src="https://picsum.photos/id/17/250/250" />
      </GalleryItem>
      <GalleryItem
        tabindex="0"
        src="https://picsum.photos/id/18/640/640"
        alt="Donec sollicitudin molestie malesuada."
        title="Donec sollicitudin molestie malesuada."
        class="cursor-pointer"
      >
        <img src="https://picsum.photos/id/18/250/250" />
      </GalleryItem>
      <GalleryItem
        tabindex="0"
        src="https://picsum.photos/id/19/640/640"
        alt="Donec sollicitudin molestie malesuada."
        title="Donec sollicitudin molestie malesuada."
        class="cursor-pointer"
      >
        <img src="https://picsum.photos/id/19/250/250" />
      </GalleryItem>
    </Gallery>
  </div>
</template>
