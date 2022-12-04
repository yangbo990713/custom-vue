import {createRender} from "../runtime-core";


/**
 * 创建元素
 * @param type
 */
function createElement(type: string) {
  console.log('Galaxy', 'createElement')
  return document.createElement(type)
}


const isEvent = (event: string) => /^on[A-Z]/.test(event)

/**
 * 处理prop
 * @param el
 * @param key
 * @param val
 */
function patchProp(el: Element, key: string, val: any) {
  console.log('Galaxy', 'patchProp')
  if (isEvent(key)) {
    const eventName = key.slice(2).toLowerCase()
    el.addEventListener(eventName, val)
  } else {
    el.setAttribute(key, val)
  }
}

/**
 * 挂载元素
 * @param el 元素
 * @param container 容器
 */
function insert(el: Element, container: Element) {
  console.log('Galaxy', 'insert')
  container.append(el)
}


const render: any = createRender({
  createElement,
  patchProp,
  insert
})

export function createApp(...rest: any[]) {
  return render.createApp(...rest)
}

export * from '../runtime-core'
