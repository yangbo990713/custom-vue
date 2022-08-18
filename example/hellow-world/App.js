import {h} from "../../lib/custom-vue-esm.js";

export default {
  render() {
    window.vm = this
    return h('div', {
      id: 'root',
      class: ['red', 'green']
    }, [h('div', {}, [h('p', {}, `这是${this.msg}`)]), h('div', {}, '这是div标签')])
  },
  setup() {
    return {
      msg: 'hello world111'
    }
  }
}
