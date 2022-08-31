export const extend = Object.assign

export const isObject = (val: any) => val !== null && typeof val === 'object'

export const hasChanged = (val: any, newVal: any) => !Object.is(val, newVal)

export const hasOwn = (val: any, key: string | symbol) => Object.prototype.hasOwnProperty.call(val, key)
