# Vue面试

## Vue 基本使用（常用必须会）

- 基本使用

  - 模板（插值，指令）

  - computed 和 watch

  - class 和 style

  - 条件

  - 循环

  - 事件

  - 表单

- 组件

  - 生命周期
  - props（类型和默认值）
  - v-on和$emit
  - 自定义事件

### 基本使用

#### computed 和 watch

- computed 有缓存，data不变则不会重新计算
- watch如何深度监听
- watch 监听引用类型，拿不到 oldVal

#### class 和 style

- 使用动态属性
- 使用驼峰式写法

#### 条件渲染

- v-if v-else的用法，可使用变量，也可以使用 === 表达式
- v-if 和 v-show 的区别
- v-if 和 v-show 的使用场景

#### 循环（列表）渲染

- 如何遍历对象？也可以使用 v-for
- key重要性。key 不能乱写（如 random 或 index）
- v-for 和 v-if 不能一起使用

#### 事件

- event 参数，自定义参数
- 事件修饰符，按键修饰符
- 【观察】事件被绑定到哪里？

#### 事件修饰符

#### 按键修饰符

#### 表单

- v-model
- 常见表单项 textarea checkbox radio select
- 修饰符 lazy number trim

### Vue 组件使用



- props 和 $emit
- 组件间通讯 - 自定义事件，beforeDestory销毁自定义事件
- 组件生命周期

#### props 和 $emit

#### 组件间通讯

#### 组件生命周期

https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram

单个组件

- 挂载阶段
- 更新阶段
- 销毁阶段

父子组件

## Vue 高级使用（不常用，但体现深度）

- 自定义 v-model
- $nextTick
- refs
- slot
- 动态、异步组件
- keep-alive
- mixin

#### 自定义 v-model

#### $nextTick

- Vue 是异步渲染
- data 改变之后，DOM 不会立刻渲染
- $nextTick 会在 DOM 渲染之后被触发，以获取最新 DOM 节点

#### slot

- 基本使用
- 作用域插槽
- 具名插槽

#### 动态组件

- :is="component-name"用法
- 需要根据数据，动态渲染的场景。即组件类型不确定

#### 异步组件（常用）

比较大的组件

- import() 函数
- 按需加载，异步加载大组件

#### keep-alive

- 缓存组件
- 频繁切换，不需要重复渲染
- Vue 常见性能优化

#### mixin

- 多个组件有相同的逻辑，抽离出来
- mixin的问题
  - 变量来源不明确，不利于阅读
  - 多个 mixin 可能会造成命名冲突
  - mixin 和组件可能出现多对多的关系，复杂度较高

## Vuex 

- 面试考点不多
- 基本概念、基本使用和 API 必须掌握
- 可能会考察 state 的数据结构设计

<img src="http://cdn.wangtongmeng.com/20231011145224-9cc0bd.png" style="zoom:33%;" />

### 基本概念

- state
- getters
- action
- mutation

### 用于 Vue 组件

- dispatch
- commit
- mapState
- mapGetters
- mapActions
- mapMutaions

## Vue-router 使用

- 面试考点不多（前提是熟悉vue）
- 路由模式（hash、H5 history）
- 路由配置（动态路由、路由懒加载）

### 路由模式

- hash模式（默认），如 `http://abc.com/#/user/10`
- h5 history 模式，如 `http://abc.com/user/20`，需要服务端找不到path也返回首页，有前端来控制显示路由页面（正常路由页面和404页面）



#### 路由配置

## Vue2原理

使用相关的原理，例如vdom、模板渲染

整体流程是否全面？热门技术是否有深度？

- 组件化
- 响应式
- vdom 和 diff
- 模板编译
- 渲染过程
- 前端路由



### 组件化

- 传统组件，只是静态渲染，更新还要依赖操作 DOM
- 数据驱动视图 - Vue MVVM，React setState

### 响应式

- 核心API - Object.defineProperty
- 如何实现响应式
  - 监听对象、数组
  - 复杂对象，深度监听
