export function initSlots(instance: any, children: any) {
  instance.slots = normalizeSlotObject(children)
}

function normalizeSlotValue(value: any) {
  return Array.isArray(value) ? value : [value]
}

function normalizeSlotObject(children: any) {
  const slots: any = {}
  for (const childrenKey in children) {
    const value = children[childrenKey]
    slots[childrenKey] = normalizeSlotValue(value)
  }
  return slots;
}
