import {h, createTextVNode} from "../../lib/custom-vue-esm.js";
import Foo from "./Foo.js";

export default {
  setup() {
    return {}
  },
  render() {
    const App = h('div', {}, 'App组件')

    const FooCom = h(Foo, {}, {
      header: ({name}) => [h('p', {}, `这里是Foo组件的header1 ${name}`), createTextVNode('这里是Text节点')],
      footer: () => h('p', {}, '这里是Foo组件的footer1')
    })

    return h('div', {}, [App, FooCom])
  },
}
