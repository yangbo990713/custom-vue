import {effect} from "../effect";
import {reactive} from "../reactive";

describe('effect', function () {
  it('happy path', function () {
    const person = {
      name: '小明',
      age: 12
    }
    const proxy = reactive(person)

    let newAge

    // 调用 effect 传递一个回调函数
    const runner = effect(() => {
      // 由于"读"到了age属性,会触发"proxy"的依赖收集 -> reactive.ts
      newAge = proxy.age + 1
      return 'runner'
    })
    // 断言 newAge 为 11 因为effect会立马执行一次回调
    expect(newAge).toBe(13)

    // 修改age,newAge应该也要更新
    proxy.age = 11
    expect(newAge).toBe(12)

    // 调用runner 执行一次回调 并返回 回调方法 的返回值
    let res = runner()
    expect(res).toBe('runner')
    expect(newAge).toBe(12)
  });
});
