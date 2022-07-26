import {ReactiveEffect, isTracking, trackEffect, triggerEffect} from "./effect";
import {hasChanged, isObject} from "../shared";
import {reactive} from "./reactive";

class RefImpl {
  private _value: any;
  private readonly dep: Set<ReactiveEffect> = new Set();
  private _rawValue: any;
  public __v_isRef: boolean = true

  constructor(value: any) {
    this._value = convert(value)
    this._rawValue = value
  }

  get value() {
    if (isTracking()) {
      trackEffect(this.dep)
    }
    return this._value
  }

  set value(newVal) {
    if (!hasChanged(this._rawValue, newVal)) return
    this._value = convert(newVal)
    this._rawValue = newVal
    triggerEffect(this.dep)
  }
}

export function ref(value: any) {
  return new RefImpl(value)
}

/**
 * 处理ref方法的参数,如果是对象就reactive处理,其它则原样返回
 * @param value ref参数
 */
function convert(value: any) {
  return isObject(value) ? reactive(value) : value
}

/**
 * 判断一个值是否为ref
 * @param val 值
 */
export function isRef(val: any): boolean {
  return Boolean(val.__v_isRef)
}

/**
 * 对一个值进行ref解构,如果是ref则返回其value,如果不是则原样返回
 * @param val 值
 */
export function unRef(val: RefImpl | any): boolean {
  return isRef(val) ? val.value : val
}

/**
 * 对一个对象进行代理,如果内部有ref则自动结构
 * @param objectWithRef 目标对象
 */
export function proxyRefs(objectWithRef: object) {
  return new Proxy(objectWithRef, {
    get(target: any, key: string | symbol): any {
      return unRef(Reflect.get(target, key))
    },
    set(target: any, key: string | symbol, value: any): boolean {
      // 先获取目标
      const res = Reflect.get(target, key)
      // 如果目标是 ref 且 新值不为ref 则设置其 .value
      if (isRef(res) && !isRef(value)) res.value = value
      // 否则直接赋值
      return Reflect.set(target, key, value)
    }
  })
}
