# redux-first-history
## 1.生成项目
- [redux-first-history](https://www.npmjs.com/package/redux-first-history) Redux history binding for react-router
```
create-react-app redux_first_history
cd redux_first_history
npm install redux react-redux  react-router-dom redux-first-history --save
```
## 2.跑通项目
### 2.1 src\index.js
src\index.js
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, Link } from "react-router-dom";
import { HistoryRouter } from "./redux-first-history/rr6";
import { Provider } from 'react-redux';
import { store, history } from "./store";
import Home from './components/Home';
import Counter from './components/Counter';
ReactDOM.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/counter">Counter</Link></li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </HistoryRouter>
  </Provider >,
  document.getElementById('root')
);
```
### 2.2 history.js
src\history.js
```javascript
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from "./redux-first-history";
const history = createBrowserHistory();
const { routerReducer, routerMiddleware, createReduxHistory } = createReduxHistoryContext({ history });
export {
  routerReducer,
  routerMiddleware,
  createReduxHistory
}
```
### 2.3 store\index.js
src\store\index.js
```javascript
import { createStore, applyMiddleware } from 'redux';
import combinedReducer from './reducers';
import { routerMiddleware, createReduxHistory } from '../history';
//routerMiddleware 可以拦截到 push('/counter') 这个action,调用history进行路径的跳转
export const store = applyMiddleware(routerMiddleware)(createStore)(combinedReducer);
window.store = store;
export const history = createReduxHistory(store);
```
### 2.4 action-types.js
src\store\action-types.js
```javascript
export const ADD = 'ADD';
export const MINUS = 'MINUS';
```
### 2.5 counter.js
src\store\reducers\counter.js
```jsx
import * as actionTypes from '../action-types';
function counter(state = { number: 0 }, action) {
  switch (action.type) {
    case actionTypes.ADD:
      return { number: state.number + 1 };
    case actionTypes.MINUS:
      return { number: state.number - 1 };
    default:
      return state;
  }
}
export default counter;
```
### 2.6 reducers\index.js
src\store\reducers\index.js
```jsx
import { combineReducers } from 'redux';
import counter from './counter';
import { routerReducer } from '../../history';
const reducers = {
  counter,
  router: routerReducer
}
export default combineReducers(reducers);
```
### 2.7 Home.js
src\components\Home.js
```jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from "../redux-first-history";
function Home() {
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  const gotoCounter = () => {
    // navigate('/counter');
    dispatch(push('/counter'));
  }
  return (
    <div>
      <p>Home</p>
      <button onClick={gotoCounter}>跳转到/counter</button>
    </div>
  )
}
export default Home;
```
### 2.9 Counter.js
src\components\Counter.js
```jsx
function Counter() {
  return (
    <div>
      <p>Counter</p>
    </div>
  )
}
export default Counter;
```
## 3.实现
### 3.1 redux-first-history\index.js
src\redux-first-history\index.js
```javascript
export { push } from './actions';
export { createReduxHistoryContext } from './create';
```
### 3.2 actions.js
src\redux-first-history\actions.js
```javascript
//调用历史对象的方法
export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';
//当路径变更后会派发这个动作给仓库，让仓库中reducer把最新的路径放入仓库状态中
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export function locationChangeAction(location, action) {
  return {
    type: LOCATION_CHANGE,
    payload: { action, location }
  }
}

function updateLocation(method) {
  return (...args) => {
    return {
      type: CALL_HISTORY_METHOD,
      payload: { method, args }
    }
  }
}

export const push = updateLocation('push');
```
### 3.3 create.js
src\redux-first-history\create.js
```javascript
import { createRouterMiddleware } from './middleware';
import { push, locationChangeAction } from './actions';
import { createRouterReducer } from './reducer';
/**
 * 创建redux版本的history 上下文
 * @param {*} history 原始的history对象  
 */
export function createReduxHistoryContext({ history }) {
  const routerMiddleware = createRouterMiddleware(history);
  const routerReducer = createRouterReducer(history);
  function createReduxHistory(store) {
    store.dispatch(locationChangeAction(history.location, history.action));
    //订阅路径变化事件，当路径发生变化后重新添发动作给仓库，重新保存路径
    history.listen(({ location, action }) => {
      store.dispatch(locationChangeAction(location, action));
    });
    return {
      createHref: history.createHref,
      push: (...args) => store.dispatch(push(...args)),//history.push('/counter');
      listen: history.listen,
      get location() {//原来获取路径是从history对象上取的，现在是从仓库中取
        return store.getState().router.location;
      },
      get action() {
        return store.getState().router.action;
      }
    };
  }
  return {
    routerMiddleware,
    createReduxHistory,
    routerReducer
  }
}
```
### 3.4 middleware.js
src\redux-first-history\middleware.js
```javascript
import { CALL_HISTORY_METHOD } from './actions'

export function createRouterMiddleware(history) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type !== CALL_HISTORY_METHOD) {
          return next(action);
        }
        const { method, args } = action.payload;
        history[method](...args);
      }
    }
  }
}
```
### 3.5 reducer.js
src\redux-first-history\reducer.js
```javascript
import { LOCATION_CHANGE } from './actions';
export function createRouterReducer(history) {
  const initialState = {
    action: history.action,
    location: history.location
  }
  return function (state = initialState, action) {
    if (action.type === LOCATION_CHANGE) {
      return { ...state, location: action.payload.location, action: action.payload.action };
    } else {
      return state;
    }
  }
}
```
### 3.6 rr6\index.js
src\redux-first-history\rr6\index.js
```jsx
import React from 'react';
import { Router } from 'react-router';

export function HistoryRouter({ history, children }) {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });
  React.useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);
  return (
    <Router
      location={state.location}
      action={state.action}
      navigator={history}
      navigationType={state.action}
      >
      {children}
    </Router>
  )

}
```
