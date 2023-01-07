import { defineComponent, nextTick, ref } from 'vue'
import { describe, it, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Gallery, GalleryItem, GalleryPanel, GalleryCaption } from '../src'

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
    ['GalleryCaption', GalleryCaption],
  ])('should error when we are using a <%s /> without a parent <Gallery />', (name, Component) => {
    expect(() =>
      mount(Component as any, {
        attachTo: resolveContainer(),
      })
    ).toThrowError(`<${name} /> is missing a parent <Gallery /> component.`)
  })
})

describe('Gallery', () => {
  it('Rendering GalleryPanel', async () => {
    const testComponent = defineComponent({
      components: {
        Gallery,
        GalleryItem,
        GalleryPanel,
        GalleryCaption,
      },
      template: `
      <Gallery>
        <GalleryPanel>
          <GalleryCaption />
        </GalleryPanel>
        <GalleryItem src="img1" title="title-0">A</GalleryItem>
        <GalleryItem src="img2" title="title-1">B</GalleryItem>
      </Gallery>
      `,
    })
    const wrapper = mount(testComponent)
    // await nextTick()

    const GalleryPanelComp = wrapper.getComponent({ name: 'GalleryPanel' })
    expect(GalleryPanelComp.isVisible()).toBe(false)

    const triggerComponent = wrapper.findComponent({ name: 'GalleryItem' })
    await triggerComponent.trigger('click')

    // console.log(wrapper.html())
    expect(GalleryPanelComp.isVisible()).toBe(true)
    expect(GalleryPanelComp.attributes('role')).toBe('dialog')
    expect(GalleryPanelComp.attributes('tabindex')).toBe('0')
    expect(GalleryPanelComp.attributes('aria-modal')).toBe('true')
    expect(GalleryPanelComp.attributes('aria-labelby')).toBe('title-0')

    expect(wrapper.find('figcaption').attributes('id')).toBe('title-0')
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
    // console.log(wrapper.html())
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
    console.log(wrapper.html())
    const GalleryPanelComp = wrapper.getComponent({ name: 'GalleryPanel' })
    expect(GalleryPanelComp.isVisible()).toBe(true)
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
    // console.log(wrapper.html())
    expect(wrapper.find('#gallaery-panel').exists()).toBe(false)
  })
})

// describe('GalleryItem', () => {
  
// })
