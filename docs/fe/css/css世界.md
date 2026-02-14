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
- `&lt;div&gt;`是具有“流”特性的元素，“div+CSS布局“ 实际上指的就是”流体布局“。

CSS 世界

- 这里特指 CSS2.1的世界。
- CSS2.1全面支持从IE8开始。

table

- 流影响整个CSS世界，但不包括`&lt;table&gt;`。
- `&lt;table&gt;`出现时间早，有自己的规则。

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

- 常见的块级元素`&lt;div&gt;`、`&lt;li&gt;`、`&lt;table&gt;`等

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

- 充分利用可用空间：`&lt;div&gt;`、`&lt;p&gt;`等宽度默认是100%于父级容器。
- 收缩与包裹：浮动、绝对定位、inline-block元素、table元素，会收缩到合适（包裹性），对应CSS3的fit-content表现。
- 收缩到最小：table-layout为auto的表格，当每列空间不够时，中文随便断，英文按单词断。
- 超出容器限制：
  - 上述3种情况尺寸不会主动超出父容器宽度。
  - 特殊情况：内容很长的连续的英文和数字或内联元素设置了 `white-space:nowrap`时。

**内外尺寸**

- 内部尺寸，有内部元素（子元素）决定

- 外部尺寸，由外部元素（父元素）决定
  - `&lt;div&gt;`默认宽度100%显示，是“外部尺寸”（唯一的外部尺寸，“流”的精髓所在），其余全部是“内部尺寸”。

**外部尺寸与流体特性**

- 正常流宽度
  - `&lt;div&gt;`尺寸会铺满父容器行，blocak容器的流特性（一种margin/padding/content内容区域自动分配水平空间的机制）
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

问题：width:100px 是如何作用到`&lt;div&gt;`元素上的?

- content box 环绕着 width 和 height 给定 的矩形
- width:100px 作用在了 content box 上，当 padding、border 和 margin 都是 0，因此，该`&lt;div&gt;` 宽度就是 100 px，否则不是。

**CSS 流体布局下的宽度分离原则**

所谓“宽度分离原则”，就是 CSS 中的 width 属性不与影响宽度的 padding/border(有时候包括 margin)属性共存

## 第四章

盒尺寸中的四个盒子 content box、padding box、border box 和 margin box 分别对应 content、padding、border和margin属性。

### 4.1.1 content与替换元素

**1.替换元素**

替换元素：根据是否具有替换内容，把元素分为替换元素(通过修改某个属性值呈现的内容)和非替换元素。`&lt;img&gt;`、`&lt;object&gt;`、`&lt;video&gt;`、`&lt;iframe&gt;`或表单元素`&lt;textarea&gt;`和`&lt;input&gt;`都是替换元素。

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

    - 时`&lt;ul&gt;`的宽度就相当于 100%+20px，于是，第 3n 的`&lt;li&gt;`标签的 margin-right: 20px 就多了 20 像素的使用空间，正好列表的右边缘就是父级`&lt;ul&gt;`容器 100%宽度位置

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
<!-- .box 是一个宽高比为 2:1 的橄榄绿长方形 -->
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

#### 5.3.5-6.1.1

#### 5.3.5 深入理解 vertical-align 文本类属性值

文本类属性值指的就是 text-top 和 text-bottom，定义如下。

- vertical-align:text-top:盒子的顶部和父级内容区域的顶部对齐。
- vertical-align:text-bottom:盒子的底部和父级内容区域的底部对齐。

> 其和其他垂直定位属性相比没有任何的优势

所谓“父级内容区域”指的就是在父级 元素当前 font-size 和 font-family 下应有的内容区域大小。

可以理解为(以 text-top 举例):假设元素后面有一个和父元素 font- size、font-family 一模一样的文字内容，则 vertical-align:text-top 表示元素和这 个文字的内容区域的上边缘对齐。

<img src="http://cdn.wangtongmeng.com/20241229154123.png" style="zoom:50%;" />

vertical-align 的文本类属性值不常用的原因

- (1)使用场景缺乏
- (2)文本类垂直对齐理解成本高
- (3)内容区域不直观且易变。内容区域默认是看不见的；易变，内容区域的大小是和字体 font-family 密切相关的。

#### 5.3.6 简单了解 vertical-align 上标下标类属性值

vertical-align 上标下标类属性值指的就是 sub 和 super 两个值，分别表示下标和上 标。在 HTML 代码中，有两个标签语义就是下标和上标，分别是上标`<sup>`和下标`<sub>`

```HTML
zhangxinxu<sup>[1]</sup>
NH<sub>4</sub>HCO<sub>3</sub>
```

<img src="http://cdn.wangtongmeng.com/20241229160100.png" style="zoom:50%;" />

需要注意，vertical-align 上标下标类属性值并不会改变当前元素的文字大小，千万不要被 HTML 标签中的`<sup>`和`<sub>`误导，因为这两个 HTML 标签默认 font-size 是 smaller

#### 5.3.7 无处不在的 vertical-align

遇到不太好理解的现象， 请一定要意识到，有个“幽灵空白节点”以及无处不在的 vertical-align 属性。

虽然同属线性类属性值，但是 top/bottom 和 baseline/middle 却是完全不同的两个 帮派，前者对齐看边缘看行框盒子，而后者是和字符 x 打交道。

在分析复杂场景的时候，仅需要套用定义分析当前 vertical-align 值的作用就可以了。

#### 5.3.8 基于 vertical-align 属性的水平垂直居中弹框

```HTML
 <div class="container">
      <div class="dialog"></dialog>
</div>
.container {
      position: fixed;
      top: 0; right: 0; bottom: 0; left: 0;
      background-color: rgba(0,0,0,.5);
      text-align: center;
      font-size: 0;
      white-space: nowrap;
      overflow: auto;
    }
    .container:after {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
}
.dialog {
      display: inline-block;
      vertical-align: middle;
      text-align: left;
      font-size: 14px;
      white-space: normal;
}
```

## 第6章 流的破坏与保护

### 6.1 魔鬼属性 float

#### 6.1.1 float 的本质与特性

浮动的本质就是为了实现文字环绕效果。

float 的特性：

- 包裹性;
- 块状化并格式化上下文;
- 破坏文档流;
- 没有任何 margin 合并;

包裹性（3.2.1 节），由“包裹”和“自适应性”两部分组成。

(1)包裹。假设浮动元素父元素宽度 200px，浮动元素子元素是一个 128px 宽度的图片， 则此时浮动元素宽度表现为“包裹”，就是里面图片的宽度 128px，代码如下:

```html
 .father { width: 200px; }
    .float { float: left; }
    .float img { width: 128px; }
    <div class="father">
      <div class="float">
        <img src="1.jpg">
      </div>
    </div>
```

(2)自适应性。如果浮动元素的子元素不只是一张 128px 宽度的图片，还有一大波普通 的文字，例如:

```HTML
<div class="father">
      <div class="float">
<img src="1.jpg">我是帅哥，好巧啊，我也是帅哥，原来看这本书的人都是帅哥~ </div>
</div>
```

则此时浮动元素宽度就自适应父元素的 200px 宽度，最终的宽度表现也是 200px。

块状化的意思是，元素一旦 float 的属性值不为 none，则其 display 计算值就是 block 或者 table。

<img src="http://cdn.wangtongmeng.com/20241229234920.png" style="zoom:50%;" />





### 6.1.2-6.2

#### 6.1.2 float 的作用机制

float 属性的原本作用“只是为了实现文字环绕效果“。“文字环绕效果” 是由两个特性(即“父级高度塌陷”和“行框盒子区域限制”)共同作用的结果。

- 条件一：让父元素高度塌陷，让跟随的内容可以和浮动元素在一个水平线上

- 条件二：“行框盒子和浮动元素的不可重叠性”，也就是“行框盒子如果和浮动元素的垂直高度有 重叠，则行框盒子在正常定位状态下只会跟随浮动元素，而不会发生重叠”。

**定高**只能解决“父级高度塌陷”带来的影响，但是对“行框盒子区域限制”却没有任何效果，结果导致的问题 是浮动元素垂直区域一旦超出高度范围，或者下面元素 margin-top 负值上偏移，就很容易使 后面的元素发生“环绕效果”

```html
<div class="father">
  <div class="float">
    <img src="zxx.jpg">
  </div>
  我是帅哥，好巧啊，我也是帅哥，原来看这本书的人都是帅哥~ </div>
<div>虽然你很帅，但是我对你不感兴趣。</div>
.father {
  height: 64px;
  border: 1px solid #444;
}
.float {
  float:left;
}
.float img {
	width: 60px; height: 64px;
}
```

从这段代码可以看出父级元素.father 高度设置的和图片高度一模一样，都是 64px。按道理，下面的“虽然你很帅，但是我对你不感兴趣。”这些 文字应该居左显示，但最后的结果却是下图所示的这样。

内联状态下的图片底部是有间隙的，也就是.float 这个浮动元素的实际高度 并不是 64px，而是要比 64px 高几像素，带来的问题就是浮动元素的高度超出.father 几像素。

<img src="http://cdn.wangtongmeng.com/20250104170529.png" style="zoom:50%;" />

**当使用浮动元素的时候，比较稳妥的做法还是采用一些手段干净地清除浮动带来的影响**。

#### 6.1.3 float 更深入的作用机制

<img src="http://cdn.wangtongmeng.com/20250104171201.png" style="zoom:50%;" />

- **浮动锚点**是 float 元素所在的“流”中的一个点，这个点本身并不浮动，就表现而言 更像一个没有 margin、border 和 padding 的空的内联元素。
- **浮动参考**指的是浮动元素对齐参考的实体。

