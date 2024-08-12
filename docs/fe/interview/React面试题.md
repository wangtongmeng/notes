# React 面试题1

## 基础

### 组件之间如何通讯？

- 父子组件 props
- 自定义事件
- Redux 和 Context

### Context 是什么，如何应用？

- 父组件，向它的所有子孙组件传递信息
- 如一些简单的公共信息：主题色、语言等
- 复杂的公共信息，请用 redux、mobx

### shouldComponentUpdate 用途

- 性能优化
- 配合“不可变值”一起使用，否则会出错

### 什么是纯函数？

- 返回一个新值，没有副作用（不会“偷偷”修改其他值）
- 重点：不可变值
- 如 arr1 = arr.slice()

### React 组件生命周期

- 单组件生命周期
- 父子组件生命周期
- 注意 SCU

### React 发起 ajax 应该在那个生命周期

- 同 Vue
- componentDidMount

### 函数组件和 class 组件的区别

- 纯函数，输入 props，输出 JSX
- 没有实例，没有生命周期，没有 state
- 不能扩展其他方法

### 什么是受控组件？

- 表单的值，受 state 控制
- 需要自行监听 onChange，更新 state
- 对比非受控组件

### 多个组件有公共逻辑，如何抽离

- 高阶组件 HOC 
- Render Props

### React 事件和 DOM 事件的区别

- 所有事件都挂载到 document(React >= 17后，挂载到 root 上) 上
- event 不是原生的，是 SyntheticEvent 合成事件对象
- dispatchEvent

## 性能优化相关

### 渲染列表，为何使用 key

- 同 Vue。必须用 key，且不能是 index 和 random
- diff 算法中通过 tag 和 key 来判断，是否是 sameNode
- 减少渲染次数，提高渲染性能

### PureComponent 有何区别

- 实现浅比较的 shouldComponentUpdate
- 性能优化
- 但要结合不可变值使用

### 何时使用异步组件

- 同 Vue
- 加载大组件
- 路由懒加载

### React 性能优化

- 渲染列表时 使用 key
- 自定义事件、DOM 事件及时销毁
- 合理使用异步组件
- 减少函数 bind this 的次数
- 合理使用 SCU PureComponent 和 memo
- 合理使用 Immutable.js
- webpack 层面的优化
- 前端通用的性能优化，如图片懒加载
- 使用 SSR

## 数据管理

### redux 单项数据流

<img src="http://cdn.wangtongmeng.com/20240617150707.png" style="zoom:33%;" />

### redux 如何进行异步请求

- 使用异步 action
- 如何 redux-thunk

## 路由管理

### react-router 如何配置懒加载

<img src="http://cdn.wangtongmeng.com/20240617153958.png" style="zoom:33%;" />

## 场景题

### setState 场景题

```jsx
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};


```

React 16

>1 0
>2 0
>3 2
>4 3

React 18，都是批量更新的了

> 1 0
> 2 0
> 1 0
> 2 0
> 3 1
> 4 1
> 3 1
> 4 1

## 原理

### JSX 的本质

到 `https://www.babeljs.cn/` 做一个测试，将以下 jsx 编译为 js

```js
// JSX 基本用法
const imgElem = <div>
    <p>some text</p>
    <img src={imgUrl}/>
</div>

// JSX style
const styleData = { fontSize: '30px',  color: 'blue' }
const styleElem = <p style={styleData}>设置 style</p>

// JSX 加载组件
const app = <div>
    <Input submitTitle={onSubmitTitle}/>
    <List list={list}/>
</div>

// JSX 事件
const eventList = <p onClick={this.clickHandler}>
    some text
</p>

// JSX list
const listElem = <ul>{this.state.list.map((item, index) => {
    return <li key={item.id}>index {index}; title {item.title}</li>
})}</ul>

```

以上可见，`React.createElement` 就相当于 vue中的 `h` 函数，执行则会返回一个 vnode 结构。

