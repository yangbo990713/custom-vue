import {mutableHandle, ReactiveFlags} from "./baseHandlers";
import {isReadonly} from "./readonly";

export function reactive(target: any) {
  return new Proxy(target, mutableHandle)
}

export function isReactive(value: any) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isProxy(value:any) {
  return isReactive(value) || isReadonly(value)
}
