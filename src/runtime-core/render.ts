import {createComponentInstance, setupComponent} from "./component";
// @ts-ignore
import {isObject} from "../shared/index";
import {ShapeFlags} from "../shared/ShapeFlags";
import {Fragment, Text} from "./vNode";

/**
 * 渲染函数
 * @param vNode 虚拟节点
 * @param container 容器
 */
export function render(vNode: any, container: any) {
  // 调用patch把虚拟节点渲染为真实DOM挂载在容器内
  patch(vNode, container, null)
}

/**
 * patch方法,处理各种节点
 * @param vNode
 * @param container
 * @param parentComponent
 */
function patch(vNode: any, container: any, parentComponent: any) {
  const {shapeFlag, type} = vNode
  switch (type) {
    case Fragment:
      processFragment(vNode, container, parentComponent)
      break
    case Text:
      processText(vNode, container)
      break
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        // 处理element
        processElement(vNode, container, parentComponent)
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        // 处理组件
        processComponent(vNode, container, parentComponent)
      }
      break
  }
}

/**
 * 处理 插槽 类型节点
 * @param vNode
 * @param container
 * @param parentComponent
 */
function processFragment(vNode: any, container: any, parentComponent: any) {
  mountChildren(vNode, container, parentComponent)
}

/**
 * 处理 文本 类型节点
 * @param vNode
 * @param container
 */
function processText(vNode: any, container: any) {
  const {children} = vNode
  const textNode = vNode.el = document.createTextNode(children)
  container.append(textNode)
}

/**
 * 处理 element 类型节点
 * @param vNode
 * @param container
 * @param parentComponent
 */
function processElement(vNode: any, container: any, parentComponent: any) {
  mountElement(vNode, container, parentComponent)
}

/**
 * 挂载 element 类型节点
 * @param vNode
 * @param container
 * @param parentComponent
 */
function mountElement(vNode: any, container: any, parentComponent: any) {
  const {props, children, type, shapeFlag} = vNode
  const el = vNode.el = document.createElement(type)

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // 判断是否有多个children 从而进行递归
    mountChildren(vNode, el, parentComponent)
  }

  // 是否为event 规律为on开头后面驼峰
  const isEvent = (event: string) => /^on[A-Z]/.test(event)

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

/**
 * 处理子节点
 * @param vNode
 * @param container
 * @param parentComponent
 */
function mountChildren(vNode: any, container: any, parentComponent: any) {
  vNode.children.forEach((item: any) => patch(item, container, parentComponent))
}

/**
 * 处理 组件 类型节点
 * @param vNode
 * @param container
 * @param parentComponent
 */
function processComponent(vNode: any, container: any, parentComponent: any) {
  mountComponent(vNode, container, parentComponent)
}

/**
 * 挂载 组件 类型节点
 * @param initialVNode
 * @param container
 * @param parentComponent
 */
function mountComponent(initialVNode: any, container: any, parentComponent: any) {
  const instance = createComponentInstance(initialVNode, parentComponent)
  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

/**
 * patch
 * @param instance
 * @param vNode
 * @param container
 */
function setupRenderEffect(instance: any, vNode: any, container: any) {
  const subTree = instance.render.call(instance.proxy)
  patch(subTree, container, instance)
  vNode.el = subTree.el
}
