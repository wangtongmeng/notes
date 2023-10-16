

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
- 启动本地服务
- 处理 ES6
- 处理样式
- 处理图片
- 模块化，webpack本身支持，但需要引入webpack

## 高级配置

> - 基本配置只能做 demo，不能做线上项目
> - 面试官考察基本配置，是为了判断是否用过 webpack
> - 高级配置，也是通过面试的必要条件

- 多入口
- 抽离 CSS 文件
- 抽离公共代码
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

### 常用的Loader和Plugin

<img src="/Users/wtm/fe/notes/docs/fe/interview/assets/image-20231015084025529.png" alt="image-20231015084025529" style="zoom:25%;" />

常用的要答出来

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

 

