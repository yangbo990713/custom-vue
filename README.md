# custom-vue

实现最简 vue3 模型，用于深入学习 Vue3，了解其核心逻辑



### 功能列表：

#### reactivity

目标是用自己的 reactivity 支持现有的 demo 运行

- [x]  reactive 的实现
- [x]  ref 的实现
- [x]  readonly 的实现
- [x]  computed 的实现
- [x]  track 依赖收集
- [x]  trigger 触发依赖
- [x]  支持 isReactive
- [x]  支持嵌套 reactive
- [x]  支持 toRaw
- [x]  支持 effect.scheduler
- [x]  支持 effect.stop
- [x]  支持 isReadonly
- [x]  支持 isProxy
- [x]  支持 shallowReadonly
- [x]  支持 proxyRefs

#### runtime-core

- [x]  支持组件类型
- [x]  支持 element 类型
- [x]  初始化 props
- [x]  setup 可获取 props 和 context
- [x]  支持 component emit
- [x]  支持 proxy
- [x]  可以在 render 函数中获取 setup 返回的对象
- [ ]  nextTick 的实现
- [x]  支持 getCurrentInstance
- [x]  支持 provide/inject
- [x]  支持最基础的 slots
- [x]  支持 Text 类型节点
- [ ]  支持 $el api
- [x]  支持 watchEffect

### runtime-core

- [x] 支持 createRender 自定义渲染器

### compiler-core

- [ ]  解析插值
- [ ]  解析 element
- [ ]  解析 text
