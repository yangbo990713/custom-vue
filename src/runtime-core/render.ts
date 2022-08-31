import {createComponentInstance, setupComponent} from "./component";
// @ts-ignore
import {isObject} from "../shared/index";
import {ShapeFlags} from "../shared/ShapeFlags";

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
  const {shapeFlag} = vNode
  if (shapeFlag & ShapeFlags.ELEMENT) {
    // 处理element
    processElement(vNode, container)
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    // 处理组件
    processComponent(vNode, container)
  }
}

function processElement(vNode: any, container: any) {
  mountElement(vNode, container)
}

function mountElement(vNode: any, container: any) {
  const {props, children, type, shapeFlag} = vNode
  const el = vNode.el = document.createElement(type)

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // 判断是否有多个children 从而进行递归
    mountChildren(vNode, el)
  }

  const isEvent = (event:string)=> /^on[A-Z]/.test(event)

  for (const propsKey in props) {
    if (isEvent(propsKey)) {
      const eventName = propsKey.slice(2).toLowerCase()
      el.addEventListener(eventName, props[propsKey])
    } else {
      el.setAttribute(propsKey, props[propsKey])
    }
  }
  container.append(el)
}

function mountChildren(vNode: any, container: any) {
  vNode.children.forEach((item: any) => patch(item, container))
}

function processComponent(vNode: any, container: any) {
  mountComponent(vNode, container)
}

function mountComponent(initialVNode: any, container: any) {
  const instance = createComponentInstance(initialVNode)
  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance: any, vNode: any, container: any) {
  const subTree = instance.render.call(instance.proxy)
  patch(subTree, container)
  vNode.el = subTree.el
}
