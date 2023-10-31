

# webpack

- webpack 前端打包必备
- 每日必用，面试必考

- 成熟的工具，重点在于配置和使用，原理并不高优

内容

- 基本配置
  - 安装配置
  - dev-server
  - 解析 ES6
  - 解析样式
  - 解析图片文件
  - 常见 loader 和 plugin
- 高级配置
  - 多入口
  - 抽离和压缩 css
  - 抽离公共代码
  - 懒加载
  - 处理 React 和 Vue
- 优化打包效率
  - 优化 babel-loader
  -  IgnoreLoader
  - noParse
  - happyhack
  - ParallelUglifyPlugin
  - 自动刷新
  - 热更新
  - DllPlugin
- 优化产出代码
  - 使用生产环境
  - 小图片 base64 编码
  - bundle 加 hash
  - 使用 CDN
  - 提取公共代码
  - 懒加载
  - scope hosting
- 构建流程概述
- babel
  - polyfill
  - runtime

webpack4升级webpack5

![image-20231014061832704](/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231014061832704.png)

## 基本配置

- 拆分配置和 merge
- 启动本地服务  **webpack-dev-server html-webpack-plugin**
- 处理 ES6 @babel/core @babel/preset-env **babel-loader**
- 处理样式  **style-loader css-loader less-loader   postcss-loader** autoprefixer
- 处理图片   **file-loader url-loader**
- 模块化，webpack本身支持，但需要引入webpack

## 高级配置

> - 基本配置只能做 demo，不能做线上项目
> - 面试官考察基本配置，是为了判断是否用过 webpack
> - 高级配置，也是通过面试的必要条件

- 多入口
- 抽离 CSS 文件 mini-css-extract-plugin 压缩css terser-webpack-plugin optimize-css-assets-webpack-plugin
- 抽离公共代码，配置splitChunks
- 懒加载
- 处理 JSX，用 babel
- 处理 Vue，用 vue-loader

## 优化打包效率

- Webpack 优化构建速度(可用于生产环境)
  - 优化 babel-loader
  - IgnorePlugin
  - noParse
  - happyPack
  - PrallelUglifyPlugin
- Webpack 优化构建速度(不可用于生产环境！)
  - 自动刷新
  - 热更新
  - DllPlugin

## 优化产出代码

> - 体积更小
> - 合理分包，不重复加载
> - 速度更快、内存使用更小

- 小图片 base64 编码
- bundle加hash
- 懒加载
- 提取公共代码
- IgnorePlugin
- 使用 CDN 加速，1.output设置publicPath cdn地址 2.将打包好的文件上传至cdn服务器上去。对于图片可以设置url-loader的publicPath
- 使用 production
  - 自动开启代码压缩
  - Vue React 等会自动删掉调试代码(如开发环境的 warning)
  - 启用 tree-shaking（ES6 module 才能让 tree-shaking生效，commonjs不行）
    - ES6 Module 和 Commonjs 区别
      - ES6 Module 静态引入，编译时引入
      - Commonjs 动态引入，执行时引入
      - 只有静态引用才能实现 Tree-Shaking
- Scope Hosting
  - 代码体积更小
  - 创建函数作用域更少
  - 代码可读性更好

## 构建流程概述

## babel

> - 前端开发环境必备工具
> - 同 webpack，需要了解基本的配置和使用
> - 面试考察概率不高，但要求必会

- 环境搭建 & 基本配置
  - 环境搭建
  - .babelrc 配置
  - presets 和 plugins
- babel-polyfill
  - 什么是 Polyfill
  - core-js(支持所有es6+语法，除了generatoer) 和 regenerator(支持generatoer语法)
  - babel-polyfill即两者的集合
  - babel-polyfill现已被废弃
    - Babel 7.4 之后弃用 babel-polyfill
    - 推荐直接用 core-js 和 regenerator
    - 但不影响面试考察它
  - babel-polyfill 按需引入
    - 文件较大
    - 只有一部分功能，无需全部引入
    - 配置按需引入
    - <img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231015074208334.png" alt="image-20231015074208334" style="zoom:25%;" />
    - babel-polyfill 的问题
      - 会污染全局环境
      - 如果做一个独立的 web 系统，则无碍
      - 如果做一个第三方 lib，则会有问题
      - 使用 babel-runtime重新命名，不会污染全局环境
- babel-runtime



## webpack面试题

### 前端代码为何要进行构建和打包

代码层面

- 体积更小（Tree-shaking、压缩、合并），加载更快
- 编译高级语言或语法（TS，ES6+，模块化，scss）
- 兼容性和错误检查（Polyfill、postcss、eslint）

工程化团队协作层面

- 统一、高效的开发环境
- 统一的构建流程和产出标准
- 集成公司构建规范（提测、上线等）

