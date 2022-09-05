import {h} from "../../lib/custom-vue-esm.js";
import Foo from "./Foo.js";

export default {
  render() {
    window.vm = this

    return h('div', {
        id: 'root',
        class: ['red', 'green'],
        onClick() {
          // console.log('Galaxy', '元素被点击了')
        }
      },
      [
        h('div', {}, [h('p', {}, `这是${this.msg}`)]),
        h('div', {}, '这是div标签'),
        h(Foo, {
          count: 1,
          onAdd(a, b) {
            console.log('Galaxy', '触发emit', a, b)
          },
          onAddFoo() {
            console.log('Galaxy', '触发onAddFoo')
          }
        }, '')
      ]
    )
  },
  setup() {
    return {
      msg: 'hello world111'
    }
  }
}
