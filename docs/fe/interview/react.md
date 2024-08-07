#   React面试题
## 为什么 React 会引入 JSX？
JSX是什么

- JSX 是一个JavaScript的语法扩展,JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式
- JSX 其实是React.createElement （最新版是_jsx）的语法糖

React想实现什么目的：

- 需要实现声明式
- 代码结构需要非常清晰和简洁，可读性强
- 结构、样式和事件等能够实现高内聚低耦合,方便重用和组合
- 不想引入新的的概念和语法,只写 JavaScript

JSX工作原理

- 通过babel将jsx解析成ast抽象语法树，再生成code源代码。


![An image](http://cdn.wangtongmeng.com/202308202101335.png)

<!-- there is no need to specify pathname:// if the target is explicitly specified -->
## 说一下你对 Virtual DOM 的理解？
vdom是什么

- 虚拟DOM就是一个描述真实DOM的纯 js 对象。
- React.createElement 函数所返回的就是一个虚拟 DOM。

优缺点
优点

- 兼容性：处理了浏览器兼容性问题，避免用户操作真实 DOM，那么又麻烦又容易出错
- 安全：内容经过了 XSS 处理，可以防范 XSS 攻击
- 跨平台：容易实现跨平台开发 Android、iOS、VR 应用
- 更新时优化：更新的时候可以实现差异化更新，减少更新 DOM 的操作

缺点

- 虚拟 DOM 需要消耗额外的内存
- 首次渲染其实并不一定会更快
## 函数组件和类组件的相同点和不同点？
相同点

- 它们都可以接收属性并且返回 React 元素

不同点

- 编程思想不同: 类组件需要创建实例，是基于面向对象的方式编程，而函数式组件不需要创建实例，接收输入，返回输出，是基于函数式编程的思路来编写的
- 内存占用：类组件需要创建并保存实例，会占用一定内存，函数组件不需要创建实例，可以节约内存占用
- 捕获特性：函数组件具有值捕获特性
- 可测试性: 函数式组件更方便编写单元测试
- 状态: 类组件有自己的实例，可以定义状态，而且可以修改状态更新组件，函数式组件以前没有状态，现在可以使用 useState 使用状态
- 生命周期: 类组件有自己完整的生命周期，可以在生命周期内编写逻辑，函数组件以前没有生命周期，现在可以使用 useEffect 实现类似生命周期的功能
- 逻辑复用: 类组件可以通过继承实现逻辑的复用，但官方推荐组件优于继承，函数组件可以通过自定义 Hooks 实现逻辑的复用
- 跳过更新: 类组件可以通过shouldComponentUpdate和PureComponent来跳过更新，而函数式组件可以使用React.memo来跳过更新
- 发展前景: 未来函数式组件将会成为主流，因为它可以更好的屏蔽 this 问题、规范和复用逻辑、更好的适合时间分片和并发渲染
## 请说一下 React 中的渲染流程
### 设计理念

- 跨平台渲染=>虚拟 DOM
- 快速响应=>异步可中断+增量更新
### 帧

- 屏幕刷新60次/秒，就是60帧，每帧16.66 毫秒
- 每帧的开头包括样式计算、布局和绘制。
- JavaScript 执行 Javascript 引擎和页面渲染引擎在同一个渲染线程,GUI 渲染和 Javascript 执行两者是互斥的
- 如果某个任务执行时间过长，浏览器会推迟渲染

![An image](http://cdn.wangtongmeng.com/202308202103595.png)

### requestIdleCallback

- 我们希望快速响应用户，让用户觉得够快，不能阻塞用户的交互
- requestIdleCallback 使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应
- 正常帧任务完成后没超过 16 ms,说明时间有富余，此时就会执行 requestIdleCallback 里注册的任务


![An image](http://cdn.wangtongmeng.com/202308202103096.png)

### fiber

- 我们可以通过某些调度策略合理分配 CPU 资源，从而提高用户的响应速度
- 通过 Fiber 架构，让自己的调和过程变成可被中断。 适时地让出 CPU 执行权，除了可以让浏览器及时地响应用户的交互

Fiber是一个执行单元

- Fiber 是一个执行单元,每次执行完一个执行单元, React 就会检查现在还剩多少时间，如果没有时间就将控制权让出去


![An image](http://cdn.wangtongmeng.com/202308202103903.png)

Fiber是一种数据结构

- React 目前的做法是使用链表, 每个 VirtualDOM 节点内部表示为一个 Fiber
- 从顶点开始遍历
- 如果有第一个儿子，先遍历第一个儿子
- 如果没有第一个儿子，标志着此节点遍历完成
- 如果有弟弟遍历弟弟
- 如果有没有下一个弟弟，返回父节点标识完成父节点遍历，如果有叔叔遍历叔叔
- 没有父节点遍历结束

![An image](http://cdn.wangtongmeng.com/202308202103722.png)

渲染时机

- React会把渲染任务拆分成一个个Fiber(每个组件对应一个Fiber)，在浏览器渲染的时间切片（每一帧的 idel period 空闲节点）
### React 16+的渲染流程

- [scheduler](https://gitee.com/mirrors/react/tree/v17.0.1/packages/scheduler) 选择高优先级的任务进入 reconciler
- [reconciler](https://gitee.com/mirrors/react/tree/v17.0.1/packages/react-reconciler) 计算变更的内容
- [react-dom](https://gitee.com/mirrors/react/tree/v17.0.1/packages/react-dom) 把变更的内容渲染到页面上


![An image](http://cdn.wangtongmeng.com/202308202104937.png)

## 说一下 React的 DOM-DIFF 算法？
在 React17+中 DOM-DIFF 就是根据老的 fiber 树和最新的 JSX 对比生成新的 fiber 树的过程
React优化原则

- 只对同级节点进行对比，如果 DOM 节点跨层级移动，则 React 不会复用
- 不同类型的元素会产出不同的结构 ，会销毁老结构，创建新结构
- 可以通过 key 标识移动的元素

单节点
![An image](http://cdn.wangtongmeng.com/202308202104230.png)

多节点

- 如果新的节点有多个节点的话
- 节点有可能更新、删除、新增
- 多节点的时候会经历二轮遍历
- 第一轮遍历主要是处理节点的更新,更新包括属性和类型的更新
- 第二轮遍历主要处理节点的新增、删除和移动
- 移动时的原则是尽量少量的移动，如果必须有一个要动，新地位高的不动，新地位低的动
## 说一下你对React合成事件的理解？
浏览器的事件流

- 事件捕获->事件目标->事件冒泡

React合成事件

- React 把事件委托到容器节点上（例如root，以前会在document上，但会有bug）
- 当真实 DOM 元素触发事件,先处理原生事件，然后会冒泡到 document 对象后,再处理 React 事件
- React 事件绑定的时刻是在 reconciliation 阶段,会在原生事件的绑定前执行
- 目的和优势
   - 进行浏览器兼容,React 采用的是顶层事件代理机制，能够保证冒泡一致性

React17以后
```vue
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
## setState的更新是同步还是异步的？

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
## React中的优先级

- 事件优先级：按照用户事件的交互紧急程度，划分的优先级
- 更新优先级：事件导致React产生的更新对象（update）的优先级（update.lane）
- 任务优先级：产生更新对象之后，React去执行一个更新任务，这个任务所持有的优先级
- 调度优先级：Scheduler依据React更新任务生成一个调度任务，这个调度任务所持有的优先级
> 前三者属于React的优先级机制，第四个属于scheduler的优先级机制

事件优先级

- 离散事件（DiscreteEvent）：click、keydown等，这些事件的触发不是连续的，优先级为 0
- 用户阻塞事件（UserBlockingEvent）：drag、scroll、mouseover等，特点是连续触发，阻塞渲染，优先级为1
- 连续事件（ContinuousEvent）：canplay、error，优先级最高，为2

更新优先级

- setState本质上是调用enqueueSetState,生成一个update对象，这时候会计算它的更新优先级，即update.lane
- 首先找出Scheduler中记录的优先级schedulerPriority，然后计算更新优先级

任务优先级

- update会被一个React的更新任务执行
- 任务优先级被用来区分多个更新任务的紧急程度
- 收敛同等优先级的任务调度
- 高优先级任务及时响应

调度优先级

- 一旦任务被调度，那么它就会进入scheduler
- 在Scheduler中，这个任务会被包装一下，生成一个属于Scheduler自己的task，这个task持有的优先级就是调度优先级
## 为什么不能在条件和循环里使用Hooks？
## 为什么不能在函数组件外部使用Hooks?
## React Hooks的状态保存在了哪里?
## 为什么传入二次相同的状态，函数组件不更新?
## 函数组件的useState和类组件的setState有什么区别?
## 为什么 useState 返回的是数组而不是对象?
```vue
const [num, setNum] = useState(0)
```
1.useState巧妙的运用数组的结构，相比于对象解构，数组解构顺序是固定的且命名是任意的，更加来灵活。
2.之所以使用数组的原因是useState内部把state声明成了一个数组，需要顺序一一对应。如果一个组件有多个useState，可以通过索引进行区分。例如_state=[0,0]
```javascript
// 实现一个useState代码
let _state=[];//全局_state用来存储state的值，避免重新渲染的时候被useState重置为初始值
let index=0
const useState=initialValue=>{
  const currentIndex=index
  _state[currentIndex]=_state[currentIndex]=== undefined ?initialValue:_state[currentIndex]
  const setState=(newVal)=>{
    _state[currentIndex]=newVal
    render()
  }
  index+=1
  return [_state[currentIndex],setState]
}
```
结论
[state,setState]=useState(initialValue)返回一个包含2个元素的数组：状态值和状态更新函数
内部原理是把state声明成一个数组，需要顺序一一对应
由于一个组件可以使用多个useState，为了避免冲突并确保state的准确性，useState要使用数组而不是对象
## React 的事件代理机制和原生事件绑定混用会有什么问题?
在平时开发的时候应该尽可能地避免 React 的事件代理机制和原生事件绑定混用。React 的合成事件层，并没有将事件直接绑定到 DOM 元素上，所以使用 e.stopPropagation()来阻止原生 DOM 的冒泡行为是不行的。阻止 React 事件冒泡的行为只能用于 React 合成事件系统，但是在原生事件中的阻止冒泡行为，却可以阻止 React 合成事件的传播
## 你在 React 项目中是如何使用 Redux 的?项目结构是如何划分的?
**背景**
redux 是用于数据状态管理，而 react 是一个视图层面的库，如果将两者连接在一起，可以使用官方推荐的 react-redux 库，其具有高效且灵活的特性
react-redux 将组件分成：

- 容器组件：存在逻辑处理
- UI 组件：只负责出显示和交互，内部不存在逻辑，状态由外部控制

通过 redux 将整个应用状态存储到 store 中，组件可以派发 dispatch 行为 action 给 store。其他组件通过订阅 store 中的状态 state 来更新自身的视图
**如何做**
使用 react-redux 分为两大核心：

- Provider
- connection

**Provider**
在 redux 中存在一个 store 用于存储 state。如果将这个 store 存放在顶层元素中，其他组件都被包裹在顶层元素之上
那么所有的组件都能够接收到 redux 的控制，都能够获取到 redux 中的数据
```
<Provider store={store}>
  <App />
</Provider>
```
**connection**
connect 方法将 store 上的 getState 和 dispatch 包装成组件的 props
导入 connect 如下：
```
import { connect } from "react-redux";
```
用法如下：
```
connect(mapStateToProps, mapDispatchToProps)(MyComponent);
// 可以传递两个参数：mapStateToProps 和 mapDispatchToProps)
```
**项目结构**
可以根据项目具体情况进行选择，以下列出两种常见的组织结构
**按角色组织(MVC)**
```javascript
reducers/
    todoReducer.js
    filterReducer.js
actions/
    todoAction.js
    filterActions.js
components/
    todoList.js
    todoItem.js
    filter.js
container/
    todoListContainer.js
    todoItemContainer.js
    filterContainer.js
```
**按功能组织**
使用 redux 功能组织项目，也就是把完成同一应用功能的代码放在同一目录下，一个应用功能包含多个角色的代码 redux 中，不容的角色就是 reducer、actions 和视图，而应用功能对应的就是用户界面的交互模块
```javascript
todoList/
    actions.js
    actionTypes.js
    index.js
    reducer.js
    views/
        components.js
        container.js
filter/
    actions.js
    actionTypes.js
    index.js
    reducer.js
    views/
        components.js
        container.js
```
每个功能模块对应一个目录，每个目录下包含同样的角色文件：

- actions.js：定义 action 构造函数
- actionTypes.js：定义 action 类型
- reducer.js：定义这个功能模块如果响应 actions.js 定义的动作
- views 包含功能模块中所有的 react 组件，包括展示组件和容器组件
- index.js 把所有角色导入，统一导出
## 说说对受控组件和非受控组件的理解，以及应用场景?
受控组件，简单来讲，就是受我们控制的组件，组件的状态全程响应外部数据
举个简单的例子：
```
class TestComponent extends React.Compomemt {
  constructor(props) {
    super(props);
    this.state = { username: "zhufeng" };
  }
  render() {
    return <input name="username" value={this.state.username} />;
  }
}
```
这时候当我们在输入框输入内容的时候，会发现输入的内容并无法显示出来，也就是 input 标签是一个可读的状态。这是因为 value 被 this.state.username 所控制住。当用户输入新的内容时，this.state.username 并不会自动更新，这样的话 input 内容也就不会变了
如果想要接触被控制，可以在 input 标签设置 onChange 事件，输入的时候触发事件函数，在函数内部实现 state 的更新，从而导致 input 框的内容页发生改变
因此，**受控组件我们一般需要初始状态和一个状态更新事件函数**
**非受控组件**
非受控组件，简单来讲，就是不受我们控制的组件。一般情况是在初始化的时候接受外部数据，然后自己在内部存储其自身状态
当需要时，可以使用 ref 查询 DOM 并查找其当前值，如下：
```
import React, { Component } from "react";
export class UnControl extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  handleSubmit(e)=>{
    console.log(`我们可以获得input内的值为：${this.inputRef}`)
    e.preventDefalut()
  }
  render(){
    return(
        <form onSubmit={e=>this.handleSumbit(e)}>
            <input defaultValue="zhufeng" ref={this.input.val}/>
            <input typr="submit" value="提交"/>
        </form>
    )
  }
}
```
**应用场景**
大部分时候推荐使用受控组件来实现表单，因为在受控组件中，表单数据由 React 组件负责处理
如果选择非受控组件的话，控制能力较弱，表单数据就由 DOM 本身处理，但更加方便快捷，代码量少
针对两者的区别，其应用场景如下：

|  特征  |  非受控  |  受控  |
| --- | --- | --- |
|  一次性取值(例如，提交时) | 是 | 是 |
| 提交时验证 | 是 | 是 |
| 即时现场验证 | 否 | 是 |
| 有条件地禁用提交按钮 | 否 | 是 |
| 强制输入格式 | 否 | 是 |
|  一个数据的多个输入 | 否 | 是 |
| 动态输入 | 否 | 是 |

## React 有哪些性能优化的方法?
React 渲染性能优化的三个方向，其实也适用于其他软件开发领域，这三个方向分别是：

- 减少计算量。对应到 React 中就是减少渲染的节点或者降低组件渲染的复杂度
- 利用缓存。对应到 React 中就是如何避免重新渲染，利用函数式编程的 memo 方式来避免组件重新渲染
- 精确重新计算的范围。对应到 React 中就是绑定组件和状态关系，精确判断更新的时机和范围，只重新渲染脏的组件，或者说降低渲染范围

**减少渲染的节点/降低渲染计算量(复杂度)**
首先从计算的量上下功夫，减少节点渲染的数量或者降低渲染的计算量可以显著的提高组件渲染性能
**不要在渲染函数都进行不必要的计算**
比如不要在渲染函数(render)中进行数组排序，数据转换，订阅事件，创建事件处理器等等。渲染函数中不应该放置太多副作用
**减少不必要的嵌套**
有些团队是重度的 styled-components 用户，其实大部分情况下我们都不需要这玩意，比如纯静态的样式规则以及需要重度性能优化的场景。除了性能问题，另一个困扰我们的是它带来的节点嵌套地狱。所以我们需要理性地选择一些工具，比如使用原生的 css，减少 React 运行时的负担
一般不必要的节点嵌套都是滥用告诫组件/RenderProps 导致的。所以还是那句话：只有在必要时才使用xxx、有很多中方式来代替高阶组件/RenderProps，例如优先使用 props、React Hooks
**虚拟列表**
虚拟列表是常见的长列表和复杂组件树优化方式，它优化的本质就是减少渲染的节点。虚拟列表只渲染当前视口可见元素 虚拟列表常用于以下组件场景：

- 无限滚动列表，grid 表格，下拉列表。spreadsheets
- 无限切换的日历或轮播图
- 大数据数量或无限嵌套的树
- 聊天窗、数据流、时间轴

**惰性渲染**
惰性渲染的本质是和虚拟列表是一样的，也就是说只在必要才去渲染对应的节点。举个例子，常用的 Tab 组件，其实没有必要一开始九江所有的 Tab 的 panel 都渲染出来，而是等到该 Tab 被激活时才去惰性渲染。还有很多场景会用到惰性渲染，例如树形选择器，横态弹窗，下拉列表，折叠组件等等
**选择合适的样式方案**
在样式运行时性能方面大概可以总结为:css > 大部分 css-in-js > inline style
**避免重新渲染**
减少不必要的重新渲染也是 React 组件性能优化的重要方向。为了避免不必要的组件重新渲染需要在做到两点：

- 保证组件纯粹性。即控制组件的副作用，如果组件有副作用则无法安全地缓存渲染结果
- 通过 shouldComponentUpadte 生命周期函数来比对 state 和 props，确定是否要重新渲染。对于函数组件可以使用 React.memo 包装

另外这些措施也可以帮助你更容易地优化组件重新渲染：
**简化 props**
如果一个组件的 props 太复杂一般意味着这个组件已经违背单一职责，首先应该尝试对组件进行拆解；另外复杂的 props 也会变得难以维护，比如影响 shallowCompare 效率，还会让组件的变动变得难以预测和调试
简化的 props 更容易理解，而且可以提高组件缓存的命中率
**其他提升体验**

- **路由懒加载**
- **防抖、节流**
- **图片懒加载、预加载**
## 说说 React 中的 diff 算法
diff 算法主要基于三个规律：

- DOM 节点的跨层级移动的操作特别少，可以忽略不计
- 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构
- 对于同一层级的一组子节点，可以通过唯一的 ID 进行区分

**tree diff**
因为上面的三个策略中的第一点，DOM 节点的跨级操作比较少，那么 diff 算法只会对相同层级的 DOM 节点进行比较。如果发现节点不存在，那么会将该节点以及其子节点完全删除，不会再继续比较。如果出现了 DOM 节点的跨层级的移动操作，那么会删除节点以及其所有的子节点，然后在移动后的位置重新创建
**component diff**
如果是同一类型的组件，那么会继续对比 VM
如果不是同一类型的组件，那么会将其和其子节点完全替换，不会再进行比对
同一类型的组件，有可能 VM 没有任何的变化，如果可以确定知道这点，那么就可以节省大量的 Diff 时间，所以用户可以设置shouldComponentUpdate()来判断是否需要进行 diff 算法
**element diff**
当节点处于同一层级的时候，有三种操作：INSERT_MAKEUP 插入、MOVE_EXISTING 移动、REMOVE_NODE 删除
这里 React 有一个优化策略，对于同一层级的同组子节点，添加唯一的 key 进行区分。这样的话，就可以判断出来是否是移动节点。通过 key 发现新旧集合中的节点都是相同的节点，就只需要进行移动操作就可以
## react 的虚拟 dom 是怎么实现的？
React 是把真实的 DOM 树转换为 JS 对象树，也就是 Virtual DOM。每次数据更新后，重新计算 VM，并和上一次生成的 VM 树进行对比，对发生变化的部分进行批量更新。除了性能之外，VM 的实现最大的好处在于和其他平台的集成。比如我们一个真实的 DOM 是这样的
## React Hooks 当中的 useEffect 是如何区分生命周期钩子的？
useEffect 可以看成是 componentDidMount、componentDidUpdate 和 componentWillUnmount 三者的结合
useEffect(callback，[source])接受两个参数，调用方式如下：
```
useEffect(() => {
  consoloe.log("mounted");
  return () => {
    console.log("willUnmount");
  };
}, [source]);
```
生命周期函数的调用主要是通过第二个参数[source]来进行控制，有如下几种情况：

- [source]参数不传时，则每次都会优先调用上次保存的函数中返回的那个函数，然后在调用外部那个函数
- [source]参数传[]时，则外部的函数只会在初始化时调用一次，返回的那个函数也只会最终在组件卸载时调用一次
- [source]参数有值时，则只会监听到数组中的值发生变化后才优先调用返回的那个函数，在调用外部的函数
## React Fiber 是什么?
**Fiber 出现的背景**
首先要知道的是，JS 引擎和页面渲染引擎两个线程是互斥的，当其中一个线程执行时，另一个线程只能挂起等待。在这样的机制下，如果 JS 线程长时间地占用了主线程，那么渲染层面的更新就不得不长时间地等待，界面长时间不更新，会导致页面响应度变差，用户可能会感觉到卡顿
而这正是 React15 的 Stack Reconciler 所面临的问题，即是 JS 对主线程的超时占用问题。Stack Reconciler 是一个同步的递归过程，使用的是 JS 引擎自身的函数调用栈，它会一直执行到栈空为止，所以当 React 在渲染组件时，从开始到渲染完成整个过程是一气呵成的。如果渲染的组件比较庞大，JS 执行会占据主线程较长时间，会导致页面响应度变差。而且所有的任务都是按照先后顺序，没有区分优先级，这样就会导致优先级比较高的任务无法被优先执行
**Fiber 是什么**
Fiber 与进程、线程同为程序执行过程，Fiber 就是比线程还要纤细的一个过程，意味着在对渲染过程进行更加精细的控制
从架构角度老看，Fiber 是对 React 核心算法(即调和过程)的重写
从编码角度来看，Fiber 是 React 内部所定义的一种数据结构，它是 Fiber 树结构的节点单位，也就是 React 16 新架构下的**虚拟 DOM**
**Fiber 是如何解决问题的？**
Fiber 把一个渲染任务分解为多个渲染任务，而不是一次性完成，把每一个分割得很细得任务视作一个**执行单元**，React 就会检查现在还剩多少时间，如果没有时间就将控制权让出去，故任务会被分散到多个帧里面，中间可以返回至主程控制执行其他任务，最终实现更流畅的用户体验。
即实现了**增量渲染**，实现可中断与恢复，恢复后也可以复用之前的中间状态，并给不同的任务赋予不同的优先级，其中每个任务更新单元为 React Element 对应的 Fiber 节点
**Fiber 实现原理**
实现的方式是 requestIdleCallback 这一 api，但 React 团队 polyfill 了这个 api，使其对比原生的浏览器兼容性更好且扩展了这个特性。requestIdleCallback 回调的执行前提条件是当前浏览器处于空闲状态。即 requestIdleCallback 的作用是在浏览器一帧的剩余空闲时间内执行优先度相对较低的任务。
首先 React 中任务切割为多个步骤，分批完成。在完成一部分任务之后，将控制权交回浏览器，让浏览器有时间在进行页面的渲染。等浏览器忙完之后有剩余时间，在继续之前 React 未完成的任务，是一种合作式调度。简而言之，由浏览器给我们分配执行时间片，我们要按照约定在这个时间内执行完毕，并将控制权交还给浏览器。React16 的 Reconciler 基于 Fiber 节点实现，被称为 Fiber Reconciler
作为静态的数据结构来说，每个 Fiber 节点对应一个 React element，保存该组件的类型(函数组件、类组件、原生组件等等)，对应的 DOM 节点等信息
作为动态的工作单元来说，每个 Fiber 节点保存本次更新中该组件改变的状态、要执行的工作。每个 Fiber 节点有个对应的 React element，多个 Fiber 节点是如何形成树的呢？靠下面的三个属性：
```
//指向父级Fiber节点
this.return = null;
// 指向子Fiber节点
this.child = null;
// 指向右边第一个兄弟Fiber节点
this.sibling = null;
```
## Redux 中的 connect 有什么作用?
**connect 负责连接 React 和 Redux。**

- **获取 state**

connect 通过 context 获取 Provider 中的 store，通过 store.getState()获取整合 store tree 上所有 state

- **包装原组件**

将 state 和 action 通过 props 的方式传入到原组件内部 WrapWithConnent 返回一个 ReactComponent 对象 Connent，Connect 重新 redner 外部传入的原组件 WrappedComponent，并把 connect 中传入的 mapStateToProps，mapDispatchToProps 与组件上原有的 props 合并后，通过属性的方式传递给 WrappedComponent

- **监听 store tree 变化**

connect 缓存 store tree 中 state 的状态，通过当前 state 状态和变更前 state 状态进行比较，从而确定是否调用 this.setState()方法触发 Connect 及其子组件的重新渲染
## 什么是 JSX?
JSX 即 JavaScript XML 。一种在 React 组件内部构建标签的类 XML 语法。JSX 为 react.js 开发的一套语法糖，也是 react.js 的使用基础。React 在不使用 JSX 的情况下一样可以工作，然而使用 JSX 可以提高组件的可读性，因此推荐使用 JSX
```
class MyComponent extends React.Component{
    render(){
        let props=this.props
        return(
            {props.name}
        )
    }
}
```
**优点：**

- 允许使用熟悉的语法来定义 HTML 元素树
- 提供更加语义化且易懂的标签
- 程序结构更容易被直观化
- 抽象 React Element 的创建过程
- 可以随时掌控 HTML 标签以及生成这些标签的代码
- 是原生的 JavaScript
## 说说你在 React 项目是如何捕获错误的?
**是什么**
错误在我们日常编写代码是非常常见的。举个例子，在 react 项目中去编写组件内 JS 代码错误会导致 React 的内部状态被破坏，导致整个应用崩溃，这里不应该出现的现象。作为一个框架，react 也有自身对于错误处理的解决方案
**如何做**
为了解决出现的错误导致整个应用崩溃的问题，react16 引用了**错误边界**新的概念。**错误边界**是一种 React 组件，这种组件可以捕获发生在其子组件树任何位置的 JS 错误，并打印这些错误，同时展示降级 UI，而不会渲染那些发生崩溃的子组件树，错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。
形成错误边界组件的两个条件：

- 使用了 static getDerivedStateFromError()
- 使用了 componentDidCatch()

抛出错误后，请使用 static getDerivedStateFromError()渲染备用 UI，使用 componentDidCatch()打印错误信息，如下：
```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新state使下一次渲染能够显示降级后的UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 同样将错误体制上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 自定义降级后的UI并渲染
      return <h1>Something went wrong</h1>;
    }
    return this.props.children;
  }
}
```
然后就可以把自身组件的作为错误边界的子组件：
```
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```
下面这些情况无法捕获到异常：

- 事件处理
- 异步代码
- 服务端渲染
- 自身抛出来的错误

在 react16 版本之后，会把渲染期间发生的所有错误打印到控制台。除了错误信息和 JS 之外，React16 还提供了组件栈追踪，现在你可以准确地查看发生在组件树内的错误信息
对于错误边界无法捕获的异常，如事件处理过程中发生问题并不会捕获到，是因为其不会在渲染期间触发，并不会导致渲染时候问题
这种情况可以使用 JS 的 try…catch…语法，如下：
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      // 执行操作，如有错误则会抛出
      // do  something
    } catch (error) {
      this.setState({ error });
    }
  }
  render() {
    if (this.state.error) {
      return <h1>Caught an error</h1>;
    }
    return <button Onclick={this.handleClick}>Click Me</button>;
  }
}
```
除此之外还可以通过监听 onerror 事件
```
window.addEventListener("error", function (event) {
  // do something
});
```
## React 中懒加载的实现原理是什么?
随着前端应用体积的扩大，资源加载的优化是我们必须要面对的问题，动态代码加载就是其中的一个方案，webpack 提供了符合 ECMAScript 提案的 import()语法，让我们来实现动态地加载模块(备注：require.ensure 与 import()均为 webpack 提供的代码动态加载方案，在 webpack2.x 中，require.ensure 已被 import 取代)
在 React16.6 版本中，新增了 React.lazy 函数，它能让你像渲染常规组件一样处理动态引入的组件，配合 webpack 的 Code Splitting，只有当组件被加载，对应的资源才会导入，从而达到懒加载的效果
**使用 React.lazy**
在实际使用中，首先是引入组件方式的变化：
```
// 不使用React.lazy
import OtherComponent from "./OtherComponent";

// 使用React.lazy
const OtherComponent = React.lazy(() => import("./OtherComponent"));
```
React.lazy 接受一个函数作为参数，这个函数需要调用 import()。它需要返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件
```
import React, { Supense } from "react";
const OtherComponent = React.lazy(() => import("./OtherComponent"));
function MyComponent() {
  return <h2>Loading</h2>;
}
```
如上方代码中，通过 import()、React.lazy 和 Suspense 共同一起实现了 React 的懒加载，也就是我们常说的运行时动态加载，即 OtherComponent 组件文件被拆分时打包为一个新的包文件，并且只会在 OtherComponent 组件渲染时，才会被下载到本地
需要注意的一点是，React.lazy 需要配合 Suspense 组件一起使用，在 Suspense 组件中渲染 React.lazy 异步加载的组件。如果单独使用 React.lazy，React 会给出错误提示。Suspense 可以包裹多个动态加载的组件，这也意味着在加载这两个组件的时候只会有一个 loading 层，因为 loading 的实现实际是 Suspense 这个父组件去完成的，当所有子组件对象都 resolve 后，再去替换所有子组件。这样也避免了出现多个 loading 的体验问题。所以 loading 一般不会针对某个子组件，而是针对整体的父组件做 loading 处理
**Webpack 动态加载**
上面使用 import() 语法，webpack 检测到这种语法会自动代码分割。使用这种动态导入语法代替以前的静态引入，可以让组件在渲染的时候，再去加载组件对应的资源，这个异步流程加载的实现机制是怎么样呢?
**import()原理**
import()函数是由 TS39 提出的一种动态加载模块的规范实现，其返回的是一个 promise。在浏览器宿主环境中一个 import()的参考实现
```
function import(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const tempGlobal = "__tempModuleLoadingVariable" + Math.random().toString(32).substring(2);
    script.type = "module";
    script.textContent = `import * as m from "${url}"; window.${tempGlobal} = m;`;

    script.onload = () => {
      resolve(window[tempGlobal]);
      delete window[tempGlobal];
      script.remove();
    };

    script.onerror = () => {
      reject(new Error("Failed to load module script with URL " + url));
      delete window[tempGlobal];
      script.remove();
    };

    document.documentElement.appendChild(script);
  });
}
```
结合上面的代码来看，webpack 通过创建 script 标签来实现动态加载的，找出依赖对应的 chunk 信息，然后生成 script 标签来动态加载 chunk ，每个 chunk 都有对应的状态：未加载、加载中、已加载
我们可以运行 React.lazy 代码来具体看看 network 的变化，为了方便辨认 chunk。我们可以在 import 里面加入 webpackChunkName 的注释，来指定包文件名称
**Suspense 组件**
Suspense 内部主要通过捕获组件的状态去判断如何加载，React.lazy 创建的动态加载组件具有 Pending、Resolved、Rejected 三种状态，当这个组件的状态为 Pending 时显示的是 Suspense 中 fallback 的内容，只有状态变为 Resolved 后才显示组件
**Error Boundaries 处理资源加载失败场景**
如果遇到网络问题或是组件内部错误，页面的动态资源可能会加载失败，为了优雅降级，可以使用 Error Boundaries 来解决这个问题。
Error Boundaries 是一个组件，如果你在组件中定义了 static getDerivedStateFromError()或 componentDidCatch()生命周期函数，它就会成为一个 Error Boundaries 组件
**总结**
React.lazy()和 React.Suspensed 的提出为现代 React 应用的性能优化和工程化提供了便捷之路
React.lazy 可以让我们像渲染常规组件一样处理动态引入的组件，结合 Suspense 可以更优雅地展现组件懒加载的过渡动画以及处理加载异常的场景
## React 中，父子组件的生命周期执行顺序是怎么样的?
React 的生命周期从广义上分为三个阶段：挂载、更新、卸载，因此可以把 React 的生命周期分为两类：挂载卸载过程和更新过程。
**挂载卸载过程**

1. constructor 完成 React 数据的初始化
2. componentWillMount 组件初始化数据后，但是还未渲染 DOM 前
3. componentDidMount 组件第一次渲染完成，此时 dom 节点已经生成
4. componentWillUnmount 组件的卸载和数据的销毁

**更新过程**

1. componentWillReceiveProps(nextProps) 父组件改变后的 props 需要重新渲染组件时
2. shouldComponentUpdate(nextProps，nextState) 主要用于性能优化(部分更新)，因为 react 父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，在这里 return false 可以阻止组件的更新
3. componentWillUpdate(nextProps,nextState) shouldComponentUpdate 返回 true 后，组件进入重新渲染的流程
4. componentDidUpdate(prevProps,prevState) 组件更新完毕后触发
5. render() 渲染时触发

**父子组件加载顺序**
观察父子组件的挂载生命周期函数，可以发现挂载时，子组件的挂载钩子先被触发；卸载时，子组件的卸载钩子后被触发
我们经常在挂载函数上注册监听器，说明此时是可以与页面交互的，也就是说其实所有挂载钩子都是在父组件实际挂载到 dom 树上才触发的，不过是在父组件挂载后依次触发子组件的 componentDidMount，最后在触发自身的挂载钩子，说白了，componentDidMount 其实是异步钩子。相反，卸载的时候父节点先被移除，在从上至下依次触发子组件的卸载钩子
但是我们也经常在卸载钩子上卸载监听器，这说明 componentWillUnmount 其实在父组件从 dom 树上卸载前触发的，先出发自身的卸载钩子，但此时并未从 dom 树上剥离，然后依次尝试触发所有子组件的卸载钩子，最后，父组件从 dom 树上完成实际卸载。
## 说说 react 中引入 css 的方式有哪几种?区别?
**是什么**
组件式开打选择合适的 css 解决方法尤为重要
通常会遵循以下规则：

- 可以编写局部 css，不会随意污染其他组件内的原生；
- 可以编写动态的 css，可以获取当前组件的一些状态，根据状态的变化生成不同的 css 样式
- 支持所有的 css 特性：伪类、动画、媒体查询等
- 编写起来简洁方便，最好符合一贯的 css 风格特点

在这一方面，vue 使用 css 起来更为简洁：

- 通过 style 标签编写样式
- scoped 属性决定编写的样式是否局部有效
- lang 属性设置预处理器
- 内联样式风格的方式来根据最新状态设置和改变 css

而在 react 中，引入 css 不如 vue 方便简洁，其引入 css 的方式有很多种，各有利弊
**方式**
常见的 css 引入方式有以下：

- 在组件内直接使用
- 组件中引入.css 文件
- 组件中引入 .module.css 文件
- css in js

**在组件内直接使用**
直接在组件中书写 css 样式，通过 style 属性直接引入，如：
```
import React, { Component } from "react";

const div1 = {
  width: "30px",
  margin: "3px auto",
  backgroundColor: "#44014C",
  boxSizing: "border-box",
};

class Test extends Component {
    constructor (props,context){
        super(props)
    }
    render(){
        return (
            <div style={div1}>111</div>
            <div style={{backgroundColor:"red"}}>111</div>
        )
    }
}

export default Test
```
从上面可以看到，css 属性需要转化成驼峰写法，这种方式的优点：

- 内联样式，样式之间不会有冲突
- 可以动态获取当前 state 中的状态

但又会有缺点：

- 写法上都需要使用驼峰标识
- 某些样式没有提示
- 大量的样式，代码混乱
- 某些样式无法编写(比如伪类/伪元素)

**组件中引入 css 文件**
将 css 单独写在一个 css 文件中，然后在组件中直接引入 App.css 文件
```
.title {
  color: red;
  font-size: 20px;
}

.desc {
  color: green;
  text-decoration: underline;
}
```
组件中引入：
```
import React, { PureComponent } from "react";

import Home from "./home";

import "./App.css";

export default class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <h2 className="title">标题</h2>
        <p className="desc">文字描述</p>
        <Home />
      </div>
    );
  }
}
```
这种方式存在不好的地方在于样式是全局生效，样式之间会相互影响
**组件中引入.module.css 文件**
将 css 文件作为一个模块引入，这个模块中的所有 css，只作用于当前组件。不会影响当前组件的后代组件
这种方式是 webpack 的方案，只需要配置 webpack 配置文件中modules:true即可
```
import React, { PureComponent } from "react";

import Home from "./home";

import "./App.module.css";

export default class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <h2 className="title">标题</h2>
        <p className="desc">文字描述</p>
        <Home />
      </div>
    );
  }
}
```
这种方式能够解决局部作用域问题，但也有一定的缺陷：

- 引用的类名，不能使用连接符(.xxx-xx)，在 JS 中是不识别的
- 所有的 className 都必须使用{style.className}的形式来编写
- 不方便动态来修改某些样式，依然需要使用内联样式的方式

**css in js**
css-in-js 是指一种模式，其中 css 是由 JS 生成而不是在外部文件中定义；此功能并不是 React 的一部分，而是由第三方库提供，例如：

- styled-components
- emotion
- glamorous

主要是看看 styled-components 的基本使用，本质是通过函数的调用，最终创建出一个组件：

- 这个组件就会被自动添加上一个不重复的 class
- styled-components 会给该 class 添加相关的样式

基本使用如下：创建一个 style.js 文件用于存放样式组件:
```
export const SelfLink = styled.div`
  height: 50px;
  border: 1px solid red;
  color: yellow;
`;

export const SelfButton = styled.div`
  height: 150px;
  width: 150px;
  color: ${(props) => props.color};
  background-image: url(${(props) => props.src});
  background-size: 150px 150px;
`;
```
```
// 引入样式组件也很简单
import React, { Component } from "react";

import { SelfLink, SelfButton } from "./style";

export default class Test extends Component {
  render() {
    return (
      <div>
        <SelfLink title="People">SelfLink</SelfLink>
        <SelfButton color="#ffffff"> SelfButton </SelfButton>
      </div>
    );
  }
}
```
**区别**
通过上面四种样式的引入，可以看到：

- 在组件内直接使用 css 该方式编写方便，容易根据状态修改样式属性，但是大量的演示编写容易导致代码混乱
- 组件内引入.css 文件符合我们日常的编写习惯，但是作用域是全局的，样式之间会层叠
- 引入.module.css 文件能够解决局部作用域问题，但是不方便动态修改样式，需要使用内联的方式进行样式的编写
- 通过 css in js 这种方法，可以满足大部分场景的应用，可以类似于预处理器一样样式嵌套、定义、修改状态等

至于使用 react 用哪种方案引入 css，并没有一个绝对的答案，可以根据各自情况选择合适的方案
## React 的事件代理机制和原生事件绑定有什么区别?

- 事件传播与阻止事件的传播：React 的合成事件并没有实现事件捕获，只支持了事件冒泡。阻止事件传播 React 做了兼容性处理，只需要 e.preventDefault()即可，原生存在兼容性问题
- 事件类型：React 是原生事件类型的一个子集(React 只是实现了 DOMlevel3 的事件接口，有些事件 React 并没有实现，比如 window 的 resize 事件)。阻止 React 事件冒泡的行为只能用于 React 合成事件系统，但是在原生事件中的阻止冒泡行为，却可以阻止 React 合成事件的传播
- 事件的绑定方式：原生事件系统中支持多种不同的绑定事件的方式，React中只有一种
- 事件对象：原生中存在IE的兼容性问题，React做了兼容处理
## 为什么不能直接使用 this.state 改变数据?
react 中不能直接修改 state，因为并不会重新触发 render。以如下方式更新状态，组件不会重新渲染
```
// Wrong
this.state.message = "hello world!";
```
而是需要使用 setState()方法，状态改变时，组件通过重新渲染做出响应
```
// Correct
This.setState({ message: "hello world!" });
```
setState 通过一个队列机制来实现 state 更新。当执行 setState 的时候，会将需要更新的 state 合并后放入状态队列，而不会立刻更新 this.state。队列机制可以高效的批量更新 state，如果不通过 setState 而直接修改 this.state，那么该 state 将不会被放入状态队列中，当下次调用 setState 并对状态队列进行合并时，将会忽略之前被直接修改的 state ，而造成无法预知的错误
## 简述下 React 的事件代理机制?
React 并不会把所有的处理函数直接绑定在真实的节点上。而是把所有事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数
当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象。
当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。
这样做的优点是解决了兼容性问题，并且简化了事件处理和回收机制(不需要手动的解绑事件，React 已经在内部处理了)。但是有些事件 React 并没有处理，比如 window 的 resize 事件
## React 中，能否直接将 props 的值复制给 state?
应该避免这种写法：
```
constructor(props){
    super(props);
    // 不要这样做
    this.state={color:props.color}
}
```
因为这样做毫无必要(可以直接使用 this.props.color)，同时还产生了 bug(更新 prop 中的 color 时，并不会影响 state)。只有在你刻意忽略 prop 更新的情况下使用。此时，应将 prop 重命名为 initialColor 或 defaultColor。必要时，你可以修改它的 key，以强制重置其内部 state。
## React 构建组件的方式有哪些?有什么区别?
**组件是什么**
组件就是把图形、非图形的各种逻辑均抽象为一个统一的概念(组件)来实现开发的模式
在 React 中，一个类、一个函数都可以视为一个组件
组件所在的优势：

- 降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求，例如输入框，可以替换日历、时间、范围等组件做具体的实现
- 调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能够快速定位，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单
- 提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所以对代码进行优化可获得系统的整体升级

**组件如何构建**
在 React 目前来讲，组件的创建主要分成了三种方式：

- 函数式创建
- 通过 React.createClass 方法创建
- 继承 React.Component 创建

**函数式创建**
在 React Hooks 出来之间，函数式组件可以视为无状态组件，只负责根据传入的 props 来展示试图，不涉及对 state 状态的操作
大多数组件可以写为无状态组件，通过简单组合构建其他组件 在 React 中，通过函数简单创建组件的示例如下：
```
function HelloCom(props /* context */) {
  return <div>hello{props.name}</div>;
}
```
**通过 React.createClass 方法创建**
React.createClass 是 react 刚开始推荐的创建组件的方式，目前这种创建方式已经不怎么用了。像上述通过函数式组件的方式，最终会通过 babel 转化成 React.createClass 这种形式，转化如下：
```
function HelloCom(props /* context */) {
  return React.createElement("div", null, "Hello", props.name);
}
```
但因为编写方式过于冗杂，目前基本不使用
**继承 React.Component 创建**
同样在 React Hooks 出来之前，有状态的组件只能通过继承 React.Component 这种形式进行创建
有状态的组件也就是组件内部存在维护的数据，在类创建的方式中通过 this.state 进行访问
当调用 this.setState 修改组件的状态时，组件会再次调用 render()方法进行重新渲染
通过继承 React.Component 创建一个时钟示例如下：
```
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState((state) => ({
      seconds: state.seconds + 1,
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return <div>Seconds:{this.state.seconds}</div>;
  }
}
```
**区别**
由于 React.createClass 创建的方式过于冗杂，并不建议使用。而像函数式创建和类组件创建的区别主要在于需要创建的组件是否需要为有状态的组件：

- 对于一些无状态的组件创建，建议使用函数式创建的方式
- 由于react hooks的出现，函数式组件创建的组件通过hooks方法也能使之成为有状态组件，在加上目前推崇函数式编程，所以这里建议都使用函数式的方式来创建组件

在考虑组件的选择原则上，能用无状态组件则用无状态组件
## Redux 中异步的请求怎么处理?
一般的异步请求，可以在 componentDidmount 中直接进行请求，无需借助 redux。但是在一定规模的项目中，上述方法很难进行异步流的管理，通常情况下我们会借助 redux 的异步中间件进行异步处理。redux 异步流中间件有很多，当下主流的异步中间件有两种**redux-thunk 和 redux-saga**
使**用 react-thunk 中间件**
优点：

- 体积小：redux-thunk 的实现方式很简单，只有不到 20 行代码
- 使用简单：redux-thunk 没有引入像 redux-saga 或者 redux-observable 额外的范式，上手简单

缺点：

- 样板代码过多：与 redux 本身一样，通常一个请求需要大量的代码，而且很多都是重复性质的
- 耦合严重：异步操作与 redux 的 action 偶尔在一起，不方便管理
- 功能孱弱：有一些实际开发中常用的功能需要自己进行封装

**使用 redux-saga 中间件**
优点：

- 异步解耦：异步操作被转移到单独 saga 中，不再是参杂在 action 或 component 中
- action 摆脱 thunk function：dispatch 的参数依然是一个纯粹的 action(FSA)，而不是充满黑魔法的 thunk function
- 异常处理：受益于 generator function 的 saga 实现，代码异常/请求失败 都可以直接通过 try/catch 语法直接捕获处理
- 功能强大：redux-saga 提供了大量的 saga 辅助函数和 effect 创建器供开发者使用，开发者无需封装或者简单封装即可使用
- 灵活：redux-saga 可以将多个 saga 可以串行/并行组合使用，形成一个非常使用的异步 flow
- 已测试，提供了各种 case 的测试方案，包括 mock task，分支覆盖等等

缺点：

- 额外的学习成本：redux-saga 不仅在使用难以理解的 generator function ，而且有数十个 api，学习成本超过 redux-thunk。最重要的是额外学习成本指示只服务这个库的，与 redux-observable 不同，redux-observable 虽然也有额外的学习成本，但是背后是 rxjs 和一整套思想
- 体积庞大：代码近 2000 行，min 版 25KB 作用
- 功能过剩：实际上并发控制等功能很难用到，但是我们仍然需要引入这些代码
- ts 支持不友好：yield 无法返回 TS 类型

redux-saga 可以捕获 action，然后执行一个函数，那么可以把异步代码放在这个函数中
## React Fiber 是如何实现更新过程可控?
更新过程的可控主要体现在下面几个方面：

- 任务拆分
- 任务挂起、恢复、终止
- 任务具备优先级

**任务拆分**
在 react Fiber 机制中，它采用**化整为零** 的思想，将调和阶段(Reconiler)递归遍历 VDOM 这个大任务分成若干个小任务，每个任务只负责一个节点的处理
**任务挂起、恢复、终止**
workInProgress tree
表示当前正在执行更新的 Fiber 树。在 render 或者 setState 后，会构建一颗 fiber 树，也就是 workInProgress tree，这棵树在构建每一个节点的时候会收集当前节点的副作用，整棵树构建完成后，会形成一条完整的副作用链
currentFiber tree
表示上次渲染构建的 Fiber 树。在每一次更新完成后 workInProgress 会赋值给 currentFiber。在新一轮更新时 WorkInProgress tree 在重新构建，新 WorkInProgress 的节点通过 alternate 属性和 currentFiber 的节点建立联系。 在新的 WorkInProgress tree 的创建过程中，会同 currentFiber 的对应节点进行 diff 比较，收集副作用。同时也会复用和 currentFiber 对应的节点对象，减少新创建对象带来的开销。也就是说无论是创建还是更新、挂起、恢复以及终止操作都是发生在 WorkInProgress tree 创建过程中的。WorkInProgress tree 构建过程其实就是循环的执行任务和创建下一个任务
**挂起**
当第一个小任务完成后，先判断这一阵是否还有空闲时间，没有就挂起下一个任务的执行，记住当前挂起的节点，让出控制权给浏览器执行更高优先级的任务
**恢复**
在浏览器渲染完一帧后，判断当前帧是否有剩余时间，如果有就恢复之前挂起的任务。如果没有任务需要处理，代表调和阶段完成，可以开始进入渲染阶段。

- 如何判断一帧是否有空闲时间呢？

使用前面提到的 RIC(RequesIdleCallback)浏览器原生 API，React 源码中为了兼容低版本的浏览器，对该方法进行了 Polyfill

- 恢复执行的时候又是如何知道下一任务是什么呢？

链表，在 React Fiber 中每个任务其实就是在处理一个 FiberNode 对象，然后又生成下一个任务需要处理的 FiberNode
**终止**
其实并不是每次更新都会走到提交阶段。当在调和过程中触发了新的更新，在执行下一个任务的时候，判断是否有优先级更高的执行任务，如果有就终止原来将要执行的任务，开始新的 workInProgressFiber 树构建过程，开始新的更新流程。这样可以避免重复更新操作。这也是在 React 16 以后生命周期函数 componentWillMount 有可能会执行多次的原因
**任务具备优先级**
React Fiber 除了通过挂起、恢复和终止来控制更新外，还给每个任务分配了优先级。具体点就是在创建或者更新 FiberNode 的时候，通过算法给每个任务分配一个到期时间(expirationTime)。在每个任务执行的时候除了判断剩余时间，如果当前处理节点已经过期，那么无论现在是否有空闲时间都必须执行该任务，过期时间的大小还代表着任务的优先级
任务在执行过程中顺便收集了每个 FiberNode 的副作用，将有副作用的节点通过 firstEffect、lastEffect、nextEffect 形成一条副作用单链表 A1(TEXT)-B1(TEXT)-C1(TEXT)-C1-C2(TEXT)-C2-B1-B2(TEXT)-B2-A
其实最终都是为了收集到这条副作用连表，有了它，在接下来的渲染阶段就通过遍历副作用链来完成 DOM 更新。这里需要注意，更新真实 DOM 的这个动作是一气呵成的，不能中断，不然会造成视觉上的不连贯
## React 中的 ref 有什么用?
使用 refs 获取。组件被调用时会新建一个该组件的实例。refs 会指向这个实例，可以是一个回调函数，回调函数会在组件被挂载后立即执行。
如果把 refs 放到原生 DOM 组件的 input 中，我们就可以通过 refs 得到 DOM 节点；如果把 refs 放到 React 组件中，那么我们获得的就是组件的实例，因此就可以调用实例的方法(如果想访问该组件的真实 DOM，那么可以用 React.findDOMNode 来找到 DOM 节点，但是不推崇此方法)
refs 无法用于无状态组件，无状态组件挂载时只是方法调用，没有新建实例。在 V16 之后，可以使用 useRef

