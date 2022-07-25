import {ReactiveEffect, isTracking, trackEffect, triggerEffect} from "./effect";
import {hasChanged, isObject} from "../shared";
import {reactive} from "./reactive";

class RefImpl {
  private _value: any;
  private readonly dep: Set<ReactiveEffect> = new Set();
  private _rawValue: any;

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
