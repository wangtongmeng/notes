## 1.基础知识

### 1.1 EMP

- [emp2](https://emp2.netlify.app/)是一个用于构建企业级微前端应用的框架。它允许您将大型前端应用程序分解为独立的、可独立开发、部署和维护的模块。这种模块化方法提高了可维护性和可扩展性，同时降低了开发复杂性

### 1.2 Module Federation

#### 1.2.1 动机

- Module Federation的动机是为了不同开发小组间共同开发一个或者多个应用
- 应用将被划分为更小的应用块，一个应用块，可以是比如头部导航或者侧边栏的前端组件，也可以是数据获取逻辑的逻辑组件
- 每个应用块由不同的组开发
- 应用或应用块共享其他其他应用块或者库

![img](https://img.zhufengpeixun.com/1608392171072)

#### 1.2.2 概念

- 使用Module Federation时，每个应用块都是一个独立的构建，这些构建都将编译为容器
- 容器可以被其他应用或者其他容器应用
- 一个被引用的容器被称为remote, 引用者被称为host，remote暴露模块给host, host则可以使用这些暴露的模块，这些模块被成为remote模块

![img](https://img.zhufengpeixun.com/1608722799323)

#### 1.2.3 配置参数

| 字段     | 类型   | 含义                                                         |
| :------- | :----- | :----------------------------------------------------------- |
| name     | string | 必传值，即输出的模块名，被远程引用时路径为${name}/${expose}  |
| filename | string | 指定导出的 remoteEntry 文件的名称。这个文件包含了模块联邦的运行时和引导代码 |
| remotes  | object | 定义其他应用程序的引用映射。这个参数是一个对象，键是别名，值是远程应用的 URL。当我们想在当前应用中引用其他应用的模块时，可以使用这个别名 |
| exposes  | object | 定义当前应用要暴露给其他应用的模块。这个参数是一个对象，键是别名，值是模块的相对路径。别名将用于其他应用在引用该模块时 |
| shared   | object | 定义哪些模块应该在应用程序之间共享。这个参数可以是一个数组，包含共享模块的名称，或者是一个对象，包含共享模块的名称及其配置选项。共享模块可以避免重复加载，从而减少应用的体积和加载时间 |

### 1.3 webpack-chain

- webpack-chain

  是一个用于创建和修改 Webpack 配置的 Node.js 库。它提供了一种直观的链式 API，允许您以可读的方式构建复杂的 Webpack 配置 这个库的主要目的是让您可以通过链式方法调用轻松地对 Webpack 配置进行更改，而无需直接操作配置对象。这使得配置更加可读和易于维护。以下是

   

  ```
  webpack-chain
  ```

   

  的一些主要特性

  - 链式 API：`webpack-chain` 使用了流行的链式 API 设计模式，允许您通过链式方法调用轻松地修改 Webpack 配置。这种设计模式提高了代码的可读性和维护性
  - 命名规则和插件：您可以为规则和插件分配名称，稍后可以轻松地修改它们。这可以帮助您组织和管理配置中的各个部分

![img](https://static.zhufengpeixun.com/webpackchain_1681039118173.png)

#### 1.3.1 use.js

```js
// 导入 'webpack-chain' 模块，它是一个构造函数，用于创建配置 API
const Config = require('./webpack-chain');
// 实例化一个新的配置 API 对象
const config = new Config();
// 使用链式 API 修改配置
config
    // 添加一个入口点
    .entry('index')
    // 为入口点添加文件路径
    .add('src/index.js')
    // 结束对当前入口点的操作并返回 config 实例
    .end()
    // 修改输出设置
    .output
    // 设置输出目录
    .path('dist')
    // 设置输出文件名
    .filename('[name].bundle.js');
// 将配置转换为 webpack 可以使用的配置对象
const options = config.toConfig();
// 打印配置对象
console.log(options);

/**
{
  entry: { index: [ 'src/index.js' ] },
  output: { path: 'dist', filename: '[name].bundle.js' }
}
 */
```

#### 1.3.2 webpack-chain\index.js

chain\webpack-chain\index.js

```js
const ChainedMap = require('./ChainedMap');
const ChainedSet = require('./ChainedSet');
const Output = require('./Output');
class Config extends ChainedMap {
    constructor(parent) {
        super(parent);
        this.entryPoints = new ChainedMap(this);
        this.output = new Output(this);
    }
    entry(name) {
        return this.entryPoints.getOrCompute(name, () => new ChainedSet(this));
    }
    toConfig() {
        const entryPoints = this.entryPoints.entries();
        return {
            entry: Object.keys(entryPoints).reduce(
                (acc, key) =>
                    Object.assign(acc, { [key]: entryPoints[key].values() }),
                {},
            ),
            output: this.output.entries()
        }
    }
}
module.exports = Config;
```

#### 1.3.3 ChainedMap.js

chain\webpack-chain\ChainedMap.js

```js
const Chainable = require('./Chainable');
class ChainedMap extends Chainable {
    constructor(parent) {
        super(parent);
        this.store = new Map();
    }
    extend(methods) {
        this.shorthands = methods;
        methods.forEach((method) => {
            this[method] = (value) => this.set(method, value);
        });
        return this;
    }
    getOrCompute(key, fn) {
        if (!this.has(key)) {
            this.set(key, fn());
        }
        return this.get(key);
    }
    has(key) {
        return this.store.has(key);
    }
    set(key, value) {
        this.store.set(key, value);
        return this;
    }
    get(key) {
        return this.store.get(key);
    }
    entries() {
        const entries = [...this.store].reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
        return entries;
    }
}
module.exports = ChainedMap
```

#### 1.3.4 ChainedSet.js

chain\webpack-chain\ChainedSet.js

```js
const Chainable = require('./Chainable');
class ChainedSet extends Chainable {
    constructor(parent) {
        super(parent);
        this.store = new Set();
    }
    add(value) {
        this.store.add(value);
        return this;
    }
    values() {
        return [...this.store];
    }
}
module.exports = ChainedSet;
```

#### 1.3.5 Chainable.js

chain\webpack-chain\Chainable.js

```js
class Chainable {
    constructor(parent) {
        this.parent = parent;
    }
    end() {
        return this.parent;
    }
};
module.exports = Chainable;
```

#### 1.3.6 Output.js

chain\webpack-chain\Output.js

```js
const ChainedMap = require('./ChainedMap');
module.exports = class extends ChainedMap {
    constructor(parent) {
        super(parent);
        this.extend([
            'path',
            'filename'
        ]);
    }
};
```

### 1.4 其它工具

- @babel/core: Babel的核心编译器，用于将ES6+代码转换为向后兼容的JavaScript版本
- @babel/preset-env: Babel预设，根据目标环境自动确定需要的Babel插件和polyfills
- @babel/preset-react: Babel预设，用于转换React JSX语法为普通的JavaScript
- babel-loader: Webpack加载器，允许使用Babel和Webpack一起转换JavaScript文件
- commander: 一个功能强大的命令行界面库，用于创建Node.js命令行应用
- fs-extra: 一个扩展了Node.js内置fs模块的库，提供额外的文件系统相关功能
- git-promise: 一个用于在Node.js中处理Git命令的简单Promise封装库
- html-webpack-plugin: 一个Webpack插件，用于简化HTML文件的创建，以便为你的bundle提供服务
- inquirer: 一个交互式命令行用户界面的集合，用于在Node.js中创建自定义的命令行界面
- nanospinner: 一个轻量级的命令行spinner库，用于在命令行中显示加载进度
- webpack: 一个用于现代JavaScript应用程序的静态模块打包工具
- webpack-chain: 一个流畅的API，用于编程地配置Webpack
- webpack-cli: Webpack的命令行工具，用于在命令行中运行Webpack
- webpack-dev-server: 一个开发服务器，使用热模块替换（HMR）提供实时重新加载功能
- axios: 一个基于Promise的HTTP客户端库，用于浏览器和Node.js中进行AJAX请求

## 2.EMP2启动

```js
npm i -g @efox/emp
emp init -d https://static.zhufengpeixun.com/template_1680930323773.json
emp dev
```

## 3.实现init

### 3.1 安装依赖

```js
npm install @babel/core @babel/preset-env @babel/preset-react babel-loader commander fs-extra git-promise html-webpack-plugin inquirer nanospinner webpack webpack-chain webpack-cli webpack-dev-server axios --save
```

### 3.2 package.json

package.json

```json
{
    "bin": {
        "zmp6": "./bin/zmp6.js"
    }
}
```

### 3.3 bin\zmp6.js

bin\zmp6.js

```js
// 声明一个 Node.js 脚本，并指定使用的解释器
#!/usr/bin/env node
// 引入 commander 库，用于处理命令行参数和选项
const program = require('commander');
// 引入 package.json 文件，以获取版本号等信息
const pkg = require('../package.json');
// 引入自定义的 CLI 模块
const cli = require('../cli');
// 设置版本号，并添加一个用于显示版本号的选项
program.version(pkg.version, '-v, --version').usage('<command> [options]');
// 添加 init 命令，用于初始化项目
program.command('init')
    .description('初始化项目')
    .option('-d, --data [data]', 'JSON数据 http地址或者文件路径相对、绝对路径')
    .action((options) => {
        cli.exec('init', options);
    });
// 添加 dev 命令，用于启动开发服务器
program.command('dev')
    .description('Dev Server')
    .action(async (options) => {
        console.log('dev', options);
    });
// 解析命令行参数
program.parse(process.argv);
```

### 3.4 cli\index.js

cli\index.js

```js
// 定义一个名为 ZMPScript 的类
class ZMPScript {
    // 定义一个名为 exec 的异步方法，接受两个参数：name 和 options
    async exec(name, options) {
        // 使用 require 动态加载指定名称的模块（文件），并调用其 setup 方法，传递 options 参数
        await require(`./${name}`).setup(options);
    }
}
// 创建一个 ZMPScript 类的实例，并导出该实例
module.exports = new ZMPScript();
```

### 3.5 cli\init.js

cli\init.js

```js
// 导入依赖模块
const { createSpinner } = require('nanospinner');
const git = require('git-promise');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

// 定义项目模板的URL
const templates = {
    'remote': `https://gitee.com/zhufengpeixun/remote.git`,
    'host': `https://gitee.com/zhufengpeixun/host.git`,
};

// 定义 Init 类
class Init {
    templates = templates
    // 检查传入的URL是否是HTTP地址，并返回数据
    async checkData(url) {
        if (/^http(s)?:\/\/.+/.test(url)) {
            const { data } = await axios.get(url);
            return data;
        } else {
            const filepath = path.join(process.cwd(), url);
            this.templates = require(filepath);
        }
    }
    // 设置模板
    async setup(options) {
        if (typeof options.data === 'string') {
            const data = await this.checkData(options.data);
            if (data) {
                this.templates = data;
            }
        }
        await this.selectTemplate();
    }
    // 选择模板
    async selectTemplate() {
        const inquirer = await (await import('inquirer')).default;
        let answers = await inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: '请输入项目名:',
            default: function () {
                return 'zmp-project';
            }
        }, {
            type: 'list',
            name: 'template',
            message: '请选择模板:',
            choices: Object.keys(this.templates)
        }]);
        let downLoadUrl = this.templates[answers.template];
        const downLoadName = answers.name;
        await this.downloadRepo(downLoadUrl, downLoadName);
    }
    // 下载仓库
    async downloadRepo(repoPath, localPath) {
        const spinner = createSpinner().start();
        spinner.start({ text: `[downloading]\n` });
        await git(`clone ${repoPath} ./${localPath}`);
        fs.removeSync(`./${localPath}/.git`);
        spinner.success({
            text: ` cd ${localPath} && npm i && npm run dev`
        });
    }
}
// 导出 Init 类的实例
module.exports = new Init();
```

## 4.实现dev

### 4.1 bin\zmp6.js

bin\zmp6.js

```diff
#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
const cli = require('../cli');
program.version(pkg.version, '-v, --version').usage('<command> [options]');
program.command('init')
    .description('初始化项目')
    .option('-d, --data [data]', 'JSON数据 http地址或者文件路径相对、绝对路径')
    .action((options) => {
        cli.exec('init', options);
    });