在 CSS 世界中，float 元素的“浮动参考”是“行框盒子”，也就是 float 元素在当前 “行框盒子”内定位。正是因为 float 定位参考的是“行框盒子”，所以“更多”才会在第二行显示。每一行内联元素都有一个“行框盒子”，这个例子中标题文字比较多，两行显示了，因此**有上下两个“行框盒子**”**，而“更多”所在的<a>元素是在标题文字后面，位于第 二行，因此，这里设置了 float:right 的<a>元素是相对于第二行的“行框盒子”对齐的。

如果 float 元素前后全是块元素，那根本没有“行框盒子”， 此时，就需要上面提到的“**浮动锚点**”出马了。“其作用就是**产生“行框盒子”**，因为“浮动锚点”表现如同一个空的内联元素，有内联元素自然就有“行框盒子”，于是， float 元素对齐的参考实体“行框盒子”对于块状元素也同样适用了，只不过这个“行框盒子” 由于没有任何内容，所以无尺寸，看不见也摸不着罢了。

#### 6.1.4 float 与流体布局

float实现两栏或多栏的自适应布局

一侧定宽的两栏自适应布局。

```html
<div class="father">
<img src="me.jpg">
<p class="animal">小猫1，小猫2，...</p>
    </div>
.father {
	overflow: hidden;
}
.father > img {
	width: 60px; height: 64px;
	float: left;
}
.animal {
	margin-left: 70px;
}
```

<img src="http://cdn.wangtongmeng.com/20250104171836.png" style="zoom:50%;" />

百分比宽度布局

```css
.left {
  float: left;
  width: 50%;
}
.right {
  margin-left: 50%;
}
```

多栏布局

```html
<div class="box">
	<a href class="prev">&laquo; 上一章</a>
  <a href class="next">下一章 &raquo;</a>
  <h3 class="title">第 112 章 动物环绕</h3>
</div>
.prev {
      float: left;
}
.next {
      float: right;
    }
    .title {
      margin: 0 70px;
      text-align: center;
}
```

### 6.2 float 的天然克星 clear

#### 6.2.1 什么是 clear 属性

用来处理 float 属性带来的 高度塌陷等问题的属性，这个属性就是 clear。其语法如下:

```
 clear: none | left | right | both
```

官方对 clear 属性的解释是:“元素盒子的边不能和**前面的**浮动元素相邻。”

就是设置了 clear 属性的元素自身如何如何，而不是让 float 元素如何如何。

clear 属性值

- none:默认值，左右浮动来就来。
- left:左侧抗浮动。
- right:右侧抗浮动。
- both:两侧抗浮动。（可代替left、right）

```css
li {
   width: 20px; height: 20px;
   margin: 5px;
   float: left;
}
li:nth-of-type(3) {
  clear: both;
}
```

<img src="http://cdn.wangtongmeng.com/20250104172405.png" style="zoom:50%;" />

原因在于，clear 属性是让自身不能和前面的浮动元素相邻，注意这里“前面的”3 个字， 也就是 clear 属性对“后面的”浮动元素是不闻不问的，因此才 2 行显示而非 3 行。

#### 6.2.2 成事不足败事有余的 clear

clear 属性只有块级元素才有效的，而::after 等伪元素默认都是内联水平，这就是借助伪元素清除浮动影响时需要设置 display 属性值的原因。

```css
.clear:after {
  content: '';
  display: table; // 也可以是'block'，或者是'list-item' clear: both;
}
```

clear:both 只能在一定程度上消除浮动的影响，要想完美地去除浮动元素的影响，还需要使用其他 CSS 声明。

### **6.3~6.4.4**

### 6.3 CSS 世界的结界——BFC

#### 6.3.1 BFC 的定义

BFC 全称为 block formatting context，中文为“块级格式化上下文”。

BFC规则：

如果一个元素具有 BFC，内部子元素不会影响外部的元素。所以，BFC 元素是不可能发生 margin 重叠的，因为 margin 重叠是会影响外面的元素的;BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会 影响外部元素的设定。

触发 BFC ：

- `<html>`根元素;
- float 的值不为 none;
- overflow 的值为 auto、scroll 或 hidden;
- display 的值为 table-cell、table-caption 和 inline-block 中的任何一个;
- position 的值不为 relative 和 static。

- 只要元素符合上面任意一个条件，就无须使用 clear:both 属性去清除浮动的影响了。

#### 6.3.2 BFC 与流体布局

BFC 的结界特性最重要的用途其实不是去 margin 重叠或者是清除 float 影响，而是实现更健壮、更智能的**自适应布局**。

```html
<div class="father">
  <img src="me.jpg">
  <p class="animal">小猫1，小猫2，...</p>
</div>
img { float: left; }
.animal { overflow: hidden; }
```

<img src="http://cdn.wangtongmeng.com/20250112161751.png" style="zoom:50%;" />

增加10px间隙

```css
// 这几种写法都是可以的
img { margin-right: 10px; }
img { border-right: 10px solid transparent; }
img { padding-right: 10px; }
.animal { border-left: 10px solid transparent; }
.animal { padding-right: 10px; }
```

<img src="http://cdn.wangtongmeng.com/20250112162033.png" style="zoom:50%;" />

和基于纯流体特性实现的两栏或多栏自适应布局相比，基于 **BFC 特性的自适应布局有如下优点**：

- 自适应内容由于封闭而更健壮，容错性更强。
- 自适应内容自动填满浮动以外区域，无须关心浮动元素宽度，可以整站大规模应用。

> 纯流体布局需要大小不确定的 margin 或 padding 等值撑开合适间距，无法 CSS 组件 化。例如，前面出现的 70px，其他类似布局可能就是 90px，无法大规模复用
>
> ```
>  .animal { margin-left: 70px; }
> ```

理论上，任何 BFC 元素和 float 元素相遇的时候，都可以实现自动填充的自适应布局。 但是，由于绝大多数的触发 BFC 的属性自身有一些古怪的特性，所以，实际操作的时候，能兼 顾流体特性和 BFC 特性来实现无敌自适应布局的属性并不多。

**两套 IE7 及以上版本浏览器适配的自适应解决方案**

(1)借助 overflow 属性，如下:

```css
.lbf-content { overflow: hidden; }
```

(2)融合 display:table-cell 和 display:inline-block，如下:

```css
.lbf-content {
	display: table-cell; width: 9999px;
  /* 如果不需要兼容 IE7，下面样式可以省略 */
  *display: inline-block; *width: auto;
}
```

这两种基于 BFC 的自适应方案均**支持无限嵌套**，因此，多栏自适应可以通过嵌套方式实现。这两种方案均有一点不足，前**者如果子元素要定位到父元素的外面可能会被隐藏**， **后者无法直接让连续英文字符换行**。所以，大家可以根据实际的项目场景选择合适的技术方案。

**解决display:table-cell 元素内连续英文字符无法换行的问题**

```css
 .word-break {
      display: table;
      width: 100%;
      table-layout: fixed;
      word-break: break-all;
}
```

### 6.4 最佳结界 overflow

要想**彻底清除浮动**的影响，最适合的属性不是 clear 而是 overflow。**一般使用 overflow:hidden**，利用 BFC 的“结界”特性彻底解决浮动对外部或兄弟元素的影响。

overflow 属性原本的作用指定了块容器元素的内容溢出时是否需要裁剪，也就是“结界”只是其衍生出来的特性，“剪裁”才是其本职工作。

#### 6.4.1 overflow 剪裁界线 border box

一个设置了 overflow:hidden 声明的元素，假设同时存在 border 属性和 padding 属性。则当**子元素内容超出容器宽度高度限制的时候，剪裁的边界是 border box 的内边缘**，而非 padding box 的内边缘。

```css
.box {
      width: 200px; height: 80px;
      padding: 10px;
      border: 10px solid;
      overflow: hidden;
}
```

<img src="http://cdn.wangtongmeng.com/20250112163019.png" style="zoom:50%;" />

如果想实现元素剪裁同时四周留有间隙的效果的话，可以试试使用透明边框，此时内间距 padding 属性是无能为力的。

 overflow 属性的一个很经典的**不兼容问题**，即 Chrome 浏览器下，如果容 器可滚动(假设是垂直滚动)，则 padding-bottom 也算在滚动尺寸之内，IE 和 Firefox 浏览器 忽略 padding-bottom。

<img src="http://cdn.wangtongmeng.com/20250112165119.png" style="zoom:50%;" />

在实际项目开发的时候，要尽量**避免滚动容器设置 padding-bottom 值**，除 了样式表现不一致外，还会导致 scrollHeight 值不一样，这往往会给开发带来难以察觉的 麻烦，需要引起注意。

#### 6.4.2 了解 overflow-x 和 overflow-y

 overflow-x 和 overflow-y，分别表示单独控制水平或垂直方向上的剪裁规则。

支持的属性值和 overflow 属性一模一样。

- visible:默认值。
- hidden:剪裁。
- scroll:滚动条区域一直在。
- auto:不足以滚动时没有滚动条，可以滚动时滚动条出现。

overflow-x 和 overflow-y 的表现规则 ：

- 如果 overflow-x 和 overflow-y 属性中的一个值设置为 visible 而另外一个设置为 scroll、auto 或 hidden，则 visible 的样式表现会如同 auto。

- 也就是说， 除非 overflow-x 和 overflow-y 的属性值都是 visible，否则 visible 会当成 auto 来 解析。
- 换句话说，永远不可能实现一个方向溢出剪裁或滚动，另一方向内容溢出显示的效果。

因此，下面 CSS 代码中的 overflow-y:auto 是多余的:

```css
html {
 overflow-x: hidden; overflow-y: auto; /* 多余 */

}
```

 但是，scroll、auto 和 hidden 这 3 个属性值是可以共存的。

#### 6.4.3 overflow 与滚动条

HTML 中有两个标签是默认可以产生滚动条的，一个是根元素`<html>`，另一个是文本域 `<textarea>`。从 IE8 浏览器开始，都使用 auto 作为默认的属性值。

浏览器的滚动条

