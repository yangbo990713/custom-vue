import {notify, track} from "./effect";

export function reactive(target: any) {
  return new Proxy(target, {
    get(target: object, p: string | symbol): any {
      // 收集依赖
      track(target, p)
      return Reflect.get(target, p)
    },
    set(target: object, p: string | symbol, value: any, receiver: any): boolean {
      const res = Reflect.set(target, p, value, receiver)
      // 通知更新
      notify(target, p);
      return res
    }
  })
}


