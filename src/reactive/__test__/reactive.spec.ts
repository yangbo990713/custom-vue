import {reactive} from "../reactive";

describe('reactive', function () {
  it('happy path', function () {

    const user = {age: 10}
    const proxy = reactive(user)

    expect(user).not.toBe(proxy)

    expect(user.age).toBe(10)
  });
});
