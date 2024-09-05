## HTML

### HTMLCollection 和 NodeList 区别

Node 和 Element

- DOM 是一颗树，所有的节点都是 Node
- Node 是 Element 的基类
- Element 是其他 HTML 元素的基类，如 HTMLDivElement

<img src="http://cdn.wangtongmeng.com/20240629164342.png" style="zoom:33%;" />

HTMLCollection 和 NodeList

- HTMLCollection 是 Element 的集合
- NodeList 是 Node 集合

重点

- 获取 Node 和 Element 的返回结果可能不一样
- 如 elem.childNodes 和 elem.children 不一样
- 前者包含 Text 和 Comment 节点，后者不会

### offsetHeight scrollHeight clientHeight的区别

计算规则

- offsetHeight offsetWidth: border + padding + height
- clientHeight clientWidth: padding + content
- scrollHeight scrollWidth: padding + 实际内容尺寸

### 如何理解 HTML 语义化？

- 让人更易读懂（增加代码可读性）
- 让搜索引擎更易读懂（SEO）

<img src="http://cdn.wangtongmeng.com/20240726210846.png" style="zoom:33%;" />



 ### 默认情况下，哪些 HTML 标签是块级元素、哪些是内联元素？

- display: block/table 的元素， 有 div h1 h2 table ul ol p 等
- display: inline/inline-block 的元素，有 span img input button 等

### src 和 href 的区别

在前端开发中，`src` 和 `href` 是两个常用的属性，用于指定外部资源的引用，它们在使用方式和作用上有所不同：

**src属性**

1. **用途：** `src` 是 **source** 的缩写，主要用于指定要嵌入的外部资源，通常是脚本、图片、音视频等。
2. **适用元素：** 主要用于 `<script>`、`<img>`、`<audio>`、`<video>` 和 `<iframe>` 等元素，用来引入外部的 JavaScript 文件、图像、音视频文件或者其他页面。
3. **加载方式：** `src` 属性指向的资源会被浏览器下载并执行（如果是脚本）、显示（如果是图像、音视频等），它是一个重要的外部资源引入方式。
4. **JavaScript 中的应用：** 在 JavaScript 中，`src` 属性通常用于设置或获取引入的 JavaScript 文件路径，例如动态创建 `<script>` 元素时设置其 `src` 属性来加载脚本。

**href属性**

1. **用途：** `href` 是 **hypertext reference** 的缩写，主要用于指定超链接的目标资源的位置。
2. **适用元素：** 主要用于 `<a>`（超链接）、`<link>`（样式表链接）和 `<base>`（基础链接）等元素，用来定义超链接的目标资源的位置。
3. **加载方式：** `href` 属性指定的资源通常用于定义当前元素指向的链接地址，例如 `<a>` 元素的跳转链接、`<link>` 元素的样式表引入以及 `<base>` 元素的基础链接。
4. **CSS 中的应用：** 在 CSS 中，`href` 属性通常用于指定外部样式表文件的路径，例如 `<link rel="stylesheet" href="styles.css">` 中的 `href` 属性用于指定 `styles.css` 文件的位置。

**总结**

- **用途不同：** `src` 用于指定要嵌入的外部资源，而 `href` 用于指定超链接的目标资源的位置。
- **适用元素不同：** `src` 适用于需要引入外部资源的元素，如脚本、图像、音视频等；`href` 适用于需要定义超链接或者引入外部样式表的元素。
- **加载方式不同：** `src` 属性会导致浏览器下载并执行相关资源，而 `href` 属性用于指定元素的目标资源的位置。

在实际开发中，理解并正确使用 `src` 和 `href` 属性可以帮助我们有效地管理和引入外部资源和超链接。

## px % em rem vw/vh 有什么区别

- px: 基本单位，绝对单位（其他的都是相对单位）

- %：相对于父元素的宽度比例

- em：相对于当前元素的 font-size

- rem: 相对于根元素的 font-size

- vw: 屏幕宽度的 !%

- vh: 屏幕高度的 1%
- vmin 两者的最小值，vmax 两者的最大值

## 清除浮动

```css
.clear::after {
    content: ' ';
    display: block;
    clear: both;
}
```

## 单行、多行文本溢出隐藏

