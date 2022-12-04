import {h} from "../../lib/custom-vue-esm.js";

export default {
  setup() {
    return {x: 100, y: 100}
  },
  render() {
    return h('rect', {x: this.x, y: this.y})
  },
}