- 在 PC 端，无论是什么浏览器，默认滚动条均来自`<html>`，而不是`<body>`标签。

  - 要去除页面默认滚动条，只需要`html { overflow: hidden; }`
  - 注意，上述规则只对 PC 端有效，对于移动端并不一定适用。例如，在 PC 端，对`<html> `标签设置 overflow:hidden 可以隐藏滚动条禁止滚动，但是在移动端基本上无效。在 PC 端， 窗体滚动高度可以使用 document.documentElement.scrollTop 获取，但是在移动端， 可能就要使用 document.body.scrollTop 获取。

- 滚动条会占用容器的可用宽度或高度。

  - 知道自己浏览器的滚动栏宽度是多少

    - ```
      .box { width: 400px; overflow: scroll; }
          <div class="box">
            <div id="in" class="in"></div>
          </div>
      console.log(400 - document.getElementById("in").clientWidth);
      ```

  - 解决方案

    - 一种是`<table>`元素使用固定的宽度值，但是距离右侧留有 17px 的间隙，这样即使滚动条出现，也不会产生任何的宽度影响;
    - 另一种就是表格的最后一列不设定宽度(文字最好左对齐)，前面每一列都定死宽度，这样最后一列就是自适应结构，就算滚动条出现，也只是自身有一些宽度变小，对整体对齐并无多大影响。

- 滚动栏占据宽度的特性最大的问题就是页面加载的时候水平居中的布局可能会产生晃动

  - 让页面滚动条不发生晃动的小技巧

  - ```css
    html {
      overflow-y: scroll; /* for IE8 */
    }
    :root {
      overflow-y: auto;
      overflow-x: hidden;
    }
    :root body {
      position: absolute;
    }
    body {
      width: 100vw;
      overflow: hidden;
    }
    
    ```

滚动条是可以自定义的

对于 Chrome 浏览器:

- 整体部分，::-webkit-scrollbar;
- 两端按钮，::-webkit-scrollbar-button;
- 外层轨道，::-webkit-scrollbar-track;

- 内层轨道，::-webkit-scrollbar-track-piece;
- 滚动滑块，::-webkit-scrollbar-thumb;
- 边角，::-webkit-scrollbar-corner。

但是我们平时开发中只用下面 3 个属性:

```css
::-webkit-scrollbar { /* 血槽宽度 */ width: 8px; height: 8px;
}
::-webkit-scrollbar-thumb { /* 拖动条 */
  background-color: rgba(0,0,0,.3);
  border-radius: 6px;
}
::-webkit-scrollbar-track {
  background-color: #ddd;
  border-radius: 6px;
}
```

<img src="http://cdn.wangtongmeng.com/20250112170954.png" style="zoom:50%;" />

#### 6.4.4 依赖 overflow 的样式表现

单行文字溢出点点点效果。虽然效果的核心是 text- overflow:ellipsis，效果实现必需的 3 个声明如下:

```css
.ell {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
}
```

对-webkit-私有前缀支持良好的浏览器还可以实现多行文字打点效果，但是却无 须依赖 overflow:hidden。

```css
.ell-rows-2 {
       display: -webkit-box;
       -webkit-box-orient: vertical;
       -webkit-line-clamp: 2;
}
```

#### 6.4.5 overflow 与锚点定位

