import {createVNode} from "./vNode";

export function h(type: any, props?: any, children?: any) {
  return createVNode(type, props, children)
}
