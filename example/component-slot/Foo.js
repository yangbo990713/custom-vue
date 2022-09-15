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
    // 3.实现作用域插槽
    const name = 'tom'
    return h('div', {}, [
      renderSlots(this.$slots, 'header', {name}),
      Foo,
      renderSlots(this.$slots, 'footer')
    ])
  }
}
