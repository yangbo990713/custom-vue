import {h} from "../../lib/custom-vue-esm.js";
import Foo from "./Foo.js";

export default {
  setup() {
    return {}
  },
  render() {
    window.vm = this

    return h('div', {},
      [
        h(Foo, {
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
}
