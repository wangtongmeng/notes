# single-spa实现原理
## single-spa使用
### index.html
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
    <script src="https://cdn.bootcdn.net/ajax/libs/single-spa/5.9.3/umd/single-spa.min.js"></script>
    <script>
        // 微前端 就是可以加载不同的应用  基于路由的微前端

        // 如何接入已经写好的应用 对于singlespa而言，我们需要改写子应用 （接入协议） bootstrap， mount， unmount
        // /a  /b
        let { registerApplication, start } = singleSpa
        let app1 = {
            bootstrap: [
                async () => console.log('app1 bootstrap1'),
                async () => console.log('app1 bootstrap2')
            ],
            mount: [
                async (props) => {
                    // new Vue().$mount()...
                    console.log('app1 mount1', props)
                },
                async () => {
                    // new Vue().$mount()...
                    console.log('app1 mount2')
                }
            ],
            unmount: async (props) => {
                console.log('app1 unmount')
            }
        }
        let app2 = {
            bootstrap: async () => console.log('app2 bootstrap1'),
            mount: [
                async () => {
                    // new Vue().$mount()...
                    return new Promise((resolve, reejct) => {
                        setTimeout(() => {
                            console.log('app2 mount')
                            resolve()
                        }, 1000)
                    })
                }
            ],
            unmount: async () => {
                console.log('app2 unmount')
            }
        }
        // 当路径是#/a 的时候就加载 a应用

        // 所谓的注册应用 就是看一下路径是否匹配，如果匹配则“加载”对应的应用
        registerApplication('a', async () => app1, location => location.hash.startsWith('#/a'), { a: 1 })
        registerApplication('b', async () => app2, location => location.hash.startsWith('#/b'), { a: 1 })

        // 开启路径的监控，路径切换的时候 可以调用对应的mount unmount
        start()

    </script>
    <script>
    </script>
</body>

</html>
```
### 使用http-server启动服务
```bash
npm i http-server -g

# 在 index.html所在目录
http-server
# 启动服务 http://127.0.0.1:8080
```
### 应用加载与卸载
```bash
访问 http://127.0.0.1:8080/#/a
app1 bootstrap1
app1 bootstrap2
app1 mount1 {a: 1, name: 'a', singleSpa: {…}, mountParcel: ƒ}
app1 mount2

访问 http://127.0.0.1:8080/#/b
app1 unmount
app2 bootstrap1
app2 mount

访问 http://127.0.0.1:8080/#/a
app2 unmount
app1 mount1 {a: 1, name: 'a', singleSpa: {…}, mountParcel: ƒ}
app1 mount2
```
## single-spa基础结构

- registerApplication: 所谓的注册应用 就是看一下路径是否匹配，如果匹配则“加载”对应的应用
- start：开启路径的监控，路径切换的时候 可以调用对应的mount unmount
### single-spa/application/app.js
```javascript
export function registerApplication() {
  
}
```
### single-spa/start.js
```javascript
export function start() {
   
}
```
### single-spa/sindle-spa.js
```javascript
export { registerApplication } from "./application/app.js"; // 根据路径加载应用
export { start } from "./start.js"; // 开启应用 挂载组件
```
### index.html
```diff
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
+    <!-- <script src="https://cdn.bootcdn.net/ajax/libs/single-spa/5.9.3/umd/single-spa.min.js"></script> -->
+    <script type="module">
        // 微前端 就是可以加载不同的应用  基于路由的微前端

        // 如何接入已经写好的应用 对于singlespa而言，我们需要改写子应用 （接入协议） bootstrap， mount， unmount
        // /a  /b
