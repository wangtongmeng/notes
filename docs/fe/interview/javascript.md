# javascript面试题

## 作用域与作用域链

### 闭包

#### 1.什么是闭包？

### this

#### 1.对this对象的理解

什么时候产生的，指向谁

#### 2.call、apply、bind的区别

## 原型与原型链

## 异步

### Promise

### async await

## es6+

### 模块化

## DOM与BOM

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