单号文本溢出

```css
overflow: hidden; // 溢出隐藏
text-overflow: ellipsis; // 溢出用省略号显示
white-space: nowrap; // 规定段落中的文本不进行换行
```

多行文本溢出

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box; // 作为弹性伸缩盒子模型显示
-webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
-webkit-line-clamp: 3; // 显示的行数
```

## 如何判断元素是否到达可视区域

以图片显示为例：

- `window.innerHeight`是浏览器可视区的高度
- `document.body.scrollTop || document.documentElement.scrollTop`是浏览器滚动过的距离；
- 内容到达显示区域：img.offsetTop < window.innerHeight + document.body.scrollTop

<img src="http://cdn.wangtongmeng.com/20231029184517-946265.png" style="zoom: 33%;" />

## flex的基础知识，flex-shrink，flex-grow，flex-basis

flex-shrink：当空间不足以展示的时候，是否被压缩
flex-grow：当内容超过既定的空间，是否放大
flex-basis：压缩和方法的基准，没设置的时候为width的值

## flex: 1表示什么

flex属性是flex-grow，flex-shrink和flex-basis的简称，默认值是0 1 auto。**flex:1 表示 flex: 1 1 0%**;

- flex-grow: 定义项目的放大比例，默认是0，即如果存在剩余空间，也不放大；
- flex-shrink：定义项目的缩小比例，默认为1，即如果空间不足，该项目将缩小；
- flex-basis：给上面两个属性分配多余空间之前，计算项目是否有多余空间，默认值为auto，即项目本身的大小。

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

## 布局

### 盒子模型的宽度如何计算？

- offsetWidth = 内容宽度+内边距+边框，无外边距
- 答案是 122px
- 补充，如果让 offsetWidth 等于 100px，该如何做？答：增加 box-sizing: boder-box;

```html
<!DOCTYPE html>
<html>
<head>
    <!-- 如下代码，请问 div1 的 offsetWidth 是多大？ -->
    <style type="text/css">
        #div1 {
            width: 100px;
            padding: 10px;
            border: 1px solid #ccc;
            margin: 10px;
            /* 加上 box-sizing: border-box 后，offsetWidth 则是 100px */
            /* box-sizing: border-box; */
        }
    </style>
</head>
<body>
    <div id="div1">
        this is div1
    </div>

    <script>
        console.log(document.getElementById('div1').offsetWidth); // 122
    </script>
