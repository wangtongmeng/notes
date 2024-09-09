# React 面试题

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

## 概念

### 说一下你对React的理解?

- `React`是一个用于构建用户界面的 JavaScript 库
- 可以通过组件化的方式构建 构建快速响应的大型`Web`应用程序
- 声明式、组件化（高内聚、低耦合）、一次学习，随处编写（跨端）
- 优点：开发团队和社区强大；一次学习，随处编写；API简介
- 缺点
  - 没有官方解决方案，选型成本高
  - 过于灵活，不容易写出高质量的应用

### 为什么 React 会引入 JSX ？

- JSX是什么
  - JSX 是一个`JavaScript`的语法扩展,JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式
  - JSX 其实是`React.createElement`的语法糖
- React 想实现什么目的?
  - 需要实现声明式
  - 代码结构需要非常清晰和简洁，可读性强
  - 结构、样式和事件等能够实现高内聚低耦合,方便重用和组合
  - 不想引入新的的概念和语法,只写 JavaScript
- 为什么 JSX 最好
  - Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据
  - 引入太多概念，比如 Angular 就引入了控制器、作用域、服务等概念
- JSX原理
  - 通过 babel编译成 ast 语法树=>createElement或jsx的render函数

### 什么是受控组件和非受控组件？

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

## 基础

### props 的变动，是否会引起 state hook 中数据的变动？

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

### react组件通信

1. 父组件向子组件通信：props
2. 子组件向父组件通信：回调函数、事件冒泡、Ref、
3. 兄弟组件通信：通过父组件
4. 父组件向后代组件通信：Context
5. 无关组件通信：redux、react-redux、mobx、context

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

### React 发起 ajax 应该在那个生命周期

- 同 Vue
- componentDidMount

### 函数组件和 class 组件的区别

相同点

- 它们都可以接收属性并且返回 React 元素

不同点

- 编程思想不同: 类组件需要创建实例，是基于面向对象的方式编程，而函数式组件不需要创建实例，接收输入，返回输出，是基于函数式编程的思路来编写的
- 内存占用：类组件需要创建并保存实例，会占用一定内存，函数组件不需要创建实例，可以节约内存占用
- 捕获特性：函数组件具有值捕获特性（值不变，类组件this.state.number是最新值，函数组件中 number是老值）
- 可测试性: 函数式组件更方便编写单元测试
- 状态: 类组件有自己的实例，可以定义状态，而且可以修改状态更新组件，函数式组件以前没有状态，现在可以使用 useState 使用状态
- 生命周期: 类组件有自己完整的生命周期，可以在生命周期内编写逻辑，函数组件以前没有生命周期，现在可以使用 useEffect 实现类似生命周期的功能
- 逻辑复用: 类组件可以通过继承实现逻辑的复用，但官方推荐组合优于继承，函数组件可以通过自定义 Hooks 实现逻辑的复用
- 跳过更新: 类组件可以通过`shouldComponentUpdate`和`PureComponent`来跳过更新，而函数式组件可以使用`React.memo`来跳过更新
- 发展前景: 未来函数式组件将会成为主流，因为它可以更好的屏蔽 this 问题、规范和复用逻辑、更好的适合时间分片和并发渲染

捕获特性

```jsx
import React from "react";
import ReactDOM from "react-dom";
class ClassComponent extends React.Component {
  state = { number: 0 };
  handleClick = () => {
    setTimeout(() => console.log(this.state.number), 3000); //1
    this.setState({ number: this.state.number + 1 });
  };
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
function FunctionComponent() {
  let [number, setNumber] = React.useState(0);
  let handleClick = () => {
    setTimeout(() => console.log(number), 3000);
    setNumber(number + 1);
  };
  return (
    <div>
      <p>{number}</p>
      <button onClick={handleClick}>+</button>
    </div>
  );
}

let virtualDOM = <FunctionComponent />;
ReactDOM.render(virtualDOM, document.getElementById("root"));
```



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

## React Hooks

