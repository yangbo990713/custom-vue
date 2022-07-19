import {mutableHandle, readonlyHandle} from "./baseHandlers";

export function reactive(target: any) {
  return new Proxy(target, mutableHandle)
}

export function readonly(target: any) {
  return new Proxy(target, readonlyHandle)
}