</body>
</html>
```

### margin 纵向重叠的问题

- 相邻元素的 margin-top 和 margin-bottom 会发生重叠
- 空白内容 的 `<P></p>` 也会重叠

```html
<!DOCTYPE html>
<html>
<head>
    <!-- 如下代码，AAA 和 BBB 之间的距离是多少？15px -->
    <style type="text/css">
        p {
            font-size: 16px;
            line-height: 1;
            margin-top: 10px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    
    <p>AAA</p>
    <p></p>
    <p></p>
    <p></p>
    <p>BBB</p>

</body>
</html>
```



### margin 负值的问题

- 对 margin 的 top left right bottom 设置负值，有何效果？
  - margin-top 和 margin-left 负值，元素向上、想左移动
  - margin-right 负值，右侧元素左移，自身不受影响
  - margin-bottom 负值，下方元素上移，自身不受影响

### BFC 理解和应用

#### 什么是 BFC ？如何应用？

- Block format context，块级格式化上下文
- 一块独立渲染区域，内部元素的渲染不会影响边界以外的元素

BFC的布局规则

- 内部的盒子会在垂直方向，一个个放置，每个块元素独占一行。
- 盒子垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的上下margin会发生重叠。
- 每个元素的左边，与包含的盒子的左边相接触，即使存在浮动也是如此。
- BFC的区域不会与 `float box` 重叠。
- BFC就是页面上的一个隔离的独立容器，容器里的元素不会影响到外面的元素，反之亦然。
- 计算BFC的高度时，浮动元素也参与计算。

形成 BFC 的常见条件

- float 不是 none
- position 是 absolute 或 fixed
- overflow 不是 visible
- display 是 flex inline-block 等

BFC 的应用

- 清除浮动 

```html
<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
      .container {
        background-color: #f1f1f1;
      }
      .left {
        float: left;
      }
      .bfc {
        overflow: hidden; /* 触发元素 BFC */
      }
    </style>
  </head>
  <body>
    <!-- container 添加 bfc 让内部元素不能跑出去，也就是计算高度 -->
    <div class="container bfc">
      <img
        src="https://www.imooc.com/static/img/index/logo.png"
        class="left"
        style="margin-right: 10px"
      />
      <p class="bfc">某一段文字……</p>
    </div>
  </body>
</html>

```

### float 布局

#### 如何实现圣杯布局和双飞翼布局？

圣杯布局和双飞翼布局的目的

- 三栏布局，中间一栏最先加载和渲染（内容最重要）
- 两侧内容固定，中间内容随着宽度自适应
- 一般用于 PC 网页

圣杯布局和双飞翼布局的技术总结

- 使用 float 布局
- 两侧使用 margin 负值，以便和中间内容横向重叠
- 防止中间内容被两侧覆盖，一个用 padding 一个用 margin

圣杯布局

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>圣杯布局</title>
    <style type="text/css">
        body {
            min-width: 550px;
        }
        #header {
            text-align: center;
            background-color: #f1f1f1;
        }

        #container {
            /* 5. 设置 container padding，为两侧元素预留位置 */
            padding-left: 200px;
            padding-right: 150px;
        }
        #container .column {
            /* 3. 子元素浮动 */
            float: left;
        }

        #center {
            background-color: #ccc;
            /* 2. 设置 center宽度为100%，两侧元素宽度固定 */
            width: 100%;
        }
        #left {
            position: relative;
            background-color: yellow;
            width: 200px;
            /* 6. 设置 margin-left: -100%，让元素上移一行到同样为止 */
            margin-left: -100%;
            /* 7. 设置 position:relative；right: 200px，让元素相对于自身向左移动200px */
            right: 200px;
        }
        #right {
            background-color: red;
            width: 150px;
            /* 8. margin-right等于自身宽度，相当于自身没有宽度了，也就不用float到下一行了，正好占据右边栏了 */
            margin-right: -150px;
        }

        #footer {
            text-align: center;
            background-color: #f1f1f1;
        }
        /* 4.清除container浮动，使footer不会上移 */
        /* 手写 clearfix */
        .clearfix:after {
            content: '';
            display: table;
            clear: both;
        }
    </style>
</head>
<body>
    <div id="header">this is header</div>
    <div id="container" class="clearfix">
        <!-- 1. center元素排前面，保证优先渲染 -->
        <div id="center" class="column">this is center</div>
        <div id="left" class="column">this is left</div>
        <div id="right" class="column">this is right</div>
    </div>
    <div id="footer">this is footer</div>
</body>
</html>
```

双飞翼布局

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>双飞翼布局</title>
    <style type="text/css">
        body {
            min-width: 550px;
        }
        .col {
            /* 4. 设置子元素浮动 */
            float: left;
        }

        #main {
            /* 2.设置 main元素的宽度是100%，左右元素宽度固定 */
            width: 100%;
            height: 200px;
            background-color: #ccc;
        }
        #main-wrap {
            /* 3. 设置 main-wrap 的左右 margin，给左右栏内容留白（双飞翼是 margin 留白，圣杯布局是 padding 留白） */
            margin: 0 190px 0 190px;
        }

        #left {
            width: 190px;
            height: 200px;
            background-color: #0000FF;
            /* 5. 使left元素向上移动到相同位置，即左栏位置 */
            margin-left: -100%;
        }
        #right {
            width: 190px;
            height: 200px;
            background-color: #FF0000;
            /* 6. 使right元素左移至右栏位置 */
            margin-left: -190px;
        }
    </style>
</head>
<body>
    <!-- 1.main在前面保证优先渲染，注意内部多一个 main-wrap 元素，负责 margin 留白 -->
    <div id="main" class="col">
        <div id="main-wrap">
            this is main
        </div>
    </div>
    <div id="left" class="col">
        this is left
    </div>
    <div id="right" class="col">
        this is right
    </div>
