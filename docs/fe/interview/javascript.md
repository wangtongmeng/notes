# javascript面试题

## 基础

### typeof 能判断哪些类型

- 识别所有值类型
- 识别函数
- 判断是否是引用类型（不可再细分）

```js
// 判断所有值类型
let a
console.log(a) // 'undefined'
const str = 'abc'
typeof str  // 'string'
const n = 100
typeof n // 'number'
const b = true
typeof b // 'boolean'
const s = Symbol('s')
typeof s // 'symbol'
```

### 合适使用 === 何时使用 ==

除了 == null 之外，其他一律用 ===，例如

```js
const obj = {x: 100}
if (obj.a == null) {}
// 相当于： if (obj.a === null || obj.a === undefined) {}
```

### 列举强制类型转换和隐式类型转换

- 强制 `parseInt` `parseFloat`
- 隐式 `if` ，`==` ， `+` 拼接字符串

### 值类型和引用类型的区别

场景题

```js
const obj1 = { x: 100, y: 200 }
const obj2 = obj1
let x1 = obj1.x
obj2.x = 101
x1 = 102
console.log(obj1) // 这里打印出什么？ 

// {x: 101, y: 200}
```



### 类型转换

- 字符串拼接

- ==

- if 语句和逻辑运算

  - truly 变量：!!a === true 的变量

  - falsely 变量：!!a === false 的变量

  - ```
    falsely 变量有如下，（其余的就是 truely 变量）
    - 0
    - NaN
    - ''
    - null
    - undefined
    - false 本身
    
    // 逻辑运算的示例
    console.log(10 && 0)  // 0
    console.log('' || 'abc')  // 'abc'
    console.log(!window.abc)  // true
    ```

### 手写深度比较，如 lodash isEqual

### `split()` 和 `join()` 的区别

```js
'1-2-3'.split('-') //  ['1', '2', '3']
[1,2,3].join('-') // '1-2-3'
```

### 数组的变异方法和非变异方法

### `[10, 20, 30].map(parseInt)` 的结果是什么？

```js
[10, 20, 30].map(parseInt) // [10, NaN, NaN]

// 拆解开就是
[10, 20, 30].map((num, index) => {
  	// 这里的 index 是 0 1 2
    return parseInt(num, index)
    // parseInt 第二个参数是进制
    // 如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。
    // 如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN
})

[10, 20, 30].map((num, index) => {
    return parseInt(num, 10)
}) // [10, 20, 30]
```

### 手写 trim 函数，保证浏览器兼容性

### 正则

#### 判断字符串以字母开头，后面可以是数字，下划线，字母，长度为 6-30

```js
const reg = /^[a-zA-Z]\w{5,29}$/

/\d{6}/ // 邮政编码
/^[a-z]+$/ // 小写英文字母
/^[A-Za-z]+$/ // 英文字母
/^\d{4}-\d{1,2}-\d{1,2}$/ // 日期格式
/^[a-zA-Z]\w{5,17}$/ // 用户名（字母开头，字母数字下划线，5-17位）
/\d+\.\d+\.\d+\.\d+/ // 简单的 IP 地址格式
```



## 作用域与作用域链

### **var 和 let const 的区别**

- var 是 ES5 及之前的语法，let const 是 ES6 语法
- var 和 let 是变量，可修改；const 是常量，不可修改
- var 有变量提升，let const 没有
- var 没有块级作用域，let const 有 （ES6 语法有块级作用域）

### 对作用域和自由变量的理解，场景题

```js
let i
for(i = 1; i <= 3; i++) {
  setTimeout(function(){
      console.log(i)
  }, 0)
}
// what?

// 444
```



### 闭包

#### 1.什么是闭包？

#### 实际开发中闭包的应用

#### 手写 bind 函数

见手写题

#### 创建 10 个`<a>`标签，点击的时候弹出来对应的序号

```html
 <script>
    let i, a
    for (i = 0; i < 10; i++) {
      a = document.createElement('a')
      a.innerHTML = i + '<br>'
      a.addEventListener('click', function (e) {
        e.preventDefault()
        console.log(i)
      })
      document.body.appendChild(a)
    }
  </script>
```

#### 写一个闭包的示例

```js
function createCache() {
    const data = {} // 闭包中的数据，被隐藏，不被外界访问
    return {
        set: function (key, val) {
            data[key] = val
        },
        get: function (key) {
            return data[key]
        }
    }
}

const c = createCache()
c.set('a', 100)
console.log( c.get('a') )
```



### this

#### 1.对this对象的理解及应用场景

什么时候产生的，指向谁

#### this场景题

```js
const User = {
    count: 1,
    getCount: function() {
        return this.count
    }
}
console.log(User.getCount()) // what?
const func = User.getCount
console.log( func() ) // what?

// 第一个 1
// 第二个 undefined
```

#### 2.call、apply、bind的区别