+        // let { registerApplication, start } = singleSpa
+        import { registerApplication, start } from './single-spa/single-spa.js'
        let app1 = {
            bootstrap: [
                async () => console.log('app1 bootstrap1'),
                async () => console.log('app1 bootstrap2')
            ],
            mount: [
                async (props) => {
                    // new Vue().$mount()...
                    console.log('app1 mount1', props)
                },
                async () => {
                    // new Vue().$mount()...
                    console.log('app1 mount2')
                }
            ],
            unmount: async (props) => {
                console.log('app1 unmount')
            }
        }
        let app2 = {
            bootstrap: async () => console.log('app2 bootstrap1'),
            mount: [
                async () => {
                    // new Vue().$mount()...
                    return new Promise((resolve, reejct) => {
                        setTimeout(() => {
                            console.log('app2 mount')
                            resolve()
                        }, 1000)
                    })
                }
            ],
            unmount: async () => {
                console.log('app2 unmount')
            }
        }
        // 当路径是#/a 的时候就加载 a应用

+        // 所谓的注册应用 就是看一下路径是否匹配，如果匹配则“加载”对应的应用
        registerApplication('a', async () => app1, location => location.hash.startsWith('#/a'), { a: 1 })
        registerApplication('b', async () => app2, location => location.hash.startsWith('#/b'), { a: 1 })

+        // 开启路径的监控，路径切换的时候 可以调用对应的mount unmount
        start()

    </script>
    <script>
    </script>
</body>

</html>
```
## 将注册应用分类
### single-spa/application/app.js
```javascript
import { reroute } from "../navigation/reroute.js";
import { NOT_LOADED } from "./app.helpers.js"

export const apps = []
export function registerApplication(appName,loadApp,activeWhen,customProps){
  const registeration = {
    name:appName,
    loadApp,
    activeWhen,
    customProps,
    status:NOT_LOADED
  }
  apps.push(registeration)

  // 我们需要给每个应用添加对应的状态变化

  // 未加载 -》 加载 -》挂载 -》 卸载

  // 需要检查哪些应用要被加载，还有哪些应用要被挂载，还有哪些应用要被移除
  reroute(); // 重写路由
}
```
### single-spa/application/app.helpers.js
处理应用状态的方法
![image.png](http://rzol19n0q.hb-bkt.clouddn.com/20230912194348874a7fc4fe166d10911d9d70b21215f1.png)
```javascript
import { apps } from "./app.js";

// app status
export const NOT_LOADED = 'NOT_LOADED'; // 没有被加载 
export const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE'; // 路径匹配了 要去加载这个资源
export const LOAD_ERROR = 'LOAD_ERROR'

// 启动的过程
export const NOT_BOOTSTRAPED = 'NOT_BOOTSTRAPED'; // 资源加载完毕了 需要启动，此时还没有启动
export const BOOTSTRAPING = 'BOOTSTRAPING'; // 启动中
export const NOT_MOUNTED = 'NOT_MOUNTED'; // 没有被挂载

// 挂载流程 
export const MOUNTING = 'MOUNTING'; // 正在挂载
export const MOUNTED = 'MOUNTED'; // 挂载完成

// 卸载流程
export const UNMOUNTING = 'UNMOUNTING'; // 卸载中

// 看一下这个应用是否正在被激活 
export function isActive(app){
    return app.status === MOUNTED; // 此应用正在被激活
}
// 看一下此应用是否被激活
export function shouldBeActive(app){
    return app.activeWhen(window.location)
}

export function getAppChanges(){
    const appsToLoad = []
    const appsToMount = []
    const appsToUnmount = []

    apps.forEach((app)=>{
        let appShouldBeActive = shouldBeActive(app)
        switch(app.status){
            case NOT_LOADED:
            case LOADING_SOURCE_CODE:
                // 1） 标记当前路径下 哪些应用要被加载
                if(appShouldBeActive){
                    appsToLoad.push(app)
                }
                break;
            case NOT_BOOTSTRAPED:  
            case BOOTSTRAPING:
            case NOT_MOUNTED:
                // 2) 当前路径下 哪些应用要被挂载
                if(appShouldBeActive){
                    appsToMount.push(app)
                }
                break;
            case MOUNTED:
                // 3） 当前路径下 哪些应用要被卸载
                if(!appShouldBeActive){
                    appsToUnmount.push(app)
                }
                break
            default:
                break;
        }
    })

    return {appsToLoad,appsToMount,appsToUnmount}
}
```
### single-spa/navigation/reroute.js
```javascript
import { getAppChanges } from "../application/app.helpers.js";

