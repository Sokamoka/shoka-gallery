import {
  h,
  ref,
  toRefs,
  inject,
  provide,
  nextTick,
  computed,
  onMounted,
  mergeProps,
  onUnmounted,
  watchEffect,
  defineComponent,
  // Types
  Ref,
  ComputedRef,
  InjectionKey,
} from 'vue'
import { getId } from './utils/id'
import { render } from './utils/render'

interface GalleryItem {
  id: string
  src: string
  srcset?: string
  sizes?: string
  alt?: string
  title?: string
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
    as: {
      type: [String, Object],
      default: 'div',
    },

    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit, slots, attrs }) {
    const items = ref<GalleryItem[]>([])
    const isOpen = ref<boolean>(props.modelValue)
    const currentIndex = ref(0)
    const isLoading = ref(false)

    const currentItem = computed<GalleryItem>(() => items.value[currentIndex.value])

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
        emit('update:modelValue', true)
      },
      close() {
        isOpen.value = false
        emit('update:modelValue', false)
        nextTick(() => currentItem.value.itemRef?.focus())
      },
      next() {
        if (currentIndex.value === items.value.length - 1) return
        currentIndex.value = currentIndex.value + 1
      },
      prev() {
        if (currentIndex.value === 0) return
        currentIndex.value = currentIndex.value - 1
      },
    }

    provide(GalleryContext, api)

    return () => {
      const slot = {
        open: isOpen.value,
        items: items.value,
        isLoading: isLoading.value,
        currentIndex: currentIndex.value,
        isStartIndex: api.isStartIndex.value,
        isEndIndex: api.isEndIndex.value,
        currentItem: currentItem.value,
        close: () => api.close(),
        next: () => api.next(),
        prev: () => api.prev(),
      }
      const { as } = props;
      
      return render({
        ourProps: {},
        theirProps: { as },
        attrs,
        slot,
        slots,
        name: 'Gallery',
      })
    }
  },
})

export const GalleryPanel = defineComponent({
  name: 'GalleryPanel',

  props: {
    as: {
      type: [String, Object],
      default: 'div',
    },

    static: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { attrs, slots }) {
    const galleryPanelRef = ref<HTMLDivElement | null>(null)

    const api = useGalleryContext('GalleryPanel')

    watchEffect(
      () => {
        console.log('we:', galleryPanelRef.value)
        galleryPanelRef.value?.focus()
      },
      {
        flush: 'post',
      }
    )

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
        items: api.items.value,
        currentIndex: api.currentIndex.value,
        isStartIndex: api.isStartIndex.value,
        isEndIndex: api.isEndIndex.value,
        isLoading: api.isLoading.value,
        currentItem: api.currentItem.value,
        close: () => api.close(),
        next: () => api.next(),
        prev: () => api.prev(),
      }

      const theirProps = {
        as: props.as,
      }

      const ourProps = {
        ref: galleryPanelRef,
        role: 'dialog',
        'aria-modal': api.isOpen.value,
        'aria-labelby': `title-${api.currentItem.value?.id}`,
        tabindex: 0,
        onKeydown,
      }

      return render({
        visible: api.isOpen.value,
        staticRender: props.static,
        ourProps,
        theirProps,
        attrs,
        slot,
        slots,
        name: 'GalleryPanel',
      })
    }
  },
})

export const GalleryItem = defineComponent({
  name: 'GalleryItem',

  props: {
    as: {
      type: [String, Object],
      default: 'div',
    },

    src: {
      type: String,
      default: '',
    },

    srcset: {
      type: String,
      default: '',
    },

    sizes: {
      type: String,
      default: '',
    },

    alt: {
      type: String,
      default: '',
    },

    title: {
      type: String,
      default: '',
    },
  },

  setup(props, { attrs, slots }) {
    const { src, srcset, sizes, alt, title } = toRefs(props)
    const itemRef = ref<GalleryItem['itemRef']>(null)
    const api = useGalleryContext('GalleryItem')

    const id = getId()

    const isSelected = computed(() => api.currentItem.value?.id === id)

    onMounted(() =>
      api.registerImage({
        id,
        src: src.value,
        srcset: srcset.value,
        sizes: sizes.value,
        alt: alt.value,
        title: title.value,
        itemRef: itemRef.value,
      })
    )
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
      const slot = {
        selected: isSelected.value,
      }

      const theirProps = {
        as: props.as,
      }

      const ourProps = {
        id: id,
        ref: itemRef,
        tabindex: 0,
        onClick,
        onKeydown,
      }
      return render({ ourProps, attrs, theirProps, slot, slots, name: 'GalleryItem' })
    }
  },
})

const GalleryImg = defineComponent({
  name: 'GalleryImg',

  setup(_, { emit, attrs }) {
    emit('loading', true)

    const onLoad = (event: Event) => {
      emit('loading', false)
    }

    const onError = (event: Event) => {
      emit('loading', false)
    }

    return () => h('img', mergeProps({ onLoad, onError }, attrs))
  },
})

export const GalleryImage = defineComponent({
  name: 'GalleryImage',

  inheritAttrs: false,

  setup(_, { slots, attrs }) {
    const api = useGalleryContext('GalleryImage')

    const onLoading = (value: boolean) => {
      api.isLoading.value = value
    }

    return () => [
      api.isLoading.value ? slots.default?.() : null,
      h(GalleryImg, {
        ...attrs,
        src: api.currentItem.value?.src,
        srcset: api.currentItem.value?.srcset,
        sizes: api.currentItem.value?.sizes,
        alt: api.currentItem.value?.alt,
        title: api.currentItem.value?.title,
        key: api.currentItem.value?.id,
        height: api.isLoading.value ? 0 : null,
        width: api.isLoading.value ? 0 : null,
        onLoading,
      }),
    ]
  },
})

export const GalleryTitle = defineComponent({
  name: 'GalleryTitle',

  props: {
    tag: {
      type: [String, Object],
      default: 'h2',
    },
  },

  setup(props) {
    const api = useGalleryContext('GalleryTitle')

    return () =>
      api.currentItem.value?.title
        ? h(
            props.tag,
            { 'aria-live': 'assertive', id: `title-${api.currentItem.value?.id}` },
            api.currentItem.value?.title
          )
        : null
  },
})
