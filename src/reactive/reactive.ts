export function reactive(target: any) {
  return new Proxy(target, {
    get(target: object, p: string | symbol): any {
      // 收集依赖
      track(target, p)
      return Reflect.get(target, p)
    },
    set(target: object, p: string | symbol, value: any, receiver: any): boolean {
      const res = Reflect.set(target, p, value, receiver)
      // 通知更新
      notify(target, p)
      return res
    }
  })
}

class ReactiveEffect {
  private readonly fn: Function;

  constructor(fn: Function) {
    this.fn = fn
  }

  run() {
    this.fn()
  }
}

// 当前的更新函数
let activeEffect: ReactiveEffect

export function effect(fn: Function) {
  // 实例化一个ReactiveEffect类,保存回调函数
  activeEffect = new ReactiveEffect(fn)
  // 立刻执行一次
  activeEffect.run()
}

// 所有的被收集的数据,以及它们的更新方法
const depMap = new Map()

function track(target: object, key: string | symbol) {
  // 从depMap中取出target对应的数据
  let targetMap = depMap.get(target)
  if (!targetMap) {
    targetMap = new Map()
  }
  // 取出target中key对应的更新方法
  let deps = targetMap.get(key)
  if (!deps) {
    deps = new Set()
  }
  // 把当前更新方法添加到 key 对应的 更新方法数组 中
  deps.add(activeEffect)
  // 重设 key 对应的 更新方法数组
  targetMap.set(key, deps)
  // 重设 target 对应的 数据
  depMap.set(target, targetMap)
}

function notify(target: object, key: string | symbol) {
  // 以下两步 为 取出key对应的 更新方法数组
  let targetMap = depMap.get(target)
  let deps = targetMap.get(key)
  // 挨个调用更新方法
  Array.from(deps).forEach((item: any) => {
    item.run()
  })
}

