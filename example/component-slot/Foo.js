import {h, renderSlots} from "../../lib/custom-vue-esm.js";

export default {
  setup() {

    return {}
  },
  render() {
    const Foo = h('p', {}, 'Foo组件')
    console.log('Galaxy', this.$slots)
    // 1.获取到要渲染的元素
    // 2.获取到要渲染的位置
    return h('div', {}, [
      renderSlots(this.$slots, 'header'),
      Foo,
      renderSlots(this.$slots, 'footer')
    ])
  }
}
