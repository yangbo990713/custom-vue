import {h} from "../../lib/custom-vue-esm.js";
import Foo from "./Foo.js";

export default {
  setup() {
    return {}
  },
  render() {
    const App = h('div', {}, 'App组件')
    const FooCom = h(Foo, {}, [h('p', {}, '这里是Foo组件的slot')])

    return h('div', {}, [App, FooCom])
  },
}
