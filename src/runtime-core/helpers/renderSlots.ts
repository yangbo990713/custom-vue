import {createVNode} from "../vNode";

export function renderSlots(slots: any, name: string, props: object = {}) {
  const slot = slots[name]
  if (typeof slot === 'function') return createVNode('div', {}, slot(props))
}
