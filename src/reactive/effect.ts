// 当前的更新函数
import {extend} from "../shared";

let activeEffect: ReactiveEffect
let shouldTrack: Boolean

export class ReactiveEffect {
  private readonly fn: Function;
  onStop?: () => void
  deps: Array<Set<ReactiveEffect>> = []
  active: Boolean = true
  public _scheduler: Function | undefined;

  constructor(fn: Function, scheduler?: Function | undefined) {
    this.fn = fn
    this._scheduler = scheduler
  }

  run() {
    if (!this.active) return this.fn()
    shouldTrack = true
    activeEffect = this
    const result = this.fn()
    shouldTrack = false
    return result
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


export function effect(fn: Function, options: any = {}) {
  // 实例化一个ReactiveEffect类,保存回调函数
  const _effect = new ReactiveEffect(fn, options.scheduler)
  extend(_effect, options)
  // 立刻执行一次
  _effect.run()
  // effect返回的runner函数需要处理this指向问题，需要把this绑定到 ReactiveEffect 实例对象上
  const runner: any = _effect.run.bind(_effect)
  runner._effect = _effect
  return runner
}

// 所有的被收集的数据,以及它们的更新方法
const targetMap = new WeakMap()

/**
 * 收集依赖
 * @param target 目标对象
 * @param key 目标key
 */
export function track(target: object, key: string | symbol) {
  if (!isTracking()) return
  // target -> key -> deps
  // 从depMap中取出target对应的数据
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  // 取出target中key对应的更新方法
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }

  // 把当前更新方法添加到 key 对应的 依赖set 中
  trackEffect(deps)
}

/**
 * 收集依赖
 * @param deps
 */
export function trackEffect(deps: Set<ReactiveEffect>) {
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

/**
 * 通知更新方法
 * @param target 目标对象
 * @param key 目标key
 */
export function trigger(target: object, key: string | symbol) {
  // 以下两步 为 取出key对应的 更新方法数组
  let depsMap = targetMap.get(target)
  if (!depsMap) return;
  let deps = depsMap.get(key)
  // 更新
  triggerEffect(deps)
}

/**
 * 通知更新
 * @param deps 依赖
 */
export function triggerEffect(deps: Set<ReactiveEffect>) {
  for (const depItem of deps) {
    if (depItem._scheduler) {
      depItem._scheduler()
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

/**
 * 当前是否应该收集依赖
 */
export function isTracking() {
  return shouldTrack && activeEffect !== undefined;
}
