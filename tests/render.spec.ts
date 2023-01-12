import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, isVNode, nextTick } from 'vue'
import { render } from '../src/utils/render'

let Dummy = defineComponent({
  props: {
    as: { type: [Object, String], default: 'div' },
  },
  setup(props, { attrs, slots }) {
    return () => render({ theirProps: props, ourProps: {}, slots, attrs, slot: {}, name: 'Dummy' })
  },
})

describe('Render validation', () => {
  it('Should render Dummy as div', () => {
    const testComponent = defineComponent({
      components: {
        Dummy,
      },
      template: `
      <Dummy>
        <div>Hello world</div>
      </Dummy>
      `,
    })
    const wrapper = mount(testComponent)
    expect(wrapper.html()).toBe('<div>\n' + '  <div>Hello world</div>\n' + '</div>')
  })

  it('Should render a first child', () => {
    const testComponent = defineComponent({
      components: {
        Dummy,
      },
      template: `
      <Dummy as="template">
        <div>Hello world</div>
      </Dummy>
      `,
    })
    const wrapper = mount(testComponent)
    expect(wrapper.html()).toBe('<div>Hello world</div>')
  })

  it('Should render all children', () => {
    const testComponent = defineComponent({
      components: {
        Dummy,
      },
      template: `
      <Dummy as="template">
        <div>Hello world</div>
        <div>Hello world</div>
      </Dummy>
      `,
    })
    const wrapper = mount(testComponent)
    expect(wrapper.html()).toBe('<div>Hello world</div>\n' + '<div>Hello world</div>')
  })

  it('Should error when using an as="template" with additional props on text content', () => {
    const testComponent = defineComponent({
      components: {
        Dummy,
      },
      template: `
      <Dummy as="template" class="abc">Content</Dummy>
      `,
      errorCaptured(err) {
        expect(err as Error).toBeTruthy()

        return false
      },
    })
    mount(testComponent)
  })

  it('Should error when using an as="template" with additional props on empty content', () => {
    const testComponent = defineComponent({
      components: {
        Dummy,
      },
      template: `
      <Dummy as="template" class="abc"></Dummy>
      `,
      errorCaptured(err) {
        expect(err as Error).toBeTruthy()

        return false
      },
    })
    mount(testComponent)
  })

  it('Should error when using an as="template" with additional props on multiple children', () => {
    const testComponent = defineComponent({
      components: {
        Dummy,
      },
      template: `
      <Dummy as="template" class="abc" data-test="def">
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </Dummy>
      `,
      errorCaptured(err) {
        expect(err as Error).toBeTruthy()

        return false
      },
    })
    mount(testComponent)
  })

  it('Should forward the props to the first child', () => {
    const testComponent = defineComponent({
      components: {
        Dummy,
      },
      template: `
      <Dummy as="template" class="abc">
        <div id="result">Contents</div>
      </Dummy>
      `,
    })
    const wrapper = mount(testComponent)

    expect(wrapper.get('#result').attributes('class')).toBe('abc')
  })

  it('Should forward the props via Functional Components', () => {
    const testComponent = defineComponent({
      components: {
        Dummy,
        PassThrough(props, context) {
          props.as = props.as ?? 'template'
          return render({
            theirProps: props,
            ourProps: {},
            attrs: context.attrs,
            slots: context.slots,
            slot: {},
            name: 'PassThrough',
          })
        },
      },
      template: `
      <Dummy as="template" class="abc" data-test="123">
        <PassThrough>
          <div id="result">Contents</div>
        </PassThrough>
      </Dummy>
      `,
    })
    const wrapper = mount(testComponent)

    expect(wrapper.get('#result').attributes('class')).toBe('abc')
    expect(wrapper.get('#result').attributes('data-test')).toBe('123')
  })

  it('Should allow use of <slot> as children', () => {
    const testComponent = defineComponent({
      template: `
      <ExampleOuter>
        <div id="result">Some Content</div>
      </ExampleOuter>
    `,

      components: {
        ExampleOuter: defineComponent({
          template: `
          <ExampleInner>
            <slot />
          </ExampleInner>
        `,

          components: {
            ExampleInner: defineComponent({
              components: { Dummy },

              template: `
              <Dummy as="template" class="foo" data-test="123">
                <Dummy as="template" class="bar" data-test="345">
                  <slot />
                </Dummy>
              </Dummy>
            `,
            }),
          },
        }),
      },
    })
    const wrapper = mount(testComponent)

    expect(wrapper.get('#result').attributes('class')).toContain('bar')
    expect(wrapper.get('#result').attributes('class')).toContain('foo')
    expect(wrapper.get('#result').attributes('data-test')).toBe('123')
  })

  it('Should render static element if the visible is false', () => {
    const testComponent = defineComponent({
      components: {
        Dummy,

        ExampleChild: defineComponent({
          name: 'ExampleChild',
          setup(props, { attrs, slots }) {
            return () =>
              render({
                visible: false,
                staticRender: true,
                theirProps: props,
                ourProps: { as: 'p' },
                attrs: attrs,
                slots: slots,
                slot: {},
                name: 'ExampleChild',
              })
          },
        }),
      },
      template: `
      <Dummy>
        <ExampleChild>Hello world</ExampleChild>
      </Dummy>
      `,
    })
    const wrapper = mount(testComponent)
    expect(wrapper.html()).toBe('<div>\n' + '  <p>Hello world</p>\n' + '</div>')
  })

  it('Should render empty element if the visible is false', () => {
    const testComponent = defineComponent({
      components: {
        Dummy,

        ExampleChild: defineComponent({
          name: 'ExampleChild',
          setup(props, { attrs, slots }) {
            return () =>
              render({
                visible: false,
                theirProps: props,
                ourProps: { as: 'p' },
                attrs: attrs,
                slots: slots,
                slot: {},
                name: 'ExampleChild',
              })
          },
        }),
      },
      template: `
      <Dummy>
        <ExampleChild id="result">Hello world</ExampleChild>
      </Dummy>
      `,
    })
    const wrapper = mount(testComponent)
    expect(() => wrapper.get('#result')).toThrowError()
  })
})