- 缺点
- proxy
  - 兼容性不好，且无法 polyfill（不需要考虑兼容性的用vue3，否则还得用vue2）

Object.defineProperty基本用法

Object.defineProperty实现响应式

- 监听对象，监听数组
- 复杂对象，深度监听
- 缺点
  - 深度监听，需要递归到底，一次性计算量大
  - 无法监听新增属性/删除属性(Vue.set Vue.delete)

### vdom 和 diff

- DOM 操作非常耗费性能
- Vue 和 React 都是数据驱动视图，如何有效控制 DOM 操作

- 细节不重要，updateChildren 的过程也不重要，不要深究
- vdom 核心概念很重要：h、vnode、patch、diff、key等
- Vdom 存在的价值更加重要：数据驱动视图，控制 DOM 操作

Diff

- PatchVnode
- AddVnodes removeVnodes
- UpdateChildren（key的重要性)
- vue 参考 snabbdom 实现的 vdom 和diff

vdom

- 用 JS 模拟 DOM 结构（vnode）
- 新旧vnode对比，得出最小的更新范围，最后更新 DOM
- 数据驱动视图的模式下，有效控制 DOM 操作

diff 算法

- Diff 算法是 vdom 中最核心、最关键的部分 
- diff 算法能在日常使用 vue react 中体现出来(如 key)

树 diff 的时间复杂度 O(n^3)

- 第一，遍历tree1；第二，遍历 tree2
- 第三，排序
- 1000个节点，要计算 1 亿次，算法不可用

优化时间复杂度到 O(n)

- 只比较同一层级，不跨级比较
- Tag 不相同，则直接删掉重建，不再深度比较
- Tag 和 key , 两者都相同，则认为是相同节点，不再深度比较

### 模板编译

- 模板是 vue 开发中最常用的部分，即与使用相关联的原理
- 它不是html，有指令、插值、JS 表达式，到底是什么？
- 面试不会直接问，但会通过”组件渲染和更新过程“考察

模板编译

- 前置知识：JS 的 with 语法
- vue template compiler 将模板编译为 render 函数
- 执行 render 函数生成 vnode

with语法

- 改变 {} 内自由变量的查找规则，当做 obj 属性来查找
- 如果找不到匹配的 obj 属性，就会报错
- With 要慎用，它打破了作用域规则，易读性变差

编译模板

- 模板不是 html，有指令、插值、JS 表达式，能实现判断、循环
- html 是标签语言，只有 JS 才能实现判断、循环(图灵完备)
- 因此，模板一定是转换为某种 JS 代码，即编译模板

总结

- 模板编译为 render 函数，执行 render 函数返回 vnode
- 基于 vnode 再执行 patch 和 diff
- 使用 webpack vue-loader，会在开发环境下编译模板(重要)

vue 组件中使用 render 代替 template

- 模板编译就是 render 函数
- 在一些复杂情况下，不能用 template，可以考虑用 render

总结

- with 语法
- 模板到 render 函数，再到 vnode，再到渲染和更新
- vue 组件可以用 render 代替 template

### 组件渲染/更新过程

- 一个组件渲染到页面，修改 data 触发更新(更新视图)
- 初次渲染过程
  - 解析模板为 render 函数（或在开发环境下已完成，vue-loader）
  - 触发响应式，监听 data 属性 getter setter
  - 执行 render 函数(会触发getter)，生成 vnode，patch(elem, vnode)
- 更新过程
  - 修改 data，触发 setter（此前在 getter 中已被监听）
  - 重新执行 render 函数，生成 newVnode
  - patch(vnode, newVnode)
- 异步渲染
- - $nextTick
  - 汇总 data 的修改，一次性更新视图
  - 减少 DOM 操作次数，提高性能

<img src="http://cdn.wangtongmeng.com/20231012163717.png" style="zoom:33%;" />

### 前端路由

路由模式 hash、history

hash 的特点

