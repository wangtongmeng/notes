# css世界读书笔记

demo：https://demo.cssworld.cn/

## 第一章 概述

CSS（Cascading Style sheets，层叠样式表）是为**图文信息展示**服务的，通过“**层叠**”特性最终胜出。

CSS 完胜 SVG 的原因：由于早期网站主要是图文展示，CSS 更擅长，而 SVG 更擅长在矢量图形领域，对图文的支持并不好。

CSS 中的流

- 所谓“流”，就是CSS中引导元素排列和定位的一条看不见的“水流”。
- CSS 使 基石HTML 表现的符合“流”。
- 通过破坏流实现复杂布局。
- ”文档流是从左到右自上而下的“不严谨，我们可以改变流向。

流体布局

- 利用元素”流“的特性实现各类布局效果。
- ”流体布局“具有自适应性（因为”流“本身具有自适应性）。
- `<div>`是具有“流”特性的元素，“div+CSS布局“ 实际上指的就是”流体布局“。

CSS 世界

- 这里特指 CSS2.1的世界。
- CSS2.1全面支持从IE8开始。

table

- 流影响整个CSS世界，但不包括`<table>`。
- `<table>`出现时间早，有自己的规则。

CSS3

- 只是图文展示无法满足需求了。
- CSS3 的布局更丰富，视觉表现更好。

## 第二章 术语和概念

专业术语

属性、值、关键字、变量、长度单位（相对/绝对）、功能符（函数形式，例如 url()）、属性值、声明、声明块、规则或规则集、选择器（类/ID/属性/伪类/伪元素）、关系选择器（后代/相邻后代/兄弟/相邻兄弟）。

未定义行为：Web标准以外的行为，各大厂商自己实现的。

## 第三章 流、元素与基本尺寸

​	元素分为“块级元素”和“内连元素”（本书统称）。

### 3.1-3.2.1

**块级元素**

- 常见的块级元素`<div>`、`<li>`、`<table>`等

- “块级元素”和“display为block的元素”不同，display为list-item(li)、table(table)的也是块级元素

- 块级元素符合流的特性，水平流上单独显示一个元素，多个块级元素换行显示(换行特性配合clear属性清除浮动)

**两个盒子**

- 每个元素都有两个盒子，**外在盒子**和**容器盒子（内在盒子）**
- display为block元素，块级盒子（外）+块级容器盒子（内）
- display为inline-block的元素，内联盒子（外）+块级容器盒子（内）
  - 内联盒子（外）支持图文一样显示，块级容器盒子（内)支持设置width/height
- display为inline的元素，内联盒子（外）+内联盒子（内）

**width/height**

**width/height作用在容器盒子(内在盒子)上**

**width:auto** （默认值），至少包含以下4种宽度表现

- 充分利用可用空间：`<div>`、`<p>`等宽度默认是100%于父级容器。
- 收缩与包裹：浮动、绝对定位、inline-block元素、table元素，会收缩到合适（包裹性），对应CSS3的fit-content表现。
- 收缩到最小：table-layout为auto的表格，当每列空间不够时，中文随便断，英文按单词断。
- 超出容器限制：
  - 上述3种情况尺寸不会主动超出父容器宽度。
  - 特殊情况：内容很长的连续的英文和数字或内联元素设置了 `white-space:nowrap`时。

**内外尺寸**

- 内部尺寸，有内部元素（子元素）决定

- 外部尺寸，由外部元素（父元素）决定
  - `<div>`默认宽度100%显示，是“外部尺寸”（唯一的外部尺寸，“流”的精髓所在），其余全部是“内部尺寸”。

**外部尺寸与流体特性**

- 正常流宽度
  - `<div>`尺寸会铺满父容器行，blocak容器的流特性（一种margin/padding/content内容区域自动分配水平空间的机制）
  - width设置固定值，会导致流动性丢失，开发过程中要遵循“**无宽度、无图片、无浮动**”的准则。
  - 例如设置子元素width:100%时，如果有padding和margin，父容器宽度又固定，会导致样式超出。
- 格式化宽度
  - 格式化宽度仅出现在“绝对定位模型”中，也就是position属性值为absolute或fixed的元素中。
  - 默认情况下，绝对定位元素宽度表现为“包裹性”，宽度由内部尺寸决定。
  - 有一种情况是宽度由外部尺寸决定，当left/right或top/bottom属性值同时存在时，宽度表现为“格式化宽度”，其宽度相对于最近的具有定位特性（position属性值不是static）的祖先元素计算。
  - “格式化宽度”具有完全的流体性（margin、border、padding和content内容区域自动分配水平（垂直）空间）。

