import {effect} from "../effect";
import {reactive} from "../reactive";

describe('effect', function () {
  it('base', function () {

    const person = {name: '小明', age: 12}
    const proxy = reactive(person)

    let newAge
    // 调用 effect 传递一个回调函数
    effect(() => {
      // 由于"读"到了age属性,会触发"proxy"的依赖收集 -> reactive.ts
      newAge = proxy.age + 1
      return 'runner'
    })
    // 断言 newAge 为 13 因为effect会立马执行一次回调
    expect(newAge).toBe(13)

    // 修改age,newAge应该也要更新
    proxy.age = 11
    expect(newAge).toBe(12)


  });

  it('runner', function () {
    let num = 1
    const runner = effect(() => {
      num++
      return 'runner'
    })
    // 调用 runner 执行一次回调 并返回 回调方法 的返回值
    let res = runner()
    expect(res).toBe('runner')
    // effect会自动调用一次回调 runner也会调用一次
    expect(num).toBe(3)
  });

  it('scheduler', () => {
    // 1.effect调用时会执行一次fn
    // 2.依赖变化时会执行scheduler,而不是fn
    // 3.调用effect返回的run方法才会执行fn
    let dummy
    let run: any
    const scheduler = jest.fn(() => {
      run = runner
    })
    const obj = reactive({foo: 1})
    const runner = effect(() => {
      dummy = obj.foo
    }, {scheduler})
    // effect执行时不会调用scheduler
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    // 触发更新时 scheduler 会被调用一次
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    // 且fn回调不会被调用
    expect(dummy).toBe(1)
    // 调用effect返回的run方法时,才会调用fn回调
    run()
    expect(dummy).toBe(2)
  })
});
