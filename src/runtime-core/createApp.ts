import {createVNode} from "./vNode";

export function createAppAPI(render: Function) {
  return function createApp(rootComponent: any) {
    return {
      mount(rootContainer: any) {
        const vNode = createVNode(rootComponent)
        render(vNode, rootContainer)
      }
    }
  }
}