**内部尺寸与流体特性**

内部尺寸：元素的尺寸由内部的元素决定，而非由外部的容器决定。

判断元素使用的是不是内部尺寸：元素没有内容是，宽度是0，则应用的内部尺寸。

内部尺寸由下面3种表现形式

- 包裹性：包裹+自适应性（元素尺寸由内部元素决定，但永远小于包含块容器的尺寸，除非容器尺寸小于元素的“首选最小宽度”）
  - 例子：button是inline-block元素，文字越多宽度越宽（内部尺寸特性），文字足够多，会在容器的宽度处自动换行（自适应性）
  - 应用场景：文字少时居中，文字超过一行居左，外层元素设置`text-align:center`，内层元素`display:inline-block;tex-align:left`
- 首选最小宽度
  - 指元素最合适的最小宽度
  - inline-block元素，宽度设为0时，其表现的宽度就是“首选最小宽度”
    - 东亚文字（如中文）最小宽度为每个汉字的宽度
    - 西方文字最小宽度由连续的英文字符单元决定。可以设置`word-break:break-all`让其和中文一样
- 最大宽度
- 指元素可以有的最大宽度（等同于“包裹性”元素设置`white-space:nowrap`后的宽度）
- 如果内部没有块级元素或块级元素没有设定宽度值，则“最大宽度”实际上是最大的连续内联盒子的宽度ßß

### 3.2.2-3.4

**width 值作用的细节**

width 是作用在“内在盒子”上的，这个“内在盒子”是由很多部分构成的，内在盒子”又被分成了 4 个盒子，分别是 content box、padding box、border box 和 margin box。

问题：width:100px 是如何作用到`<div>`元素上的?

- content box 环绕着 width 和 height 给定 的矩形
- width:100px 作用在了 content box 上，当 padding、border 和 margin 都是 0，因此，该`<div>` 宽度就是 100 px，否则不是。

**CSS 流体布局下的宽度分离原则**

所谓“宽度分离原则”，就是 CSS 中的 width 属性不与影响宽度的 padding/border(有时候包括 margin)属性共存

## 第四章

盒尺寸中的四个盒子 content box、padding box、border box 和 margin box 分别对应 content、padding、border和margin属性。

### 4.1.1 content与替换元素

**1.替换元素**

替换元素：根据是否具有替换内容，把元素分为替换元素(通过修改某个属性值呈现的内容)和非替换元素。`<img>`、`<object>`、`<video>`、`<iframe>`或表单元素`<textarea>`和`<input>`都是替换元素。

除了内容可替换这一特性，还有以下特征：

- 内容的外观不受页面上的 CSS 的影响（样式表现在 CSS 作用域之外）
- 有自己的尺寸：
  - `<video>`、`<iframe>`或者`<canvas>`等默认的尺 寸是(不包括边框)是 300 像素×150 像素，
  - 也有少 部分替换元素为 0 像素，如`<img>`图片
  - 而表单元素的替换元素的尺寸则和浏览器有关，没有明显的规律。
- 在很多 CSS 属性上有自己的一套表现规则。
  - 例如vertical-align 属性，替换元素的基线是下边缘（与非替换元素不同）。

**2.替换元素的默认 display 值**

所有的替换元素都是**内联水平元素**，也就是替换元素和替换元素、替换元素和文字都是可 以在一行显示的。但是，替换元素默认的 display 值却是不一样的，见表 4-1。

<img src="/Users/wangtongmeng/Library/Application Support/typora-user-images/image-20241105064419157.png" alt="image-20241105064419157" style="zoom:50%;" />

在Firefox下，input和button默认属性值不同，前者是inline，后者是inline-block，区别在于两种按钮默认的 white-space 值不一样，前者是 pre，后者是 normal，所表示出来的 现象差异就是:当按钮文字足够多的时候，`<input>`按钮不会自动换行，`<button>`按钮则会。

替换元素有很多表现规则和非替换元素不一样，其中之一是 **宽度和高度的尺寸计算规则**，简单描述一下就是，**替换元素的 display 是 inline、block 和 inline-block 中的任意一个，其尺寸计算规则都是一样的**。

**3.替换元素的尺寸计算规则**

替换元素的尺寸从内而外分为 3 类:**固有尺寸**、**HTML 尺寸**和 **CSS 尺寸**。

