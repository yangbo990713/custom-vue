import {mutableHandle, ReactiveFlags} from "./baseHandlers";

export function reactive(target: any) {
  return new Proxy(target, mutableHandle)
}

export function isReactive(value: any) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}


