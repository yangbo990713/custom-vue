import {camelize, toHandlerKey} from "../shared";

/**
 * emit方法
 * @param instance
 * @param event
 * @param rest
 */
export function emit(instance: any, event: string, ...rest: any[]): void {
  const {props} = instance

  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]

  if (typeof handler === 'function') {
    handler(...rest)
  }
}
