## <font style="color:rgb(51, 51, 51);">webpack介绍</font>
+ <font style="color:rgb(51, 51, 51);">本质上，webpack 是一个用于现代 JavaScript 应用程序的</font>**<font style="color:rgb(51, 51, 51);">静态模块打包工具</font>**<font style="color:rgb(51, 51, 51);">。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle</font>

### <font style="color:rgb(51, 51, 51);">安装</font>
```bash
npm install  webpack webpack-cli --save-dev
```

### <font style="color:rgb(51, 51, 51);">入口(entry)</font>
+ <font style="color:rgb(51, 51, 51);">入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的</font>
+ <font style="color:rgb(51, 51, 51);">默认值是</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">./src/index.js</font><font style="color:rgb(51, 51, 51);">，但你可以通过在</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">webpack configuration</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">中配置</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">entry</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">属性，来指定一个（或多个）不同的入口起点</font>

#### <font style="color:rgb(51, 51, 51);">src\index.js</font>
```javascript
let title = require('./title.txt');
console.log(title)
```

#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>
```javascript
const path = require('path');
module.exports = {
  mode: 'none',
  entry: './src/index.js',
  // 等价写法
  // entry: { 
//     main: './src/index.js'
// }
};
```

#### package.json
npm run build，默认会生成dist/main.js

```json
"scripts": {
    "build": "webpack",
    "dev": "webpack serve"
  },
```

vscode rm-js-comment，可以简化webpack 编译后的代码，删除注释和替换长变量

vscode settings extensions

```json
"rm-js-comment.replacer": {
        "__webpack_require__": "require",
        "__webpack_modules__": "modules",
        "__webpack_exports__": "exports",
        "__WEBPACK_DEFAULT_EXPORT__": "DEFAULT_EXPORT",
        "__WEBPACK_IMPORTED_MODULE": "",
        "___CSS_LOADER_EXPORT___": "LOADER_EXPORT",
        "__webpack_module_cache__": "cache",
        "__unused_webpack_exports": "exports",
        "__unused_webpack_module": "module",
        "/*#__PURE__*/": ""
    }
```

### <font style="color:rgb(51, 51, 51);">输出(output)</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">output</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件</font>
+ <font style="color:rgb(51, 51, 51);">主要输出文件的默认值是 </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">./dist/main.js</font><font style="color:rgb(51, 51, 51);">，其他生成文件默认放置在 </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">./dist</font><font style="color:rgb(51, 51, 51);"> 文件夹中。</font>

  

 <font style="color:rgb(51, 51, 51);">webpack.config.js</font>

```diff
const path = require('path');
module.exports = {
  entry: './src/index.js',
+  output: {
+    path: path.resolve(__dirname, 'dist'), // 输出目录
+    filename: 'main.js', // 文件名
+		 publicPath: '/' // 表示的是打包生成的index.html文件里面引用资源的前缀
+  }
};
```

### <font style="color:rgb(51, 51, 51);">loader</font>
+ <font style="color:rgb(51, 51, 51);">webpack 只能理解</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">JavaScript</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">和</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">JSON</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">文件</font>
+ <font style="color:rgb(51, 51, 51);">loader 让 </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">webpack</font><font style="color:rgb(51, 51, 51);"> 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中</font>

#### webpack.config.js
```diff

const path = require('path');
module.exports = {
  mode: 'development',
  devtool:false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
+  module: {
+    rules: [
+      { test: /\.txt$/, use: 'raw-loader' } // npm i raw-loader -D
+    ]
+  }
};
```

#### src/content.txt
```javascript
内容
```

#### src/index.js
```javascript
let content = require('./content.txt')
console.log(content.default); // 内容
```

#### dist/index.html
npm run build

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="./main.js"></script>
</body>
</html>
```

### <font style="color:rgb(51, 51, 51);">插件(plugin)</font>
+ <font style="color:rgb(51, 51, 51);">loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量</font>

#### <font style="color:rgb(51, 51, 51);">src\index.html</font>
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack5</title>
</head>
<body>
</body>
</html>
```

#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>
```diff
const path = require('path');
+const HtmlWebpackPlugin = require('html-webpack-plugin'); // npm i html-webpack-plugin -D
module.exports = {
  mode: 'development',
  devtool:false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
+  plugins: [
+    new HtmlWebpackPlugin({template: './src/index.html'})
+  ]
};
```

