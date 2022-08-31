import {h} from "../../lib/custom-vue-esm.js";

export default {
  setup(props) {
    console.log('Galaxy', props)
    props.count++
    return {}
  },
  render() {
    return h('div', {}, `Foo:${this.count}`)
  }
}
