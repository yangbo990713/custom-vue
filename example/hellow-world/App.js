import {h} from "../../lib/custom-vue-esm.js";

export default {
  render() {
    return h('div', this.msg)
  },
  setup() {
    return {
      msg: 'hello world'
    }
  }
}