基于 URL 地址的锚链(如上面的#1，可以使用 location.hash 获取)实现 锚点跳转的方法有两种

- 一种是`<a>`标签以及 name 属性。百度百科就是使用`<a>`标签的 name 属性实现锚点跳转的
- 还有一种就是使用标签的 id 属性。

```html
<a href="#1">发展历程></a>
<a name="1"></a>

利用标签的 id 属性，HTML 会显得更干净一些，也不存在任何兼容性问题
<a href="#1">发展历程></a>
<h2 id="1">发展历程</h2>
```

**锚点定位行为的触发条件**

- (1)URL 地址中的锚链与锚点元素对应并有交互行为;

  - 改变地址栏的锚链值，页面中有对应的元素（非隐藏状态）

  - 锚链就是一个很简单的#时，则定位行为发生的时候，页面是定位 到顶部的。

    - ```html
      <a href="#">返回顶部></a>
      
      配合 JavaScript 实现一些动效或者避免点击时候 URL 地址出现#
      <a href="javascript:">返回顶部></a>
      ```

- (2)可 focus 的锚点元素处于 focus 状态。
  - focus 锚点定位”指的是类似链接或者按钮、输入框等可以被 focus 的元素在被 focus 时发生的页面重定位现象。
  -  例子：PC 端，我们使用 Tab 快速定位可 focus 的元素的时候，如果我们 的元素正好在屏幕之外，浏览器就会自动重定位，将这个屏幕之外的元素定位到屏幕之中。
  - 例子：一个可读写的`<input>`输入框在屏幕之外，则执行类似下面的 JavaScript 代码` document.querySelector('input').focus();`这个输入框会自动定位在屏幕之中
  - “focus 锚点定位”也不依赖于 JavaScript，是浏览器内置的无障碍访问行为，并且所有浏览器都是如此。
- 差异：“URL 地址锚链定位”是让元素定位在浏览器窗体的上边缘，而“focus 锚点定位”是让元素在浏览器窗体范围内显 示即可，不一定是在上边缘。

**锚点定位作用的本质**

- 锚点定位行为的发生，本质上是通过改变容器滚动高度或者宽度来实现的。
- 注意，这里说的是容器的滚动高度，而不是浏览器的滚动高度，这一点小小区分**非常重要**。

锚点定位也可以发生在普通的容器元素上，而且定位行为的发生是**由内而外**的。

```html
.box {
	height: 120px;
	border: 1px solid #bbb;
	overflow: auto;
}
.content {
  height: 200px;
  background-color: #eee;
}
<div class="box">
<div class="content"></div> <h4 id="title">底部标题</h4>
</div>
<p><a href="#title">点击测试</a></p>
```

<img src="http://cdn.wangtongmeng.com/20250119195817.png" style="zoom:50%;" />

点击下面的“点击测试”链接，则滚动条位置变化(实际上改变了 scrollTop 值)，“底部标题”自动出现了。

“由内而外”指的是，普通元素和窗体同时可滚动的时候，会由内而外触发所有可滚 动窗体的锚点定位行为。

假设我们的浏览 器窗体也是可滚动的，则点击“点击测试”链接后，“底部 标题”先触发.box 容器的锚点定位，也就是滚动到底部， 然后再触发窗体的锚点定位，“底部标题”和浏览器窗口的上边缘对齐。

<img src="http://cdn.wangtongmeng.com/20250119195931.png" style="zoom:50%;" />

**设置了 overflow:hidden 的元素也是可滚动的**

overflow:hidden 跟 overflow:auto 和 overflow:scroll 的差别就在于有没有那个滚动条。

案例

- 基于 URL 地址的锚链触发锚 点定位实现的选项卡切换效果。

- 访问基于“focus 锚点定位”实现的无 JavaScript 选项卡切换效果实例页面。
- 自定义的滚动条效果（类似移动端的悬浮式滚动条）

### 6.5-6.5.1

### 6.5 float 的兄弟 position:absolute

absolute是float的兄弟，都兼具“块状化”“包裹性”“破坏性”等特性，不少布局场合甚至可以相互替代。同时存在时float无效。

- 块状化：元素一旦 position 属性值为 absolute 或 fixed，其 display 计算值就是 block 或者 table。
- 破坏性：破坏正常的流特性，但本身还是受普 通的流体元素布局、位置甚至一些内联相关的 CSS 属性影响。
- 两者都能“块状格式化上下文”， 也就是 BFC。
- 包裹性：尺寸收缩包裹，同时具有自适应性。

**absolute 的自适应性最大宽度**往往不是由父元素决定的，本质上说，这个差异是**由“包 含块”的差异决定**的。换句话说，absolute 元素具有与众不同的“包含块”。

#### 6.5.1 absolute 的包含块

包含块是元素用来计算和定位 的一个框。

绝对定位元素的宽度是相对于第一个 position 不为 static 的祖先元素计算的。

计算规则

- (1)根元素(很多场景下可以看成是`<html>`被称为“初始包含块”，其尺寸等同于浏览器可视窗口的大小。

- (2)对于其他元素，如果该元素的 position 是 relative 或者 static，则“包含块” 由其最近的块容器祖先盒的 content box 边界形成。

- (3)如果元素 position:fixed，则“包含块”是“初始包含块”。

- (4)如果元素 position:absolute，则“包含块”由最近的 position 不为 static 的祖先元素建立，具体方式如下。

> 如果该祖先元素是纯 inline 元素，则规则略复杂:
>
> - 假设给内联元素的前后各生成一个宽度为 0 的内联盒子(inline box)，则这两个内联盒子的 padding box 外面的包围盒就是内联元素的“包含块”;
> - 如果该内联元素被跨行分割了，那么“包含块”是未定义的，也就是 CSS2.1规范并没有明确定义，浏览器自行发挥。 否则，“包含块”由该祖先的 padding box 边界形成。

**和常规元素相比，absolute 绝对定位元素的“包含块”有以下 3 个明显差异:**

- **(1)内联元素也可以作为“包含块”所在的元素;**

- **(2)“包含块”所在的元素不是父块级元素，而是最近的 position 不为 static 的祖先 元素或根元素;**

- **(3)边界是 padding box 而不是 content box。**

  

**差异1**：内联元素也可以作为“包含块”所在的元素;

**内联元素可以作为“包含块”。**使用较少，原因：1.absolute一般用于布局，不会考虑内联元素2.理解和学习成本较高3.兼容性问题

内联元素的“包含块” 是由“生成的”前后内联盒子决定的，与里面的内联盒子细节没有任何关系。

<img src="http://cdn.wangtongmeng.com/20250211074158.png" style="zoom:50%;" />

**差异2：**“包含块”所在的元素不是父块级元素，而是最近的 position 不为 static 的祖先 元素或根元素;

对于绝对定位元素。height:100%是第一个具有定位属性值的祖先元素的高度，而 height:inherit 则是单纯的父元素的高度继承，在某些场景下非常好用。

**绝对定位元素的“包裹性” 中的“宽度自适应性”其实也是相对于“包含块”来表现的**。

```css
.container {
  width: 200px;
  border: 1px solid;
  position: relative;
}
.box { position: absolute; }
```

box 元素的“包含块”就是.container 元素， 因此，.box 元素最终的宽度就是 200px，也就是说，绝对定位元素默认的最大宽度就是“包含块”的宽度。

<img src="http://cdn.wangtongmeng.com/20250211075141.png" style="zoom:50%;" />

黑色的提示元素的“包含块”宽度是整个浏览器窗体宽度，放几个 文字绰绰有余，但是，由于我们的图标位于浏览器的右边缘，JavaScript 定位的时候，就会设置 一个**很大的 left 属性值**，导致“包含块”剩余的空间不足，也就是提示元素的“自适应宽度” 不足，导致文字只能竖着显示，从而出现“一柱擎天”。

要修复此问题其实很简单，只要**改变默认的宽度显示类型就可以，添加 white-space: nowrap，让宽度表现从“包裹性”变成“最大可用宽度”**。实际开发的时候，最好改变提示的方向，例如右边缘的 时候，左侧提示。

**差异3**：边界是 padding box 而不是 content box。

和 overflow 隐藏也是 padding box 边界类似，都是 由使用场景决定的。

在列表的右上角显示一个明显的标签，padding变化不会影响

```css
.list {
  padding: 1rem;
}
.tag {
  position: absolute;
  top: 0; right: 0;
}
```

<img src="http://cdn.wangtongmeng.com/20250211080243.png" style="zoom:50%;" />

定位在内容的边缘，**使用透明的 border 撑开**，当间距发生变化的时候，只需要改变 border 宽度就可以，注意的就是尽量不要设置 overflow:hidden。

```css
.list {
  border: 1rem solid transparent;
}
.tag {
  position: absolute;
  top: 0; right: 0;
}
```

### **6.5.2-6.6**

#### 6.5.2 具有相对特性的无依赖 absolute 绝对定位

一个**绝对定位元素**，没有任何 left/top/right/bottom 属性设置，并且**其祖先元素全部都是非定位元素**，其**位置还是当前位置，不是在浏览器左上方。**

absolute 是非常独立的 CSS 属性值，其样式和行为表现不依赖其他任何 CSS 属性就可以完成。

左上角有一个“TOP1”的图形标志

<img src="http://cdn.wangtongmeng.com/20250218071848.png" style="zoom: 50%;" />

absolute 定位效果实现完全不需要父元素设置 position 为 relative 或其他什么属性就可以实现，这种没有设置 left/top/ right/bottom 属性值的绝对定位称为“**无依赖绝对定位**”。

很多场景下，“无依赖绝对定位”要比使用 left/top 之类属性定位实用和强大很多，因 为其除了代码更简洁外，还有一个很棒的特性，就是“**相对定位特性**”。**无依赖绝对定位”本质上就是“相对定位”，仅仅是不占据 CSS 流的尺寸空间而已。**

**1.各类图标定位**

<img src="http://cdn.wangtongmeng.com/20250218072320.png" style="zoom:50%;" />

-  IE6 在内的浏览器都是兼容良好
- 后这个图标下架了，我们只需要把图标对应的 HTML 代码和 CSS 删掉就可以，原来的代码完全不需要改动。
- **无依赖绝对定位”的图标是自动跟在文字后面显示的**。

```css
 .icon-hot {
      position: absolute;
      margin: -6px 0 0 2px;
      width: 28px; height: 11px;
      background: url(hot.gif);
}
```

**普通的水平对齐的图标**也可以使用“无依赖绝对定位”实现

<img src="http://cdn.wangtongmeng.com/20250218073019.png" style="zoom:50%;" />

```css
<span class="icon-x">
	<i class="icon-warn"></i>邮箱格式不准确
</span>
.icon-x {
  line-height: 20px;
  padding-left: 20px;
}
.icon-warn {
  position: absolute; // 同样是 position:absolute，然后简单的 margin 偏移实现
  margin-left: -20px;
  width: 20px; height: 20px;
  background: url(warn.png) no-repeat center; // 利用背景居中
}
```

> 如果使用“无依赖绝对定位”实现，则不会因为icon高度影响行框高度，因为绝对定位元素不会改变正常流的尺寸空间，就算我们的图标有 30px 大小，行框高度依然是纯文本所在 的 20px 高度。

**2.超越常规布局的排版**

输入框后面的提示语

- ```css
  remark {
        position: absolute;
        margin-left: 10px;
  }
  ```

- 既在输入框的后面显示，又跳出了容器宽度的限制， 同时显隐不会影响原先的布局。

- 提示信息的位置智能跟随输入框，与容器设置 position:relative 再通 过 left 属性实现的定位相比，其代码更简洁，容错性更强，维护成本更低。

星号

- 星号也是典型的“无依赖绝对定位”，自身绝对定位，然后通过 margin-left 负值偏移实现

<img src="http://cdn.wangtongmeng.com/20250218073757.png" style="zoom: 67%;" />

**3.下拉列表的定位**

<img src="http://cdn.wangtongmeng.com/20250218074253.png" style="zoom:50%;" />

- 兼容性好到 IE6 都完美定位
- 维护成本低，输入框的高度发生了 变化，我们不需要修改任何 CSS 代码
- z-index 层级管理规则更简单，并且也无 须担心父元素设置 oveflow:hidden 会裁剪下拉列表

```css
<input>
<div class="result">
	<div class="datalist">
	<a href>搜索结果1</a>
	...
	</div>
</div>
/* 下拉列表的无依赖绝对定位 */
.datalist {
  position: absolute;
}
/* 列表的显隐控制 */ 
.search-result {
  display: none;
}
input:focus ~ .search-result {
  display: block;
}
```

**虽然“无依赖绝对定位”好处多多，但建议只用在静态交互 效果上，比方说，导航二级菜单的显示与定位。如果是动态呈现的列表，建议还是使用 JavaScript 来计算和定位。**

**4.占位符效果模拟**

IE9 及其以下浏览器不支持 placeholder 占位符效果，实际开发的时候，针对这些浏览器，需要进行模拟。

比较好的做法是使用`<label>`标签和输入框关联并覆盖在输入框上面，好 处是点击占位文字输入框天然 focus，并且不会污染输入框的 value。

```css
<label class="placeholder" for="text">占位符</label> <input id="test">
/* 和输入框一样的样式 */
.placeholder, input {
... 
}
/* 占位符元素特有样式 */ 
.placeholder {
    position: absolute;
}
```

**5.进一步深入“无依赖绝对定位”**

元素 position:absolute 后的 display 计算值都是块状的，但是其**定位的位置和没有设置 position:absolute 时候的位置相关**。

```html
<h3>标题<span class="follow">span</span></h3>
<h3>标题<div class="follow">div</div></h3>
.follow {
	position: absolute;
}
```

<img src="http://cdn.wangtongmeng.com/20250218075130.png" style="zoom:50%;" />

一些问题

- ie 7兼容性问题
- 浮动”和“无依赖绝对定位”一起使用时会有问题（解决方案：加一层标签，分开使用）

#### 6.5.3 absolute 与 text-align

absolute 和 float 一样，都可以让元素块状化，但 **text-align 居然可以改变 absolute 元素的位置**。

```css
<p><img src="1.jpg"></p> 
p{
  text-align: center;
}
img {
  position: absolute;
}
// 兼容ie edge
p:before {
  content: '';
}
```

<img src="http://cdn.wangtongmeng.com/20250218075651.png" style="zoom:50%;" />

本质上是“幽灵空白节点”和“无依赖绝对定 位”共同作用的结果。

具体的渲染原理如下。

- (1)由于`<img>`是内联水平，`<p >`标签中存在一个宽度为 0、看不见摸不着的“幽灵空白

节点”，也是内联水平，于是受 text-align:center 影响而水平居中显示。 

- (2)`<img>`设置了 position:absolute，表现为“无依赖绝对定位”，因此在“幽灵空 白节点”后面定位显示;同时由于图片不占据空间，这里的“幽灵空白节点”当仁不让，正好在`<p>`元素水平中心位置显示，于是我们就看到了图片从<p>元素水平中间位置显示的效果。

解决方案：margin-left 一半图片宽度负值大小

利用 text-align 控制 absolute 元素的定位最适合的使用场景就是**主窗体右侧的“返回顶部”以及“反馈”等小布局的实现**。

<img src="http://cdn.wangtongmeng.com/20250218080143.png" style="zoom:50%;" />

```css
 <div class="alignright">
   <span class="follow"></span>
</div>
.alignright {
  height: 0; // 插入了一个空格，会占据一定的高度，把占据的高度抹掉，设置 height:0 同时 overflow:hidden 即可
  text-align: right;
  overflow: hidden;
}
.alignright:before {
  content: "\2002"; // 在前面插入一个空格
}
.follow {
  position: fixed; // 固定定位元素(同绝对定位元素)由于“无依赖定 位”特性，左边缘正好就是主结构的右边缘
  bottom: 100px;
  z-index: 1;
}
```

### 6.6 absolute 与 overflow

**如果 overflow 不是定位元素，同时绝对定位元素和 overflow 容器之间也没有定位元素，则 overflow 无法对 absolute 元素进行剪裁。**

- 作用一是解决实际问题。例如上一节最后“返回顶部”的案例，保证高度为 0，同时里面的定位内容不会被剪裁，或者在局部滚动的容器中模拟近似 position:fixed 的效果。

- 作用二是在遇到类似现象的时候知道问题所在，可以“对症下药”，快速解决问题。

对于局部滚动，我们经常会有元素不跟随滚动的需求，建议还是将这个表头元素移动到滚动容器外进行模拟，如 果 HTML 结构被限制无法修改，则利用 overflow 滚动 absolute 元素不滚动的特性来实现。

transform 除了改变 overflow 属性原有规则，对层叠上下文以及 position:fixed 的 渲染都有影响。因此，当大家遇到 absolute 元素被剪裁或者 fixed 固定定位失效时，可以 看看是不是 transform 属性在作祟。

### 6.7-6.8

### 6.7 absolute 与 clip

使用剪裁属性 clip  position， 属性值必须是 absolute 或者 fixed。语法，`clip: rect(top right bottom left)`或 `clip: rect(top, right, bottom, left)`(标准语法)

> 4个值不能缩写，不支持百分比 值

#### 6.7.1 重新认识的 clip 属性

clip在以下两个场景非常有用

**1.fixed 固定定位的剪裁**

对于 position:fixed 元素，因为 fixed 固定定位元素的包含块是根元素，除非是根元素滚动条，普通元素的 overflow 是 根本无法对其进行剪裁的。可以利用clip属性进行裁剪。

```css
 .fixed-clip {
      position: fixed;
      clip: rect(30px 200px 200px 20px);
}
```

**2.最佳可访问性隐藏**

所谓“可访问性隐藏”，指的是虽然内容肉眼看不见，但是其他辅助设备却能够进行识别和访问的隐藏。

网站logo，为了更好地 SEO 以及无障碍识别，一般会这么写：

```html
<a href="/" class="logo">
  <h1>CSS 世界</h1>
</a>
```

隐藏`<h1>`标签中的“CSS 世界”这几个文字

- 下策是 display:none 或者 visibility:hidden 隐藏，因为屏幕阅读设备会忽略这里的文字。

- text-indent 缩进是中策，但文字如果缩进过大，大到屏幕之外，屏幕阅读设备也是不会读取的。

- color:transparent 是移动端上策，但却是桌面端中策，因为原生 IE8 浏览器并不支持它。color:transparent 声明，很难用简单的方式阻止文本被框选。

- clip 剪裁隐藏是上策，既满足视觉上的隐藏，屏幕阅读设备等辅助设备也支持得很好。

  - ```css
    .logo h1 {
      position: absolute;
      clip: rect(0 0 0 0);
    }
    ```

使用label代替button作为提交按钮

```html
<form>
	<input type="submit" id="someID" class="clip">
  <label for="someID">提交</label>
</form>

.clip {
  position: absolute;
  clip: rect(0 0 0 0);
}
```

使用 clip 剪裁隐藏的好处

- display:none 或者 visibility:hidden 隐藏有两个问题，一个是按钮无法被 focus 了，另外一个是 IE8 浏览器下提交行为丢失，原因应该与按钮 focus 特性丢 失有关。

- 透明度 0 覆盖也是一个不错的实践。如果是移动端项目，建议这么做;但如果是桌面 端项目，则完全没有必要。使用透明度 0 覆盖的问题是每一个场景都需要根据环境的 不同重新定位，以保证点击区域的准确性，成本较高，但 clip 隐藏直接用一个类名 加一下就好。

- 还有一种比较具有适用性的“可访问隐藏”是下面这种屏幕外隐藏:

  - ```css
    .abs-out {
      position: absolute;
      left: -999px; top: -999px;
    }
    ```

### 6.7.2 深入了解 clip 的渲染

```diff
.box {
  width: 300px; height: 100px;
  background-color: #f0f3f9;
  position: relative;
  overflow: auto;
}
.box > img {
  width: 256px; height: 192px;
  position: absolute;
+  clip: rect(0 0 0 0);
}
```

![](http://cdn.wangtongmeng.com/20250302084245.png)

图片显然看不见了，但是注意，在 Chrome 浏览器下，.box 元素的滚动条依旧存在

clip 隐藏仅仅是决定了哪部分是可见的，非可见部分无法响应点击事件等;然后，虽然视觉上隐藏，但是元素的尺寸依然是原本的尺寸，在 IE 浏览器和 Firefox 浏览 器下抹掉了不可见区域尺寸对布局的影响，Chrome 浏览器却保留了。

### 6.8 absolute 的流体特性

#### 6.8.1 当 absolute 遇到 left/top/right/bottom 属性

设置两个方向的属性，则原本的相对特性丢失。

```css
.box {
      position: absolute;
      left: 0; top: 0;
}
```

仅设置了一个方向的绝对定位，另一个方向仍保持相对特性。

#### 6.8.2 absolute 的流体特性

定位元素，对立方向同时发生定位的时候，会具有类似的流体特性。

如果只有 left 属性或者只有 right 属性，则由于包裹性，此时.box 宽度是 0。

因为 left 和 right 同时存在，所以宽度就不是 0，而是表现为“格式化宽度”，宽 度大小自适应于.box 包含块的 padding box，即如果包含块 padding box 宽度发生变 化，.box 的宽度也会跟着一起变。

```html
<div class="box"></div>
.box {
  position: absolute;
  left: 0; right: 0;
}
```

假设.box 元素的包含块是根元素，则下面的代码可以让.box 元素正好完全覆盖浏 览器的可视窗口，并且如果改变浏览器窗口大小，.box 会自动跟着一起变化:

```css
.box {
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
}
```

添加padding、margin也不会影响流动性，比`width: 100%; height: 100%;`更好

```css
.box {
      position: absolute;
      left: 0; right: 0; top: 0; bottom: 0;
      padding: 30px;
  		margin: 30px; // 自动上下左右留白 30px
}
    .box {
      position: absolute;
      left: 0; top: 0;
      width: 100%; height: 100%;
      padding: 30px;
      margin: 30px;
}
```

#### 6.8.3 absolute 的 margin:auto 居中

当绝对定位元素处于流体状态时，各个盒模型相关属性的解析和普通流体元素一致，margin 负值可以让元素的尺寸更大，并且可以使用 margin:auto 让绝对定位元 素保持居中。

- 如果一侧定值，一侧 auto，auto 为剩余空间大小;
- 如果两侧均是 auto，则平分剩余空间。
- 唯一的区别在于，绝对定位元素 margin:auto 居中从 IE8 浏览器开始支持，而普通元素的 margin:auto 居中很早就支持了。

利用绝对定位元素的流体特性和 margin:auto 的自动分配特性实现居中

```css
.element {
      width: 300px; height: 200px;
      position: absolute;
      left: 0; right: 0; top: 0; bottom: 0;
      margin: auto;
}
```

### 6.9-7.1

### 6.9 position:relative 才是大哥

#### 6.9.1 relative 对 absolute 的限制

relative/absolute/fixed 都能对 absolute 的“包裹性”以及“定位”产生限制，但只有 relative 可以让元素依然保持在正常的文档流中。

```html
<div class="icon">
      <div class="box"></div>
</div>

.icon {
  width: 20px; height: 20px;
  position: relative;
}
.box {
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
}
```

此时.box 元素的包含块变成了.icon，尺寸是 20px×20px。

#### 6.9.2 relative 与定位

relative 的定位有两大特性:

- 一是**相对自身**。相对于自身进行偏移定位。
- 二是**无侵入**。当 relative 进行定位偏移的时候，一般情况下不会影响周围元素的布局。

margin定位和relative定位的区别

```css
.pk-1 { margin-top: -50px; }
.pk-2 { position: relative; top: -50px;}
```

<img src="http://cdn.wangtongmeng.com/20250302091801.png" style="zoom:50%;" />

margin 定位的图片后面的文字跟着上来了，而使用 relative 定 位的图片后面的文字依然在原地纹丝不动，中间区域留出了一大块空白

相对定位元素的 left/top/right/bottom 的**百分比值是相对于包含块计算**的，而不是自身。注意，虽然**定位位移是相对自身，但是百分比值的计算值不是**。

top 和 bottom 这两个垂直方向的百分比值计算，都是相对高度计算的。如果父元素没有设定高度或者不是“格式化高度”，那么 relative 类似 top:20% 的代码等同于 top:0。

当相对定位元素top/bottom 和 left/right 同时使用时，有优先级，top>bottom，left>right

#### 6.9.3 relative 的最小化影响原则

- (1)尽量不使用 relative，如果想定位某些元素，看看能否使用“无依赖的绝对定位”;

-  (2)如果场景受限，一定要使用 relative，则该 relative 务必最小化。

relative定位会使普通元素层叠顺序提高，可能会导致一些绝对 定位浮层无论怎么设置 z-index 都会被其他元素覆盖的情况。

```html
<div style="position:relative;">
      <img src="icon.png" style="position:absolute;top:0;right:0;">
  		<p>内容 1</p><p>内容 2</p> <p>内容 3</p> <p>内容 4</p> ...
</div>
```

采用“relative 的最小化影响原则”

```html
<div>
      <div style="position:relative;">
				<img src="icon.png" style="position:absolute;top:0;right:0;">
  		</div>
			<p>内容 1</p> <p>内容 2</p> <p>内容 3</p> <p>内容 4</p> ...
</div>
```

### 6.10 强悍的 position:fixed 固定定位

祖先元素relative和overflow:hidden对 **position为fixed的元素**都无效。因为其**“包含块”和其他元素不一样**。

#### 6.10.1 position:fixed 不一样的“包含块”

position:fixed 固定定位元素的“包含块”（限制元素）是根元素，我们可以将其近似看成`<html>` 元素。

**无依赖的固定定位**

- 利用 absolute/fixed 元素 没有设置 left/top/right/bottom 的相对定位特性，可以将目标元素定位到我们想要的位置

- ```html
  <div class="father">
    <div class="right">
      &nbsp;<div class="son"></div>
    </div>
  </div>
  .father {
    width: 300px; height: 200px;
    position: relative;
  }
  .right {
    height: 0;
    text-align: right;
    overflow: hidden;
  }
  .son {
    display: inline;
    width: 40px; height: 40px;
    position: fixed;
    margin-left: -40px;
  }
  ```

#### 6.10.2 position:fixed 的 absolute 模拟

希望元素既有不跟随滚动的固定定位效果，又能被定位元素限制和精准定位

```html
 <html>
   <body>
     <div class="fixed"><div>
   </body>
  </html>
  .fixed {
     position: fixed;
  }
```

页面的滚动使用普通元素替代，此时滚动元素之外的其他元素自然就有了“固定定位”的效果了。

```html
<html>
	<body>
		<div class="page">固定定位元素<div>
      <div class="fixed"><div>
  </body>
</html>
html, body {
	height: 100%;
	overflow: hidden;
}
.page {
	height: 100%;
	overflow: auto;
}
.fixed {
	position: absolute; // 不随页面滚动，可以使用 relative 进行限制或者 overflow 进行裁剪
}
```

#### 6.10.3 position:fixed 与背景锁定

弹窗蒙层使用 position: fixed 定位实现时，蒙层无法覆盖浏览器右侧的滚动栏，并且鼠标滚动的时候后面的背景内容依然可以被滚动，并没有被锁定。

滚动原因：滚动元素是根元素，正好是 position:fixed 的“包含块”。

解决滚动

- 1.让页面滚动条由内部的普通元素产生即可。
- 2.如果网站的滚动结构不方便调整，则需要借助 JavaScript 来实现锁定。
  - 如果是移动端项目，阻止 touchmove 事件的默认行为可以防止滚动;
  - 如果是桌面端项目， 可以让根元素直接 overflow:hidden。

## 第7章 CSS 世界的层叠规则

### 7.1 z-index 只是 CSS 层叠规则中的一叶小舟

在 CSS 世界中，z-index 属性只有和定位元素(position 不为 static 的元素)在一 起的时候才有作用，可以是正数也可以是负数。

网页中绝大部分元素是非定位元素，并且影响层叠顺序的属性远不止 z-index 一个。

### 7.2-7.6

#### 7.2 理解 CSS 世界的层叠上下文和层叠水平

**层叠上下文**跟“块状格式化上下文” (BFC)类似，自成一界。其中可能有其他的“层叠结界”，而自身也可能处于其他“层叠结界”中。

**层叠水平**，决定了**同一个层叠上下文中**元素在 z 轴上的显示顺序。所有的元素都有层叠水平，包括层叠上下文元素，也包括普通元素。对普通元素的层叠水平探讨只局限在当前层叠上下文元素中。

#### 7.3 元素的层叠顺序

- (1)位于最下面的 background/border **特指层叠上下文元素**的边框和背景色。每一个层叠顺序规则仅适用于当前层叠上下文元素的小世界。

- (2)inline 水平盒子指的是包括 inline/inline-block/inline-table 元素的“层叠顺序”，它们都是同等级别的。

- (3)单纯从层叠水平上看，实际上 z-index:0 和 z-index:auto 是可以看成是一样的。注意这里的措辞— “单纯从层叠水平上看”，实际上，两者在层叠上下文领域有着根本性的差异。

<img src="http://cdn.wangtongmeng.com/20250310211840.png"  />

#### **7.4 层叠准则**

当元素发生层叠的时候，其覆盖关系遵循下面两条准则: 

- (1)**谁大谁上**:当具有明显的层叠水平标识的时候，如生效的 z-index 属性值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个。

- (2)**后来居上**:当元素的层叠水平一致、层叠顺序相同的时候，在 DOM 流中处于后面的元素会覆盖前面的元素。

#### 7.5 深入了解层叠上下文

**层叠上下文的特性**：

- 层叠上下文的层叠水平要**比普通元素高**。
- 层叠上下文可以阻断元素的混合模式。
- 层叠上下文可以**嵌套**，内部层叠上下文及其所有子元素均受制于外部的“层叠上下文”。
- 每个层叠上下文和兄弟元素**独立**，也就是说，当进行层叠变化或渲染的时候，只需要考虑后代元素。
- 每个层叠上下文是**自成体系**的，当元素发生层叠的时候，整个元素被认为是在父层叠上下文的层叠顺序中。

**层叠上下文的创建**：

和块状格式化上下文一样，层叠上下文也基本上是**由一些特定的 CSS 属性创建**的

- 1.**根层叠上下文**：可以看成是`<html>`元素。
- 2.**定位元素与传统层叠上下文**：对于 position 值为 relative/absolute 以及 Firefox/IE 浏览器(不包括 Chrome 浏览 器)下含有 position:fixed 声明的定位元素，当其 z-index 值不是 auto 的时候，会创建层叠上下文。
- **3.CSS3 与新时代的层叠上下文**
  - (1)元素为 flex 布局元素(父元素 display:flex|inline-flex)，同时 z-index 值不是 auto。
  - (2)元素的 opacity 值不是 1。
  - (3)元素的 transform 值不是 none。
  - (4)元素 mix-blend-mode 值不是 normal。
  - (5)元素的 filter 值不是 none。
  - (6)元素的 isolation 值是 isolate。
  - (7)元素的 will-change 属性值为上面 2~6 的任意一个(如 will-change:opacity、will-change:transform 等)。 (8)元素的-webkit-overflow-scrolling 设为 touch。

**层叠上下文与层叠顺序**

**一旦普通元素具有了层叠上下文，其层叠顺序就会变高**。

- (1)如果层叠上下文元素不依赖 z-index 数值，则其层叠顺序是 z-index:auto，可看成 z:index:0 级别;
- (2)如果层叠上下文元素依赖 z-index 数值，则其层叠顺序由 z-index 值决定。

**定位元素会层叠在普通元素的上面**，其根本原因就是:元素 一旦成为定位元素，其 z-index 就会自动生效，此时其 z-index 就是默认的 auto，也就是 0 级别，根据上面的层叠顺序表，就会覆盖 inline 或 block 或 float 元素。

<img src="http://cdn.wangtongmeng.com/20250310213840.png" style="zoom:50%;" />

淡出的 CSS3 动画，文字就跑到图片后面去

<img src="http://cdn.wangtongmeng.com/20250310213558.png" style="zoom:50%;" />

> opacity 的值不是 1 的时候，是具有层叠上下文的，层叠顺序是 z-index:auto 级别，跟没有 z-index 值的 absolute 绝对定位元素是平起平坐的
>
> 解决方案：(1)调整 DOM 流的先后顺序; (2)提高文字的层叠顺序，例如，设置 z-index:1。

#### 7.6 z-index 负值深入理解

因为 z-index 负值的最终表现并不是单一的，而是与“层叠上下文”和“层叠顺序”密切相关。

z-index 负值元素的层级是在层叠上下文元素上面、block 元素的下面，也就是 z-index 虽然名为负数层级，但依然无法突破当前层叠上下 文所包裹的小世界。

<img src="http://cdn.wangtongmeng.com/20250310214349.png" style="zoom:50%;" />

```html
<div class="box">
  <img src="1.jpg">
</div>
.box {
	background-color: blue;
}
.box > img {
position: relative;
  z-index: -1;
  right: -50px;
}
```

给.box增加样式，使其具有层叠上下文

```diff
.box {
      background-color: blue;
+      transform: scale(1);
}
.box > img {
      position: relative;
      z-index: -1;
      right: -50px;
}
```

z-index实际项目作用

- (1)可访问性隐藏。z-index 负值可以隐藏元素，只需要层叠上下文内的某一个父元素加个背景色就可以。
- (2)IE8 下的多背景模拟。
- (3)定位在元素的后面。例如，模拟纸张效果。



### 7.7-8.1

### 7.7 z-index“不犯二”准则

对于非浮层元素，避免设置 z-index 值，z-index 值没有任何道理需 要超过 2。

这里的“不犯二”准则，并不包括那些在页面上飘来飘去的元素定位，弹框、出错提示、一些下拉效果等都不受这一准则限制。

对于这类 JavaScript 驱动的浮层组件，我会借助“层级计数器”来管理，原因如下: 

- (1)总会遇到意想不到的高层级元素;
- (2)组件的覆盖规则具有动态性。 

## 第8章 强大的文本处理能力

CSS 文本处理能力之所以强大，一方面是其基础概念，例如块级盒模型和内联盒模型，就 是为了让文本可以如文档般自然呈现;另一方面是有非常非常多与文本处理相关 CSS 属性的支持。

### 8.1 line-height 的另外一个朋友 font-size

#### 8.1.1 font-size 和 vertical-align 的隐秘故事

line-height 的部分类别属性值是相对于 font-size 计算的，vertical-align 百分比值属性值又是相对于 line-height 计算的

#### 8.1.2 理解 font-size 与 ex、em 和 rem 的关系

在 CSS 中，1em 的计算值等同于当前元素所在的 font-size 计算值，可以将 其想象成当前元素中(如果有)汉字的高度。

要想实现带有缩放性质的弹性布局，使用 rem 是最佳策略，但 rem 是 CSS3 单位， IE9 以上浏览器才支持，需要注意兼容性。

场景

- 用于图文内容展示的场景，对此进行弹性布局

-  SVG 矢量图标

- ```css
  svg {
        width: 1em; height: 1em;
  }
  ```

#### 8.1.3 理解 font-size 的关键字属性值

font-size 支持长度值，如 1em，也支持百分比值，如 100%。 还支持关键字属性值

- (1)相对尺寸关键字 larger、smaller
- (2)绝对尺寸关键字 xx-large、x-large、larger、medium、small、x-small、xx-small

#### 8.1.4 font-size:0 与文本的隐藏

font-size:0，哪怕设置成 font-size:0.0000001px， 都还是会被当作 12px 处理的，所以要使用0px

### 8.2-8.3

### 8.2 字体属性家族的大家长 font-family

font-family 字体家族，默认值由操作系统和浏览器共同决定，不从操作系统和浏览器下个不相同。

font-family 支持两类属性值

- 字体名（字体名称）

  - ``` css
    body { font-family: simsun;}
    // 如果字体名包含空格，需要使用引号包起来
    body { font-family: 'Microsoft Yahei';}
    // 可以不用区分大小写，如果有多个字体设定，从左往右依次寻找本地是否有对应的字体，找不到使用默认值
    body { font-family: 'PingFang SC', 'Microsoft Yahei';}
    ```

- 字体族

  - serif:衬线字体
  - sans-serif:无衬线字体
  - monospace:等宽字体
  - cursive:手写字体（不常用）
  - fantasy:奇幻字体（不常用）
  - system-ui:系统 UI 字体

#### 8.2.1 了解衬线字体和无衬线字体

字体分**衬线**字体和**无衬线**字体。

- 衬线字体，通俗讲就是笔画开始、结束的地方有额外装饰而且笔画的粗细会有所不同的字体。例如，宋体、Times New Roman、Georgia 。
- 无衬线字体没有这些额外的装饰，而且笔画的粗细差不多， 如中文的“雅黑”字体，英文包括 Arial、Verdana、Tahoma、Helivetica、Calibri 等。

```css
font-family: serif; /* 衬线字体 */
font-family: sans-serif; /* 无衬线字体 */

// 移动端Web开发时，虽然设备的默认中文字体不一样，但都是无衬线
body { font-family: sans-serif; }

// serif 和 sans-serif 还可以和具体的字体名称写在一起
// 注意：serif 和 sans-serif 一定要写在最后
body { font-family: "Microsoft Yahei", sans-serif; }
```

#### 8.2.2 等宽字体的实践价值

所谓等宽字体，一般是**针对英文字体**而言的，东亚字体应该都是等宽的。例如 Consolas、Monaco、monospace。

<img src="http://cdn.wangtongmeng.com/20250325073055.png" style="zoom:50%;" />

等宽字体在 Web 中的用处

- 1.等宽字体与代码呈现
  - <img src="http://cdn.wangtongmeng.com/20250325073217.png" style="zoom:50%;" />
- 2.等宽字体与图形呈现案例
  - <img src="http://cdn.wangtongmeng.com/20250325073258.png" style="zoom:50%;" />
- 3.ch 单位与等宽字体布局
  - ch 和 em、rem、ex 一样，是 CSS 中和字符相关的相对单位。
  - 1ch 表示一个 0 字符的宽度，**和等宽字体在一起使用**。
  - 应用场景：
    - 1.手机号输入框，设置该输入框宽度为 11ch，同时让字体等宽。
    - 2.代码打字效果，如果代码是等宽字体，此时使用 ch 单位来控制宽度，配合 overflow 属性和 CSS animation。

#### 8.2.3 中文字体和英文名称

一些常见中文字体 对应的 font-family 英文属性名称。

- (1)Windows 常见内置中文字体和对应英文名称见 图 8-10。

- (2)OS X 系统内置中文字体和对应英文名称见 图 8-11。

- (3)Office 软件安装新增中文字体和对应英文名称见图 8-12。

- (4)其他一些中文字体和对应英文名称见图 8-13。

![](http://cdn.wangtongmeng.com/20250325074106.png)

### 8.3 字体家族其他成员

#### 8.3.1 貌似粗犷、实则精细无比的 font-weight

font-weight 表示“字重”，就是表示文字的粗细程度。

font-weight 支持的属性值

- 属性值必须是 100~900 的整百数
- 数值关键字和字母 关键字之间是有对应关系，400=normal，700=bold

```css
/* 平常用的最多的 */ font-weight: normal; font-weight: bold;
/* 相对于父级元素 */ font-weight: lighter; font-weight: bolder;
/* 字重的精细控制 */ font-weight: 100; font-weight: 200; font-weight: 300; font-weight: 400; font-weight: 500; font-weight: 600; font-weight: 700; font-weight: 800; font-weight: 900;
```

- lighter 和 bolder 这两个具有相对特定的关键字就是基于这 4 个临界点进行解析和渲染的。
  - <img src="http://cdn.wangtongmeng.com/20250325074439.png" style="zoom:50%;" />
- 所有这些数值关键字浏览器都是支持的，之所以没有看到任何粗细的变化，是因为我们的系统里面**缺乏对应粗细的字体**。

#### 8.3.2 具有近似姐妹花属性值的 font-style

font-style 表示文字造型是斜还是正，开发中使用italic即可

```css
font-style: normal;
font-style: italic; // 使用当前字体的斜体字体，如果没找到对应的斜体字体，则使用 oblique
font-style: oblique; // 单纯地让文字倾斜
```

#### 8.3.3 不适合国情的 font-variant

### 8.4-8.5.1

### 8.4 font 属性

#### 8.4.1 作为缩写的 font 属性

font 是利用 font 属性进行文本相关 样式的缩写

```bash
# ||表示或，?和正则表达式中的?的含义一致，表示 0 个或 1 个。
# font-size 和 font-family 后面没有问号，也就是说是必需的，是不可以省略的
[ [ font-style || font-variant || font-weight ]? font-size [ / line-height ]? font-family ]

 .font { font: normal 700 14px/20px; } # 无效，缺字体
 .font { font: 14px '☺'; } # 有效
 .font { font: 400 30px 'Microsoft Yahei'; } # line-height 属性值就被重置为了 normal，需要单独设置行高
 
# font 缩写必须要带上 font-family，如果避免呢
# 方法一 找一个系统根本不存在的字体名占位, 然后再设置 font-family:inherit 来重置这个占位字体
.font {
	font: 30px/30px '☺';
	font-family: inherit;
}
# 方法二:利用@font face规则将我们的字体列表重定义为一个字体（兼容性很好、 效益很高）
```

#### 8.4.2 使用关键字值的 font 属性

font 属性除了缩写用法，还**支持关键字属性值**

```BASH
font:caption | icon | menu | message-box | small-caption | status-bar
```

如果将 font 属性设置为上面的一个值，就等同于设置 font 为操作系统该部件对应的 font，也就是说直接使用系统字体。

各个关键字的含义（ Windows 系统下）如下

- caption:活动窗口标题栏使用的字体。
- icon:包含图标内容所使用的字体，如所有文件夹名称、文件名称、磁盘名称，甚至浏览器窗口标题所使用的字体。
- menu:菜单使用的字体，如文件夹菜单。
- message-box:消息盒里面使用的字体。
- small-caption:调色板标题所使用的字体。
- status-bar:窗体状态栏使用的字体。

```bash
.menu { font: menu; }
# 使用关键字作为属性值的时候必须是独立的，不能添加 font-family 或者 font-size 之类的
.menu { font: 14px menu; } # wrong,此时的 menu 是作为自定义的字体名称存在的，而不是表示系统的 menu 菜单字体
```

font 关键字属性值本质上也是一种缩写，里面已经包含了诸如 font-size 等信息

caption、icon、message-box 这 3 个关键字在 Windows 系统下的 Chrome 浏览器中似乎是无效的，并不会实时跟着系统字体走。

考虑到 Chrome 浏览器的市场占有率，我们在使用 font 属性的时候，要**避开 caption、 icon 和 message-box 这 3 个关键字**。

在实际使用时，我们还需要在一下面再设 定一下 font-size 大小来保证一致性。

```css
html { font: menu; }
body { font-size: 16px; }
```

除了关键字，还有很多其他非标准的关键字

#### 8.4.3 font 关键字属性值的应用价值

非 Windows 系统下不要使用“微软雅黑”字体，而是 使用其系统字体。

```css
html { font: menu; }
body { font-size: 16px; }
```

使用的是 font 关键字属性值，网站字体能时时刻刻 与时俱进。

### 8.5 真正了解@font face 规则

#### 8.5.1 @font face 的本质是变量

@font face 本质上就是一个定 义字体或字体集的变量，这个变量不仅仅是简单地自定义字体，还包括字体重命名、默认字体 样式设置等。

@font face 规则支持的 CSS 属性有 font-family、src、font-style、font-weigh、 unicode-range、font-variant、font-stretch 和 font-feature-settings。

我们关注其中常用的属性

```css
 @font-face {
      font-family: 'example';
      src: url(example.ttf);
      font-style: normal;
      font-weight: normal;
      unicode-range: U+0025-00FF;
}
```

**1.font-family**

这里的 font-family 可以看成是一个字体变量，名称随意，但是有一类名称不能随便设置，就是原本系统就有的字体名称。

```css
@font-face {
      font-family: '$';
   		src: url(example.ttf);
}


@font-face {
      font-family: 'Microsoft Yahei'; // “微软雅黑”字体就变成了这里 example.ttf 对应的 字体了
      src: url(example.ttf);
}
```

**2.src**

src 表示引入的字体资源可以是系统字体，也可以是外链字体。

如果是使用系统安装字体， 则使用 local()功能符;如果是使用外链字体，则使用 url()功能符。

```css
 @font-face {
      font-family: ICON;
      src: url('icon.eot');
      src: local('☺'),
          url('icon.woff2') format("woff2"),
          url('icon.woff') format("woff"),
          url('icon.ttf');
}
```

**3.font-style**

font face 规则中的 font-style 和 font-weight 类似，都是用来设置对应字体样式或字重下该使用什么字体

```css
 @font-face {
      font-family: 'I';
      font-style: normal;
      src: local('FZYaoti');
    }
    @font-face {
      font-family: 'I';
      font-style: italic; // 使用 font-style:italic 的时候，就会调用这个对应字体
      src: local('FZShuTi');
}
```

```html
.i {
	font-family: I;
}
<p><i class="i">类名是i，标签是i</i></p> // <i>标签天然有 font-style:italic
<p><span class="i">类名是 i, 标签是 span</span></p>
```

<img src="http://cdn.wangtongmeng.com/20250330083339.png" style="zoom:50%;" />

**4.font-weight**

font-weight 和 font-style 类似，只不过它定义了不同字重、使用不同字体。

```css
 @font-face {
      font-family: 'QH';
      font-weight: 400;
      src: local('HYQihei 40S');
}
 @font-face {
      font-family: 'QH';
      font-weight: 500;
      src: local('HYQihei 50S');
    }
@font-face {
      font-family: 'QH';
      font-weight: 600;
      src: local('HYQihei 60S');
}
.hy-40s,
.hy-50s,
.hy-60s {
      font-family: 'QH';
}
.hy-40s {
      font-weight: 400;
}
.hy-50s {
      font-weight: 500;
}
.hy-60s {
      font-weight: 600;
} <ul>
<li class="hy-40s">汉仪旗黑40s</li> <li class="hy-50s">汉仪旗黑50s</li> <li class="hy-60s">汉仪旗黑60s</li>
</ul>
```

<img src="http://cdn.wangtongmeng.com/20250330083540.png" style="zoom:50%;" />

**“响应式图标”**，指的是字号较大时图标字体细节更丰富，字号较小时图标字体更简单的响应式处理。

```css
@font-face {
  font-family: ICON;
  src: url(icon-large.eot);
  src: local("☺"),
      url(icon-large.woff);
  font-weight: 700;
}
@font-face {
  font-family: ICON;
  src: url(icon-medium.eot);
  src: local("☺"),
      url(icon-medium.woff);
  font-weight: 400;
}
@font-face {
  font-family: ICON;
  src: url(icon-small.eot);
  src: local("☺"),
      url(icon-small.woff);
  font-weight: 100;
}
```

<img src="http://cdn.wangtongmeng.com/20250330083659.png" style="zoom:50%;" />

**5.unicode-range**

unicode-range 的作用是可以让特定的字符或者特定范围的字符使用指定的字体。

例如， “微软雅黑”字体的引号左右间隙不均，方向不明，实在是看着不舒服，此时我们就专门指定这两个引号使用其他字体

```css
@font-face {
       font-family: quote;
       src: local('SimSun');
       unicode-range: U+201c, U+201d;
}
.font {
 			 font-family: quote, 'Microsoft Yahei';
}
```

<img src="/Users/wangtongmeng/Library/Application Support/typora-user-images/image-20250330084111341.png" alt="image-20250330084111341" style="zoom:50%;" />

### **8.5.2-8.6.4**

#### 8.5.2 @font face 与字体图标技术

字体图标技术的使用会越来越边缘化，因为和 SVG 图标技术相比， 其唯一的优势就是兼容一些老的 IE 浏览器。

SVG 图标同样是矢量的，同样颜色可控，但资源占用更少，加载体验更好，呈现效果更佳， 更加符合语义。

一个是**字体**，另一个是**字符**，而这两个东西就是字体图标技术的本质所在。

所谓字体，本质上是字符集和图形的一种映射关系。

```css
 .icon {
   font-family: ICON;
}
.icon-microphone:before {
  content: '\1f3a4' // 1f3a4 就是一个唯一的“门牌号”
}
```

### 8.6 文本的控制

#### 8.6.1 text-indent 与内联元素缩进

text-indent 就是对文本进行缩进控制，使用固定长度居多，也能使用百分比。

用得比较多的是 text-indent 负值隐藏文本内容。

```html
<h1 class="logo">CSS世界</h1>
.logo {
      width: 120px;
      background: url(logo.png);
      text-indent: -120px;
}
```

#### 8.6.2 letter-spacing 与字符间距

letter-spacing 可以用来控制字符之间的间距，这里说的“字符”包括英文字母、汉 字以及空格等。

letter-spocing 具有以下一些特性。

- (1)继承性。
-  (2)默认值是 normal 而不是 0。虽然说正常情况下，normal 的计算值就是 0，但两者还是有差别的，在有些场景下，letter-spacing 会调整 normal 的计算值以实现更好的版 面布局。
- (3)支持负值，且值足够大的时候，会让字符形成重叠，甚至反向排列(非 IE 浏览器)。另外，letter-spacing 负值仅能让字符重叠，但是不能让替换元素或者 inline-block/inline-table 元素发生重叠。
-  (4)和 text-indent 属性一样，无论值多大或多小，第一行一定会保留至少一个字符。
- (5)支持小数值，即使 0.1px 也是支持的，但并不总能看到效果，这与屏幕的密度有关。

在实际开发的时候，letter-spacing 除了控制文字内容排版外，还可以修复一些布局上的问题。例如，清除 inline-block 列表由于换行符或者空格产生的空白间隙，使我们的 布局控制更精准

```css

.box {
  letter-spacing: -1em;
}
.list {
  letter-spacing: 0;
}
```

由于 letter-spacing 负值的字体重叠特性，我们还可以利用该属性实现一些文本动效， 核心 CSS 代码如下:

```css
// 文字依次飞入的效果,只适合移动端这类无须关心 IE 浏览器的项目。
.title {
     animation: textIn 1s both;
    }
    @keyframes textIn {
      0% {
        letter-spacing: -200px;
}
100% {
        letter-spacing: 0;
      }
}
```

#### 8.6.3 word-spacing 与单词间距

word-spacing 和 letter-spacing 名称类似，其特性也有很多共通之处:

-  (1)都具有继承性。
- (2)默认值都是 normal 而不是 0。通常情况下，两者表现并无差异。 
- (3)都支持负值，都可以让字符重叠，但是对于 inline-block 和 inline-table 元素却存在兼容性差异，Chrome 浏览器下可以重叠，IE 和 Firefox 浏览器下则再大的负值也不会重 叠，因此不适合使用 word-spacing 来清除空白间隙。
- (4)都支持小数值，如 word-spacing:0.5px。
- (5)在目前的 CSS2.1 规范中，并不支持百分比值，但新的草案中新增了对百分值的支持， 是根据相对于字符的“步进宽度”(advance width)计算的。这属于新世界内容，本书不做介绍。
- (6)间隔算法都会受到 text-align:justify 两端对齐的影响。

当然也有差异。letter-spacing 作用于所有字符，但 word-spacing 仅作用于空格字符。

#### 8.6.4 了解 word-break 和 word-wrap 的区别

word-break

```css
 word-break: normal; // 使用默认的换行规则
 word-break: break-all; // 允许任意非 CJK(Chinese/Japanese/Korean)文本间的单词断行。
 word-break: keep-all; // 不允许 CJK 文本中的单词换行，只能在半角空格或连字符处换行。非 CJK文本的行为实际上和normal 一致。
```

- break-all 这个值所有浏览器都支持
-  word-break:keep-all 移动端还不适合使用

word-wrap

```css
word-wrap: normal; // 正常的换行规则。
word-wrap: break-word; // 一行单词中实在没有其他靠谱的换行点的时候换行。
```

在 CSS3 规范里，这个属性的名称被修改了，叫作 overflow-wrap。考虑兼容性还是使用 word-wrap

### 8.6.5-8.6.8

### 8.6.5 white-space 与换行和空格的控制

**1.white-space 的处理模型**

white-space 属性声明了如何处理元素内的空白字符，这类空白字符包括 Space(空格) 键、Enter(回车)键、Tab(制表符)键产生的空白。

<img src="http://cdn.wangtongmeng.com/20250412081114.png" style="zoom:50%;" />

**2.white-space 与最大可用宽度**

当 white-space 设置为 nowrap 的时候，元素的宽度此时表现为“最大可用宽度”，换 行符和一些空格全部合并，文本一行显示。

应用场景

- (1)“包含块”尺寸过小处理。
- (2)单行文字溢出点点点效果。
- (3)水平列表切换效果。

### 8.6.6 text-align 与元素对齐

text-align:justify 两端对齐。IE 浏览器(至少 到 IE11)到目前为止使用 text-align:justify 都无法让中文两端对齐，而 Chrome、Firefox 和 Safari 等浏览器都是可以的。

全部浏览器都兼容的中文两端对齐效果

```css
.justify {
      text-align: justify;
      text-justify: inter-ideograph; // “国际象形文字”，非官方非标
}
```

text-align:justify 除了实现文本的两端对齐，还可以实现容错性更强的**两端对齐布局**效果

如果是多行，可以通过占位元素解决

```html
 <ul class="justify">
		<li>
			<img src="1.jpg">
			<p>图标描述 1</p>
		</li>
		<li>
		<img src="1.jpg">
    <p>图标描述 2</p>
		</li>
</ul>


.justify {
	text-align: justify;
	font-size: .1px; // ie下保证空格存在
	font-size: -webkit-calc(0px + 0px); // 解决inine-block导致的额外高度
}
.justify:after { // 借助伪元素自动补一行，实现最后一行的对齐就是两端对齐
  content: "";
  display: inline-table;
  width: 100%;
  vertical-align: bottom;
}
  .justify li {
  display: inline-block;
  font-size: 14px;
}
```

### 8.6.7 如何解决 text-decoration 下划线和文本重叠的问题

利用border

```css
a{
	text-decoration: none;
  border-bottom: 1px solid;
  padding-bottom: 5px; // 对于纯内联元素，垂直方向的 padding 属性和 border 属性对原来的布局定位等没有任何影响。
}
```

使用 border-bottom 模拟下划线的时候，**border-color 最好省略，这样就会使用文字的 color 颜色作为边框色**，鼠标 hover 的时候，下划线会自动和文字一起变色

text-decoration 还支持同时设置多个属性（不常用）

```css
a{
	text-decoration: underline overline;
}
```

### 8.6.8 一本万利的 text-transform 字符大小写

text-transform 也是为英文字符设计的，要么全大写 text-transform:uppercase， 要么全小写 text-transform:lowercase

1.场景一:身份证输入

```css
input {
      text-transform: uppercase;
}
```

2.场景二:验证码输入

```css
input {
      text-transform: uppercase;
}
```

### 8.7-9.1













