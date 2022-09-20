import {h, getCurrentInstance} from "../../lib/custom-vue-esm.js";

export default {
  setup() {
    console.log('Foo', getCurrentInstance());
    return {}
  },
  render() {

    return h('div', {}, 'Foo')
  }
}
