# React原理

关注和使用相关的原理，如 vdom、jsx、setState

- 函数式编程 
- vdom 和 diff
- Jsx 本质
- 合成事件
- setState batchUpdate
- 组件渲染过程

函数式编程

- 一种编程范式，概念比较多
- 纯函数
- 不可变值
- 回顾 SCU 和 redux代码

vdom 和 diff

- 只同级比较，不跨级比较
- vue2.x vue3.x react 三者实现 vdom细节都不同
- 核心概念和实现思路（考察点），都一样

JSX本质

- JSX 等同于 Vue模板
- Vue模板不是html，jsx也不是js
- 本质是React.createElement，返回vnode
- 第一个参数，可能是组件，也可能是 html tag
- 组件名，首字母必须大写（React规定）

合成事件

- 所有的事件挂载到 document上

- event不是原生的，是 SyntheticEvent 合成事件对象

- 和 Vue 事件不同，和 DOM事件也不同

- 为什么要合成事件机制？

  - 更好的兼容性和跨平台
  - 挂载到 document，减少内存消耗，避免频繁解绑
  - 方便事件的统一管理（如事务机制）

- React17事件绑定到 root（容器）

  - React16绑定到document
  - React17事件绑定到root组件
  - 有利于多个 React 版本并存，例如微前端

  说一下React的batchUpdate机制

  setState和batchUpdate

  - 有时异步（普通使用），有时同步（setTimeout、DOM事件）
  - 有时合并（对象形式），有时不合并（函数形式）

  核心要点

  - setStae主流程
  - batchUpdate机制
  - transaction（事务）机制

  <img src="http://cdn.wangtongmeng.com/20231009100041-9482de.png" style="zoom:50%;" />

  setState 异步还是同步？

  - setState主要看是否命中 batchUpate机制
  - 判断 isBatchingUpdates

  哪些能命中 batchUpdate机制

  - 生命周期（和它调用的函数）
  - React中注册的事件（和它调用的函数）
  - React 可以“管理”的入口

  哪些不能命中 batchUpdate机制

  - setTimeout setInterval 等（和它调用的函数）
  - 自定义的DOM事件（和它调用的函数）
  - React“管不到”的入口

  简述React事务机制

  - transaction 事务机制

  <img src="http://cdn.wangtongmeng.com/20231009100758-2d70d7.png" style="zoom: 33%;" />

  组件渲染和更新过程

  - JSX 如何渲染为页面

  - setState 之后如何更新页面

  - 全流程

    - 组件渲染和更新过程
    - 更新的两个阶段
    - React fiber

    组件渲染过程

    - props state
    - render() 生成 vnode
    - patch(ele, vnode)

    组件更新过程

    - setState(newState) -> dirtyComponents（可能有子组件）
    - render() 生成 newVnode
    - patch（vnode，newVnode）

React-fiber如何优化性能

- 更新的两个阶段

  - 上述的patch 被拆分为两个阶段：
  - reconciliation 阶段 - 执行 diff 算法，纯 JS 计算
  - commit 阶段 - 将 diff 结果渲染 DOM

- 这样分的原因，可能会有性能问题

  - JS是单线程，且和 DOM 渲染共用一个线程
  - 当组件足够复杂，组件更新时计算和渲染都压力大
  - 同时再有 DOM 操作要求（动画，鼠标拖拽等），将卡顿

- 解决方案 fiber

  - 将 reconciliation 阶段进行任务拆分（commit 无法拆分）
  - DOM 需要渲染时暂停，空闲时恢复
  - window.requestIdleCallback

  