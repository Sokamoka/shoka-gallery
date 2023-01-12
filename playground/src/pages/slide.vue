<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSwipe, SwipeDirection } from '@vueuse/core'
import { Gallery, Direction } from 'shoka-gallery'

const gallerylRef = ref<InstanceType<typeof Gallery> | null | any>(null)
const targetRef = ref(null)

const { isSwiping } = useSwipe(targetRef, {
  onSwipeEnd(e: TouchEvent, direction: SwipeDirection) {
    if (!isSwiping.value) return
    if (direction === SwipeDirection.RIGHT) {
      gallerylRef.value?.prev()
      return
    }
    gallerylRef.value?.next()
  },
})

onMounted(() => {
  console.log(gallerylRef.value)
})
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900 my-3">Gallery with Swipe and Slide Transition</h1>
    <Gallery ref="gallerylRef">
      <GalleryPanel
        class="fixed flex items-center justify-center inset-0 z-50 overflow-hidden"
        v-slot:default="{ direction, currentItem: { id, src } }"
      >
        <div class="fixed bg-black/70 backdrop-blur-sm inset-0 -z-10" aria-hidden="true" />
        <div class="absolute top-0">{{ isSwiping }}</div>
        <transition
          enter-active-class="duration-300 ease-out"
          :enter-from-class="direction === Direction.Next ? 'translate-x-full' : '-translate-x-full'"
          leave-active-class="duration-200 ease-in"
          :leave-to-class="direction === Direction.Next ? '-translate-x-full' : 'translate-x-full'"
          mode="out-in"
        >
          <div :key="id" ref="targetRef">
            <GalleryImage :src="src" class="block"> Loading... </GalleryImage>
          </div>
        </transition>
      </GalleryPanel>
      <div class="grid grid-cols-2 grid-rows-2 grid-flow-col gap-2 max-w-xl mx-auto overflow-hidden rounded-xl">
        <GalleryItem src="https://picsum.photos/id/40/600/600" title="title-1" class="">
          <img src="https://picsum.photos/id/40/350/350" class="" />
        </GalleryItem>
        <GalleryItem src="https://picsum.photos/id/41/600/600" title="title-2" class="">
          <img src="https://picsum.photos/id/41/350/350" class="" />
        </GalleryItem>
        <GalleryItem src="https://picsum.photos/id/42/800/450" title="title-3" class="">
          <img src="https://picsum.photos/id/42/350/350" class="" />
        </GalleryItem>
        <GalleryItem src="https://picsum.photos/id/43/600/600" title="title-4" class="">
          <img src="https://picsum.photos/id/43/350/350" class="" />
        </GalleryItem>
      </div>
    </Gallery>

    <h1 class="text-3xl font-bold tracking-tight text-gray-900 my-3">Gallery with Swipe images</h1>
    <Gallery v-slot:default="{ open }">
      <GalleryPanel v-if="open" class="fixed flex items-center justify-center inset-0 z-50 overflow-hidden" static>
        <div class="fixed bg-black/70 backdrop-blur-sm inset-0 -z-10" aria-hidden="true" />
        <GallerySwipe class="flex duration-200 w-full ml-[10%] sm:ml-0" v-slot:default="{ items }">
          <GallerySwipeItem
            v-for="{ id, src } in items"
            :key="id"
            class="flex-[0_0_90%] sm:flex-[0_0_100%] flex justify-start sm:justify-center items-center px-2"
          >
            <img :src="src" class="block shadow-md" />
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

    <h1 class="text-3xl font-bold tracking-tight text-gray-900 my-3">Gallery with Slide Transition</h1>
    <Gallery>
      <GalleryPanel
        class="fixed flex items-center justify-center inset-0 z-50 overflow-hidden"
        v-slot:default="{ direction, currentItem: { id } }"
      >
        <div class="fixed bg-black/70 backdrop-blur-sm inset-0 -z-10" aria-hidden="true" />
        <transition
          enter-active-class="duration-300 ease-out"
          :enter-from-class="direction === Direction.Next ? 'translate-x-full' : '-translate-x-full'"
          leave-active-class="duration-200 ease-in"
          :leave-to-class="direction === Direction.Next ? '-translate-x-full' : 'translate-x-full'"
          mode="out-in"
        >
          <div :key="id">
            <GalleryImage class="block"> Loading... </GalleryImage>
          </div>
        </transition>
      </GalleryPanel>
      <div class="grid grid-cols-2 grid-rows-2 grid-flow-col gap-2 max-w-xl mx-auto overflow-hidden rounded-xl">
        <GalleryItem src="https://picsum.photos/id/40/600/600" title="title-1" class="">
          <img src="https://picsum.photos/id/40/350/350" class="" />
        </GalleryItem>
        <GalleryItem src="https://picsum.photos/id/41/600/600" title="title-2" class="">
          <img src="https://picsum.photos/id/41/350/350" class="" />
        </GalleryItem>
        <GalleryItem src="https://picsum.photos/id/42/800/450" title="title-3" class="">
          <img src="https://picsum.photos/id/42/350/350" class="" />
        </GalleryItem>
        <GalleryItem src="https://picsum.photos/id/43/600/600" title="title-4" class="">
          <img src="https://picsum.photos/id/43/350/350" class="" />
        </GalleryItem>
      </div>
    </Gallery>
  </div>
</template>
