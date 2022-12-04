import App from "./App.js";
import {createRender} from "../../lib/custom-vue-esm.js";

const pixiApplication = new PIXI.Application({width: 500, height: 500})

document.body.append(pixiApplication.view)

const render = createRender({
  createElement(type) {
    if (type === 'rect') {
      // 创建一个矩形
      const rect = new PIXI.Graphics()
      // 设置颜色
      rect.beginFill(0xff9999)
      // 设置绘制的起始位置和终止位置
      rect.drawRect(0, 0, 100, 100)
      // 结束绘制
      rect.endFill()
      return rect
    }

  },
  patchProp(el, key, val) {
    el[key] = val
  },
  insert(el, container) {
    container.addChild(el)
  }
})

render.createApp(App).mount(pixiApplication.stage)
