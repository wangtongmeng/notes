# vue-router4实现原理
**什么是路由系统：**

- 1.记录当前"路径"和跳转时所带的"数据",实现跳转功能和替换功能、
- 2.当路径变化时可以”监听路径"的变化
## 创建路由系统
```javascript
function createWebHistory() { // 创建history模式路由
    const historyNavigation = useHistoryStateNavigation(); //实现功能（1）
    const historyListeners = useHistoryListeners();        //实现功能（2）

    const routerHistory = Object.assign(
        {},
        historyNavigation,
        historyListeners
    )// 合并功能导出
    return routerHistory
}
createWebHistory();
```
### useHistoryStateNavigation实现
```javascript
function createCurrentLocation() {
    const { pathname, search, hash } = location;
    return pathname + search + hash;
}
function useHistoryStateNavigation() {
    const { history, location } = window; // 获取浏览器history对象和location对象
    const currentLocation = {
        value: createCurrentLocation() // 完整的路径由 location中路径+查询参数+hash值
    }
    const historyState = { // 当前跳转路径所带的参数
        value: history.state
    }
    if (!historyState.value) { // 如果没有数据，增添一些默认数据方便后续记录
        changeLocation(currentLocation.value, buildState(null, currentLocation.value, null, true), true)
    }
    function changeLocation(to, state, replace) {
        history[replace ? 'replaceState' : 'pushState'](state, '', to);
        historyState.value = state;
    }
    return {
        location: currentLocation, // 当前路径状态
        state: historyState, // 路由中的状态
    }
}
```
> 构建状态信息

```javascript
function buildState(back, current, forward, repalced = false, computeScroll = false) {
    return {
        back,
        current,
        forward,
        replaced,
        position: window.history.length - 1,
        scroll: computeScroll ? { left: window.pageXOffset, top: window.pageYOffset } : null
    }
}
```
**实现push和replace方法**
```javascript
function push(to, data) { // 跳转页面
    const currentState = Object.assign(
        {},
        historyState.value,
        { forward: to, scroll:{ left: window.pageXOffset, top: window.pageYOffset } }
    )
    changeLocation(currentState.current, currentState, true); // 跳转前，更新要去哪里
    const state = Object.assign( // 创造一个最终的状态
        {},
        buildState(currentLocation.value, to, null),
        { position: currentState.position + 1 },
        data
    )
    changeLocation(to, state, false);
    currentLocation.value = to; // 更改currentLocation
}
function replace(to, data) { // 替换路径
    const state = Object.assign({},
    buildState(
        historyState.value.back,
        to,
        historyState.value.forward
    ), data);
    changeLocation(to, state, true);
    currentLocation.value = to;
}
```
> push方法则是调用history.pushState，replace方法则是调用history.replaceState。会计算最新状态和最新跳转后的路径

**最终到出以下四个方法:**
```javascript
{
    location: currentLocation, // 当前路径状态
    state: historyState, // 路由中的状态
    push,  // 页面跳转
    replace
}
```
### useHistoryListeners实现
```javascript
function useHistoryListeners(historyState, currentLocation) {
    let listeners = [];
    const popStateHandler = ({ state }) => {
        const to = createCurrentLocation(); // 获取去哪里
        const from = currentLocation.value // 从哪来
        const fromState = historyState.value; // 从哪来的状态

        currentLocation.value = to; // 更新路径
        historyState.value = state; // 更新状态

        let isBack = state.position - fromState.position < 0; // 计算是否是后退

        listeners.forEach(listener => { // 通知监听者，状态发生变化
            listener(currentLocation.value, from, {isBack})
        })
    }
    window.addEventListener('popstate', popStateHandler);
    function listen(callback) { // 用于收集监听器
        listeners.push(callback)
    }
    return {
        listen
    }
}
const historyListeners = useHistoryListeners(
    historyNavigation.state,
    historyNavigation.location
);
```
> 这里最终返回listen方法

