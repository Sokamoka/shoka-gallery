import { cloneVNode, Fragment, h, mergeProps, Slots, VNode } from 'vue'

export function render({
  visible = true,
  staticRender = false,
  ourProps,
  theirProps = {},
  ...main
}: {
  ourProps: Record<string, any>
  theirProps: Record<string, any>
  slot: Record<string, any>
  attrs: Record<string, any>
  slots: Slots
  name: string
} & {
  staticRender?: boolean
  visible?: boolean
}) {
  let props = mergeProps(theirProps, ourProps)
  let mainWithProps = Object.assign(main, { props })

  if (staticRender) return _render(mainWithProps)
  if (!visible) return null

  return _render(mainWithProps)
}

function _render({
  props,
  slot,
  attrs,
  slots,
  name,
}: {
  props: Record<string, any>
  slot: Record<string, any>
  attrs: Record<string, any>
  slots: Slots
  name: string
}) {
  let { as, ...incomingProps } = props

  let children = slots.default?.(slot)

  if (as === 'template') {
    children = flattenFragments(children ?? [])

    if (Object.keys(incomingProps).length > 0 || Object.keys(attrs).length > 0) {
      let [firstChild, ...other] = children ?? []

      if (!isValidElement(firstChild) || other.length > 0) {
        throw new Error(
          [
            'Passing props on "template"!',
            '',
            `The current component <${name} /> is rendering a "template".`,
            `However we need to passthrough the following props:`,
            Object.keys(incomingProps)
              .concat(Object.keys(attrs))
              .map((name) => name.trim())
              .filter((current, idx, all) => all.indexOf(current) === idx)
              .sort((a, z) => a.localeCompare(z))
              .map((line) => `  - ${line}`)
              .join('\n'),
            '',
            'You can apply a few solutions:',
            [
              'Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',
              'Render a single element as the child so that we can forward the props onto that element.',
            ]
              .map((line) => `  - ${line}`)
              .join('\n'),
          ].join('\n')
        )
      }

      let mergedProps = mergeProps(firstChild.props ?? {}, incomingProps)
      let cloned = cloneVNode(firstChild, mergedProps)
      return cloned
    }
    if (Array.isArray(children) && children.length === 1) {
      return children[0]
    }

    return children
  }
  return h(as, incomingProps, {
    default: () => children,
  })
}

function flattenFragments(children: VNode[]): VNode[] {
  return children.flatMap((child) => {
    if (child.type === Fragment) {
      return flattenFragments(child.children as VNode[])
    }

    return [child]
  })
}

function isValidElement(input: any): boolean {
  if (input == null) return false // No children
  if (typeof input.type === 'string') return true // 'div', 'span', ...
  if (typeof input.type === 'object') return true // Other components
  if (typeof input.type === 'function') return true // Built-ins like Transition
  return false // Comments, strings, ...
}
