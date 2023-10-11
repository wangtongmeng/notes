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

## 面试题

### v-show 和 v-if 的区别

### 为何 v-for 中要用 key

### 描述  Vue 组件生命周期（有父子组件的情况）

### Vue 组件如何通讯

### 描述组件渲染和更新的过程

### 双向数据绑定 v-model 的实现原理





