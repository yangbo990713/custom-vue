import {h, createTextVNode, provide, inject} from "../../lib/custom-vue-esm.js";


const Grandson = {
  setup() {
    // 孙子组件注入得到父组件传递的foo,而非祖先组件的foo
    const foo = inject('foo')
    const bar = inject('bar')

    return {foo, bar};
  },
  render() {
    return h('div', {}, [createTextVNode(`孙子组件${this.foo}+${this.bar}`)])
  }
}

const Son = {
  setup() {
    // 子组件再次传递相同的key
    provide('foo', 'fooValTwo')
    const foo = inject('foo')
    const bar = inject('bar')
    // 实现默认选项
    const baz = inject('baz', 'defaultBaz')
    // 默认值为方法
    const baz222 = inject('baz222', () => 'defaultBaz22222')
    return {foo, bar, baz, baz222};
  },
  render() {
    return h('div', {}, [createTextVNode(`子组件${this.foo} ${this.bar} ${this.baz} ${this.baz222}`), h(Grandson)])
  }
}

export default {
  setup() {
    provide('foo', 'fooVal')
    provide('bar', 'barVal')
    return {}
  },
  render() {
    return h('div', {}, [createTextVNode('父组件'), h(Son, {}, '')])
  },
}
