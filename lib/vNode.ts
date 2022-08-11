/**
 * 创建一个虚拟节点
 * @param type 节点
 * @param props 节点的props
 * @param children 子节点
 */
export function createVNode(type: any, props?: any, children?: any) {
  return{
    type,
    props,
    children
  }
}
