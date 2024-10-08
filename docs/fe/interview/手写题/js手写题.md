## 手写一个 getType 函数，获取详细的数据类型

- typeof - 只能判断值类型，其他就是 function 和 object
- instanceof - 需要两个参数来判断，而不是获取类型

```js
function getType(x) {
  const originType = Object.prototype.toString.call(x); // '[object String]'
  const spaceIndex = originType.indexOf(" ");
  const type = originType.slice(spaceIndex + 1, -1); // 'String'
  return type.toLowerCase(); // 'string'
}

// null undefined
console.log(getType(null) === "null");
console.log(getType(undefined) === "undefined");
// number
console.log(getType(100) === "number");
console.log(getType(NaN) === "number");
console.log(getType(Infinity) === "number");
console.log(getType(-Infinity) === "number");
// string
console.log(getType("abc") === "string");
// boolean
console.log(getType(true) === "boolean");
// symbol
console.log(getType(Symbol()) === "symbol");
// bigint
console.log(getType(BigInt(100)) === "bigint");
// object
console.log(getType({}) === "object");
// array
console.log(getType([]) === "array");
// function
console.log(getType(() => {}) === "function");
console.log(getType(class Foo {}) === "function");
// map
console.log(getType(new Map()) === "map");
// weakmap
console.log(getType(new WeakMap()) === "weakmap");
// set
console.log(getType(new Set()) === "set");
// weakset
console.log(getType(new WeakSet()) === "weakset");
// date
console.log(getType(new Date()) === "date");
// regexp
console.log(getType(new RegExp("")) === "regexp");
// error
console.log(getType(new Error()) === "error");
// promise
console.log(getType(Promise.resolve()) === "promise");
```

## 实现 new

new 一个 对象的过程

- 创建一个空对象 obj，继承构造函数的原型
- 执行构造函数（将 obj 作为 this）
- 返回 obj，如果构造函数返回的是引用类型则直接返回，否则返回新对象

```js
function myNew(fn, ...args) {
  const _this = Object.create(fn.prototype);
  const result = fn.call(_this, ...args);
  if (
    (result !== null && typeof result === "object") ||
    typeof result === "function"
  ) {
    return result;
  }
  return _this;
}

function fn1(a, b) {
  this.a = a;
  this.b = b;
}
const obj = myNew(fn1, 1, 2);

console.log(obj.__proto__ === fn1.prototype); // true
```

## 遍历 DOM 树

- 给一个 DOM 树
- 深度优先遍历，结果会输出什么？
- 广度优先遍历，结果会输出什么？

## 请手写一个 JS 函数，实现数组扁平化（Array Flatten）

- 写一个 JS 函数，实现数组扁平化，只减少一级嵌套
- 如输入 [1, [2, [3]], 4]，输出[1,2,[3],4]

```js
// 单层 扁平化 数组
// [1, [2, [3], 4], 5] => [1, 2, [3], 4, 5]
// 数组深度扁平化
// [1, [2, [3], 4], 5] => [1, 2, 3, 4, 5]

// 数组扁平化，使用 push
function flatten1(arr) {
  const res = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      item.forEach((n) => res.push(n));
    } else {
      res.push(item);
    }
  });
  return res;
}
console.log(flatten1([1, [2, [3], 4], 5])); // [ 1, 2, [ 3 ], 4, 5 ]

// 数组扁平化，使用 concat
function flatten2(arr) {
  let res = [];
  arr.forEach((item) => {
    res = res.concat(item);
  });
  return res;
}
console.log(flatten2([1, [2, [3], 4], 5])); // [ 1, 2, [ 3 ], 4, 5 ]

// 数组深度扁平化，使用 push
function flattenDeep1(arr) {
  const res = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      const flattenItem = flattenDeep1(item);
      flattenItem.forEach((n) => res.push(n));
    } else {
      res.push(item);
    }
  });
  return res;
}
console.log(flattenDeep1([1, [2, [3], 4], 5])); // [ 1, 2, 3, 4, 5 ]
// 数组深度扁平化，使用 concat
function flattenDeep2(arr) {
  let res = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      const flattenItems = flattenDeep2(item);
      res = res.concat(flattenItems);
    } else {
      res = res.concat(item);
    }
  });
  return res;
}
console.log(flattenDeep2([1, [2, [3], 4], 5])); // [ 1, 2, 3, 4, 5 ]
```