## 原型与原型链

考点

### 如何判断一个变量是不是数组？

### class 的原型本质，怎么理解？

### `new Object()` 和 `Object.create()` 的区别

示例一

```javascript
const obj1 = {
    a: 10,
    b: 20,
    sum() {
        return this.a + this.b
    }
}
const obj2 = new Object({
    a: 10,
    b: 20,
    sum() {
        return this.a + this.b
    }
})
const obj3 = Object.create({
    a: 10,
    b: 20,
    sum() {
        return this.a + this.b
    }
})
// 分别打印看结构
```

<img src="http://cdn.wangtongmeng.com/20231017214046.png" style="zoom: 50%;" />

示例二

```javascript
const obj1 = {
    a: 10,
    b: 20,
    sum() {
        return this.a + this.b
    }
}
const obj2 = new Object(obj1)
console.log(obj1 === obj2) // true
const obj3 = Object.create(obj1)
console.log(obj1 === obj3) // false

const obj4 = Object.create(obj1)
console.log(obj3 === obj4) // false

// 然后修改 obj1 ，看 obj2 obj3 和 obj4
obj1.printA = function () {
    console.log(this.a)
}
```

## 面向对象

#### 对象的创建方式有哪些？

#### 对象的继承方式有哪些？

## 异步

#### 同步和异步的区别是什么？分别举一个同步和异步的例子

同步和异步

- 基于单线程
- 异步不会阻塞代码运行
- 同步会阻塞代码运行

哪些地方可能会阻塞呢？

- 网络请求，如 ajax 图片加载
- 定时任务，如 setTimeout

#### 一个关于`setTimeout`的笔试题

```js
// setTimeout 笔试题
console.log(1)
setTimeout(function () {
    console.log(2)
}, 1000)
console.log(3)
setTimeout(function () {
    console.log(4)
}, 0)
console.log(5)

//13542	
```



#### 手写用 Promise 加载一张图片

```js
function loadImg(src) {
    return new Promise((resolve, reject) => {
        const img = document.createElement("img");
        img.onload = () => {
            resolve(img);
        };
        img.onerror = () => {
            reject(new Error(`图片加载失败${src}`));
        };
        img.src = src;
    });
}

const src = "http://www.imooc.com/static/img/index/logo_new.png";

loadImg(src)
    .then((img) => {
    console.log(img.width);
    return img;
})
    .then((img) => {
    console.log(img.height);
})
    .catch((ex) => {
    console.error(ex);
});
```

#### 前端使用异步的场景有哪些

- 网络请求，如 ajax 图片加载
- 定时任务，如 setTimeout

#### async/await 语法问题

```js
(async function () {
    console.log('start')
    const a = await 100
    console.log('a', a)
    const b = await Promise.resolve(200)
    console.log('b', b)
    const c = await Promise.reject(300)
    console.log('c', c)
    console.log('end')
})() // 执行完毕，打印出那些内容？


```

<img src="http://cdn.wangtongmeng.com/20231018211053.png" style="zoom:50%;" />

## 事件轮询

## es6+

### 模块化

## DOM与BOM

## 垃圾回收与内存泄露

## Web-API

### DOM

#### DOM 是哪种基本的数据结构

树

#### DOM 操作的常用 API 有哪些

- 获取节点，以及获取节点的 Attribute 和 property
- 获取父节点 获取子节点
- 新增节点，删除节点

新增节点

```javascript
const div1 = document.getElementById('div1')
// 添加新节点
const p1 = document.createElement('p')
p1.innerHTML = 'this is p1'
div1.appendChild(p1) // 添加新创建的元素
// 移动已有节点。注意是移动！！！
const p2 = document.getElementById('p2')
div1.appendChild(p2)
```

获取父元素

```javascript
const div1 = document.getElementById('div1')
const parent = div1.parentNode
```

获取子元素

```javascript
const div1 = document.getElementById('div1')
const child = div1.childNodes
```

删除节点

```javascript
const div1 = document.getElementById('div1')
const child = div1.childNodes
div1.removeChild(child[0])
```

#### DOM 节点的 attr 和 property 有何区别

property 的获取和修改，是直接改变 JS 对象，而 Attibute 是直接改变 html 的属性。两种有很大的区别

```js
const pList = document.querySelectorAll('p')

const p = pList[0]

p.getAttribute('data-name')

p.setAttribute('data-name', 'imooc')

p.getAttribute('style')

p.setAttribute('style', 'font-size:30px;')
```

#### 如何一次性插入多个 DOM 节点，考虑性能

DOM 操作是昂贵的 —— 非常耗费性能。因此针对频繁的 DOM 操作一定要做一些处理。

例如缓存 DOM 查询结果

