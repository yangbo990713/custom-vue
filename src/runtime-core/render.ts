import {createComponentInstance, setupComponent} from "./component";
// @ts-ignore
import {isObject} from "../shared/index.ts";

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
  if (typeof vNode.type === 'string') {
    // 处理element
    processElement(vNode, container)
  } else if (isObject(vNode.type)) {
    // 处理组件
    processComponent(vNode, container)
  }
}

function processElement(vNode: any, container: any) {
  mountElement(vNode, container)
}

function mountElement(vNode: any, container: any) {
  const {props, children, type} = vNode
  const el = document.createElement(type)
  if (typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
    // 判断是否有多个children 从而进行递归
    mountChildren(vNode, el)
  }

  for (const propsKey in props) {
    el.setAttribute(propsKey, props[propsKey])
  }
  container.append(el)
}

function mountChildren(vNode: any, container: any) {
  vNode.children.forEach((item: any) => patch(item, container))
}

function processComponent(vNode: any, container: any) {
  mountComponent(vNode, container)
}

function mountComponent(vNode: any, container: any) {
  const instance = createComponentInstance(vNode)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container: any) {
  const subTree = instance.render()
  patch(subTree, container)
}