- 固有尺寸（鸡蛋蛋黄蛋白）指的是替换内容原本的尺寸。
  - 图片、视频作为文件时的宽高
  - 表单类替换元素，“固有尺寸”可以理解为“不加修饰的默认尺寸”。
  - 
- HTML尺寸（鸡蛋白色膜）
  - “HTML 尺寸”只能通过HTML 原生属性改变，这些 HTML 原生属性包括`<img>`的 width 和 height 属性、`<input>` 的 size 属性、`<textarea>`的 cols 和 rows 属性等。
- CSS尺寸（鸡蛋壳）
  - 特指可以通过 CSS 的 width 和 height 或者 max-width/min-width 和 max-height/min-height 设置的尺寸，对应盒尺寸中的 content box。

**规则**

- 如果没有 CSS 尺寸和 HTML 尺寸，则使用**固有尺寸**作为最终的宽高。如：`<img src="1.jpg">`
- 如果没有 CSS 尺寸，则使用 **HTML 尺寸**作为最终的宽高。如：`<img src="1.jpg" width="128" height="96">`
- 如果有 **CSS 尺寸**，则最终尺寸由 CSS 属性决定。`img { width: 200px; height: 150px; } <img src="1.jpg" width="128" height="96"> `
- 如果“**固有尺寸**”含有**固有的宽高比例**，同时**仅设置了**宽度或仅设置了高度，则元素依然按照固有的宽高比例显示。`img { width: 200px; } <img src="1.jpg">`
- 如果上面的条件都不符合，则最终宽度表现为 300 像素，高度为 150 像素，宽高比 2:1。`<video></video>`在所有现代浏览器下的尺寸表现都是 300 像素×150 像素。
- 内联替换元素和块级替换元素使用上面同一套尺寸计算规则。`img { display: block; }  <img src="1.jpg">`这也是为何图片以及其他表单类替换元素设置 display:block 宽度却没有 100%容器的原因。

意外`<img>`

- 如果任何尺寸都没有，则元素应该是 300 像素×150 像素，这条规则` <video>`、`<canvas>`和`<iframe>`这些元素都符合
- `<img>`不是这个尺寸，且各浏览器下的尺寸不同，需要我们设置尺寸。
- 关于表现型不同，占位图片`img { visibility: hidden; }  img[src] { visibility: visible; }`使 src 属性缺省，不会有任何请求；但在对于 **Firefox 浏览器**，src 缺省的`<img>`不是替换元素，而是 一个普通的内联元素，所以使用的就不是替换元素的尺寸规则，而是类似`<span>`的内联元素尺 寸规则，**宽高会无效**。通过` img { display: inline-block; }`解决。

我们是无法改变这个替换元素内容的固有尺寸的

**4.替换元素和非替换元素的距离有多远**

就是 src 或 content 那一点。

- 没有 src 属性的`<img>`是非替换元素
- content属性使元素表现都符合替换元素，使用 content 属性，我们还可以让普通标签元素变成替换元素。

**5.content 与替换元素关系剖析**

把 content 属性生成的对象称为“匿名替换元素”，content 属性生成的内容就是替换元素!

### 4.1.2 content 内容生成技术

在实际项目中，content 属性几乎都是用在::before/::after 这两个伪元素中， 因此，“content 内容生成技术”有时候也称为“::before/::after 伪元素技术”。

1.content 辅助元素生成

- 核心点不在于 content 生成的内容，而是伪元素本身。通常，我们会把 content 的属性值设置为空字符串`.element:before {content: '';}`利用其他 CSS 代码来生成辅助元素，或实现图形效果，或实现特定布局。
- 辅助元素在布局中的应用，最常见的应用之一就是清除浮动带来的影响

```css
.clear:after {
	content: '';
	display: table; /* 也可以是'block' */ 
  clear: both;
}
```

- 另外一个很具有代表性的应用就是辅助实现“两端对齐”以及“垂直 居中/上边缘/下边缘对齐”效果。

2.content 字符内容生成

- content 字符内容生成就是直接写入字符内容，中英文都可以，比较常见的应用就是配合 @font-face 规则实现图标字体效果。

3.content 图片生成

- 指的是直接用 url 功能符显示图片，`div:before {content: url(1.jpg);}`，不支持 CSS3 渐变背景图，**不常用**的主要原因在于图片的尺寸不好控制
- 伪元素中的图片 更多的是使用 background-image 模拟`div:before {  content: '';background: url(1.jpg);}`

4.了解 content 开启闭合符号生成（不常用，可以直接使用字符`.ask:before {content:'提问:“';}`）

5.content attr属性值内容生成(常用)

