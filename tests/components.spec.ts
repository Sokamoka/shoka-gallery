import { defineComponent, nextTick, ref } from 'vue'
import { describe, it, vi, expect, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { Gallery, GalleryItem, GalleryPanel, GalleryImage, GalleryCaption } from '../src'

let startId = 0

vi.mock('../src/utils/id.ts', () => ({
  getId: vi.fn(() => startId++),
}))

function resolveContainer(): HTMLElement {
  let div = document.createElement('div')
  let baseElement = document.body
  let container = baseElement.appendChild(div)

  let attachTo = document.createElement('div')
  container.appendChild(attachTo)
  return attachTo
}

describe('Safeguards', () => {
  it.each([
    ['GalleryItem', GalleryItem],
    ['GalleryPanel', GalleryPanel],
    ['GalleryImage', GalleryImage],
    ['GalleryCaption', GalleryCaption],
  ])('should error when we are using a <%s /> without a parent <Gallery />', (name, Component) => {
    expect(() =>
      mount(Component as any, {
        attachTo: resolveContainer(),
      })
    ).toThrowError(`<${name} /> is missing a parent <Gallery /> component.`)
  })
})

describe('Rendering', () => {
  it('Should render all component', async () => {
    const testComponent = defineComponent({
      components: {
        Gallery,
        GalleryItem,
        GalleryPanel,
        GalleryImage,
        GalleryCaption,
      },
      template: `
      <Gallery>
        <GalleryPanel>
          <GalleryImage />
          <GalleryCaption />
        </GalleryPanel>
        <GalleryItem src="img1" title="title-0">A</GalleryItem>
        <GalleryItem src="img2" title="title-1">B</GalleryItem>
      </Gallery>
      `,
    })
    const wrapper = mount(testComponent)

    const GalleryPanelComp = wrapper.getComponent({ name: 'GalleryPanel' })
    expect(GalleryPanelComp.isVisible()).toBe(false)

    const triggerComponent = wrapper.findComponent({ name: 'GalleryItem' })
    await triggerComponent.trigger('click')

    expect(GalleryPanelComp.isVisible()).toBe(true)
    expect(wrapper.find('figcaption').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('Should show GalleryPanel immediate', async () => {
    const testComponent = defineComponent({
      components: {
        Gallery,
        GalleryItem,
        GalleryPanel,
        GalleryCaption,
      },
      setup: () => ({ value: ref(true) }),
      template: `
      <Gallery v-model="value">
        <GalleryPanel></GalleryPanel>
        <GalleryItem src="img1" title="title-0">A</GalleryItem>
        <GalleryItem src="img2" title="title-1">B</GalleryItem>
      </Gallery>
      `,
    })
    const wrapper = mount(testComponent)
    const GalleryPanelComp = wrapper.getComponent({ name: 'GalleryPanel' })
    expect(GalleryPanelComp.isVisible()).toBe(true)
  })

  it('Should show GalleryPanel if static render and manage by slot prop', async () => {
    const testComponent = defineComponent({
      components: {
        Gallery,
        GalleryItem,
        GalleryPanel,
        GalleryCaption,
      },
      setup: () => ({ value: ref(true) }),
      template: `
      <Gallery v-model="value" v-slot:default="{ open }">
        <GalleryPanel v-if="open" static></GalleryPanel>
        <GalleryItem src="img1" title="title-0">A</GalleryItem>
        <GalleryItem src="img2" title="title-1">B</GalleryItem>
      </Gallery>
      `,
    })
    const wrapper = mount(testComponent)
    const GalleryPanelComp = wrapper.getComponent({ name: 'GalleryPanel' })
    expect(GalleryPanelComp.isVisible()).toBe(true)
  })
})

describe('GalleryPanel', () => {
  beforeEach(() => {
    startId = 0
  })
  it('Should show GalleryPanel attributes', async () => {
    const testComponent = defineComponent({
      components: {
        Gallery,
        GalleryItem,
        GalleryPanel,
        GalleryCaption,
      },
      setup: () => ({ value: ref(true) }),
      template: `
      <Gallery v-model="value">
        <GalleryPanel>
          <GalleryCaption />
        </GalleryPanel>
        <GalleryItem src="img1" title="title-0">A</GalleryItem>
        <GalleryItem src="img2" title="title-1">B</GalleryItem>
      </Gallery>
      `,
    })
    const wrapper = mount(testComponent)
    await nextTick()
    const GalleryPanelComp = wrapper.getComponent({ name: 'GalleryPanel' })
    expect(GalleryPanelComp.isVisible()).toBe(true)

    expect(GalleryPanelComp.attributes('role')).toBe('dialog')
    expect(GalleryPanelComp.attributes('tabindex')).toBe('0')
    expect(GalleryPanelComp.attributes('aria-modal')).toBe('true')
    expect(GalleryPanelComp.attributes('aria-labelby')).toBe('title-0')
  })
})

describe('GalleryItem', () => {
  beforeEach(async () => {
    startId = 0
  })

  it('Should id on Gallery item', async () => {
    const testComponent = defineComponent({
      components: {
        Gallery,
        GalleryItem,
      },
      setup: () => ({ value: ref(true) }),
      template: `
      <Gallery v-model="value">
        <GalleryItem src="img1" title="title-0">A</GalleryItem>
      </Gallery>
      `,
    })
    const wrapper = mount(testComponent)
    expect(wrapper.getComponent({ name: 'GalleryItem' }).attributes('id')).toBe('gallery-item-0')
    expect(wrapper.getComponent({ name: 'GalleryItem' }).attributes('tabindex')).toBe('0')
  })
})

describe('GalleryImage', () => {
  beforeEach(() => {
    startId = 0
  })

  it('Should render atrributes', async () => {
    const testComponent = defineComponent({
      components: {
        Gallery,
        GalleryItem,
        GalleryPanel,
        GalleryImage,
        GalleryCaption,
      },
      setup: () => ({ value: ref(true) }),
      template: `
      <Gallery v-model="value">
        <GalleryPanel>
          <GalleryImage />
          <GalleryCaption />
        </GalleryPanel>
        <GalleryItem src="img1" title="title-0">A</GalleryItem>
        <GalleryItem src="img2" title="title-1">B</GalleryItem>
      </Gallery>
      `,
    })
    const wrapper = mount(testComponent)

    const GalleryPanelComp = wrapper.getComponent({ name: 'GalleryPanel' })
    expect(GalleryPanelComp.isVisible()).toBe(true)
    await nextTick()

    const GalleryImageElement = wrapper.find('img')
    expect(GalleryImageElement.exists()).toBe(true)
    expect(GalleryImageElement.attributes('src')).toBe('img1')
    expect(GalleryImageElement.attributes('title')).toBe('title-0')
    expect(GalleryImageElement.attributes('width')).toBe('0')
    expect(GalleryImageElement.attributes('height')).toBe('0')
  })
})

describe('GalleryCaption', () => {
  beforeEach(() => {
    startId = 0
  })
  it('Should render atrributes', async () => {
    const testComponent = defineComponent({
      components: {
        Gallery,
        GalleryItem,
        GalleryPanel,
        GalleryImage,
        GalleryCaption,
      },
      setup: () => ({ value: ref(true) }),
      template: `
      <Gallery v-model="value">
        <GalleryPanel>
          <GalleryImage />
          <GalleryCaption />
        </GalleryPanel>
        <GalleryItem src="img1" title="title-0">A</GalleryItem>
        <GalleryItem src="img2" title="title-1">B</GalleryItem>
      </Gallery>
      `,
    })
    const wrapper = mount(testComponent)

    const GalleryPanelComp = wrapper.getComponent({ name: 'GalleryPanel' })
    expect(GalleryPanelComp.isVisible()).toBe(true)
    await nextTick()

    const GalleryCaptionElement = wrapper.find('figcaption')
    expect(GalleryCaptionElement.exists()).toBe(true)
    expect(GalleryCaptionElement.attributes('id')).toBe('title-0')
    expect(GalleryCaptionElement.attributes('aria-live')).toBe('assertive')
    expect(GalleryCaptionElement.text()).toBe('title-0')
  })
})

describe('ButtonInteraction', () => {
  // Close, Next, Previous
  it('Should close GalleryPanel by slot prop close function', async () => {
    const testComponent = defineComponent({
      components: {
        Gallery,
        GalleryItem,
        GalleryPanel,
        GalleryCaption,
      },
      setup: () => ({ value: ref(true) }),
      template: `
      <Gallery v-model="value" v-slot:default="{ close }">
        <GalleryPanel id="gallaery-panel">
          <button @click="close()"></button>
        </GalleryPanel>
        <GalleryItem src="img1" title="title-0">A</GalleryItem>
        <GalleryItem src="img2" title="title-1">B</GalleryItem>
      </Gallery>
      `,
    })
    const wrapper = mount(testComponent)
    expect(wrapper.find('#gallaery-panel').exists()).toBe(true)

    const button = wrapper.find('button')
    expect(button.isVisible()).toBe(true)

    await button.trigger('click')
    expect(wrapper.find('#gallaery-panel').exists()).toBe(false)
  })

  it('Should close GalleryPanel if static render and manage by slot prop close function', async () => {
    const testComponent = defineComponent({
      components: {
        Gallery,
        GalleryItem,
        GalleryPanel,
        GalleryCaption,
      },
      setup: () => ({ value: ref(true) }),
      template: `
      <Gallery v-model="value" v-slot:default="{ open, close }">
        <GalleryPanel v-if="open" id="gallaery-panel" static>
          <button @click="close()"></button>
        </GalleryPanel>
        <GalleryItem src="img1" title="title-0">A</GalleryItem>
        <GalleryItem src="img2" title="title-1">B</GalleryItem>
      </Gallery>
      `,
    })
    const wrapper = mount(testComponent)
    expect(wrapper.find('#gallaery-panel').exists()).toBe(true)

    const button = wrapper.find('button')
    expect(button.isVisible()).toBe(true)

    await button.trigger('click')
    expect(wrapper.find('#gallaery-panel').exists()).toBe(false)
  })
})

describe('KeyboardInteraction', () => {
  beforeEach(() => {
    startId = 0
  })
  describe('GalleryIten', () => {
    it('Should show GalleryPanel when press enter', async () => {
      const testComponent = defineComponent({
        components: {
          Gallery,
          GalleryItem,
          GalleryPanel,
          GalleryCaption,
        },
        template: `
        <Gallery>
          <GalleryPanel></GalleryPanel>
          <GalleryItem src="img1" title="title-0">A</GalleryItem>
        </Gallery>
        `,
      })
      const wrapper = mount(testComponent)
      expect(wrapper.getComponent({ name: 'GalleryPanel' }).isVisible()).toBe(false)
      await wrapper.find('#gallery-item-0').trigger('keydown', { key: 'Enter' })

      expect(wrapper.getComponent({ name: 'GalleryPanel' }).isVisible()).toBe(true)
    })
  })

  it('Should close GalleryPanel by press Esc', async () => {
    const testComponent = defineComponent({
      components: {
        Gallery,
        GalleryItem,
        GalleryPanel,
        GalleryCaption,
      },
      setup: () => ({ value: ref(true) }),
      template: `
      <Gallery v-model="value" v-slot:default="{ close }">
        <GalleryPanel id="gallaery-panel">
          <button @click="close()"></button>
        </GalleryPanel>
        <GalleryItem src="img1" title="title-0">A</GalleryItem>
        <GalleryItem src="img2" title="title-1">B</GalleryItem>
      </Gallery>
      `,
    })
    const wrapper = mount(testComponent)
    const GalleryPanelComp = wrapper.getComponent({ name: 'GalleryPanel' })
    expect(wrapper.find('#gallaery-panel').exists()).toBe(true)

    await GalleryPanelComp.trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('#gallaery-panel').exists()).toBe(false)
  })

  it('Should go the next Item if press arrow up/right, and previous down/left', async () => {
    const testComponent = defineComponent({
      components: {
        Gallery,
        GalleryItem,
        GalleryPanel,
        GalleryCaption,
      },
      setup: () => ({ value: ref(true) }),
      template: `
      <Gallery v-model="value" v-slot:default="{ close }">
        <GalleryPanel id="gallaery-panel" v-slot:default="{ currentItem, next }">
          <div id="current">{{ currentItem?.src }}</div>
          <button @click="next()"></button>
        </GalleryPanel>
        <GalleryItem src="img1" title="title-0">A</GalleryItem>
        <GalleryItem src="img2" title="title-1">B</GalleryItem>
        <GalleryItem src="img3" title="title-2">B</GalleryItem>
      </Gallery>
      `,
    })
    const wrapper = mount(testComponent)
    const GalleryPanelComp = wrapper.getComponent({ name: 'GalleryPanel' })
    expect(wrapper.find('#gallaery-panel').exists()).toBe(true)

    await GalleryPanelComp.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.find('#current').text()).toBe('img2')

    await GalleryPanelComp.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.find('#current').text()).toBe('img3')

    await GalleryPanelComp.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.find('#current').text()).toBe('img2')

    await GalleryPanelComp.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.find('#current').text()).toBe('img1')
  })
})
