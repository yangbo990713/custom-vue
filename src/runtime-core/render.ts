import {createComponentInstance, setupComponent} from "./component";

/**
 * 渲染函数
 * @param vNode
 * @param container
 */
export function render(vNode: any, container: any) {
  // 调用patch把虚拟节点渲染为真实DOM挂载在容器内
  patch(vNode, container)
}


function patch(vNode: any, container: any) {
  // todo 处理 element
  processComponent(vNode,container)
}

function processComponent(vNode: any, container: any) {
  mountComponent(vNode,container)
}

function mountComponent(vNode: any,container: any) {
  const instance = createComponentInstance(vNode)
  setupComponent(instance)
  setupRenderEffect(instance,container)
}

function setupRenderEffect(instance: any,container: any) {
  const subTree = instance.render()
  patch(subTree,container)
}
