import {
  computed,
  defineComponent,
  h,
  inject,
  onMounted,
  provide,
  ref,
  nextTick,
  onUnmounted,
  // Types
  InjectionKey,
  Ref,
  ComputedRef,
} from 'vue'

interface GalleryItem {
  id: string
  src: string
  alt: string
  itemRef: HTMLElement | null
}

interface ApiDefinition {
  items: Ref<GalleryItem[]>
  isOpen: Ref<boolean>
  isLoading: Ref<boolean>
  currentItem: ComputedRef<GalleryItem>
  currentIndex: Ref<number>
  isStartIndex: ComputedRef<boolean>
  isEndIndex: ComputedRef<boolean>

  registerImage(item: GalleryItem): void
  unregisterImage(id: string): void
  open(id: string | null): void
  close(): void
  prev(): void
  next(): void
}

let GalleryContext = Symbol('GalleryContext') as InjectionKey<ApiDefinition>

function useGalleryContext(component: string) {
  let context = inject(GalleryContext, null)
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Gallery /> component.`)
    // @ts-ignore
    if (Error.captureStackTrace) Error.captureStackTrace(err, useGalleryContext)
    throw err
  }
  return context
}

export const Gallery = defineComponent({
  name: 'Gallery',

  props: {
    tag: {
      type: [String, Object],
      default: 'div',
    },
  },

  setup(props, { slots }) {
    const items = ref<GalleryItem[]>([])
    const isOpen = ref(false)
    const currentIndex = ref(0)
    const isLoading = ref(false)

    const currentItem = computed(() => items.value[currentIndex.value])

    const api = {
      items,
      isOpen,
      isLoading,
      currentItem,
      currentIndex,
      isStartIndex: computed(() => currentIndex.value === 0),
      isEndIndex: computed(() => currentIndex.value === items.value.length - 1),
      registerImage: (item: GalleryItem) => items.value.push(item),
      unregisterImage: (id: string) => {
        let idx = items.value.findIndex((item) => item.id === id)
        if (idx !== -1) items.value.splice(idx, 1)
      },
      open(id: string) {
        currentIndex.value = items.value.findIndex((item: GalleryItem) => item.id === id) || 0
        isOpen.value = true
        isLoading.value = true
      },
      close() {
        isOpen.value = false
        nextTick(() => currentItem.value.itemRef?.focus())
      },
      next() {
        if (currentIndex.value === items.value.length - 1) return
        currentIndex.value = currentIndex.value + 1
        isLoading.value = true
      },
      prev() {
        if (currentIndex.value === 0) return
        currentIndex.value = currentIndex.value - 1
        isLoading.value = true
      },
    }

    provide(GalleryContext, api)

    return () => {
      const slot = {
        open: isOpen.value,
        isLoading: isLoading.value,
        currentIndex: currentIndex.value, // Todo: Start/End
        isStartIndex: api.isStartIndex.value,
        isEndIndex: api.isEndIndex.value,
        close: () => api.close(),
        next: () => api.next(),
        prev: () => api.prev(),
        ...currentItem.value,
      }
      const scopedSlots = slots.default?.(slot)
      return h(props.tag, {}, scopedSlots)
    }
  },
})

export const GalleryPanel = defineComponent({
  name: 'GalleryPanel',

  props: {
    tag: {
      type: [String, Object],
      default: 'div',
    },
  },

  setup(props, { slots }) {
    const galleryPanelRef = ref<HTMLDivElement | null>(null)

    const api = useGalleryContext('GalleryPanel')

    onMounted(() => galleryPanelRef.value?.focus())

    const onKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          api.close()
          break
        case 'ArrowUp':
        case 'ArrowRight':
          event.preventDefault()
          event.stopPropagation()
          api.next()
          break
        case 'ArrowDown':
        case 'ArrowLeft':
          event.preventDefault()
          event.stopPropagation()
          api.prev()
          break
      }
    }

    return () => {
      const slot = {
        isStartIndex: api.isStartIndex.value,
        isEndIndex: api.isEndIndex.value,
        isLoading: api.isLoading.value,
        ...api.currentItem.value,
        close: () => api.close(),
        next: () => api.next(),
        prev: () => api.prev(),
      }
      const scopedSlots = slots.default?.(slot)
      const ourProps = {
        ref: galleryPanelRef,
        role: 'dialog',
        'aria-modal': api.isOpen.value,
        'aria-label': api.currentItem.value?.alt,
        tabindex: 0,
        onKeydown,
      }
      return h(props.tag, ourProps, scopedSlots)
    }
  },
})

export const GalleryItem = defineComponent({
  name: 'GalleryItem',

  props: {
    tag: {
      type: [String, Object],
      default: 'div',
    },

    src: {
      type: String,
      default: '',
    },

    alt: {
      type: String,
      default: '',
    },
  },

  setup(props, { slots }) {
    const itemRef = ref<GalleryItem['itemRef']>(null)
    const api = useGalleryContext('GalleryItem')

    const id = self.crypto.randomUUID()

    onMounted(() => api.registerImage({ id, src: props.src, alt: props.alt, itemRef: itemRef.value }))
    onUnmounted(() => api.unregisterImage(id))

    const onClick = (event: Event) => {
      api.open(id)
      event.preventDefault()
      event.stopPropagation()
    }

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        event.stopPropagation()
        api.open(id)
      }
    }

    return () => {
      const ourProps = {
        id: id,
        ref: itemRef,
        onClick,
        onKeydown,
      }
      return h(props.tag, ourProps, slots.default?.())
    }
  },
})

export const GalleryImage = defineComponent({
  name: 'GalleryImage',

  inheritAttrs: false,

  setup(_, { emit, slots, attrs }) {
    const api = useGalleryContext('GalleryImage')

    const onLoad = (event: Event) => {
      api.isLoading.value = false
      emit('load', event)
    }

    const onError = (event: Event) => {
      api.isLoading.value = false
      emit('error', event)
    }
    return () => [
      api.isLoading.value ? slots.default?.() : null,
      h('img', {
        src: api.currentItem.value?.src,
        alt: api.currentItem.value?.alt,
        onLoad,
        onError,
        ...attrs,
      }),
    ]
  },
})