### createWebHistory实现原理
```javascript
function createWebHistory() { // 创建history模式路由
    const historyNavigation = useHistoryStateNavigation();
    const historyListeners = useHistoryListeners(
        historyNavigation.state,
        historyNavigation.location
    );
    const routerHistory = Object.assign(
        {},
        historyNavigation,
        historyListeners
    )
    Object.defineProperty(routerHistory,'location',{ // 简化取值操作
        get:()=> historyNavigation.location.value
    })
    Object.defineProperty(routerHistory,'state',{
        get:()=> historyNavigation.state.value
    })
    return routerHistory;
}
```
### 路由系统使用
```html
<button onclick="go('/a')">去A</button>
<button onclick="go('/b')">去B</button>
<button onclick="go('/a',true)">记录替换A</button>
<button onclick="go('/b',true)">记录替换B</button>

<script>
  let routerHistory = createWebHistory();
  function go(path, replace) {
    if (replace) {
      routerHistory.replace(path, { a: 1 })
    } else {
      routerHistory.push(path, { b: 2 })
    }
  }
  routerHistory.listen((to, from, options) => {
    console.log(to, from, options)
  });
</script>
```
### 实现hash路由
hash模式的路由只是增添了前缀而已，这样跳转的时候就会增加 `#`
```javascript
function createWebHashHistory() {
     return createWebHistory('#');
}
function createWebHistory(base = '') { 
    const historyNavigation = useHistoryStateNavigation(base); // 添加base
    const historyListeners = useHistoryListeners(
        base // 添加base
        historyNavigation.state,
        historyNavigation.location
    );
}
function createCurrentLocation(base) {
    const { pathname, search, hash } = location;
    const hashPos = base.indexOf('#');
    if (hashPos > -1) {
        let pathFromHash = hash.slice(1) || '/';
        return pathFromHash; // 路径带hash值 把hash去掉
    }
    return pathname + search + hash;
}
function useHistoryStateNavigation(base) {
    const { history, location } = window; // 获取浏览器history对象和location对象
    const currentLocation = {
        value: createCurrentLocation(base) // 完整的路径由 location中路径+查询参数+hash值
    }
    function changeLocation(to, state, replace) {
        const hashIndex = base.indexOf('#'); // 如果base是hash的话，跳转时携带hash
        const url = hashIndex > -1 ? base + to : to;
        history[replace ? 'replaceState' : 'pushState'](state, '', url);
        historyState.value = state;
    }
}
```
## Vue路由系统创建
```javascript
export function createRouter(options) {
    const matcher = createRouterMatcher(options.routes); // 1.创建匹配器
    const routerHistory = options.history;               // 2.获取路由系统
    const router = {
        install() {
            console.log('Vue路由安装')
        }
    }
    return router;
}
```
### 创建路由匹配器
```javascript
function createRouterMatcher(routes) { 
    // 创建路由匹配器
    const matchers = [];
    function addRoute(record, parent) {
        let normalizedRecord = normalizeRouteRecord(record); // 格式化路由
        if(parent){ // 如果有父亲，添加父路径
            normalizedRecord.path = parent.record.path + normalizedRecord.path;
        }
        const matcher = createRouteRecordMatcher(normalizedRecord, parent);
        if ('children' in normalizedRecord) {
            let children = normalizedRecord.children;
            for (let i = 0; i < children.length; i++) {
                addRoute(children[i], matcher); // 递归格式化
            }
        }
        matchers.push(matcher);
    }
    routes.forEach(route => addRoute(route)); // 扁平化路由关系 路径 => 记录
    return {
        addRoute
    }
}
```
**normalizeRouteRecord记录格式化**
```javascript
function normalizeRouteRecord(record) {
    return {
        path: record.path, // 路径
        name: record.name, // 名称
        meta: record.meta || {}, // 批注
        beforeEnter: record.beforeEnter, // 里有钩子
        children: record.children || [], // 子路由
        components: { // 组件
            default: record.component
        }
    }
}
```
**createRouteRecordMatcher创建路径和记录的映射关系**
```javascript
function createRouteRecordMatcher(record, parent) { // 路径对应record
    const matcher = {
        path: record.path,
        parent,
        record,
        children: []
    }
    if (parent) {
        parent.children.push(matcher)
    }
    return matcher;
}
```
### 响应式路由创建
```javascript
const START_LOCATION_NORMALIZED = {
    path:'/',
    name:undefined,
    params:{}, // 路径参数
    query:{}, // 查询参数
    hash:'',
    matched:[],// 匹配的理由记录列表
    meta:{}
}
export function createRouter(options) {
    const matcher = createRouterMatcher(options.routes); 
    const routerHistory = options.history;               
    
    // 初始化响应式路由系统
    const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
}
```
> currentRoute这个对象就是整个vue路由的核心，后续路径变化就可以更新视图

