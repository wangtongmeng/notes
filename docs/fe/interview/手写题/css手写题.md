## 两列布局（左边固定宽，右边自适应）

左栏宽度固定，右栏自适应

### 1.flex

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .outer {
      display: flex;
      height: 100px;
    }
    .left {
      width: 200px;
      flex-shrink: 0;
      background-color: greenyellow;
    }
    .right {
      flex: 1;
      background-color: blueviolet;
      overflow: hidden;
      word-wrap: break-word;
    }
  </style>
</head>
<body>
  <div class="outer">
    <div class="left">left</div>
    <div class="right">sadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awnge</div>
  </div>
</body>
</html>
```

### 2.float

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .outer {
      height: 100px;
    }
    .left {
      width: 200px;
      height: 100px;
       /* 触发BFC */
      float: left; 
      background-color: greenyellow;
    }
    .right {
      height: 300px;
      /* 触发BFC，内容不超出右栏，不和左栏重叠 */
      overflow: hidden;
      background-color: blueviolet;
      word-wrap: break-word; 
    }
  </style>
</head>
<body>
  <div class="outer">
    <div class="left">left</div>
    <div class="right">sadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awnge</div>
  </div>
</body>
</html>
```

### 3.right absolute

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .outer {
      position: relative;
      height: 100px;
    }
    .left {
      width: 200px;
      height: 100px;
      background-color: greenyellow;
    }
    .right {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 200px;
      background-color: blueviolet;
      overflow: hidden;
      overflow-y: auto;
      word-wrap: break-word;
    }
  </style>
</head>
<body>
  <div class="outer">
    <div class="left">left</div>
    <div class="right">sadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awnge</div>
  </div>
</body>
</html>
```

### 4.left absolute

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .outer {
      position: relative;
      height: 100px;
    }
    .left {
      width: 200px;
      height: 100px;
      background-color: greenyellow;
      position: absolute;
    }
    .right {
      margin-left: 200px;
      height: 100%;
      background-color: blueviolet;
      overflow: hidden;
      overflow-y: auto;
      word-wrap: break-word;
    }
  </style>
</head>
<body>
  <div class="outer">
    <div class="left">left</div>
    <div class="right">sadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awngesadkfljal;ksejfal;wkjegl;wkejglwkaegl;awnge</div>
  </div>
</body>
</html>
```

## 九宫格布局

### 1.flex

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding:0;
    }
    li {
      list-style: none;
      text-align: center;
    }
    ul {
      width: 100px;
      height: 100px;
      display: flex;
      flex-wrap: wrap;
    }
    li {
      /* 不需要设置高度，换行后正好是三行，flex会均分高度 */
      width: 30%;
      margin-right: 5%;
      margin-bottom: 5%;
      background-color: aqua;
    }
    li:nth-child(3n) {
      margin-right: 0%;
    }
    li:nth-child(n+7) {
      margin-bottom: 0%;
    }
  </style>
</head>
<body>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
  </ul>
</body>
</html>
```

### 2.grid

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding:0;
    }
    li {
      list-style: none;
      text-align: center;
    }
    ul {
      width: 100px;
      height: 100px;
      display: grid;
      grid-template-columns: 30% 30% 30%;
      grid-template-rows: 30% 30% 30%;
      gap:5%;
    }
    li {
      background-color: aqua;
    }
  
  </style>
</head>
<body>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
  </ul>
</body>
</html>
```

### 3.float

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding:0;
    }
    li {
      list-style: none;
    }

    ul {
      width: 100px;
      height: 100px;
       /* 形成BFC */
      overflow: hidden;
    }
    li {
      width: 30%;
      height: 30%;
      margin-right: 5%;
      margin-bottom:5%;
      background-color: aqua;
      /* 形成BFC */
      float: left;
      text-align: center;
    }

    li:nth-child(3n) {
      margin-right: 0%;
    }
    li:nth-child(7+n) {
      margin-bottom: 0%;
    }
  
  </style>
</head>
<body>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
  </ul>
</body>
</html>
```

### 4.inline-block

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding:0;
    }
    li {
      list-style: none;
    }

    ul {
      width: 100px;
      height: 100px;
      /*1. inline-block的元素之间可能出现间隙，可以使用letter-spacing消除这种影响 */
      /* letter-spacing: -10px; */
      /* 2.通过 font-size: 0; 推荐 */
      font-size: 0;
    }
    li {
      width: 30%;
      height: 30%;
      margin-right: 5%;
      margin-bottom:5%;
      background-color: aqua;
      text-align: center;

      display: inline-block;
      font-size: 12px;
    }

    li:nth-child(3n) {
      margin-right: 0%;
    }
    li:nth-child(7+n) {
      margin-bottom: 0%;
    }
  
  </style>
</head>
<body>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
  </ul>
</body>
</html>
```

### 5.table

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding:0;
    }
    li {
      list-style: none;
    }

    ul {
      width: 100px;
      height: 100px;
      display: table;
      /* 间隙 */
      border-spacing: 5px; 
    }
    li {
      display: table-row;
    }

    div {
      width: 30%;
      height: 30%;
      display: table-cell;
      background-color: aqua;
    }
  
  </style>
</head>
<body>
  <ul>
    <li>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </li>
    <li>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </li>
    <li>
      <div>7</div>
      <div>8</div>
      <div>9</div>
    </li>
  </ul>
</body>
</html>
```

## 圣杯布局

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

## 双飞翼布局

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
            height: 200px;
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

## 如何实现圣杯布局和双飞翼布局？

圣杯布局和双飞翼布局的目的

- 三栏布局，中间一栏最先加载和渲染（内容最重要）
- 两侧内容固定，中间内容随着宽度自适应
- 一般用于 PC 网页

圣杯布局和双飞翼布局的技术总结

- 使用 float 布局
- 两侧使用 margin 负值，以便和中间内容横向重叠
- 防止中间内容被两侧覆盖，一个用 padding 一个用 margin

## 色子

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

