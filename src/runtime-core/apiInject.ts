import {getCurrentInstance} from "./component";

export function provide(key: string | symbol, value: any) {
  // 存
  const currentInstance: any = getCurrentInstance()
  if (currentInstance) {
    let {provides} = currentInstance

    // 根组件没有parent
    const parentProvides = currentInstance.parent?.provides ?? {}

    // 如果不等于则初始化
    if (provides === parentProvides) {
      // 使用原型链的方法,先在父组件上找provides,找不到则顺着原型链往上找
      provides = currentInstance.provides = Object.create(parentProvides)
    }

    provides[key] = value
  }
}

export function inject(key: string | symbol, defaultVal: any) {
  // 取
  const currentInstance: any = getCurrentInstance()
  if (currentInstance) {
    const parentProvides = currentInstance.parent.provides
    // 判断是否查找到祖先传递的数据,没有则使用默认值
    if (key in parentProvides) {
      return parentProvides[key]
    } else if (typeof defaultVal === 'function') {
      // 判断默认值是否为函数
      return defaultVal()
    }
    return defaultVal
  }
}
