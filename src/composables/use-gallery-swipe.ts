import { computed, onMounted, onUnmounted, Ref, ref, watch } from 'vue'
import { unrefElement, useSwipe, useResizeObserver, SwipeDirection } from '@vueuse/core'

function nextFrame(cb: () => void) {
  requestAnimationFrame(() => requestAnimationFrame(cb))
}

export function useGallerySwipe(
  swipeItems: Ref<{ id: string; itemRef: HTMLElement | null }[]>,
  currentIndex: Ref<number>,
  next: () => void,
  prev: () => void
) {
  const target = ref<HTMLElement | null>(null)
  const left = ref<number>(0)
  const startPos = ref<number>(0)
  const toggleTransition = ref<string | null>('inherit')

  const currentItem = computed(() => swipeItems.value[currentIndex.value]?.itemRef)

  const styles = computed(() => ({
    transform: `translateX(${left.value}px)`,
    transition: toggleTransition.value,
  }))

  watch(
    () => currentIndex.value,
    () => {
      left.value = calculetePosition()
    }
  )

  const { lengthX, stop: stopSwipe } = useSwipe(target, {
    passive: false,
    onSwipeStart(e: TouchEvent) {
      startPos.value = left.value
    },
    onSwipe(e: TouchEvent) {
      left.value = Number((startPos.value - lengthX.value).toFixed())
    },
    onSwipeEnd(e: TouchEvent, direction: SwipeDirection) {
      if (Math.abs(lengthX.value) >= (currentItem.value?.offsetWidth ?? 0) / 2) {
        if (direction === SwipeDirection.LEFT) {
          next()
        }
        if (direction === SwipeDirection.RIGHT) {
          prev()
        }
        left.value = calculetePosition()
        return
      }
      left.value = startPos.value
    },
  })

  const { stop: stopResizeObserver } = useResizeObserver(target, (entries) => {
    left.value = calculetePosition()
  })

  onMounted(() => {
    left.value = calculetePosition() // Todo: Possibly not necessary
    nextFrame(() => (toggleTransition.value = null))
  })

  onUnmounted(cleanup)

  function cleanup() {
    stopSwipe()
    stopResizeObserver()
  }

  function calculetePosition() {
    return currentIndex.value * (unrefElement(currentItem)?.offsetWidth ?? 0) * -1
  }

  return {
    target,
    styles,
  }
}
