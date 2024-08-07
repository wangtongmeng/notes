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

答案

- undefined string number boolean symbo
- object(注意，typeof null === 'object')
- function

### 合适使用 === 何时使用 == ，区别

除了 == null 之外，其他一律用 ===，例如

```js
const obj = {x: 100}
if (obj.a == null) {}
// 相当于： if (obj.a === null || obj.a === undefined) {}
```

- == 会尝试类型转换
- === 严格相等
- 哪些场景才用 == ?

### 列举强制类型转换和隐式类型转换

- 强制： `parseInt` `parseFloat`toString 等
- 隐式 `if` 、逻辑运算、`==` 、 `+` 拼接字符串

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

### js中for-in和for-of的区别？

- 遍历对象：for...in 可以，for...of 不可以
- 遍历 Map Set: for...of 可以，for...in 不可以
- 遍历 generator: for...of 可以，for...in 不可以

可枚举 vs 可迭代

- for...in 用于**可枚举**数据，对象、数组、字符串，得到 key
- for...of 用于**可迭代**数据，如数组、字符串、Map、Set，得到 value

### for-of 连环问 for await ... of  有什么作用？

for await ... of  相当于 Promise.all

### Ajax Fetch Axios 的区别？

三者都用于网络请求，但是不同维度

- ajax 一种技术统称
- fetch，一个具体的 API
- axios，第三方库

Fetch

- 浏览器原生 API，用于网络请求
- 和 XMLHttpRequest 一个级别
- Fetch 语法更加简洁、易用，支持 Promise

### 节流和防抖的区别及应用场景

防抖

- 防止抖动
- 场景：搜索

节流

- 节流，节省交互沟通。流，不一定指流量
- 按指定时间节奏来
- 场景：drag 或 scroll 期间触发某个回调，要设置要个时间间隔

答案

- 节流：限制执行频率，有节奏的执行
- 防抖：限制执行次数，多次密集的触发只会执行一次
- 节流关注过程，防抖关注结果

### split() 和 join 的区别

### 数组的 pop push unshift shift 分别做什么,扩展：数组的API，有哪些是纯函数？

```js
// const arr = [10, 20, 30, 40]

// // pop
// const popRes = arr.pop()
// console.log(popRes, arr)

// // shift
// const shiftRes = arr.shift()
// console.log(shiftRes, arr)

// // push
// const pushRes = arr.push(50) // 返回 length
// console.log(pushRes, arr)

// // unshift
// const unshiftRes = arr.unshift(5) // 返回 length
// console.log(unshiftRes, arr)



// // 纯函数：1. 不改变源数组（没有副作用）；2. 返回一个数组
// const arr = [10, 20, 30, 40]

// // concat
// const arr1 = arr.concat([50, 60, 70])
// // map
// const arr2 = arr.map(num => num * 10)
// // filter
// const arr3 = arr.filter(num => num > 25)
// // slice
// const arr4 = arr.slice()

// // 非纯函数
// // push pop shift unshift
// // forEach
// // some every
// // reduce




```

### 数组 slice 和 splice 的区别

```js
// const arr = [10, 20, 30, 40, 50]

// // slice 纯函数
// const arr1 = arr.slice()
// const arr2 = arr.slice(1, 4)
// const arr3 = arr.slice(2)
// const arr4 = arr.slice(-3)

// // splice 非纯函数
// const spliceRes = arr.splice(1, 2, 'a', 'b', 'c')
// // const spliceRes1 = arr.splice(1, 2)
// // const spliceRes2 = arr.splice(1, 0, 'a', 'b', 'c')
// console.log(spliceRes, arr)
```



### [10,20,30].map(parseInt) 返回结果是什么

```js
const res = [10, 20, 30].map(parseInt)
console.log(res) // [10, NaN, NaN]

// 拆解
[10, 20, 30].map((num, index) => {
    return parseInt(num, index)
})
```

### 如何捕获 JS 程序中的异常？