// 后续路径变化 也需要走这里， 重新计算哪些应用被加载或者卸载
export function reroute(event) {
  // 获取app对应的状态 进行分类
  const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges()
  console.log('appsToLoad', appsToLoad); 
  // 访问 http://127.0.0.1:8080/#/a [{name: 'a', customProps: {…}, status: 'NOT_LOADED', loadApp: ƒ, activeWhen: ƒ}]
  // 访问 http://127.0.0.1:8080/#/b [{name: 'b', customProps: {…}, status: 'NOT_LOADED', loadApp: ƒ, activeWhen: ƒ}]
}
```
## 应用启动、挂载与卸载
### single-spa/start.js
```javascript
import { reroute } from "./navigation/reroute.js";

export let started = false; // 默认没有调用start方法
export function start(){
    started = true; // 用户启动了
    reroute()
}
```
### single-spa/navigation/reroute.js
```javascript
import { getAppChanges, shouldBeActive } from "../application/app.helpers.js";
import { toBootstrapPromise } from "../lifecycles/bootstrap.js";
import { toLoadPromise } from "../lifecycles/load.js";
import { toMountPromise } from "../lifecycles/mount.js";
import { toUnmountPromise } from "../lifecycles/unmount.js";
import { started } from "../start.js";



// 后续路径变化 也需要走这里， 重新计算哪些应用被加载或者写在

let appChangeUnderWay = false;
let peopleWaitingOnAppChange = []
export function reroute(event) {

    // 如果多次触发reroute 方法我们可以创造一个队列来屏蔽这个问题
    if(appChangeUnderWay){
        return new Promise((resolve,reject)=>{
            peopleWaitingOnAppChange.push({
                resolve,reject
            })
        })
    }
    // 获取app对应的状态 进行分类
    const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges()
    // 加载完毕后 需要去挂载的应用
    if(started){
        appChangeUnderWay = true
        // 用户调用了start方法 我们需要处理当前应用要挂载或者卸载
        return performAppChange();
    }
    // 先拿到应用去加载  -》
    return loadApps();
    function loadApps() {
        // 应用的加载
        return Promise.all(appsToLoad.map(toLoadPromise))// 目前我们没有调用start 
    }
    function performAppChange(){
        // 将不需要的应用卸载掉, 返回一个卸载的promise
        // 1) 稍后测试销毁逻辑
        const unmountAllPromises = Promise.all(appsToUnmount.map(toUnmountPromise))

        // 流程加载需要的应用  -》 启动对应的应用 -》 卸载之前的 -》 挂载对应的应用

        // 2) 加载需要的应用（可能这个应用在注册的时候已经被加载了）

        // 默认情况注册的时候 路径是 /a , 但是当我们start的时候应用是/b
        const loadMountPromises = Promise.all(appsToLoad.map(app=> toLoadPromise(app).then(app=>{
            // 当应用加载完毕后 需要启动和挂载，但是要保证挂载前 先卸载掉来的应用
            return  tryBootstrapAndMount(app,unmountAllPromises)
        })));

        // 如果应用 没有加载   加载 -》启动挂载   如果应用已经加载过了  挂载
        const MountPromises = Promise.all(appsToMount.map(app=> tryBootstrapAndMount(app,unmountAllPromises)))

        function tryBootstrapAndMount(app,unmountAllPromises){
            if(shouldBeActive(app)){
                // 保证卸载完毕在挂载
                return toBootstrapPromise(app).then(app=> unmountAllPromises.then(()=> toMountPromise(app)))
            }
        }
        
        return Promise.all([loadMountPromises,MountPromises]).then(()=>{ // 卸载完毕后
            appChangeUnderWay = false;
            if(peopleWaitingOnAppChange.length > 0){
                peopleWaitingOnAppChange = []; // 多次操作 我缓存起来，。。。。
            }
           
        })
  
    }

}
```
### single-spa/lifecycles/bootstrap.js
```javascript
import { BOOTSTRAPING, NOT_BOOTSTRAPED, NOT_MOUNTED } from "../application/app.helpers.js";

