import {h, getCurrentInstance, createTextVNode} from "../../lib/custom-vue-esm.js";
import Foo from "./Foo.js";

export default {
  setup() {
    console.log('App', getCurrentInstance())
    return {}
  },
  render() {

    return h('div', {}, [createTextVNode('App'), h(Foo, {}, '')])
  },
}
