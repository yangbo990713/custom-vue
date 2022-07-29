import {computed} from "../computed";
import {reactive} from "../reactive";

describe('computed', function () {
  it('base', function () {
    const obj = reactive({count: 1})
    const doubleCount = computed(() => obj.count * 2)
    expect(doubleCount.value).toBe(2)
  });

  it('lazy', function () {
    const obj = reactive({count: 1})
    const getter = jest.fn(() => obj.count * 2)
    const doubleCount = computed(getter)
    // 默认是不会调用 getter 的
    expect(getter).not.toHaveBeenCalled()
    // “读”到了 computed 的值，才会调用 getter 进行计算
    expect(doubleCount.value).toBe(2)
    // getter 被调用了1次
    expect(getter).toHaveBeenCalledTimes(1)

    // “读”一下 并不会触发getter
    doubleCount.value
    expect(getter).toHaveBeenCalledTimes(1)

    obj.count = 2
    // 依赖发生改变，不会立即调用getter
    expect(getter).toHaveBeenCalledTimes(1)
    // “读”到了计算属性，才会再一次调用 getter 进行计算
    expect(doubleCount.value).toBe(4)
    expect(getter).toHaveBeenCalledTimes(2)

  });
});
