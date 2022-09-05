import {h} from "../../lib/custom-vue-esm.js";

export default {
  setup(props, {emit}) {
    const addFn = () => {
      emit('add', 1, 2)
      emit('add-foo')
    }
    return {addFn}
  },
  render() {

    const BtnAdd = h('button', {
      onClick: this.addFn
    }, '按钮')

    return h('div', {}, [BtnAdd])
  }
}
