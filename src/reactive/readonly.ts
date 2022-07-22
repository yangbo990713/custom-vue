import {ReactiveFlags, readonlyHandle, shallowReadonlyHandle} from "./baseHandlers";

export function readonly(target: any) {
  return new Proxy(target, readonlyHandle)
}

export function shallowReadonly(target: any) {
  return new Proxy(target, shallowReadonlyHandle)
}

export function isReadonly(value: any) {
  return !!value[ReactiveFlags.IS_READONLY]
}
