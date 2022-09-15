import {createVNode, Fragment} from "../vNode";

export function renderSlots(slots: any, name: string, props: object = {}) {
  const slot = slots[name]
  if (typeof slot === 'function') return createVNode(Fragment, {}, slot(props))
}
