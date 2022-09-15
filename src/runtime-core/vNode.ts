import {ShapeFlags} from "../shared/ShapeFlags";

export const Fragment = Symbol('Fragment')
export const Text = Symbol('Text')

/**
 * 创建一个虚拟节点
 * @param type 节点
 * @param props 节点的props
 * @param children 子节点
 */
export function createVNode(type: any, props?: any, children?: any) {
  const vNode = {
    type,
    props,
    children,
    el: null,
    shapeFlag: getShapeFlag(type)
  }

  if (typeof children === 'string') {
    vNode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vNode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  }

  // 组件+children
  if (vNode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    if (typeof children === 'object') {
      vNode.shapeFlag |= ShapeFlags.SLOT_CHILDREN
    }
  }

  return vNode
}

function getShapeFlag(type: any) {
  return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}


export function createTextVNode(text: string) {
  return createVNode(Text, {}, text)
}
