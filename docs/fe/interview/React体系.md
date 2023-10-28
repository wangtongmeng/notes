## React 基础

- JSX 语法
- 条件
- 列表渲染
- 事件
- 组件和 props（类型检查）
- state 和 setState
- 组件生命周期

## React 高级特性

- 函数组件
  - 纯函数，输入 props，输出 JSX
  - 没有实例，没有生命周期，没有 state
  - 不能扩展其他方法
- 非受控组件
  - ref
  - defaultValue defaultChecked
  - 手动操作 DOM 元寿
  - 使用场景
    - 必须手动操作 DOM 元素，setState 实现不了
    - 文件上传 `<input type=file />`
    - 某些富文本编辑器，需要传入 DOM 元素
  - vs 受控组件
    - 优先使用受控组件，符合 React 设计原则
    - 必须操作 DOM 时，再使用非受控组件
- Portals
  - 组件默认会按照既定层次渲染
  - 如何让组件渲染到父组件以外？
  - 使用场景
    - overflow: hidden
    - 父组件 z-index 值太小
    - fixed 需要放在 body 第一层级
- context
  - 公共信息（语音、主题）如何传递给每个组件？
  - 用 props 太繁琐
  - 用 redux 小题大做
- 异步组件（性能优化）
  - import()
  - React.lazy
  - React.Suspense
- 性能优化
  - 回顾setState 不可变值的特性
  - shouldComponentUpdate(简称 SCU)
    - SCU 默认返回 true，即 React 默认重新渲染所有子组件
    - 必须配合“不可变值”一起使用
    - 可先不用 SCU，有性能问题时再考虑使用
  - PureComponent 和 React.memo
    - PureComponent，SCU 中实现了浅比较
    - memo，函数组件中的 PureComponent
    - 浅比较已适用大部分情况（尽量不要做深度比较）
  - 不可变值 immutable.js
    - 彻底拥抱“不可变质”
    - 基于共享数据（不是深拷贝），速度好
    - 有一定的学习和迁移成本，按需使用
  - 总结
    - 面试重点，且涉及 React设计理念
    - SCU PureComponent React.memo immutable.js
    - 按需使用 & state层级不要过多
- 高阶组件HOC
  - 公共逻辑的抽离
  - Mixin，已被React废弃
  - 高阶组件 HOC 
  - Render Props
- Render Props

## React Hooks

- state hooks
- effect hooks
- 其他 hooks
- 自定义 hooks
- 组件逻辑复用
- 规范和注意事项

函数组件的特点

- 没有组件的实例
- 没有生命周期
- 没有 state 和 setState，只能接收 props

Class 组件的问题

- 大型组件很难拆分和重构，很难测试（即 class 不易拆分）
- 相同业务逻辑，分散到各个方法中，逻辑混乱（例如 didMount，unmount的逻辑）
- 复用逻辑变的复杂，如 Mixins（废弃）、HOC、Render Props

React 组件更易用函数表达

- React 提倡函数式编程，view = fn(props)
- 函数更灵活，更易拆分，更易测试
- 但函数组件太简单，需要增强能力——Hooks

State Hooks

- 让函数组件实现 state 和 setState
  - 默认函数组件没有 state
  - 函数组件是一个纯函数，执行完即销毁，无法存储 state
  - 需要 State Hook，即把 state 功能“钩”到纯函数中
- useState 使用总结
  - useState(0)传入初始值，返回数组 [state, setState]
  - 通过 state 获取值
  - 通过 setState(1) 修改值

- Hooks命名规范
  - 规定所有的 Hooks 都 use 开头，如 useXxx
  - 自定义 Hook 也要以 use 开头
  - 非 Hooks 的地方，尽量不要使用 useXxx 写法


Effect Hooks

- 让函数组件模拟生命周期
  - 默认函数组件没有生命周期
  - 函数组件是一个纯函数，执行完即销毁，自己无法实现生命周期
  - 使用 Effect Hook 把生命周期 “钩” 到纯函数中
- useEffect使用
  - 模拟 componentDidMount - useEffect 依赖 []
  - 模拟 componentDidUpdate - useEffect无依赖，或者依赖[a,b]
  - 模拟 componentWillUnMount - useEffect 中返回一个函数