- hash 变化会触发网页跳转，即浏览器的前进、后退
- hash 变化不会刷新页面，spa 必须得特点
- hash 永远不会提交到 server 端

H5 history

- 用 url 规范的路由，但跳转时不刷新页面
- history.pushState
- window.onpopstate

总结

- hash - window.onhashchange
- H5 history - history.pushState 和 window.onpopstate
- H5 history 需要后端支持

两者选择

- to B 的系统推荐用 hash，简单易用，对 url 规范不敏感
- to C 的系统，可以考虑选择 H5 history，但需要服务端支持

## Vue3

功能

- createApp
- emits 属性
- 多事件处理
- Fragment
- 移除 .sync 改为 v-model 参数
- 异步组件的引用方式
- 移除 filter
- Teleport
- Suspense
- Composition Api
  - reactive
  - ref toRef toRefs
  - readonly
  - computed
  - watch watchEffect
  - 钩子函数生命周期

原理

- Proxy 实现响应式
- 编译优化
  - PatchFlag 静态标记
  - HoistStatic 静态提升
  - CacheHandler 缓存事件
  - SSR 优化
  - Tree-shaking 优化

Vite

- ES6 Moudle

### Compostion API 对比 Options API

### 如何理解 ref toRef 和 toRefs

Ref

- 是什么
  - 生成值类型的响应式数据
  - 可用于模板和 reactive(会自动取值，不需要.value)
  - 通过 .value修改值
- 最佳使用方式
- 进阶，深入理解

toRef

- 针对一个响应式对象(reactive封装)的prop
- 创建一个ref，具有响应式
- 两者保持引用关系

toRefs

- 将响应式对象(reactive封装)转换为普通对象
- 对象的每个prop 都是对应的ref
- 两者保持引用关系

合成函数返回响应式对象（解构）

![image-20231013075153869](/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013075153869.png)

最佳使用

- 用 reactive 做对象的响应式，用 ref 做值类型响应式
- setup 中返回 toRefs(state)，或者toRef(state, 'xxx')
- ref 的变量命名都用 xxxRef
- 合成函数返回响应式对象时，使用 toRefs，方便解构

进阶，深入理解

- 为何需要 ref ？
  - 返回值类型，会丢失响应式
  - 在 setup、computed、合成函数，都有可能返回值类型
- 为何需要 .value ？
  - ref 是一个对象(不丢失响应式)，value 存储值
  - 通过 .value 属性的 get 和 set 实现响应式
  - 用于模板、reactive 时，不需要 .value，其他情况都需要
- 为何需要 toRef toRefs ？
  - 初衷：不丢失响应式的情况下，把对象数据 分解(解构)/扩散
  - 前提：针对的是响应式对象(reactive 封装的) 非普通对象
  - 注意：不创造响应式，而是延续响应式

总结

- ref toRef toRefs 是什么
- 最佳使用方式
- 原理

### Vue3 和 JSX

- Vue3 中 JSX 的基本使用
  - 基本使用
  - 使用 .jsx 格式文件和 defineComponent
  - 引用自定义组件，传递属性
- JSX 和 template 的区别
  - 语法有很大区别
    - JSX 本质就是 js 代码，可以使用 js 的任何能力
    - template 只能嵌入简单的 js 表达式，其他需要使用指令，如 v-if
    - JSX 已经成为 ES 规范，template 还是 Vue 自家规范
  - 本质是相同的
    - 都会被编译成 js 代码(render函数)
  - 具体示例：插值，自定义组件，属性和事件，条件和循环
- JSX 和 slot(体会 JSX 的优越性)
  - slot 是 Vue 发明的概念，为了完善 tempalte 的能力

### script setup（vue>=3.2）

- Vue3 引入了 composition API
- composition API 最重要的是 setup 函数
- 基本使用
  - 顶级变量、自定义组件，可以直接用于模板
  - 可正常使用 ref reactive computed 等能力
  - 和其他 `<script>` 同时使用
- 属性和事件
  - defineProps
  - defineEmits
