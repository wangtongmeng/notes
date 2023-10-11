## React高级特性

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

## React Hooks

- state hooks
- effect hooks
- 其他 hooks
- 自定义 hooks
- 组件逻辑复用
- 规范和注意事项
- 面试题
  - 为什么会有 React Hooks，它解决了哪些问题？
    - 完善函数组件的能力，函数组件更适合 React 组件
    - 组件逻辑复用，Hooks 表现更好
    - class 复杂组件正在变的费解，不易拆解，不易测试，逻辑混乱
    - class组件中，相同的逻辑散落在各处
      - DidMount 和 DidUpdate 中获取数据
      - DiMount 绑定事件，WillUnMount 解绑事件
      - 使用 Hooks，相同逻辑可分割到一个一个的 useEffect 中
  - React Hooks 如何模拟组件生命周期？
    - 模拟 componentDidMount - useEffect 依赖 []
    - 模拟 componentDidUpdate - useEffect无依赖，或者依赖[a,b]
    - 模拟 componentWillUnMount - useEffect 中返回一个函数
      - useEffect 依赖 []，组件销毁是执行 fn，等于 willUnMount
      - useEffect 无依赖或依赖 [a,b]，组件更新时执行 fn
      - 即，下一次执行 useEffect 之前，就会执行 fn，无论更新或卸载
  - 如何自定义 Hooks？
  - React Hooks 性能优化？
    - useMemeo 缓存数据
    - useCallback 缓存数据
    - 相当于 class 组件的 SCU 和 PureComponent
  - 使用 React Hooks 遇到哪些坑？
    - useState 初始化值，只能第一次有效，如果想修改值，只能用对应的setState
    - useEffect 内部不能修改 state（当依赖项为空时）
    - useEffect 可能出现死循环，如依赖值是引用类型时，解决方案就是拆开传[obj.a, obj.b]，在内部重新组合
  - Hooks 相比 HOC 和 Render Prop 有哪些优点？
    - 完全符合 Hooks 原有规则，没有其他要求，易理解记忆
    - 变量作用域明确
    - 不会产生组件嵌套

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