```js
// 不缓存 DOM 查询结果
for (let = 0; i < document.getElementsByTagName('p').length; i++) {
    // 每次循环，都会计算 length ，频繁进行 DOM 查询
}

// 缓存 DOM 查询结果
const pList = document.getElementsByTagName('p')
const length = pList.length
for (let i = 0; i < length; i++) {
    // 缓存 length ，只进行一次 DOM 查询
}
```

再例如，插入多个标签时，先插入 Fragment 然后再统一插入DOM

```js
const listNode = document.getElementById('list')

// 创建一个文档片段，此时还没有插入到 DOM 树中
const frag = document.createDocumentFragment()

// 执行插入
for(let x = 0; x < 10; x++) {
    const li = document.createElement("li")
    li.innerHTML = "List item " + x
    frag.appendChild(li)
}

// 都完成之后，再插入到 DOM 树中
listNode.appendChild(frag)
```

### BOM

#### 如何检测浏览器的类型

```js
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
console.log(isChrome)
```

#### 拆解 url 的各部分

```js
console.log(location.href)
console.log(location.protocol) // 'http:' 'https:'
console.log(location.pathname) // '/learn/199'
console.log(location.search)
console.log(location.hash)
```

### 事件

#### 事件委托（代理）是什么

#### 编写一个通用的事件监听函数

```js
function bindEvent(elem, type, selector, fn) {
    if (fn == null) {
        fn = selector
        selector = null
    }
    elem.addEventListener(type, function (e) {
        let target
        if (selector) {
            target = e.target
            if (target.matches(selector)) {
                fn.call(target, e)
            }
        } else {
            fn(e)
        }
    })
}
```

#### 描述DOM事件冒泡流程

\- DOM 树形结构

\- 事件会顺着触发元素往上冒泡

#### 对于一个无线下拉加载图片的页面，如何给每个图片绑定事件

使用代理，优点

- 使代码简洁

- 减少浏览器的内存占用

### 运行环境

#### **从输入url到得到html的详细过程**

- 浏览器根据 DNS 服务器得到域名的 IP 地址

- 向这个 IP 的机器发送 http 请求

- 服务器收到、处理并返回 http 请求

- 浏览器得到返回内容

#### **window.onload 和 DOMContentLoaded 的区别**

- 页面的全部资源加载完才会执行，包括图片、视频等
- DOM 渲染完即可执行，此时图片、视频还没有加载完

## 手写题

### compose

写法1

```javascript
const add1 = (str) => "1" + str;
const add2 = (str) => "2" + str;
const add3 = (str) => "3" + str;
function compose(...funcs) {
  // 返回一个函数，接收具体值
  return function (args) {
    // [add3,add2,add1] 倒着执行，并将结果作为下个一函数的入参
    for (let i = funcs.length - 1; i >= 0; i--) {
      args = funcs[i](args);
    }
    return args;
  };
}

let fn = compose(add3, add2, add1);
console.log(fn("lisi")); // 321lisi
```

写法2

```javascript
const add1 = (str) => "1" + str;
const add2 = (str) => "2" + str;
const add3 = (str) => "3" + str;

function compose(...funcs) {
  // reduce没有设默认值，所以a,b是前两个函数
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

/**
 *第一次 a=add3 b=add2 => (...args)=>add3(add2(...args))
 *第二次 a=(...args)=>add3(add2(...args)) b=add1 => (...args)=>add3(add2((add1(...args)))))
 */

let fn = compose(add3, add2, add1);
console.log(fn("lisi")); // 321lisi

```

### 实现call、apply、bind

### 深拷贝

### 手写深度比较，如 lodash isEqual

```js
// 手写深度比较，如 lodash isEqual

const obj1 = {a: 10, b: { x: 100, y: 200 }}
const obj2 = {a: 10, b: { x: 100, y: 200 }}

// 判断是否是 object
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}
// 全相等
function isEqual(obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) {
      // 值类型，不是对象或数组（注意，equal 时一般不会有函数，这里忽略）
      return obj1 === obj2
  }
  if (obj1 === obj2) {
      // 两个引用类型全相等（同一个地址）
      return true
  }
  // 两个都是引用类型，不全相等
  // 1. 先取出 obje2 obj2 的 keys，比较个数
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if (obj1Keys.length !== obj2Keys.length) {
      // keys 个数不相等，则不是全等
      return false
  }
  // 2. 以 obj1 为基准，和 obj2 依次递归比较
  for (let key in obj1) {
      // 递归比较
      const res = isEqual(obj1[key], obj2[key])
      if (!res) {
          // 遇到一个不相等的，则直接返回 false
          return false
      }
  }
  // 3. 都相等，则返回 true
  return true
}

console.log(isEqual(obj1, obj2) === true); // true
```

### 手写 trim 函数，保证浏览器兼容性

```js
String.prototype.trim = function () {
  // 知识点：原型，this，正则
  this.replace(/^\s+/, "").replace(/\s+$/, "")
}
```