### webpack如何实现懒加载

- import()
- 结合 Vue React 异步组件
- 结合 Vue-router React-router 异步加载路由

### 说说对webpack的理解

### webpack的构建流程

几个核心概念

- Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。

Webpack 的构建流程可以分为以下三大阶段：

- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
- 编译：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
- 输出：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。

### 常用的Loader和Plugin

<img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231015084025529.png" alt="image-20231015084025529" style="zoom:25%;" />

常用的要答出来

loader

- css：sass-loader、css-loader、style-loader（开发环境）、postcss-loader
- js：babel-loader
- 图片： file-loader url-loader

plugin

- html 模板 html-webpack-plugin
- 每次打包清理Bundle， clean-webpack-plugin
- 代码压缩 minCssExtracPlugin
- 多进程：多进程打包happypack、多进程压缩ParallelUglifyPlugin
- DllPlugin：动态链接库，配合DllReferencePlugin

### Loader和Plugin的区别

- loader 模块转换器，如 less -> css
- plugin 扩展插件，如 HtmlWebpackPlugin

### 编写Loader和Plugin

### bundle、chunk，module的区别

- Module - 各个源码文件，webpack 中一切皆模块
- chunk - 多模块合成的，如 entry 入口及其依赖、 import()异步加载文件及其依赖、 splitchunk 代码拆分文件
- bundle - 最终的输出文件

### webpack热更新实现原理

### webpack常见性能优化（重点）

- 大厂必考 & 社区热议话题

- 优化打包构建速度 - 开发体验和效率

  - 优化 babel-loader，1.开启缓存，只要es6代码没变就不会重新编译，2.通过include明确范围
  - IginorePlugin，避免引入无用模块
    - import moment from 'moment'
    - 默认会引入所有语言 JS 代码，代码过大
    - 如何只引入中文？
  - noParse
    - IgnorePlugin vs noParse
      - IgnorePlugin 直接不引入，代码中没有
      - noParse 引入，但不打包
  - happyPack 多进程打包
    - JS 单线程，开启多进程打包
    - 提高构建速度(特别是多喝 CPU)
  - ParallelUglifyPlugin 多进程压缩 JS
    - webpack 内置 Uglify 工具压缩 JS
    - JS 单线程，开启多进程压缩更快
    - 和 happyPack 同理
    - 关于开启多进程
      - 项目较大，打包较慢，开启多进程能提高速度
      - 项目较小，打包很快，开启多进程会降低速度(进程开销)
      - 按需使用
  - 自动刷新
  - 热更新
    - 自动刷新：整个网页全部刷新，速度较慢
    - 自动刷新：整个网页全部刷新，状态会丢失
    - 热更新：新代码生效，网页不刷新，状态不丢失
    - 如果不影响开发用网页刷新，否则用热更新(成本大一些)
  - DllPlugin 动态链接库插件
    - 前端框架如 vue react ，体积大，构建慢
    - 较稳定，不常升级版本
    - 同一个版本只构建一次即可，不用每次都重新构建 
    - webpack 已内置 DllPlugin 支持
    - DllPlugin - 打包出 dll 文件
    - DllReferencePlugin - 使用 dll 文件
  - Webpack 优化构建速度(可用于生产环境)
    - 优化 babel-loader
    - IgnorePlugin
    - noParse
    - happyPack
    - PrallelUglifyPlugin
  - Webpack 优化构建速度(不可用于生产环境！)
    - 自动刷新
    - 热更新
    - DllPlugin

- 优化产出代码 - 产品性能

  > - 体积更小
  > - 合理分包，不重复加载
  > - 速度更快、内存使用更小

  - 小图片 base64 编码
  - bundle加hash
  - 懒加载
  - 提取公共代码
  - IgnorePlugin
  - 使用 CDN 加速，1.output设置publicPath cdn地址 2.将打包好的文件上传至cdn服务器上去。对于图片可以设置url-loader的publicPath
  - 使用 production
    - 自动开启代码压缩
    - Vue React 等会自动删掉调试代码(如开发环境的 warning)
    - 启用 tree-shaking（ES6 module 才能让 tree-shaking生效，commonjs不行）
      - ES6 Module 和 Commonjs 区别
        - ES6 Module 静态引入，编译时引入
        - Commonjs 动态引入，执行时引入
        - 只有静态引用才能实现 Tree-Shaking
  - Scope Hosting
    - 代码体积更小
    - 创建函数作用域更少
    - 代码可读性更好



优化 babel-loader

<img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231014191204868.png" alt="image-20231014191204868" style="zoom: 25%;" />

noParse 避免重复打包

<img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231014192644213.png" alt="image-20231014192644213" style="zoom:25%;" />

自动刷新