## 手写 convert 函数，将数组转为树

```js
function convert(arr) {
  const map = new Map();
  let root = null;

  // 首先将所有节点映射到一个 Map 中
  arr.forEach((item) => {
    const { id, name, parentId } = item;
    const treeNode = { id, name, children: [] };
    map.set(id, treeNode);
    if (parentId === 0) {
      root = treeNode; // 记录根节点
    }
  });

  // 然后遍历一次，将子节点添加到父节点的 children 中
  arr.forEach((item) => {
    const { id, parentId } = item;
    if (parentId !== 0) {
      const parentNode = map.get(parentId);
      const currentNode = map.get(id);
      if (parentNode) {
        parentNode.children.push(currentNode);
      }
    }
  });

  return root;
}

const arr = [
  { id: 1, name: "部门A", parentId: 0 },
  { id: 2, name: "部门B", parentId: 1 },
  { id: 3, name: "部门C", parentId: 1 },
  { id: 4, name: "部门D", parentId: 2 },
  { id: 5, name: "部门E", parentId: 2 },
  { id: 6, name: "部门F", parentId: 3 },
];

// 测试不同的数组顺序
const shuffledArr = [
  { id: 4, name: "部门D", parentId: 2 },
  { id: 1, name: "部门A", parentId: 0 },
  { id: 5, name: "部门E", parentId: 2 },
  { id: 2, name: "部门B", parentId: 1 },
  { id: 6, name: "部门F", parentId: 3 },
  { id: 3, name: "部门C", parentId: 1 },
];

const tree = convert(shuffledArr);
console.info(JSON.stringify(tree, null, 2));
```

## 请手写一个 LazyMan(实现 sleep 机制)

```js
class LazyMan {
  name;
  tasks = [];
  constructor(name) {
    this.name = name;

    // 等任务都加入队列后再执行第一个
    setTimeout(() => {
      this.next();
    });
  }
  next() {
    // 取出当前 tasks 的第一个任务
    const task = this.tasks.shift();
    if (task) task();
  }
  eat(food) {
    const task = () => {
      console.log(`${this.name} eat ${food}`);
      this.next(); // 立即执行下一个任务
    };
    this.tasks.push(task);
    return this; // 链式调用
  }
  sleep(seconds) {
    const task = () => {
      console.log(`${this.name} 开始睡觉`);
      setTimeout(() => {
        console.log(`${this.name} 已经睡完了 ${seconds}，开始执行下一个任务`);
        this.next(); // seconds 秒后执行下一个任务
      }, seconds * 1000);
    };
    this.tasks.push(task);
    return this; // 链式调用
  }
}

const me = new LazyMan("lisi");
me.eat("苹果")
  .eat("香蕉")
  .sleep(2)
  .eat("葡萄")
  .eat("西瓜")
  .sleep(2)
  .eat("橘子");

```

## 手写 sleep函数

promise写法
```js
function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

sleep(2).then(() => console.log("2秒钟过去了"));
```

不用 promise

```js
function sleep(seconds) {
  const start = Date.now();
  while (Date.now() - start < seconds * 1000) {
    // 空循环，直到时间到
  }
}

console.log("开始");
sleep(2); // 阻塞两秒
console.log("2s过去了");
```

## 请手写一个 EventBus(自定义事件)

数据结构，通过isOnce同时存储on和once的事件处理函数