```js
{
    tag: 'div', // 或是一个组件名 Input List 等
    props: {...},
    children: [...] // 或 '...' 其中只有文本
}
```

看 React.createElement 的第一个参数

- 渲染 html 标签时，就是一个字符串， div p img 等
- 渲染组件时，就是一个组件，Input List 等
- React 规定，所有的组件必须大写字母开头，因为 html 标签都是小写字母开头 —— 这样就很好识别 jsx 标签是一个 html tag 还是自定义组件。

如果第一个参数是组件，那就继续去寻找该组件的 render 函数中的 jsx 结构，直到找到最底层，即 html tag 。

```js
// 第一个参数是 List 组件
React.createElement(List, {
  list: list
})

// 找到 List 组件 jsx 结构，继续拆分
React.createElement("ul", null, list.map(
        function (item, index) {
            return React.createElement("li", {
                key: item.id
            }, "title ", item.title)
        }
    )
)
```

总结一下

- JSX 是 React.createElement 的语法糖
- React.createElement 最终返回 vnode
- 其中遇到自定义组件，会继续找其 jsx 结构，继续渲染

最后，将 vnode 结构渲染为 elem ，之前已经讲过，React 这里的过程也是一样的。
React 将组件分为四个类型，分别进行渲染。

- ReactEmptyComponent - 空组件 null undefined
- ReactDOMComponent - html 节点
- ReactTextComponent - 文本组件
- ReactCompositeComponent - 自定义组件

------

### 说说你对 Virtual DOM 的理解？

- 虚拟 DOM 就是一个描述真实 DOM 的纯 JS 对象（是什么）
- jsx 经过 babel编译成`React.createElement` 函数，函数返回的就是一个虚拟 DOM （原理）
- 优点
  - 处理了浏览器兼容性问题，避免用户操作真实 DOM，那么又麻烦又容易出错
  - 内容经过了 XSS 处理，可以防范 XSS 攻击
  - 容易实现跨平台开发 Android、iOS、VR 应用
  - 更新的时候可以实现差异化更新，减少更新 DOM 的操作
- 缺点
  - 虚拟 DOM 需要消耗额外的内存
  - 首次渲染其实并不一定会更快

### 事件机制

```js
clickHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()

    console.log('target', event.target) // 指向当前元素，即当前元素触发
    console.log('current target', event.currentTarget) // 指向当前元素，假象！！！

    // 注意，event 其实是 React 封装的。可以看 __proto__.constructor 是 SyntheticEvent
    console.log('event', event)

    // 原生 event 如下。其 __proto__.constructor 是 MouseEvent
    console.log('nativeEvent', event.nativeEvent)
    // 指向当前元素，即当前元素触发
    console.log('nativeEvent target', event.nativeEvent.target)
    // 指向 document ！！！
    console.log('nativeEvent current target', event.nativeEvent.currentTarget)
}
```

通过之前的使用，可以得出

- 1.React 将所有时间都挂载到 document 上（react <= 17），react17绑定在根节点上
- 2.event 不是原生的，是 SyntheticEvent 合成事件

React 自己实现了一套事件机制 —— 合成事件机制

- 事件的绑定和销毁
- 事件的触发和冒泡
- 3.和 DOM 事件不一样

React 事件机制的实现流程

- 示意图
- diapatchEvent
- JSX 渲染时，能知道每个事件和组件的关系，也就能触发到该组件的事件函数

为什么要这样做？

- 为了兼容性和跨平台（仅仅是将事件挂载到 document ，其他都不依赖于 DOM 事件，很独立）
- 挂载到 document ，减少内存消耗，方便事件绑定和解绑（不用再用 removeListener）
- 方便对事件的统一管理，如事务机制 —— 下文介绍

React 17 事件绑定到 root
- React 16 绑定到 document
- React 17 事件绑定到 root 组件
- 有利于多个 React 版本并存，例如微前端

------

### setState 和 batchUpdate

根据之前对 setState 的应用，发现