</body>
</html>
```



#### 手写 clearfix

```css
.clearfix:after {
  content: '';
  display: table;
  clear: both;
}
.clearfix {
  *zoom: 1; /* 兼容 IE 低版本 */
}
```

### flex 布局

常用语法回顾

- flex-direction
- justify-content 主轴
- align-items 交叉轴
- flex-wrap 是否换行
- align-self 

#### flex 实现一个三点的色子

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>flex 画骰子</title>
    <style type="text/css">
        .box {
            width: 200px;
            height: 200px;
            border: 2px solid #ccc;
            border-radius: 10px;
            padding: 20px;
            /* 2.设置box元素flex，并两端对齐 */
            display: flex;
            justify-content: space-between;
        }
        .item {
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #666;
        }
        .item:nth-child(2) {
            /* 3. 设置第二个子元素，交叉轴居中 */
            align-self: center;
        }
        .item:nth-child(3) {
            /* 4. 设置第三个子元素，交叉轴距底部 */
            align-self: flex-end;
        }

    </style>
</head>
<body>
    <!-- 1. box元素内三个子元素 -->
    <div class="box">
        <span class="item"></span>
        <span class="item"></span>
        <span class="item"></span>
    </div>
</body>
</html>
```

### 两列布局

### 三列布局

### 九宫格布局

#### 



## 定位

### absolute 和 relative 分别依据什么定位？

- relative 依据自身定位
- absolute 依据最近一层的定位元素定位
  - 定位元素（具有 absolute relavtive fixed的元素，或者是 body）

### 居中对齐有哪些实现方式？

- 水平居中
  - inline 元素：text-align: center
  - block 元素：margin: auto
  - absolute 元素： left: 10% + margin-left 负值
- 垂直居中 
  - inline 元素： line-height 的值等于 height 值
  - absolute 元素： top: 50% + margin-top 负值 （知道子元素的尺寸）
  - absolute 元素： transform(-50%, -50%) （不需要子元素的尺寸）
  - absolute 元素：top,left,bottom,right = 0 + margin: auto （不需要子元素的尺寸）

水平居中

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>水平对齐</title>
    <style type="text/css">
        .container {
            border: 1px solid #ccc;
            margin: 10px;
            padding: 10px;
        }
        .item {
            background-color: #ccc;
        }

        .container-1 {
            /* 子元素是行内元素时，水平居中 */
            text-align: center;
        }

        .container-2 .item {
            width: 500px;
            /* 子元素是有宽度的 block 元素时，水平居中 */
            margin: auto;
        }

        .container-3 {
            position: relative;
            height: 100px;
        }
        .container-3 .item {
            /* 子元素尺寸已知时，水平居中 */
            width: 300px;
            height: 100px;
            position: absolute;
            left: 50%;
            margin-left: -150px;
        }
    </style>
</head>
<body>
    <div class="container container-1">
        <span>一段文字</span>
    </div>

    <div class="container container-2">
        <div class="item">
            this is block item
        </div>
    </div>

    <div class="container container-3">
        <div class="item">
            this is absolute item
        </div>
    </div>
</body>
</html>
```

垂直居中，包含了水平居中（水平垂直居中了）

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>垂直对齐</title>
    <style type="text/css">
        .container {
            border: 1px solid #ccc;
            margin: 10px;
            padding: 10px;
            height: 200px;
        }
        .item {
            background-color: #ccc;
        }

        .container-1{
            text-align: center;
            /* 子元素是行内元素时，垂直居中 */
            line-height: 200px;
            height: 200px;
        }

        .container-2 {
            position: relative;
        }
        .container-2 .item {
            width: 300px;
            height: 100px;
            position: absolute;
            left: 50%;
            margin-left: -150px;
            /* 子元素已知尺寸时，通过 absolute 和 margin-top: -自身高度，垂直居中 */
            top: 50%;
            margin-top: -50px;
        }

        .container-3 {
            position: relative;
        }
        .container-3 .item {
            width: 200px;
            height: 80px;
            position: absolute;
            left: 50%;
            /* 子元素尺寸不确定时，，通过 absolute 和 transform: translate，垂直居中 */
            /* 兼容性没有下面的好 */
            top: 50%;
            transform: translate(-50%, -50%)
        }

        .container-4 {
            position: relative;
        }
        .container-4 .item {
            width: 100px;
            height: 50px;
            /* 通过 absolute 四个方向设置成0 + margin: auto 实现水平垂直居中 */
            /* 没有兼容性问题 */
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
        }
    </style>
</head>
<body>
    <div class="container container-1">
        <span>一段文字</span>
    </div>

    <div class="container container-2">
        <div class="item">
            this is item
        </div>
    </div>

    <div class="container container-3">
        <div class="item">
            this is item
        </div>
    </div>

    <div class="container container-4">
        <div class="item">
            this is item
        </div>
    </div>
</body>
</html>
```