```js
class EventBus {
  /**
   * {
   *    'key1': [
   *        { fn: fn1, isOnce: false },
   *        { fn: fn2, isOnce: false },
   *        { fn: fn3, isOnce: true },
   *    ]
   *    'key2': [] // 有序
   *    'key3': []
   * }
   */
  constructor() {
    this.events = {};
  }
  on(type, fn, isOnce = false) {
    const events = this.events;
    if (events[type] == null) {
      events[type] = [];
    }
    events[type].push({ fn, isOnce });
  }
  once(type, fn) {
    this.on(type, fn, true);
  }
  off(type, fn) {
    if (!fn) {
      // 解绑所有 type 的函数
      this.events[type] = [];
    } else {
      // 解绑单个 fn
      const fnList = this.events[type];
      if (fnList) {
        this.events[type] = fnList.filter((item) => item.fn !== fn);
      }
    }
  }
  emit(type, ...args) {
    const fnList = this.events[type];
    if (fnList == null) return;
    this.events[type] = fnList.filter((item) => {
      const { fn, isOnce } = item;
      fn(...args);
      // once 执行一次就要被过滤掉
      if (!isOnce) return true;
      return false;
    });
  }
}

const e = new EventBus();

function fn1(a, b) {
  console.log("fn1", a, b);
}
function fn2(a, b) {
  console.log("fn2", a, b);
}
function fn3(a, b) {
  console.log("fn3", a, b);
}

e.on("key1", fn1);
e.on("key1", fn2);
e.once("key1", fn3);
e.on("xxxxxx", fn3);

e.emit("key1", 10, 20); // 触发 fn1 fn2 fn3

e.off("key1", fn1);

e.emit("key1", 100, 200); // 触发 fn2
```

## 如何用 JS 实现继承

- class 继承（推荐）
- prototype 继承

## 实现 instanceOf

```js
function myInstanceOf(left, right) {
  if (left == null) return false; // null undefined
  const type = typeof left;
  if (type !== "object" && type !== "function") {
    return false; // 值类型
  }
  let proto = Object.getPrototypeOf(left);
  let prototype = right.prototype;
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

console.log(myInstanceOf(function fn1() {}, Object)); // true
console.log(myInstanceOf(function fn1() {}, Array)); // false
console.log(myInstanceOf("abc", String)); // false

```

## 防抖 debounce

```js
function debounce(fn, delay) {
  let timer = null
  // 利用闭包
  return function () {
    if (timer) {
      clearTimeout(timer) // 如果timer有值，则取消上次函数，用最后的
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

function fn1(a, b) {
  console.log(a + b);
}
const debounceFn = debounce(fn1, 2000);

debounceFn(1, 2);
debounceFn(2, 2);
// 4
```

## 节流 throttle

```js
function throttle(fn, delay = 100) {
  let timer = null
  return function () {
    if (timer) {fun
      return // 如果timer有值，则等上次的执行完，中间间隔的不要
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

function fn1(a, b) {
  console.log(a + b);
}

const throttleFn = throttle(fn1, 1000);

throttleFn(1, 2);
throttleFn(1, 3);
setTimeout(() => {
  throttleFn(1, 4);
  throttleFn(1, 5);
}, 1000);
// 3 5
```

## 手写深度比较，模拟 lodash isEqual

```js
// 判断是否是对象或数组
function isObject(obj) {
    return typeof obj === 'object' && obj !== null
}
// 全相等（深度）
function isEqual(obj1, obj2) {
    if (!isObject(obj1) || !isObject(obj2)) {
        // 值类型（注意，参与 equal 的一般不会是函数）
        return obj1 === obj2
    }
    if (obj1 === obj2) {
        return true
    }
    // 两个都是对象或数组，而且不相等
    // 1. 先取出 obj1 和 obj2 的 keys ，比较个数
    const obj1Keys = Object.keys(obj1)
    const obj2Keys = Object.keys(obj2)
    if (obj1Keys.length !== obj2Keys.length) {
        return false
    }
    // 2. 以 obj1 为基准，和 obj2 一次递归比较
    for (let key in obj1) {
        // 比较当前 key 的 val —— 递归！！！
        const res = isEqual(obj1[key], obj2[key])
        if (!res) {
            return false
        }
    }
    // 3. 全相等
    return true
}

const obj1 = {
  a: 1,
  b: { c: 2 },
  d: [1, 2, 3],
};
const obj2 = {
  a: 1,
  b: { c: 2 },
  d: [1, 2, 3],
};
console.log(isEqual(obj1, obj2)); // true
console.log(isEqual(obj1, obj1)); // true
console.log(isEqual([1, 2], [1, 2, 3])); // false
```

