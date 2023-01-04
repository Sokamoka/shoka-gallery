import { defineComponent, nextTick } from 'vue'
import { describe, it, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Gallery, GalleryItem, GalleryPanel, GalleryTitle } from '../src'

let startId = 0

vi.mock('../src/utils/id.ts', () => ({
  getId: vi.fn(() => startId++),
}))

describe('Gallery', () => {
  it('Renders the default tag types', async () => {
    const testComponent = defineComponent({
      components: {
        Gallery,
        GalleryItem,
        GalleryPanel,
        GalleryTitle,
      },
      template: `
      <Gallery>
        <GalleryPanel>
          <GalleryTitle />
        </GalleryPanel>
        <GalleryItem src="img1" title="title-0">A</GalleryItem>
        <GalleryItem src="img2" title="title-1">B</GalleryItem>
      </Gallery>
      `,
    })
    const wrapper = mount(testComponent)
    await nextTick()

    console.log(wrapper.html())

    const GalleryPanelComp = wrapper.getComponent({ name: 'GalleryPanel' })
    expect(GalleryPanelComp.attributes('role')).toBe('dialog')
    expect(GalleryPanelComp.attributes('tabindex')).toBe('0')
    expect(GalleryPanelComp.attributes('aria-modal')).toBe('false')
  })
})
