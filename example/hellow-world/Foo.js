import {h} from "../../lib/custom-vue-esm.js";

export default {
  setup(props, {emit}) {
    // props是只读的
    console.log('Galaxy', props)
    props.count++

    const addFn = () => {
      emit('add', 1, 2)
      emit('add-foo')
    }
    return {addFn}
  },
  render() {
    const Foo = h('div', {}, `Foo:${this.count}`)
    const BtnAdd = h('button', {
      onClick: this.addFn
    }, '按钮')
    return h('div', {}, [Foo, BtnAdd])
  }
}
