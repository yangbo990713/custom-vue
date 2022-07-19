import {notify, track} from "./effect";

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

function createGetter(isReadonly: boolean = false) {
  return function get(target: any, key: string | symbol) {
    const res = Reflect.get(target, key)
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
    notify(target, key);
    return res
  }
}

export const mutableHandle = {
  get,
  set
}

export const readonlyHandle = {
  get: readonlyGet,
  set(target: any) {
    console.warn(`target${target}是只读的`)
    return true
  }
}