### Vue路由安装
```javascript
const router = {
    install(app) {
        const router = this;
        app.component('RouterLink', RouterLink); // 1.新增2个组件
        app.component('RouterView', RouterView);
        app.config.globalProperties.$router = router; // 2.在实例上挂载$router属性
        Object.defineProperty(app.config.globalProperties, '$route', { // 3.增加$route属性
            enumerable: true,
            get: () => unref(currentRoute),
        });

        if(currentRoute.value === START_LOCATION_NORMALIZED){
            // 初始化先跳转一次，更新currentRoute属性
            push(routerHistory.location)
        }

        const reactiveRoute = {};
        for(let key in START_LOCATION_NORMALIZED){
            reactiveRoute[key] = computed(()=> currentRoute.value[key]);
        }

        app.provide('router',router); // 1.提供router属性
        app.provide('route location',reactive(reactiveRoute)); // 2.可以更改路由属性
        app.provide('router view location',currentRoute); //3.可以更改路由当前状态
    }
}
```
### 路由跳转实现
```javascript
function push(to) {
    return pushWithRedirect(to);
}
```
> 用户调用的push方法，核心调用的就是pushWithRedirect方法

```javascript
let ready;
function markAsReady(){
    if(ready) return;
    ready = true;
    routerHistory.listen((to)=>{
        let toLocation = resolve(to);
        const from = currentRoute.value;
        finalizeNavigation(targetLocation,from);
    });
}
function finalizeNavigation(toLocation,from){
    if(from === START_LOCATION_NORMALIZED){
        routerHistory.replace(toLocation.path); // 初始化，调用路由系统跳转
    }else{
        routerHistory.push(toLocation.path); // 后续走跳转逻辑
    }
    currentRoute.value = toLocation; // 更改currentRoute值
    markAsReady();
}

function createRouterMatcher(routes) {
    const matchers = [];
    function resolve(location) { // 根据路径解析匹配到的路由
        const matched = [];
        let path =  location.path;
        let parentMatcher = matchers.find(m => {
            return m.path ==path
        });
        while (parentMatcher) {
            matched.unshift(parentMatcher.record);
            parentMatcher = parentMatcher.parent
        }
        return {
            path,
            matched
        }
    }
    return {
        addRoute,
        resolve
    }
}
function resolve(rawLocation) {
    if (typeof rawLocation === 'string') {
        let matchedRoute = matcher.resolve({ path: rawLocation });
        return {
            ...matchedRoute
        }
    }
}
function pushWithRedirect(to) {
    const targetLocation = resolve(to); // 目标
    const from = currentRoute.value;  // 从哪来的
    finalizeNavigation(targetLocation,from)
}
```
> 最后将push方法和resolve方法也挂载到router对象上

### RouterLink实现
```javascript
import { computed, h, inject, reactive } from "vue";
function useLink(props) {
    const router = inject('router');
    const currentRoute = inject('route location');
    function navigate() {
        router.push(props.to);
    }
    return {
        navigate
    }
}
export const RouterLink = {
    name: 'RouterLink',
    props: {
        to: {
            type: [String, Object],
            required: true
        },
        activeClass: String
    },
    setup(props, { slots }) {
        const link = reactive(useLink(props))
        return () => {
            const children = slots.default && slots.default();
            return h('a', {
                onClick: link.navigate
            }, children)
        }
    }
}
```
### RouterView实现
```javascript
import { computed, h ,inject,provide} from "vue";
export const RouterView  = {
    name:'RouterView',
    props:{
        name:{
            type:String,
            default:'default'
        }
    },
    setup(ctx,{slots}){
        const injectedRoute = inject('router view location');
        const depth = inject('router view depth', 0);
        const matchedRouteRef = computed(()=>injectedRoute.value.matched[depth]);
        provide('router view depth', depth + 1)
        return ()=>{
            const matchedRoute = matchedRouteRef.value;
            const ViewComponent = matchedRoute && matchedRoute.components.default;
            if(!ViewComponent){
                return slots.default && slots.default();
            }
            return h(ViewComponent)
        }
    }
}
```
## 路由钩子实现
```javascript
function useCallbacks() {
    const handlers = [];
    function add(handler) {handlers.push(handler);}
    return {
        add,
        list: () => handlers
    }
}
export function createRouter(options) {
    const beforeGuards = useCallbacks();      
    const beforeResolveGuards = useCallbacks();
    const afterGuards = useCallbacks();
    const router = {
        afterEach: afterGuards.add, // 全局钩子
        beforeEach: beforeGuards.add,
        beforeResolve: beforeResolveGuards.add
    }
    return router;
}
```
```javascript
function normalizeRouteRecord(record) {
    return {
        path: record.path, 
        name: record.name, 
        meta: record.meta || {}, 
        beforeEnter: record.beforeEnter, 
        children: record.children || [], 
        components: {
            default: record.component
        },
        leaveGuards:new Set(), // 离开守卫
        updateGuards:new Set() // 更新守卫
    }
}
```
> 添加leaveGuards、updateGuards用于记录组件中，使用路由api定义的钩子函数