## 图文样式

### line-height 继承问题

- 写具体数值，如 30px，则继承该值（比较好理解）
- 写比例，如 2 或 1.5，则继承该比例（比较好理解）
- 写百分比，如 200%，则继承计算出来的值（考点）

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>line-height 继承问题</title>
    <!-- 如下代码， p 标签的行高将会是多少？ 答案：20 * 2 = 40px -->
    <style type="text/css">
        body {
            font-size: 20px;
            /* 如果是百分比，子元素并不会直接继承，而是算完数值 20 * 2 = 40px，再继承  */
            line-height: 200%;

            /* 数值，则子元素直接继承 line-height: 数值 */
            /* line-height: 50px; */

            /* 小数，则子元素直接继承，等于子元素的font-size * 小数背书 = 16 * 1.5 = 24px */
            /* line-height: 1.5; */
        }
        p {
            background-color: #ccc;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <p>这是一行文字</p>
</body>
</html>
```

## 响应式

### rem 是什么？

rem 是一个长度单位

- px，绝对长度单位，最常用
- em，相对长度单位，相对于父元素，不常用
- rem，相对长度单位，相对于根元素，常用语响应式布局

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>rem 演示</title>
    <style type="text/css">
        html {
            font-size: 100px;
        }
        div {
            background-color: #ccc;
            margin-top: 10px;
            font-size: 0.16rem;
        }
    </style>
</head>
<body>

    <p style="font-size: 0.1rem">rem 1</p>
    <p style="font-size: 0.2rem">rem 1</p>
    <p style="font-size: 0.3rem">rem 1</p>

    <div style="width: 1rem;">
        this is div1
    </div>
    <div style="width: 2rem;">
        this is div2
    </div>
    <div style="width: 3rem;">
        this is div3
    </div>

</body>
</html>
```

### 如何实现响应式(常见方案)？

- media-query，根据不同的屏幕宽度设置根元素 font-size
- rem，基于根元素的相对单位

- rem 的弊端
- 网页视口尺寸
  - window.screnn.height  屏幕高度
  - window.innerHeight 网页视口高度
  - document.body.clientHeight body 高度
- vw/vh
  - vh 网页视口高度的 /100
  - vw 网页视口宽度的 1/100
  - vmax 去两者最大值；vmin 取两者最小值

<img src="http://cdn.wangtongmeng.com/20240727150205.png" style="zoom:25%;" />

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>响应式布局</title>
    <style type="text/css">
        @media only screen and (max-width: 374px) {
            /* iphone5 或者更小的尺寸，以 iphone5 的宽度（320px）比例设置 font-size */
            html {
                font-size: 86px;
            }
        }
        @media only screen and (min-width: 375px) and (max-width: 413px) {
            /* iphone6/7/8 和 iphone x */
            html {
                font-size: 100px;
            }
        }
        @media only screen and (min-width: 414px) {
            /* iphone6p 或者更大的尺寸，以 iphone6p 的宽度（414px）比例设置 font-size */
            html {
                font-size: 110px;
            }
        }

        body {
            font-size: 0.16rem;
        }
        #div1 {
            width: 1rem;
            background-color: #ccc;
        }

    </style>
</head>
<body>
    <div id="div1">
        this is div
    </div>
</body>
</html>
```

vw vh

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vw vh test</title>
    <style>
        body {
            margin: 0;
            padding: 0;
        }

        #container {
            background-color: red;
            width: 10vw;
            height: 10vh;
        }
    </style>
</head>
<body>
    <p>vw vh 测试</p>
    <div id="container">
    </div>

    <script>
        // window.innerHeight === 100vh
        // window.innerWidth === 100vw
    </script>
</body>
</html>
```

## CSS3

### CSS3 动画



 

