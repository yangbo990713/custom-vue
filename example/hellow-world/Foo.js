import {h} from "../../lib/custom-vue-esm.js";

export default {
  setup(props) {
    // props是只读的
    console.log('Galaxy', props)
    props.count++

    return {}
  },
  render() {
    const Foo = h('div', {}, `Foo:${this.count}`)
    return h('div', {}, Foo)
  }
}