## compose

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

## 柯里化函数

```js
// 实现柯理化函数
function curry(fn, ...args) {
  return args.length < fn.length ? (...innerArgs) => curry(fn, ...args, ...innerArgs) : fn(...args)
}

//函数的length属性代表函数形参的个数
function addFn(a,b,c,d,e) {
  return a+b+c+d+e
}
const add = curry(addFn)
console.log(add(1, 2, 3, 4, 5));//15
console.log(add(1)(2)(3)(4)(5));//15
console.log(add(1, 2)(3, 4, 5));//15
```

## 实现call、apply、bind

```js
function getContext (context) {
  context = context || window
  let type = typeof context
  if (['number', 'string', 'boolean', null].includes(type)) {
    context = new context.constructor(context)
  }
  return context
}
Function.prototype.myCall = function (context, ...args) {
  context = getContext(context)
  context._fn = this
  let result = context._fn(...args)
  delete context._fn
  return result
}
Function.prototype.myApply = function(context, args) {
  context = getContext(context)
  context._fn = this
  let result = context._fn(...args)
  delete context._fn
  return result
}
Function.prototype.myBind = function (context, ...bindArgs) {
  return (...args) => this.call(context, ...bindArgs, ...args)
}
```

## 深拷贝

```js
const obj1 = {
  age: 20,
  name: 'xxx',
  address: {
      city: 'beijing'
  },
  arr: ['a', 'b',  {d:1}]
}

function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  let result = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}

console.log(deepClone(obj1));
```

## 深拷贝，考虑 Map，Set，循环引用

使用 JSON.stringify 和 parse

- 无法转换函数
- 无法转换 Map Set
- 无法转换循环引用

```js
// 拷贝函数
const obj = {fn: () => {}, x: 100}
JSON.stringify(obj) // '{"x":100}' 函数丢失了

// 循环引用
obj.self = obj
{x: 100, self: {…}, fn: ƒ}
JSON.stringify(obj) // 报错
```

自己实现

```js
function cloneDeep(obj, map = new WeakMap()) {
  if (typeof obj !== "object" || obj === null) return obj;

  // 避免循环引用
  const objFromMap = map.get(obj);
  if (objFromMap) return objFromMap;

  let target;

  if (obj instanceof Date) {
    target = new Date(obj);
    map.set(obj, target);
    return target;
  }

  if (obj instanceof RegExp) {
    target = new RegExp(obj);
    map.set(obj, target);
    return target;
  }

  // Map
  if (obj instanceof Map) {
    target = new Map();
    map.set(obj, target);
    obj.forEach((v, k) => {
      const v1 = cloneDeep(v, map);
      const k1 = cloneDeep(k, map);
      target.set(k1, v1);
    });
    return target;
  }

  // Set
  if (obj instanceof Set) {
    target = new Set();
    map.set(obj, target);
    obj.forEach((v) => {
      const v1 = cloneDeep(v, map);
      target.add(v1);
    });
    return target;
  }

  // Array
  if (Array.isArray(obj)) {
    target = [];
    map.set(obj, target);
    obj.forEach((item, index) => {
      target[index] = cloneDeep(item, map);
    });
    return target;
  }

  // Object
  target = {};
  map.set(obj, target);
  Object.keys(obj).forEach((key) => {
    target[key] = cloneDeep(obj[key], map);
  });

  return target;
}

// Example usage
const a = {
  set: new Set([10, 20, 30]),
  map: new Map([
    ["x", 10],
    ["y", 20],
  ]),
  info: {
    city: "北京",
  },
  fn: () => {
    console.info(100);
  },
};
a.self = a;
console.log(cloneDeep(a));

const m = new Map();
m.set("x", m);

const m1 = cloneDeep(m);
console.log("m1", m1.get("x"));
```