### 为什么会有 React Hooks，它解决了哪些问题？

- 完善函数组件的能力，函数组件更适合 React 组件
- 组件逻辑复用，Hooks 表现更好
- class 复杂组件正在变的费解，不易拆解，不易测试，逻辑混乱
- class组件中，相同的逻辑散落在各处
  - DidMount 和 DidUpdate 中获取数据
  - DiMount 绑定事件，WillUnMount 解绑事件
  - 使用 Hooks，相同逻辑可分割到一个一个的 useEffect 中

### React Hooks 如何模拟组件生命周期？

- 模拟 componentDidMount - useEffect 依赖 []
- 模拟 componentDidUpdate - useEffect无依赖，或者依赖[a,b]
- 模拟 componentWillUnMount - useEffect 中返回一个函数
  - useEffect 依赖 []，组件销毁是执行 fn，等于 willUnMount
  - useEffect 无依赖或依赖 [a,b]，组件更新时执行 fn
  - 即，下一次执行 useEffect 之前，就会执行 fn，无论更新或卸载

### 如何自定义 Hooks？

### 使用 React Hooks 遇到哪些坑？

- useState 初始化值，只能第一次有效，如果想修改值，只能用对应的setState
- useEffect 内部不能修改 state（当依赖项为空时）
- useEffect 可能出现死循环，如依赖值是引用类型时，解决方案就是拆开传[obj.a, obj.b]，在内部重新组合

### Hooks 相比 HOC 和 Render Prop 有哪些优点？

- 完全符合 Hooks 原有规则，没有其他要求，易理解记忆
- 变量作用域明确
- 不会产生组件嵌套

### 为什么不能在条件和循环里使用Hooks?

因为在每次组件渲染时，Hooks的调用顺序必须是固定的，因为 hooks 为了在函数组件中引入状态，维护了一个有序表。而条件和循环语句会导致hooks的顺序发生错乱，从而发生取值和更新值是发生错误。

### 为什么不能在函数组件外部使用Hooks?

函数组件本身是纯函数，Hooks是为了是函数组件具备处理状态和副作用的能力。

Hooks只能在 React 函数组件的顶层作用域中使用，而不能在函数组件的外部使用。

不能在函数组件外部使用 Hooks原因：

- 调用顺序的依赖：React 依赖于 Hooks 的调用顺序来追踪组件的状态和副作用。

### React Hooks的状态保存在了哪里?

- React 组件对应 一个 Fiber，状态存储在 Fiber 的 memoizedState 字段中。
- 每个 Hook 的状态以链表的形式组织起来

### 为什么传入二次相同的状态，函数组件不更新?

当传入相同的状态值给函数组件时，函数组件可能不会触发重新渲染，这是因为 React 使用浅比较来判断状态是否发生变化。这种行为是为了提高性能，避免不必要的渲染操作。

### 函数组件的useState和类组件的setState有什么区别?

## 性能优化相关

### React Hooks 性能优化？

- useMemo 缓存数据
- useCallback 缓存数据
- 相当于 class 组件的 SCU 和 PureComponent

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

#### Redux工作原理

使用单例模式实现

Store 一个全局状态管理对象

Reducer 一个纯函数，根据旧state和props更新新state

Action 改变状态的唯一方式是dispatch action

### redux 单项数据流

<img src="http://cdn.wangtongmeng.com/20240617150707.png" style="zoom:33%;" />

### redux 如何进行异步请求

- 使用异步 action
- 如何 redux-thunk

## 路由管理

### react-router 如何配置懒加载

<img src="http://cdn.wangtongmeng.com/20240617153958.png" style="zoom:33%;" />

### React-Router工作原理

**BrowserRouter**使用的**HTML5**的**history api**实现路由跳转
**HashRoute**r使用URL的**hash属性**控制路由跳转

**前端通用路由解决方案**

- hash模式

> 改变URL以#分割的路径字符串，让页面感知路由变化的一种模式,通过*hashchange*事件触发

