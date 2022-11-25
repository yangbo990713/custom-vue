import {ShapeFlags} from "../shared/ShapeFlags";

/**
 * 初始化插槽
 * @param instance
 * @param children
 */
export function initSlots(instance: any, children: any) {
  const {vNode} = instance
  if (vNode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
    instance.slots = normalizeSlotObject(children)
  }
}

function normalizeSlotValue(value: any) {
  return Array.isArray(value) ? value : [value]
}

function normalizeSlotObject(children: any) {
  const slots: any = {}
  for (const childrenKey in children) {
    const value = children[childrenKey]
    slots[childrenKey] = (props: any) => normalizeSlotValue(value(props))
  }
  return slots;
}
