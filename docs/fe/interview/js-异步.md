# js-异步

## 请描述 event loop（事件循环/事件轮询）的机制

- 同步代码，一行一行放在 Call Stack 执行
- 遇到异步，会先“记录”下，等待时机（定时、网络请求等）
- 时机到了，就移动到 Callback Queue
- 如 Call Stack 为空（即同步代码执行完）Event Loop 开始工作
- 轮询查找 Callback Queue，如有则移动到 Call Stack 执行
- 然后继续轮询查找（永动机一样）

讲的时候分三步

- event loop 的核心过程
- 和 DOM 渲染的关系
- 微任务和宏任务在 event loop 过程中的不同处理

## DOM 事件和 event loop

- JS 是单线程的
- 异步（setTimeout ajax 等）使用回调，基于 event loop
- DOM 事件也使用回调，基于 event loop

```html
<button id="btn1">提交</button>

<script>
console.log('Hi')

// 同步代码执行，回调函数会被暂存起来，知道点击事件发生，加入队列
$('#btn1').click(function (e) {
    console.log('button clicked')
})

console.log('Bye')
</script>
```

## 什么是宏任务和微任务，两者有什么区别？

- 什么是宏任务、微任务，区别
  - 宏任务：setTimeout，setInterval，Ajax，DOM 事件
  - 微任务：Promise async/await
  - 区别：微任务（DOM渲染之前触发）执行时机比宏任务（DOM渲染之后触发）要早



- event loop 和 DOM 渲染
  - JS 是单线程的，而且和 DOM 渲染共用一个线程
  - JS 执行时，得留一些时机供 DOM 渲染
  - 每次 CallStack 清空（即每次轮询结束），即同步任务执行完
  - 都是 DOM 重新渲染的机会， DOM 结构如有改变则重新渲染
  - 然后再触发下一次 Event Loop
- 微任务和宏任务的区别

```js
console.log(100)
setTimeout(() => {
    console.log(200)
})
Promise.resolve().then(() => {
    console.log(300)
})
console.log(400)
// 100 400 300 200
```

宏任务和微任务的本质区别

- 微任务是 ES6 语法规定的
- 宏任务是浏览器规定的

总结

- 宏任务、微任务有哪些？微任务触发时机更早
- 微任务、宏任务和 DOM 渲染的关系
- 微任务、宏任务和 DOM 渲染，在 event loop 的过程

## Promise 有哪三种状态？如何变化？

- pending resolved rejected
- pending -> resolved 或 pending -> rejected
- 变化不可逆
- 状态的变现
  - pending 状态，不会触发 then 和 catch
  - resolved 状态，会触发后续的 then 回调函数
  - rejected 状态，会触发后续的 catch 回调函数

```js
// 刚定义时，状态默认为 pending
const p1 = new Promise((resolve, reject) => {

})

// 执行 resolve() 后，状态变成 resolved
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    })
})

// 执行 reject() 后，状态变成 rejected
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject()
    })
})

// 直接返回一个 resolved 状态
Promise.resolve(100)
// 直接返回一个 rejected 状态
Promise.reject('some error')
```

then 和 catch 改变状态

- then 正常返回 resolved，里面有报错则返回 rejected
- catch 正常返回 resolved，里面有报错则返回 rejected

then catch 会继续返回 Promise ，**此时可能会发生状态变化！！！**

```js
// then() 一般正常返回 resolved 状态的 promise
Promise.resolve().then(() => {
    return 100
})

// then() 里抛出错误，会返回 rejected 状态的 promise
Promise.resolve().then(() => {
    throw new Error('err')
})

// catch() 不抛出错误，会返回 resolved 状态的 promise
Promise.reject().catch(() => {
    console.error('catch some error')
})

// catch() 抛出错误，会返回 rejected 状态的 promise
Promise.reject().catch(() => {
    console.error('catch some error')
    throw new Error('err')
})
```

Promise 总结

- 三种状态，状态的表现和变化
- then 和 catch 对状态的影响（重要）
- then 和 catch 的链式调用（常考）