```javascript
function pushWithRedirect(to) {
    const targetLocation = resolve(to); 
    const from = currentRoute.value; 
    navigate(targetLocation, from).then(() => { // 执行路由守卫
        return finalizeNavigation(targetLocation, from); // 真正发生跳转
    }).then(() => {
        for (const guard of afterGuards.list()) guard(to, from) // 执行afterEach
    })
}
```
### 路由跳转调用钩子
```javascript
function navigate(to, from) {
    const [leavingRecords, updatingRecords, enteringRecords] = extractChanggingRecords(to, from);// 计算离开、跟新、进入
    let guards = extractComponentsGuards(       // 1.触发组件内部离开的钩子
        leavingRecords.reverse(),
        'beforeRouteLeave', 
        to,
        from
    );
    for (const record of leavingRecords) {      // 2.组件内部使用api定义的离开
        record.leaveGuards.forEach(guard => {
            guards.push(guardToPromiseFn(guard, to, from))
        })
    }
    return runGuardQueue(guards).then(() => {   // 3.运行钩子
        guards = [];
        for (const guard of beforeGuards.list()) {
            guards.push(guardToPromiseFn(guard, to, from)) 
        }
        return runGuardQueue(guards);
    }).then(() => {                            // 4.调用组件更新钩子
        guards = extractComponentsGuards(
            updatingRecords,
            'beforeRouteUpdate',
            to,
            from
        )
        for (const record of updatingRecords) {// 5.组件内部使用api定义的更新
            record.updateGuards.forEach(guard => {
                guards.push(guardToPromiseFn(guard, to, from))
            })
        }
        return runGuardQueue(guards);
    }).then(() => { 
        guards = []
        for (const record of to.matched) { // 6.路由配置中的beforeEnter
            if (record.beforeEnter) {
                guards.push(guardToPromiseFn(record.beforeEnter, to, from));
            }
        }
        return runGuardQueue(guards)
    }).then(() => {
        guards = extractComponentsGuards( // 7.组件中的beforeRouteEnter
            enteringRecords,
            'beforeRouteEnter',
            to,
            from
        )
        return runGuardQueue(guards);
    }).then(() => {                      // 8.组件中的确认钩子
        guards = [];
        for (const guard of beforeResolveGuards.list()) {
            guards.push(guardToPromiseFn(guard, to, from))
        }
        return runGuardQueue(guards);
    })
}
```
### 管理组件状态 离开、更新、进入
```javascript
function extractChanggingRecords(to, from) { // 路由更改时 获取对应记录的状态
    const leavingRecords = [];
    const updatingRecords = [];
    const enteringRecords = [];
    const len = Math.max(from.matched.length, to.matched.length)
    for (let i = 0; i < len; i++) {
        const recordFrom = from.matched[i]; // 去的地方和来的是同一个 
        if (recordFrom) {
            if (to.matched.find(record => record.path === recordFrom.path)) {
                updatingRecords.push(recordFrom)
            } else {
                leavingRecords.push(recordFrom)
            }
        }

        const recordTo = to.matched[i]; // 去的和来的不是一个,就走进入的钩子
        if (recordTo) {
            if (!from.matched.find(record => record.path == recordTo.path)) {
                enteringRecords.push(recordTo);
            }
        }
    }
    return [leavingRecords, updatingRecords, enteringRecords]
}
```
### 组件钩子提取
```javascript
function extractComponentsGuards(matched, guardType, to, from) {
    const guards = [];
    for (const record of matched) {
        let rawComponent = record.components.default; // 取出组件
        const guard = rawComponent[guardType]; // 取组件上的钩子方法

        // 将这个方法变成promise 放到guards
        guard && guards.push(guardToPromiseFn(guard, to, from, record, 'default'))
    }
    return guards
}
```
### 包装钩子函数
```javascript
function guardToPromiseFn(guard, to, from, record, name) {
    return () => new Promise((resolve, reject) => {
        const next = () => resolve();
        const guardReturn = guard.call(record, to, from, next); // 获得返回值
        let guardCall = Promise.resolve(guardReturn); // 将返回值包装成promise,自动调用
        guardCall.then(next)
    })
}
```