- 有时异步，有时同步（不受 React 控制的函数中，是同步）
- 连续执行多次 setState ，只会更新一次（异步情况下）
- 传入对象时，会被合并

这部分过程非常复杂，如果从源码入手，反而不太容易讲清楚。另外，由于细节过于复杂，所以再难的面试也不可能考察到那么细致的源码。**所以，我们只需要了解这部分的流程和重点，应对面试应该没有问题**。

这部分的重要知识点：

- setState 主流程
- batchUpdate 机制
- transaction 机制

（解释什么是“事务”，例如数据库的事务操作。即将一组操作当做一个原子操作，例如银行转账）

```js
transaction.initialize = function () {
    console.log('initialize')
}
transaction.close = function () {
    console.log('close')
}

function method(){
    console.log('abc')
}
transaction.perform(method)

// 输出 'initialize'
// 输出 'abc'
// 输出 'close'
```

哪些场景会命中 batchUpdate 机制？

- 生命周期
- React 事件

哪些不会命中 batchUpdate 机制？

- setTimeout 等全局函数
- 自己定义的 DOM 事件

总结 setState 的特点

- 单独看 setState 本身，无所谓同步和异步
- 同步还是异步，取决于是否命中 batchUpdate 机制
- 通过事务机制，控制 isBatchingUpdates

<img src="http://cdn.wangtongmeng.com/20240617143419.png" style="zoom:33%;" />

transaction 机制

<img src="http://cdn.wangtongmeng.com/20240617144409.png" style="zoom:33%;" />

### 组件渲染、更新和 diff 算法

回顾 vdom 的重点知识。

遍历 dirtyComponents 进行更新，组件更新依赖于 vdom 和 diff 算法。

- 根据 newProps 和 newState 执行 render 函数
- 生成 newVnode
- patch(vnode, newVnode) —— 这里并不是一步完成，React 会有更详细的优化，但最终结果和 patch 一样。

更新是分为两个阶段

- reconciliation 阶段。对 dirtyComponent 以及子组件进行 diff ，找出变化部分。这个阶段可以拆分为多个子任务，可以随时暂停和恢复。—— 至于为何要拆分，继续往下看。
- commit 阶段。对当前 diff 获取的变化部分，进行 DOM 操作。一次性执行完成，不能拆分。

暴露性能问题 —— **注意，是在某些复杂的情况下，你不一定能遇到！**

- JS 是单线程，而且和 DOM 渲染共用一个线程
- 当前项目复杂、组件数量多时，组件更新将占据大量 JS 计算
- 此时，如果再有其他的 DOM 渲染需求（如动画、频繁的鼠标键盘操作），将会导致卡顿

解决方案 —— fiber （React 16 之后引入 fiber 架构）

- 对 reconciliation 阶段进行任务拆分，可暂停，可恢复
- 当有 DOM 渲染需求时暂停，空闲时再恢复
- 如何判断浏览器空闲？—— window.requestIdleCallback https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback

注意，fiber 是 React 内部的运行机制，作为使用者体会不到，甚至有些情况都触发不到 fiber 机制。但是我们得知道它的基本情况：what why how

## 框架对比

### 请说一下你对 React 的理解？

- `React`是一个用于构建用户界面的 JavaScript 库（是什么）
- 可以通过组件化的方式构建 构建快速响应的大型`Web`应用程序（能干什么）
- 声明式的、组件化、跨平台的
- 优点：开发团队和社区强大、跨平台（虚拟dom）、api 简洁
- 缺点：没有官方系统解决方案，选型成本高；过于灵活，不容易写出高质量的应用

### React 和 Vue 的区别

相同点

- 都支持组件化
- 都是数据驱动视图
- 都使用 vdom 操作 DOM

不同点

- React 使用 JSX 拥抱 JS，Vue 使用模板拥抱 html
- React 函数式编程，Vue 声明式编程
- React 更多需要自力更生，Vue 把想要的都给你