## async / await 

- 异步回调 callback hell
- Promise then catch 链式调用，但也是基于回调函数
- async await 是同步语法，彻底消灭回调函数

async/await 和 Promise 的关系

- async/await 是消灭异步回调的终极武器
- 但和 Promise 并不互斥
- 反而，两者相辅相成
- 执行 async 函数，返回的是 Promise 对象
- await 相当于 Promise 的 then
- try...catch 可捕获异常，代替了 Promise 的 catch

```js
async function fn1() {
  return 100 // 相当于 return Promise.resolve(100) 包装成resolved的Promise
  // return Promise.resolve(200)
}
const res1 = fn1() // 执行 async 函数，返回一个 Promise 对象
res1.then(data => {
  console.log('data', data); // 100
})

!(async function () {
  const p1 = Promise.resolve(300)
  // await + Promise
  const data = await p1 // await  相当于 Promise.then
  console.log('data', data); // 300
})()

!(async function () {
  // await + 固定值 
  const data1 = await 400 // await 后面是数字，会处理成 Promise.resolve(400)
  console.log('data1', data1); // 400
})()


async function fn2() {
  return 100 
}
!(async function () {
  // await + async函数
  const data2 = await fn2() // async函数执行返回的是Promise，结合await 相当于 Promise.then了
  console.log('data2', data2); // 100
})()


!(async function () {
  const p4 = Promise.reject('err') // rejected 状态
  try {
    const res = await p4 // await xxx 相当于 .then。所以下面的log 1 如果rejected就走不到了
    console.log('1', res); // 走不到
  } catch (err) {
    // 打印 2 err
    console.error('2', err); // try...catch 相当于 promise catch
  }
})()
```

## 异步的本质

- async/await 是消灭异步回调的终极武器
- JS 还是单线程，还得是有异步，还得是基于 event loop
- async/await只是语法糖（好用！）

```js
// await 是同步写法，但本质还是异步调用。
async function async1 () {
  console.log('async1 start')
  await async2()
  console.log('async1 end') // 关键在这一步，它相当于放在 callback 中，最后执行
}

async function async2 () {
  console.log('async2')
}

console.log('script start')
async1()
console.log('script end')
// 即，只要遇到了 `await` ，后面的代码都相当于放在 callback 里。

// 结果： script start -> async1 start -> async2 -> script end -> async1 end
```



## 场景题 - Promise then 和 catch 连接

```js
// 第一题
Promise.resolve().then(() => {
    console.log(1)
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})
// 1 3

// 第二题
Promise.resolve().then(() => {
    console.log(1)
    throw new Error('erro1')
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})
// 1 2 3

// 第三题
Promise.resolve().then(() => {
    console.log(1)
    throw new Error('erro1')
}).catch(() => {
    console.log(2)
}).catch(() => { // 注意这里是 catch
    console.log(3)
})
// 1 2
```

## 场景题 - async / await 语法

1

```js
async function fn() {
    return 100
}
(async function () {
    const a = fn() // ??               // promise
    const b = await fn() // ??         // 100
})()
```

2

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


// a 100
// b 200
```

## 场景题 - Promise 和 setTimeout 顺序

```js
console.log(100)
setTimeout(() => {
    console.log(200)
})
Promise.resolve().then(() => {
    console.log(300)
})
console.log(400)
// 100 400 300 200
```

## 场景题 - 执行顺序

```js
async function async1 () {
  console.log('async1 start')
  await async2() // 这一句会同步执行，返回 Promise ，其中的 `console.log('async2')` 也会同步执行
  console.log('async1 end') // 上面有 await ，下面就变成了“异步”，类似 cakkback 的功能（微任务）
}

async function async2 () {
  console.log('async2')
}

console.log('script start')

setTimeout(function () { // 异步，宏任务
  console.log('setTimeout')
}, 0)

async1()

new Promise (function (resolve) { // 返回 Promise 之后，即同步执行完成，then 是异步代码
  console.log('promise1') // Promise 的函数体会立刻执行
  resolve()
}).then (function () { // 异步，微任务
  console.log('promise2')
})