- useEffect 让纯函数有了副作用
  - 默认情况下，执行纯函数，输入参数，返回结果，无副作用
  - 所谓副作用，就是对函数之外造成影响，如设置全局定时任务
  - 而组件需要副作用，所以需要 useEffect “钩”到纯函数中
- useEffect 中返回函数 fn
  - useEffect 依赖 []，组件销毁是执行 fn，等于 willUnMount
  - useEffect 无依赖或依赖 [a,b]，组件更新时执行 fn
  - 即，下一次执行 useEffect 之前，就会执行 fn，无论更新或卸载

小结

- 函数组件更适合 React 组件，但需要 Hooks增强功能
- useState 可实现 state 和 setState
- useEffect 可模拟组件主要的生命周期

其他 Hooks

- useRef
- useContext
- useReducer
  - useReducer 和 redux的区别
    - useReducer 是 useState 的替代方案，用于 state 复杂变化
    - useReducer 是单个组件状态管理，组件通讯还需要 props
    - redux 是全局的状态管理，多组件共享数据
- useMemo
- useCallback
  - useMemo 缓存数据
  - useCallback 缓存函数
  - 两者是 React Hooks 的常见优化策略

自定义 Hooks

- 封装通用的功能
  - 本质上一个函数，以 use 开头（重要）
  - 内部正常使用 useState useEffect  或者其他 Hooks
  - 自定义返回结果，格式不限

- 开发和使用第三方 Hooks
- 自定义 Hook 带来了无限的扩展性，解耦代码

 Hooks 使用规范

- 再次强调命名规范 useXxx
- Hooks 使用规范，重要！
- 关于 Hooks 的调用顺序
  - 无论是 render 还是 re-render，Hooks 调用顺序必须一致
  - 如果 Hooks 出现在循环、判断里，则无法保证顺序一致
  - Hooks 严重依赖于调用顺序！
- 只能用于 React 函数组件和自定义 Hook 中，其他地方不可以
- 只能用于顶层代码，不能在循环、判断中使用 Hooks
- eslint 插件 eslint-plugin-react-hooks 

Hooks 做组件逻辑复用的好处

- 完全符合 Hooks 原有规则，没有其他要求，易理解记忆
- 变量作用域明确
- 不会产生组件嵌套

React Hooks 注意事项

- useState 初始化值，只能第一次有效，如果想修改值，只能用对应的setState
- useEffect 内部不能修改 state（当依赖项为空时）
- useEffect 可能出现死循环，如依赖值是引用类型时，解决方案就是拆开传[obj.a, obj.b]，在内部重新组合

## React 原理

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

  

## Redux 使用

- 不可变值，纯函数
- 面试常考
- 基本概念
- 单向数据流
- React-redux
- 异步action
- 中间件

基本概念

- store state
- action
- reducer

单向数据流概述

- dispatch(action)
- reducer -> newState
- Subsribe 触发通知

React-Redux

- Provider
- connect
- mapStateToProps mapDispatchToProps

异步 aciton

- dispatch是同步的，异步action其实就是先执行异步逻辑，再执行dispatch，可以通过中间件（redux-thunk、redux-promise、redux-saga）来实现

redux中间件

