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
  - 例如：`a{padding:50px;background-color: #cd0000;}`，尺寸虽有效，但是对上下元素的原本布局却没有任何影响，仅仅是垂直方向发生了层叠<img src="http://cdn.wangtongmeng.com/20241119071558.png" style="width:100px;display:inline-block;" />
  - 
  - **实际上，对于非替换元素的内联元素，不仅 padding 不会加入行盒高度的计算，margin和 border 也都是如此，都是不计算高度，但实际上在内联盒周围发生了渲染**

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

padding 属性是不支持负值的，padding 支持百分比值，但和 height 等属性的百分比计算规则有些差异，padding 百分比值无论是水平方向还是垂直方向均是**相对于宽度计算的**!

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
  - **`<button>`按钮元素的 padding 最难控制**!

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

实现流体布局，一侧定宽的**两栏自适应布局**效果

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

    

利用 margin 改变元素尺寸的特性来实现**两端对齐布局**效果

- 不考虑 IE8

  - ```html
     li {
      float: left;
      width: 100px;
      margin-right: 20px;
    }
    li:nth-of-type(3n) {
           margin-right: 0;
    }
    ```

- 兼容 IE8 

  - 要么专门使用 JavaScript 打个补丁，要么列表 HTML 输出的时候给符合 3n 的<li>标签加个类名`.li-third {margin-right: 0;}`

  - 通过给父容器添加 margin 属性，增加容器的可用宽度来实现

    - ```css
      ul {
             margin-right: -20px;
      }
      ul > li {
             float: left;
             width: 100px;
             margin-right: 20px;
      }
      ```

    - 时`<ul>`的宽度就相当于 100%+20px，于是，第 3n 的`<li>`标签的 margin-right: 20px 就多了 20 像素的使用空间，正好列表的右边缘就是父级`<ul>`容器 100%宽度位置

**margin 与元素的外部尺寸**

- 对于普通**块状元素**，在默认的水平流下，margin 只能改变左右方向的内部尺寸，垂直方 向则无法改变。
- 使用 writing-mode 改变流向为垂直流，但水平流又不行了

滚动容器底部留白使用 padding 是不推荐的， 有兼容性问题；**使用子元素的 margin-bottom 来实现滚动容器的底部留白**

```css
.column-box {
  overflow: hidden;
}
.column-left,
.column-right {
  margin-bottom: -9999px;
  padding-bottom: 9999px;
}
```

margin 负值实现等高布局不足之处：

- 有子元素定位到容器之 外，父级的 overflow:hidden 是一个棘手的限制
- 当触发锚点定位或者使用DOM.scrollIntoview()方法的时候，可能就会出现奇怪的定位问题

使用 border 和 table-cell 的优缺点：

- 前者优势在于兼容性好，没有锚点定 位的隐患，不足之处在于最多 3 栏，且由于 border 不支持百分比宽度，因此只能实现至少一 侧定宽的布局
- table-cell 的优点是天然等高，不足在于 IE8 及以上版本浏览器才支持，所以，**如果项目无须兼容 IE6、IE7，则推荐使用 table-cell 实现等高布局**

> 上述 margin 对尺寸的影响是针对具有块状特性的元素而言的，对于纯内联元素则不适用。
>
> 和 padding 不同，内联元素垂直方向的 margin 是没有任何影响的，既不会影响外部尺寸， 也不会影响内部尺寸。对于水平方向，由于内联元素宽度表现为“包裹 性”，也不会影响内部尺寸。

### 4.3.2 margin 的百分比值

和 padding 属性一样，margin 的百分比值无论是**水平方向还是垂直方向都是相对于宽度计算**的。

元素设置 margin 在垂直方向上无法改变元素自身的内部尺寸，往往需要父元素作为载体，此外，由于 **margin合并**的存在，垂直方向往往需要**双倍尺寸**才能和 padding 表现一致。

```html
.box { background-color: olive; overflow: hidden;}
.box > div { margin: 50%; }
<-- .box 是一个宽高比为 2:1 的橄榄绿长方形 -->
<div class="box">
  <div></div>
</div>
```

### 4.3.3 margin 合并

**什么是 margin 合并**

块级元素的上外边距(margin-top)与下外边距(margin-bottom)有时会合并为单个外边距，这样的现象称为“margin 合并”。

- **块级元素**，但不包括浮动和绝对定位元素，尽管浮动和绝对定位可以让元素块状化。
- 只发生在**垂直方向**（不考虑 writing-mode 的情况下，认文档流 是水平流，因此发生 margin 合并的就是垂直方向）

**margin 合并的 3 种场景**

- 1.相邻兄弟元素 margin 合并。

  - 例子：第一行和第二行之间的间距还是 1em

    - ```html
      p{margin: 1em 0;}
      <p>第一行</p>
      <p>第二行</p>
      ```

- 2.父级和第一个/最后一个子元素。

  - 例子，在默认状态下，下面 3 种设置是等效的

    - ```html
       <div class="father">
             <div class="son" style="margin-top:80px;"></div>
      </div>
          <div class="father" style="margin-top:80px;">
             <div class="son"></div>
      </div>
          <div class="father" style="margin-top:80px;">
             <div class="son" style="margin-top:80px;"></div>
      </div>
      ```

- 3.空块级元素的 margin 合并。

  - 例子1，.father 所在的这个父级`<div>`元素高度仅仅是 1em，因为.son 这个空`<div>`元 素的上下margin合并了。

    - ```html
      .father { overflow: hidden; }
      .son { margin: 1em 0; }
      <div class="father">
        <div class="son"></div>
      </div>
      ```

    - 例子2，空块级元素的 margin 合并特性即使自身没有设置 margin 也是会发生的。此时第一行和第二行之间的距离还是 1em。

      - ```html
        p { margin: 1em 0; }
        <p>第一行</p>
        <div></div>
        <p>第二行</p>
        ```

      - 发生了 3 次 margin 合并：`<div>`和第一行`<p>` 的 margin-bottom 合并，然后和第二行`<p>`的 margin-top 合并，这两次合并是相邻兄弟合 并。由于自身是空`<div>`，于是前两次合并的 margin-bottom 和 margin-top 再次合并， 这次合并是空块级元素合并，于是最终间距还是 1em。

**阻止父级和第一个/最后一个子元素的合并**

- 对于 margin-top 合并，可以进行如下操作(满足一个条件即可):

  - 父元素设置为**块状格式化上下文元素**;

  - 父元素设置 border-top 值;

  - 父元素设置 padding-top 值;

  - 父元素和第一个子元素之间添加内联元素进行分隔。