- defineExpose
  - 暴露数据给父组件

总结

- 基本使用，`<script>`写在`<tempalte>`前面
- 定义属性 defineProps，定义事件 defineEmits
- DefineExpose 暴露数据给父组件

## 面试题

### v-show 和 v-if 的区别

- v-show 通过 css display 控制显示和隐藏
- v-if 组件真正的渲染和销毁，而不是显示和隐藏
- 频繁切换显示状态用 v-show，否则用 v-if

### 为何 v-for 中要用 key

- 必须用 key，且不能是 index 和 random
- diff 算法中通过 tag 和 key 来判断，是否是 sameNode
- 减少渲染次数，提升渲染性能

### 描述  Vue 组件生命周期（有父子组件的情况）

- 单组件生命周期图
- 父子组件生命周期关系

### Vue 组件如何通讯

- 父子组件 props 和 this.$emit
- 自定义事件 event.$on event.$off event.$emit
- vuex

### 描述组件渲染和更新的过程

### 双向数据绑定 v-model 的实现原理

- input 元素的 value = this.name
- 绑定 input 事件 this.name = $event.target.value
- data 更新触发 re-render

### 对 MVVM 的理解

### computed 特点

- 缓存，data 不变不会重新计算
- 提高性能

### 为何组件 data 必须是一个函数？

### ajax 请求应该放在哪个生命周期

- mounted
- JS 是单线程的，ajax 异步获取数据
- 放在 mounted 之前没有用，只会让逻辑更加混乱

### 如何将组件所有 props 传递给组件

- $props
- `<User v-bind="$props" />`

### 如何自己实现 v-model

### 多个组件有相同逻辑，如何抽离

- mixin 
- 缺点

### 何时要使用异步组件

- 加载大组件
- 路由异步组件

### 何时需要使用 keep-alive

- 缓存组件，不需要重复渲染
- 如多个静态 tab 页的切换
- 优化性能

### 何时需要使用 beforeDestory

- 解绑自定义事件 event.$off
- 清楚定时器
- 解绑自定义的DOM事件，如 window scroll 等

### 什么是作用域插槽

### vuex中 action 和 mutaion 的区别

- aciton 中异步处理，mutation 不可以
- mutaion 做原子操作
- action 可以整合多个 mutaion

### vue-router 常用的路由模式

- hash 默认
- H5 history(需要服务端支持)

### 如何配置 vue-router 异步加载

通过import的方式

<img src="http://cdn.wangtongmeng.com/20231012194421.png" style="zoom:33%;" />

### 请用 vnode 描述一个 DOM 结构

```js
{
  tag: 'div',
  props: {
    className: '',
    id: ''
  },
  children: []
}
```

### 监听 data 变化的核心 API 是什么

- Object.defineProperty
- 深度监听、数组监听
- 缺点

### Vue 如何监听数组变化

- Object.defineProperty 不能监听数组变化
- 重新定义原型，重写 push pop 等方法，实现监听
- Proxy 可以原生支持监听数组变化

### 请描述响应式原理

- 监听 data 变化
- 组件渲染和更新的流程

### diff 算法的时间复杂度

- O(n)
- 在O(n^3)基础上做了一些调整

### 简述 diff 算法过程

- patch(elem, vnode) 和 patch(vnode, newVnode)
- patchVnode 和 addVnodes 和 removeVnodes
- updateChildren (key 的重要性)

### Vue 为何是异步渲染，$nextTick 何用？

- 异步渲染(以及合并 data修改)，以提高渲染性能
- $nextTick 在 DOM 更新完之后，触发回调

### Vue 常见性能优化

- 合理使用 v-show 和 v-if
- 合理使用 computed
- v-for 时加 key，以及避免和 v-if 同时使用
- 自定义事件、DOM事件及时销毁
- 合理使用异步组件
- 合理使用 keep-alive
- data 层级不要太深
- 使用 vue-loader 在开发环境做模板编译(预编译)
- webpack 层面的优化
- 前端通用的性能优化，如图片懒加载
- 使用 SSR

