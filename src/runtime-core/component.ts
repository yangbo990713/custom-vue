import {publicInstanceProxyHandlers} from "./componentPublicInstance";
import {initProps} from "./componentProps";
import {shallowReadonly} from "../reactive/readonly";
import {emit} from "./componentEmit";

export function createComponentInstance(vNode: any) {
  const component = {
    vNode,
    type: vNode.type,
    proxy: {},
    emit: () => {}
  }
  component.emit = emit.bind(null, component) as any
  return component
}

export function setupComponent(instance: any) {
  // todo 处理slots
  initProps(instance, instance.vNode.props)
  // init component
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type
  const {setup} = Component

  instance.proxy = new Proxy({_: instance}, publicInstanceProxyHandlers)

  if (typeof setup === 'function') {
    // setup可以返回对象(响应式数据)或函数(渲染函数)
    // setup时传递props,且props是“浅只读”的
    const setupResult = setup(shallowReadonly(instance.props), {emit: instance.emit})
    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance: any, setupResult: any) {
  // todo 处理setup返回渲染函数
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type
  if (Component.render) {
    instance.render = Component.render
  }
}
