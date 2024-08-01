# js-场景题

### 关于作用域与自由变量场景题-1

```js
let i
for (i = 1; i <=3; i++) {
  setTimeout(function(){
    console.log(i)
  },0)
}
// 4 4 4
```



### 关于作用域与自由变量场景题-2

