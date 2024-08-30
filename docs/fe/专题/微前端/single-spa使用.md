# single-spa使用
## 安装脚手架
```bash
npm install create-single-spa -g
```
## 创建根应用
```javascript
create-single-spa substrate

? Select type to generate single-spa root config
? Which package manager do you want to use? npm
? Will this project use Typescript? No
? Would you like to use single-spa Layout Engine No
? Organization name (can use letters, numbers, dash or underscore) wtm
Initialized empty Git repository in /Users/wtm/fe/code/fe/micro-app/single-spa-use/substrate/.git/

Initialized git repository

   create substrate/package.json
   create substrate/babel.config.json
   create substrate/.gitignore
   create substrate/.husky/pre-commit
   create substrate/.eslintrc
   create substrate/.prettierignore
   create substrate/webpack.config.js
   create substrate/src/wtm-root-config.js
   create substrate/src/index.ejs
```
### 启动应用
```bash
npm run start
```
父应用(根应用)的加载过程  9000 -> index.ejs -> @wtm/root-config -> wtm-root-config
匹配路径加载应用
### substrate/src/index.ejs
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Root Config</title>
  <script src="https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.7/runtime.min.js"></script>

  <script type="systemjs-importmap">
    {
      "imports": {
        "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.9.0/lib/system/single-spa.min.js"
      }
    }
  </script>
  <link rel="preload" href="https://cdn.jsdelivr.net/npm/single-spa@5.9.0/lib/system/single-spa.min.js" as="script">


  <% if (isLocal) { %>
    <script type="systemjs-importmap">
    {
      "imports": {
        <!-- 2. 加载wtm-root-config.js -->
        "@wtm/root-config": "//localhost:9000/wtm-root-config.js"
      }
    }
  </script>
    <% } %>



      <script src="https://cdn.jsdelivr.net/npm/import-map-overrides@2.2.0/dist/import-map-overrides.js"></script>
      <% if (isLocal) { %>
        <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/amd.js"></script>
        <% } else { %>
          <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/amd.min.js"></script>
          <% } %>
</head>

<body>

  <main></main>
  <script>
    // 1.加载 @wtm/root-config'
    System.import('@wtm/root-config');
  </script>
</body>

</html>
```
### substrate/src/wtm-root-config.js
```javascript
import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  // activeWhen: ["/"],
  // 3.当路径是 / 时，加载 single-spa-welcome.js
  activeWhen: location => location.pathname === '/',
  // customProps
});

// registerApplication({
//   name: "@wtm/navbar",
//   app: () => System.import("@wtm/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});
```
## 创建react应用
```bash
create-single-spa react-project
? Select type to generate single-spa application / parcel
? Which framework do you want to use? react
? Which package manager do you want to use? npm
? Will this project use Typescript? No
? Organization name (can use letters, numbers, dash or underscore) wtm
? Project name (can use letters, numbers, dash or underscore) react
Initialized empty Git repository in /Users/wtm/fe/code/fe/micro-app/single-spa-use/react-project/.git/

Initialized git repository

   create react-project/package.json
   create react-project/jest.config.js
   create react-project/babel.config.json
   create react-project/.eslintrc
   create react-project/.gitignore
   create react-project/.husky/pre-commit
   create react-project/.prettierignore
   create react-project/webpack.config.js
   create react-project/src/root.component.js
   create react-project/src/root.component.test.js
   create react-project/src/wtm-react.js
```
### 启动应用
```bash
# 作为子应用启动
npm run start
# 作为独立应用启动
npm run start:standalone
```
### react-project/webpack.config.js
```diff
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "wtm",
    projectName: "react", // @wtm/react
    webpackConfigEnv,
    argv,
  });

  +delete defaultConfig.externals // react和react-dom就打包到当前项目中
  return merge(defaultConfig, {
 +   devServer: {
 +     port: 3000
 +   }
    // modify the webpack config however you'd like to by adding to this object
  });
};

```
### react-project/src/wtm-react.js
```javascript
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;

```
### react-project/src/root.component.js
```javascript
export default function Root(props) {
  return <section>{props.name} is mounted!</section>;
}
```
## 删除git文件
```bash
# mac
command+shift+.
```
## 在根项目中集成react子应用
### substrate/src/wtm-root-config.js
```diff
import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  // activeWhen: ["/"],
  // 3.当路径是 / 时，加载 single-spa-welcome.js
  activeWhen: location => location.pathname === '/',
});

+registerApplication({
+  // 不重名即可
+  name: "@wtm/react", 
+  app: () =>
+    System.import(
+      "@wtm/react" // 获取 import map 里找
+    ),
+  activeWhen: location => location.pathname.startsWith('/react'),
+});

