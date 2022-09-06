import {hasOwn} from "../shared/index";

const publicPropertiesMap: any = {
  $el: (i: any) => i.vNode.el,
  $slots: (i: any) => i.slots,
}
export const publicInstanceProxyHandlers = {
  get({_: instance}: any, key: string | symbol): any {
    const {setupState, props} = instance

    if (hasOwn(setupState, key)) {
      return Reflect.get(setupState, key)
    } else if (hasOwn(props, key)) {
      return Reflect.get(props, key)
    }

    const publicGetter = publicPropertiesMap[key]
    if (publicGetter) {
      return publicGetter(instance)
    }
  }
}