- 利用 alt 属性显示图片描述信息，`img::after {content: attr(alt);}`
- 除了原生的 HTML 属性，自定义的 HTML 属性也是可以`.icon:before {content: attr(data-title);}`

6.深入理解 content 计数器

 content 部分的重中之重，因为此功能非常强大、实用，且不具有 可替代性，甚至可以实现连 JavaScript 都不好实现的效果。

 CSS 计数器的两个属性(counter-reset 和 counter- increment)和一个方法(counter()/counters())

7.content 内容生成的混合特性

指的是各种 content 内容生成语法是可以混合在 一起使用的

### 4.2 padding

#### padding 与元素尺寸

- 块级元素

  - `box-sizing: content-box`时，使用 padding 会增加元素的尺寸。例如，`.box{width:80px;padding:20px;}`此时宽度尺寸是120px

  - 不推荐`* { box-sizing: border-box; }`，尽量采用**无宽度以及宽度分离准则**

  - `box-sizing:border-box`时，当padding足够大时也会改变元素尺寸。例如，`.box{width:80px;padding:20px 60px;box-sizing:border-box}`，此时的 width 会无效，最终宽度为 120 像素(60px×2)，而里面的内容则表现为“首选最 小宽度”。

- 内联元素(不包括图片等替换元素)

  - 内联元素 的 padding 会影响水平方向，也会影响垂直方向

  - 内联元素的 padding 在垂直方向同样会影响布局，影响视觉表现，只是因为内联元素没有可视宽度和可视高度的说法(clientHeight 和 clientWidth 永远是 0)，垂直方向的行为表现完全受 line-height 和 vertical-align 的影响，视觉上并没有改变和上一行下一行内容的间距，也就是**视觉上不影响垂直方向布**局。

  - 例如：`a{padding:50px;background-color: #cd0000;}`，尺寸虽有效，但是对上下元素的原本布局却没有任何影响，仅仅是垂直方 向发生了层叠<img src="http://cdn.wangtongmeng.com/20241119071558.png" style="width:100px;display:inline-block;" />

  - 

  - **实际上，对于非替换元素的内联元素，不仅 padding 不会加入行盒高度的计算，margin**

    **和 border 也都是如此，都是不计算高度，但实际上在内联盒周围发生了渲染**

很多其他场景或属性会出现这种不影响其他元素布局而是出现层叠效果的现象

- 纯视觉层叠，不影响外部尺寸：box-shadow 以及 outline
- 会影响外部尺寸：inline 元素的 padding
- 区分的方式：如果父容器 overflow:auto，层叠区域超出父 容器的时候，没有滚动条出现，则是纯视觉的;如果出现滚动条，则会影响尺寸、影响布局

**内联元素 padding具体使用案例**

- 实现高度可控的分隔线，<img src="http://cdn.wangtongmeng.com/20241119073004.png" style="zoom:50%;" />

```html
 a + a:before {
       content: "";
       font-size: 0;
       padding: 10px 3px 1px; // 通过pading控制高度
       margin-left: 6px;
   		 border-left: 1px solid gray;
}
<a href="">登录</a><a href="">注册</a>
```

- 锚点位置，使标题距离页面的顶部有一段距离（标题就会定位在这个固定导航的下面）

```html
<h3><span id="hash">标题</span></h3> 
h3 {
  line-height: 30px;
  font-size: 14px;
}
h3 > span {
  padding-top: 58px; // 內联元素的padding-top不会影响布局
}
```

#### padding 的百分比值

padding 属 性是不支持负值的，padding 支持百分比值，但和 height 等属性的百分比计算规则 有些差异，padding 百分比值无论是水平方向还是垂直方向均是**相对于宽度计算的**!

块级元素

- 实现自适应的等比例矩形效果
  - 正方形`div { padding: 50%; }`，宽高比为 2:1 的矩形`div { padding: 25% 50%; }`

- 实现了一个宽高比为 5:1 的比例固定的头图

  - ```css
    .box {
           padding: 10% 50%; // 宽高比
           position: relative;
    }
    .box > img {
           position: absolute;
           width: 100%; height: 100%;
           left: 0; top: 0;
    }
    ```

  - 上述方法包括 IE6 在内的浏览器都兼容

padding百分比与內联元素

- 同样相对于宽度计算

- 默认的高度和宽度细节有差异
- padding 会断行

#### 标签元素内置的 padding

