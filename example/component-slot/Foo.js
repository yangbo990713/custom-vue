import {h} from "../../lib/custom-vue-esm.js";

export default {
  setup() {

    return {}
  },
  render() {
    const Foo = h('p', {}, 'Foo组件')
    console.log('Galaxy', this.$slots)

    return h('div', {}, [Foo, ...this.$slots])
  }
}
