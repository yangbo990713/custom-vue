import {ReactiveFlags, readonlyHandle} from "./baseHandlers";

export function readonly(target: any) {
  return new Proxy(target, readonlyHandle)
}

export function isReadonly(value: any) {
  return !!value[ReactiveFlags.IS_READONLY]
}
