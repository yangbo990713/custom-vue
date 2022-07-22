import {isReadonly, readonly, shallowReadonly} from "../readonly";
import {isProxy} from "../reactive";

it('readonly', function () {
  console.warn = jest.fn()
  const user: object = {age: 10}
  const proxy = readonly(user)

  expect(user).not.toBe(proxy)

  expect(isProxy(proxy)).toBe(true)

  proxy.age++
  expect(proxy.age).toBe(10)
  expect(console.warn).toHaveBeenCalled()
});

it('isReadonly', function () {
  const obj = {age: 10}
  const readonlyObj = readonly(obj)
  expect(isReadonly(readonlyObj)).toBe(true);
  expect(isReadonly(obj)).toBe(false);
});

it('deepIsReadonly', function () {
  const user = {
    name: '小明',
    wife: {name: '小红'},
    car: [{name: '奔驰'}]
  }
  const proxy = readonly(user)

  expect(isReadonly(proxy.wife)).toBe(true)

  expect(isReadonly(proxy.car)).toBe(true)

  expect(isReadonly(proxy.car[0])).toBe(true)
});

it('shallowReadonly', function () {
  const user = {
    name: '小明',
    wife: {name: '小红'},
    car: [{name: '奔驰'}]
  }
  const proxy = shallowReadonly(user)

  expect(isReadonly(proxy)).toBe(true)

  proxy.name = '小华'
  expect(proxy.name).toBe('小明')

  expect(isReadonly(proxy.wife)).toBe(false)

  expect(isReadonly(proxy.car)).toBe(false)

  expect(isReadonly(proxy.car[0])).toBe(false)
});