- history模式

> 通过浏览器的history api实现,通过*popState*事件触发

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

### 请说一下你对 React 合成事件的理解？

事件工作流

- 事件捕获
- 事件目标
- 事件冒泡
- 事件委托
- 先绑定先执行

合成事件

- React 把事件委托到root节点上（react17+），react16是在document上
- 当真实 DOM 元素触发事件,先处理react的捕获事件=>原生js先事件=>冒泡先处理原生js事件=>处理react事件
- React 事件绑定的时刻是在 reconciliation 阶段,会在原生事件的绑定前执行
- 目的和优势
  - 进行浏览器兼容,React 采用的是顶层事件代理机制，能够保证捕获冒泡一致性
  - 事件对象可能会被频繁创建和回收，因此 React 引入事件池,在事件池中获取或释放事件对象(React17 中被废弃)

原生事件和合成事件的顺序

```jsx
import * as React from "react";
import * as ReactDOM from "react-dom";
class App extends React.Component {
  parentRef = React.createRef();
  childRef = React.createRef();
  componentDidMount() {
    this.parentRef.current.addEventListener(
      "click",
      () => {
        console.log("父元素原生捕获");
      },
      true
    );
    this.parentRef.current.addEventListener("click", () => {
      console.log("父元素原生冒泡");
    });
    this.childRef.current.addEventListener(
      "click",
      () => {
        console.log("子元素原生捕获");
      },
      true
    );
    this.childRef.current.addEventListener("click", () => {
      console.log("子元素原生冒泡");
    });
    document.addEventListener(
      "click",
      () => {
        console.log("document原生捕获");
      },
      true
    );
    document.addEventListener("click", () => {
      console.log("document原生冒泡");
    });
  }
  parentBubble = () => {
    console.log("父元素React事件冒泡");
  };
  childBubble = () => {
    console.log("子元素React事件冒泡");
  };
  parentCapture = () => {
    console.log("父元素React事件捕获");
  };
  childCapture = () => {
    console.log("子元素React事件捕获");
  };
  render() {
    return (
      <div
        ref={this.parentRef}
        onClick={this.parentBubble}
        onClickCapture={this.parentCapture}
      >
        <p
          ref={this.childRef}
          onClick={this.childBubble}
          onClickCapture={this.childCapture}
        >
          事件执行顺序
        </p>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
/**
document原生捕获
父元素React事件捕获
子元素React事件捕获
父元素原生捕获
子元素原生捕获
子元素原生冒泡
父元素原生冒泡
子元素React事件冒泡
父元素React事件冒泡
document原生冒泡
 */
```

------

### 请说一下 React 中的渲染流程

设计理念

- 跨平台渲染=>虚拟 DOM
- 快速响应=>异步可中断+增量更新
- React 实现了类似requestIdleCallback的方法，利用空闲的时间进行更新，不影响渲染进行的渲染

fiber

- 我们可以通过某些调度策略合理分配 CPU 资源，从而提高用户的响应速度
- 通过 Fiber 架构，让自己的调和过程变成可被中断。 适时地让出 CPU 执行权，除了可以让浏览器及时地响应用户的交互
- Fiber 是一个执行单元,每次执行完一个执行单元, React 就会检查现在还剩多少时间，如果没有时间就将控制权让出去
- Fiber 是一种数据结构
  - React 目前的做法是使用链表, 每个 VirtualDOM 节点内部表示为一个 Fiber
  - 从顶点开始遍历（深度优先）
  - 如果有第一个儿子，先遍历第一个儿子
  - 如果没有第一个儿子，标志着此节点遍历完成
  - 如果有弟弟遍历弟弟
  - 如果有没有下一个弟弟，返回父节点标识完成父节点遍历，如果有叔叔遍历叔叔
  - 没有父节点遍历结束

React16+

