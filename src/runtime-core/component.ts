import {publicInstanceProxyHandlers} from "./componentPublicInstance";
import {initProps} from "./componentProps";
import {shallowReadonly} from "../reactive/readonly";
import {emit} from "./componentEmit";
import {initSlots} from "./componentSlots";

/**
 * 创建组件实例
 * @param vNode 虚拟节点
 * @param parent 父组件
 */
export function createComponentInstance(vNode: any, parent: any) {
  console.log('Galaxy', parent)
  const component = {
    vNode,
    type: vNode.type,
    setupState: {},
    props: {},
    slots: {},
    provides: parent ? parent.provides : {},
    parent,
    emit: () => {
    }
  }
  component.emit = emit.bind(null, component) as any
  return component
}

/**
 * 安装组件
 * @param instance
 */
export function setupComponent(instance: any) {
  // 初始化props
  initProps(instance, instance.vNode.props)
  // 初始化插槽
  initSlots(instance, instance.vNode.children)

  setupStatefulComponent(instance)
}

/**
 * 处理组件setup方法
 * @param instance
 */
function setupStatefulComponent(instance: any) {
  const Component = instance.type
  const {setup} = Component

  instance.proxy = new Proxy({_: instance}, publicInstanceProxyHandlers)

  if (typeof setup === 'function') {
    setCurrentInstance(instance)
    // setup可以返回对象(响应式数据)或函数(渲染函数)
    // setup时传递props,且props是“浅只读”的
    const setupResult = setup(shallowReadonly(instance.props), {emit: instance.emit})
    setCurrentInstance(null)

    handleSetupResult(instance, setupResult)
  }
}

/**
 * 处理setup的返回
 * @param instance
 * @param setupResult
 */
function handleSetupResult(instance: any, setupResult: any) {
  // todo 处理setup返回渲染函数
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}

/**
 * 结束组件的setup调用
 * @param instance
 */
function finishComponentSetup(instance: any) {
  const Component = instance.type
  if (Component.render) {
    instance.render = Component.render
  }
}

let currentInstance: null

/**
 * 查看当前组件实例
 */
export function getCurrentInstance(): any {
  return currentInstance
}

/**
 * 设置当前组件实例
 * @param instance
 */
function setCurrentInstance(instance: any) {
  currentInstance = instance
}