## 

## Vue3面试题

### Vue3 比 Vue2有什么优势？

- 性能更好
- 体积更小
- 更好的 ts 支持
- 更好的代码组织
- 更好的逻辑抽离
- 更多新功能

### 描述 Vue3 生命周期

- Options API 生命周期
  - BeforeDestroy 改为 beforeUnmount
  - Destroyed 改为 unmounted
  - 其他沿用vue2的生命周期
- Composition API 生命周期
  - setup相当于beforeCreate和created

### 如何看待 Composition API 和 Options API

- Composition API 带来了什么
  - 更好的代码组织
  - 更好的逻辑复用(面试题)
  - 更好的类型推导
- Compostion API 和 Options API 如何选择
  - 不建议共用，容易混乱
  - 小型项目、业务逻辑简单，用 Options API
  - 中大型项目、逻辑复杂，用 Composition API

### 如何理解 ref toRef 和 toRefs

Ref

- 是什么
  - 生成值类型的响应式数据
  - 可用于模板和 reactive(会自动取值，不需要.value)
  - 通过 .value修改值
- 最佳使用方式
- 进阶，深入理解

toRef

- 针对一个响应式对象(reactive封装)的prop
- 创建一个ref，具有响应式
- 两者保持引用关系

toRefs

- 将响应式对象(reactive封装)转换为普通对象
- 对象的每个prop 都是对应的ref
- 两者保持引用关系

合成函数返回响应式对象（解构）

![image-20231013075153869](/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013075153869.png)

最佳使用

- 用 reactive 做对象的响应式，用 ref 做值类型响应式
- setup 中返回 toRefs(state)，或者toRef(state, 'xxx')
- ref 的变量命名都用 xxxRef
- 合成函数返回响应式对象时，使用 toRefs，方便解构

### Vue3 升级了哪些重要的功能

- createApp
- Emits 属性
- 生命周期
- 多事件
- Fragment
- 移除 .sync
- 异步组件的写法
- 移除 filter
- Teleport
- Suspense
- Composition API

createApp

<img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013101122828.png" alt="image-20231013101122828" style="zoom:33%;" />

emits属性

<img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013101152098.png" alt="image-20231013101152098" style="zoom:25%;" />

多事件处理

![image-20231013101431227](/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013101431227.png)

Fragment

![image-20231013101501380](/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013101501380.png)

移除 .sync

<img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013101545880.png" alt="image-20231013101545880" style="zoom:25%;" />

异步组件

![image-20231013101640605](/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013101640605.png)

Teleport

<img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013101854652.png" alt="image-20231013101854652" style="zoom:25%;" />

Suspense

<img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013101959000.png" alt="image-20231013101959000" style="zoom:25%;" />

Composition API

- reactive
- ref 相关
- readonly
- watch 和 watchEffect
- setup
- 生命周期钩子函数

### Composition API 如何实现代码逻辑复用

- 抽离逻辑代码到一个函数
- 函数命名约定为 useXxx格式(React Hooks也是)
- 在setup中引用 useXxx 函数

### Vue3 如何实现响应式

- 回顾 Vue 2.x 的 Object.defineProperty

  - 缺点
    - 深度监听需要一次性递归
    - 无法监听新增属性/删除属性(Vue.set Vue.delete)
    - 无法监听数组，需要特殊处理

- 学习 Proxy 语法

  - 基本使用
  - Reflect
  - 实现响应式

- Vue3 如何用 Proxy 实现响应式

  -  深度监听，性能更好(懒监听，用到了才监听)
  - 可监听新增/删除属性
  - 可监听数组变化

  

基本使用

<img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013104301985.png" alt="image-20231013104301985" style="zoom: 25%;" />

Reflect作用(非考点)

- 和 Proxy 能力一一对应
- 规范化、标准化、函数式
- 代替Object 的工具函数

总结

- Proxy 能规避 Object.defineProperty 的问题
- Proxy 无法兼容所有浏览器，无法polyfill

