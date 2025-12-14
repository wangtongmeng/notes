# js基础

## 原型和原型链

- class和继承
- 类型判断 instanceof
- 原型和原型链

### class

- constructor
- 属性
- 方法

### 继承

- extends
- super
- 扩展或重写方法

### 类型判断 instanceof

```js
[] instanceof Arrary // true
[] instanceof Object // true
{} instanceof Object // true
```

## 异步

### Promise

 ### async await

async和 Promise 的关系

- 执行 aysnc 函数，返回的是Promise对象
- await 相当于 Promise 的 then
- try..catch 可捕获异常，代替了 Promise 的 catch

### 宏任务和微任务

- 宏任务：setTimeout、setInterval、ajax、DOM 事件
- 微任务：Promise async/await

### event loop过程

- 同步代码，一行一行放在 Call Stack 执行
- 遇到异步，会先“记录”下，等待时机（定时、网络请求等）
- 时机到了，就移动到 Callback Queue
- 如 Call Stack 为空（即同步代码执行完）Event Loop 开始工作
- 轮询查找 Callback Queue，如有则移动到 Call Stack 执行
- 然后继续轮询查询（像永动机）

### event loop 和 DOM 渲染

- JS 是单线程的，而且和 DOM 渲染共用一个线程
- 异步（setTimeout，ajax 等）使用回调，基于 event loop
- DOM 事件也使用回调，基于 event loop
- JS 执行时，得留一些时机工供 DOM 渲染
- 每次 Call Stack 清空(即每次轮询结束)，即同步任务执行完
- 都是 DOM 重新渲染的机会，DOM 结构如有改变则重新渲染
- 然后再触发下一次 Event Loop



