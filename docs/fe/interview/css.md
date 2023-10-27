## FLEX的基础知识，flex-shrink，flex-grow，flex-basis

flex-shrink：当空间不足以展示的时候，是否被压缩
flex-grow：当内容超过既定的空间，是否放大
flex-basis：压缩和方法的基准，没设置的时候为width的值

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

- BFC块级格式化上下文，他是页面中的一块渲染区域，且有一套术语自己的渲染规则，他决定了如何对其内容进行布局，以及与其他元素的关系和相互作用。当涉及到可视化布局时，BFC提供了一个环境，HTML元素在这个环境中按照一定规则进行布局；
- BFC是一个独立的布局环境，具有BFC特性的元素可以看作是隔离的独立容器，容器里面的元素不会在布局上影响到外面的元素。

> BFC是Web页面中的一个独立渲染区域，具有自己的渲染规则，会影响元素的布局方式并隔离元素。主要的作用就是解决布局问题。

2.BFC的布局规则

- 内部的盒子会在垂直方向，一个个放置，每个块元素独占一行。
- 盒子垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的上下margin会发生重叠。
- 每个元素的左边，与包含的盒子的左边相接触，即使存在浮动也是如此。
- BFC的区域不会与 `float box` 重叠。
- BFC就是页面上的一个隔离的独立容器，容器里的元素不会影响到外面的元素，反之亦然。
- 计算BFC的高度时，浮动元素也参与计算。

3.形成 BFC 的条件

- `float`属性不为none
- `overflow` 为 auto、scroll、hidden
- `display` 为inline-block、table-cell、table-caption、flex、inline-flex中的任何一个
- `position` 为 absolute 或 fixed

4.应用场景

## 清浮动

## 布局

### 两列布局

### 三列布局

### 九宫格布局

