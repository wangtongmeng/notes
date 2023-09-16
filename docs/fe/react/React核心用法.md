# React核心用法

## 什么是React？

- React 是一个用于构建用户界面的JavaScript库 核心专注于视图,目的实现组件化开发

## 组件化的概念

- 我们可以很直观的将一个复杂的页面分割成若干个独立组件,每个组件包含自己的逻辑和样式 再将这些独立组件组合完成一个复杂的页面。 这样既减少了逻辑复杂度，又实现了代码的重用
  - 可组合：一个组件可以和其他的组件一起使用或者可以直接嵌套在另一个组件内部
  - 可重用：每个组件都是具有独立功能的，它可以被使用在多个场景中
  - 可维护：每个小的组件仅仅包含自身的逻辑，更容易被理解和维护

## 搭建React开发环境

```bash
cnpm i create-react-app -g
create-react-app project-name
cd project-name
npm start
```

## JSX

### 什么是JSX

- 是一种JS和HTML混合的语法,将组件的结构、数据甚至样式都聚合在一起定义组件 => JSX  javascript+xml html
- jsx其实只是react提供的一个语法糖，通过babel编译成React.createElement形式

```javascript
import React from 'react'; // 老的版本，我们只要用到JSX,就需要在顶部引入React变量，但是在新的版本里，不再需要引入React变量了
import ReactDOM from 'react-dom';
//jsx在执行的时候其实是一个函数调用，它是一个创建元素的工厂函数
//let element = React.createElement("h1", null, "Hello");
let element = <h1>Hello</h1>; // babel把jsx编译成React.createElement形式
console.log(JSON.stringify(element,null,2));
// 所谓的渲染就是按照react元素所的描述的结构，创建真实的DOM元素，并插入root容器内
// 建筑工人(render)按照设计纸(element)，把真实房子盖到制定地点(document.getElementById('root'))
ReactDOM.render(
  element,document.getElementById('root')
);
```

React.createElement返回虚拟DOM

```javascript
{
  "type": "h1", // 元素的类型
  "key": null, // 是用来共分同一个父亲的不同的儿子的 DOM-DIFF会用到
  "ref": null, // 用来获取真的DOM元素
  "props": { // 属性 
    "children": "Hello"
  },
  "_owner": null,
  "_store": {}
}
```

### 什么是元素