- 对于 margin-bottom 合并，可以进行如下操作(满足一个条件即可):

  - 父元素设置为块状格式化上下文元素;
  - 父元素设置 border-bottom 值;
  - 父元素设置 padding-bottom 值;
  - 父元素和最后一个子元素之间添加内联元素进行分隔;
  - 父元素设置 height、min-height 或 max-height。

**阻止空`<div>`元素有 margin 合并（通常不需要）**

- 设置垂直方向的 border;
- 设置垂直方向的 padding;
- 里面添加内联元素(直接 Space 键空格是没用的);
- 设置 height 或者 min-height。

**margin 合并的计算规则**

margin 合并的计算规则总结为“正正取大值”“正负值相加”“负负最负值”3 句话。

- 正正取大值

  - 例1，相邻兄弟合并，.a 和.b 两个`<div>`之间的间距是 50px

    - ```html
      .a { margin-bottom: 50px; }
      .b { margin-top: 20px; }
      <div class="a"></a>
      <div class="b"></a>
      ```

  - 例2，父子合并，.father 元素等同于设置了 margin-top:50px

    - ```html
      .father { margin-top: 20px; }
      .son { margin-top: 50px; }
      <div class="father">
        <div class="son"></div>
      </div>
      ```

  - 例3，自身合并，.a 元素的外部尺寸是 50px，取大的那个值。

    - ```html
      .a {
        margin-top: 20px;
        margin-bottom: 50px;
      }
      <div class="a"></div>
      ```

- 正负值相加

  - 例1，相邻兄弟合并，.a 和.b 两个`<div>`之间的间距是 30px，是-20px+50px 的计算值。

    - ```html
      .a { margin-bottom: 50px; }
      .b { margin-top: -20px; }
      <div class="a"></a>
      <div class="b"></a>
      ```

  - 例2，父子合并，.father 元素等同于设置了 margin-top:30px，是-20px+50px 的计算值。

    - ```html
      .father { margin-top: -20px; }
      .son { margin-top: 50px; }
      <div class="father">
        <div class="son"></div>
      </div>
      ```

  - 例3，自身合并，.a 元素的外部尺寸是 30px，是-20px+50px 的计算值。

    - ```html
      .a {
        margin-top: -20px;
        margin-bottom: 50px;
      }
      <div class="a"></div>
      ```

- 负负最负值

  - 例1，相邻兄弟合并，.a 和.b 两个`<div>`之间的间距是-50px，取绝对负值最大的值。

    - ```html
      .a { margin-bottom: -50px; }
      .b { margin-top: -20px; }
      <div class="a"></a>
      <div class="b"></a>
      ```

  - 例2，父子合并，.father 元素等同于设置了 margin-top:-50px，取绝对负值最大的值。

    - ```html
      .father { margin-top: -20px; }
      .son { margin-top: -50px; }
      <div class="father">
             <div class="son"></div>
      </div>
      ```

  - 例3，自身合并，.a 元素的外部尺寸是-50px，取绝对负值最大的值。

    - ```html
      .a {
        margin-top: -20px;
        margin-bottom: -50px;
      }
      <div class="a"></div>
      ```

**margin 合并的意义**

“margin-top 合并”这种特性是故意这么设计的，在实际内容呈现的时候是有着重要意义的。

- 对于兄弟元素的 margin 合并其作用和 em 类似，都是让图文信息的排版更加舒服自然。
- 父子 margin 合并的意义在于:在页面中任何地方嵌套或直接放入任何裸`<div>`，都不会影响原来的块状布局。
- 自身 margin 合并的意义在于可以避免不小心遗落或者生成的空标签影响排版和布局。

### 4.3.4 深入理解 CSS 中的 margin:auto

一些事实

- 有时候元素就算没有设置 width 或 height，也会自动填充。
  - 例如，`<div><div>`，`<div>`宽度就会自动填满容器
- 有时候元素就算没有设置 width 或 height，也会自动填充对应的方位。
  - 例如，`div{position: absolute;left: 0; right: 0;}`，此时`<div>`宽度就会自动填满包含块容器。

margin:auto 的作用机制

- 如果一侧定值，一侧 auto，则 auto 为剩余空间大小。

  - 例1，.son 的左右边距计算值是20px

    - ```css
      .father { width: 300px; }
      .son {
        width: 200px;
        margin-right: 80px;
        margin-left: auto;
      }
      ```

    - <img src="http://cdn.wangtongmeng.com/20241125225918.png" style="zoom:50%;" />

  - 例2，实现**块级元素的右对齐**效果

    - ```css
      .son { width: 200px; margin-left: auto; }
      ```

    - <img src="http://cdn.wangtongmeng.com/20241125230017.png" style="zoom:50%;" />

- 如果两侧均是 auto，则平分剩余空间。

  - 例，左右居中

    - ```css
      .son {
        width: 200px;
        margin-right: auto;
        margin-left: auto;
      }
      ```

margin:auto实现垂直居中

- 第一种方法是使用 writing-mode 改变文档流的方向，带来另外的问题，就是水平方向无法 auto 居中

  - ```css
    .father { height: 200px; writing-mode: vertical-lr; }
    .son { height: 100px; margin: auto; }
    ```

- 第二种方法，绝对定位元素的 margin:auto 居中。

  - ```css
    .father {
      width: 300px; height:150px;
      position: relative;
    }
    // 水平方向和垂直方向同时居中
    .son {
    	position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      width: 200px; height: 100px;
      margin: auto;
    }
    ```

  - 绝对定位元素的格式化高度即使父元素 height:auto 也是支持的，因此，其应用场 景可以相当广泛，可能唯一的不足就是此居中计算 IE8 及以上版本浏览器才支持。

  - 如果项目无须兼容 IE7 浏览器，绝对定位下的 margin:auto块级元素垂直居中比 top:50%然后 margin 负一半元素高度的方法要好使得多。

如果里面元素尺寸大，说明剩余可用空间都没有了，会被当作 0 来处理，也就是 auto 会被计算成 0，其实就等于没有设置 margin 属性值，因为 margin 的初始值就是 0。

另外，对于替换元素，如果我们设置 display:block，则 margin:auto 的计算规则同样适合。

### 4.3.5 margin 无效情形解析

- display 计算值 inline 的非替换元素的垂直 margin 是无效的。对于内联替换元素， 垂直 margin 有效，并且没有 margin 合并的问题，所以图片永远不会发生 margin 合并。

