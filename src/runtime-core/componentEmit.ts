import {camelize, toHandlerKey} from "../shared/index";

export function emit(instance: any, event: string, ...rest: any[]): void {
  const {props} = instance

  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]

  if (typeof handler === 'function') {
    handler(...rest)
  }
}
