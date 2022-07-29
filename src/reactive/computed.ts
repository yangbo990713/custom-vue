import {ReactiveEffect} from "./effect";

class ComputedRefImpl {
  private _isDirty: boolean = true;
  private readonly _effect: ReactiveEffect;
  private _value: any;

  constructor(getter: Function) {
    this._effect = new ReactiveEffect(getter, () => {
      if (!this._isDirty)
        this._isDirty = true
    })
  }

  get value() {
    // 把值缓存起来,只有触发scheduler之后才打开 _isDirty 开关 在下次调用get读取属性时重新计算
    if (this._isDirty){
      this._isDirty = false
      this._value = this._effect.run()
    }
    return this._value
  }
}

export function computed(getter: Function) {
  return new ComputedRefImpl(getter)
}