- 表格中的`<tr>`和`<td>`元素或者设置 display 计算值是 table-cell 或 table-row 的元素的 margin 都是无效的。但是，如果计算值是 table-caption、table 或者 inline-table 则没有此问题，可以通过 margin 控制外间距，甚至::first-letter 伪元素也可以解析 margin。

- margin 合并的时候，更改 margin 值可能是没有效果的。例如父子 margin 重叠时，正正取大值，改较小的那个。

- 绝对定位元素非定位方位的 margin 值“无效”。

- 定高容器的子元素的 margin-bottom 或者宽度定死的子元素的 margin-right 的 定位“失效”。

  - ```html
     <div class="box">
       <div class="child"></div>
    </div> 
    .box {
      height: 100px;
    }
    .child {
      height: 80px;
      margin-bottom: 100px;
    }
    ```

- 鞭长莫及导致的 margin 无效。

  - ```html
    <div class="box">
      <img src="mm1.jpg">
      <p>内容</p>
    </div>
        .box > img {
           float: left;
           width: 256px;
        }
        .box > p {
           overflow: hidden;
           margin-left: 200px;
    }
    ```

  - 此时的`<p>`的 margin-left 从负无穷到 256px 都是没有任何效果的。要解释这里为何会无效，需要对 float 和 overflow 深入理解， 而这两个属性都是后面的内容

- 内联特性导致的 margin 无效。

  - ```html
    <div class="box"><img src="mm1.jpg"></div>
    .box > img { height: 96px; margin-top: -200px;}
    ```

  - 随着我们的负值越来越负，结果达到某一个具体负值的时候，图 片不再往上偏移了。

  - 需要对 vertical-align 和内联盒模型有深入的理解，而这 vertical-align 是后面的内容，因此，深入原因分析我们将在 5.3 节介绍。

### 4.4-4.4.5

### 4.4.1 **为什么 border-width 不支持百分比值**

是语义和使用场景决定的，1.所谓“边框”，是不会因为设备大就按比例变大的 2.为图文展示服务的给这张图片套个 1px 灰色边框，区域就明显。综合这两点，造成了 border-width 不支持百 分比值。

outline、box-shadow、text-shadow 等，都是不支持 百分比值的，原因也与此类似。

border-width 还支持若干关键字，包括 thin、medium(默认值) 和 thick，对应的尺寸大小具体如下。

- thin:薄薄的，等同于 1px。
- medium(默认值):薄厚均匀，等同于 3px。
- thick:厚厚的，等同于 4px。

> - 为什么 border 属性的默认宽度大小是 medium，也就是 3px，明明 thin(1px)宽度更常用吧? 为什么呢?因为......border-style:double 至少 3px 才有效果!

### 4.4.2 **了解各种 border-style 类型**

- 1.border-style:none（默认值）

  - `div { border: 10px; } /* 无边框出现 */`

  - `div { border: red; } /* 无边框出现 */`

  - `div { border: solid; } /* 有边框出现 */`3像素边框

  - 实现一个没有下边框的边框效果

    - ```css
      div {
            border: 1px solid;
            border-bottom: none;
      }
      ```

  - 也可以通过直接设置边框宽度为 0 进行重置

    - ```css
      div {
            border: 1px solid;
            border-bottom: 0;
      }
      ```

  - 两个一起写渲染性能最高

    - ```css
      div {
            border: 1px solid;
            border-bottom: 0 none;
      }
      ```

- 2.border-style:solid 实线边框

- 3.border-style:dashed

  - 这虚线颜色区的宽高比以及颜色区和透明区的宽度比例在不同浏 览器下是有差异的。例如，在 Chrome 和 Firefox 浏览器下，颜色区的宽高比是 3:1，颜色区和 透明区的宽度比例是 1:1，如图 4-59 所示;而 IE 浏览器则是另外的数据，颜色区的宽高比是 2:1， 颜色区和透明区的宽度比例也是 2:1如图 4-60 所示。
  - <img src="http://cdn.wangtongmeng.com/20241202231555.png" style="zoom:50%;" />

- 4.border-style:dotted

  - 虚点边框在表现上同样有兼容性差异，虽然规范上明确表示是个圆点，但是 Chrome 以及 Firefox 浏览器下虚点实际上是个小方点，如图 4-61 所示;而 IE 浏览器下则是小圆点，如图 4-62 所示。
  - <img src="http://cdn.wangtongmeng.com/20241202231641.png" style="zoom:50%;" />

  - 在 IE8 浏览器下实现圆角效果

    - ```css
      
      .box {
      	width: 150px; height: 150px; /* 超出区域隐藏，只显示一个圆 */ overflow: hidden;
      }
      .dotted {
        width: 100%; height: 100%;
        border: 149px dotted #cd0000;
      }
      ```

    - <img src="http://cdn.wangtongmeng.com/20241202231801.png" style="zoom:50%;" />

- 5.border-style:double

  - 双线边框，即两根线且为实线，兼容性非常好

  - <img src="http://cdn.wangtongmeng.com/20241202231901.png" style="zoom:67%;" />

  - 规律：border-style:double 的表现规则:双线宽 度永远相等，中间间隔±1（ 除以3均分，剩下的给中间）

  - 实现三道杠

    - ```css
      .icon-menu {
             width: 120px;
             height: 20px;
             border-top: 60px double;
             border-bottom: 20px solid;
      }
      ```

    - <img src="http://cdn.wangtongmeng.com/20241202232113.png" style="zoom:50%;" />

- 6.其他 border-style 类型

  - inset(内凹)、outset(外凸)、groove(沟槽)、ridge (山脊)风格老土过时，且兼容性惨不忍睹。因此，它们没有任何实用价值。但是，对于 solid 类型边框，各个浏览器却像是约定好了，连接表现一致，背后起作用 的恰恰是这几个看上去没有任何作用的 border-style 类型。

### 4.4.3 **border-color 和 color**

“border-color 默认颜色就是 color 色值”。

具有类似特性的 CSS 属性还有 outline、box-shadow 和 text-shadow 等。

使用 border 来 绘制加号

```css
.add {
  color: #ccc;
  border: 2px dashed;
}
.add:before {
  border-top: 10px solid;
}
.add:after {
  border-left: 10px solid;
}
/* hover 变色 */ .add:hover {
  color: #06C;
}
```

