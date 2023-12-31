# pinia实现原理
## Pinia的优势
- 极其轻巧，完整的 Typescript 支持；
- 去除 mutations，只有 state，getters，actions（支持同步和异步）
- 没有模块嵌套，只有 store 的概念，store 之间可以自由使用
- [支持 Vue devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
## Pinia的基本使用
### 安装Pinia
```bash
npm install pinia
```
### 使用插件
```javascript
import {createPinia} from 'pinia';
const app = createApp(App);
app.use(createPinia()).mount('#app'); // 使用插件管理所有状态
```
### 定义store
> stores/counter.js

```javascript
import { defineStore } from "pinia";
export const useCounterStore = defineStore('main', {
    state: () => ({ count: 0 }), // 容器中的状态
    actions: {
        increment() {
            this.count++ // action中更改状态
        }
    }
});
```
### 组件使用
```vue
<script setup>
import {useCounterStore} from '@/stores/counter';
const store = useCounterStore();
const handleClick = ()=>{store.increment()}
</script>

<template>  
{{store.count}}
<button @click="handleClick">修改状态</button>
</template>
```
## 实现核心Pinia
> pinia/index.js

### 实现createPinia
```javascript
export function createPinia() {
    const scope = effectScope(true);  // 1.创建一个独立的effectScope
    const state = scope.run(() => ref({})); // 2.创建一个状态管理所有pinia中的状态
    const pinia = markRaw({
        install(app) {
            pinia._a = app; // 当前应用
            // 1.在当前应用中暴露pinia实例
            app.provide(piniaSymbol,pinia); 
            // 2.optionsAPI可以通过this访问到实例
            app.config.globalProperties.$pinia = pinia; 
        },
        _a:null,
        state,
        _e:scope,   
        _s:new Map() // 记录所有store
    })
    return pinia
}
```
### 实现defineStore
```javascript
export function defineStore(idOrOptions, setup) {
    let id;
    let options;
    if (typeof idOrOptions === 'string') { // id:''  {state:fn,actions:obj}
        id = idOrOptions;
        options = setup;
    } else {
        options = idOrOptions; // {id:"",state:fn,actions:obj}
        id = idOrOptions.id;
    }
    function useStore() {
        const currentInstance = getCurrentInstance(); // 1.获取当前组件实例
        const pinia = currentInstance && inject(piniaSymbol); // 2.注入pinia

        if (!pinia._s.has(id)) { // 没有过store在创建store
            createOptionsStore(id, options, pinia);
        }
        const store = pinia._s.get(id); // 取出store返回
        return store;
    }
    useStore.$id = id; // 标识useStore
    return useStore
}
```
### 创建store
```javascript
function createOptionsStore($id, options, pinia) {
    const { state, actions } = options;
    let scope;
    const store = reactive({}); // 创建一个store， 核心就是 reactive({})
    function wrapAction(name,action){ // increment,action
        return function(){
            let ret = action.apply(this,arguments); // 让this指向store
            return ret;
        }
    }
    function setup() {
        pinia.state.value[$id] = state ? state() :{};  // 1.缓存当前store的状态
        const localState = toRefs(pinia.state.value[$id]); // 2.将属性全部转化成ref

        return Object.assign( // 将actions和state合并成对象返回
            localState,
            actions,
        )
    }
    const setupStore = pinia._e.run(() => { 
        scope = effectScope(); // 需要开辟一个空间，来管理此store中的数据
        return scope.run(() => setup()); // 这个setup方法就是用来初始化store中的状态的
    });
    for(const key in setupStore){
        const prop = setupStore[key];
        if(typeof prop === 'function'){ // 对action进行一次包装
            setupStore[key] = wrapAction(key,prop);
        }
    }
    Object.assign(store,setupStore); // 合并选项
    pinia._s.set($id, store); // 放入到容器中
}
```
## 定义setupStore
```javascript
export const useCounterStore = defineStore('main', ()=>{
    const count = ref(0);
    function increment(){
        count.value++
    }
    return {count ,increment}
});
```
> 区分store的类型

```javascript
export function defineStore(idOrOptions, setup) {
    // ...
    const isSetupStore = typeof setup === 'function';  // 判断是不是setupStore
    function useStore() {
        const currentInstance = getCurrentInstance(); 
        const pinia = currentInstance && inject(piniaSymbol);
        if (!pinia._s.has(id)) { 
            if(isSetupStore){
                createSetupStore(id,setup,pinia); // 创建setupStore
            }else{
                createOptionsStore(id, options, pinia); // 创建选项store
            }
        }
        const store = pinia._s.get(id); 
        return store;
    }
    useStore.$id = id;
    return useStore
}
```
### 创建setupStore
```javascript
function createSetupStore($id,setup,pinia){
    let scope;
    const store = reactive({}); // 创建一个store， 核心就是 reactive({})

    function wrapAction(name,action){ // increment,action
        return function(){
            let ret = action.apply(this,arguments); // 让this指向store
            return ret;
        }
    }
    const setupStore = pinia._e.run(() => { 
        scope = effectScope(); // 需要开辟一个空间，来管理此store中的数据
        return scope.run(() => setup()); // 这个setup方法就是用来初始化store中的状态的
    });
    for(const key in setupStore){
        const prop = setupStore[key];
        if(typeof prop === 'function'){ // 对action进行一次包装
            setupStore[key] = wrapAction(key,prop);
        }
    }
    Object.assign(store,setupStore); // 合并选项
    pinia._s.set($id, store); // 放入到容器中
    return store;
}
```
### 创建optionsStore
```javascript
function createOptionsStore($id, options, pinia) {
    const { state, actions } = options;
    function setup() {
        pinia.state.value[$id] = state ? state() :{};  // 1.缓存当前store的状态
        const localState = toRefs(pinia.state.value[$id]); // 2.将属性全部转化成ref
        return Object.assign( // 将actions和state合并成对象返回
            localState,
            actions,
        )
    }
    createSetupStore($id,setup,pinia)
}
```
## 实现Getters
### getters使用
```javascript
export const useCounterStore = defineStore('main', {
    state: () => ({ count: 0 }), // 容器中的状态
    actions: {
        increment() {this.count++} // action中更改状态
    },
    getters:{
        doubleCount:(store)=>state.count * 2
    }
});
```
```html
<template>  
  {{store.count}} / {{store.doubleCount}}
  <button @click="handleClick">修改状态</button>
</template>
```
### getters实现
```javascript
function createOptionsStore($id, options, pinia) {
    const { state, actions,getters } = options;
    function setup() {
        pinia.state.value[$id] = state ? state() :{};  // 1.缓存当前store的状态
        const localState = toRefs(pinia.state.value[$id]); // 2.将属性全部转化成ref
        return Object.assign( // 将actions和state合并成对象返回
            localState,
            actions,
            Object.keys(getters || {}).reduce((computedGetters,name)=>{
                computedGetters[name] = computed(()=>{
                    const store = pinia._s.get($id)
                    return getters[name].call(store,store)
                });
                return computedGetters
            }, {})
        )
    }
    createSetupStore($id,setup,pinia)
}
```
## 核心方法
### $patch
> 使用$patch方法同时应用多个修改

```javascript
const store = useCounterStore();
const handleClick = ()=>{store.$patch({count:100})}
```
> 在store上增加$patch方法

```javascript
function mergeReactiveObjects(target,patchToApply){
    for(const key in patchToApply){
        if(!patchToApply.hasOwnProperty(key)) continue
        const subPatch = patchToApply[key];
        const targetValue = target[key];
        // 如果两个值都是对象, 并且不是ref
        if(isObject(targetValue) && isObject(subPatch) && !isRef(subPatch)){
            target[key] = mergeReactiveObjects(targetValue,subPatch);
        }else{
            target[key] = subPatch
        }
    }
    return target
}
```
```javascript
function createSetupStore($id,setup,pinia){
    let scope;
    function $patch(partialStateOrMutator){
        mergeReactiveObjects(pinia.state.value[$id],partialStateOrMutator);
    }
    const partialStore = {
        $patch
    }
    const store = reactive(partialStore); // 创建一个store， 核心就是 reactive({})
}
```
### **$patch批量修改**
```javascript
const handleClick = () => {
  store.$patch((state) => {
    state.count++;
    state.count++;
  })
}
```
```javascript
function $patch(partialStateOrMutator){
    // 如果是函数则调用函数传入state即可
    if(typeof partialStateOrMutator === 'function'){
        partialStateOrMutator(pinia.state.value[$id]);
    }else{
        mergeReactiveObjects(pinia.state.value[$id],partialStateOrMutator);
    }
}
```
### $reset
```javascript
const handleClick = () => {
  store.$reset() // 此方法只能在非setup语法中使用
}
```
```javascript
const store = createSetupStore($id,setup,pinia);
store.$reset = function(){
    const newState = state ? state():{}
    this.$patch(($state)=>{
        Object.assign($state,newState)
    })
}
```
### $subscribe
```javascript
store.$subscribe((mutation,state)=>{
  console.log(mutation,state)
})
```
> 监听状态变化，状态发生变化时会执行订阅的函数

```javascript
const partialStore = {
    $patch,
    $subscribe(callback,options = {}){
        scope.run(()=> watch(pinia.state.value[$id],state=>{
            callback({storeId:$id},state)
        },options))
    }
}
```
### $onActions
```javascript
const handleClick = () => {
  store.increment()
}
store.$onAction(({after,onError,name})=>{
  console.log('action running~~~',name);
  after((result)=>{ // action执行完毕后触发
    console.log(result);
  })
  onError((err)=>{  // action出错时调用
    console.warn('error',err)
  })
})
```
```javascript
export function addSubscription(subscriptions,callback){ // 添加订阅
    subscriptions.push(callback);
    const removeSubcription = () =>{
        const idx = subscriptions.indexOf(callback);
        if(idx > -1){
            subscriptions.splice(idx,1);
        }
    }
    return removeSubcription
}
export function triggerSubscriptions(subscriptions,...args){ // 触发订阅
    subscriptions.slice().forEach(cb=>cb(...args))
}
```
**实现actions**
```javascript
const partialStore = {
    $patch,
    $onAction:addSubscription.bind(null,actionSubscriptions), // 绑定action
    $subscribe(callback,options = {}){
        scope.run(()=> watch(pinia.state.value[$id],state=>{
            callback({storeId:$id},state)
        },options))
    }
}
```
**触发订阅的action**
```javascript
function wrapAction(name,action){ // increment,action
    return function(){
        const afterCallbackList = []; // afterList
        const onErrorCallbackList = []; // errList
        function after(callback){
            afterCallbackList.push(callback);
        }
        function onError(callback){
            onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions,{name,store,after,onError});
        let ret;
        try{
            ret = action.apply(this,arguments); // 让this指向store
        }catch(error){
            triggerSubscriptions(onErrorCallbackList,error);
        }
        if(ret instanceof Promise){ // 返回值是promise
            return ret.then((value)=>{
                triggerSubscriptions(afterCallbackList,value)
                return value; // 成功后触发after
            }).catch((error)=>{ // 失败则触发error
                triggerSubscriptions(onErrorCallbackList,err);
                return Promise.reject(error);
            })
        }
        return ret;
    }
}
```
### $dispose
```javascript
const partialStore = {
    $patch,
    $onAction:addSubscription.bind(null,actionSubscriptions), // 绑定action
    $subscribe(callback,options = {}){
        scope.run(()=> watch(pinia.state.value[$id],state=>{
            callback({storeId:$id},state)
        },options))
    },
    $dispose(){
        scope.stop(); // 停用store
        actionSubscriptions = []
        pinia._s.delete($id)
    }
}
```
## 核心属性
### $state
```javascript
const handleClick = () => {
  store.$state = {count:100}
}
```
```javascript
Object.defineProperty(store,'$state',{
    get:()=> pinia.state.value[$id],
    set:(state)=> $patch(($state)=> Object.assign($state,state))
})
```
## Plugin插件实现
```javascript
export function createPinia() {
    const scope = effectScope(true);  // 1.创建一个独立的effectScope
    const state = scope.run(() => ref({})); // 2.创建一个状态管理所有pinia中的状态
    let _p = [];
    const pinia = markRaw({
        install(app) {
            pinia._a = app; // 当前应用
            app.provide(piniaSymbol,pinia); // 1.在当前应用中暴露pinia实例
            app.config.globalProperties.$pinia = pinia; // 2.optionsAPI可以通过this访问到实例
        },
        use(plugin){
            _p.push(plugin);
            return this;
        },
        _p,
        _a:null,
        state,
        _e:scope,   
        _s:new Map() // 记录所有store
    })
    return pinia
}
```
```javascript
// ....
pinia._p.forEach(plugin=>{
    Object.assign(store, scope.run(()=>plugin({store,app:pinia._a,pinia})))
})
pinia._s.set($id, store); // 放入到容器中
return store;
```
> 为了能让pinia在组件外也可以被使用

```javascript
export let activePinia
export const setActivePinia = (pinia) =>(activePinia = pinia)
const pinia = markRaw({
    install(app) {
        setActivePinia(pinia); // 设置激活pinia
    },
})
```
```javascript
function useStore() {
    const currentInstance = getCurrentInstance(); 
    const pinia = currentInstance && inject(piniaSymbol);

    if(pinia) setActivePinia(pinia)
    pinia = activePinia;
	// ...
}
```
## 其他
### storeToRefs
从 Store 中提取属性同时保持其响应式，需要使用storeToRefs()。
```javascript
import { isReactive, isRef, toRef } from "vue";
export function storeToRefs(store){
    store = toRaw(store)
    const refs = {};
    for (const key in store) {
        const value = store[key]
        if (isRef(value) || isReactive(value)) {
          refs[key] = toRef(store, key)
        }
      }
    return refs
}
```
### mapState
> mapState可以用于映射state及getters

```javascript
export default {
  computed:{
	...mapState(useCounterStore,['count']), // 状态
    ...mapState(useCounterStore,{ // 映射
      myCount1:'count',
      myCount2:(store)=> store.count
    }),
    ...mapState(useCounterStore,['doubleCount']) // getters
  }
}
```
```javascript
export function mapState(useStore,keysOrMapper){
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced,key)=>{ // 数组的写法
        reduced[key] = function(){
            return useStore()[key]
        }
        return reduced
    },{}) 
    :Object.keys(keysOrMapper).reduce((reduced,key)=>{ // 对象的写法
        reduced[key] = function(){
            const store = useStore();
            const storeKey = keysOrMapper[key]; // 获取store中的值

            // 对象中函数的写法
            return typeof storeKey === 'function' ? storeKey.call(this,store) : store[storeKey] 
        }
        return reduced
    },{})
}
```
### mapWritableState
mapState只能映射状态，如果需要写入状态则使用mapWritableState
```javascript
export default {
  computed:{
    ...mapWritableState(useCounterStore,['count'])
  },
  methods:{
    handleClick(){
      this.count++;
    }
  }
}
```
```javascript
export function mapWritableState(useStore,keysOrMapper){
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced,key)=>{ // 数组的写法
        reduced[key] = {
            get(){
                return useStore(this.$pinia)[key]
            },
            set(value){
                return  useStore(this.$pinia)[key] = value
            }
        }
        return reduced
    },{}) :Object.keys(keysOrMapper).reduce((reduced,key)=>{ // 对象的写法
        reduced[key] =  {
            get(){
                return useStore()[keysOrMapper[key]]
            },
            set(value){
                return  useStore()[keysOrMapper[key]] = value
            }
        }
        return reduced
    },{})
}
```
### mapActions
```javascript
export default {
  computed:{
    ...mapWritableState(useCounterStore,['count']),
    ...mapState(useCounterStore,['doubleCount'])
  },
  methods:{
    ...mapActions(useCounterStore,['increment']), 
    ...mapActions(useCounterStore,{myIncrement:'increment'})
  },
}
```
```javascript
export function mapActions(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
        reduced[key] = function (...args) {
            return useStore()[key](...args)
        }
        return reduced
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
        // @ts-expect-error
        reduced[key] = function (...args) {
            return useStore()[keysOrMapper[key]](...args)
        }
        return reduced
    }, {})
}
```
