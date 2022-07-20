import {isReadonly, isReactive, reactive, readonly} from "../reactive";

it('reactive', function () {

  const user = {age: 10}
  const proxy = reactive(user)

  expect(user).not.toBe(proxy)

  expect(user.age).toBe(10)

  proxy.age++
  expect(user.age).toBe(11)
});

it('isReactive', function () {
  const obj = {age: 10}
  const proxy = reactive(obj)
  expect(isReactive(proxy)).toBe(true);
  expect(isReactive(obj)).toBe(false);
});

it('readonly', function () {
  console.warn = jest.fn()
  const user: object = {age: 10}
  const proxy = readonly(user)

  expect(user).not.toBe(proxy)

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
