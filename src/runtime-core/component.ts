export function createComponentInstance(vNode: any) {
  const component = {
    vNode,
    type: vNode.type
  }
  return component
}

export function setupComponent(instance: any) {
  // todo 处理props和slots

  // init component
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type
  const {setup} = Component
  if (typeof setup === 'function'){
    // setup可以返回对象(响应式数据)或函数(渲染函数)
    const setupResult =  setup()
    handleSetupResult(instance,setupResult)
  }
}

function handleSetupResult(instance: any,setupResult: any) {
  // todo 处理setup返回渲染函数
  if (typeof setupResult === 'object'){
    instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type
  if (Component.render){
    instance.render = Component.render
  }
}
