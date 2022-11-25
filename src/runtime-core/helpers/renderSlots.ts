import {createVNode, Fragment} from "../vNode";

/**
 * 渲染插槽
 * @param slots
 * @param name
 * @param props
 */
export function renderSlots(slots: any, name: string, props: object = {}) {
  const slot = slots[name]
  if (typeof slot === 'function') return createVNode(Fragment, {}, slot(props))
}
