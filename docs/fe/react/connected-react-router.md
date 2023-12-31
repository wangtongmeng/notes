# connected-react-router
## 生成项目
```javascript
create-react-app connected_router_test
cd connected_router_test
cnpm i redux react-redux  react-router-dom connected-react-router -S
```
## 2.跑通项目
### 2.1 src\index.js
src\index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Counter from './components/Counter';
import history from './history';
import store from './store';
import { Provider } from 'react-redux';
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <>
        <Link to="/">Home</Link>
        <Link to="/counter">Counter</Link>
        <Route exact={true} path="/" component={Home} />
        <Route path="/counter" component={Counter} />
      </>
    </Router>
  </Provider>
  , document.getElementById('root'));
```
### 2.2 history.js
src\history.js
```
import { createBrowserHistory } from 'history'
let history = createBrowserHistory();
export default history;
```
### 2.3 store\index.js
src\store\index.js
```
import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers';
const store = applyMiddleware()(createStore)(reducers);
export default store;
```
### 2.4 action-types.js
src\store\action-types.js
```
export const ADD = 'ADD';
export const MINUS = 'MINUS';
```
### 2.5 counter.js
src\store\actionCreators\counter.js
```
import * as actionTypes from '../action-types';
const actionCreators = {
    add() {
        return { type: actionTypes.ADD }
    },
    minus() {
        return { type: actionTypes.MINUS }
    }
}
export default actionCreators
```
### 2.6 counter.js
src\store\reducers\counter.js
```
import * as types from '../action-types';
let initialState = { number: 0 }
function reducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD:
            return { number: state.number + 1 };
        case types.MINUS:
            return { number: state.number - 1 };
        default:
            return state;
    }
}
export default reducer;
```
### 2.7 reducers\index.js
src\store\reducers\index.js
```
import { combineReducers } from 'redux'
import counter from './counter';
let reducers = {
    counter
};
let rootReducer = combineReducers(reducers);
export default rootReducer;
```
### 2.8 Home.js
src\components\Home.js
```
import React, { Component } from 'react';
export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <button onClick={() => this.props.history.go(-1)}>返回</button>
            </div>
        )
    }
}
```
### 2.9 Counter.js
src\components\Counter.js
```
import React from 'react'
import { connect } from 'react-redux';
import actionCreators from '../store/actionCreators/counter';
class Counter extends React.Component {
    render() {
        return (
            <>
                <p>{this.props.number}</p>
                <button onClick={this.props.add}>+</button>
                <button onClick={this.props.minus}>-</button>
            </>
        )
    }
}
let mapStateToProps = (state) => state.counter;
export default connect(
    mapStateToProps,
    actionCreators
)(Counter);
```
## 3.同步路由状态到仓库
### 3.1 src\index.js
src\index.js
```diff
import React from 'react';
import ReactDOM from 'react-dom';
+import { Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Counter from './components/Counter';
import history from './history';
import store from './store';
import { Provider } from 'react-redux';
+import { ConnectedRouter } from './connected-react-router';
ReactDOM.render(
  <Provider store={store}>
+   <ConnectedRouter history={history}>
      <>
        <Link to="/">Home</Link>
        <Link to="/counter">Counter</Link>
        <Route exact={true} path="/" component={Home} />
        <Route path="/counter" component={Counter} />
      </>
+   </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
```
### 3.2 reducers\index.js
src\store\reducers\index.js
```diff
import { combineReducers } from 'redux'
import counter from './counter';
+import history from '../../history';
+import { connectRouter } from '../../connected-react-router'
let reducers = {
+   router: connectRouter(history),
    counter
};
let rootReducer = combineReducers(reducers);
export default rootReducer;
```
### 3.3 connected-react-router\index.js
src\connected-react-router\index.js
```
export { default as ConnectedRouter } from "./ConnectedRouter";
export { default as connectRouter } from "./connectRouter";
```
### 3.4 actions.js
src\connected-react-router\actions.js
```
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export const onLocationChange = (location, action) => ({
    type: LOCATION_CHANGE,
    payload: {
        action,
        location
    }
})
```
### 3.5 ConnectedRouter.js
src\connected-react-router\ConnectedRouter.js
```
import React, { Component } from 'react'
import { ReactReduxContext } from 'react-redux';
import { onLocationChange } from './actions';
import { Router } from 'react-router-dom';

/**
 * 这个组件用来替代我们原来的Router容器组件，负责监听路径变化，然后派发动作
 */
export default class ConnectedRouter extends Component {
    static contextType = ReactReduxContext;
    constructor(props, context) {
        super(props);
        //当路径发生变化后，会调用回调函数，传入最新的location和action
        this.unlisten = this.props.history.listen((location, action) => {
            context.store.dispatch(onLocationChange(location, action));
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }
    render() {
        return (
            <Router history={this.props.history}>
                {this.props.children}
            </Router>
        )
    }
}
```
### 3.6 connectRouter.js
src\connected-react-router\connectRouter.js
```
import { LOCATION_CHANGE } from './actions';
function connectRouter(history) {
    const initialState = { action: history.action, location: history.location };
    return function reducer(state = initialState, { type, payload }) {
        if (type === LOCATION_CHANGE) {
            return { ...state, action: payload.action, location: payload.location };
        }
        return state;
    }
}

export default connectRouter;
```
## 4. 派发动作修改路径
### 4.1 counter.js
src\store\actionCreators\counter.js
```diff
import * as actionTypes from '../action-types';
+import { push } from '../../connected-react-router';
const actionCreators = {
    add() {
        return { type: actionTypes.ADD }
    },
    minus() {
        return { type: actionTypes.MINUS }
    },
+   goto(path) {
+       return push(path);
+   }
}
export default actionCreators
```
### 4.2 Counter.js
src\components\Counter.js
```diff
import React from 'react'
import { connect } from 'react-redux';
import actionCreators from '../store/actionCreators/counter';
class Counter extends React.Component {
    render() {
        return (
            <>
                <p>{this.props.number}</p>
                <button onClick={this.props.add}>+</button>
                <button onClick={this.props.minus}>-</button>
+               <button onClick={() => this.props.goto('/')}>跳转到/home里</button>
            </>
        )
    }
}
let mapStateToProps = (state) => state.counter;
export default connect(
    mapStateToProps,
    actionCreators
)(Counter);
```
### 4.3 src\store\index.js
src\store\index.js
```diff
import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers';
+import { routerMiddleware } from '../connected-react-router'
+import history from '../history';
+const store = applyMiddleware(routerMiddleware(history))(createStore)(reducers);
export default store;
```
### 4.4 src\connected-react-router\index.js
src\connected-react-router\index.js
```diff
export { default as ConnectedRouter } from "./ConnectedRouter";
export { default as connectRouter } from "./connectRouter";
+export { push } from './actions';
+export { default as routerMiddleware } from './routerMiddleware';
```
### 4.5 actions.js
src\connected-react-router\actions.js
```diff
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export const onLocationChange = (location, action) => ({
    type: LOCATION_CHANGE,
    payload: {
        action,
        location
    }
})

+export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';
+export const push = (path) => ({
+    type: CALL_HISTORY_METHOD,
+    payload: {
+        method: 'push',
+        path
+    }
+})
```
### 4.6 routerMiddleware.js
src\connected-react-router\routerMiddleware.js
```
import { CALL_HISTORY_METHOD } from './actions';
function routerMiddleware(history) {
    return function ({ getState, dispatch }) {
        return function (next) {
            return function (action) {
                const { type, payload } = action
                if (type === CALL_HISTORY_METHOD) {
                    history[payload.method](payload.path);
                } else {
                    return next(action);
                }
            }
        }
    }
}

export default routerMiddleware;
```