export function toBootstrapPromise(app){
    return Promise.resolve().then(()=>{
        if(app.status !== NOT_BOOTSTRAPED){
            // 此应用加载完毕了 
            return app;
        }
        app.status = BOOTSTRAPING

        return app.bootstrap(app.customProps).then(()=>{
            app.status = NOT_MOUNTED;
            return app
        })
    })
}
```
### single-spa/lifecycles/load.js
```javascript
import { LOADING_SOURCE_CODE, NOT_BOOTSTRAPED, NOT_LOADED } from "../application/app.helpers.js"


function flattenArrayToPromise(fns) {
    fns = Array.isArray(fns) ? fns : [fns]
    return function(props){ // redux 
        return fns.reduce((rPromise,fn)=>rPromise.then(()=>fn(props)), Promise.resolve())
    }
}
export function toLoadPromise(app){
    return Promise.resolve().then(()=>{
        if(app.status !== NOT_LOADED){
            // 此应用加载完毕了 
            return app;
        }
        app.status = LOADING_SOURCE_CODE; // 正在加载应用

        // loadApp 对于之前的内容 System.import()
        return app.loadApp(app.customProps).then(v=>{
            const {bootstrap,mount,unmount} = v;
            app.status = NOT_BOOTSTRAPED;
            app.bootstrap = flattenArrayToPromise(bootstrap);
            app.mount = flattenArrayToPromise(mount);
            app.unmount = flattenArrayToPromise(unmount);

            return app
        })
    })
}
```
### single-spa/lifecycles/mount.js
```javascript
import {  MOUNTED, NOT_MOUNTED } from "../application/app.helpers.js";

export function toMountPromise(app){
    return Promise.resolve().then(()=>{
        if(app.status !== NOT_MOUNTED){
            return app;
        }
        return app.mount(app.customProps).then(()=>{
            app.status = MOUNTED;
            return app
        })
    })
}
```
### single-spa/lifecycles/unmount.js
```javascript
import { MOUNTED, NOT_MOUNTED, UNMOUNTING } from "../application/app.helpers.js"

export function toUnmountPromise(app){
    return Promise.resolve().then(()=>{
        if(app.status !== MOUNTED){
            return app;
        }
        app.status = UNMOUNTING;
        // app.unmount 方法用户可能写的是一个数组。。。。。
        return app.unmount(app.customProps).then(()=>{
            app.status = NOT_MOUNTED;
        })
    })
}
```
## 重写路由监听方法
### navigation/navigation-event.js
```javascript
// 对用户的路径切换 进行劫持，劫持后，重新调用reroute方法，进行计算应用的加载

import { reroute } from "./reroute.js";


function urlRoute() {
    reroute(arguments)
}

window.addEventListener('hashchange', urlRoute)
window.addEventListener('popstate', urlRoute); // 浏览器历史切换的时候会执行此方法


// 但是当路由切换的时候 我们触发single-spa的addEventLister, 应用中可能也包含addEventLister


// 需要劫持原生的路由系统，保证当我们加载完后再切换路由

const capturedEventListeners = {
    hashchange: [],
    popstate: []
}

const listentingTo = ['hashchange','popstate']
const originalAddEventListener = window.addEventListener;
const originalRemoveEventListener = window.removeEventListener;

