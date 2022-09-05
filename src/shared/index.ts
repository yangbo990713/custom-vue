export const extend = Object.assign

// 查看val是否为对象
export const isObject = (val: any) => val !== null && typeof val === 'object'

export const hasChanged = (val: any, newVal: any) => !Object.is(val, newVal)

// 查看对象中是否有某个key
export const hasOwn = (val: any, key: string | symbol) => Object.prototype.hasOwnProperty.call(val, key)


// 中划线转化为驼峰
export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_: any, c: string) => {
    return c ? c.toUpperCase() : ''
  })
}

// 首字母转化为大写
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 加上事件前缀
export const toHandlerKey = (str: string) => {
  return str ? 'on' + capitalize(str) : ''
}
