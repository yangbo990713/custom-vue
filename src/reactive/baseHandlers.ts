import {trigger, track} from "./effect";
import {reactive} from "./reactive";
import {readonly} from "./readonly";
import {extend, isObject} from "../shared/index";

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

export enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

function createGetter(isReadonly: boolean = false, isShallow: boolean = false) {
  return function get(target: any, key: string | symbol): any {
    // 可读对象非响应式对象
    if (key === ReactiveFlags.IS_REACTIVE) return !isReadonly
    if (key === ReactiveFlags.IS_READONLY) return isReadonly
    const res: any = Reflect.get(target, key)

    if (isShallow) return res

    // 实现对象嵌套
    if (isObject(res)) return isReadonly ? readonly(res) : reactive(res)

    if (!isReadonly) {
      track(target, key)
    }
    return res
  }
}

function createSetter() {
  return function set(target: any, key: string | symbol, value: any, receiver: any): boolean {
    const res = Reflect.set(target, key, value, receiver)
    // 通知更新
    trigger(target, key);
    return res
  }
}

export const mutableHandle = {
  get,
  set
}

export const readonlyHandle = {
  get: readonlyGet,
  set(target: any, key: string | symbol) {
    console.warn(`target${JSON.stringify(target)}.${String(key)}是只读的`)
    return true
  }
}
export const shallowReadonlyHandle = extend({}, readonlyHandle, {
  get: shallowReadonlyGet
})
