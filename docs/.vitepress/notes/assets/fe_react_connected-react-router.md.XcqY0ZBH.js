import{_ as s,c as a,o as n,a4 as e}from"./chunks/framework.C5rzuSi5.js";const E=JSON.parse('{"title":"connected-react-router","description":"","frontmatter":{},"headers":[],"relativePath":"fe/react/connected-react-router.md","filePath":"fe/react/connected-react-router.md","lastUpdated":1694842372000}'),t={name:"fe/react/connected-react-router.md"},p=e(`<h1 id="connected-react-router" tabindex="-1">connected-react-router <a class="header-anchor" href="#connected-react-router" aria-label="Permalink to &quot;connected-react-router&quot;">​</a></h1><h2 id="生成项目" tabindex="-1">生成项目 <a class="header-anchor" href="#生成项目" aria-label="Permalink to &quot;生成项目&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">create</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">react</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app connected_router_test</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cd connected_router_test</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cnpm i redux react</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">redux  react</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">router</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dom connected</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">react</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">router </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">S</span></span></code></pre></div><h2 id="_2-跑通项目" tabindex="-1">2.跑通项目 <a class="header-anchor" href="#_2-跑通项目" aria-label="Permalink to &quot;2.跑通项目&quot;">​</a></h2><h3 id="_2-1-src-index-js" tabindex="-1">2.1 src\\index.js <a class="header-anchor" href="#_2-1-src-index-js" aria-label="Permalink to &quot;2.1 src\\index.js&quot;">​</a></h3><p>src\\index.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import React from &#39;react&#39;;</span></span>
<span class="line"><span>import ReactDOM from &#39;react-dom&#39;;</span></span>
<span class="line"><span>import { Router, Route, Link } from &#39;react-router-dom&#39;;</span></span>
<span class="line"><span>import Home from &#39;./components/Home&#39;;</span></span>
<span class="line"><span>import Counter from &#39;./components/Counter&#39;;</span></span>
<span class="line"><span>import history from &#39;./history&#39;;</span></span>
<span class="line"><span>import store from &#39;./store&#39;;</span></span>
<span class="line"><span>import { Provider } from &#39;react-redux&#39;;</span></span>
<span class="line"><span>ReactDOM.render(</span></span>
<span class="line"><span>  &lt;Provider store={store}&gt;</span></span>
<span class="line"><span>    &lt;Router history={history}&gt;</span></span>
<span class="line"><span>      &lt;&gt;</span></span>
<span class="line"><span>        &lt;Link to=&quot;/&quot;&gt;Home&lt;/Link&gt;</span></span>
<span class="line"><span>        &lt;Link to=&quot;/counter&quot;&gt;Counter&lt;/Link&gt;</span></span>
<span class="line"><span>        &lt;Route exact={true} path=&quot;/&quot; component={Home} /&gt;</span></span>
<span class="line"><span>        &lt;Route path=&quot;/counter&quot; component={Counter} /&gt;</span></span>
<span class="line"><span>      &lt;/&gt;</span></span>
<span class="line"><span>    &lt;/Router&gt;</span></span>
<span class="line"><span>  &lt;/Provider&gt;</span></span>
<span class="line"><span>  , document.getElementById(&#39;root&#39;));</span></span></code></pre></div><h3 id="_2-2-history-js" tabindex="-1">2.2 history.js <a class="header-anchor" href="#_2-2-history-js" aria-label="Permalink to &quot;2.2 history.js&quot;">​</a></h3><p>src\\history.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createBrowserHistory } from &#39;history&#39;</span></span>
<span class="line"><span>let history = createBrowserHistory();</span></span>
<span class="line"><span>export default history;</span></span></code></pre></div><h3 id="_2-3-store-index-js" tabindex="-1">2.3 store\\index.js <a class="header-anchor" href="#_2-3-store-index-js" aria-label="Permalink to &quot;2.3 store\\index.js&quot;">​</a></h3><p>src\\store\\index.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { applyMiddleware, createStore } from &#39;redux&#39;</span></span>
<span class="line"><span>import reducers from &#39;./reducers&#39;;</span></span>
<span class="line"><span>const store = applyMiddleware()(createStore)(reducers);</span></span>
<span class="line"><span>export default store;</span></span></code></pre></div><h3 id="_2-4-action-types-js" tabindex="-1">2.4 action-types.js <a class="header-anchor" href="#_2-4-action-types-js" aria-label="Permalink to &quot;2.4 action-types.js&quot;">​</a></h3><p>src\\store\\action-types.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export const ADD = &#39;ADD&#39;;</span></span>
<span class="line"><span>export const MINUS = &#39;MINUS&#39;;</span></span></code></pre></div><h3 id="_2-5-counter-js" tabindex="-1">2.5 counter.js <a class="header-anchor" href="#_2-5-counter-js" aria-label="Permalink to &quot;2.5 counter.js&quot;">​</a></h3><p>src\\store\\actionCreators\\counter.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import * as actionTypes from &#39;../action-types&#39;;</span></span>
<span class="line"><span>const actionCreators = {</span></span>
<span class="line"><span>    add() {</span></span>
<span class="line"><span>        return { type: actionTypes.ADD }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    minus() {</span></span>
<span class="line"><span>        return { type: actionTypes.MINUS }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export default actionCreators</span></span></code></pre></div><h3 id="_2-6-counter-js" tabindex="-1">2.6 counter.js <a class="header-anchor" href="#_2-6-counter-js" aria-label="Permalink to &quot;2.6 counter.js&quot;">​</a></h3><p>src\\store\\reducers\\counter.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import * as types from &#39;../action-types&#39;;</span></span>
<span class="line"><span>let initialState = { number: 0 }</span></span>
<span class="line"><span>function reducer(state = initialState, action) {</span></span>
<span class="line"><span>    switch (action.type) {</span></span>
<span class="line"><span>        case types.ADD:</span></span>
<span class="line"><span>            return { number: state.number + 1 };</span></span>
<span class="line"><span>        case types.MINUS:</span></span>
<span class="line"><span>            return { number: state.number - 1 };</span></span>
<span class="line"><span>        default:</span></span>
<span class="line"><span>            return state;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export default reducer;</span></span></code></pre></div><h3 id="_2-7-reducers-index-js" tabindex="-1">2.7 reducers\\index.js <a class="header-anchor" href="#_2-7-reducers-index-js" aria-label="Permalink to &quot;2.7 reducers\\index.js&quot;">​</a></h3><p>src\\store\\reducers\\index.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { combineReducers } from &#39;redux&#39;</span></span>
<span class="line"><span>import counter from &#39;./counter&#39;;</span></span>
<span class="line"><span>let reducers = {</span></span>
<span class="line"><span>    counter</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>let rootReducer = combineReducers(reducers);</span></span>
<span class="line"><span>export default rootReducer;</span></span></code></pre></div><h3 id="_2-8-home-js" tabindex="-1">2.8 Home.js <a class="header-anchor" href="#_2-8-home-js" aria-label="Permalink to &quot;2.8 Home.js&quot;">​</a></h3><p>src\\components\\Home.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import React, { Component } from &#39;react&#39;;</span></span>
<span class="line"><span>export default class Home extends Component {</span></span>
<span class="line"><span>    render() {</span></span>
<span class="line"><span>        return (</span></span>
<span class="line"><span>            &lt;div&gt;</span></span>
<span class="line"><span>                &lt;h1&gt;Home&lt;/h1&gt;</span></span>
<span class="line"><span>                &lt;button onClick={() =&gt; this.props.history.go(-1)}&gt;返回&lt;/button&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-9-counter-js" tabindex="-1">2.9 Counter.js <a class="header-anchor" href="#_2-9-counter-js" aria-label="Permalink to &quot;2.9 Counter.js&quot;">​</a></h3><p>src\\components\\Counter.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import React from &#39;react&#39;</span></span>
<span class="line"><span>import { connect } from &#39;react-redux&#39;;</span></span>
<span class="line"><span>import actionCreators from &#39;../store/actionCreators/counter&#39;;</span></span>
<span class="line"><span>class Counter extends React.Component {</span></span>
<span class="line"><span>    render() {</span></span>
<span class="line"><span>        return (</span></span>
<span class="line"><span>            &lt;&gt;</span></span>
<span class="line"><span>                &lt;p&gt;{this.props.number}&lt;/p&gt;</span></span>
<span class="line"><span>                &lt;button onClick={this.props.add}&gt;+&lt;/button&gt;</span></span>
<span class="line"><span>                &lt;button onClick={this.props.minus}&gt;-&lt;/button&gt;</span></span>
<span class="line"><span>            &lt;/&gt;</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>let mapStateToProps = (state) =&gt; state.counter;</span></span>
<span class="line"><span>export default connect(</span></span>
<span class="line"><span>    mapStateToProps,</span></span>
<span class="line"><span>    actionCreators</span></span>
<span class="line"><span>)(Counter);</span></span></code></pre></div><h2 id="_3-同步路由状态到仓库" tabindex="-1">3.同步路由状态到仓库 <a class="header-anchor" href="#_3-同步路由状态到仓库" aria-label="Permalink to &quot;3.同步路由状态到仓库&quot;">​</a></h2><h3 id="_3-1-src-index-js" tabindex="-1">3.1 src\\index.js <a class="header-anchor" href="#_3-1-src-index-js" aria-label="Permalink to &quot;3.1 src\\index.js&quot;">​</a></h3><p>src\\index.js</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import React from &#39;react&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import ReactDOM from &#39;react-dom&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import { Route, Link } from &#39;react-router-dom&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import Home from &#39;./components/Home&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import Counter from &#39;./components/Counter&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import history from &#39;./history&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import store from &#39;./store&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { Provider } from &#39;react-redux&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import { ConnectedRouter } from &#39;./connected-react-router&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ReactDOM.render(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;Provider store={store}&gt;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+   &lt;ConnectedRouter history={history}&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;Link to=&quot;/&quot;&gt;Home&lt;/Link&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;Link to=&quot;/counter&quot;&gt;Counter&lt;/Link&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;Route exact={true} path=&quot;/&quot; component={Home} /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;Route path=&quot;/counter&quot; component={Counter} /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;/&gt;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+   &lt;/ConnectedRouter&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/Provider&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  , document.getElementById(&#39;root&#39;));</span></span></code></pre></div><h3 id="_3-2-reducers-index-js" tabindex="-1">3.2 reducers\\index.js <a class="header-anchor" href="#_3-2-reducers-index-js" aria-label="Permalink to &quot;3.2 reducers\\index.js&quot;">​</a></h3><p>src\\store\\reducers\\index.js</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { combineReducers } from &#39;redux&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import counter from &#39;./counter&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import history from &#39;../../history&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import { connectRouter } from &#39;../../connected-react-router&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">let reducers = {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+   router: connectRouter(history),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    counter</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">let rootReducer = combineReducers(reducers);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">export default rootReducer;</span></span></code></pre></div><h3 id="_3-3-connected-react-router-index-js" tabindex="-1">3.3 connected-react-router\\index.js <a class="header-anchor" href="#_3-3-connected-react-router-index-js" aria-label="Permalink to &quot;3.3 connected-react-router\\index.js&quot;">​</a></h3><p>src\\connected-react-router\\index.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export { default as ConnectedRouter } from &quot;./ConnectedRouter&quot;;</span></span>
<span class="line"><span>export { default as connectRouter } from &quot;./connectRouter&quot;;</span></span></code></pre></div><h3 id="_3-4-actions-js" tabindex="-1">3.4 actions.js <a class="header-anchor" href="#_3-4-actions-js" aria-label="Permalink to &quot;3.4 actions.js&quot;">​</a></h3><p>src\\connected-react-router\\actions.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export const LOCATION_CHANGE = &#39;@@router/LOCATION_CHANGE&#39;;</span></span>
<span class="line"><span>export const onLocationChange = (location, action) =&gt; ({</span></span>
<span class="line"><span>    type: LOCATION_CHANGE,</span></span>
<span class="line"><span>    payload: {</span></span>
<span class="line"><span>        action,</span></span>
<span class="line"><span>        location</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>})</span></span></code></pre></div><h3 id="_3-5-connectedrouter-js" tabindex="-1">3.5 ConnectedRouter.js <a class="header-anchor" href="#_3-5-connectedrouter-js" aria-label="Permalink to &quot;3.5 ConnectedRouter.js&quot;">​</a></h3><p>src\\connected-react-router\\ConnectedRouter.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import React, { Component } from &#39;react&#39;</span></span>
<span class="line"><span>import { ReactReduxContext } from &#39;react-redux&#39;;</span></span>
<span class="line"><span>import { onLocationChange } from &#39;./actions&#39;;</span></span>
<span class="line"><span>import { Router } from &#39;react-router-dom&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 这个组件用来替代我们原来的Router容器组件，负责监听路径变化，然后派发动作</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>export default class ConnectedRouter extends Component {</span></span>
<span class="line"><span>    static contextType = ReactReduxContext;</span></span>
<span class="line"><span>    constructor(props, context) {</span></span>
<span class="line"><span>        super(props);</span></span>
<span class="line"><span>        //当路径发生变化后，会调用回调函数，传入最新的location和action</span></span>
<span class="line"><span>        this.unlisten = this.props.history.listen((location, action) =&gt; {</span></span>
<span class="line"><span>            context.store.dispatch(onLocationChange(location, action));</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    componentWillUnmount() {</span></span>
<span class="line"><span>        this.unlisten();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    render() {</span></span>
<span class="line"><span>        return (</span></span>
<span class="line"><span>            &lt;Router history={this.props.history}&gt;</span></span>
<span class="line"><span>                {this.props.children}</span></span>
<span class="line"><span>            &lt;/Router&gt;</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-6-connectrouter-js" tabindex="-1">3.6 connectRouter.js <a class="header-anchor" href="#_3-6-connectrouter-js" aria-label="Permalink to &quot;3.6 connectRouter.js&quot;">​</a></h3><p>src\\connected-react-router\\connectRouter.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { LOCATION_CHANGE } from &#39;./actions&#39;;</span></span>
<span class="line"><span>function connectRouter(history) {</span></span>
<span class="line"><span>    const initialState = { action: history.action, location: history.location };</span></span>
<span class="line"><span>    return function reducer(state = initialState, { type, payload }) {</span></span>
<span class="line"><span>        if (type === LOCATION_CHANGE) {</span></span>
<span class="line"><span>            return { ...state, action: payload.action, location: payload.location };</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return state;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default connectRouter;</span></span></code></pre></div><h2 id="_4-派发动作修改路径" tabindex="-1">4. 派发动作修改路径 <a class="header-anchor" href="#_4-派发动作修改路径" aria-label="Permalink to &quot;4. 派发动作修改路径&quot;">​</a></h2><h3 id="_4-1-counter-js" tabindex="-1">4.1 counter.js <a class="header-anchor" href="#_4-1-counter-js" aria-label="Permalink to &quot;4.1 counter.js&quot;">​</a></h3><p>src\\store\\actionCreators\\counter.js</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import * as actionTypes from &#39;../action-types&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import { push } from &#39;../../connected-react-router&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const actionCreators = {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    add() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        return { type: actionTypes.ADD }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    minus() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        return { type: actionTypes.MINUS }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+   goto(path) {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+       return push(path);</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">export default actionCreators</span></span></code></pre></div><h3 id="_4-2-counter-js" tabindex="-1">4.2 Counter.js <a class="header-anchor" href="#_4-2-counter-js" aria-label="Permalink to &quot;4.2 Counter.js&quot;">​</a></h3><p>src\\components\\Counter.js</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import React from &#39;react&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { connect } from &#39;react-redux&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import actionCreators from &#39;../store/actionCreators/counter&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Counter extends React.Component {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    render() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        return (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                &lt;p&gt;{this.props.number}&lt;/p&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                &lt;button onClick={this.props.add}&gt;+&lt;/button&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                &lt;button onClick={this.props.minus}&gt;-&lt;/button&gt;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+               &lt;button onClick={() =&gt; this.props.goto(&#39;/&#39;)}&gt;跳转到/home里&lt;/button&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;/&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">let mapStateToProps = (state) =&gt; state.counter;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">export default connect(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mapStateToProps,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    actionCreators</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)(Counter);</span></span></code></pre></div><h3 id="_4-3-src-store-index-js" tabindex="-1">4.3 src\\store\\index.js <a class="header-anchor" href="#_4-3-src-store-index-js" aria-label="Permalink to &quot;4.3 src\\store\\index.js&quot;">​</a></h3><p>src\\store\\index.js</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { applyMiddleware, createStore } from &#39;redux&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import reducers from &#39;./reducers&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import { routerMiddleware } from &#39;../connected-react-router&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import history from &#39;../history&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+const store = applyMiddleware(routerMiddleware(history))(createStore)(reducers);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">export default store;</span></span></code></pre></div><h3 id="_4-4-src-connected-react-router-index-js" tabindex="-1">4.4 src\\connected-react-router\\index.js <a class="header-anchor" href="#_4-4-src-connected-react-router-index-js" aria-label="Permalink to &quot;4.4 src\\connected-react-router\\index.js&quot;">​</a></h3><p>src\\connected-react-router\\index.js</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">export { default as ConnectedRouter } from &quot;./ConnectedRouter&quot;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">export { default as connectRouter } from &quot;./connectRouter&quot;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+export { push } from &#39;./actions&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+export { default as routerMiddleware } from &#39;./routerMiddleware&#39;;</span></span></code></pre></div><h3 id="_4-5-actions-js" tabindex="-1">4.5 actions.js <a class="header-anchor" href="#_4-5-actions-js" aria-label="Permalink to &quot;4.5 actions.js&quot;">​</a></h3><p>src\\connected-react-router\\actions.js</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">export const LOCATION_CHANGE = &#39;@@router/LOCATION_CHANGE&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">export const onLocationChange = (location, action) =&gt; ({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    type: LOCATION_CHANGE,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    payload: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        action,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        location</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+export const CALL_HISTORY_METHOD = &#39;@@router/CALL_HISTORY_METHOD&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+export const push = (path) =&gt; ({</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    type: CALL_HISTORY_METHOD,</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    payload: {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+        method: &#39;push&#39;,</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+        path</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    }</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+})</span></span></code></pre></div><h3 id="_4-6-routermiddleware-js" tabindex="-1">4.6 routerMiddleware.js <a class="header-anchor" href="#_4-6-routermiddleware-js" aria-label="Permalink to &quot;4.6 routerMiddleware.js&quot;">​</a></h3><p>src\\connected-react-router\\routerMiddleware.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { CALL_HISTORY_METHOD } from &#39;./actions&#39;;</span></span>
<span class="line"><span>function routerMiddleware(history) {</span></span>
<span class="line"><span>    return function ({ getState, dispatch }) {</span></span>
<span class="line"><span>        return function (next) {</span></span>
<span class="line"><span>            return function (action) {</span></span>
<span class="line"><span>                const { type, payload } = action</span></span>
<span class="line"><span>                if (type === CALL_HISTORY_METHOD) {</span></span>
<span class="line"><span>                    history[payload.method](payload.path);</span></span>
<span class="line"><span>                } else {</span></span>
<span class="line"><span>                    return next(action);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default routerMiddleware;</span></span></code></pre></div>`,69),i=[p];function l(r,o,c,h,d,u){return n(),a("div",null,i)}const g=s(t,[["render",l]]);export{E as __pageData,g as default};
