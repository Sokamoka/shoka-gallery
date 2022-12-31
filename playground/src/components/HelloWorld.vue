<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <Gallery v-slot:default="{ open }" class="grid grid-cols-6 gap-2">
      <Teleport to="body">
        <transition name="fade" mode="in-out">
          <GalleryPanel
            v-if="open"
            class="fixed flex flex-col items-center justify-center inset-0 z-50"
            v-slot:default="{ isLoading, alt, isStartIndex, isEndIndex, close, next, prev }"
          >
            <div class="fixed bg-white/80 backdrop-blur-sm inset-0 -z-10" />
            <button
              class="absolute top-2 right-4 rounded-full bg-white hover:bg-rose-600 hover:text-white shadow-md p-2 cursor-pointer z-20"
              @click="close()"
            >
              Close
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
              class="absolute left-4 top-1/2 rounded-full bg-white hover:bg-rose-600 hover:text-white shadow-md p-2 cursor-pointer z-20"
              @click="prev()"
            >
              Prev
            </button>

            <button
              v-if="!isEndIndex"
              class="absolute right-4 top-1/2 rounded-full bg-white hover:bg-rose-600 hover:text-white shadow-md p-2 cursor-pointer z-20"
              @click="next()"
            >
              Next
            </button>

            <div
              v-if="alt"
              class="absolute bottom-2 left-1/2 bg-rose-600 rounded-full shadow-md text-white text-sm font-medium transform -translate-x-1/2 px-5 py-2"
            >
              {{ alt }}
            </div>
          </GalleryPanel>
        </transition>
      </Teleport>
      <GalleryItem tabindex="0" src="https://picsum.photos/id/28/640/640" alt="Lorem ipsum" class="cursor-pointer">
        <img src="https://picsum.photos/id/28/250/250" />
      </GalleryItem>
      <GalleryItem
        tabindex="0"
        src="https://picsum.photos/id/29/640/640"
        alt="Lorem ipsum dolor"
        class="cursor-pointer"
      >
        <img src="https://picsum.photos/id/29/250/250" />
      </GalleryItem>
      <GalleryItem tabindex="0" src="https://picsum.photos/id/10/640/640" alt="Lorem ipsum" class="cursor-pointer">
        <img src="https://picsum.photos/id/10/250/250" />
      </GalleryItem>
      <GalleryItem tabindex="0" src="https://picsum.photos/id/12/640/640" alt="Lorem ipsum" class="cursor-pointer">
        <img src="https://picsum.photos/id/12/250/250" />
      </GalleryItem>
      <GalleryItem tabindex="0" src="https://picsum.photos/id/14/640/640" alt="Lorem ipsum" class="cursor-pointer">
        <img src="https://picsum.photos/id/14/250/250" />
      </GalleryItem>
      <GalleryItem tabindex="0" src="https://picsum.photos/id/16/640/640" alt="Lorem ipsum" class="cursor-pointer">
        <img src="https://picsum.photos/id/16/250/250" />
      </GalleryItem>
    </Gallery>

    <h1 class="text-3xl font-bold tracking-tight text-gray-900 my-8">Without modal</h1>
    <div class="grid grid-cols-2">
      <Gallery class="grid grid-cols-4 gap-2" v-slot:default="{ isLoading }">
        <div class="col-span-4 object-cover overflow-hidden aspect-square relative bg-gray-200 rounded-xl">
          <GalleryImage
            :class="['block transition-opacity duration-200 ease-out', isLoading ? 'opacity-0' : 'opacity-1']"
          >
            <svg
              class="absolute top-1/2 left-1/2 animate-spin h-8 w-8 text-gray-700 origin-center"
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
        <GalleryItem tag="a" href="#" src="https://picsum.photos/id/11/600/600" alt="Lorem ipsum">
          <img src="https://picsum.photos/id/11/200/200" class="rounded-md" />
        </GalleryItem>
        <GalleryItem tag="a" href="#" src="https://picsum.photos/id/12/600/600" alt="Lorem ipsum2">
          <img src="https://picsum.photos/id/12/200/200" class="rounded-md" />
        </GalleryItem>
        <GalleryItem tag="a" href="#" src="https://picsum.photos/id/13/600/600" alt="Lorem ipsum3">
          <img src="https://picsum.photos/id/13/200/200" class="rounded-md" />
        </GalleryItem>
        <GalleryItem tag="a" href="#" src="https://picsum.photos/id/14/600/600" alt="Lorem ipsum3">
          <img src="https://picsum.photos/id/14/200/200" class="rounded-md" />
        </GalleryItem>
      </Gallery>

      <div>
        Lorem ipsum
      </div>
    </div>
  </div>
</template>
