## nth-child 和 nth-of-type的区别

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    /* 先找奇数位，再找其中的div */
    /* 先找奇数位135，再找div 13 */
    div:nth-child(2n+1) {
      color: red;
    }
    /* 先过滤出div，再找奇数行的div */
    /* 找到所有div，1346，取奇数位，14 */
    /* div:nth-of-type(2n+1) {
      color: red;
    } */
  </style>
</head>
<body>
  <div>1</div>
  <span>2</span>
  <div>3</div>
  <div>4</div>
  <span>5</span>
  <div>6</div>
</body>
</html>
```

## 什么是BFC？BFC有什么作用？

1.BFC概念

> 块级格式化上下文（Block Formatting Context，BFC）是 Web 页面的可视化 css 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。（在BFC内部，块级元素的布局、浮动元素与其他元素的相互作用，会受到BFC规则的影响）

- BFC块级格式化上下文，他是页面中的一块渲染区域，且有一套术语自己的渲染规则，他决定了如何对其内容进行布局，以及与其他元素