program.command('dev')
    .description('Dev Server')
    .action(async (options) => {
+        cli.exec('dev',options);
    });
program.parse(process.argv);
```

### 4.2 cli\dev.js

cli\dev.js

```js
// 引入 webpack-dev-server 模块
const WebpackDevServer = require('webpack-dev-server'); 
// 引入 webpack 模块
const webpack = require('webpack'); 
 // 引入 getConfig 方法，用于获取 webpack 配置
const { getConfig } = require('../config');
class devServer {
    // 定义异步的 setup 方法
  async setup() { 
        // 调用 setServer 方法来设置服务器
    await this.setServer();
  }
    // 定义异步的 setServer 方法
  async setServer() { 
        // 通过 getConfig 方法获取 webpack 配置
    const config = getConfig(); 
        // 使用 webpack 函数创建一个编译器实例
    const compiler = webpack(config); 
        // 创建一个新的 webpack-dev-server 实例，传入 devServer 配置和编译器实例
    this.server = new WebpackDevServer(config.devServer, compiler); 
        // 启动 webpack-dev-server
    this.server.start(); 
  }
}
// 导出 devServer 类的一个实例
module.exports = new devServer(); 
```

### 4.3 config\index.js

config\index.js

```js
// 引入 path、webpack 和 WebpackChain 模块
const path = require('path');
const webpack = require('webpack');
const WebpackChain = require('webpack-chain');
// 导出 defineConfig 函数，接收一个配置对象并返回它
exports.defineConfig = (config) => {
    return config;
}
// 导出 getConfig 函数，返回经过处理后的 webpack 配置对象
exports.getConfig = () => {
    // 创建一个 webpack-chain 实例
    const webpackChain = new WebpackChain();
    // 解析 emp-config.js 配置文件，并获取其导出值
    const configPath = path.resolve(process.cwd(), 'emp-config.js');
    const configExport = require(configPath);
    // 对默认配置进行处理，如将 server 属性提取到 devServer 属性中
    const config = processDefault(configExport);
    // 将处理后的配置与 webpack-chain 实例合并
    webpackChain.merge(config);
    // 将合并后的 webpack-chain 实例转换成 webpack 配置对象并返回
    return webpackChain.toConfig();
}
// 处理默认配置的函数，返回处理后的配置对象
function processDefault(configExport) {
    // 将 server 属性提取到 devServer 属性中
    const devServer = configExport.server || {};
    delete configExport.server;
    // 将 empShare 属性的值作为 mfOptions 的一部分，并将 empShare 属性删除
    const mfOptions = {
        filename: "emp.js",
        ...configExport.empShare
    }
    delete configExport.empShare;
    // 返回处理后的配置对象
    return {
        context: process.cwd(),
        mode: 'development',
        devtool: false,
        devServer,
        plugin: {
            html: {
                plugin: require('html-webpack-plugin'),
                args: [{
                    template: path.join(__dirname, '../template/index.html')
                }]
            },
            mf: {
                plugin: webpack.container.ModuleFederationPlugin,
                args: [mfOptions]
            }
        },
        module: {
            rule: {
                compile: {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    use: {
                        'babel-loader': {
                            loader: require.resolve('babel-loader'),
                            options: {
                                presets: [
                                    require.resolve('@babel/preset-env'),
                                    require.resolve('@babel/preset-react')
                                ]
                            }
                        }
                    }
                }
            }
        },
        ...configExport,
    }
}
```

### 4.4 template\index.html

template\index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<body>
    <div id="emp-root"></div>
</body>
</html>
```