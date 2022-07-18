class ReactiveEffect {
  private readonly fn: Function;
  onStop?: () => void
  deps: Array<Set<ReactiveEffect>> = []
  active: Boolean = true

  constructor(fn: Function, public scheduler?: Function | undefined) {
    this.fn = fn
    this.scheduler = scheduler
  }

  run() {
    return this.fn()
  }

  stop() {
    // 如果当前已经stop过了就return
    if (!this.active) return
    this.active = false
    if (typeof this.onStop === 'function') this.onStop();
    // 从deps中把自己删除掉,deps是key中存取的依赖set
    if (Array.isArray(this.deps)) {
      this.deps.forEach(i => i.delete(this))
    }
  }
}

// 当前的更新函数
let activeEffect: ReactiveEffect

export function effect(fn: Function, options: any = {}) {
  // 实例化一个ReactiveEffect类,保存回调函数
  activeEffect = new ReactiveEffect(fn, options.scheduler)
  Object.assign(activeEffect, options)
  // 立刻执行一次
  activeEffect.run()
  const runner: any = activeEffect.run.bind(activeEffect)
  runner._effect = activeEffect
  return runner
}

// 所有的被收集的数据,以及它们的更新方法
const depMap = new Map()

/**
 * 收集依赖
 * @param target 目标对象
 * @param key 目标key
 */
export function track(target: object, key: string | symbol) {
  // target -> key -> deps

  // 从depMap中取出target对应的数据
  let targetMap = depMap.get(target)
  if (!targetMap) {
    targetMap = new Map()
    depMap.set(target, targetMap)
  }

  // 取出target中key对应的更新方法
  let deps = targetMap.get(key)
  if (!deps) {
    deps = new Set()
    targetMap.set(key, deps)
  }

  if (!activeEffect) return;
  // 把当前更新方法添加到 key 对应的 依赖set 中
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

/**
 * 通知更新方法
 * @param target 目标对象
 * @param key 目标key
 */
export function notify(target: object, key: string | symbol) {
  // 以下两步 为 取出key对应的 更新方法数组
  let targetMap = depMap.get(target)
  let deps = targetMap.get(key)
  // 挨个调用更新方法
  for (const depItem of deps) {
    if (depItem.scheduler) {
      depItem.scheduler()
    } else {
      depItem.run()
    }
  }
}

/**
 * 停止effect副作用
 * @param runner effect的返回方法
 */
export function stop(runner: any) {
  runner._effect.stop()
}