- ol/ul 列表内置 padding-left，当 font-size 是 12px 至 14px 时，22px 是比较好的一个 padding- left 设定值，所有浏览器都能正常显示，且非常贴近边缘。`ol, ul {padding-left: 22px;}`，如果视觉要求比较高，使用 content 计数器模拟

- 很多表单元素都内置 padding

  - 所有浏览器`<input>/<textarea>`输入框内置 padding;
  - 所有浏览器`<button>`按钮内置 padding;
  - 部分浏览器`<select>`下拉内置 padding，如 Firefox、IE8 及以上版本浏览器可以设置 padding;

  - 所有浏览器`<radio>/<chexkbox>`单复选框无内置 padding;
  - `<button>`按钮元素的 padding 最难控制!

一个既语义良好行为保留，同时 UI 效果棒兼容效果好的实现小技巧，那就是使用`<label>`元素

```html
<button id="btn"></button> <label for="btn">按钮</label>
    button {
      position: absolute;
      clip: rect(0 0 0 0);
}
label {
      display: inline-block;
      line-height: 20px;
      padding: 10px;
}
```

`<label>`元素的 for 属性值和`<button>`元素的 id 值对应即可。此时，所有浏览器下的按钮高度都是 40 像素，而且`<button>`元素的行为也都保留了，是非常不错的实践技巧。

#### padding 与图形绘制

padding 属性和 background-clip 属性配合，可以在有限的标签下实现一些 CSS 图形 绘制效果

不使用伪元素，仅一层标签实现大队长的“三道杠”分类图标效

- ```css
  .icon-menu {
         display: inline-block;
         width: 140px; height: 10px;
         padding: 35px 0;
         border-top: 10px solid;
         border-bottom: 10px solid;
         background-color: currentColor;
         background-clip: content-box; // 这样背景色之应用在content-box上
  }
  ```

- <img src="http://cdn.wangtongmeng.com/20241119075412.png" style="zoom:70%;display:inline-block" />

不使用伪元素，仅一层标签实现双层圆点效果

- ```css
   .icon-dot {
         display: inline-block;
         width: 100px; height: 100px;
         padding: 10px;
         border: 10px solid;
         border-radius: 50%;
         background-color: currentColor;
         background-clip: content-box;
  }
  ```

- <img src="http://cdn.wangtongmeng.com/20241119075631.png" style="zoom:25%;display:inline-block" />

### 4.3.1 margin 与元素尺寸以及相关布局

**元素尺寸的相关概念**

- **元素尺寸**，包括 padding 和 border，也就是元素的 border box 的尺寸，offsetWidth 和 offsetHeight
- **元素内部尺寸**，表示元素的内部区域尺寸，包括 padding 但不包括 border，也就是元素的 padding box 的尺寸。clientWidth 和 clientHeight
- **元素外部尺寸**，表示元素的外部尺寸，不仅包括 padding 和 border，还包括 margin，也就是元素的 margin box 的尺寸，没有相对应的原生的 DOM API。

外部尺寸（**元素占据的空间尺寸**）”有个很不一样的特性，就是尺寸的大小有可能是负数。

**margin 与元素的内部尺寸**

只要宽度设定，margin 就无法改变元素尺寸，`.father {width: 300px;margin: 0 -20px;}`

只要元素的尺寸表现符合“充分利用可用空间”，无论是垂直方向还是水 平方向，都可以通过 margin 改变尺寸。

对于普通流体元素，margin 只能改变元素水平方向尺寸;但是，对于具有拉伸特性的绝对定位元素，则水平或垂直方向都可以，因为此时 的尺寸表现符合“充分利用可用空间”。

```html
<div class="father">
       <div class="son"></div>
</div>
.father { width: 300px; } .son { margin: 0 -20px; }
```

实现流体布局，一侧定宽的两栏自适应布局效果

- 图片在左侧

  - ```html
    .box { overflow: hidden; }
    .box > img { float: left; }
    .box > p { margin-left: 140px; }
    <div class="box">
      <img src="1.jpg">
    	<p>文字内容...</p> 
    </div>
    ```

- 图片右侧定位

  - ```html
    .box { overflow: hidden; }
    .box > img { float: right; }
    .box > p { margin-right: 140px; }
    ```

- 图片右侧定位，同时顺序一致

  - ```html
    .box { overflow: hidden; }
    .full { width: 100%; float: left; }
    .box > img { float: left; margin-left: -128px; }
    .full > p { margin-right: 140px; }
    <div class="box">
    	<div class="full"> <p>文字内容...</p>
    	</div>
      <img src="1.jpg">
    </div>
    ```

    

**margin 与元素的外部尺寸**









