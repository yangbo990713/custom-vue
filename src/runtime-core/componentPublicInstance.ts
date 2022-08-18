const publicPropertiesMap: any = {
  $el: (i: any) => i.vNode.el
}
export const publicInstanceProxyHandlers = {
  get({_: instance}: any, key: string | symbol): any {
    const {setupState} = instance
    if (Object.prototype.hasOwnProperty.call(setupState, key)) {
      return Reflect.get(setupState, key)
    }
    const publicGetter = publicPropertiesMap[key]
    if (publicGetter) {
      return publicGetter(instance)
    }
  }
}
