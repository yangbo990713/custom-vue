import {isReactive, reactive} from "../reactive";

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

it('deepIsReactive', function () {
  const user = {
    age: 10,
    wife: {name: '小红'},
    car: [{name: '奔驰'}]
  }
  const proxy = reactive(user)

  expect(isReactive(proxy.wife)).toBe(true)

  expect(isReactive(proxy.car)).toBe(true)

  expect(isReactive(proxy.car[0])).toBe(true)
});