console.log('script end')

// 同步代码执行完之后，屡一下现有的异步未执行的，按照顺序
// 1. async1 函数中 await 后面的内容 —— 微任务
// 2. setTimeout —— 宏任务
// 3. then —— 微任务

/**
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```

## 手写题 - 手写 Promise

- 初始化 & 异步调用
- then catch 链式调用
- API .resolve .reject .all .race 

```js
class MyPromise {
    state = 'pending' // 状态，'pending' 'fulfilled' 'rejected'
    value = undefined // 成功后的值
    reason = undefined // 失败后的原因

    resolveCallbacks = [] // pending 状态下，存储成功的回调
    rejectCallbacks = [] // pending 状态下，存储失败的回调

    constructor(fn) {
        const resolveHandler = (value) => {
            // 加 setTimeout ，参考 https://coding.imooc.com/learn/questiondetail/257287.html (2022.01.21)
            setTimeout(() => {
                if (this.state === 'pending') {
                    this.state = 'fulfilled'
                    this.value = value
                    this.resolveCallbacks.forEach(fn => fn(value))
                }
            })
        }

        const rejectHandler = (reason) => {
            // 加 setTimeout ，参考 https://coding.imooc.com/learn/questiondetail/257287.html (2022.01.21)
            setTimeout(() => {
                if (this.state === 'pending') {
                    this.state = 'rejected'
                    this.reason = reason
                    this.rejectCallbacks.forEach(fn => fn(reason))
                }
            })
        }

        try {
            fn(resolveHandler, rejectHandler)
        } catch (err) {
            rejectHandler(err)
        }
    }

    then(fn1, fn2) {
        fn1 = typeof fn1 === 'function' ? fn1 : (v) => v
        fn2 = typeof fn2 === 'function' ? fn2 : (e) => e

        if (this.state === 'pending') {
            const p1 = new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    try {
                        const newValue = fn1(this.value)
                        resolve(newValue)
                    } catch (err) {
                        reject(err)
                    }
                })

                this.rejectCallbacks.push(() => {
                    try {
                        const newReason = fn2(this.reason)
                        reject(newReason)
                    } catch (err) {
                        reject(err)
                    }
                })
            })
            return p1
        }

        if (this.state === 'fulfilled') {
            const p1 = new MyPromise((resolve, reject) => {
                try {
                    const newValue = fn1(this.value)
                    resolve(newValue)
                } catch (err) {
                    reject(err)
                }
            })
            return p1
        }

        if (this.state === 'rejected') {
            const p1 = new MyPromise((resolve, reject) => {
                try {
                    const newReason = fn2(this.reason)
                    reject(newReason)
                } catch (err) {
                    reject(err)
                }
            })
            return p1
        }
    }

    // 就是 then 的一个语法糖，简单模式
    catch(fn) {
        return this.then(null, fn)
    }
}

MyPromise.resolve = function (value) {
    return new MyPromise((resolve, reject) => resolve(value))
}
MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => reject(reason))
}

MyPromise.all = function (promiseList = []) {
    const p1 = new MyPromise((resolve, reject) => {
        const result = [] // 存储 promiseList 所有的结果
        const length = promiseList.length
        let resolvedCount = 0

        promiseList.forEach(p => {
            p.then(data => {
                result.push(data)

                // resolvedCount 必须在 then 里面做 ++
                // 不能用 index
                resolvedCount++
                if (resolvedCount === length) {
                    // 已经遍历到了最后一个 promise
                    resolve(result)
                }
            }).catch(err => {
                reject(err)
            })
        })
    })
    return p1
}

MyPromise.race = function (promiseList = []) {
    let resolved = false // 标记
    const p1 = new Promise((resolve, reject) => {
        promiseList.forEach(p => {
            p.then(data => {
                if (!resolved) {
                    resolve(data)
                    resolved = true
                }
            }).catch((err) => {
                reject(err)
            })
        })
    })
    return p1
}
```



