import {isRef, proxyRefs, ref, unRef} from "../ref";
import {effect} from "../effect";
import {reactive} from "../reactive";

describe('ref', function () {
  it('happy path', function () {
    const count = ref(1)
    expect(count.value).toBe(1)
  });

  it('ref:change', function () {
    const count = ref(1)
    // count的副本
    let dummy
    // 回调触发的次数
    let callNum = 0
    effect(() => {
      callNum++
      dummy = count.value
    })
    expect(dummy).toBe(1)
    expect(callNum).toBe(1)
    // 值发生改变,通知更新
    count.value = 2
    expect(dummy).toBe(2)
    expect(callNum).toBe(2)
    // 值未改变，不调用更新方法
    count.value = 2
    expect(dummy).toBe(2)
    expect(callNum).toBe(2)
  });

  it('ref:object', function () {
    const obj = ref({count: 1});
    let dummy;
    effect(() => {
      dummy = obj.value.count;
    });
    expect(dummy).toBe(1);
    obj.value = {count: 2};
    expect(dummy).toBe(2);
  });

  it('isRef API', function () {
    const count = ref(1)
    const obj = reactive({age: 10})
    const str = 'abc'

    expect(isRef(count)).toBe(true)
    expect(isRef(obj)).toBe(false)
    expect(isRef(str)).toBe(false)
  });

  it('unRef API', function () {
    const count = ref(1)
    expect(unRef(count)).toBe(1)
  });

  it('proxyRefs API', function () {
    const user = {
      age: ref(10),
      name: 'tom'
    }
    const res = proxyRefs(user)
    expect(res.age).toBe(10);
    expect(res.name).toBe('tom');
    expect(user.age.value).toBe(10);

    res.age = ref(11)
    expect(res.age).toBe(11);
    expect(user.age.value).toBe(11);
  });
});
