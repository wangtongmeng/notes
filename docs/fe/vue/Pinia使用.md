# Pinia使用
## 创建项目
```bash
npm create vue@latest
```
只选择pinia即可，删除无用文件
## src/main.js
```javascript
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());

app.mount("#app");
```
## src/App.vue
```vue
<script setup>
import OptComp from './views/OptComp.vue';
import SetupComp from './views/SetupComp.vue';
import OptCompWithSetup from './views/OptCompWithSetup.vue';
</script>

<template>
  <SetupComp />
  <div>=======组件用options api，通过映射辅助函数使用Store</div>
  <OptComp />
  <div>=======组件用options api，使用Setup辅助</div>
  <OptCompWithSetup />
</template>

<style scoped>

</style>
```
## src/store
### src/store/counter.js
```javascript
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

// Setup函数的写法（实现高级用法）
// export const useCounterStore = defineStore("counter", () => {
//   const count = ref(0); // ref() 就是 state 属性
//   const doubleCount = computed(() => count.value * 2); // computed() 就是 getters
//   function increment() { // function() 就是 actions
//     count.value++;
//   }

//   return { count, doubleCount, increment };
// });

// 对象的写法
export const useCounterStore = defineStore("counter", {
  // 定义 state  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      count: 0,
      num: 1,
      items: [{ name: "lisi" }],
      users: [{ name: "lisi", id: 1 }],
    };
  },
  getters: {
    double: (store) => store.count * 2,
    // 通过this访问getters
    doubleCountPlusOne() {
      return this.double + 1;
    },
    // 像getter传递参数
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId);
    },
    otherGetter(state) {
      const userStore = useUserStore();
      return state.count + userStore.user.name;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
    async someRequest() {
      try {
        this.items = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([{ name: "张三" }, { name: "李四" }]);
          }, 1000);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getUsers() {
      const userStore = useUserStore();
      if (userStore.user) {
        await this.someRequest();
      } else {
        throw new Error("未登录");
      }
    },
  },
});

```
### src/store/user.js
```javascript
import { ref, computed } from "vue";
import { defineStore } from "pinia";

// 对象的写法
export const useUserStore = defineStore("user", {
  state: () => {
    return { user: { name: "wtm", age: 18 } };
  },
});

```
## 在setup组件中使用
src\views\SetupComp.vue
```vue
<template>
  <div>属性 直接通过store访问 {{ counter.count }}</div>
  <div>属性 解构后访问 {{ count }}</div>
  <div>计算属性 直接通过store访问{{ counter.double }} | {{ counter.doubleCountPlusOne }} | {{ counter.getUserById(1) }} | {{ counter.otherGetter }}</div>
  <div>计算属性 解构后{{ double }} | {{ doubleCountPlusOne }} | {{ getUserById(1) }} | {{ otherGetter }} </div>
  <ul>
    <li v-for="item in items">{{ item.name }}</li>
  </ul>
  <button @click="counter.increment">actions 同步操作 直接通过store调用</button>
  <button @click="increment">actions 同步操作 调用解构后的访问</button>
  <button @click="counter.$reset">重置 直接通过store调用</button>
  <button @click="$reset">重置 解构后调用 </button>
  <button @click="someRequest">actions 异步请求</button>
  <button @click="getUsers">actions 异步请求 结合其他store数据</button>
</template>
<script setup>
import {useCounterStore} from '@/stores/counter'
import { storeToRefs } from 'pinia';
const counter = useCounterStore()
const {count, double, getUserById,  doubleCountPlusOne, otherGetter, items} = storeToRefs(counter) // 解构使用 storeToRefs
const {someRequest, getUsers, increment, $reset } = counter // 方法直接解构

// 改变store中state的值
counter.count++ // 1.直接改
counter.$patch({count: counter.count + 1}) // 2.通过$patch
counter.increment() // 3.通过action

</script>
<style scoped>
button {
  display: block;
}
li {
  display: inline-block;
}
</style>

```
## 在options api组件中使用setup辅助
src\views\OptCompWithSetup.vue
```vue
<template>
  <div>属性 直接通过store访问 {{ counter.count }}</div>
  <div>属性 解构后访问 {{ count }}</div>
  <div>计算属性 直接通过store访问{{ counter.double }} | {{ counter.doubleCountPlusOne }} | {{ counter.getUserById(1) }} | {{ counter.otherGetter }}</div>
  <div>计算属性 解构后{{ double }} | {{ doubleCountPlusOne }} | {{ getUserById(1) }} | {{ otherGetter }} </div>
  <ul>
    <li v-for="item in items">{{ item.name }}</li>
  </ul>
  <button @click="counter.increment">actions 同步操作 直接通过store调用</button>
  <button @click="increment">actions 同步操作 调用解构后的访问</button>
  <button @click="counter.$reset">重置 直接通过store调用</button>
  <button @click="someRequest">actions 异步请求</button>
  <button @click="getUsers">actions 异步请求 结合其他store数据</button>
</template>
<script>
import { defineComponent } from 'vue';
import { storeToRefs} from 'pinia'
import {useCounterStore} from '@/stores/counter'

export default defineComponent({
  setup(){
    const counter = useCounterStore()
    const {count, double, getUserById,  doubleCountPlusOne, otherGetter, items} = storeToRefs(counter) // 解构使用 storeToRefs
const {someRequest, getUsers, increment } = counter // 方法直接解构
    return {counter, count, double, getUserById,  doubleCountPlusOne, otherGetter, items, someRequest, getUsers, increment }
  },
  computed: {

  },
  methods: {

  },
  
})
</script>

<style scoped>
button {
  display: block;
}
li {
  display: inline-block;
}
</style>

```
## 在options api组件中使用
src\views\OptComp.vue
```vue
<template>
  <div>属性 通过mapStores映射后 直接通过store访问 {{ counterStore.count }}</div>
  <div>属性 通过mapState映射后 访问 {{ count }}</div>
  <div>属性 通过mapState映射后 重命名 {{ myCount }}</div>
  <div>计算属性 通过mapStores映射后  直接通过store访问 {{ counterStore.double }}</div>
  <div>计算属性 通过mapState映射后  访问 {{ double}}</div>  
  <div>计算属性 通过mapState映射后  重命名 {{ myDouble}}</div>  
  <div>计算属性 通过mapState映射后  使用函数获取store中的getters {{ double2 }}</div>  
  <div>计算属性 通过mapState映射后  计算属性同时访问store和this {{ magicValue }}</div>
  <ul>
    <li v-for="item in items">{{ item.name }}</li>
  </ul>
  <button @click="">actions 通过mapStores映射后 直接通过store访问</button>
</template>
<script>
import { defineComponent } from 'vue';
import {mapStores, mapState, mapActions, mapWritableState} from 'pinia'
import {useCounterStore} from '@/stores/counter'
import {useUserStore} from '@/stores/user'


export default defineComponent({
  computed: {
    // 允许访问 this.counterStore 和 this.userStore
    ...mapStores(useCounterStore, useUserStore),
    // 允许读取 this.count 和 this.double
    ...mapState(useCounterStore, ['count', 'double', 'items']),
    // mapState接收对象
    ...mapState(useCounterStore, {
      myCount: 'count', // 重命名
      myDouble: 'double',
      double2: store => store.double * 2, // 函数的方式，通过store访问
      magicValue (store) { // 访问store和this
        return store.count + this.count + this.double
      }
    }),
    // this.num++ 与从 store.num 中读取的数据相同
    ...mapWritableState(useCounterStore, ['num']),
    // 重命名
    ...mapWritableState(useCounterStore, {
      myNum: 'num'
    })
  },
  methods: {
    // 允许读取 this.increment()
    ...mapActions(useCounterStore, ['increment']),
    ...mapActions(useCounterStore, {myIncrement: 'increment'}),
    reset () {
      // 在选项式api中，重置store中的state
      const counter = useCounterStore()
      counter.$reset()
    },
    addNum () {
      const counter = useCounterStore()
      // 更新数据
      // 1.方式1
      // this.num++
      // 2.通过$patch

      // counter.$patch({
      //   num: counter.num + 2,
      //   count: counter.count + 1,
      // })

      //3.$patch函数的方式
      // counter.$patch((state) => {
      //   state.items.push({name: '王五'})
      //   state.count++
      // })
      // 4.替换state 在它内部调用 `$patch()`：
      counter.$state = {count: 1, num: 2, items: [{name: '赵六'}]}
    }
  }
})
</script>

<style scoped>
button {
  display: block;
}
li {
  display: inline-block;
}
</style>
```
## 