## 手写 trim 函数，保证浏览器兼容性

```js
String.prototype.trim = function () {
  // 知识点：原型，this，正则
  return this.replace(/^\s+/, "").replace(/\s+$/, "");
}

let str = " sdfsf ";
console.log("1" + str.myTrim() + "2"); // 1sdfsf2
```

## 实现一个retry函数，实现一个重试功能，当异步任务失败时，等待N秒后会自动重试直到成功或达到最大重试次数。

```js
// 实现一个函数 实现一个重试功能，当异步任务失败时，等待N秒后会自动重试直到成功或达到最大重试次数。
let count = 0;
function httpReq() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 第三次成功
      if (count < 2) {
        count++;
        reject({ msg: "请求错误" });
      } else {
        resolve({ data: "xxx" });
      }
    }, 1000);
  });
}
/**
 *
 * @param task  返回一个promise的异步任务
 * @param maxCount 需要重试的次数
 * @param time  每次重试间隔多久
 * @returns 返回一个新promise
 */
const retry = (task, maxCount = 2, time = 3 * 1000) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    const run = () => {
      console.log("请求");
      task()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          count++;
          if (count > maxCount) {
            reject(err);
          } else {
            setTimeout(run, time);
          }
        });
    };
    run();
  });
};

retry(httpReq)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("超过重连次数", err);
  });

```

## 手写 Promise

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



 const p1 = new MyPromise((resolve, reject) => {
            // resolve(100)
            // reject('错误信息...')
            setTimeout(() => {
                resolve(100)
            }, 1000)
        })

        // const p11 = p1.then(data1 => {
        //     console.log('data1', data1)
        //     return data1 + 1
        // })
        // const p12 = p11.then(data2 => {
        //     console.log('data2', data2)
        //     return data2 + 2
        // })
        // const p13 = p12.catch(err => console.error(err))

        const p2 = MyPromise.resolve(200)
        const p3 = MyPromise.resolve(300)
        const p4 = MyPromise.reject('错误信息...')
        const p5 = MyPromise.all([p1, p2, p3]) // 传入 promise 数组，等待所有的都 fulfilled 之后，返回新 promise ，包含前面所有的结果
        p5.then(result => console.log('all result', result)).catch(err => console.log(err))
        const p6 = MyPromise.race([p1, p2, p3]) // 传入 promise 数组，只要有一个 fulfilled 即可返回
        p6.then(result => console.log('race result', result)).catch(err => console.log(err))
        const p7 = MyPromise.allSettled([p1, p2, p3, Promise.reject('reject')]) // 传入 promise 数组，返回全部promise的数组[{status: 'fulfilled', value: ''}, {status: 'rejected', reason: ''}]
        p7.then(result => console.log('allSettled result', result)).catch(err => console.log(err))
```

## Promise.resolve

```js
Promise.myResolve = function (val) {
  return new Promise((resolve) => resolve(val));
};
```

## Promise.reject

```js
Promise.myReject = function (reason) {
  return new Promise((_, reject) => reject(reason));
};
```

## Promise.finally

```js
Promise.prototype.finally = function (callback) {
  return this.then((data) => {
    // 让函数执行 内部会调用方法，如果方法是promise，需要等待它完成
    // 如果当前promise执行时失败了，会把err传递到，err的回调函数中
    return Promise.resolve(callback()).then(() => data); // data 上一个promise的成功态
  }, err => {
    return Promise.resolve(callback()).then(() => {
      throw err; // 把之前的失败的err，抛出去
    });
  })
}