### watch 和 watchEffect的区别是什么

- 两者都可监听 data 属性变化
- watch 需要明确监听哪个属性
- watchEffect 会根据其中的属性，自动监听其变化

### setup 中如何获取组件实例

- 在 setup 和其他 Composition API 中没有 this
- 可通过 getCurrentInstance 获取当前实例
- 若使用 Options API 可照常使用 this

###  Vue3为何比 Vue2快

https://template-explorer.vuejs.org/

- Proxy 响应式
- PatchFlag
  - 编译模板时，动态节点做标记
  - 标记，分为不同的类型，如 TEXT PROPS
  - diff算法时，可以区分静态节点，以及不同类型的动态节点
- HoistStatic
  - 将静态节点的定义，提升到父作用域，缓存起来
  - 多个相邻的静态节点，会被合并起来
  - 典型的拿空间换时间的优化策略
- CacheHandler
  - 缓存事件
- SSR 优化
  - 静态节点直接输出，绕过了 vdom
  - 动态节点，还是需要动态渲染
- tree-shaking
  - 编译时，根据不同的情况，引入不同的API

 <img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013205915026.png" alt="image-20231013205915026" style="zoom:25%;" />

HoistStatic - options 开启hoits

![image-20231013210718754](/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013210718754.png)

相邻静态节点很多的时候，会合并

![image-20231013211600883](/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231013211600883.png)

CacheHandler

```vue
<div @click="clickHandler"></div>
```

编译后 - 选择  CacheHandler Options

```js
import { openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", {
    onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.clickHandler && _ctx.clickHandler(...args)))
  }))
}

// Check the console for the AST
```

SSR

```vue
<div>
  <span>hello vue3</span>
  <span>hello vue3</span>
  <span>hello vue3</span>
  <span>{{msg}}</span>
</div>
```

开启SSR，编译后

```js
import { mergeProps as _mergeProps } from "vue"
import { ssrRenderAttrs as _ssrRenderAttrs, ssrInterpolate as _ssrInterpolate } from "vue/server-renderer"

export function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _cssVars = { style: { color: _ctx.color }}
  _push(`<div${
    _ssrRenderAttrs(_mergeProps(_attrs, _cssVars))
  } scope-id><span scope-id>hello vue3</span><span scope-id>hello vue3</span><span scope-id>hello vue3</span><span scope-id>${
    _ssrInterpolate(_ctx.msg)
  }</span></div>`)
}

// Check the console for the AST
```

### Vite 是什么 

- 一个前端打包工具，Vue 作者发起的项目
- 优势：开发环境下无需打包，启动快
- 为何启动快？
  - 开发环境使用 ES6 Module，无需打包——fzihky
  - 生产环境使用 rollup，并不会快很多

### Composition API 和 React Hooks 的对比

- 前者 setup 只会被调用一次，而后者函数会被多次调用
- 前者无需 useMemo useCallback，因为 setup 只调用一次
- 前者无需顾虑调用顺序，而后者需要保证 hooks 的顺序一致
- 前者 reactive + ref 比后者 useState，更难理解

## 核心思想

###  说说你对双向绑定的理解，以及它的实现原理

## 基础

### v-if和v-for哪个优先级更高？

### Vue组件data为什么必须是个函数？

### 函数组件的优势

### Vue中的过滤器了解吗？过滤器的应用场景有哪些？

### v-once的使用场景有哪些

### Vue中.sync修饰符的作用？

### Vue中slot是如何实现的？什么时候使用它？

### Vue.use是干什么的？

### Vue.extend方法的作用？

### Vue.mixin的使用场景和原理

### Vue中递归组件理解

### 组件中写name选项有哪些好处及作用？

## 生命周期

### Vue的生命周期方法有哪些？一般在哪一步发送请求及原因

## Diff算法

### Vue中diff算法原理

### 请说明Vue中key的作用和原理，谈谈你对它的理解

## vue-router

## 数据管理

## 性能优化







