import { cloneVNode, h, mergeProps, Slots } from 'vue'

export function render({
  visible = true,
  staticRender = false,
  ourProps,
  theirProps,
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
    if (Object.keys(incomingProps).length > 0) {
      let [firstChild, ...other] = children ?? []

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