![](http://cdn.wangtongmeng.com/20231009070751.png)

redux数据流图

<img src="http://cdn.wangtongmeng.com/20231009071205.png" style="zoom:33%;" />

## React-router 使用

- 路由模式（hash、H5 history）
- 路由配置(动态路由，懒加载)
- 基本使用

路由模式

- hash模式（默认），如 `http:abc.com/#/user/10`
- H5 history 模式，如 `http://abc.com/user/20`
- 后者需要 server端支持（404返回首页，再由前端切换路由）

## React 面试题

### react 概念

#### 说说你对react的理解

- 是什么：React是一个用于构建用户界面的 js 库。
- 能干什么：通过组件化的方式构建快速响应的大型 Web 应用程序。
- 如何干的：
  - 声明式渲染：使用声明式的方式编写用户界面。
  - 组件化：把页面拆分为一个个组件，方便视图的拆分和复用，还可以做到高内聚和低耦合
  - 一次学习，随处编写：React可以开发Web、移动端、vR和命令行程序。
- 优缺点：
  - 优点：开发团队和社区强大；一次学习，随处编写；API 比较简洁
  - 缺点：没有官方系统解决方案，选型成本高；过于灵活，不容易写出高质量的应用
- 扩展：JSX 实现声明式；虚拟 DOM 可以实现跨平台；React 使用的设计模式；自己 React 大型架构经验

#### React的设计思想

- 组件化
- 数据驱动视图
- 虚拟DOM

#### 为什么引入jsx

- jsx是js的扩展，可以通过html+js的方式进行UI的描述，最终通过babel编译成 React.createElement （最新版是_jsx）的语法糖
- JSX工作原理：通过babel将jsx解析成ast抽象语法树，再生成code源代码(也就是createElement函数)

#### React中元素和组件的区别

react组件有类组件、函数组件

react元素是通过jsx创建的，一般函数组件的返回值，类似组件的render返回值是react元素

#### 什么是受控组件和非受控组件？

我们稍微了解下什么是受控组件和非受控组件：

- 受控组件：只能通过 React 修改数据或状态的组件，就是受控组件；
- 非受控组件：与受控组件相反，如 input, textarea, select, checkbox 等组件，本身控件自己就能控制数据和状态的变更，而且 React 是不知道这些变更的；

那么如何将非受控组件改为受控组件呢？那就是把上面的这些纯 html 组件数据或状态的变更，交给 React 来操作：

```javascript
const App = () => {
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <>
      <input value={value} onInput={event => setValue(event.target.value)} />
      <input type="checkbox" checked={checked} onChange={event => setChecked(event.target.checked)} />
    </>
  );
};
```

上面代码中，输入框和 checkbox 的变化，均是经过了 React 来操作的，在数据变更时，React 是能够知道的。

### react 基础

#### props 的变动，是否会引起 state hook 中数据的变动？

React 组件的 props 变动，会让组件重新执行，但并不会引起 state 的值的变动。state 值的变动，只能由 setState() 来触发。因此若想在 props 变动时，重置 state 的数据，需要监听 props 的变动，如

```js
const App = props => {
  const [count, setCount] = useState(0);

  // 监听 props 的变化，重置 count 的值
  useEffect(() => {
    setCount(0);
  }, [props]);

  return <div onClick={() => setCount(count + 1)}>{count}</div>;
};
```

#### 说说 setState

- 不可变值
- 可能是异步更新
- 可能会被合并

React <= 17 setState

-  React组件事件：异步更新+合并 state
-  DOM 事件，setTimeout：同步更新，不合并 state

React18 setState

- React组件事件：异步更新+合并 state
- DOM 事件，setTimeout：异步更新，合并 state
- Authmatic Batching 自动批处理

总结

- React <= 17：只有 React组件事件才**批处理**
- React 18：所有事件都自动批处理  Authmatic Batching （操作一致，更加简单）

#### react事件

- 在容器节点上（React16的事件绑定在document上， React17以后事件绑定在container上,**ReactDOM.render(app,container)**），通过事件委托（节约内存）的方式，监听事件
- 合成事件，基于原事件对象做了封装，处理了不同浏览器的兼容问题

#### react组件通信

1. 父组件向子组件通信：props
2. 子组件向父组件通信：回调函数、事件冒泡、Ref、
3. 兄弟组件通信：通过父组件
4. 父组件向后代组件通信：Context
5. 无关组件通信：redux、react-redux、mobx、context

### react 生命周期

#### react 组件的生命周期

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

<img src="http://cdn.wangtongmeng.com/20231022213716.png" style="zoom: 25%;" />

组件生命周期的三个阶段：挂载、更新、卸载阶段

挂载阶段

- constructor 可以进行state和props的初始化
- static getDerivedStateFromProps
- render
- **componentDidMount** 第一次渲染后调用，可以访问DOM，进行异步请求和定时器、消息订阅

更新阶段

- 当组件的props或state变化，或者forceUpdate会触发更新

- static getDerivedStateFromProps

- **shouldComponentUpdate** 返回一个布尔值，默认返回true，可以通过这个生命周期钩子进行性能优化，确认不需要更新组件时调用

  render

  getSnapShotBeforeUpdate

  componentDidUpdate 在组件完成更新后调用

卸载阶段

- componentWillUnmount 组件从DOM中被移除的时候调用

错误捕获

- static getDerivedStateFromError 在errorBoundary中使用

- componentDidCatch

- **render**是class组件中唯一必须实现的方法



- 单组件生命周期
- 父子组件生命周期

### react hooks

#### 为什么会有 React Hooks，它解决了哪些问题？

- 完善函数组件的能力，函数组件更适合 React 组件
- 组件逻辑复用，Hooks 表现更好
- class 复杂组件正在变的费解，不易拆解，不易测试，逻辑混乱
- class组件中，相同的逻辑散落在各处
  - DidMount 和 DidUpdate 中获取数据
  - DiMount 绑定事件，WillUnMount 解绑事件
  - 使用 Hooks，相同逻辑可分割到一个一个的 useEffect 中

#### React Hooks 如何模拟组件生命周期？

- 模拟 componentDidMount - useEffect 依赖 []
- 模拟 componentDidUpdate - useEffect无依赖，或者依赖[a,b]
- 模拟 componentWillUnMount - useEffect 中返回一个函数
  - useEffect 依赖 []，组件销毁是执行 fn，等于 willUnMount
  - useEffect 无依赖或依赖 [a,b]，组件更新时执行 fn
  - 即，下一次执行 useEffect 之前，就会执行 fn，无论更新或卸载

#### 如何自定义 Hooks？

#### 使用 React Hooks 遇到哪些坑？

- useState 初始化值，只能第一次有效，如果想修改值，只能用对应的setState
- useEffect 内部不能修改 state（当依赖项为空时）
- useEffect 可能出现死循环，如依赖值是引用类型时，解决方案就是拆开传[obj.a, obj.b]，在内部重新组合

#### Hooks 相比 HOC 和 Render Prop 有哪些优点？

- 完全符合 Hooks 原有规则，没有其他要求，易理解记忆
- 变量作用域明确
- 不会产生组件嵌套

#### 为什么不能在条件和循环里使用Hooks?

因为在每次组件渲染时，Hooks的调用顺序必须是固定的，因为 hooks 为了在函数组件中引入状态，维护了一个有序表。而条件和循环语句会导致hooks的顺序发生错乱，从而发生取值和更新值是发生错误。

#### 为什么不能在函数组件外部使用Hooks?

函数组件本身是纯函数，Hooks是为了是函数组件具备处理状态和副作用的能力。

Hooks只能在 React 函数组件的顶层作用域中使用，而不能在函数组件的外部使用。

不能在函数组件外部使用 Hooks原因：

- 调用顺序的依赖：React 依赖于 Hooks 的调用顺序来追踪组件的状态和副作用。

#### React Hooks的状态保存在了哪里?

- React 组件对应 一个 Fiber，状态存储在 Fiber 的 memoizedState 字段中。
- 每个 Hook 的状态以链表的形式组织起来

#### 为什么传入二次相同的状态，函数组件不更新?

当传入相同的状态值给函数组件时，函数组件可能不会触发重新渲染，这是因为 React 使用浅比较来判断状态是否发生变化。这种行为是为了提高性能，避免不必要的渲染操作。

#### 函数组件的useState和类组件的setState有什么区别?

### react 原理

#### 什么是 fiber，解决了什么问题

在React16以前，React更新是通过**树的深度优先遍历**完成的，遍历是不能中断的，当树的层级深就会产生栈的层级过深，页面渲染速度变慢的问题，为了解决这个问题引入了fiber。

React16引入了Fiber，它是一个链表结构，返回了return、children、siblings，分别代表父fiber，子fiber和兄弟fiber，随时**可中断**。

**应用目的**
实现**增量渲染**，增量渲染指的是把一个渲染任务分解为多个渲染任务，而后将其分散到多个帧里。增量渲染是为了实现任务的可中断、可恢复，并按优先级处理任务，从而达到更顺滑的用户体验。

**Fiber的可中断、可恢复怎么实现的**

***fiber***是协程，是比线程更小的单元，可以被人为中断和恢复，当react更新时间超过1帧时，会产生视觉卡顿的效果，因此我们可以通过fiber把浏览器渲染过程分段执行，每执行一会就让出主线程控制权，执行优先级更高的任务

fiber是一个链表结构，它有三个指针，分别记录了当前节点的下一个兄弟节点，子节点，父节点。当遍历中断时，它是可以恢复的，只需要保留当前节点的索引，就能根据索引找到对应的节点

**Fiber更新机制**

**初始化**

1. 创建fiberRoot（React根元素）和rootFiber(通过ReactDOM.render或者ReactDOM.createRoot创建出来的)
2. 进入beginWork

**workInProgress**:正在内存中构建的fiber树叫workInProgress fiber，在第一次更新时，所有的更新都发生在workInProgress树，在第一次更新后，workInProgress树上的状态是最新状态，它会替换current树

**current**:正在视图层渲染的树叫current fiber树

```ini
ini复制代码currentFiber.alternate = workInProgressFiber
workInProgressFiber.alternate = currentFiber
```

1. 深度调和子节点，渲染视图

在新建的alternate树上，完成整个子节点的遍历，包括fiber的创建，最后会以workInProgress树最为最新的渲染树，fiberRoot的current指针指向workInProgress使其变成current fiber，完成初始化流程

**更新**

1. 重新创建workInProgress树，复用当前current树上的alternate，作为新的workInProgress

渲染完成后，workInProgress树又变成current树

**双缓冲模式**

话剧演出中，演员需要切换不同的场景，以一个一小时话剧来说，在舞台中切换场景，时间来不及。一般是准备两个舞台，切换场景从左边舞台到右边舞台演出

在计算机图形领域，通过让图形硬件交替读取两套缓冲数据，可以实现画面的无缝切换，减少视觉的抖动甚至卡顿。

react的current树和workInProgress树使用双缓冲模式，可以减少fiber节点的开销，减少性能损耗

**React渲染流程**

如图，React用JSX描述页面，JSX经过babel编译为render function，执行后产生VDOM，VDOM不是直接渲染的，会先转换为fiber，再进行渲染。vdom转换为fiber的过程叫reconcile，转换过程会创建DOM，全部转换完成后会一次性commit到DOM，这个过程不是一次性的，而是可打断的，这就是fiber架构的渲染流程

vdom（React Element对象）中只记录了子节点，没有记录兄弟节点，因此渲染不可打断

fiber（fiberNode对象）是一个链表，它记录了父节点、兄弟节点、子节点，因此是可以打断的

#### 说一下React setState原理

- react的类组件通过state管理内部状态，而唯一改变状态更新的视图只能通过setState和forceUpdate。
- setState最终也会走forceUpdate。那么要知道的是每个类组件都有一个updater对象用于管理state的变化，当调用setState传入partialState时，会将partialState存入updater中的pendingState中，此时updater又会调用emitUpdate来决定当前是否立即更新，判断条件简单来说是否有nextProps或者updateQueue的isPending是否开启
- updateQueue用于批量管理的updater
- 如果updateQueue的isPending为true，那么就将当前update直接加入updateQueue的队列中，开启isPending的方式可以是自定义方法和生命周期函数等
- 当这些方法执行完毕更新update，调用update的componentUpdate，判断组件的shouldComponentUpdate决定是否调用forceUpdate的进行更新

#### React多个setState调用的原理是什么？

- 1.调用this.setState(newState) 将newState存入pending队列
- 2.判断当前是否处于批量更新的事务流中(通过isBatchingUpdate进行判断)
- 3.如果命中则将当前更新的组件放入dirtyComponents队列中，等待更新的事务流结束后执行
- 4.如果未命中则遍历所有的dirtyComponents,调用updateCompoent更新pending state or props;在更新的过程中会将多个state合并

#### 组件渲染和更新过程

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

React基于Fiber架构渲染，一个Fiber是一个执行单元，React的渲染会在浏览器空闲时间进行，当空闲时间不够时，会将控制权交给浏览器（事件处理、js执行、布局/绘制等），等待下一帧的空闲时间再继续渲染，所以渲染是**异步可中断+增量更新**的

React16+的渲染流程

React工作的三个阶段

- scheduler(调度) 确定最高优的任务并进入reconciler
- reconciler 计算变更的内容
- react-dom renderer(渲染) 把变化的内容更新到DOM上

#### React 中的 DOM-DIFF 算法

在 React17+中 DOM-DIFF 就是根据老的 fiber 树和最新的 JSX 对比生成新的 fiber 树的过程

优化原则：

- **同级对比**：只对同级节点进行对比，如果 DOM 节点跨层级移动，则 React 不会复用
- **比较类型**：不同类型的元素会产出不同的结构 ，会销毁老结构，创建新结构
- **比较key**：可以通过 key 标识移动的元素

具体流程：

- 新节点是单节点：若老节点能复用（type和key相同），则复用老fiber节点，否则删掉生成新的fiber节点。
- 新节点是新多节点：可能更新、删除、新增（增删改）。通过两轮遍历，第一轮遍历主要是处理节点的更新,更新包括属性和类型的更新；第二轮遍历主要处理节点的新增、删除和移动；移动时的原则是尽量少量的移动，如果必须有一个要动，新地位高的不动，新地位低的动。

#### 说一下你对 Virtual DOM 的理解？

- vdom 就是一个描述真实DOM的纯 js 对象，React.createElement 函数所返回的就是一个虚拟 DOM。
- 优点：解决了浏览器兼容性的问题，并且进行了xss处理，跨平台，更新时优化等。
- 缺点：生成vdom消耗内存，首次渲染会有生成虚拟DOM的开销。

#### 并发模式是如何执行的？

React 中的`并发`，并不是指同一时刻同时在做多件事情。因为 js 本身就是单线程的（同一时间只能执行一件事情），而且还要跟 UI 渲染竞争主线程。若一个很耗时的任务占据了线程，那么后续的执行内容都会被阻塞。为了避免这种情况，React 就利用 fiber 结构和时间切片的机制，将一个大任务分解成多个小任务，然后按照任务的优先级和线程的占用情况，对任务进行调度。

- 对于每个更新，为其分配一个优先级 lane，用于区分其紧急程度。
- 通过 Fiber 结构将不紧急的更新拆分成多段更新，并通过宏任务的方式将其合理分配到浏览器的帧当中。这样就能使得紧急任务能够插入进来。
- 高优先级的更新会打断低优先级的更新，等高优先级更新完成后，再开始低优先级更新。

### React18

#### React18有哪些更新

1.并发模式

并发模式不是一个功能，而是一个底层设计。

useDeferredValue和startTransition用来标记一次非紧急更新

2.批量更新





React 的更新都是渐进式的更新，在 React18 中启用的新特性，其实在 v17 中（甚至更早）就埋下了。

1. 并发渲染机制：它可以帮助应用保持响应，根据用户的设备性能和网速进行调整，它通过渲染可中断来修复阻塞渲染机制。在**concurrent模式**中，React可以同时更新多个状态，区别就是使**同步不可中断更新**变成了**异步可中断更新**
2. 新的创建方式：现在是要先通过`createRoot()`创建一个 root 节点，然后该 root 节点来调用`render()`方法；
3. 自动批处理优化：批处理：react18，将**所有事件都进行批处理**，即**多次setState会被合并为1次执行**，提高了性能，在数据层，将多个状态更新合并成一次处理（在视图层，将多次渲染合并成一次渲染）；在react17中，只有react事件会进行批处理，原生js事件、promise，setTimeout、setInterval不会**，在 v18 中所有更新都将自动批处理**，包括 promise 链、setTimeout 、setInterval等异步代码以及原生js事件；
4. startTransition：主动降低优先级。比如「搜索引擎的关键词联想」，用户在输入框中的输入希望是实时的，而联想词汇可以稍稍延迟一会儿。我们可以用 startTransition 来降低联想词汇更新的优先级；

### React 性能优化

#### React Hooks 性能优化？

- useMemo 缓存数据
- useCallback 缓存数据
- 相当于 class 组件的 SCU 和 PureComponent

### 公共数据管理

#### Redux工作原理

使用单例模式实现

Store 一个全局状态管理对象

Reducer 一个纯函数，根据旧state和props更新新state

Action 改变状态的唯一方式是dispatch action

### react-router

#### React-Router工作原理

**BrowserRouter**使用的**HTML5**的**history api**实现路由跳转
**HashRoute**r使用URL的**hash属性**控制路由跳转

**前端通用路由解决方案**

- hash模式

> 改变URL以#分割的路径字符串，让页面感知路由变化的一种模式,通过*hashchange*事件触发

- history模式

> 通过浏览器的history api实现,通过*popState*事件触发