- 调度阶段：[scheduler](https://gitee.com/mirrors/react/tree/v17.0.1/packages/scheduler) 选择高优先级的任务进入 reconciler
- 调和阶段：[reconciler](https://gitee.com/mirrors/react/tree/v17.0.1/packages/react-reconciler) 计算变更的内容，老Fiber和新jsx的diff对比（可中断）
- commit阶段：[react-dom](https://gitee.com/mirrors/react/tree/v17.0.1/packages/react-dom) 把变更的内容渲染到页面上（一次性执行完成，不能拆分）

### 说说 setState

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

### setState 的更新是同步还是异步的？

- 在开发中我们并不能直接通过修改state的值来让界面发生更新
  - 因为修改了state之后，希望React根据最新的State来重新渲染界面，但是这种方式的修改React并不知道数据发生了变化
  - React并没有实现类似于Vue2中的Object.defineProperty或者Vue3中的Proxy的方式来监听数据的变化
  - 必须通过setState来告知React数据已经发生了变化

异步更新

- React在执行setState的时候会把更新的内容放入队列
- 在事件执行结束后会计算state的数据，然后执行回调
- 最后根据最新的state计算虚拟DOM更新真实DOM
- 优点
  - 保持内部一致性。如果改为同步更新的方式，尽管 setState 变成了同步，但是 props 不是
  - 为后续的架构升级启用并发更新,React 会在 setState 时，根据它们的数据来源分配不同的优先级，这些数据来源有：事件回调句柄、动画效果等，再根据优先级并发处理，提升渲染性能
  - setState设计为异步，可以显著的提升性能

早期版本（react16）存在同步执行

- 在React的生命周期函数和合成事件中可以修改批量更新的变量`isBatchingUpdates`
- 可以设置为批量，其它地方如`addEventListener`、`setTimeout和setInterval`里无法设置

### 请说一下 React 中有 DOM-DIFF 算法? 

- 在 React17+中 DOM-DIFF 就是根据老的 fiber 树和最新的 JSX 对比生成新的 fiber 树的过程

React 优化原则

- 只对同级节点进行对比，如果 DOM 节点跨层级移动，则 React 不会复用
- 不同类型的元素会产出不同的结构 ，会销毁老结构，创建新结构
- 可以通过 key 标识移动的元素

具体细节

- 单节点
  - 如果新的节点只有一个的话，key和type不同都会标记老节点为销毁，创建新节点
  - key和type相同，恢复用老的fiber和dom节点
- 多节点
  - 如果新的节点有多个节点的话
  - 节点有可能更新、删除、新增
  - 多节点的时候会经历二轮遍历
  - 第一轮遍历主要是处理节点的更新,更新包括属性和类型的更新
  - 第二轮遍历主要处理节点的新增、删除和移动
  - 移动时的原则是尽量少量的移动，如果必须有一个要动，新地位高的不动，新地位低的动
  - 一一对比，都可复用，只需更新

```jsx
<li key="A" >A</li>

<li key="B" >B</li>
<li key="C" >C</li>
<li key="D" >D</li>
<li key="E" >E</li>
<li key="F" >F</li>
------------------------------
<li key="A"  >A-new</li>

<li key="C"  >C-new</li>
<li key="E"  >E-new</li>
<li key="B"  >B-new</li>
<li key="G"  >G</li>


第一轮循环
A=A能复用，更新A就可以 KEY不一样，则马上跳出第一轮循环


第二轮循环 创建map，key就是元素的key,值就是老的fiber节点
let map = {'B':B,'C':C,,'D':D,'E':E,'F':F};
继续遍历新的节点
C 找到 会给C标记为更新，另外会从map中删除C
map = {'D':D,'F':F}; 还没有被复用的fiber节点
等新的JSX数组遍历完了以后，把map里的fiber节点全部标准为删除 

C节点去map里找 一找有没有key为C的fiber节点
如果有，说明真的位置变了，老节点可以复用(Fiber和DOm元素可以复用)
把C标记更新

如果有删除操作的话，应该先执行
```

### React 中的优先级?

- 不同事件产生的更新优先级不同

React中的优先级

- 事件优先级：按照用户事件的交互紧急程度，划分的优先级
- 更新优先级：事件导致React产生的更新对象（update）的优先级（update.lane）
- 任务优先级：产生更新对象之后，React去执行一个更新任务，这个任务所持有的优先级
- 调度优先级：Scheduler依据React更新任务生成一个调度任务，这个调度任务所持有的优先级

> 前三者属于React的优先级机制，第四个属于`scheduler`的优先级机制

事件优先级

- 离散事件（DiscreteEvent）：click、keydown等，这些事件的触发不是连续的，优先级为 0
- 用户阻塞事件（UserBlockingEvent）：drag、scroll、mouseover等，特点是连续触发，阻塞渲染，优先级为1
- 连续事件（ContinuousEvent）：canplay、error，优先级最高，为2

更新优先级

- setState本质上是调用enqueueSetState,生成一个update对象，这时候会计算它的更新优先级，即update.lane
- 首先找出Scheduler中记录的优先级`schedulerPriority`，然后计算更新优先级

任务优先级

- update会被一个React的更新任务执行
- 任务优先级被用来区分多个更新任务的紧急程度
- 收敛同等优先级的任务调度
- 高优先级任务及时响应

调度优先级

- 一旦任务被调度，那么它就会进入scheduler
- 在Scheduler中，这个任务会被包装一下，生成一个属于Scheduler自己的task，这个task持有的优先级就是调度优先级

### 为什么不能在条件和循环里使用Hooks?

每个组件对应一个Fiber，Fiber会维护一个hooks的单向链表，这是有顺序的，条件判断或循环会影响顺序，导致更新时，在获取老fiber上hooks信息是发生错误

### 为什么不能在函数组件外部使用Hooks?

每个函数组件对应一个fiber，fiber负责维护hooks链表，写在外面没法维护

### React Hooks的状态保存在了哪里?

每个组件对应一个Fiber，Fiber会维护一个hooks的单向链表，这是有顺序的

每个链表节点会存储这个hooks的状态，以及维护一个环形链表记录更新操作

### 为什么传入二次相同的状态，函数组件不更新?

拿到更新操作计算新值时，会对比结果是否变化，如果变化了就不进行后续操作了

### 函数组件的useState和类组件的setState有什么区别?

- `useState` 是 React 的 Hooks API，用于在函数组件中添加状态管理功能。它返回一个状态值和更新函数。
- `setState` 是类组件中的方法，用于更新组件的状态，并且会触发重新渲染。
- 相同点：都是批量更新的
- setState(1) 写两次会更新几次

### useReducer 实现原理

### useState 实现原理

### useEffect 实现原理

### useLayoutEffect 实现原理

### useCallback 实现原理

### useMemo 实现原理

### 什么是 fiber，解决了什么问题

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

### 说一下React setState原理

- react的类组件通过state管理内部状态，而唯一改变状态更新的视图只能通过setState和forceUpdate。
- setState最终也会走forceUpdate。那么要知道的是每个类组件都有一个updater对象用于管理state的变化，当调用setState传入partialState时，会将partialState存入updater中的pendingState中，此时updater又会调用emitUpdate来决定当前是否立即更新，判断条件简单来说是否有nextProps或者updateQueue的isPending是否开启
- updateQueue用于批量管理的updater
- 如果updateQueue的isPending为true，那么就将当前update直接加入updateQueue的队列中，开启isPending的方式可以是自定义方法和生命周期函数等
- 当这些方法执行完毕更新update，调用update的componentUpdate，判断组件的shouldComponentUpdate决定是否调用forceUpdate的进行更新

### React多个setState调用的原理是什么？

- 1.调用this.setState(newState) 将newState存入pending队列
- 2.判断当前是否处于批量更新的事务流中(通过isBatchingUpdate进行判断)
- 3.如果命中则将当前更新的组件放入dirtyComponents队列中，等待更新的事务流结束后执行
- 4.如果未命中则遍历所有的dirtyComponents,调用updateComponent更新pending state or props;在更新的过程中会将多个state合并

### 组件渲染和更新过程

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

### React 中的 DOM-DIFF 算法

在 React17+中 DOM-DIFF 就是根据老的 fiber 树和最新的 JSX 对比生成新的 fiber 树的过程

优化原则：

- **同级对比**：只对同级节点进行对比，如果 DOM 节点跨层级移动，则 React 不会复用
- **比较类型**：不同类型的元素会产出不同的结构 ，会销毁老结构，创建新结构
- **比较key**：可以通过 key 标识移动的元素

具体流程：

- 新节点是单节点：若老节点能复用（type和key相同），则复用老fiber节点，否则删掉生成新的fiber节点。
- 新节点是新多节点：可能更新、删除、新增（增删改）。通过两轮遍历，第一轮遍历主要是处理节点的更新,更新包括属性和类型的更新；第二轮遍历主要处理节点的新增、删除和移动；移动时的原则是尽量少量的移动，如果必须有一个要动，新地位高的不动，新地位低的动。

### 说一下你对 Virtual DOM 的理解？

- vdom 就是一个描述真实DOM的纯 js 对象，React.createElement 函数所返回的就是一个虚拟 DOM。
- 优点：解决了浏览器兼容性的问题，并且进行了xss处理，跨平台，更新时优化等。
- 缺点：生成vdom消耗内存，首次渲染会有生成虚拟DOM的开销。

### 并发模式是如何执行的？

React 中的`并发`，并不是指同一时刻同时在做多件事情。因为 js 本身就是单线程的（同一时间只能执行一件事情），而且还要跟 UI 渲染竞争主线程。若一个很耗时的任务占据了线程，那么后续的执行内容都会被阻塞。为了避免这种情况，React 就利用 fiber 结构和时间切片的机制，将一个大任务分解成多个小任务，然后按照任务的优先级和线程的占用情况，对任务进行调度。

- 对于每个更新，为其分配一个优先级 lane，用于区分其紧急程度。
- 通过 Fiber 结构将不紧急的更新拆分成多段更新，并通过宏任务的方式将其合理分配到浏览器的帧当中。这样就能使得紧急任务能够插入进来。
- 高优先级的更新会打断低优先级的更新，等高优先级更新完成后，再开始低优先级更新。



## React18

### React18有哪些更新

1.并发模式

并发模式不是一个功能，而是一个底层设计。

useDeferredValue和startTransition用来标记一次非紧急更新

2.批量更新

React 的更新都是渐进式的更新，在 React18 中启用的新特性，其实在 v17 中（甚至更早）就埋下了。

1. 并发渲染机制：它可以帮助应用保持响应，根据用户的设备性能和网速进行调整，它通过渲染可中断来修复阻塞渲染机制。在**concurrent模式**中，React可以同时更新多个状态，区别就是使**同步不可中断更新**变成了**异步可中断更新**
2. 新的创建方式：现在是要先通过`createRoot()`创建一个 root 节点，然后该 root 节点来调用`render()`方法；
3. 自动批处理优化：批处理：react18，将**所有事件都进行批处理**，即**多次setState会被合并为1次执行**，提高了性能，在数据层，将多个状态更新合并成一次处理（在视图层，将多次渲染合并成一次渲染）；在react17中，只有react事件会进行批处理，原生js事件、promise，setTimeout、setInterval不会**，在 v18 中所有更新都将自动批处理**，包括 promise 链、setTimeout 、setInterval等异步代码以及原生js事件；
4. startTransition：主动降低优先级。比如「搜索引擎的关键词联想」，用户在输入框中的输入希望是实时的，而联想词汇可以稍稍延迟一会儿。我们可以用 startTransition 来降低联想词汇更新的优先级；

- Suspense 支持 SSR
- startTransition
- useTransition
- useDeferredValue
- useId

支持流式SSR

### React18新增加的hooks有哪些