<img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231014193856648.png" alt="image-20231014193856648" style="zoom:25%;" />



Scope Hosting

```js
// hello.js
export default 'hello 双越'

// main.js
import str from './hello.js'
conso.elog(str)
```

![image-20231015070459001](/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231015070459001.png)

两个文件对应两个函数，把两个函数合起来，所以当文件越多，代码体积越大，效果越好

![image-20231015070615681](/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231015070615681.png)

scope hosting配置

![image-20231015070836502](/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231015070836502.png)

### 如何产出一个lib

- 参考 webpack.dll.js
- output.library

<img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231015084534908.png" alt="image-20231015084534908" style="zoom:25%;" />

## babel 面试题

### babel-runtime 和 babel-polyfill 的区别

- babel-polifll 会污染全局
- babel-runtime 不会污染全局
- 产出第三方 lib 要用 babel-runtime

### babel 和 webpack 的区别

- babel - JS 新语法编译工具，不关心模块化
- webpack - 打包构建工具，是多个 loader plugin的集合 

### 为何 Proxy 不能被 Polyfill？

- 如 Class 可以用 function 模拟
- 如 Promise 可以用 callback 模拟
- 但 Proxy 的功能用 Object.defineProperty 无法模拟

## vite

### vite的优缺点

**缺点**

Vite 是一个现代化的前端构建工具，它在性能和开发体验方面具有许多优点。然而，它也存在一些潜在的缺点，包括：

1. 社区支持相对较新：相对于其他成熟的前端构建工具（如Webpack和Parcel），Vite 是一个较新的项目，因此其社区支持相对较小。这可能导致在使用过程中遇到的问题难以找到解决方案或相关文档。

2. 生态系统相对较小：Vite 生态系统相对较小，与像Webpack这样的工具相比，可能缺乏一些插件和工具的支持。这可能需要你编写自定义的插件或处理一些特殊的需求。

3. 配置复杂性：Vite 的配置相对简单，但在处理一些复杂场景时，可能需要更深入的配置。相对于其他工具，如Webpack，Vite 的配置选项相对有限，可能需要更多的自定义处理。

4. 构建速度慢：尽管 Vite 在开发模式下具有快速的冷启动和热重载功能，但在生产模式下，Vite 的构建速度可能比一些其他工具慢。这对于大型项目或需要复杂构建过程的项目可能会产生一些影响。

5. 兼容性问题：由于 Vite 采用了 ES 模块的方式进行模块解析，一些旧版本的浏览器可能不支持这种模块系统，需要进行额外的兼容性处理。这可能增加一些开发和配置的复杂性。

需要注意的是，尽管 Vite 存在一些潜在的缺点，但它仍然是一个强大且受欢迎的前端构建工具，特别适用于现代化的前端项目。选择使用 Vite 还是其他工具应该根据具体项目需求和团队偏好进行评估。

优点

Vite 是一个现代化的前端构建工具，具有多个优点，包括：

1. 快速的冷启动：Vite 采用了基于 ES 模块的开发服务器，利用浏览器原生的 ES 模块解析功能，因此在开发模式下具有非常快速的冷启动速度。这意味着你可以更快地启动开发服务器并立即开始开发工作，无需长时间等待构建过程。

2. 高性能的热模块替换：Vite 通过使用原生的模块系统，实现了高性能的热模块替换（HMR）。在开发过程中，当你修改代码时，Vite 可以实时更新只有修改的部分，而无需刷新整个页面。这提供了更快的开发反馈和更高效的开发体验。

3. 简化的配置：相对于其他前端构建工具，如Webpack，Vite 的配置更加简化和直观。它采用了约定优于配置的原则，可以根据文件的类型和位置自动处理模块解析、代码转换和资源管理，减少了繁琐的配置过程。

4. 内置的开箱即用功能：Vite 内置了对常见前端框架（如Vue、React、Angular）的支持，并提供了一些开箱即用的功能，如对单文件组件的原生支持、CSS 预处理器的集成、代码分割等。这使得你可以更快速地搭建和开发现代化的前端项目。

5. 构建速度优化：Vite 在构建生产版本时，采用了预构建的方式，将依赖关系转换为高度优化的静态资源。这使得构建过程更加高效，生成的生产代码体积更小，加载速度更快。

6. 模块化开发体验：Vite 鼓励使用原生的 ES 模块语法进行开发，使得模块化的开发和维护更加简单和清晰。你可以直接使用 npm 或 yarn 安装模块，无需进行额外的构建步骤或配置。

综上所述，Vite 通过快速的冷启动、高性能的热模块替换、简化的配置和内置的开箱即用功能等特点，提供了更高效、更快速的前端开发体验。它适用于现代化的前端项目，并受到许多开发者的欢迎。

 