### <font style="color:rgb(51, 51, 51);">模式(mode)</font>
+ <font style="color:rgb(51, 51, 51);">日常的前端开发工作中，一般都会有两套构建环境</font>
+ <font style="color:rgb(51, 51, 51);">一套开发时使用，构建结果用于本地开发调试，不进行代码压缩，打印 debug 信息，包含 sourcemap 文件</font>
+ <font style="color:rgb(51, 51, 51);">一套构建后的结果是直接应用于线上的，即代码都是压缩后，运行时不打印 debug 信息，静态文件不包括 sourcemap</font>
+ <font style="color:rgb(51, 51, 51);">webpack 4.x 版本引入了</font><font style="color:rgb(51, 51, 51);"> </font>[mode](https://webpack.docschina.org/configuration/mode/)<font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">的概念</font>
+ <font style="color:rgb(51, 51, 51);">当你指定使用 production mode 时，默认会启用各种性能优化的功能，包括构建结果优化以及 webpack 运行性能优化</font>
+ <font style="color:rgb(51, 51, 51);">而如果是 development mode 的话，则会开启 debug 工具，运行时打印详细的错误信息，以及更加快速的增量编译构建</font>

| **<font style="color:rgb(51, 51, 51);">选项</font>** | **<font style="color:rgb(51, 51, 51);">描述</font>** |
| :--- | :--- |
| <font style="color:rgb(51, 51, 51);">development</font> | <font style="color:rgb(51, 51, 51);">会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin</font> |
| <font style="color:rgb(51, 51, 51);">production</font> | <font style="color:rgb(51, 51, 51);">会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin</font> |


webpack.config.js

```diff
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
module.exports = {
+  mode: 'development',
+  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      { test: /.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
```

dist/main.js

```javascript
(() => {
  var modules = ({
    "./src/content.txt": // NamedModulesPlugin
      ((module, exports, require) => {
        "use strict";
        require.r(exports);
        require.d(exports, {
          "default": () => (DEFAULT_EXPORT)
        });
        const DEFAULT_EXPORT = ("内容");
      }),
    "./src/title.js": // NamedModulesPlugin
      ((module) => {
        module.exports = 'title'
      })
  });
  var cache = {};
  function require(moduleId) {
    var cachedModule = cache[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = cache[moduleId] = {
      exports: {}
    };
    modules[moduleId](module, module.exports, require);
    return module.exports;
  }
  (() => {
    require.d = (exports, definition) => {
      for (var key in definition) {
        if (require.o(definition, key) && !require.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
      }
    };
  })();
  (() => {
    require.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
  })();
  (() => {
    require.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
  })();
  var exports = {};
  (() => {
    let title = require("./src/title.js") // NamedModulesPlugin
    console.log(title);
    let content = require("./src/content.txt") // NamedModulesPlugin
    console.log(content.default);
  })();
})()
  ;
```

#### <font style="color:rgb(51, 51, 51);">环境差异</font>
+ <font style="color:rgb(51, 51, 51);">开发环境</font>
    - <font style="color:rgb(51, 51, 51);">需要生成 sourcemap 文件</font>
    - <font style="color:rgb(51, 51, 51);">需要打印 debug 信息</font>
    - <font style="color:rgb(51, 51, 51);">需要 live reload 或者 hot reload 的功能</font>
+ <font style="color:rgb(51, 51, 51);">生产环境</font>
    - <font style="color:rgb(51, 51, 51);">可能需要分离 CSS 成单独的文件，以便多个页面共享同一个 CSS 文件</font>
    - <font style="color:rgb(51, 51, 51);">需要压缩 HTML/CSS/JS 代码</font>
    - <font style="color:rgb(51, 51, 51);">需要压缩图片</font>
+ <font style="color:rgb(51, 51, 51);">其默认值为 production</font>

#### <font style="color:rgb(51, 51, 51);">区分环境</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">--mode</font><font style="color:rgb(51, 51, 51);">用来设置模块内的</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">process.env.NODE_ENV</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">--env</font><font style="color:rgb(51, 51, 51);">用来设置webpack配置文件的函数参数</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">cross-env</font><font style="color:rgb(51, 51, 51);">用来设置node环境的</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">process.env.NODE_ENV</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">DefinePlugin</font><font style="color:rgb(51, 51, 51);">用来设置模块内的全局变量</font>

#### <font style="color:rgb(51, 51, 51);">区分环境-</font>命令行配置（mode默认）
+ <font style="color:rgb(51, 51, 51);">webpack的mode默认为</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">production</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">webpack serve</font><font style="color:rgb(51, 51, 51);">的mode默认为</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">production</font>
+ <font style="color:rgb(51, 51, 51);">可以在模块内通过</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">process.env.NODE_ENV</font><font style="color:rgb(51, 51, 51);">获取当前的环境变量,无法在webpack配置文件中获取此变量</font>

```json
 "scripts": {
    "build": "webpack",
    "start": "webpack serve"
  },
```

<font style="color:rgb(51, 51, 51);">index.js</font>

```javascript
console.log(process.env.NODE_ENV);// production
```

<font style="color:rgb(51, 51, 51);">webpack.config.js</font>

```javascript
console.log('NODE_ENV',process.env.NODE_ENV);// undefined
```

#### <font style="color:rgb(51, 51, 51);">区分环境-</font>命令行配置（配置mode）
mode可以在webpack.config.js或者package.json的script中配置

webpack.config.js

```javascript
module.exports = {
	mode: 'development'
}
```

<font style="color:rgb(51, 51, 51);">或者</font>

```json
"scripts": {
  "build": "webpack --mode=production",
  "start": "webpack --mode=development serve"
},
```

```javascript
// index.js
console.log(process.env.NODE_ENV);// production | development

// webpack.config.js
console.log('NODE_ENV',process.env.NODE_ENV);// undefined
```

> 当webpack.config.js中的mode和package.json中的mode都配置时，package.json中的优先级更高，因为离用户更近，用户需要调用。
>

#### <font style="color:rgb(51, 51, 51);">区分环境-</font>命令行配置（env控制mode）
+ <font style="color:rgb(51, 51, 51);">无法在模块内通过</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">process.env.NODE_ENV</font><font style="color:rgb(51, 51, 51);">访问</font>
+ <font style="color:rgb(51, 51, 51);">可以通过</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">webpack 配置文件中</font><font style="color:rgb(51, 51, 51);">中通过函数获取当前环境变量</font>

```json
"scripts": {
   "dev": "webpack serve --env=development",
   "build": "webpack --env=production",
}
```

<font style="color:rgb(51, 51, 51);">index.js</font>

```javascript
 console.log(process.env.NODE_ENV);// undefined
```

<font style="color:rgb(51, 51, 51);">webpack.config.js</font>

```javascript
console.log('NODE_ENV',process.env.NODE_ENV);// undefined
```

```javascript
module.exports = (env,argv) => { // 导出函数接收参数
  console.log('env',env);// {  production: true }  或者 {  development: true } 
  console.log('argv', argv) // { env: { production: true } } 或 ...
  return {
    mode: env.production ? 'production' : 'development', // 通过env变量判断，控制多个配置项
    devtool: false, // 去掉 eval
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    module: {
      rules: [
        { test: /.txt$/, use: 'raw-loader' }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ]
  }
};
```

#### 区分环境-DefinePlugin
+ <font style="color:rgb(51, 51, 51);">设置全局变量(不是</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">window</font><font style="color:rgb(51, 51, 51);">),所有模块都能读取到该变量的值</font>
+ <font style="color:rgb(51, 51, 51);">可以在任意模块内通过</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">process.env.NODE_ENV</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">获取当前的环境变量</font>
+ <font style="color:rgb(51, 51, 51);">但无法在</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">node环境</font><font style="color:rgb(51, 51, 51);">(webpack 配置文件中)下获取当前的环境变量</font>

```javascript
plugins:[
   new webpack.DefinePlugin({
     		// 运行本质是在编译的时候做纯字符串的替换，并不会定义任何的变量
      'process.env.NODE_ENV':JSON.stringify('development'),
      'NODE_ENV':JSON.stringify('production'),
   })
] 
```

<font style="color:rgb(51, 51, 51);">index.js</font>

```javascript
console.log('process.env.NODE_ENV', process.env.NODE_ENV) // development
console.log('NODE_ENV', NODE_ENV); // production
```

<font style="color:rgb(51, 51, 51);">webpack.config.js</font>

```javascript
console.log('process.env.NODE_ENV',process.env.NODE_ENV);// undefined
console.log('NODE_ENV',NODE_ENV);// error ！！！
```

#### 区分环境-cross-env
+ <font style="color:rgb(51, 51, 51);">只能设置</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">node环境</font><font style="color:rgb(51, 51, 51);">下的变量NODE_ENV</font>

<font style="color:rgb(51, 51, 51);">安装</font>

```bash
 npm i cross-env -D
```

<font style="color:rgb(51, 51, 51);">package.json</font>

```json
"scripts": {
  // build": "set NODE_ENV=production&webpack", mac是export 
  "build": "cross-env NODE_ENV=development webpack" // 通过设置NODE_ENV的值，其实是设置shell窗口的变量，和webpack没有关系
}

```

> <font style="color:rgb(51, 51, 51);">如果是set export 设置变量需要加&作为分隔后面的命令</font>
>
> <font style="color:rgb(51, 51, 51);">如果是cross-env 不用加& 直接空格隔开就可以了</font>
>

<font style="color:rgb(51, 51, 51);">webpack.config.js</font>

```javascript
console.log('process.env.NODE_ENV',process.env.NODE_ENV);// development
```

#### .env文件
```bash
npm i dotenv -D
```

config/.env

```javascript
NODE_ENV2=production2
// 本地和服务端放自己的，不在网络间进行传输，保证安全
MYSQL_USERNAME=ROOT
MYSQL_PASSWORD=123456
```

webpack.config.js

```javascript
// 读取.env这个文件，把里面配置的key value写入到process.env对象里
require('dotenv').config({ path: path.resolve('config/.env') });
console.log(process.env.NODE_ENV2); // production2
```

#### 最佳设置
<font style="color:rgb(51, 51, 51);">package.json</font>

```diff
"scripts": {
+   "build": "cross-env NODE_ENV=production webpack",
+   "dev": "cross-env NODE_ENV=development webpack serve"
},
```

webpack.config.js

```diff
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

console.log('webpack.config.js', process.env.NODE_ENV) // 都可以获取

module.exports = {
+  mode: process.env.NODE_ENV,
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      { test: /.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
+      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV), // JSON.stringify('development') 等价于 '"' + process.env.NODE_ENV + '"'
+      'NODE_ENV':JSON.stringify(process.env.NODE_ENV),
   })
  ]
}
```

src/index.js

```javascript
console.log('process.env.NODE_ENV', process.env.NODE_ENV)   // 都可以获取
console.log('NODE_ENV', NODE_ENV);  // 都可以获取
```

## <font style="color:rgb(51, 51, 51);">开发环境配置</font>
### <font style="color:rgb(51, 51, 51);">开发服务器</font>
#### <font style="color:rgb(51, 51, 51);">安装服务器</font>
```bash
npm install webpack-dev-server --save-dev
```

#### <font style="color:rgb(51, 51, 51);">webpack-dev-server</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">webpack-dev-server</font><font style="color:rgb(51, 51, 51);">是一个基于</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">Express</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">的</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">Web</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">服务器，它可以为</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">Webpack</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">打包后的代码提供一个本地开发环境，支持实时刷新、热替换和自动构建等功能，大大提高了开发效率</font>
    - <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">static</font><font style="color:rgb(51, 51, 51);">：静态资源目录的路径，设置该参数可以在服务器中访问这些静态资源</font>
    - <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">compress</font><font style="color:rgb(51, 51, 51);">：启用 gzip 压缩，默认是关闭的</font>
    - <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">port</font><font style="color:rgb(51, 51, 51);">：服务器端口，默认是 8080</font>
    - <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">host</font><font style="color:rgb(51, 51, 51);">：服务器主机名，默认是 localhost</font>
    - <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">open</font><font style="color:rgb(51, 51, 51);">：是否自动在浏览器中打开页面，默认是关闭的</font>
    - <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">hot</font><font style="color:rgb(51, 51, 51);">：启用模块热替换功能，默认是关闭的</font>
    - <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">watchFiles</font><font style="color:rgb(51, 51, 51);">：需要监听的文件列表，当这些文件发生变化时，自动重启服务器</font>
    - <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">historyApiFallback</font><font style="color:rgb(51, 51, 51);">：参数用于设置是否启用 HTML5 历史记录 API，用于处理单页应用的路由问题。默认情况下，当使用浏览器的前进/后退按钮时，devServer 会尝试根据 URL 路径查找对应的静态资源，如果找不到就返回 404。如果启用了 historyApiFallback，则会将这些请求重定向到 index.html，然后交给前端路由来处理</font>
+ <font style="color:rgb(51, 51, 51);">在命令行中运行 </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">webpack-dev-server</font><font style="color:rgb(51, 51, 51);"> 命令后，</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">webpack-dev-server</font><font style="color:rgb(51, 51, 51);"> 将会启动一个本地 Web 服务器，并监听我们定义的端口。我们可以在浏览器中访问 </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">http://localhost:9000</font><font style="color:rgb(51, 51, 51);">，即可预览打包后的页面，并实现实时刷新和热替换功能</font>

#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>
```diff
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  // express启动一个HTTP服务器 通过它可以访问产出的文件
+  devServer: {
+      static: path.resolve(__dirname, "public"), // 额外的静态文件内容的目录
+      compress: true, // 是否启动压缩 gzip
+      port: 8080, // 服务器监听的端口号
+      open: true, // 是否打开浏览器提供访问
+    },
}
```

devServer的文件是直接写入内存的

```javascript
/* let fs = require('fs');
fs.writeFileSync('1.txt','1','utf8');
let content = fs.readFileSync('1.txt','utf8');
console.log(content); */
let path = require('path');
var MemoryFileSystem = require("memory-fs");
var fs = new MemoryFileSystem(); // Optionally pass a javascript object

fs.mkdirpSync(path.resolve("dir"));
//写入内存中的，速度 更快，硬盘上看不见
fs.writeFileSync(path.resolve("dir/file.txt"), "Hello World");
let content = fs.readFileSync(path.resolve("dir/file.txt")); // returns Buffer("Hello World")
console.log(content.toString());
```

#### <font style="color:rgb(51, 51, 51);">package.json</font>
```javascript
 "scripts": {
    "build": "webpack",
+   "start": "webpack serve"
  }
```

### <font style="color:rgb(51, 51, 51);">支持CSS</font>
+ [css-loader](https://www.npmjs.com/package/css-loader)<font style="color:rgb(51, 51, 51);">用来翻译处理@import和url()</font>
+ [style-loader](https://www.npmjs.com/package/style-loader)<font style="color:rgb(51, 51, 51);">可以把CSS插入DOM中</font>

#### <font style="color:rgb(51, 51, 51);">安装模块</font>
```bash
npm i style-loader css-loader -D
```

#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>
```diff
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool:false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
+     { test: /\.css$/, use: ['style-loader','css-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

#### <font style="color:rgb(51, 51, 51);">src\bg.css</font>
```css
body{
    background-color: green;
}
```

#### <font style="color:rgb(51, 51, 51);">src\index.css</font>
```css
@import "./bg.css";
body{
    color:red;
}
```

#### <font style="color:rgb(51, 51, 51);">src\index.js</font>
```javascript
+import './index.css';
```

#### css-loader--支持cssModule
webpack.config.js

```javascript
{
        test: /.css$/,
        use: [
          'style-loader', // css转成js
          {
            loader: 'css-loader', // url @import 进行处理
            options: {
+              modules: {
+                mode: "local", // https://www.npmjs.com/package/css-loader
+                localIdentName: "[path][name]__[local]--[hash:base64:5]",  //  {logo: "src-index__logo--21P3f"}
+              },
            }
          }
          // 'postcss-loader' // css预处理器 处理厂商样式兼容
        ]
      },
```

index.js

```javascript
// import './index.css';
import style from  './index.css';

console.log(style); //  {logo: "src-index__logo--21P3f"}
```

#### css-loader--importLoaders的使用
webpack.config.js

```javascript
{
        test: /.css$/,
        use: [
          'style-loader', // css转成js
          {
            loader: 'css-loader', // url @import 进行处理
            options: {
              // 在处理引入的别的CSS的文件，要先把别的CSS文件经过几个loader的处理结果 合并到当前文件中
              importLoaders: 1,
              modules: false,
            }
          },
          'postcss-loader' // css预处理器 处理厂商样式兼容
        ]
      },
```

src/index.css

```css
@import './bg.css';
body{
    color:red;
}
#logo{
    width: 100px;
    height: 100px;
    background-image: url('./assets/1.jpg');
    background-size: contain;
}
```

src/bg.css

css-loader将bg.css合并到index.css之前会先经过1一个loader处理，也就是postcss-loader（配置见css兼容性）处理，然后再合并

```css
body {
    background-color: green;
}

#postcss {
    width: 100px;
    height: 50px;
    background-color: blueviolet;
    transform: rotate(70deg);
}
```

src/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"> -->
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <title>Document</title>
</head>
<body>
    <div id="less-container">less-container</div>
    <div id="sass-container">sass-container</div>
    <div id="logo"></div>
    <div id="postcss"></div>
</body>
</html>
```

当结合less-loader或sass-loader时，下例中importLoaders写1或者2都可以

webpack.config.js

```javascript
{
        test: /\.less$/,
        use: [
          'style-loader', // css转成JS 结果 一定是JS，因为它的结果就是给webpack用了
          {
            loader: 'css-loader', // url import 进行处理
            options: {
              importLoaders: 2 // 写1或者2都可以，因为less内部会把import处理成css
            }
          },
          'postcss-loader',
          'less-loader' // 把less编译成css  在这一步已经 把import 进行转换CSS了
        ]
      },
```

### <font style="color:rgb(51, 51, 51);">支持less和sass</font>
#### <font style="color:rgb(51, 51, 51);">安装</font>
```bash
npm i less less-loader -D
npm i dart-sass sass-loader -D # 以前用node-sass 最新的改成dart-sass
```

#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>
```diff
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
+     { test: /\.less$/, use: ['style-loader','css-loader', 'less-loader'] },
+     { test: /\.scss$/, use: ['style-loader','css-loader', 'sass-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
};
```

#### <font style="color:rgb(51, 51, 51);">src\index.html</font>
```diff
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack5</title>
</head>
<body>
+  <div id="less-container">less-container</div>
+  <div id="sass-container">sass-container</div>
</body>
</html>
```

#### <font style="color:rgb(51, 51, 51);">src\index.js</font>
```diff
import './index.css';
+import './less.less';
+import './sass.scss';
```

#### <font style="color:rgb(51, 51, 51);">src\less.less</font>
```less
@color:blue;
#less-container{
    color:@color;
}
```

#### <font style="color:rgb(51, 51, 51);">src\sass.scss</font>
```less
$color:orange;
#sass-container{
    color:$color;
}
```

### <font style="color:rgb(51, 51, 51);">支持图片</font>
#### <font style="color:rgb(51, 51, 51);">安装</font>
+ [file-loader](http://npmjs.com/package/file-loader)<font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">解决CSS等文件中的引入图片路径问题</font>
+ [url-loader](https://www.npmjs.com/package/url-loader)<font style="color:rgb(51, 51, 51);"> 当图片小于</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">limit</font><font style="color:rgb(51, 51, 51);">的时候会把图片</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">BASE64</font><font style="color:rgb(51, 51, 51);">编码，大于</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">limit</font><font style="color:rgb(51, 51, 51);">参数的时候还是使用</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">file-loader</font><font style="color:rgb(51, 51, 51);">进行拷贝</font>

```bash
cnpm i file-loader url-loader html-loader -D
webpack5里不需要了
```

#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader','css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader','css-loader', 'sass-loader'] },
+     { test: /\.(jpg|png|bmp|gif|svg)$/, 
+        use: [{
+          loader: 'url-loader', 
+          options: {
+            esModule: false,
+            name: '[hash:10].[ext]',
             // 以8K为分界线 如果引入的文件小于8K，就把图片变成base64字符串插入html,否则 和file-loader一样的
+            limit: 8*1024, // file-loader没有这一项
+          }
+        }]
+     },
+     {
+       test: /\.html$/,
+       loader: 'html-loader'
+     }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
};
```

#### <font style="color:rgb(51, 51, 51);">src\index.html</font>
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack5</title>
</head>
<body>
  <div id="less-container">less-container</div>
  <div id="sass-container">sass-container</div>
+ <div id="logo"></div>
+ <img src="./assets/logo.png" alt="logo.png">
</body>
</html>
```

#### <font style="color:rgb(51, 51, 51);">src\index.js</font>
```javascript
import './index.css';
import './less.less';
import './sass.scss';
+let logo=require('./assets/logo.png');
+let img=new Image();
+img.src=logo.default;
// img.src = logo // file-loader/url-loader -> esModule false
+document.body.appendChild(img);
```

#### src/index.css
```css
#logo{
    width: 100px;
    height: 100px;
    background-image: url('./assets/logo.png');
    background-size: contain;
}
```

### CSS 兼容性
#### 安装
```bash
npm i postcss-loader postcss-preset-env -D
```

#### <font style="color:rgb(51, 51, 51);">postcss.config.js</font>
```javascript
let postCSSPresetEnv = require('postcss-preset-env');
module.exports = {
    plugins:[
        postCSSPresetEnv({
            browsers:'last 5 version' // 支持最新的5个版本
        })
    ]
}
```

#### package.json

也可以配置在package.json

```json
{
  "browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [
      ">0.2%"
    ]
  }
}
```



#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>

```diff
{
        test: /\.css$/,
        // 最右侧的loader读的是源文件内容 最左侧的loader一定会返回一个js模块
+        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
+        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
+        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
```

#### <font style="color:rgb(51, 51, 51);">src\index.css </font>
```css
#postcss {
    width: 100px;
    height: 50px;
    background-color: blueviolet;
    transform: rotate(70deg);
}
```

#### <font style="color:rgb(51, 51, 51);">src\index.html</font>
```diff
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"> -->
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <title>Document</title>
</head>
<body>
    <div id="less-container">less-container</div>
    <div id="sass-container">sass-container</div>
    <div id="logo"></div>
+    <div id="postcss"></div>
</body>
</html>
```

#### src/index.js
```javascript
import './index.css';
```

### <font style="color:rgb(51, 51, 51);">JS兼容性处理</font>
+ <font style="color:rgb(51, 51, 51);">Babel其实是一个编译JavaScript的平台,可以把ES6/ES7,React的JSX转义为ES5</font>

#### <font style="color:rgb(51, 51, 51);">@babel/preset-env</font>
+ <font style="color:rgb(51, 51, 51);">Babel默认只转换新的最新ES语法,比如箭头函数</font>

#### <font style="color:rgb(51, 51, 51);">安装依赖</font>
+ [babel-loader](https://www.npmjs.com/package/babel-loader)<font style="color:rgb(51, 51, 51);">使用Babel和webpack转译JavaScript文件</font>
+ [@babel/@babel/core](https://www.npmjs.com/package/@babel/core)<font style="color:rgb(51, 51, 51);">Babel编译的核心包</font>
+ [babel-preset-env](https://www.babeljs.cn/docs/babel-preset-env) 插件的集合
+ [@babel/@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react)<font style="color:rgb(51, 51, 51);">React插件的Babel预设</font>
+ [@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)<font style="color:rgb(51, 51, 51);">把类和对象装饰器编译成ES5</font>
+ [@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)<font style="color:rgb(51, 51, 51);">转换静态类属性以及使用属性初始值化语法声明的属性</font>

<font style="color:rgb(51, 51, 51);">一个js文件，会调用@babel/core（只能识别不能转换js代码）；插件知道如何转换代码，例如arrow-function-plugins；es6语法有很多，把转换语法的插件打成一个包，包被称为preset预设，@</font>babel/preset-env 就是一个把es6转成es5的预设。

```bash
cnpm i babel-loader @babel/core @babel/preset-env @babel/preset-react  -D
cnpm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
```

#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>
```javascript
onst path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
+			{
+        test: /\.js$/,
+        use: [
+          {
+            loader: 'babel-loader',
+            options: {
+              presets: [
+                '@babel/preset-env', // es6 -> re5
+                '@babel/preset-react', // react -> es5
+              ],
+              plugins: [
+                ['@babel/plugin-proposal-decorators', { legacy: true }],
+                ['@babel/plugin-proposal-class-properties', { loose: true }],
+                ["@babel/plugin-proposal-private-methods", { "loose": true }]
+              ],
+            },
+          },
+        ],
+      },
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      {
        test: /\.(jpg|png|bmp|gif|svg)$/, use: [{
          loader: 'url-loader', options: {
            limit: 10,
            outputPath: 'images',
            publicPath: '/images'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
  ]
};
```

#### <font style="color:rgb(51, 51, 51);">src\index.js</font>
```javascript
+function readonly(target,key,descriptor) {
+    descriptor.writable=false;  // 设置对象的这个属性不可修改
+}
+
+class Person{
+    @readonly PI=3.14;
+}
+let p1=new Person();
+p1.PI=3.15;
+console.log(p1)
```

#### <font style="color:rgb(51, 51, 51);">jsconfig.json</font>
+ [jsconfig](https://code.visualstudio.com/docs/languages/jsconfig)

```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

### <font style="color:rgb(51, 51, 51);">ESLint代码校验</font>
#### <font style="color:rgb(51, 51, 51);">安装</font>
+ [eslint](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)
+ [eslint-loader](https://www.npmjs.com/package/eslint-loader)
+ [configuring](https://eslint.org/docs/user-guide/configuring)
+ [babel-eslint](https://www.npmjs.com/package/babel-eslint)
+ [Rules](https://cloud.tencent.com/developer/chapter/12618)
+ [ESlint 语法检测配置说明](https://segmentfault.com/a/1190000008742240)

```bash
cnpm install eslint eslint-loader babel-eslint --D
```

js -> eslint-loader，eslint-loader先把eslint不支持的语法通过babel-eslint转成es5语法，再调用eslint。

#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
			{
        test: /\.js$/, // 如果加载的模块是以.js结尾 的
        loader: 'eslint-loader', // 进行代码风格检查
        enforce: 'pre', // 给loader进行分类 pre=>normal=>inline=>post
        options: { fix: true }, // 如果发现不合要求，会自动修复
        exclude: /node_modules/, // 不处理node_modules文件
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": ["@babel/preset-env"],
            "plugins": [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          }
        },
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      {
        test: /\.(jpg|png|bmp|gif|svg)$/, use: [{
          loader: 'url-loader', options: {
            limit: 10,
            outputPath: 'images',
            publicPath: '/images'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
  ]
};
```

#### <font style="color:rgb(51, 51, 51);">src\index.html</font>
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack5</title>
</head>
<body>
+  <div id="root"></div>
</body>
</html>
```

#### <font style="color:rgb(51, 51, 51);">src\index.js</font>
```javascript
+import React from "react";
+import ReactDOM from "react-dom";
+ReactDOM.render("hello",document.getElementById("root"));
+
+function readonly(target,key,descriptor) {
+    descriptor.writable=false;
+}
+
+class Person{
+    @readonly PI=3.14;
+}
+let p1=new Person();
+p1.PI=3.15;
```

#### <font style="color:rgb(51, 51, 51);">.eslintrc.js</font>
```javascript
module.exports = {
    root: true, // 配置文件是可以有继承关系的
    parser:"babel-eslint", // 把源代码转成AST语法书的工具
    //指定解析器选项
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2015
    },
    //指定脚本的运行环境
    env: {
        browser: true,
    },
    // 启用的规则及其各自的错误级别
    rules: {
        "indent": "off",//缩进风格
        "quotes":  "off",//引号类型 
        "no-console": "error",//禁止使用console
    }
}
```

#### <font style="color:rgb(51, 51, 51);">airbnb</font>
+ [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

```bash
cnpm i eslint-config-airbnb eslint-loader eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks and eslint-plugin-jsx-a11y -D

```

<font style="color:rgb(51, 51, 51);">eslintrc.js</font>

```javascript
module.exports = {
    "parser":"babel-eslint",
    "extends":"airbnb", // 是集成或者说扩展自airhub的配置
    "rules":{
        "semi":"error",
        "no-console":"off",
        "linebreak-style":"off",
        "eol-last":"off"
        //"indent":["error",2]
    },
    "env":{
        "browser":true, // 支持浏览器
        "node":true // 支持node
    }
}
```

#### <font style="color:rgb(51, 51, 51);">自动修复</font>
+ <font style="color:rgb(51, 51, 51);">安装vscode的</font>[eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)<font style="color:rgb(51, 51, 51);">插件</font>
+ <font style="color:rgb(51, 51, 51);">配置自动修复参数</font>

<font style="color:rgb(51, 51, 51);">.vscode\settings.json</font>

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // 保定自动修复
  }
}
```

### <font style="color:rgb(51, 51, 51);">sourcemap</font>
+ [sourcemap](https://webpack.js.org/configuration/devtool/#root)<font style="color:rgb(51, 51, 51);">是为了解决开发代码与实际运行代码不一致时帮助我们</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">debug</font><font style="color:rgb(51, 51, 51);">到原始开发代码的技术</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">webpack</font><font style="color:rgb(51, 51, 51);">通过配置可以自动给我们</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">source maps</font><font style="color:rgb(51, 51, 51);">文件，</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">map</font><font style="color:rgb(51, 51, 51);">文件是一种对应编译文件和源文件的方法</font>
+ [whyeval](https://github.com/webpack/docs/wiki/build-performance#sourcemaps)<font style="color:rgb(51, 51, 51);">可以单独缓存map，重建性能更高</font>
+ [source-map](https://github.com/mozilla/source-map)

#### <font style="color:rgb(51, 51, 51);">配置项</font>
| **<font style="color:rgb(51, 51, 51);">类型</font>** | **<font style="color:rgb(51, 51, 51);">含义</font>** |
| :--- | :--- |
| <font style="color:rgb(51, 51, 51);">source-map</font> | <font style="color:rgb(51, 51, 51);">原始代码 最好的sourcemap质量有完整的结果，但是会很慢</font> |
| <font style="color:rgb(51, 51, 51);">eval-source-map</font> | <font style="color:rgb(51, 51, 51);">原始代码 同样道理，但是最高的质量和最低的性能</font> |
| <font style="color:rgb(51, 51, 51);">cheap-module-eval-source-map</font> | <font style="color:rgb(51, 51, 51);">原始代码（只有行内） 同样道理，但是更高的质量和更低的性能</font> |
| <font style="color:rgb(51, 51, 51);">cheap-eval-source-map</font> | <font style="color:rgb(51, 51, 51);">转换代码（行内） 每个模块被eval执行，并且sourcemap作为eval的一个dataurl</font> |
| <font style="color:rgb(51, 51, 51);">eval</font> | <font style="color:rgb(51, 51, 51);">生成代码 每个模块都被eval执行，并且存在@sourceURL,带eval的构建模式能cache SourceMap</font> |
| <font style="color:rgb(51, 51, 51);">cheap-source-map</font> | <font style="color:rgb(51, 51, 51);">转换代码（行内） 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用</font> |
| <font style="color:rgb(51, 51, 51);">cheap-module-source-map</font> | <font style="color:rgb(51, 51, 51);">原始代码（只有行内） 与上面一样除了每行特点的从loader中进行映射</font> |


#### <font style="color:rgb(51, 51, 51);">关键字</font>
+ <font style="color:rgb(51, 51, 51);">看似配置项很多， 其实只是五个关键字eval、source-map、cheap、module和inline的任意组合</font>
+ <font style="color:rgb(51, 51, 51);">关键字可以任意组合，但是有顺序要求</font>

| **<font style="color:rgb(51, 51, 51);">关键字</font>** | **<font style="color:rgb(51, 51, 51);">含义</font>** |
| :--- | :--- |
| <font style="color:rgb(51, 51, 51);">eval</font> | <font style="color:rgb(51, 51, 51);">使用eval包裹模块代码</font> |
| <font style="color:rgb(51, 51, 51);">source-map</font> | <font style="color:rgb(51, 51, 51);">产生.map文件</font> |
| <font style="color:rgb(51, 51, 51);">cheap</font> | <font style="color:rgb(51, 51, 51);">不包含列信息（关于列信息的解释下面会有详细介绍)也不包含loader的sourcemap</font> |
| <font style="color:rgb(51, 51, 51);">module</font> | <font style="color:rgb(51, 51, 51);">包含loader的sourcemap（比如jsx to js ，babel的sourcemap）,否则无法定义源文件</font> |
| <font style="color:rgb(51, 51, 51);">inline</font> | <font style="color:rgb(51, 51, 51);">将.map作为DataURI嵌入，不单独生成.map文件</font> |


#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>
```javascript
module.exports = {
  devtool: 'source-map', // 行+列+babel映射
  devtool: 'eval-source-map',
  devtool: 'cheap-module-eval-source-map',
  devtool: 'cheap-eval-source-map',
  devtool: 'eval', // 提高缓存效率
  devtool: 'cheap-source-map',
  devtool: 'cheap-module-source-map', // 行映射+babel映射
  devtool: 'inline-source-map',
}
```

#### <font style="color:rgb(51, 51, 51);">组合规则</font>
+ <font style="color:rgb(51, 51, 51);">[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map</font>
+ <font style="color:rgb(51, 51, 51);">source-map 单独在外部生成完整的sourcemap文件，并且在目标文件里建立关联,能提示错误代码的准确原始位置</font>
+ <font style="color:rgb(51, 51, 51);">inline-source-map 以base64格式内联在打包后的文件中，内联构建速度更快,也能提示错误代码的准确原始位置</font>
+ <font style="color:rgb(51, 51, 51);">hidden-source-map 会在外部生成sourcemap文件,但是在目标文件里没有建立关联,不能提示错误代码的准确原始位置</font>
+ <font style="color:rgb(51, 51, 51);">eval-source-map 会为每一个模块生成一个单独的sourcemap文件进行内联，并使用</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">eval</font><font style="color:rgb(51, 51, 51);">执行</font>
+ <font style="color:rgb(51, 51, 51);">nosources-source-map 也会在外部生成sourcemap文件,能找到源始代码位置，但源代码内容为空</font>
+ <font style="color:rgb(51, 51, 51);">cheap-source-map 外部生成sourcemap文件,不包含列和loader的map</font>
+ <font style="color:rgb(51, 51, 51);">cheap-module-source-map 外部生成sourcemap文件,不包含列的信息但包含loader的map</font>

source-map

![](https://cdn.nlark.com/yuque/0/2021/png/804048/1623816624115-77437689-52c3-4af7-9179-8b5f0fdd6146.png)

src/index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
debugger
ReactDOM.render(<h1>hello</h1>, document.getElementById('root'))
```

当设置devtool: 'source-map',

![](https://cdn.nlark.com/yuque/0/2021/png/804048/1623806501130-6d9efe03-6a93-4937-a968-263f3205977a.png)

当设置devtool: 'cheap-source-map',

![](https://cdn.nlark.com/yuque/0/2021/png/804048/1623806553063-b693f152-eb8a-4aa8-a217-bfd5198aa3b6.png)

当设置devtool: 'cheap-module-source-map',

![](https://cdn.nlark.com/yuque/0/2021/png/804048/1623806625543-301c116e-de98-4cbb-97c4-248c6c539854.png)

src/index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
console.log(d); // 写一个错误代码
ReactDOM.render(<h1>hello</h1>, document.getElementById('root'))
```

当设置devtool: 'source-map',

![](https://cdn.nlark.com/yuque/0/2021/png/804048/1623806880437-41fbf12b-b388-48c8-a929-e62366ebee55.png)

当设置devtool: 'cheap-module-source-map',

![](https://cdn.nlark.com/yuque/0/2021/png/804048/1623816490130-5806d821-511a-4e8b-93c8-e21e26f7f555.png)

当设置devtool: 'hidden-source-map', npm run build

index.js

```javascript
console.log(d);
```

会生成map文件，但main.js中没有map信息

![](https://cdn.nlark.com/yuque/0/2021/png/804048/1623817266179-6ad1e895-0229-4915-a366-d16f3c332e11.png)

#### <font style="color:rgb(51, 51, 51);">最佳实践</font>
#### <font style="color:rgb(51, 51, 51);">最佳实践-开发环境</font>
+ <font style="color:rgb(51, 51, 51);">我们在开发环境对sourceMap的要求是：速度快，调试更友好</font>
+ <font style="color:rgb(51, 51, 51);">要想速度快 推荐</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">eval-cheap-source-map</font>
+ <font style="color:rgb(51, 51, 51);">如果想调试更友好</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">cheap-module-source-map</font>
+ <font style="color:rgb(51, 51, 51);">折中的选择就是 </font>**<font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">eval-source-map</font>**

#### <font style="color:rgb(51, 51, 51);">最佳实践-生产环境</font>
+ <font style="color:rgb(51, 51, 51);">首先排除内联，因为一方面我们了隐藏源代码，另一方面要减少文件体积</font>
+ <font style="color:rgb(51, 51, 51);">要想调试友好 </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">source-map>cheap-source-map/cheap-module-source-map>hidden-source-map/nosources-sourcemap</font>
+ <font style="color:rgb(51, 51, 51);">要想速度快 优先选择</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">cheap</font>
+ <font style="color:rgb(51, 51, 51);">折中的选择就是 </font>**<font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">hidden-source-map</font>**

#### <font style="color:rgb(51, 51, 51);">调试代码</font>
#### <font style="color:rgb(51, 51, 51);">调试代码-测试环境调试</font>
+ [source-map-dev-tool-plugin](https://www.webpackjs.com/plugins/source-map-dev-tool-plugin/)<font style="color:rgb(51, 51, 51);">实现了对 source map 生成，进行更细粒度的控制</font>
    - <font style="color:rgb(51, 51, 51);">filename (string)：定义生成的 source map 的名称（如果没有值将会变成 inlined）。</font>
    - <font style="color:rgb(51, 51, 51);">append (string)：在原始资源后追加给定值。通常是 #sourceMappingURL 注释。[url] 被替换成 source map 文件的 URL</font>
+ <font style="color:rgb(51, 51, 51);">市面上流行两种形式的文件指定，分别是以 </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">@</font><font style="color:rgb(51, 51, 51);"> 和 </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">#</font><font style="color:rgb(51, 51, 51);">符号开头的,</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">@</font><font style="color:rgb(51, 51, 51);">开头的已经被废弃</font>

![](https://cdn.nlark.com/yuque/0/2021/png/804048/1623624750693-4a0506c5-8eb8-4b8c-8795-d8b1a1adcbb0.png)

<font style="color:rgb(51, 51, 51);">webpack.config.js</font>

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
+const FileManagerPlugin = require('filemanager-webpack-plugin'); // npm i filemanager-webpack-plugin -D
+const webpack = require('webpack');

module.exports = {
  mode: 'none',
+  devtool: false, // 关掉source-map自动挡
  entry: './src/index.js',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: { fix: true },
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env',
              {
                useBuiltIns: 'usage', // 按需要加载polyfill
                corejs: {
                  version: 3, // 指定core-js版本
                },
                targets: { // 指定要兼容到哪些版本的浏览器
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ], '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
          },
        },
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
      {
        test: /\.(jpg|png|bmp|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            esModule: false,
            name: '[hash:10].[ext]',
            limit: 8 * 1024,
            outputPath: 'images',
            publicPath: '/images',
          },
        }],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
+   new webpack.SourceMapDevToolPlugin({ // 设置source-map手动挡
+     filename:'[file].map',// file=main.js => main.js.map
+      append:`\n//# sourceMappingURL=http://127.0.0.1:8080/[url]` //url=main.js.map
+    }),
+    new FileManagerPlugin({
+      events:{
+        onEnd:{
+          copy:[
+            {
+              source:'./dist/*.map',
+              destination:path.resolve('maps')
+            }
+          ],
+          delete:['./dist/*.map']
+        }
+      }
+    }) 
  ],
};
```

src/index.js

```javascript
var d = 1;
debugger
console.log(d);
```

新建maps文件夹，通过http-server启动一个静态服务，默认端口8080，执行npm run build，本地打开打包后的index.html

main.js文件可以根据map映射信息找到maps文件夹中的映射文件

![](https://cdn.nlark.com/yuque/0/2021/png/804048/1623818650801-c09ae165-1155-450a-818b-e761349c92d8.png)

#### <font style="color:rgb(51, 51, 51);">调试代码-生产环境调试</font>
+ <font style="color:rgb(51, 51, 51);">webpack打包仍然生成sourceMap，但是将map文件挑出放到本地服务器，将不含有map文件的部署到服务器</font>

<font style="color:rgb(51, 51, 51);">webpack.config.js</font>

```javascript
const path = require('path');

+const FileManagerPlugin = require('filemanager-webpack-plugin');
+const webpack = require('webpack');

module.exports = {
+  devtool: 'hidden-source-map',
  },
  plugins: [
+    new FileManagerPlugin({
+      events:{
+        onEnd:{
+          copy:[
+            {
+              source:'./dist/*.map',
+              destination:path.resolve('maps')
+            }
+          ],
+          delete:['./dist/*.map']
+        }
+      }
+    }) 
  ],
};
```

<font style="color:rgb(51, 51, 51);">src/index.js</font>

```javascript
var d = 1;
debugger
console.log(d);
```

<font style="color:rgb(51, 51, 51);">设置浏览器</font>

![](https://cdn.nlark.com/yuque/0/2021/png/804048/1623818913616-158bb2e0-f1b6-46de-af71-5cf443d77afd.png)

![](https://cdn.nlark.com/yuque/0/2021/png/804048/1623818973177-0f41e9c8-2a93-4594-bedb-37f418f3e089.png)

找到main.js添加map对应地址 [http://localhost:8080/main.js.map](http://localhost:8080/main.js.map)，就能在线调试代码了

![](https://cdn.nlark.com/yuque/0/2021/png/804048/1623624822456-6cb673e2-ed89-4e31-905b-a00c21151683.png)



### <font style="color:rgb(51, 51, 51);">打包第三方类库</font>
#### <font style="color:rgb(51, 51, 51);">直接引入</font>
```javascript
import _ from 'lodash'; //  npm i lodash -S
alert(_.join(['a','b','c'],'@'));
```

会打包进main.js

#### <font style="color:rgb(51, 51, 51);">插件引入</font>
+ <font style="color:rgb(51, 51, 51);">webpack配置ProvidePlugin后，在使用时将不再需要import和require进行引入，直接使用即可</font>
+ <font style="color:rgb(51, 51, 51);">_ 函数会自动添加到当前模块的上下文，无需显示声明</font>

```javascript
+ new webpack.ProvidePlugin({
+     _:'lodash'
+ })
```

> <font style="color:rgb(119, 119, 119);">没有全局的</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">$</font><font style="color:rgb(119, 119, 119);">函数，所以导入依赖全局变量的插件依旧会失败</font>
>

#### <font style="color:rgb(51, 51, 51);">expose-loader</font>
+ <font style="color:rgb(51, 51, 51);">expose-loader可以把模块添加到全局对象上，在调试的时候比较有用</font>
+ <font style="color:rgb(51, 51, 51);">The expose loader adds modules to the global object. This is useful for debugging</font>
+ <font style="color:rgb(51, 51, 51);">不需要任何其他的插件配合，只要将下面的代码添加到所有的</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">loader</font><font style="color:rgb(51, 51, 51);">之前</font>

<font style="color:rgb(51, 51, 51);">安装：</font>npm i expose-loader -D

```json
  module: {
    rules: [
+      { // 特别多配行内
+          test: require.resolve('lodash'), //如果你只想找模块路径，而不想执行并且加载它的的话require.resolvec:\aproject\zhufengwebpack202106\1.usage\node_modules\lodash\lodash.js
+          loader: 'expose-loader',
+          options: {
+              exposes: {
+                  globalName: '_',
+                  override: true,
+              },
+          },
+      }
    ]
  }
```

只需在src/index.js require一次，就可以在全局使用了

```javascript
import _ from 'lodash';
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"> -->
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
    <script>
        setTimeout(() => {
            console.log(window._);
        });
    </script>
</body>
</html>
```

#### <font style="color:rgb(51, 51, 51);">externals</font>
<font style="color:rgb(51, 51, 51);">如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置externals</font>

<font style="color:rgb(51, 51, 51);">index.js</font>

```javascript
const jQuery = require("jquery"); // npm i jquery -S
console.log(jQuery);
正常也会打包到main.js 导致文件体积变大
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
+    <script defer src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script> 第一步引入库
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

webpack.config.js

```javascript
	//外部依赖 模块名:全局变量
  externals:{ 第二步配置externals
    lodash:'_',
    jquery:'jQuery', //当在模块中require("jquery")时，如果发现externals里有配置项，则不会打包jquery源文件到main.js里，而会直接从window.jQuery取结果，相当于 let Query = window.jQuery 所以1.cdn引入的库，也需要2.require
  },
  module: {
```

#### <font style="color:rgb(51, 51, 51);">html-webpack-externals-plugin</font>
+ <font style="color:rgb(51, 51, 51);">外链CDN</font>

<font style="color:rgb(51, 51, 51);">安装</font>

```bash
npm i html-webpack-externals-plugin
```

```javascript
+const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
jquery案例
new HtmlWebpackExternalsPlugin(
  {
    externals: [
      {
        module: 'jquery',//模块名
        entry: 'dist/jquery.min.js',
        global: 'jQuery',
      },
    ],
  }
),
lodash案例
+new HtmlWebpackExternalsPlugin({
+    externals: [
+        {
+            module: 'lodash', // 模块名
+            entry: "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.20/lodash.js",
+            global: '_', // 全局变量名
+        },
+    ],
+}),
```

### <font style="color:rgb(51, 51, 51);">watch</font>
+ <font style="color:rgb(51, 51, 51);">当代码发生修改后可以自动重新编译</font>
+ <font style="color:rgb(51, 51, 51);">一遍用于 build，可以监听代码变化自动打包</font>
+ <font style="color:rgb(51, 51, 51);">devServer内置开启了watch，所以serve时不需要重复设置</font>

```javascript
module.exports = {
  //默认false,也就是不开启
  watch:true,
  //只有开启监听模式时，watchOptions才有意义
  watchOptions:{
      //默认为空，不监听的文件或者文件夹，支持正则匹配
      ignored:/node_modules/,
      //监听到变化发生后会等300ms再去执行，默认300ms
      aggregateTimeout:300,
      //判断文件是否发生变化是通过不停的询问文件系统指定议是有变化实现的，默认每秒问1000次
      poll:1000
  }
}
```

+ <font style="color:rgb(51, 51, 51);">webpack定时获取文件的更新时间，并跟上次保存的时间进行比对，不一致就表示发生了变化,poll就用来配置每秒问多少次</font>
+ <font style="color:rgb(51, 51, 51);">当检测文件不再发生变化，会先缓存起来，等待一段时间后之后再通知监听者，这个等待时间通过</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">aggregateTimeout</font><font style="color:rgb(51, 51, 51);">配置</font>
+ <font style="color:rgb(51, 51, 51);">webpack只会监听entry依赖的文件</font>
+ <font style="color:rgb(51, 51, 51);">我们需要尽可能减少需要监听的文件数量和检查频率，当然频率的降低会导致灵敏度下降</font>

### <font style="color:rgb(51, 51, 51);">添加商标 </font>
```javascript
+ new webpack.BannerPlugin('zs'),
```

### <font style="color:rgb(51, 51, 51);">拷贝静态文件</font>
+ [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin)<font style="color:rgb(51, 51, 51);">可以拷贝源文件到目标目录</font>

```javascript
npm i copy-webpack-plugin -D
```

```javascript
+const CopyWebpackPlugin = require('copy-webpack-plugin');
+new CopyWebpackPlugin({
+  patterns: [{
+    from: path.resolve(__dirname,'src/public'),//静态资源目录源地址
+    to: path.resolve(__dirname,'dist/public'), //目标地址，相对于output的path目录
+  }],
+}),
```

### <font style="color:rgb(51, 51, 51);">clean-webpack-plugin</font>
+ [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)<font style="color:rgb(51, 51, 51);">可以打包前先清空输出目录</font>

```javascript
npm i  clean-webpack-plugin -D
```

```javascript
+ const {CleanWebpackPlugin} = require('clean-webpack-plugin');
plugins:[
+ new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['**/*'],}) // 打包前清空输出目录
]
```

### <font style="color:rgb(51, 51, 51);">服务器代理</font>
<font style="color:rgb(51, 51, 51);">如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。</font>

#### <font style="color:rgb(51, 51, 51);">不修改路径</font>
+ <font style="color:rgb(51, 51, 51);">请求到 /api/users 现在会被代理到请求 </font>[http://localhost:3000/api/users。](http://localhost:3000/api/users%E3%80%82)

```javascript
devServer: {
  proxy: {
    "/api": 'http://localhost:3000' // /api开头的会被代理到3000端口
  }
}
```

创建3000端口服务 api.js

```javascript
let express = require('express');
let app = express();
app.get('/api/users',(req,res)=>{
    res.json({code:0,data:[{id:1}]});
});
app.listen(3000, () => {
    console.log('启动3000端口');
});

// node api.js启动
```

访问

```javascript
访问 http://localhost:3000/api/users 
访问 http://localhost:8080/api/users 说明代理成功了
都会返回
{"code":0,"data":[{"id":1}]}

```

#### <font style="color:rgb(51, 51, 51);">修改路径</font>
如果后端接口没有/api

```javascript
// api.js
let express = require('express');
let app = express();
app.get('/users',(req,res)=>{
    res.json({code:0,data:[{id:1}]});
});
app.listen(3000, () => {
    console.log('启动3000端口');
});
// node api.js
```



```javascript
devServer: {
  proxy: {
      "/api": {
       target: 'http://localhost:3000', // http:localhost:8080/api/users => http://localhost:3000/users
       pathRewrite:{"^/api":""}        
      }            
  }
}
```

真正的后端接口一般没有/api，如果前端接口有/api，比如axios.get('/api/users')，可以通过nginx做路径重写，从而实现和pathRewrite一样的效果。

#### <font style="color:rgb(51, 51, 51);">before after</font>
<font style="color:rgb(51, 51, 51);">before 在 webpack-dev-server 静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，或者实现简单的数据 mock。</font>

```javascript
devServer: {
  // proxy: {
  //   "/api": 'http://localhost:3000', // /api开头的会被代理到3000端口
  // },
  before(app){
    app.get('/api/users', function(req, res) { 
       res.json([{id:1,name:'zs'}])
    })
  }
}
// 访问http://localhost:8080/api/users 一样可以返回数据
```

#### <font style="color:rgb(51, 51, 51);">webpack-dev-middleware</font>
[webpack-dev-middleware](https://www.npmjs.com/package/)<font style="color:rgb(51, 51, 51);">就是在 Express 中提供 </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">webpack-dev-server</font><font style="color:rgb(51, 51, 51);"> 静态服务能力的一个中间件</font>

```javascript
npm install webpack-dev-middleware --save-dev
```

```javascript
const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackOptions = require('./webpack.config');
webpackOptions.mode = 'development';
const compiler = webpack(webpackOptions);
app.use(webpackDevMiddleware(compiler, {}));
app.listen(3000);
```

+ <font style="color:rgb(51, 51, 51);">webpack-dev-server 的好处是相对简单，直接安装依赖后执行命令即可</font>
+ <font style="color:rgb(51, 51, 51);">而使用</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">webpack-dev-middleware</font><font style="color:rgb(51, 51, 51);">的好处是可以在既有的 Express 代码基础上快速添加 webpack-dev-server 的功能，同时利用 Express 来根据需要添加更多的功能，如 mock 服务、代理 API 请求等</font>

<font style="color:rgb(51, 51, 51);"></font>

webpack5 有serve webpack-dev-middleware还有用吗 有用

webpack4 webpack-dev-server

webpack5  webpack serve 调用的就是webpack-dev-server,内部就是用的webpack-dev-middleware

## <font style="color:rgb(51, 51, 51);">生产环境</font>
### <font style="color:rgb(51, 51, 51);">提取CSS</font>
+ <font style="color:rgb(51, 51, 51);">因为CSS的下载和JS可以并行,当一个HTML文件很大的时候，我们可以把CSS单独提取出来加载</font>

#### <font style="color:rgb(51, 51, 51);">安装</font>
+ [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

```bash
cnpm install --save-dev mini-css-extract-plugin
```

#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
+const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
+    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
+      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
+      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
+      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
       { test: /\.(jpg|png|bmp|gif|svg)$/, 
        use: [{
          loader: 'url-loader', 
          options: {
            esModule: false,
            name: '[hash:10].[ext]',
            limit: 8*1024
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
+    new MiniCssExtractPlugin({
+      filename: '[name].css'
+    })
  ]
};
```

#### 
#### src/index.js
```javascript
import './index.css'
```

#### src/index.css
```css
@import './bg.css';
body{
    color:red;
}
```

#### src/bg.css
```css
body {
    background-color: green;
}

```

### <font style="color:rgb(51, 51, 51);">指定图片和CSS目录</font>
#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      { test: /\.(jpg|png|bmp|gif|svg)$/, 
        use: [{
          loader: 'url-loader', 
          options: {
            esModule: false,
            name: '[hash:10].[ext]',
            limit: 8*1024,
+           outputPath: 'images',
+           publicPath: '/images'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({
+      filename: 'css/[name].css'
    }),
  ]
};
```

#### src/index.js
```javascript
import './index.css'
```

#### src/index.css
```css
@import './bg.css';
body{
    color:red;
}
#root {
    width: 200px;
    height: 200px;
    background-image: url('./assets/1.jpg');
}
```

#### src/bg.css
```css
body {
    background-color: green;
}

```

### <font style="color:rgb(51, 51, 51);"></font>
### <font style="color:rgb(51, 51, 51);">hash、chunkhash和contenthash</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">文件指纹</font><font style="color:rgb(51, 51, 51);">是指打包后输出的文件名和后缀</font>
+ <font style="color:rgb(51, 51, 51);">hash一般是结合CDN缓存来使用，通过webpack构建之后，生成对应文件名自动带上对应的MD5值。如果文件内容改变的话，那么对应文件哈希值也会改变，对应的HTML引用的URL地址也会改变，触发CDN服务器从源服务器上拉取对应数据，进而更新本地缓存。</font>

<font style="color:rgb(51, 51, 51);">指纹占位符</font>

| **<font style="color:rgb(51, 51, 51);">占位符名称</font>** | **<font style="color:rgb(51, 51, 51);">含义</font>** |
| :--- | :--- |
| <font style="color:rgb(51, 51, 51);">ext</font> | <font style="color:rgb(51, 51, 51);">资源后缀名</font> |
| <font style="color:rgb(51, 51, 51);">name</font> | <font style="color:rgb(51, 51, 51);">文件名称</font> |
| <font style="color:rgb(51, 51, 51);">path</font> | <font style="color:rgb(51, 51, 51);">文件的相对路径</font> |
| <font style="color:rgb(51, 51, 51);">folder</font> | <font style="color:rgb(51, 51, 51);">文件所在的文件夹</font> |
| <font style="color:rgb(51, 51, 51);">hash</font> | <font style="color:rgb(51, 51, 51);">每次webpack构建时生成一个唯一的hash值</font> |
| <font style="color:rgb(51, 51, 51);">chunkhash</font> | <font style="color:rgb(51, 51, 51);">根据chunk生成hash值，来源于同一个chunk，则hash值就一样</font> |
| <font style="color:rgb(51, 51, 51);">contenthash</font> | <font style="color:rgb(51, 51, 51);">根据内容生成hash值，文件内容相同hash值就相同</font> |


#### <font style="color:rgb(51, 51, 51);">hash</font>
![](https://cdn.nlark.com/yuque/0/2021/png/804048/1623970002237-61672a44-4b65-44bb-b2de-56e52dd15d60.png)

```javascript
function createHash(){
   return  require('crypto').createHash('md5');
}
let entry = {
    entry1:'entry1',
    entry2:'entry2'
}
let entry1 = 'require depModule1';//模块entry1
let entry2 = 'require depModule2';//模块entry2

let depModule1 = 'depModule1';//模块depModule1
let depModule2 = 'depModule2';//模块depModule2
//如果都使用hash的话，因为这是工程级别的，即每次修改任何一个文件，所有文件名的hash至都将改变。所以一旦修改了任何一个文件，整个项目的文件缓存都将失效
let hash =  createHash()
.update(entry1)
.update(entry2)
.update(depModule1)
.update(depModule2)
.digest('hex');
console.log('hash',hash)
//chunkhash根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。
//在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响
let entry1ChunkHash = createHash()
.update(entry1)
.update(depModule1).digest('hex');;
console.log('entry1ChunkHash',entry1ChunkHash);

let entry2ChunkHash = createHash()
.update(entry2)
.update(depModule2).digest('hex');;
console.log('entry2ChunkHash',entry2ChunkHash);
// contenthash只跟内容有关,内容不变,ContentHash不变,内容如果变了,contentHash就会改
let entry1File = entry1+depModule1;
let entry1ContentHash = createHash()
.update(entry1File).digest('hex');;
console.log('entry1ContentHash',entry1ContentHash);

let entry2File = entry2+depModule2; // 极端例子：entry2,require("./depModule2")' -> require("./depModule2"';depModule2,depModule2 -> )depModule2;contenthash不变
let entry2ContentHash = createHash()
.update(entry2File).digest('hex');;
console.log('entry2ContentHash',entry2ContentHash);
```

#### <font style="color:rgb(51, 51, 51);">hash</font>
+ <font style="color:rgb(51, 51, 51);">Hash 是整个项目的hash值，其根据每次编译内容计算得到，每次编译之后都会生成新的hash,即修改任何文件都会导致所有文件的hash发生改变</font>

```javascript
module.exports = {
+  entry: {
+    main: './src/index.js',
+    vender:['lodash']
+  },
  output:{
     path:path.resolve(__dirname,'dist'),
+    filename:'[name].[hash].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
+      filename: "css/[name].[hash].css"
    })
  ]
};
```

#### <font style="color:rgb(51, 51, 51);">chunkhash</font>
+ <font style="color:rgb(51, 51, 51);">chunkhash 采用hash计算的话，每一次构建后生成的哈希值都不一样，即使文件内容压根没有改变。这样子是没办法实现缓存效果，我们需要换另一种哈希值计算方式，即chunkhash</font>
+ <font style="color:rgb(51, 51, 51);">chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响</font>

```javascript
module.exports = {
  entry: {
    main: './src/index.js',
    vender:['lodash']
  },
  output:{
    path:path.resolve(__dirname,'dist'),
+   filename:'[name].[chunkhash].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
+      filename: "css/[name].[chunkhash:6].css"
    })
  ]
};
```

多入口可以使用chunkhash

```javascript
// webpack.config.js
entry: {
    entry1: './src/entry1.js',
    entry2: './src/entry2.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    filename: '[chunkhash:8].js',
    // publicPath: '/'
  },
    
 // entry1.js
 let depModule1 = require('./depModule1');
console.log(depModule1);
 // entry2.js
 let depModule2 = require('./depModule2');
console.log(depModule2);
 // depModule1.js
module.exports = "depModule1";
 // depModule2.js
 module.exports = "depModule2";
```

#### <font style="color:rgb(51, 51, 51);">contenthash</font>
+ <font style="color:rgb(51, 51, 51);">使用chunkhash存在一个问题，就是当在一个JS文件中引入CSS文件，编译后它们的hash是相同的，而且只要js文件发生改变 ，关联的css文件hash也会改变,这个时候可以使用</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">mini-css-extract-plugin</font><font style="color:rgb(51, 51, 51);">里的</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">contenthash</font><font style="color:rgb(51, 51, 51);">值，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建</font>

```javascript
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
+      filename: "css/[name].[contenthash].css"
    })
  ],
};
```

#### 如何选择
从上往下 生成的效率越来越低,成本越来越高影响的范围越来越小,精度越越细

文件变化的概率特别小,可以选择contentHash

每次都要变hash

hash

chunkhash

contenthash

#### 打包后的一个文件和chunk什么关系？
一个入口模块和它依赖的模块会组成一个代码块

一个代码块就会对应一个chunk,一般来说一个chunk就会对应一个文件

二般情况：如果进行了代码分割，例如main这个代码块生成了二个文件,main.js main.css

### <font style="color:rgb(51, 51, 51);">CSS兼容性</font>
+ <font style="color:rgb(51, 51, 51);">为了浏览器的兼容性，有时候我们必须加入-webkit,-ms,-o,-moz这些前缀</font>
    - <font style="color:rgb(51, 51, 51);">Trident内核：主要代表为IE浏览器, 前缀为-ms</font>
    - <font style="color:rgb(51, 51, 51);">Gecko内核：主要代表为Firefox, 前缀为-moz</font>
    - <font style="color:rgb(51, 51, 51);">Presto内核：主要代表为Opera, 前缀为-o</font>
    - <font style="color:rgb(51, 51, 51);">Webkit内核：产要代表为Chrome和Safari, 前缀为-webkit</font>
+ <font style="color:rgb(51, 51, 51);">伪元素</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">::placeholder</font><font style="color:rgb(51, 51, 51);">可以选择一个表单元素的占位文本，它允许开发者和设计师自定义占位文本的样式。</font>

#### <font style="color:rgb(51, 51, 51);">安装</font>
+ [https://caniuse.com/](https://caniuse.com/)
+ postcss-loader可以使用PostCSS处理CSS
+ postcss-preset-env把现代的CSS转换成大多数浏览器能理解的
+ PostCSS Preset Env已经包含了autoprefixer和browsers选项

```bash
npm i postcss-loader postcss-preset-env -D
```

#### <font style="color:rgb(51, 51, 51);">postcss.config.js</font>
```javascript
let postcssPresetEnv = require('postcss-preset-env');
module.exports={
    plugins:[postcssPresetEnv({
        browsers: 'last 5 version'
    })]
}
```

#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
+     { test: /\.css$/, use: ['style-loader', 'css-loader','post-css'] },
+     { test: /\.less$/, use: ['style-loader','css-loader','post-css','less-loader'] },
+     { test: /\.scss$/, use: ['style-loader','css-loader','post-css','sass-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
};
```

#### <font style="color:rgb(51, 51, 51);">src\index.css</font>
```css
@import "./bg.css";
body{
    color:red;
}
#logo{
    width:540px;
    height:258px;
    background-image: url(./assets/logo.png);
    background-size: cover;
}
+::placeholder {
+    color: red;
+}
```

#### <font style="color:rgb(51, 51, 51);">src\index.html</font>
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack5</title>
</head>
<body>
  <div id="less-container">less-container</div>
  <div id="sass-container">sass-container</div>
  <div id="logo"></div>
+  <input placeholder="请输入"/>
</body>
</html>
```

#### <font style="color:rgb(51, 51, 51);">package.json</font>
+ [browserslist](https://github.com/browserslist/browserslist)
+ [browserslist-example](https://github.com/browserslist/browserslist-example)
+ <font style="color:rgb(51, 51, 51);">.browserslistrc</font>

```json
{
+  "browserslist": {
+    "development": [
+      "last 1 chrome version",
+      "last 1 firefox version",
+      "last 1 safari version"
+    ],
+    "production": [
+      ">0.2%"
+    ]
+  }
+}
```

### <font style="color:rgb(51, 51, 51);">压缩JS、CSS和HTML</font>
+ [optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)<font style="color:rgb(51, 51, 51);">是一个优化和压缩CSS资源的插件</font>
+ [terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin)<font style="color:rgb(51, 51, 51);">是一个优化和压缩JS资源的插件</font>

<font style="color:rgb(51, 51, 51);">webpack.config.js</font>

```bash
npm i optimize-css-assets-webpack-plugin -D
```

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
+const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
+const TerserPlugin = require('terser-webpack-plugin'); // 压缩js 支持es6 uglifyjs不支持es6所以不用了 内置了不用npm安装

module.exports = {
+  mode: 'none', // 设置为none 要不然会自带一些插件。如果设为production自带了这些插件，不用自己配了
  devtool: false,
  entry: './src/index.js',
+  optimization: {
+    minimize: true, // 启动最小化
+    minimizer: [ // 最小化的插件 TerserPlugin
+      new TerserPlugin(),
+    ],
+  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: { fix: true },
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env',
              {
                useBuiltIns: 'usage'
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ], '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
          },
        },
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
      {
        test: /\.(jpg|png|bmp|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            esModule: false,
            name: '[hash:10].[ext]',
            limit: 8 * 1024,
            outputPath: 'images',
            publicPath: '/images',
          },
        }],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: './src/index.html',
+     minify: {  
+        collapseWhitespace: true, // 移除注释
+        removeComments: true // 压缩空格
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
+    new OptimizeCssAssetsWebpackPlugin(),
  ],
};
```

### <font style="color:rgb(51, 51, 51);">图片压缩（不常用，不好控制）</font>
+ [image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader)<font style="color:rgb(51, 51, 51);">可以帮助我们对图片进行压缩和优化</font>

<font style="color:rgb(51, 51, 51);">用的不多，一般都是提前确定大小和压缩</font>

```bash
npm install image-webpack-loader --save-dev
```

```javascript
{
          test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
          use: [
            'url-loader',
+           {
+             loader: 'image-webpack-loader',
+             options: {
+               mozjpeg: {
+                 progressive: true,
+                 quality: 65
+               },
+               optipng: {
+                 enabled: false,
+               },
+               pngquant: {
+                 quality: '65-90',
+                 speed: 4
+               },
+               gifsicle: {
+                 interlaced: false,
+               },
+               webp: {
+                 quality: 75
+               }
+             }
+           }
          ]
        }
```

### <font style="color:rgb(51, 51, 51);">px 自动转成rem</font>
+ [lib-flexible](https://github.com/amfe/lib-flexible)<font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">+ rem，实现移动端自适应</font>
+ [px2rem-loader](https://www.npmjs.com/package/px2rem-loader)<font style="color:rgb(51, 51, 51);">自动将px转换为rem</font>
+ [px2rem](https://github.com/songsiqi/px2rem)
+ <font style="color:rgb(51, 51, 51);">页面渲染时计算根元素的</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">font-size</font><font style="color:rgb(51, 51, 51);">值</font>
+ vw兼容性越来越好了，vw 本身就是一个百分比,就是一个动态单位

#### <font style="color:rgb(51, 51, 51);">安装</font>
```bash
cnpm i px2rem-loader lib-flexible -D
```

#### <font style="color:rgb(51, 51, 51);">src/index.html</font>
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>主页</title>
    <script>
      let docEle = document.documentElement;
      function setRemUnit () {
        //设置根元素的font-size值=屏幕宽度/10  750/10=75  375/10=37.5px 10rem 375px
        docEle.style.fontSize = docEle.clientWidth / 10 + 'px'; //1rem=真正应该等于多少像素
      }
      setRemUnit();
      window.addEventListener('resize', setRemUnit);
    </script>
</head>
<body>
    <div id="root"></div>
</body>
```

#### <font style="color:rgb(51, 51, 51);">src/index.css</font>
```css
*{
    padding: 0;
    margin: 0;
}
#root{	
    width:750px;
    height:750px;
    border:1px solid red;
    box-sizing: border-box;
    background-color: green;
}
```

#### <font style="color:rgb(51, 51, 51);">webpack.config.js</font>
```javascript
 {
      test:/\.css$/,
        use:[{
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                {
+                    loader:'px2rem-loader',
+                    options:{
+                        remUnit:75, //规定一个REM单位是75px
+                        remPrecesion:8 //计算REM的精度,保留几位小数
+                    }
+                }]
+            },
```

## <font style="color:rgb(51, 51, 51);">polyfill</font>
+ <font style="color:rgb(51, 51, 51);"></font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">@babel/preset-env</font><font style="color:rgb(51, 51, 51);">会根据预设的浏览器兼容列表从stage-4选取必须的plugin，也就是说，不引入别的stage-x，@babel/preset-env将只支持到stage-4</font>
+ <font style="color:rgb(51, 51, 51);">三个概念</font>
    - <font style="color:rgb(51, 51, 51);">最新ES 语法：比如，箭头函数</font>
    - <font style="color:rgb(51, 51, 51);">最新ES API：，比如，Promise</font>
    - <font style="color:rgb(51, 51, 51);">最新ES 实例方法：比如，String.prototype.includes</font>

### <font style="color:rgb(51, 51, 51);">babel-polyfill</font>
+ <font style="color:rgb(51, 51, 51);">Babel默认只转换新的javascript语法，而不转换新的API，比如 Iterator, Generator, Set, Maps, Proxy, Reflect,Symbol,Promise 等全局对象。以及一些在全局对象上的方法(比如 Object.assign)都不会转码。</font>
+ <font style="color:rgb(51, 51, 51);">比如说，ES6在Array对象上新增了</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">Array.form</font><font style="color:rgb(51, 51, 51);">方法，Babel就不会转码这个方法，如果想让这个方法运行，必须使用</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel-polyfill</font><font style="color:rgb(51, 51, 51);">来转换等</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel-polyfill</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">它是通过向全局对象和内置对象的prototype上添加方法来实现的。比如运行环境中不支持</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">Array.prototype.find</font><font style="color:rgb(51, 51, 51);">方法，引入</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">polyfill</font><font style="color:rgb(51, 51, 51);">, 我们就可以使用</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">es6</font><font style="color:rgb(51, 51, 51);">方法来编写了，但是缺点就是会造成全局空间污染</font>
+ [@babel/@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)<font style="color:rgb(51, 51, 51);">为每一个环境的预设</font>
+ <font style="color:rgb(51, 51, 51);">@babel/preset-env默认支持语法转化，需要开启</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">useBuiltIns</font><font style="color:rgb(51, 51, 51);">配置才能转化API和实例方法</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">useBuiltIns</font><font style="color:rgb(51, 51, 51);">可选值包括："usage" | "entry" | false, 默认为 false，表示不对 polyfills 处理，这个配置是引入 polyfills 的关键</font>

#### <font style="color:rgb(51, 51, 51);">安装</font>
```bash
npm i @babel/polyfill
```

#### <font style="color:rgb(51, 51, 51);">"useBuiltIns": false</font>
+ <font style="color:rgb(51, 51, 51);">"useBuiltIns": false 此时不对 polyfill 做操作。如果引入</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">@babel/polyfill</font><font style="color:rgb(51, 51, 51);">，则无视配置的浏览器兼容，引入所有的</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">polyfill</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">86.4 KiB</font>

```javascript
import '@babel/polyfill';
```

```javascript
{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [["@babel/preset-env", {
+                           useBuiltIns: false,
                        }], "@babel/preset-react"],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { legacy: true }],
                            ["@babel/plugin-proposal-class-properties", { loose: true }]
                        ]
                    }

                }
},
```

#### <font style="color:rgb(51, 51, 51);">"useBuiltIns": "entry"</font>
+ <font style="color:rgb(51, 51, 51);">在项目入口引入一次（多次引入会报错）</font>
+ <font style="color:rgb(51, 51, 51);">"useBuiltIns": "entry" 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill。需要在入口文件手动添加</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">import '@babel/polyfill'</font><font style="color:rgb(51, 51, 51);">，会自动根据 browserslist 替换成浏览器不兼容的所有 polyfill</font>
+ <font style="color:rgb(51, 51, 51);">这里需要指定 core-js 的版本, 如果 "corejs": 3, 则 import '@babel/polyfill' 需要改成</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">import 'core-js/stable';import 'regenerator-runtime/runtime';</font>
    - <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">corejs</font><font style="color:rgb(51, 51, 51);">默认是2,配置2的话需要单独安装</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">core-js@3</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">80.6 KiB</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">10.7 KiB</font>



```javascript
import '@babel/polyfill';
console.log(Array.from([]));
```

```javascript
{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [["@babel/preset-env", {
+               useBuiltIns: 'usage',
+               corejs: { version: 3 }
            }], "@babel/preset-react"],
            plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }]
            ]
        }
    }
},
```

### <font style="color:rgb(51, 51, 51);">babel-runtime</font>
+ <font style="color:rgb(51, 51, 51);">Babel为了解决全局空间污染的问题，提供了单独的包</font>[babel-runtime](https://babeljs.io/docs/en/babel-runtime)<font style="color:rgb(51, 51, 51);">用以提供编译模块的工具函数</font>
+ <font style="color:rgb(51, 51, 51);">简单说 </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel-runtime</font><font style="color:rgb(51, 51, 51);"> 更像是一种按需加载的实现，比如你哪里需要使用 Promise，只要在这个文件头部</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">import Promise from 'babel-runtime/core-js/promise'</font><font style="color:rgb(51, 51, 51);">就行了</font>

```bash
npm i babel-runtime -D

```

```javascript
import Promise from 'babel-runtime/core-js/promise';
const p = new Promise(()=> {

});
console.log(p);
```

### <font style="color:rgb(51, 51, 51);">babel-plugin-transform-runtime </font>
+ <font style="color:rgb(51, 51, 51);">@babel/plugin-transform-runtime插件是为了解决</font>
    - <font style="color:rgb(51, 51, 51);">多个文件重复引用相同helpers（帮助函数）-> 提取运行时</font>
    - <font style="color:rgb(51, 51, 51);">新API方法全局污染 -> 局部引入</font>
+ <font style="color:rgb(51, 51, 51);">启用插件</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel-plugin-transform-runtime</font><font style="color:rgb(51, 51, 51);">后，Babel就会使用</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel-runtime</font><font style="color:rgb(51, 51, 51);">下的工具函数</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel-plugin-transform-runtime</font><font style="color:rgb(51, 51, 51);">插件能够将这些工具函数的代码转换成</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">require</font><font style="color:rgb(51, 51, 51);">语句，指向为对</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel-runtime</font><font style="color:rgb(51, 51, 51);">的引用</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel-plugin-transform-runtime</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">就是可以在我们使用新 API 时自动</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">import babel-runtime</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">里面的</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">polyfill</font>
    - <font style="color:rgb(51, 51, 51);">当我们使用</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">async/await</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">时，自动引入</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel-runtime/regenerator</font>
    - <font style="color:rgb(51, 51, 51);">当我们使用 ES6 的静态事件或内置对象时，自动引入</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel-runtime/core-js</font>
    - <font style="color:rgb(51, 51, 51);">移除内联</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel helpers</font><font style="color:rgb(51, 51, 51);">并替换使用</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel-runtime/helpers</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(51, 51, 51);">来替换</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">corejs</font><font style="color:rgb(51, 51, 51);">默认是3,配置2的话需要单独安装</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">@babel/runtime-corejs2</font>

```bash
npm i @babel/runtime-corejs2 -D
```

```javascript
{
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env",'@babel/preset-react'],
            plugins: [
+              [
+                "@babel/plugin-transform-runtime",
+                {
+                  corejs: 2,//当我们使用 ES6 的静态事件或内置对象时自动引入 babel-runtime/core-js
+                  helpers: true,//移除内联babel helpers并替换使用babel-runtime/helpers 来替换
+                  regenerator: true,//是否开启generator函数转换成使用regenerator runtime来避免污染全局域
+                },
+              ],
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
          },
        },
      },
```

<font style="color:rgb(51, 51, 51);">corejs: 2 corejs 2=>false 131 KiB => 224 bytes</font>

```javascript
const p = new Promise(()=> {});
console.log(p);
```

<font style="color:rgb(51, 51, 51);">helpers true=>false 160 KiB=>150 KiB</font>

```javascript
class A {

}
class B extends A {

}
console.log(new B());
```

<font style="color:rgb(51, 51, 51);">regenerator false=>true B490 bytes->28.6 Ki</font>

```javascript
function* gen() {

}
console.log(gen());
```

### <font style="color:rgb(51, 51, 51);">最佳实践</font>
+ <font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel-runtime</font><font style="color:rgb(51, 51, 51);">适合在组件和类库项目中使用，而</font><font style="color:rgb(111, 89, 144);background-color:rgb(237, 237, 247);">babel-polyfill</font><font style="color:rgb(51, 51, 51);">适合在业务项目中使用。</font>

### <font style="color:rgb(51, 51, 51);">polyfill-service</font>
+ [polyfill.io](https://polyfill.io/v3/)<font style="color:rgb(51, 51, 51);">自动化的 JavaScript Polyfill 服务</font>
+ [polyfill.io](https://polyfill.io/v3/)<font style="color:rgb(51, 51, 51);">通过分析请求头信息中的 UserAgent 实现自动加载浏览器所需的 polyfills</font>

```javascript
<script src="https://polyfill.io/v3/polyfill.min.js"></script>
```