// registerApplication({
//   name: "@wtm/navbar",
//   app: () => System.import("@wtm/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});

```
### substrate/src/index.ejs
```diff
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Root Config</title>
  <script src="https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.7/runtime.min.js"></script>

  <script type="systemjs-importmap">
    {
      "imports": {
        "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.9.0/lib/system/single-spa.min.js"
      }
    }
  </script>
  <link rel="preload" href="https://cdn.jsdelivr.net/npm/single-spa@5.9.0/lib/system/single-spa.min.js" as="script">


  <% if (isLocal) { %>
    <script type="systemjs-importmap">
      {
        "imports": {
        <!-- 2. 加载wtm-root-config.js -->
        "@wtm/root-config": "//localhost:9000/wtm-root-config.js",
+        "@wtm/react": "//localhost:3000/wtm-react.js"
      }
    }
  </script>
    <% } %>



      <script src="https://cdn.jsdelivr.net/npm/import-map-overrides@2.2.0/dist/import-map-overrides.js"></script>
      <% if (isLocal) { %>
        <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/amd.js"></script>
        <% } else { %>
          <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/amd.min.js"></script>
          <% } %>
</head>

<body>

  <main>
+    <a onclick="go('/')">去基座项目</a>
+    <a onclick="go('/react')">去react项目</a>
  </main>
  <script>
+    function go(url) {
+      window.history.pushState({}, null, url)
+    }
    // 1.加载 @wtm/root-config'
    System.import('@wtm/root-config');
  </script>
</body>

</html>
```
## 创建vue子应用
```bash
create-single-spa vue-project
? Select type to generate single-spa application / parcel
? Which framework do you want to use? vue
手动安装
+vue3+router+npm
```
### vue-project/src/router/index.js
```diff
import { createRouter, createWebHistory } from 'vue-router'
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

const router = createRouter({
+  history: createWebHistory('/vue'),
  routes
})

export default router

```
### vue-project/src/main.js
```javascript
import { h, createApp } from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';
import router from './router';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecycle-props
        // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
        /*
        name: this.name,
        mountParcel: this.mountParcel,
        singleSpa: this.singleSpa,
        */
      });
    },
  },
  handleInstance(app) {
    app.use(router);
  },
});

// 提供接入协议 
export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```
## 在根项目中集成vue子应用
### substrate/src/index.ejs
```diff
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Root Config</title>
  <script src="https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.7/runtime.min.js"></script>

  <script type="systemjs-importmap">
    {
      "imports": {
        "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.9.0/lib/system/single-spa.min.js"
      }
    }
  </script>
  <link rel="preload" href="https://cdn.jsdelivr.net/npm/single-spa@5.9.0/lib/system/single-spa.min.js" as="script">


  <!-- 2. 加载wtm-root-config.js -->
  <% if (isLocal) { %>
    <script type="systemjs-importmap">
      {
        "imports": {
        "@wtm/root-config": "//localhost:9000/wtm-root-config.js",
        "@wtm/react": "//localhost:3000/wtm-react.js",
+        "@wtm/vue": "//localhost:4000/js/app.js"
      }
    }
  </script>
    <% } %>



      <script src="https://cdn.jsdelivr.net/npm/import-map-overrides@2.2.0/dist/import-map-overrides.js"></script>
      <% if (isLocal) { %>
        <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/amd.js"></script>
        <% } else { %>
          <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/amd.min.js"></script>
          <% } %>
</head>

<body>

  <main>
    <a onclick="go('/')">去基座项目</a>
    <a onclick="go('/react')">去react项目</a>
+    <a onclick="go('/vue')">去vue项目</a>
  </main>
  <script>
    function go(url) {
      window.history.pushState({}, null, url)
    }
    // 1.加载 @wtm/root-config'
    System.import('@wtm/root-config');
  </script>
</body>

</html>
```
### substrate/src/wtm-root-config.js
```diff
import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  // activeWhen: ["/"],
  // 3.当路径是 / 时，加载 single-spa-welcome.js
  activeWhen: location => location.pathname === '/',
});

registerApplication({
  name: "@wtm/react",  // 不重名即可
  app: () =>
    System.import(
      "@wtm/react" // 获取 import map 里找
    ),
  activeWhen: location => location.pathname.startsWith('/react'),
});

+registerApplication({
+  name: "@wtm/vue", // 不重名即可
+  app: () =>
+    System.import(
+      "@wtm/vue" // 获取 import map 里找
+    ),
+  activeWhen: location => location.pathname.startsWith('/vue'),
+});

// registerApplication({
//   name: "@wtm/navbar",
//   app: () => System.import("@wtm/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});

```