![](http://cdn.wangtongmeng.com/20240731152724.png)

### 什么是 JSON ？

- json 是一种数据格式，本质是一段字符串。
- json 格式和 JS 对象结构一致，对 JS 语言更友好
- window.JSON 是一个全局对象：JSON.stringify JSON.parse

### 获取当前页面 url 参数

- 传统方式，查找 location.search
- 新 API， URLSearchParams

### 介绍 RAF requestAnimationFrame

- 要想动画流畅，更新频率要 60帧/s，即 16.67ms 更新一次视图
- setTimeout 要手动控制频率，而 RAF 浏览器会自动控制
- 后台标签或隐藏 iframe 中，RAF 会暂停，而 setTimeout 依然会执行

## Map 和 Set

### 有序和无序

- 有序：操作慢
- 无序：操作快，但无序
- 如何结合两者优点呢？---二叉树、及其变种

### Map 和 Object 的区别

- API 不同，Map 可以以任意类型为 key
- Map 是有序结构（重要）
- Map 操作同样很快

### Set 和数组的区别

- API 不同
- Set 元素不能重复
- Set 是无序结构，操作很快

### WeakMap 和 WeakSet

- 弱引用，防止内存泄露
- WeakMap 只能用对象作为 key，WeakSet 只能用对象做 value
- 没有 forEach 和 size (弱引用，随时可能销毁)，只能用 add delete has

## 模块化

### es module 和 commonjs 模块化的区别?

```js
ES Module (ESM) 和 CommonJS 是 JavaScript 中两种主要的模块化规范，它们在使用方式、加载时机和一些特性上有明显的区别：

ES Module (ESM)
静态解析： ES 模块是在编译时静态解析的，这意味着模块的依赖关系在代码静态分析阶段就能确定，使得工具可以进行更好的优化和分析。

异步加载： ES 模块使用 import 和 export 关键字进行导入导出，这些语句是异步加载的，意味着它们不会阻塞后续代码的执行。

单例模式： ES 模块在每个程序中只执行一次，且只初始化一次导出的内容。导出的内容是动态绑定的，即当模块内部发生变化时，外部导入的内容也会变化。

浏览器支持： 现代浏览器和 Node.js 都原生支持 ES 模块，不需要额外的工具或者转换器。

顶级作用域： 模块中的变量不会自动添加到全局作用域，每个模块都有自己的顶级作用域。

静态导入： ES 模块只能在顶层作用域中使用 import 和 export，不能在条件语句或函数内部导入和导出。

CommonJS
运行时加载： CommonJS 模块使用 require() 来加载模块，这是一种同步的方式，导致所有的 require() 都会在模块加载阶段进行。

多次初始化： 每次调用 require() 都会执行整个模块代码并初始化一次导出的内容，因此在同一个程序中可以多次初始化相同的模块。

动态绑定： 导出的内容是动态绑定的，即导出变量的值是实时计算的，不同于 ES 模块的静态绑定。

Node.js 支持： CommonJS 是 Node.js 的默认模块系统，也被广泛应用于前端开发的构建工具中（如Webpack）。

全局作用域： 模块中的变量如果没有使用 var、let 或 const 声明，会自动添加到全局作用域中。

动态导入： 可以在运行时根据条件动态地加载模块，使用 require() 方法可以在函数内部或条件语句中进行导入。

总结
ES Module 和 CommonJS 在设计和使用上有显著差异。ES Module 更适合用于现代 JavaScript 应用的开发和构建，因为它支持异步加载、静态解析和浏览器原生支持。CommonJS 则更适合于传统的服务器端 JavaScript 开发，因为它在 Node.js 中广泛使用，具有同步加载和动态特性。在现代前端开发中，通常会使用工具（如Webpack、Rollup等）来将这两种模块规范转换为浏览器可用的代码。
```

### AMD UMD commonjs es module 的区别

这些术语都是关于 JavaScript 模块化的不同标准或风格，它们主要用于描述在不同环境或需求下如何组织和使用模块。下面是它们的主要区别：

1. **AMD (Asynchronous Module Definition)**

   - AMD 是一种用于浏览器环境的模块定义规范，它支持异步加载模块，适用于需要在页面加载过程中异步加载模块的场景。主要由 RequireJS 推广和实现。

   - 特点

     ：

     - 支持异步加载模块，能够并行加载多个模块。
     - 主要用于浏览器环境，不是标准的 ECMAScript 规范。

   **示例**：

   ```
   javascriptCopy Codedefine(['module1', 'module2'], function(module1, module2) {
       // 模块定义
   });
   ```

2. **UMD (Universal Module Definition)**

   - UMD 是一种通用的模块定义规范，兼容 AMD、CommonJS 和全局变量方式。它的目的是实现跨平台、跨环境的模块兼容性。

   - 特点

     ：

     - 支持在多种环境中运行，既可以用于浏览器，也可以用于 Node.js 等环境。
     - 能够根据当前环境动态选择使用 AMD、CommonJS 或全局变量方式加载模块。

   **示例**：

   ```
   javascriptCopy Code(function (root, factory) {
       if (typeof define === 'function' && define.amd) {
           // AMD
           define(['jquery'], factory);
       } else if (typeof exports === 'object') {
           // CommonJS
           module.exports = factory(require('jquery'));
       } else {
           // 浏览器全局变量
           root.myModule = factory(root.jQuery);
       }
   }(this, function ($) {
       // 模块定义
       return {};
   }));
   ```

3. **CommonJS**

   - CommonJS 是一种用于服务器端的模块定义规范，主要在 Node.js 中使用。它是同步加载模块的规范，适合于服务器端和本地构建工具环境。

   - 特点

     ：

     - 使用 `require()` 同步加载模块，模块加载是阻塞的。
     - 主要用于 Node.js 环境，但在浏览器端可以通过工具（如 Browserify、Webpack）转换使用。

   **示例**：

   ```
   javascriptCopy Codeconst module1 = require('module1');
   const module2 = require('module2');
   
   // 模块定义
   ```

4. **ES Module (ES6 Module)**

   - ES Module 是 ECMAScript 6 引入的官方标准模块系统，支持静态加载、编译时优化等特性，适用于现代浏览器和 Node.js 等环境。

   - 特点

     ：

     - 使用 `import` 和 `export` 关键字定义模块，支持静态解析和优化。
     - 可以异步加载模块，但主要在编译时静态解析，因此不支持动态路径或变量作为模块的导入路径。

   **示例**：

   ```
   javascriptCopy Codeimport module1 from 'module1';
   import { func } from 'module2';
   
   // 模块定义
   ```

### 总结

- **AMD** 和 **CommonJS** 是非标准的模块系统，主要用于浏览器和服务器端。
- **UMD** 是为了兼容 AMD、CommonJS 和全局变量而设计的通用模块规范。
- **ES Module** 是官方标准的 ECMAScript 6 模块系统，适用于现代浏览器和 Node.js。

在实际应用中，可以根据项目需求和运行环境选择合适的模块规范或使用转换工具（如 Babel、Webpack）实现模块的兼容性和优化。

## 作用域与作用域链

### 函数声明和函数表达式的区别

- 函数声明 function fn() {...}
- 函数表达式 const fn = function() {...}
- 函数声明会在代码执行前预加载，而函数表达式不会

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

### 

### 闭包

#### 什么是闭包？有什么特性？有什么负面影响？

- 回顾作用域和自由变量
- 回顾闭包应用场景：作为参数被传入，作为返回值被返回
- 回顾：自由变量的查找，要在**函数定义的地方**，而非执行的地方
- 影响：变量会常驻内存，得不到释放。闭包不要乱用

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

#### 闭包什么时候会造成内存泄露？

监听事件中的闭包数据、定时器中的闭包函数，没有在组件销毁时清楚掉

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

```js
fn.call(this, p1, p2, p3)
fn.apply(this, arguments)
```



### 箭头函数有什么缺点？什么时候不能使用？

缺点：

- 没有 arguments
- 无法通过 call apply bind 改变 this
- 不适用对象方法、原型方法、构造函数、动态上下文的回调函数，vue的生命周期和method
- 某些箭头函数难以阅读

```js
// 难以阅读的
const fn3 = (a, b) => b === undefined ? b => a * b : a * b

// 不适用于对象方法
const obj = {
  name: 'lisi',
  getName: () => {
    return this.name
	}
}
console.log(obj.getName()) // undefined

// 不适用于原型方法
const obj = { name: 'lisi' }
obj.__proto__.getName = () => {
  return this.name
}
console.log(obj.getName()) // undefined

// 不适用于构造函数
const Foo = (name, age) => {
  this.name = name
  this.age = age
}
const f = new Foo('lisi', 20) // TypeError: Foo is not a constructor

// 不适合 动态上下文中的回调函数
const btn1 = docuemnt.getElementById('btn1')
btn1.addEventListener('click', () => {
  this.innerHtml = 'clicked' // 
})
```



## 原型与原型链

### new Object() 和 Object.create() 的区别

- {} 等同于 new Object()，原型 Object.prototype
- Object.create(null) 没有原型
- Object.create({...}) 可指定原型

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

### 浏览器和 nodejs 的事件循环有什么区别？

单线程和异步

- JS 是单线程的（无论在浏览器还是 nodejs）
- 浏览器中 JS 执行和 DOM 渲染共用一个线程
- 异步（单线程的解决方案）

宏任务和微任务

- 宏任务，如 setTimeout setInterval 网络请求
- 微任务，如 promise async/await
- 微任务是在下一轮 DOM 渲染之前执行，宏任务在之后执行

nodejs 异步

- Nodejs 同样使用 ES 语法，也是单线程，也需要异步
- 异步任务分为：宏任务+微任务
- 但是，它的宏任务和微任务，分不同类型，有不同优先级

nodejs 宏任务类型和优先级

- Timers - setTimeout setInterval
- I/O callbacks - 处理网络、流、TCP 的错误回调
- Idle，prepare - 闲置状态（nodejs 内部使用）
- Poll 轮询 - 执行 poll 中的 I/O 队列
- Check 检查 - 存储 setImmediate 回调
- Close callbacks - 关闭回调，如 socket.on('close')

nodejs 微任务类型和优先级

- 包括：promise，async/await，process.nextTick
- 注意，process.nextTick 优先级最高

nodejs event loop

- 执行同步代码
- 执行微任务（process.nextTick 优先级更高）
- 按顺序执行6个类型的宏任务（每个结束时都执行当前的微任务）

<img src="http://cdn.wangtongmeng.com/20240701093414.png" style="zoom:33%;" />

答案

- 浏览器和 nodejs 的 event loop 流程基本相同
- nodejs 宏任务和微任务分类型，有优先级

## es6+

### 模块化

## DOM与BOM

## 垃圾回收与内存泄露

### JS 内存泄露如何检测？场景有哪些？

垃圾回收 GC

- 什么是垃圾回收？系统清除用不到的数据
- 引用计数（之前）缺点：循环引用导致内存泄露
- 标记清除（现代）

连环问：闭包是内存泄露吗？

- 闭包不是内存泄露（不符合预期的才是内存泄露），只是闭包中被使用的数据是不能被垃圾回收的

JS 内存泄露如何检测？场景有哪些？

- 检测：通过浏览器的的performance，选中memory，进行记录。如果内存泄露了，heap会一直上升
- 内存泄露场景（Vue为例）
  - 被全局变量、函数引用，组件销毁时未清除
  - 被全局事件、定时器引用，组件销毁时未清除
  - 被自定义事件引用，组件销毁时未清除

扩展：WeakMap WeakSet

- 弱引用，避免内存泄露

## Web-API

### DOM

#### 如何阻止事件冒泡和默认行为？

- event.stopPropagation()
- event.preventDefault()

#### 如何减少 DOM 操作？

- 缓存 DOM 查询结果
- 多次 DOM 操作，合并到一次插入

<img src="http://cdn.wangtongmeng.com/20240729213958.png" style="zoom:33%;" />

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

<img src="http://cdn.wangtongmeng.com/20240729212800.png" style="zoom:33%;" />

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

#### **window.onload 和 DOMContentLoaded (ready) 的区别**

- 页面的全部资源加载完才会执行，包括图片、视频等
- DOM 渲染完即可执行，此时图片、视频还没有加载完

![](http://cdn.wangtongmeng.com/20240731104211.png)

## 输出题

### 异步

#### 1

```js
setTimeout(() => {
    console.log(1);
}, 0);
new Promise((resolve) => {
    console.log(2);
    resolve(3)
}).then(res => {
    console.log(res);
});
async function foo() {
    console.log(4);
};
(async () => {
    await foo();
    console.log(5);
})();

// 24351
```







