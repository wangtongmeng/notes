
# qiankun使用
single-spa的缺点：需要借助systemjs加载应用，没有预加载功能
## 创建基座项目
```bash
npx create-react-app substrate
npm install react-router-dom qiankun
npm run start
```
### substrate/src/index.js
```diff
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
+import './registerApps.js'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```
### substrate/src/App.js
```javascript
import React from 'react'
import {BrowserRouter, Link} from 'react-router-dom'
import { useEffect } from 'react';
import { loadMicroApp} from 'qiankun'
function App() {
  const containerRef = React.createRef();
 
  useEffect(()=>{
    loadMicroApp({
      name:'m-static',
      entry: 'http://localhost:30000',
      container:containerRef.current
    })
  })
  // keep-alive 可以实现动态的加载
  return (
    <div className="App">
      <BrowserRouter>
          <Link to="/react">React应用</Link>
          <Link to="/vue">Vue应用</Link>
      </BrowserRouter>

      <div ref={containerRef}></div>

      <div id='container'></div>
    </div>  
  );
}

export default App;

```
### substrate/src/registerApps.js
```javascript
import { registerMicroApps, start,initGlobalState } from 'qiankun';
const loader = (loading) => {
    console.log('加载状态', loading)
}
const actions = initGlobalState({
    name:'wtm',
    age:30
})
actions.onGlobalStateChange((newVal,oldVal)=>{
    console.log('parent',newVal,oldVal)
})

registerMicroApps([
    {
        name: 'reactApp',
        entry: '//localhost:40000', // 默认react启动的入口是10000端口
        activeRule: '/react', // 当路径是 /react的时候启动
        container: '#container', // 应用挂载的位置
        loader,
        props: { a: 1, util: {} }
    },
    {
        name: 'vueApp',
        entry: '//localhost:20000', // 默认react启动的入口是10000端口
        activeRule: '/vue', // 当路径是 /react的时候启动
        container: '#container', // 应用挂载的位置
        loader,
        props: { a: 1, util: {} }
    }
], {
    beforeLoad() {
        console.log('before load')
    },
    beforeMount() {
        console.log('before mount')
    },
    afterMount() {
        console.log('after mount')
    },
    beforeUnmount() {
        console.log('before unmount')
    },
    afterUnmount() {
        console.log('after unmount')
    }
})
start({
    sandbox:{
        // 实现了动态样式表
        // css-module,scoped 可以再打包的时候生成一个选择器的名字  增加属性 来进行隔离
        // BEM
        // CSS in js
        // shadowDOM 严格的隔离

        // strictStyleIsolation:true,
        //experimentalStyleIsolation:true // 缺点 就是子应用中的dom元素如果挂在到了外层，会导致样式不生效
    }
})
```
### substrate/package.json
```json
{
  ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  ...
}
```
## 创建vue子项目
```bash
vue create m-vue

Vue CLI v5.0.8
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router
? Choose a version of Vue.js that you want to start the project with 3.x
? Use history mode for router? (Requires proper server setup for index fallback in production) 
Yes
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No
```
### m-vue/vue.config.js
```javascript
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:20000,
    headers:{
      'Access-Control-Allow-Origin':"*"
    }
  },
  configureWebpack:{
    output:{
      libraryTarget:'umd',
      library:'m-vue'
    }
  }
})
```
### m-vue/src/main.js
```javascript
import './public-path.js'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import App from './App.vue'
import routes from './router'



let app;
let history;
let router;
function render(props) {
    app = createApp(App)
    history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue' : '/')
    router = createRouter({
        history,
        routes
    })
    app.use(router)
    const container = props.container
    app.mount(container ? container.querySelector('#app'):document.getElementById('app'))
}

if(!window.__POWERED_BY_QIANKUN__){
    render({})
}

export async function bootstrap() {
    console.log('vue bootsrap')
}
export async function mount(props) {
    render(props)
}
export async function unmount() {
    app.unmount()
    history.destroy();
    app = null;
    router = null
}
```
### m-vue/src/router/index.js
```javascript

import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]



export default routes
```
### m-vue/src/public-path.js
```javascript
if(window.__POWERED_BY_QIANKUN__){
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
```
## 创建react子项目
```bash
npx create-react-app m-react
npm install @rescripts/cli --force 重写webpack配置
```
### m-react/src/index.js
```javascript
import './public-path.js'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
let root;
function render(props) {
    const container = props.container
    root = ReactDOM.createRoot(container ? container.querySelector('#root') : document.getElementById('root'));
    root.render(
        <App />
    );
}
// qiankun 提供了一些标识，用于表示当前应用是否在父应用中被引入过
if (!window.__POWERED_BY_QIANKUN__) {
    render({}); // 独立运行调用render方法
}

// qiankun 要求应用暴露的方式需要时umd格式
export async function bootstrap(props) {
    console.log(props)
}
export async function mount(props) {
    props.onGlobalStateChange((newVal, oldVal) => {
        console.log('child', newVal, oldVal)
    })
    props.setGlobalState({ name: 'wtm2' })
    // 外层基座的容器叫container容器
    render(props); // 父应用挂在的时候会传递props， props 有挂载点
}
export async function unmount(props) {
    root.unmount();
}
```
### m-react/src/public-path.js
```javascript
if(window.__POWERED_BY_QIANKUN__){
    // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
```
### m-react/.env
```bash
PORT=40000
WDS_SOCKET_PORT=40000
```
### m-react/.rescriptsrc.js
```javascript
module.exports = {
    webpack:(config)=>{
        config.output.libraryTarget = 'umd';
        config.output.library = 'm-react'; // 打包的格式是umd格式

        return config
    },
    devServer:(config)=>{
        config.headers = {
            'Access-control-Allow-Origin':"*"
        }
        return config
    }
}
```
### m-react/package.json
```json
{
  ...
  "scripts": {
    "start": "rescripts start",
    "build": "rescripts build",
    "test": "rescripts test",
    "eject": "rescripts eject"
  },
  ...
}
```
## 支持静态服务
```bash
http-server --port 30000 --cors
```
### m-static/index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>静态应用</title>
</head>

<body>
    <div id="static"></div>
    <script >
        const app = document.getElementById('static');
        // 最终导出接入协议即可
        function render() {
            app.innerHTML = 'static'
        }
        if (!window.__POWERED_BY_QIANKUN__) {
            render()
        }

        window['m-static'] = {
            bootstrap: async () => {
                console.log('static bootstrap')
            },
            mount: async () => {
                render()
            },
            unmount: async () => {
                app.innerHTML = ''
            }
        }


    </script>
</body>

</html>
```
## 统一登录问题
[https://github.com/umijs/qiankun/issues/178](https://github.com/umijs/qiankun/issues/178)
美团
[https://tech.meituan.com/2020/02/27/meituan-waimai-micro-frontends-practice.html](https://tech.meituan.com/2020/02/27/meituan-waimai-micro-frontends-practice.html)
