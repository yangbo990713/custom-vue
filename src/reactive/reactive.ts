import {mutableHandle, ReactiveFlags, readonlyHandle} from "./baseHandlers";

export function reactive(target: any) {
  return new Proxy(target, mutableHandle)
}

export function isReactive(value: any) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}

export function readonly(target: any) {
  return new Proxy(target, readonlyHandle)
}

export function isReadonly(value: any) {
  return !!value[ReactiveFlags.IS_READONLY]
}