window.addEventListener = function(eventName,callback){
    // 有要监听的事件， 函数不能重复
    if(listentingTo.includes(eventName) && !capturedEventListeners[eventName].some(listener=>listener === callback)){
        return capturedEventListeners[eventName].push(callback)
    }
    return originalAddEventListener.apply(this,arguments)
}
window.removeEventListener = function(eventName,callback){
    // 有要监听的事件， 函数不能重复
    if(listentingTo.includes(eventName) ){
        capturedEventListeners[eventName] = capturedEventListeners[eventName].filter(fn=> fn!== callback)
        return 
    }
    return originalRemoveEventListener.apply(this,arguments)
}

export function callCaptureEventListeners(e){
    if(e){
        const eventType = e[0].type;
        if(listentingTo.includes(eventType)){
            capturedEventListeners[eventType].forEach(listener => {
                listener.apply(this,e)
            });
        }
    }
}

function patchFn(updateState,methodName){
    return function(){
        const urlBefore = window.location.href;
        const r = updateState.apply(this,arguments); // 调用此方法 确实发生了路径的变化
        const urlAfter = window.location.href;

        if(urlBefore !== urlAfter){
            // 手动派发popstate事件
            window.dispatchEvent(new PopStateEvent("popstate"))
        }
        return r;
    }
}

window.history.pushState = patchFn(window.history.pushState,'pushState')

window.history.replaceState = patchFn(window.history.replaceState,'replaceState')
```
### single-spa/navigation/reroute.js
```diff
import { getAppChanges, shouldBeActive } from "../application/app.helpers.js";
import { toBootstrapPromise } from "../lifecycles/bootstrap.js";
import { toLoadPromise } from "../lifecycles/load.js";
import { toMountPromise } from "../lifecycles/mount.js";
import { toUnmountPromise } from "../lifecycles/unmount.js";
import { started } from "../start.js";
+import './navigation-event.js'
+import { callCaptureEventListeners } from "./navigation-event.js";



// 后续路径变化 也需要走这里， 重新计算哪些应用被加载或者写在

let appChangeUnderWay = false;
let peopleWaitingOnAppChange = []
export function reroute(event) {

    // 如果多次触发reroute 方法我们可以创造一个队列来屏蔽这个问题
    if(appChangeUnderWay){
        return new Promise((resolve,reject)=>{
            peopleWaitingOnAppChange.push({
                resolve,reject
            })
        })
    }
    // 获取app对应的状态 进行分类
    const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges()
    // 加载完毕后 需要去挂载的应用
    if(started){
        appChangeUnderWay = true
        // 用户调用了start方法 我们需要处理当前应用要挂载或者卸载
        return performAppChange();
    }
    // 先拿到应用去加载  -》
    return loadApps();
    function loadApps() {
        // 应用的加载
        return Promise.all(appsToLoad.map(toLoadPromise)).then(callEventListener)// 目前我们没有调用start 
    }
    function performAppChange(){
        // 将不需要的应用卸载掉, 返回一个卸载的promise
        // 1) 稍后测试销毁逻辑
        const unmountAllPromises = Promise.all(appsToUnmount.map(toUnmountPromise))

        // 流程加载需要的应用  -》 启动对应的应用 -》 卸载之前的 -》 挂载对应的应用

        // 2) 加载需要的应用（可能这个应用在注册的时候已经被加载了）

        // 默认情况注册的时候 路径是 /a , 但是当我们start的时候应用是/b
        const loadMountPromises = Promise.all(appsToLoad.map(app=> toLoadPromise(app).then(app=>{
            // 当应用加载完毕后 需要启动和挂载，但是要保证挂载前 先卸载掉来的应用
            return  tryBootstrapAndMount(app,unmountAllPromises)
        })));

        // 如果应用 没有加载   加载 -》启动挂载   如果应用已经加载过了  挂载
        const MountPromises = Promise.all(appsToMount.map(app=> tryBootstrapAndMount(app,unmountAllPromises)))

        function tryBootstrapAndMount(app,unmountAllPromises){
            if(shouldBeActive(app)){
                // 保证卸载完毕在挂载
                return toBootstrapPromise(app).then(app=> unmountAllPromises.then(()=> toMountPromise(app)))
            }
        }
        
        return Promise.all([loadMountPromises,MountPromises]).then(()=>{ // 卸载完毕后
+            callEventListener();
            appChangeUnderWay = false;
            if(peopleWaitingOnAppChange.length > 0){
                peopleWaitingOnAppChange = []; // 多次操作 我缓存起来，。。。。
            }
           
        })

        
    }

+    function callEventListener(){
+        callCaptureEventListeners(event)
+    }

}

