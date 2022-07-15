import {reactive, effect} from "../reactive";

describe('effect', function () {
  it('happy path', function () {

    const user = {age: 10}
    const proxy = reactive(user)

    expect(user).not.toBe(proxy)

    let newAge

    // 调用 effect 传递一个回调函数
    effect(() => {
      // 由于"读"到了age属性,会触发"proxy"的依赖收集 -> reactive.ts
      newAge = proxy.age + 1
    })
    // 断言 newAge 为 11 因为effect会立马执行一次回调
    expect(newAge).toBe(11)

    // 修改age,newAge应该也要更新
    proxy.age = 11
    expect(newAge).toBe(12)
  });
});