```

参考 https://juejin.cn/post/7204844328111554615#heading-6

## Promise.all

```js
// 静态方法
Promise.myAll = function (pList = []) {
  return new Promise((resolve, reject) => {
    let res = [],
      count = 0,
      len = pList.length;
    pList.forEach((p, index) => {
      p.then((value) => {
        res[index] = value;
        count++;
        if (count === len) {
          resolve(res);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  });
};
```

## Promise.race

```js
MyPromise.race = function(pList = []) {
  let resolved = false
  const p = new Promise((resolve, reject) => {
    pList.forEach(p => {
      p.then(value => {
        if (!resolved) {
          resolved = true
          resolve(value)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
  return p
}
```

## Promise.allSettled

```js
MyPromise.allSettled = function (pList = []) {
  return new Promise((resolve, reject) => {
    let ret = []
    let count = 0
    pList.forEach((p, i) => {
      p.then(val => {
        ret[i] = {status: 'fulfilled', value: val}
        count++
        if (count === pList.length) {
          resolve(ret)
        }
      }).catch(err => {
        ret[i] = {status: 'rejected', reason: err}
        count++
        if (count === pList.length) {
          resolve(ret)
        }
      })
    })
  })
}
```

## 异步任务调度器

```js
class Scheduler {
  tasks = [];
  runCount = 0;
  constructor(limit) {
    this.maxCount = limit;
  }
  add(time, data) {
    const task = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(data);
        }, time);
      });
    };
    this.tasks.push(task);
    this.next(); // 加入后尝试执行
  }
  next() {
    if (this.runCount < this.maxCount) {
      const task = this.tasks.shift();
      if (!task) return;
      this.runCount++;
      task()
        .then((v) => {
          this.runCount--;
          console.log(`执行任务成功 ${v}`);
          this.next();
        })
        .catch((err) => {
          this.runCount--;
          console.log(`执行任务失败 ${err}`);
          this.next();
        });
    }
  }
}

// 测试
const scheduler = new Scheduler(2);
const addTask = (time, data) => {
  scheduler.add(time, data);
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
// 输出结果 2 3 1 4
```

## 实现一个 LRU 缓存

什么是 LRU 缓存

- LRU - Least Recently Used 最近使用
- 如果内存优先，只缓存最近使用的，删除“沉水”数据
- 核心 API 两个： get set

分析

- 用**哈希表**存储数据，这样 ge set 才够快 O(1)
- 必须是**有序**的，常用数据放在前面，“沉水”数据放在后面
- 哈希表 + 有序，就是 Map -- 其他都不行

LRU 使用 Map 是基于两个特点

- 哈希表（get set 速度快）
- 有序
- 可结合 Object + Array

把数组改成双向链表

- 可快速增加元素
- 可快速删除元素
- 可快速移动元素位置

```js
class LRUCache {
  length;
  data = new Map();
  constructor(length) {
    if (length < 1) {
      throw new Error("invalid length");
    }
    this.length = length;
  }
  set(key, value) {
    const data = this.data;
    if (data.has(key)) {
      data.delete(key);
    }
    data.set(key, value);
    if (data.size > this.length) {
      // 超出容量时，则删除 Map 中最老的元素
      const delKey = data.keys().next().value;
      data.delete(delKey);
    }
  }
  get(key) {
    const data = this.data;
    if (!data.get(key)) return null;
    const value = data.get(key);
    data.delete(key);
    data.set(key, value);
    return value;
  }
}

const lruCache = new LRUCache(2);
lruCache.set(1, 1); // {1=1}
lruCache.set(2, 2); // {1=1, 2=2}
console.info(lruCache.get(1)); // 1 {2=2, 1=1}
lruCache.set(3, 3); // {1=1, 3=3}
console.info(lruCache.get(2)); // null
lruCache.set(4, 4); // {3=3, 4=4}
console.info(lruCache.get(1)); // null
console.info(lruCache.get(3)); // 3 {4=4, 3=3}
console.info(lruCache.get(4)); // 4 {3=3, 4=4}
```