```
### index.html
```diff
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
+    <!-- <a href="#/a">a应用</a>
+    <a href="#/b">b应用</a> -->


    <!-- <script src="https://cdn.bootcdn.net/ajax/libs/single-spa/5.9.3/umd/single-spa.min.js"></script> -->
    <script type="module">
        // 微前端 就是可以加载不同的应用  基于路由的微前端

        // 如何接入已经写好的应用 对于singlespa而言，我们需要改写子应用 （接入协议） bootstrap， mount， unmount
        // /a  /b
        import { registerApplication, start } from './single-spa/single-spa.js'
        // let { registerApplication, start } = singleSpa
        let app1 = {
            bootstrap: [
                async () => console.log('app1 bootstrap1'),
                async () => console.log('app1 bootstrap2')
            ],
            mount: [
                async (props) => {
                    // new Vue().$mount()...
                    console.log('app1 mount1', props)
                },
                async () => {
                    // new Vue().$mount()...
                    console.log('app1 mount2')
                }
            ],
            unmount: async (props) => {
                console.log('app1 unmount')
            }
        }
        let app2 = {
            bootstrap: async () => console.log('app2 bootstrap1'),
            mount: [
                async () => {
                    // new Vue().$mount()...
                    return new Promise((resolve, reejct) => {
                        setTimeout(() => {
                            console.log('app2 mount')
                            resolve()
                        }, 1000)
                    })
                }
            ],
            unmount: async () => {
                console.log('app2 unmount')
            }
        }
        // 当路径是#/a 的时候就加载 a应用

        // 所谓的注册应用 就是看一下路径是否匹配，如果匹配则“加载”对应的应用
        registerApplication('a', async () => app1, location => location.hash.startsWith('#/a'), { a: 1 })
        registerApplication('b', async () => app2, location => location.hash.startsWith('#/b'), { a: 1 })

        // 开启路径的监控，路径切换的时候 可以调用对应的mount unmount
        start()


+        // 这个监控操作 应该被延迟到 当应用挂挂载完毕后再行
+        window.addEventListener('hashchange', function () {
+            console.log(window.location.hash, 'p----')
+        })

+        // window.addEventListener('popstate',function(){
+        //     console.log(window.location.hash,'p----')
+        // })
+    </script>
+    <a onclick="go('#/a')">a应用</a>
+    <a onclick="go('#/b')">b应用</a>
+    <script>
+        function go(url) { // 用户调用pushState replaceState 此方法不会触发逻辑reroute
+            history.pushState({}, null, url)
+        }
+    </script>
</body>

</html>
```
```javascript
// 访问 http://127.0.0.1:8080/#/a
app1 bootstrap1
app1 bootstrap2
app1 mount1 {a: 1}
app1 mount2
// 改变路径 http://127.0.0.1:8080/#/b
app1 unmount
app2 bootstrap1
app2 mount (1s后)
// 浏览器回退到 http://127.0.0.1:8080/#/a
app2 unmount
app1 mount1 {a: 1}
app1 mount2
#/a p----
// 浏览器前进到 http://127.0.0.1:8080/#/b
app1 unmount
app2 mount
```
## 总结
注册应用要暴露三个接入协议，之后拦截我们的路由系统，当路由切换时我们去加载对应应用的介入协议方法，从而实现应用的挂在和卸载