![](http://cdn.wangtongmeng.com/20241202232406.png)

### 4.4.4 border 与透明边框技巧

border-color: transparent 在 IE7 浏览器就开始支持了

**1.右下方 background 定位的技巧**

默认 background 背景图片是相对于 padding box 定位的，也就是说，background-position:100%的位置计算默认是不会把 border-width 计算在内的。

```css
.box {
      border-right: 50px solid transparent;
      background-position: 100% 50%;
}
```

**2.优雅地增加点击区域大小**

```css
.icon-clear {
      width: 16px;
      height: 16px;
      border: 11px solid transparent; // 使用透明 border 增加点击区域
      ...
}
```

### 4.4.5 border 与图形构建

border 属性可以轻松实现兼容性非常好的三角图形效果

<img src="http://cdn.wangtongmeng.com/20241202232845.png" style="zoom:50%;" />

```css
div {
       width: 10px; height: 10px;
       border: 10px solid;
       border-color: #f30 #00f #396 #0f0;
}
```



梯形<img src="http://cdn.wangtongmeng.com/20241202232929.png" style="zoom:50%;" />



```css
div {
       width: 10px; height: 10px;
       border: 10px solid;
       border-color: #f30 transparent transparent;
}
```

三角形<img src="http://cdn.wangtongmeng.com/20241202233027.png" style="zoom:50%;" />

```css
 div {
       width: 0;
       border: 10px solid;
       border-color: #f30 transparent transparent;
    }
```

让垂直方向的边框宽度更宽一点，这样三角形就会更加狭长<img src="http://cdn.wangtongmeng.com/20241202233106.png" style="zoom:50%;" />

```css
div {
       width: 0;
       border-width: 10px 20px;
       border-style: solid;
       border-color: #f30 transparent transparent;
}
```

仅仅让两个方向的边框透明，形成尖角<img src="http://cdn.wangtongmeng.com/20241202233247.png" style="zoom:50%;" />

```css
div {
       width: 0;
       border-width: 10px 20px;
       border-style: solid;
       border-color: #f30 #f30 transparent transparent;
}
```

### **4.4.6~5.2.1**

### 4.4.6 border 等高布局技术

margin+padding 可以实现等高布局，同样，border 属性也可以实现等高布局。

```css
.box {
  border-left: 150px solid #333; // 左侧深色背景区域是由 border-left 属性生成的。元素边框高度总是和元素 自身高度保持一致，因此可以巧妙地实现等高布局效果
  background-color: #f0f3f9;
}
.box > nav {
  width: 150px;
  margin-left: -150px;
  float: left;
}
.box > section {
   overflow: hidden;
}
```

注意：父级容器不能使用 overflow:hidden 清除浮动影响，因为溢出隐藏是基于 padding box 的，如果设置了 overflow:hidden，则左浮动的导航列表元素就会被隐藏掉，这显然不是我们想要的效果。

此方法与用 margin+padding 实现的等高布局相比更加稳健，**不会出现锚点定位带来的问题**，但同样它也是有局限性的。

首先，由于 border **不支持百分比宽度**，因此，适合至少一栏是定宽的布局。当然，如果不考虑 IE8 浏览器，可以试试使用 vw 单位，其可实现近似的百分比宽度效果。其次，等高布局的**栏目有限制**。因为一个元素的边框数目是有限的，基本上，border 等高布局只能满足 2~3 栏的情况，除非正好是等比例的，那还可以使用 border-style:double 实现最多 7 栏布局，但这只是理论上而已。所以，一旦**等高布局栏目过多，则建议使用 table-cell 等高布局或者 margin 负值等高布局**。

## 第五章

### 5.1 字母 x——CSS 世界中隐匿的举足轻重的角色

#### 5.1.1 字母 x 与 CSS 世界的基线

字母 x 的下边缘(线)就是我们的基线。

<img src="http://cdn.wangtongmeng.com/20241209203043.png" style="zoom:50%;" />



#### 5.1.2 字母 x 与 CSS 中的 x-height

CSS 中有一个概念叫作 x-height，x-height 指的就是小写字母 x 的高度， 术语描述就是基线和等分线(mean line)(也称作中线，midline)之间的距离。

![](http://cdn.wangtongmeng.com/20241209203218.png)

vertical-align:middle。这里的 middle 是中间的意思。注意，跟上面的 median(中线)不是一个 意思。在 CSS 世界中，middle 指的是基线往上 1/2 x-height 高度。我们可以近似理解为字 母 x 交叉点那个位置。vertical-align:middle 并不是绝对的垂直居中对齐，我们平常看到的 middle 效果只是一种近似效果。

**对于内联元素垂直居中应该是对文字**，而非居外部的块 级容器所言。

#### 5.1.3 字母x与CSS中的ex

ex 是 CSS 中的一个相对单位，指的是小写字母 x 的高度，就是指 x-height。

由于字母 x 受字体等 CSS 属性影响大，不稳定，因此 ex 不太适合用来限定元素的尺寸。ex 的价值就在其副业上— **不受字体和字号影响的内联元素的垂直居中对齐**效果。

让该图标和文字中间位置对齐

vertical-align:middle，但啰嗦

```css
 .icon-arrow {
      display: inline-block;
      width: 20px;
      height: 1ex;
      background: url(arrow.png) no-repeat center;
}
```

<img src="http://cdn.wangtongmeng.com/20241209204202.png" style="zoom:50%;" />

### 5.2 内联元素的基石 line-height

#### 5.2.1 内联元素的高度之本— line-height

`<div>`高度是由行高决定的，而非文字。

**对于非替换元素的纯内联元素，其可视高度完全由 line-height 决定。**

line-height 的高度作用细节都是使用**“行距”和“半行距”**来解释的。

内联元素的高度由**固定高度**和**不固定高度**组成，这个不固定的部分就是这里的“行距”。换句话说，line-height 之所以起作用，就是**通过改变“行距”来实现**的。

在 CSS 中，“行距”分散在当前文字的上方和下方，也就是即使是第一行文字，其上方也 是有“行距”的，只不过这个“行距”的高度仅仅是完整“行距”高度的一半，因此，也被称为“半 行距”。

**行距 = line-height - font-size，有了“行距”，我们一分为二， 就有了“半行距”**

在本书中，内容区域(content area)可以近似理解为 Firefox/IE 浏览器下文本选中带背景色的区域。这么理解的重要原因之一就是**可见**，这对于我们深入理解 内联元素知识非常有帮助。

大多数场景下，内容区域和 em-box 是不一样的，内容区域高度受 font-family 和 font-size 双重影响，而 em-box 仅受 font-size 影响，通常内容区域高度要更高一些。当我们的字体是宋体的时候，内容区域和 em-box 是等同的。

```html
.test {
	font-family: simsun;
	font-size: 24px;
	line-height: 36px;
	background-color: yellow;
}
.test > span {
	background-color: white;
}
<div class="test">
  <span>sphinx</span>
</div>
```

<img src="http://cdn.wangtongmeng.com/20241209205003.png" style="zoom: 67%;" />

理解了半行距，结合我们网页中的设置的 line-height 大小，就能根据 标注获取准确的间距值。举个例子，假设 line-height 是 1.5，font-size 大小是 14px， 那么我们的半行距大小就是(套用上面的行距公式再除以 2):(14px * 1.5 - 14px) / 2 = 14px * 0.25 = 3.5px。border 以及 line-height 等传统 CSS 属性并没有小数像素 的概念(从 CSS3 动画的细腻程度可以看出)，因此，这里的 3.5px 需要取整处理，如果标注 的是文字上边距，则向下取整;如果是文字下边距，则向上取整，因为绝大多数的字体在内容 区域中都是偏下的。所以，假设设计师标注了文字字形上边缘到图片下边缘间距 20px，则我 们实际的 margin-top 值应该是 17px，因为 3.5px 向下取整是 3px。

line-height 如何通过改变行距实现文字排版?当 line-height 设为 2 的时候，半行距是一半的文字大小，两行文字中间的间隙差不多一个文字尺寸大小;如 果 line-height 大小是 1 倍文字大小，则根据计算，半行距是 0，也就是两行文字会紧密依 偎在一起;如果 line-height 值是 0.5，则此时的行距就是负值，虽然 line-height 不支 持负值，但是行距可以为负值，此时，两行文字就是重叠纠缠在一起。

**对于替换元素**

- line-height 可以影响替换元素(如图片的高度)吗?答案是，不可以!

```html
.box {
	line-height: 256px; // 此时.box 元素高度却是 256px
}
<div class="box">
  <img src="1.jpg" height="128">
</div>
```

> 是 line-height 把图片占据高度变高了，而是把“幽灵空白节点”的高度变 高了。图片为内联元素，会构成一个“行框盒子”，而在 HTML5 文档模式下，每一个“行框盒 子”的前面都有一个宽度为 0 的“幽灵空白节点”，其内联特性表现和普通字符一模一样，所以， 这里的容器高度会等于 line-height 设置的属性值 256px。

内联替换元素和内联非替换元素在一起时的高度表现

- 由于同属内联元素，因此，会共同形成一个“行框盒子”，line-height 在这个混合元素 的“行框盒子”中扮演的角色是决定这个行盒的最小高度

- 原因：一是替换元素的高度不受 line-height 影响，二是 vertical-align 属性在背后作祟。

- > 明明文字设置了 line-height 为 20px，但是，如果文字后面有小图标，最后“行 框盒子”高度却是 21px 或是 22px。这种现象背后最大的黑手其实是 vertical-align 属性， 我们会在下一章好好深入剖析为什么会有这样的表现。

**对于块级元素**

- line-height 对其本身是没有任何作用的
- 平时改变 line-height， 块级元素的高度跟着变化实际上是通过改变块级元素里面内联级别元素占据的高度实现的

### 5.2.2-5.3.1

#### 5.2.2 为什么 line-height 可以让内联元素“垂直居中”

让line-height 等于height ，可以让内联元素垂直居中。行高可以实现“垂直居中”原因在于 CSS 中“行距的上下等分机制”

- 误区一：要让单行文字垂直居中，只需要 line-height 这一个属性就可以

- 误区二:行高控制文字**近似**垂直居中，不仅适用于单行，多行也是可以的

“近似”是因为文字字形的垂直中线位置普遍要比真正的“行框盒子”的垂直中线位置低

由于我们平时使用的 font-size 都比较小，12px~16px 很多，因此，虽然微软雅黑字体有下沉，但也就 1 像素的样子，看上去像是垂直居中罢了。这也是我总是称line-height 实现的**单行文本垂直居中**为“近似垂直居 中”的原因。

```html
p{
  font-size: 80px;
  line-height: 120px;
  background-color: #666;
  font-family: 'microsoft yahei';
  color: #fff;
}

<p>微软雅黑</p>
```

<img src="http://cdn.wangtongmeng.com/20241215203745.png" style="zoom:50%;" />

行高实现**多行文本或者图片等替换元素的近似垂直居中**效果实现

```html
 .box {
       line-height: 120px;
       background-color: #f0f3f9;
}
.content {
       display: inline-block;
       line-height: 20px;
       margin: 0 20px;
       vertical-align: middle;
     }
     <div class="box">
<div class="content">基于行高实现的...</div> </div>
```

<img src="http://cdn.wangtongmeng.com/20241215203727.png" style="zoom:50%;" />

> 实现的原理大致如下。
>  (1)多行文字使用一个标签包裹，然后设置 display 为 inline-block。好处在于既能重置外部的 line-height 为正常的大小，又能保持内联元素特性，从而可以设置vertical-align 属性，以及产生一个非常关键的“**行框盒子**”。我们需要的其实并不是这个 “行框盒子”，而是每个“行框盒子”都会附带的一个产物— “**幽灵空白节点**”，即一个宽度为 0、表现如同普通字符的看不见的“节点”。有了这个“幽灵空白节点”，我们的 line-height:120px 就有了作用的对象，从而相当于在.content 元素前面撑起了一个高度为120px 的宽度为 0 的内联元素。
>
> (2)因为内联元素默认都是基线对齐的，所以我们通过对.content 元素设置 vertical- align:middle 来调整多行文本的垂直位置，从而实现我们想要的“垂直居中”效果。如果是 要借助 line-height 实现图片垂直居中效果，也是类似的原理和做法。

  <img src="http://cdn.wangtongmeng.com/20241215204057.png" style="zoom:50%;" />





不垂直居中与 line-height 无关，而是 vertical-align 导致的

#### 5.2.3 深入 line-height 的各类属性值

line-height 的默认值是 normal，还支持数值、百分比值以及长度值。

- 数值，如 line-height:1.5，其最终的计算值是和当前 font-size 相乘后的值。

- 百分比值，如 line-height:150%，其最终的计算值是和当前 font-size 相乘后的值。

- 长度值，也就是带单位的值，如 line-height:21px 或者 line-height:1.5em等，此处 em 是一个相对于 font-size 的相对单位，因此，line-height:1.5em 最终的计算值也是和当前 font-size 相乘后的值。

- 区别：如果使用数值作为 line-height 的属性值， 那么所有的**子元素继承的都是这个值**;但是，如果使用百分比值或者长度值作为属性值，那么所有的子元素**继承的是最终的计算值**。

- 让百分比实现类似 line-height:1.5 的继承效果`*{line-height:150%};`

  - HTML 中的很多替换元素，尤其表单类的替换元素，如输入框、 按钮之类的，很多具有继承特性的 CSS 属性其自己也有一套，如 font-family、font-size 以及这里的 line-height。**由于继承是属于最弱的权重，因此 body 中设置的 line-height 是无法影 响到这些替换元素的**。
  - *作为一个选择器会直接重置这些替换元素默认的 line-height，这其实是我们需要的。

- 又考虑到*的性能以及利用继承的特性，我们可以折中使用下面的方法：

  - ```css
    body {
      line-height: 1.5;
    }
    input, button {
      line-height: inherit;
    }
    ```

这个 normal 实际上是一个变量。normal 实际上是一个和 font-family 有着密切关联的变量值。只要字体确定，各个浏览器下的默认 line-height 解析值基本上都是一样的。关键问题是，不同的浏览器所使用的默认中英文字体并不是一样的，并且不同操作系统的默认字体也不一样，换句话说，就是**不同系统不同浏览器的默认 line-height 都是有差异的**。因此，在实际开发的时候，**对 line-height 的默认值进行重置**是势在必行的。

**line-height 应该重置为多大的值**

- **重图文内容展示**的网页或者网站，如博客、论坛、 公众号之类的，那一定要使用**数值**作为单位，考虑到文章阅读的舒适度，line-height 值可以设置在 1.6~1.8。

- **偏重布局**结构精致的网站，则在我看来使用**长度值或者数值**都是可以的，因为，第一，我们的目的是为了兼容;第二，无论使用哪种类型值，都存在需要局部重置的场景。不过，根据我的统计，基本上各大站点都是使用数值作为全局的 line-height 值。不过，这并不表示使用数值就一定是最好的，如果网站内容的样式不是动态不可控的， 有时候，固定的长度值反而更利于精确布局。因此，不要盲目跟风。那具体设置的值应该是多大呢?

  - 如果使用的是长度值，我建议直接 line-height:20px，排版时候计算很方便。

  - 如果随大流使用的是数值，我建议最好使用方便计算的行高值，一种是 **line-height 属性值本身方便计算**，另一种是 **line-height 的默认计算值方便计算**。

    - 比方说，1.3、1.4、1.5 都有大型网站使用，我们就不妨使用 1.5，因为心算` 1.4*16px` 要比 `1.5*16px `难多了，这就是第一种“属性值本身方便计算”;
    - 而另外一种“默认计算值方便计算”是我们先得到方便计算 的 line-height 计算值，然后倒推 line-height 应该使用的数值是多大，例如 20px 是一个 非常方便的计算值，如果`<body>`默认重置的 font-size 是 14px，则 line-height 数值应该 是 20px/14px≈1.4285714285714286 四舍五入的结果。注意，在 CSS 中，计算行高的时候，行高值一定不要向下舍 入，而要**向上舍入**。`body {line-height: 1.42858;font-size: 14px;}`

    

#### 5.2.4 内联元素 line-height 的“大值特性”

.box 元素的高度全都是 96px 高!

```html
<div class="box">
  <span>内容...</span>
</div>
<style>
.box {
	line-height: 96px;
}
.box span {
	line-height: 20px;
}
和
.box {
	line-height: 20px;
}
.box span {
	line-height: 96px;
}
</style>

```

级元素的高度都是由数值大的 那个 line-height 决定的，我称之为“内联元素 line-height 的大值特性”。

内联元素是支持 line-height 的`<span>`元素上的 line-height。也确实覆盖了.box 元素，但是，在内联盒模型中，存在一些你看不到的东西，没错，就是多 次提到的“幽灵空白节点”。

只要有“内联盒子”在，就 一定会有“行框盒子”，就是每一行内联元素外面包裹的一层 看不见的盒子。然后，重点来了，在每个“行框盒子”前面有一个宽度为 0 的具有该元素的字体和行高属性的看不见的“幽灵空白节点”。

<img src="http://cdn.wangtongmeng.com/20241215210306.png" style="zoom:50%;" />

​    当.box 元素设置 line-height:96px 时，**“字符”高度 96px**;当设置 line-height:20px 时，`<span>`元素的高度则变成了 96px，而**行框盒子的高度是由高度最高的那个“内联盒子”决定的**，这就是.box 元素高度永远都是最大的那个 line-height 的原因。

要**避免“幽灵空白节点”的干扰**，例如，设置`<span>`元 素 display:inline-block，创建一个独立的“行框盒子”，这样`<span>`元素设置的 line-height:20px 就可以生效了，**这也是多行文字垂直居中示例中这么设置的原因**。

### 5.3 line-height 的好朋友 vertical-align

凡是 line-height 起作用的地方 vertical-align 也一定起作用，只是很多时候， vertical-align 默默地在背后起作用，你没有感觉到而已。

```html
.box { line-height: 32px; }
.box > span { font-size: 24px; }
<div class="box">
	<span>文字</span>
</div>
```

高度并不是 32px，而是要大那么几像素(受不同字体影响，增加高度也不一样 )

之所以最终.box 元素的高度并不等于 line-height，就是因为行高的朋友属性 vertical-align 在背后默默地下了黑手。

<img src="http://cdn.wangtongmeng.com/20241215210734.png" style="zoom:50%;" />

#### 5.3.1 vertical-align 家族基本认识

抛开 inherit 这类全局属性值不谈，我把 vertical-align 属性值分为以下 4 类:

- 线类，如 baseline(默认值)、top、middle、bottom;
- 文本类，如 text-top、text-bottom;
- 上标下标类，如 sub、super;
- 数值百分比类，如 20px、2em、20%等。
  - 根据计算值的不同，相对于基线往上或往下偏移，到底是往上还是往下取决于 vertical- align 的计算值是正值还是负值，如果是负值，往下偏 移，如果是正值，往上偏移。
  - 负值全部都是往下偏移，正值全部都是往上偏移，而且数值大小全部都是相对于基线位置计算的，因此，从这一点来看，vertical-align:baseline 等同于 vertical-align:0。

vertical-align 的数值属性值在实际开发的时候实用性非常强。

- 一是其兼容性非常好。实际上，vertical-align 有一些属性值的渲染一直都很兼容，一个是默认的基线对齐，另一个就是相对于基线的“数值百分比类” 属性值偏移定位。也就是说，如果我们使用类似 vertical-align:10px 这样的定位，是不 会有任何兼容性问题的，也不需要写 CSS hack。
- 二是其可以精确控制内联元素的垂直对齐位置。
- 例子：有一个 display 值为 inline-block 的尺寸为 20 像素×20 像素的小图标，默认状 态下，文字是明显偏下的。vertical- align:middle 控制图标的垂直位置，然而，由于 middle 并不是真正意义上的垂直居中，因 此还是会有像素级别的误差，误差大小与字体和字号均有关。在本例中，图标往下多偏移了 1 像素而导致容器的可视高度变成了 **21 像素**
  - <img src="http://cdn.wangtongmeng.com/20241215211504.png" style="zoom:50%;" />
  - 设置 vertical-align: -5px，此时，图标和文字实现了真正意义的垂直居中，此时容器的可视高度和当前行高 20 像素保持了一致。
  - <img src="http://cdn.wangtongmeng.com/20241215211518.png" style="zoom:50%;" />

使用并不多的“百分比类”属性值。

- vertical- align 属性的百分比值则是相对于 line-height 的计算值计算的。
- 假设某元素的 line-height 是 20px，那么此时 vertical-align:-25%相当于设置 vertical-align:-5px。
- 在如今的网页布局中，line-height 的计算值都是相对固定并且已知的， 因此，直接使用具体的数值反而更方便。

#### **5.3.2-5.3.4**

行框盒子：每一行就是一个“行框盒子”(实线框标注)，每个“行框盒子”又是由一个一个“内联盒子” 组成的。

<img src="http://cdn.wangtongmeng.com/20241224073002.png" style="zoom:50%;" />

#### 5.3.2 vertical-align 作用的前提

vertical-align 起作用的前提:只能应用于**内联元素**以及 **display 值为 table-cell 的元素**。换句话说，vertical-align 属性只能作用在 display 计算值为 inline、inline- block，inline-table 或 table-cell 的元素上。因此，默认情况下，`<span>`、`<strong>`、 `<em>`等内联元素，`<img>`、`<button>`、`<input>`等替换元素，非 HTML 规范的自定义标签 元素，以及`<td>`单元格，都是支持 vertical-align 属性的，其他块级元素则不支持。

有一些 CSS 属性值会在背后默默地改变元素 display 属性的计算值，从而导致 vertical-align 不起作用。例如，**浮动和绝对定位会让元素块状化**。

**一些看起来vertical-align 不起作用的情况**

- img不生效，图片顶着.box 元素的上边缘显示，根本没垂直居中

  - 看上去是 vertical-align:middle 没起作用，实际上，vertical-align 是在努力地渲染的，只是行框盒子前面的“幽灵空白节点”高度太小，如果我们通过设置一个足够大的行高让“幽灵空白节点”高度足够，就会看到 vertical-align:middle 起作用了

  - ```css
    .box {
      height: 128px;
      line-height: 128px; /* 关键 CSS 属性 */
    }
    .box > img {
      height: 96px;
      vertical-align: middle;
    }
    ```

- <img src="http://cdn.wangtongmeng.com/20241224073626.png" style="zoom:50%;" />

- display:table-cell 无视行高，图片并没有要垂直居中的迹象，还是紧贴着父元素的上边缘

  - ```css
    .cell {
          height: 128px;
          display: table-cell;
        	vertical-align: middle;  /* 关键 CSS 属性 */
    }
    .cell > img {
      		height: 96px;
    }
    ```

  - table-cell 元素设置 vertical-align 垂直对齐的是子元素，但是其作用的并不是子元素，而是 table-cell 元素自身。

  - <img src="http://cdn.wangtongmeng.com/20241224074027.png" style="zoom:50%;" />

#### 5.3.3 vertical-align 和 line-height 之间的关系

**只要出现内联元素，vertical-align 和 line-height 一定会同时出现**。vertical-align 的百分比值是相对于 line-height 计算的。

**容器高度不等于行高的例子**

- ```html
  .box { line-height: 32px; }
  .box > span { font-size: 24px; }
  <div class="box">
    x<span>文字x</span>
  </div>
  ```

- <img src="http://cdn.wangtongmeng.com/20241223212434.png" style="zoom:50%;" />

- 一处是字母 x 构成了一个“匿名内联盒子”，另一处是“文字 x”所在的`<span>`元素，构成了一个“内联盒子”。由于都受 line- height:32px 影响，因此，这两个“内联盒子”的高度都是 32px。对字符而言，font-size 越大字符的基线位置越往下，因为文字默认全部都是基线对齐，所以**当字号大小不一样的两个文字**在一起的时候，彼此就会**发生上下位移**，如果位移距离足够大，就会超过行高的限制，而导致出现意料之外的高度。

- 解决方案

  - 让“幽灵空白节点”和后面`<span> `元素字号一样大

    - ```
       .box {
       	line-height: 32px;
       	font-size: 24px;
       }
       .box > span { }
      ```

  - 改变垂直对齐方式，如顶部对齐

    - ```css
      .box { line-height: 32px; }
      .box > span {
        font-size: 24px;
        vertical-align: top;
      }
      ```

**图片底部留有间隙的问题**

- 现象:任意一个块级元素，里面若有图片，则块级元素高度基本上都要比图片的高度高

- ```html
  .box {
  	width: 280px;
  	outline: 1px solid #aaa;
  	text-align: center;
  }
  .box > img {
  	height: 96px;
  }
  <div class="box">
    <img src="1.jpg">
  </div>
  ```

- <img src="http://cdn.wangtongmeng.com/20241223213936.png" style="zoom:50%;" />

- 原理：当前 line-height 计算值是 20px，而 font-size 只有 14px，因此，字母 x 往下一定 有至少 3px 的半行间距(具体大小与字体有关)，而**图片作为替换元素其基线是自身的下边缘**。 根据定义，默认和基线(也就是这里字母 x 的下边缘)对齐，**字母 x 往下的行高产生的多余的间隙**就嫁祸到图片下面，让人以为是图片产生的间隙，实际上，是“幽灵空白节点”、 line-height 和 vertical-align 属性共同作用的结果。

- 解决方案：

  - **图片块状化**。可以一口气干掉“幽灵空白节点”、line-height 和 vertical-align。
  - **容器 line-height 足够小**。例如，容器设置 line-height:0。
  - **容器 font-size 足够小**。此方法要想生效，需要容器的 line-height 属性值和当 前 font-size 相关，如 line-height:1.5 或者 line-height:150%之类。
  - **图片设置其他 vertical-align 属性值**。间隙的产生原因之一就 是基线对齐，所以我们设置 vertical-align 的值为 top、middle、bottom 中的任意一个都是可以的。

**内联特性导致的 margin 无效”的案例**

- ```
  <div class="box">
  	<img src="mm1.jpg">
  </div>
  .box > img {
  	height: 96px;
    margin-top: -200px;
  }
  ```

- 图片的前面有个“幽灵空白节点”，而在 CSS 世界中，非主动触发位移的内联元素是不可能跑到计算容器外面的， 导致图片的位置被“幽灵空白节点”的 vertical-align:baseline 给限死了。

- <img src="http://cdn.wangtongmeng.com/20241223214756.png" style="zoom:50%;" />

- 因为字符 x 下边缘和图片下边缘对齐，字符 x 非主动定位，不可能跑到容器外面，所以图片就被限死在此问题，margin-top 失效。

#### 5.3.4 深入理解 vertical-align 线性类属性值

**1.inline-block 与 baseline**

- vertical-align 属性的默认值 baseline。
- 在文本之类的内联元素那里就是**字符 x 的下边缘**。
- 对于替换元素则是**替换元素的下边缘**。
- 如果是 inline-block 元素
  - 如果里面没有内联元素，或者 overflow 不是 visible， 则该元素的基线就是其 **margin 底边缘**;
  - 否则其基线就是元素里面**最后一行内联元素的基线**。

```html
.dib-baseline {
	display: inline-block;
	width: 150px; height: 150px;
	border: 1px solid #cad5eb;
	background-color: #f0f3f9;
}
<span class="dib-baseline"></span>
<span class="dib-baseline">x-baseline</span>
```

<img src="http://cdn.wangtongmeng.com/20241223215712.png" style="zoom:50%;" />

设置右边框的 line-height 值为 0。当 line-height 变成 0 的时候， 字符占据的高度也是 0，此时，高度的起始位置就变成了**字符内容区域的垂直中心位置**，于是文字就有一半落在框的外面了。由于文字字符上移了，自然基线位置(字母 x 的底边缘)也往上移动了。

<img src="http://cdn.wangtongmeng.com/20241223215757.png" style="zoom:50%;" />

**复杂案例**：text-align:jusitfy 声明可以帮助我们实现兼容的列表两端对齐效果，但是 text-align:jusitfy 两端对齐需要内容超过一行，同时为了让任意个数的列表最后一行也是左对齐排列，我们需要在列表最后辅助和列表宽度一样的空标签元素来占位

```html
.box {
	text-align: justify;
}
.justify-fix {
	display: inline-block;
	width: 96px;
}
<div class="box">
  <img src="1.jpg" width="96">
  <img src="1.jpg" width="96">
  <img src="1.jpg" width="96">
  <img src="1.jpg" width="96">
  <i class="justify-fix"></i>
  <i class="justify-fix"></i>
  <i class="justify-fix"></i>
</div>
```

<img src="http://cdn.wangtongmeng.com/20241223221132.png" style="zoom:50%;" />

给.box 元素来个 line-height:0

<img src="http://cdn.wangtongmeng.com/20241223221201.png" style="zoom:50%;" />

在最后一个占位的`<i>`元素后面新增同样的 x-baseline 字符

> 现在行高 line-height 是 0，则字符 x-baseline 行间距就是-1em，也就是高度为 0，由于 CSS 世界中的行间距是上下等分的， 因此，此时字符 x-baseline 的对齐点就是当前内容区域(可以看成文字选中背景区域，如图 5-35 所示，截自 Firefox 浏览器)的垂直中心位置。由于图 5-34 中的 x-baseline 使用的是微 软雅黑字体，字形下沉明显，因此，内**容区域的垂直中心位置大约在字符 x 的上面 1/4 处**，而 这个位置就是字符 x-baseline 和最后一行图片下边缘交汇的地方。

由于前面的`<i class= "justify-fix"></i>`是一个 inline-block 的空元素，因此基线就是自身的底部，于是下 移了差不多 3/4 个 x 的高度，这个下移的高度就是上面产生的间隙高度。

<img src="http://cdn.wangtongmeng.com/20241223221752.png" style="zoom:50%;" />

解决方案：

- **改变占位`<i>`	元素的基线**，例如，塞一个空格&nbsp。此时`<i>`元素的基线是里面字符的基线，此基线也正好和外面的“幽灵空白节点”的基线位置一致，没有了错位

- **改造“幽灵空白节点”的基线位置**，`.box {text-align: justify;font-size: 0;}`

- **使用其他 vertical-align 对齐方式**，就是让`<i>`z占位元素 vertical-align:top/bottom 之类， 当前，前提还是先让容器 line-height:0

  - ```css
    .box {
          text-align: justify;
          line-height: 0;
      }
        .justify-fix {
    	vertical-align: bottom; /* top、middle 都可以 */
    }
    ```

**案例：背景小图标和文字对齐的问题**

如果图标和后面的文字高度一致，同时图标的基线和文字基线一样，使图标和文字天然对齐

一套基于 20px 图标对齐的处理技巧

- (1)图标高度和当前行高都是 20px。
- (2)图标标签里面永远有字符。借助:before 或:after 伪元素生成一个空格字符
- (3)图标 CSS 不使用 overflow:hidden 保证基线为里面字符的基线，但是要让里面潜在的字符不可见。

```css
.icon {
      display: inline-block;
      width: 20px; height: 20px; /* 图标高度和当前行高都是 20px */
   		background: url(sprite.png) no-repeat;
      white-space: nowrap;
      letter-spacing: -1em;
      text-indent: -999em; /* 让里面潜在的字符不可见 */
    }
    .icon:before {
      content: '\3000'; /* 图标标签里面永远有字符 */
    }
/* 具体图标 */
.icon-xxx {
      background-position: 0 -20px;
    }
...
```

<img src="http://cdn.wangtongmeng.com/20241223224105.png" style="zoom:50%;" />

**2.了解 vertial-align:top/bottom**

vertial-align:top 就是垂直上边缘对齐

- 内联元素:如果是内联元素，则和这一行位置最高的内联元素的顶部对齐。
- table-cell 元素:元素底 padding 边缘和表格行的顶部对齐。

**3.vertial-align:middle 与近似垂直居中**

vertial- align:middle。

- 内联元素:元素的垂直中心点和行框盒子基线往上 1/2 x-height 处对齐。
- table-cell 元素:单元格填充盒子相对于外面的表格行居中对齐。

vertial-align:middle 可以让内联元素的真正意义上的**垂直中心位置和字符 x 的交叉点对齐**。font-size: 0 实现真正垂直居中对齐。

<img src="http://cdn.wangtongmeng.com/20241223223357.png" style="zoom:50%;" />
