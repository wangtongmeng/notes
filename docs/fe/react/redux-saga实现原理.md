# redux-saga实现原理
## redux-saga
- [redux-saga](https://redux-saga-in-chinese.js.org/) 是一个 redux 的中间件，而中间件的作用是为 redux 提供额外的功能。
- 在 reducers 中的所有操作都是同步的并且是纯粹的，即 reducer 都是纯函数，纯函数是指一个函数的返回结果只依赖于它的参数，并且在执行过程中不会对外部产生副作用，即给它传什么，就吐出什么。
- 但是在实际的应用开发中，我们希望做一些异步的（如Ajax请求）且不纯粹的操作（如改变外部的状态），这些在函数式编程范式中被称为“副作用”。

redux-saga 就是用来处理上述副作用（异步任务）的一个中间件。它是一个接收事件，并可能触发新事件的过程管理者，为你的应用管理复杂的流程。
## redux-saga工作原理

- sagas 采用 Generator 函数来 yield Effects（包含指令的文本对象）
- Generator 函数的作用是可以暂停执行，再次执行的时候从上次暂停的地方继续执行
- Effect 是一个简单的对象，该对象包含了一些给 middleware 解释执行的信息。
- 你可以通过使用 effects API 如 fork，call，take，put，cancel 等来创建 Effect。
## redux-saga分类

- worker saga 做执行的工作，如调用API，进行异步请求，获取异步封装结果
- watcher saga 监听被dispatch的actions,当接受到action或者知道其被触发时，调用worker执行任务
- root saga 立即启动saga的唯一入口
## 创建项目
```bash
 1.create-react-app saga-test
 2.yarn add redux-saga redux react-redux
 3.精简项目
```
## 计数器
### index.js
src/index.js
```jsx
import React from 'react'
import ReactDOM from 'react-dom';
import Counter from './components/Counter';
import {Provider} from 'react-redux';
import store from './store';
ReactDOM.render(<Provider store={store}>
  <Counter/>
</Provider>,document.querySelector('#root'));
```
### store/sagas.js
src\store\sagas.js
```javascript
import {put,take} from 'redux-saga/effects';
import * as types from './action-types';

export default function* rootSaga() {
    for (let i=0;i<3;i++){
        yield take(types.ASYNC_ADD);
        yield put({type:types.ADD});
    }
    console.log('已经达到最大值');
}
```
### Counter.js
src/components/Counter.js
```javascript
import React,{Component} from 'react'
import {connect} from 'react-redux';
import actions from '../store/actions';
class Counter extends Component{
    render() {
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.add}>+</button>
            </div>
      )
  }
}
export default connect(
    state => state,
    actions
)(Counter);
```
### store/index.js
src/store/index.js
```javascript
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
let sagaMiddleware=createSagaMiddleware();
let store=applyMiddleware(sagaMiddleware)(createStore)(reducer);
sagaMiddleware.run(rootSaga);
window.store=store;
export default store;
```
### actions.js
src/store/actions.js
```javascript
import * as types from './action-types';
const actions = {
    add() {
        return {type:types.ASYNC_ADD}
    }
}
export default  actions
```
### action-types.js
src/store/action-types.js
```javascript
export const ASYNC_ADD='ASYNC_ADD';
export const ADD='ADD';
```
### reducer.js
src/store/reducer.js
```javascript
import * as types from './action-types';
export default function reducer(state={number:0},action) {
    switch(action.type){
        case types.ADD:
            return {number: state.number+1};
        default:
            return state;
    }
}
```
## 实现take

- [runSaga.js](https://github.com/redux-saga/redux-saga/blob/master/packages/core/src/internal/runSaga.js)
### effectTypes.js
src\redux-saga\effectTypes.js
```javascript
export const TAKE = 'TAKE'; //监听
export const PUT = 'PUT'; //派发
```
### effects.js
src\redux-saga\effects.js
返回不同类型的action
```javascript
import * as effectTypes from './effectTypes'
export function take(actionType) {
    return { type: effectTypes.TAKE, actionType}
}

export function put(action) {
    return { type: effectTypes.PUT, action }
}
```
### channel.js
src\redux-saga\channel.js
发布订阅，take监听，put执行
```javascript
export default function stdChannel() {
    let currentTakers = [];
    function take(actionType,taker) {
        taker.actionType = actionType;
        taker.cancel = () => {
            currentTakers = currentTakers.filter(item => item !== taker);
        }
        currentTakers.push(taker);
    }

    function put(action) {
        currentTakers.forEach(taker => {
            if (taker.actionType === action.type) {
                taker.cancel();
                taker(action);
            }
        });
    }

    return { take, put };
}
```
### runSaga.js
src\redux-saga\runSaga.js
runSage接收一个生成器saga，根据action做不同的处理
```javascript
import * as effectTypes from './effectTypes'
export default function runSaga(env, saga) { // sage是个生成器
    let { channel, dispatch } = env;
    let it = saga();
    function next(value) { // 类似co库
        let {value:effect,done} = it.next(value);
        if (!done) {
            switch (effect.type) {
                case effectTypes.TAKE:
                    channel.take(effect.actionType,next);
                    break;
                case effectTypes.PUT:
                    dispatch(effect.action);
                    next();
                    break;
                default:
                    break;
            }
        }
    }
    next();
}
```
## 支持产出iterator 
### store/sagas.js
src\store\sagas.js
```diff
import { put, take } from '../redux-saga/effects';
import * as types from './action-types';
+export function* add() {
+    yield put({ type: types.ADD });
+}
export default function* rootSaga() {
    for (let i = 0; i < 3; i++) {
        yield take(types.ASYNC_ADD);
+        yield add();
    }
    console.log('已经达到最大值');
}
```
### runSaga.js
src\redux-saga\runSaga.js
```diff
import * as effectTypes from './effectTypes'
export default function runSaga(env, saga) {
    let { channel, dispatch } = env;
+    let it = typeof saga == 'function' ? saga() : saga;
    function next(value) {
        let { value: effect, done } = it.next(value);
        if (!done) {
+            if (typeof effect[Symbol.iterator] == 'function') {
+                runSaga(env,effect);
+                next();
+            } else {
                switch (effect.type) {
                    case effectTypes.TAKE:
                        channel.take(effect.actionType, next);
                        break;
                    case effectTypes.PUT:
                        dispatch(effect.action);
                        next();
                        break;
                    default:
                        break;
                }
            }

        }
    }
    next();
}
```
## 支持takeEvery

- 一个 task 就像是一个在后台运行的进程，在基于redux-saga的应用程序中，可以同时运行多个task
- 通过 fork 函数来创建 task
> takeEvery 监听action，每监听到一个action，就执行一次操作
> fork 异步非阻塞调用，无阻塞的执行fn，执行fn时，不会暂停Generator

### store/sagas.js
src\store\sagas.js
```diff
+import { put, takeEvery } from '../redux-saga/effects';
import * as actionTypes from './action-types';
export function* add() {
    yield put({ type: actionTypes.ADD });
}
export default function* rootSaga() {
+    yield takeEvery(actionTypes.ASYNC_ADD,add);
}
```
### effectTypes.js
src\redux-saga\effectTypes.js
```diff
export const TAKE = 'TAKE';
export const PUT = 'PUT';
+export const FORK = 'FORK';
```
### effects.js
src\redux-saga\effects.js
```diff
import * as effectTypes from './effectTypes'
export function take(actionType) {
    return { type: effectTypes.TAKE, actionType }
}

export function put(action) {
    return { type: effectTypes.PUT, action }
}

+export function fork(saga) {
+    return { type: effectTypes.FORK, saga };
+}

+export function takeEvery(pattern, saga) {
+    function* takeEveryHelper() {
+        while (true) {
+            yield take(pattern);
+            yield fork(saga);
+        }
+    }
+    return fork(takeEveryHelper);
+}
```
### runSaga.js
src\redux-saga\runSaga.js
```diff
import * as effectTypes from './effectTypes'
export default function runSaga(env, saga) {
    let { channel, dispatch } = env;
    let it = typeof saga == 'function' ? saga() : saga;
    function next(value) {
        let { value: effect, done } = it.next(value);
        if (!done) {
            if (typeof effect[Symbol.iterator] == 'function') {
                runSaga(env,effect);
                next();
            } else {
                switch (effect.type) {
                    case effectTypes.TAKE:
                        channel.take(effect.actionType, next);
                        break;
                    case effectTypes.PUT:
                        dispatch(effect.action);
                        next();
                        break;
+                    case effectTypes.FORK:
+                        runSaga(env,effect.saga);
+                        next();
+                        break;
                    default:
                        break;
                }
            }

        }
    }
    next();
}
```
## 支持promise
### store/sagas.js
src\store\sagas.js
```diff
import { put, takeEvery } from '../redux-saga/effects';
import * as actionTypes from './action-types';
+const delay = ms => new Promise((resolve, reject) => { // delay 执行会返回一个promsie
+    setTimeout(() => {
+        resolve();
+    }, ms);
+});
export function* add() {
+    yield delay(1000); // 一秒后再往后执行
    yield put({ type: actionTypes.ADD });
}
export default function* rootSaga() {
    yield takeEvery(actionTypes.ASYNC_ADD, add);
}
```
### redux-saga/index.js
```diff
import * as effectTypes from './effectTypes'
export default function runSaga(env, saga) {
    let { channel, dispatch } = env;
    let it = typeof saga == 'function' ? saga() : saga;
    function next(value) {
        let { value: effect, done } = it.next(value);
        if (!done) {
            if (typeof effect[Symbol.iterator] == 'function') {
                runSaga(env,effect);
                next();
+            }else if(effect.then){ // 如果迭代器返回的value是promise
+                effect.then(next); // 等promise执行完再执行迭代器
+            } else {
                switch (effect.type) {
                    case effectTypes.TAKE:
                        channel.take(effect.actionType, next);
                        break;
                    case effectTypes.PUT:
                        dispatch(effect.action);
                        next();
                        break;
                    case effectTypes.FORK:
                        runSaga(env,effect.saga);
                        next();
                        break;
                    default:
                        break;
                }
            }

        }
    }
    next();
}
```
## 支持 call
> call 异步阻塞调用

### store/sagas.js
src\store\sagas.js
```diff
+import { put, takeEvery,call } from '../redux-saga/effects';
import * as actionTypes from './action-types';
const delay = ms => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, ms);
});
export function* add() {
+    yield call(delay,1000);
    yield put({ type: actionTypes.ADD });
}
export default function* rootSaga() {
    yield takeEvery(actionTypes.ASYNC_ADD, add);
}
```
### effectTypes.js
src\redux-saga\effectTypes.js
```diff
export const TAKE = 'TAKE';
export const PUT = 'PUT';
export const FORK = 'FORK';
+export const CALL = 'CALL';
```
### effects.js
src\redux-saga\effects.js
```diff
import * as effectTypes from './effectTypes'
export function take(actionType) {
    return { type: effectTypes.TAKE, actionType }
}

export function put(action) {
    return { type: effectTypes.PUT, action }
}

export function fork(saga) {
    return { type: effectTypes.FORK, saga };
}

export function takeEvery(pattern, saga) {
    function* takeEveryHelper() {
        while (true) {
            yield take(pattern);
            yield fork(saga);
        }
    }
    return fork(takeEveryHelper);
}
+export function call(fn, ...args) {
+    return { type: effectTypes.CALL, fn, args };
+}
```
### runSaga.js
src\redux-saga\runSaga.js
```diff
import * as effectTypes from './effectTypes'
export default function runSaga(env, saga) {
    let { channel, dispatch } = env;
    let it = typeof saga == 'function' ? saga() : saga;
    function next(value) {
        let { value: effect, done } = it.next(value);
        if (!done) {
            if (typeof effect[Symbol.iterator] == 'function') {
                runSaga(env,effect);
                next();
            }else if(effect.then){
                effect.then(next);
            } else {
                switch (effect.type) {
                    case effectTypes.TAKE:
                        channel.take(effect.actionType, next);
                        break;
                    case effectTypes.PUT:
                        dispatch(effect.action);
                        next();
                        break;
                    case effectTypes.FORK:
                        runSaga(env,effect.saga);
                        next();
                        break;
+                    case effectTypes.CALL:
+                        effect.fn(...effect.args).then(next);
+                        break;
                    default:
                        break;
                }
            }

        }
    }
    next();
}
```
## 支持 cps
> cps 回调函数的写法

### store/sagas.js
src\store\sagas.js
```diff
+import { put, takeEvery,call,cps} from '../redux-saga/effects';
import * as actionTypes from './action-types';
+const delay = (ms,callback)=>{
+    setTimeout(() => {
+        callback(null,'ok');
+    },ms);
+}
export function* add() {
+    let data = yield cps(delay,1000);
+    console.log(data);
    yield put({ type: actionTypes.ADD });
}
export default function* rootSaga() {
    yield takeEvery(actionTypes.ASYNC_ADD, add);
}
```
### effectTypes.js
src\redux-saga\effectTypes.js
```diff
export const TAKE = 'TAKE';
export const PUT = 'PUT';
export const FORK = 'FORK';
export const CALL = 'CALL';
+export const CPS = 'CPS';
```
### effects.js
src\redux-saga\effects.js
```diff
import * as effectTypes from './effectTypes'
export function take(actionType) {
    return { type: effectTypes.TAKE, actionType }
}

export function put(action) {
    return { type: effectTypes.PUT, action }
}

export function fork(saga) {
    return { type: effectTypes.FORK, saga };
}

export function takeEvery(pattern, saga) {
    function* takeEveryHelper() {
        while (true) {
            yield take(pattern);
            yield fork(saga);
        }
    }
    return fork(takeEveryHelper);
}
export function call(fn, ...args) {
    return { type: effectTypes.CALL, fn, args };
}
+export function cps(fn, ...args) {
+    return { type: effectTypes.CPS, fn, args };	
+}
```
### runSaga.js
src\redux-saga\runSaga.js
```diff
import * as effectTypes from './effectTypes'
export default function runSaga(env, saga) {
    let { channel, dispatch } = env;
    let it = typeof saga == 'function' ? saga() : saga;
+    function next(value,isErr) {
+        let result;
+        if (isErr) {
+            result = it.throw(value);
+          } else {
+            result = it.next(value);
+          }
+        let { value: effect, done } = result;
        if (!done) {
            if (typeof effect[Symbol.iterator] == 'function') {
                runSaga(env,effect);
                next();
            }else if(effect.then){
                effect.then(next);
            } else {
                switch (effect.type) {
                    case effectTypes.TAKE:
                        channel.take(effect.actionType, next);
                        break;
                    case effectTypes.PUT:
                        dispatch(effect.action);
                        next();
                        break;
                    case effectTypes.FORK:
                        runSaga(env,effect.saga);
                        next();
                        break;
                    case effectTypes.CALL:
                        effect.fn(...effect.args).then(next);
                        break;
+                    case effectTypes.CPS:
+                        effect.fn(...effect.args,(err,data)=>{
+                            if(err){
+                                next(err,true);
+                            }else{
+                                next(data);
+                            }
+                        });
+                        break;    
                    default:
                        break;
                }
            }

        }
    }
    next();
}
```
## 支持all
### store/sagas.js
src\store\sagas.js
```diff
import { put, takeEvery, call, cps, take,all } from '../redux-saga/effects';
import * as actionTypes from './action-types';
+export function* add1() {
+    for (let i = 0; i < 3; i++) {
+        yield take(actionTypes.ASYNC_ADD);
+        yield put({ type: actionTypes.ADD });
+    }
+    return 'add1';
+}
+export function* add2() {
+    for (let i = 0; i < 3; i++) {
+        yield take(actionTypes.ASYNC_ADD);
+        yield put({ type: actionTypes.ADD });
+    }
+    return 'add2';
+}
export default function* rootSaga() {
+    let result = yield all([add1(), add2()]);
+    console.log('done', result);
}
```
### effectTypes.js
src\redux-saga\effectTypes.js
```javascript
export const TAKE = 'TAKE';
export const PUT = 'PUT';
export const FORK = 'FORK';
export const CALL = 'CALL';
export const CPS = 'CPS';
+export const ALL = 'ALL';
```
### effects.js
src\redux-saga\effects.js
```diff
import * as effectTypes from './effectTypes'
export function take(actionType) {
    return { type: effectTypes.TAKE, actionType }
}

export function put(action) {
    return { type: effectTypes.PUT, action }
}

export function fork(saga) {
    return { type: effectTypes.FORK, saga };
}

export function takeEvery(pattern, saga) {
    function* takeEveryHelper() {
        while (true) {
            yield take(pattern);
            yield fork(saga);
        }
    }
    return fork(takeEveryHelper);
}
export function call(fn, ...args) {
    return { type: effectTypes.CALL, fn, args };
}
export function cps(fn, ...args) {
    return { type: effectTypes.CPS, fn, args };
}
+export function all(effects) {
+    return { type: effectTypes.ALL, effects };
+}
```
### runSaga.js
src\redux-saga\runSaga.js
```diff
import * as effectTypes from './effectTypes'
+export default function runSaga(env, saga,callback) {
    let { channel, dispatch } = env;
    let it = typeof saga == 'function' ? saga() : saga;
    function next(value, isErr) {
        let result;
        if (isErr) {
            result = it.throw(value);
        } else {
            result = it.next(value);
        }
        let { value: effect, done } = result;
        if (!done) {
            if (typeof effect[Symbol.iterator] == 'function') {
                runSaga(env, effect);
                next();
            } else if (effect.then) {
                effect.then(next);
            } else {
                switch (effect.type) {
                    case effectTypes.TAKE:
                        channel.take(effect.actionType, next);
                        break;
                    case effectTypes.PUT:
                        dispatch(effect.action);
                        next();
                        break;
                    case effectTypes.FORK:
                        runSaga(env, effect.saga);
                        next();
                        break;
                    case effectTypes.CALL:
                        effect.fn(...effect.args).then(next);
                        break;
                    case effectTypes.CPS:
                        effect.fn(...effect.args, (err, data) => {
                            if (err) {
                                next(err, true);
                            } else {
                                next(data);
                            }
                        });
                        break;
+                    case effectTypes.ALL:
+                        let effects=effect.effects;
+                        let result = [];
+                        let complete=0;
+                        effects.forEach((effect,index)=>runSaga(env,effect,(res)=>{ // 类似 Promise.all
+                            result[index]=res;
+                            if(++complete === effects.length)
+                                next(result);
+                        }));
+                        break;
                    default:
                        break;
                }
            }
        } else {
+            callback && callback(effect);
        }
    }
    next();
}
```
## 取消任务
### store/sagas.js
src\store\sagas.js
```diff
+import { put, takeEvery, call, cps, all, take, cancel, fork, delay } from '../redux-saga/effects';
+import * as actionTypes from './action-types';
+export function* add() {
+    while (true) {
+        yield delay(1000);
+        yield put({ type: actionTypes.ADD });
+    }
+}
+export function* addWatcher() {
+    const task = yield fork(add);
+    console.log(task);
+    yield take(actionTypes.STOP_ADD);
+    yield cancel(task);
+}

+export default function* rootSaga() {
+    yield addWatcher();
+}
```
### effectTypes.js
src\redux-saga\effectTypes.js
```diff
export const TAKE = 'TAKE';
export const PUT = 'PUT';
export const FORK = 'FORK';
export const CALL = 'CALL';
export const CPS = 'CPS';
export const ALL = 'ALL';
+export const CANCEL = 'CANCEL';
```
### effects.js
src\redux-saga\effects.js
```diff
import * as effectTypes from './effectTypes'
export function take(actionType) {
    return { type: effectTypes.TAKE, actionType }
}

export function put(action) {
    return { type: effectTypes.PUT, action }
}

export function fork(saga) {
    return { type: effectTypes.FORK, saga };
}

export function takeEvery(pattern, saga) {
    function* takeEveryHelper() {
        while (true) {
            yield take(pattern);
            yield fork(saga);
        }
    }
    return fork(takeEveryHelper);
}
export function call(fn, ...args) {
    return { type: effectTypes.CALL, fn, args };
}
export function cps(fn, ...args) {
    return { type: effectTypes.CPS, fn, args };
}
export function all(effects) {
    return { type: effectTypes.ALL, effects };
}
+export function cancel(task) {
+    return { type: effectTypes.CANCEL, task };
+}

+export default function delayP(ms, val = true) {
+    const promise = new Promise(resolve => {
+        setTimeout(resolve, ms, val);
+    })
+    return promise
+}
+export const delay = call.bind(null, delayP);
```
### symbols.js
src\redux-saga\symbols.js
```javascript
export const  TASK_CANCEL = Symbol('TASK_CANCEL');
```
### runSaga.js
src\redux-saga\runSaga.js
```diff
import * as effectTypes from './effectTypes';
+import {TASK_CANCEL} from './symbols';
export default function runSaga(env, saga,callback) {
+    let task = {cancel:()=>next(TASK_CANCEL)};
    let { channel, dispatch } = env;
    let it = typeof saga == 'function' ? saga() : saga;
    function next(value, isErr) {
        let result;
        if (isErr) {
            result = it.throw(value);
+        }else if(value === TASK_CANCEL){
+            result = it.return(value);
        } else {
            result = it.next(value);
        }
        let { value: effect, done } = result;
        if (!done) {
            if (typeof effect[Symbol.iterator] == 'function') {
                runSaga(env, effect);
                next();
            } else if (effect.then) {
                effect.then(next);
            } else {
                switch (effect.type) {
                    case effectTypes.TAKE:
                        channel.take(effect.actionType, next);
                        break;
                    case effectTypes.PUT:
                        dispatch(effect.action);
                        next();
                        break;
                    case effectTypes.FORK:
+                        let forkTask = runSaga(env, effect.saga);
+                        next(forkTask);
                        break;
                    case effectTypes.CALL:
                        effect.fn(...effect.args).then(next);
                        break;
                    case effectTypes.CPS:
                        effect.fn(...effect.args, (err, data) => {
                            if (err) {
                                next(err, true);
                            } else {
                                next(data);
                            }
                        });
                        break;
                    case effectTypes.ALL:
                        let effects=effect.effects;
                        let result = [];
                        let complete=0;
                        effects.forEach((effect,index)=>runSaga(env,effect,(res)=>{
                            result[index]=res;
                            if(++complete === effects.length)
                                next(result);
                        }));
                        break;
+                    case effectTypes.CANCEL:
+                        effect.task.cancel();
+                        next();
+                        break;    
                    default:
                        break;
                }
            }
        } else {
            callback && callback(effect);
        }
    }
    next();
+    return task;
}
```
### action-types.js
src\store\action-types.js
```diff
export const ASYNC_ADD='ASYNC_ADD';
export const ADD='ADD';
+export const STOP_ADD='STOP_ADD';
```
### Counter.js
src\components\Counter.js
```diff
import React,{Component} from 'react'
import {connect} from 'react-redux';
import actions from '../store/actions';
class Counter extends Component{
    render() {
        return (
            <div>
                <p>{this.props.number}</p>
+                <button onClick={this.props.stop}>stop</button>
            </div>
      )
  }
}
export default connect(
    state => state,
    actions
)(Counter);
```
### actions.js
src\store\actions.js
```diff
import * as actionTypes from './action-types';
const actions = {
    add() {
        return { type: actionTypes.ASYNC_ADD }
    },
+    stop() {
+        return { type: actionTypes.STOP_ADD }
+    }
}
export default actions
```