- JSX其实只是一种语法糖,最终会通过[babeljs](https://www.babeljs.cn/repl)转译成createElement语法
- React元素是构成React应用的最小单位
- React元素用来描述你在屏幕上看到的内容
- React元素事实上是普通的JS对象,ReactDOM来确保浏览器中的DOM数据和React元素保持一致

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

// let element = <h1 className="title" style={{color:'red'}}>hello</h1>
let element = React.createElement("h1", {
  className: "title",
  style: {
    color: 'red'
  }
}, "hello");

console.log(JSON.stringify(element,null,2));

ReactDOM.render(element, document.getElementById('root'))
```

element

```javascript
{
  "type": "h1",
  "key": null,
  "ref": null,
  "props": {
    "className": "title",
    "style": {
      "color": "red"
    },
    "children": "hello"
  },
  "_owner": null,
  "_store": {}
}
```

### JSX表达式

- 可以任意地在 JSX 当中使用 JavaScript 表达式，在 JSX 当中的**表达式要包含在大括号里**
- 表达式就是变量 常量 操作符 混和在一起的组合

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

let title = 'hello';
let style = {backgroundColor:'green',color:'red'};
let element = <h1 style={style} className="active">{title+'world'}</h1>
ReactDOM.render(
  element,document.getElementById('root')
);

```

### JSX属性

- 需要注意的是JSX并不是HTML,更像JavaScript
- 在JSX中属性不能包含关键字，像class需要写成className,for需要写成htmlFor,并且属性名需要采用驼峰命名法

#### class=>className

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(
    <h1 className="title" style={{ color: 'red' }}>Hello</h1>,
    document.getElementById('root')
);
```

#### for=>htmlFor

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
// 点击label标签，光标自动定位到input框
ReactDOM.render(
  <form>
    <label htmlFor="username">用户名</label>
    <input id="username"></input>
  </form>,document.getElementById('root')
);

```

### JSX也是对象

- 可以在if或者for语句里使用JSX
- JSX可以作为函数的参数和返回值

#### if中使用

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

function greeting(name){
  if(name){
    return <h1>hello,{name}</h1>
  }else{
    return <h1>hello,Stranger</h1>
  }
}
let element = greeting('zhangsan');
ReactDOM.render(
  element,document.getElementById('root')
);

```

#### for中使用

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
let root = document.getElementById('root');
let names = ['张三', '李四', '王五'];
let elements = [];
for (let i = 0; i < names.length; i++) {
    elements.push(<li>{names[i]}</li>);
}
ReactDOM.render(
    <ul>
        {elements}
    </ul>,
    root
);
```

### 更新元素渲染

- React 元素都是immutable不可变的。当元素被创建之后，你是无法改变其内容或属性的。一个元素就好像是动画里的一帧，它代表应用界面在某一时间点的样子
- 更新界面的唯一办法是创建一个新的元素，然后将它传入ReactDOM.render()方法

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
let root = document.getElementById('root');
function tick() {
    const element = (
        <div>
            {new Date().toLocaleTimeString()}
        </div>
    );
    ReactDOM.render(element, root);
}
setInterval(tick, 1000);
```

### React只会更新必要的部分

- React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。
- 即便我们每秒都创建了一个描述整个UI树的新元素，React DOM 也只会更新渲染文本节点中发生变化的内容

## 组件 & Props

- 可以将UI切分成一些独立的、可复用的部件，这样你就只需专注于构建每一个单独的部件
- 组件从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素

### 函数(定义的)组件

- 函数组件其实是一个函数，接收一个单一的props对象并返回了一个React元素

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
let root = document.getElementById('root');

function Welcome(props){
  return <h1>Hello, {props.name}</h1>;
}

ReactDOM.render(<Welcome name="zhangsan"/>, root);
```

### 类(定义的)组件

- 组件分为内置原生组件和自定义组件
- 内置组件p h1 span type字符串
- 自定义组件 类型type是一个 函数 ,类组件的父类Component的原型上有一个属性isReactComponent={}

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
let root = document.getElementById('root');

class Welcome extends React.Component {
  render(){
      return <h1>Hello, {this.props.name}</h1>;
  }
}

ReactDOM.render(<Welcome name="zhangsan"/>, root);
```

### 组件渲染

- React元素不但可以是DOM标签，还可以是用户自定义的组件
- 当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）转换为单个对象传递给组件，这个对象被称之为props
- 组件名称必须以大写字母开头
- 组件必须在使用的时候定义或引用它
- 组件的返回值只能有一个根元素(可以用React.Fragment代替)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
let root = document.getElementById('root');

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
class Welcome2 extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

const element1= <Welcome name="zhangsan" />;
console.log(element1.props.name); // zhangsan
const element2= <Welcome2 name="lisi" />;
console.log(element2.props.name); // lisi

ReactDOM.render(
    <div>{element1}{element2}</div>,
    root
);
```

## 状态

- 组件的数据来源有两个地方，分别是属性对象和状态对象
- 属性是父组件传递过来的(默认属性，属性校验)
- 状态是自己内部的,改变状态唯一的方式就是setState
- 属性和状态的变化都会影响视图更新
- 定义状态的方法只有两个，一个是在构造函数中

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {date:new Date()};//唯一可以给状态直接赋值的地方就是构造函数
  }
  //组件挂载完成
  componentDidMount(){
    this.timer = setInterval(this.tick,1000);
  }
  //组件将要卸载
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  //类的属性 这样写法函数里的this永远指向组件的实例
  tick = ()=>{
    this.setState({date:new Date()})
  }
  render(){
    return (
      <div>
        <h1>Hello World</h1>
        <h2>现在时间是:{this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}
ReactDOM.render(<Clock/>,document.getElementById('root'));
```

### State 的更新可能是异步的

- 出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用
- 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态
- 可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数

下例的计数器，点击+后，数字变成1

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }
  handleClick = () => {
    this.setState({number:this.state.number+1});
    console.log(this.state.number); // 0 点击+后
    this.setState({number:this.state.number+1});
    console.log(this.state.number); // 0 点击+后
  }
  render() {
    return (
      <div >
        <p> {this.state.number} </p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);
```

让setState接收一个函数，这个函数用上一个 state 作为第一个参数，点击+号结果为2

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }
  handleClick = () => {
    this.setState((state) => (
      { number: state.number + 1 }
    ));
    console.log(this.state.number); // 0 点击+后
    this.setState((state) => (
      { number: state.number + 1 }
    ));
    console.log(this.state.number); // 0 点击+后
  }
  render() {
    return (
      <div >
        <p> {this.state.number} </p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);
```

### State 的更新会被合并

- 当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'zhangsan',
            age: 18
        };
    }
    handleClick = () => {
        this.setState({age:this.state.age+1});
        console.log(this.state.number);
        this.setState({age:this.state.age+1});

        // this.setState((state) => (
        //     { age: state.age + 1 }
        // ));
        // this.setState((state) => (
        //     { age: state.age + 1 }
        // ));
    }
    render() {
        return (
            <div >
                <p>{this.state.name}: {this.state.age} </p>
                <button onClick={this.handleClick}>+</button>
            </div>
        );
    }
}

ReactDOM.render(<
    Counter />,
    document.getElementById('root')
);
```

## 事件处理

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串
- 你不能通过返回false的方式阻止默认行为。你必须显式的使用preventDefault

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
class Link extends React.Component {
    handleClick(e) {
        e.preventDefault();
        alert('The link was clicked.');
    }

    render() {
        return (
            <a href="http://www.baidu.com" onClick={this.handleClick}>
                Click me
          </a>
        );
    }
}

ReactDOM.render(
    <Link />,
    document.getElementById('root')
);
```

### this

- 你必须谨慎对待 JSX 回调函数中的 this,可以使用，保证其指向组件实例:
  - 公共属性(箭头函数)
  - 匿名函数
  - bind进行绑定

```javascript
class LoggingButton extends React.Component {
    handleClick() {
        console.log('this is:', this);
    }
    handleClick1 = () => {
        console.log('this is:', this);
    }
    render() {
        //onClick={this.handleClick.bind(this)
        return (
            <button onClick={(event) => this.handleClick(event)}>
                Click me
        		</button>
        );
    }
}
```

### 向事件处理程序传递参数

- 匿名函数
- bind

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
class LoggingButton extends React.Component {
    handleClick = (id, event) => {
        console.log('id:', id);
    }
    render() {
        return (
            <>
                <button onClick={(event) => this.handleClick('1', event)}>
                    Click me
            		</button>
                <button onClick={this.handleClick.bind(this, '1')}>
                    Click me
            		</button>
            </>
        );
    }
}
ReactDOM.render(
    <LoggingButton />,
    document.getElementById('root')
);
```

### Ref

- Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素
- 在 React 渲染生命周期时，表单元素上的 value 将会覆盖 DOM 节点中的值，在非受控组件中，你经常希望 React 能赋予组件一个初始值，但是不去控制后续的更新。 在这种情况下, 你可以指定一个 defaultValue 属性，而不是value

#### 为 DOM 元素添加 ref

- 可以使用 ref 去存储 DOM 节点的引用
- 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
class Sum extends React.Component {
    a
    b
    result
    constructor(props) {
        super(props);
        this.a = React.createRef(); //{current:null}
        this.b = React.createRef();
        this.result = React.createRef();
    }
    handleAdd = () => {
        let a = this.a.current.value;
        let b = this.b.current.value;
        this.result.current.value = a + b;
    }
    render() {
        return (
            <>
                <input ref={this.a} />+<input ref={this.b} /><button onClick={this.handleAdd}>=</button><input ref={this.result} />
            </>
        );
    }
}
ReactDOM.render(
    <Sum />,
    document.getElementById('root')
);
```

#### 为 class 组件添加 Ref

- 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
class Form extends React.Component {
    input
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }
    getFocus = () => {
      	// //this.textInputRef.current就会指向TextInput类组件的实例
        this.input.current.getTextInputFocus();
    }
    render() {
        return (
            <>
                <TextInput ref={this.input} />
                <button onClick={this.getFocus}>获得焦点</button>
            </>
        );
    }
}
class TextInput extends React.Component {
    input
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }
    getTextInputFocus = () => {
        this.input.current.focus();
    }
    render() {
        return <input ref={this.input} />
    }
}
ReactDOM.render(
    <Form />,
    document.getElementById('root')
);
```

#### Ref转发

- 你不能在函数组件上使用 ref 属性，因为他们没有实例
- Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧
- Ref 转发允许某些组件接收 ref，并将其向下传递（换句话说，“转发”它）给子组件

> 给函数组件包裹一层类组件，类组件上可以使用ref属性，再传给函数组件

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
class Form extends React.Component {
  input
  constructor(props) {
      super(props);
      this.input = React.createRef();
  }
  getFocus = () => {
      this.input.current.getFocus();
  }
  render() {
      return (
          <>
              <TextInput ref={this.input} />
              <button onClick={this.getFocus}>获得焦点</button>
          </>
      );
  }
}
//Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
function TextInput() {
  return <input />
}
ReactDOM.render(
  <Form />,
  document.getElementById('root')
);
```

使用forwardRef

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
interface InputProps { }
const TextInput = React.forwardRef((props, ref) => (
    <input ref={ref} />
));
class Form extends React.Component {
    input
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }
    getFocus = () => {
        console.log(this.input.current);

        this.input.current.focus();
    }
    render() {
        return (
            <>
                <TextInput ref={this.input} />
                <button onClick={this.getFocus}>获得焦点</button>
            </>
        );
    }
}

ReactDOM.render(
    <Form />,
    document.getElementById('root')
);
```

## 生命周期

### 旧版生命周期

![](http://cdn.wangtongmeng.com/20230914220335.png)

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Counter extends React.Component{ // 他会比较两个状态相等就不会刷新视图 PureComponent是浅比较
    static defaultProps = {
        name: '计数'
    };
    constructor(props) {
        super(props);
        this.state = { number: 0 }
        console.log('1.constructor构造函数')
    }
    componentWillMount() { // 取本地的数据 同步的方式：采用渲染之前获取数据，只渲染一次
        console.log('2.组件将要加载 componentWillMount');
    }
    componentDidMount() {
        console.log('4.组件挂载完成 componentDidMount');
    }
    handleClick = () => {
        this.setState({ number: this.state.number + 1 });
    };
    // react可以shouldComponentUpdate方法中优化 PureComponent 可以帮我们做这件事
    shouldComponentUpdate(nextProps, nextState) { // 代表的是下一次的属性 和 下一次的状态
        console.log('5.组件是否更新 shouldComponentUpdate');
        return nextState.number % 2 == 0;
        // return nextState.number!==this.state.number; //如果此函数种返回了false 就不会调用render方法了
    } //不要随便用setState 可能会死循环
    componentWillUpdate() {
        console.log('6.组件将要更新 componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('7.组件完成更新 componentDidUpdate');
    }
    render() {
        console.log('3.render');
        return (
            <div>
                <p>{this.state.number}</p>
                {this.state.number > 3 ? null : <ChildCounter n={this.state.number} />}
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}
class ChildCounter extends Component {
    componentWillUnmount() {
        console.log('组件将要卸载componentWillUnmount')
    }
    componentWillMount() {
        console.log('child componentWillMount')
    }
    render() { 
        console.log('child-render')
        return (<div>
            {this.props.n}
        </div>)
    }
    componentDidMount() {
        console.log('child componentDidMount')
    }
    componentWillReceiveProps(newProps) { // 第一次不会执行，之后属性更新时才会执行
        console.log('child componentWillReceiveProps')
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.n % 3 == 0; //子组件判断接收的属性 是否满足更新条件 为true则更新
    }
}
ReactDOM.render(<Counter />, document.getElementById('root'));
// defaultProps
// constructor
// componentWillMount
// render
// componentDidMount
// 状态更新会触发的
// shouldComponentUpdate nextProps,nextState=>boolean
// componentWillUpdate
// componentDidUpdate
// 属性更新
// componentWillReceiveProps newProps
// 卸载
// componentWillUnmount
```

### 新版生命周期

![](http://cdn.wangtongmeng.com/20230914220408.png)

#### getDerivedStateFromProps

- static getDerivedStateFromProps(props, state) 这个生命周期的功能实际上就是将传入的props映射到state上面
- getDerivedStateFromProps是为了取代componentWillReceiveProps，因为有很多人在使用componentWillReceiveProps时会调用this.setState经常引起死循环

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
class ChildCounter extends React.Component{
  state = {count:0}
  static defaultProps = {// 1.设置默认属性
    name:'ChildCounter'
  }
  static getDerivedStateFromProps(nextProps,prevState){
    const {count} = nextProps;
    //return null;//不修改状态
    return {...prevState,count:count*2};//新的状态对象
  }
  render(){
    return <div id="ChildCounter">ChildCounter:{this.state.count}</div>
  }
}
class Counter extends React.Component{
  static defaultProps = {// 1.设置默认属性
    name:'Counter'
  }
  constructor(props){
    super(props);
    this.state = {number:0};//2.设置默认状态
  }
  handleClick = (event)=>{
    this.setState({number:this.state.number+1});
  }
  render(){
    return (
      <div id="Counter">
        <p>Counter:{this.state.number}</p>
        <ChildCounter count={this.state.number}/>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter/>,document.getElementById('root'));
```

#### getSnapshotBeforeUpdate

- getSnapshotBeforeUpdate() 被调用于render之后，可以读取但无法使用DOM的时候。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数传递给componentDidUpdate()。

```javascript
import React from './react';
import ReactDOM from './react-dom';
let counter = 0;
class ScrollList extends React.Component{
  constructor(props){
    super(props);
    this.state = {messages:[]};
    this.wrapper = React.createRef();
  }
  addMessage = ()=>{
    this.setState(state=>({
      messages:[counter++,...state.messages]
    }));
  }
  componentDidMount(){
    this.timer = setInterval(()=>{ // 设置定时器
      this.addMessage();
    },1000);
  }
  componentWillUnmount(){ // 清除定时器
    clearInterval(this.timer);
  }
  getSnapshotBeforeUpdate(){ // 我们获取当前rootNode的scrollHeight，传到componentDidUpdate 的参数perScrollHeight
    return {
      prevScrollTop:this.wrapper.current.scrollTop,//更新前向上卷去的高度 50
      prevScrollHeight:this.wrapper.current.scrollHeight//更新内容的高度 200
    }
  }
  componentDidUpdate(prevProps,prevState,{prevScrollTop,prevScrollHeight}){
    // 当前向上卷去的高度加上增加的内容高度
    this.wrapper.current.scrollTop=prevScrollTop+(this.wrapper.current.scrollHeight-prevScrollHeight);
  }
  render(){
    let style = {
      height:'100px',
      width:'200px',
      border:'1px solid red',
      overflow:'auto'
    }
    //<div key={index}>里不要加空格!
    return (
      <div style={style} ref={this.wrapper}>
        {
          this.state.messages.map((message,index)=>{
            return <div key={index}>{message}</div>
          })
        }
      </div>
    )
  }
}
ReactDOM.render(<ScrollList/>,document.getElementById('root'));
```

## Context(上下文)

- 在某些场景下，你想在整个组件树中传递数据，但却不想手动地在每一层传递属性。你可以直接在 React 中使用强大的contextAPI解决上述问题
- 在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这些属性是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props
- contextType只能用在类组件里，Consumer可以在类组件和函数组件中使用

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
let ThemeContext = React.createContext();
/* let ThemeContext = React.createContext();
let { Provider, Consumer } = ThemeContext; */
//ThemeContext={Provider,Consumer} Consumer一般用在函数组件中
function Header(){
  return (
    <ThemeContext.Consumer>
      {
        value=>(
          <div style={{ margin: '10px', border: `5px solid ${value.color}`, padding: '5px' }}>
            头部
            <Title />
          </div>
        )
      }
    </ThemeContext.Consumer>
  )
}
class Title extends React.Component {
  static contextType = ThemeContext
  render() {
    return (
      <div style={{ margin: '10px', border: `5px solid ${this.context.color}`, padding: '5px' }}>
        标题
      </div>
    )
  }
}
class Main extends React.Component {
  static contextType = ThemeContext
  render() {
    return (
      <div style={{ margin: '10px', border: `5px solid ${this.context.color}`, padding: '5px' }}>
        主体
        <Content />
      </div>
    )
  }
}
class Content extends React.Component {
  static contextType = ThemeContext
  render() {
    return (
      <div style={{ margin: '10px', border: `5px solid ${this.context.color}`, padding: '5px'}}>
        内容
        <button onClick={()=>this.context.changeColor('red')}>变红</button>
        <button onClick={()=>this.context.changeColor('green')}>变绿</button>
      </div>
    )
  }
}
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: 'red' };
  }
  changeColor = (color) => {
    this.setState({ color });
  }
  render() {
    let contextValue = { color: this.state.color, changeColor: this.changeColor };
    return (
      <ThemeContext.Provider value={contextValue}>
        <div style={{ margin: '10px', border: `5px solid ${this.state.color}`, padding: '5px', width: '200px' }}>
          主页
           <Header />
          <Main />
        </div>
      </ThemeContext.Provider>
    )
  }
}
ReactDOM.render(<Page />, document.getElementById('root'));
```

多个context

```javascript
import React from './react';
import ReactDOM from './react-dom';
let GrandFatherContext = React.createContext();
let FatherContext = React.createContext();
class Son extends React.Component {
  render() {
    return (
      <GrandFatherContext.Consumer>
        {
          grandFatherValue=>{
            return (
              <FatherContext.Consumer>
                {
                  fatherValue=>{
                    return <div>{grandFatherValue.name}:{fatherValue.age}</div>
                  }
                }
              </FatherContext.Consumer>
            )
          }
        }
      </GrandFatherContext.Consumer>
    )
  }
}
class Father extends React.Component {
  render() {
    let fatherValue = { age:12 };
    return (
      <FatherContext.Provider value={fatherValue}>
        <div style={{ margin: '10px', border: `5px solid red`, padding: '5px' }}>
          <Son/>
        </div>
      </FatherContext.Provider>
    )
  }
}
class GrandFather extends React.Component {
  render() {
    let grandFatherValue = { name:'grandFather' };
    return (
      <GrandFatherContext.Provider value={grandFatherValue}>
        <div style={{ margin: '10px', border: `5px solid red`, padding: '5px', width: '200px' }}>
          <Father/>
        </div>
      </GrandFatherContext.Provider>
    )
  }
}
ReactDOM.render(<GrandFather />, document.getElementById('root'));

/**
let context = {
  $$typeof: Symbol(react.context)
  Consumer: {$$typeof: Symbol(react.context), _context: {…}}
  Provider: {$$typeof: Symbol(react.provider), _context: {…}}
  _currentValue: {color:'red'}
}
 */
```

## 高阶组件

- 高阶组件就是一个函数，传给它一个组件，它返回一个新的组件
- 高阶组件的作用其实就是为了组件之间的代码复用
- 高阶组件两大用途：属性代理 反向继承
- 高阶组件来自高阶函数

```javascript
const NewComponent = higherOrderComponent(OldComponent)
```

### cra支持装饰器

#### 安装

```bash
cnpm i react-app-rewired customize-cra @babel/plugin-proposal-decorators -D
```

#### 修改package.json

```json
"scripts": {
    "start": "set DISABLE_NEW_JSX_TRANSFORM=true&&react-app-rewired start",
    "build": "set DISABLE_NEW_JSX_TRANSFORM=true&&react-app-rewired build",
    "test": "set DISABLE_NEW_JSX_TRANSFORM=true&&react-app-rewired test",
    "eject": "set DISABLE_NEW_JSX_TRANSFORM=true&&react-app-rewired eject"
  },
```

或

```json
 "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  }
```

#### config-overrides.js

根目录

```javascript
const {override,addBabelPlugin} = require('customize-cra');

module.exports = override(
  addBabelPlugin( [
    "@babel/plugin-proposal-decorators", { "legacy": true }
  ])
)
```

#### jsconfig.json

根目录

```javascript
{
  "compilerOptions": {
     "experimentalDecorators": true
  }
}
```

### 属性代理&@修饰符

- 基于属性代理：操作组件的props

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const withLoading = (OldComponent)=>{
   return class extends React.Component{
    show = ()=>{
      let loading = document.createElement('div');
      loading.innerHTML = `<p id="loading" 
      style="position:absolute;top:100px;left:50%;z-index:10;background-color:gray">loading</p>`;
      document.body.appendChild(loading);
    }
    hide = ()=>{
      document.getElementById('loading').remove();
    }
    render(){
      return <OldComponent {...this.props} show={this.show} hide={this.hide}/>
    }
   }
}
@withLoading
class Panel extends React.Component{
  render(){
    return (
      <div>
        {this.props.title}
        <button onClick={this.props.show}>显示</button>
        <button onClick={this.props.hide}>隐藏</button>
      </div>
    )
  }
}
//let LoadingPanel = withLoading(Panel);
ReactDOM.render(<Panel title="这是标题"/>, document.getElementById('root'));
```

### 反向继承

- 基于反向继承：拦截生命周期、state、渲染过程

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
class Button extends React.Component{
    state = {name:'张三'}
    componentWillMount(){
        console.log('Button componentWillMount');
    }
    componentDidMount(){
        console.log('Button componentDidMount');
    }
    render(){
        console.log('Button render');
        return <button name={this.state.name} title={this.props.title}/>
    }
}
const wrapper = OldComponent =>{
    return class NewComponent extends OldComponent{
        state = {number:0}
        componentWillMount(){
            console.log('WrapperButton componentWillMount');
             super.componentWillMount();
        }
        componentDidMount(){
            console.log('WrapperButton componentDidMount');
             super.componentDidMount();
        }
        handleClick = ()=>{
            this.setState({number:this.state.number+1});
        }
        render(){
            console.log('WrapperButton render');
            let renderElement = super.render();
            let newProps = {
                ...renderElement.props,
                ...this.state,
                onClick:this.handleClick
            }
            return  React.cloneElement(
                renderElement,
                newProps,
                this.state.number
            );
        }
    }
}
let WrappedButton = wrapper(Button);
ReactDOM.render(
    <WrappedButton title="标题"/>, document.getElementById('root'));
```

## render props

- [render-props](https://zh-hans.reactjs.org/docs/render-props.html)
- render prop是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术
- 具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑
- render prop 是一个用于告知组件需要渲染什么内容的函数 prop
- 这也是逻辑复用的一种方式

### 原生实现

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div onMouseMove={this.handleMouseMove}>
                <h1>移动鼠标!</h1>
                <p>当前的鼠标位置是 ({this.state.x}, {this.state.y})</p>
            </div>
        );
    }
}
ReactDOM.render(<MouseTracker />, document.getElementById('root'));
```

### children

- children是一个渲染的方法

```javascript
import React from './react';
import ReactDOM from './react-dom';

class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div onMouseMove={this.handleMouseMove}>
                {this.props.children(this.state)}
            </div>
        );
    }
}
ReactDOM.render(<MouseTracker >
    {
        (props) => (
            <div>
                <h1>移动鼠标!</h1>
                <p>当前的鼠标位置是 ({props.x}, {props.y})</p>
            </div>
        )
    }
</MouseTracker >, document.getElementById('root'));
```

### render属性

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div onMouseMove={this.handleMouseMove}>
                {this.props.render(this.state)}
            </div>
        );
    }
}

ReactDOM.render(< MouseTracker render={params => (
    <>
        <h1>移动鼠标!</h1>
        <p>当前的鼠标位置是 ({params.x}, {params.y})</p>
    </>
)} />, document.getElementById('root'));
```

### HOC

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
function withTracker(OldComponent){
  return class MouseTracker extends React.Component{
    constructor(props){
        super(props);
        this.state = {x:0,y:0};
    }
    handleMouseMove = (event)=>{
        this.setState({
            x:event.clientX,
            y:event.clientY
        });
    }
    render(){
        return (
            <div onMouseMove = {this.handleMouseMove}>
               <OldComponent {...this.state}/>
            </div>
        )
    }
 }
}
//render
function Show(props){
    return (
        <React.Fragment>
          <h1>请移动鼠标</h1>
          <p>当前鼠标的位置是: x:{props.x} y:{props.y}</p>
        </React.Fragment>
    )
}
let HighShow = withTracker(Show);
ReactDOM.render(
    <HighShow/>, document.getElementById('root'));
```

## shouldComponentUpdate

### PureComponent

### memo
