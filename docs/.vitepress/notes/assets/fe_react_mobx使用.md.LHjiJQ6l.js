import{_ as l,E as e,c as p,m as s,a,J as t,w as h,a4 as n,o as r}from"./chunks/framework.C5rzuSi5.js";const A=JSON.parse('{"title":"mobx使用","description":"","frontmatter":{},"headers":[],"relativePath":"fe/react/mobx使用.md","filePath":"fe/react/mobx使用.md","lastUpdated":1694567640000}'),o={name:"fe/react/mobx使用.md"},k=n(`<h1 id="mobx使用" tabindex="-1">mobx使用 <a class="header-anchor" href="#mobx使用" aria-label="Permalink to &quot;mobx使用&quot;">​</a></h1><h2 id="_1-官方文档" tabindex="-1">1.官方文档 <a class="header-anchor" href="#_1-官方文档" aria-label="Permalink to &quot;1.官方文档&quot;">​</a></h2><ul><li><a href="https://mobx.js.org/README.html" target="_blank" rel="noreferrer">mobx</a></li><li><a href="https://zh.mobx.js.org/README.html" target="_blank" rel="noreferrer">中文</a></li><li>任何可以从应用状态中派生出来的值都应该被自动派生出来</li><li>MobX 是一个身经百战的库，它通过运用透明的函数式响应编程使状态管理变得简单和可扩展</li></ul><p><img src="http://cdn.wangtongmeng.com/2023091309123926e2558991500cff38922def322615ba.png" alt="image.png"></p><h2 id="_2-安装" tabindex="-1">2.安装 <a class="header-anchor" href="#_2-安装" aria-label="Permalink to &quot;2.安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>pnpm create vite</span></span>
<span class="line"><span>pnpm install @babel/core @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties</span></span>
<span class="line"><span>pnpm install mobx mobx-react</span></span></code></pre></div><h3 id="_2-1-vite-config-ts" tabindex="-1">2.1 vite.config.ts <a class="header-anchor" href="#_2-1-vite-config-ts" aria-label="Permalink to &quot;2.1 vite.config.ts&quot;">​</a></h3><p>vite.config.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { defineConfig } from &#39;vite&#39;</span></span>
<span class="line"><span>import react from &#39;@vitejs/plugin-react&#39;</span></span>
<span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span>  plugins: [react({</span></span>
<span class="line"><span>    babel: {</span></span>
<span class="line"><span>      plugins: [</span></span>
<span class="line"><span>        [&quot;@babel/plugin-proposal-decorators&quot;, { legacy: true }],</span></span>
<span class="line"><span>        [&quot;@babel/plugin-proposal-class-properties&quot;, { loose: true }],</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  })]</span></span>
<span class="line"><span>})</span></span></code></pre></div><h3 id="_2-2-jsconfig-json" tabindex="-1">2.2 jsconfig.json <a class="header-anchor" href="#_2-2-jsconfig-json" aria-label="Permalink to &quot;2.2 jsconfig.json&quot;">​</a></h3><p>jsconfig.json</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;compilerOptions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;experimentalDecorators&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_2-3-src-main-tsx" tabindex="-1">2.3 src\\main.tsx <a class="header-anchor" href="#_2-3-src-main-tsx" aria-label="Permalink to &quot;2.3 src\\main.tsx&quot;">​</a></h3><p>src\\main.tsx</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import {observable} from &#39;mobx&#39;;</span></span>
<span class="line"><span>console.log(observable);</span></span></code></pre></div><h2 id="_3-mobx" tabindex="-1">3.mobx <a class="header-anchor" href="#_3-mobx" aria-label="Permalink to &quot;3.mobx&quot;">​</a></h2><h3 id="_3-1-创建可观察对象" tabindex="-1">3.1 创建可观察对象 <a class="header-anchor" href="#_3-1-创建可观察对象" aria-label="Permalink to &quot;3.1 创建可观察对象&quot;">​</a></h3><ul><li><a href="https://zh.mobx.js.org/observable-state.html#%E5%88%9B%E5%BB%BA%E5%8F%AF%E8%A7%82%E5%AF%9F%E7%8A%B6%E6%80%81" target="_blank" rel="noreferrer">创建可观察状态</a></li><li>属性，完整的对象，数组，Maps 和 Sets 都可以被转化为可观察对象。 使得对象可观察的基本方法是使用 makeObservable为每个属性指定一个注解。 最重要的注解如下： <ul><li>observable 定义一个存储 state 的可追踪字段。</li><li>action 将一个方法标记为可以修改 state 的 action。</li><li>computed 标记一个可以由 state 派生出新的值并且缓存其输出的 getter。</li></ul></li><li>像数组，Maps 和 Sets 这样的集合都将被自动转化为可观察对象。</li></ul><h3 id="_3-2-observable" tabindex="-1">3.2 observable <a class="header-anchor" href="#_3-2-observable" aria-label="Permalink to &quot;3.2 observable&quot;">​</a></h3><ul><li>用法: observable(source, overrides?, options?)</li><li><a href="https://zh.mobx.js.org/observable-state.html#observable" target="_blank" rel="noreferrer">observable</a>注解可以作为一个函数进行调用，从而一次性将整个对象变成可观察的。 source对象将会被克隆并且所有的成员都将会成为可观察的</li><li>由 observable 返回的对象将会使用 Proxy 包装，这意味着之后被添加到这个对象中的属性也将被侦测并使其转化为可观察对象</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {observable,reaction} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;mobx&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> proxyObj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> observable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(proxyObj);</span></span></code></pre></div><h3 id="_3-3-reactions" tabindex="-1">3.3 reactions <a class="header-anchor" href="#_3-3-reactions" aria-label="Permalink to &quot;3.3 reactions&quot;">​</a></h3><ul><li><a href="https://zh.mobx.js.org/reactions.html#%E4%BD%BF%E7%94%A8-reactions-%E5%A4%84%E7%90%86%E5%89%AF%E4%BD%9C%E7%94%A8-" target="_blank" rel="noreferrer">reactions</a>是需要理解的重要概念，因为他可以将 MobX 中所有的特性有机地融合在一起</li><li>reactions的目的是对自动发生的副作用进行建模。 它们的意义在于为你的可观察状态创建消费者，以及每当关联的值发生变化时，自动运行副作用</li></ul><h3 id="_3-4-autorun" tabindex="-1">3.4 Autorun <a class="header-anchor" href="#_3-4-autorun" aria-label="Permalink to &quot;3.4 Autorun&quot;">​</a></h3><ul><li>用法： autorun(effect: (reaction) =&gt; void)</li><li><a href="https://zh.mobx.js.org/reactions.html#autorun" target="_blank" rel="noreferrer">Autorun</a> 函数接受一个函数作为参数，每当该函数所观察的值发生变化时，它都应该运行。 当你自己创建 autorun 时，它也会运行一次。它仅仅对可观察状态的变化做出响应，比如那些你用 observable 或者 computed 注解的</li><li>Autorun通过在响应式上下文运行 effect来工作。在给定的函数执行期间，MobX 会持续跟踪被 effect 直接或间接读取过的所有可观察对象和计算值。 一旦函数执行完毕，MobX 将收集并订阅所有被读取过的可观察对象，并等待其中任意一个再次发生改变。 一旦有改变发生，autorun 将会再次触发，重复整个过程</li></ul><p><img src="http://cdn.wangtongmeng.com/2023091309131392ed9b2fef8e41812245af8a0a16759c.png" alt="image.png"></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { observable, autorun } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;mobx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> };</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> proxyObj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> observable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">autorun</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(proxyObj.name); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 立即执行一次</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">proxyObj.name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 响应属性值变化触发函数调用</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 2</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span></code></pre></div><h3 id="_3-5-makeobservable" tabindex="-1">3.5 makeObservable <a class="header-anchor" href="#_3-5-makeobservable" aria-label="Permalink to &quot;3.5 makeObservable&quot;">​</a></h3><ul><li>用法: makeObservable(target, annotations?, options?)</li><li><a href="https://zh.mobx.js.org/observable-state.html#makeobservable" target="_blank" rel="noreferrer">makeObservable</a>函数可以捕获已经存在的对象属性并且使得它们可观察。任何 JavaScript 对象（包括类的实例）都可以作为 target 被传递给这个函数。 一般情况下，makeObservable 是在类的构造函数中调用的，并且它的第一个参数是 this</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { makeObservable, observable, autorun } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;mobx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Doubler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    makeObservable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, { value: observable });</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> doubler</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Doubler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">autorun</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(doubler.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">doubler.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 2</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span></code></pre></div><h3 id="_3-6-computed" tabindex="-1">3.6 computed <a class="header-anchor" href="#_3-6-computed" aria-label="Permalink to &quot;3.6 computed&quot;">​</a></h3><ul><li><a href="https://zh.mobx.js.org/computeds.html#%E9%80%9A%E8%BF%87-computeds-%E6%B4%BE%E7%94%9F%E4%BF%A1%E6%81%AF" target="_blank" rel="noreferrer">computed</a></li><li>计算值可以用来从其他可观察对象中派生信息。 计算值采用惰性求值，会缓存其输出，并且只有当其依赖的可观察对象被改变时才会重新计算。 它们在不被任何值观察时会被暂时停用</li><li>计算值可以通过在 JavaScript getters 上添加 computed 注解来创建。 使用 makeObservable 将 getter 声明为 computed。或者如果你希望所有的 getters 被自动声明为 computed，可以使用 makeAutoObservable</li></ul><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import { computed, makeObservable, observable, autorun } from &quot;mobx&quot;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Doubler {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  constructor(value) {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    makeObservable(this, { value: observable, double: computed });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    this.value = value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+  get double() {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    return this.value * 2;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const doubler = new Doubler(1);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">autorun(() =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.log(doubler.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.log(doubler.double);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+setTimeout(() =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+  doubler.value = 2;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+}, 500);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/**</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> *</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 0.5秒后</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> *</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 4</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> */</span></span></code></pre></div><h3 id="_3-7-action" tabindex="-1">3.7 action <a class="header-anchor" href="#_3-7-action" aria-label="Permalink to &quot;3.7 action&quot;">​</a></h3><ul><li><a href="https://zh.mobx.js.org/actions.html#%E4%BD%BF%E7%94%A8-actions-%E6%9B%B4%E6%96%B0-state" target="_blank" rel="noreferrer">actions</a></li><li>所有的应用程序都有 actions。action 就是任意一段修改 state 的代码。原则上，actions 总会为了对一个事件做出响应而发生。例如，点击了一个按钮，一些输入被改变了，一个 websocket 消息被送达了，等等</li><li>尽管 makeAutoObservable 可以自动帮你声明一部分 actions，但是 MobX 还是要求你声明你的 actions。Actions 可以帮助你更好的组织你的代码并提供以下性能优势： <ul><li>它们在 transactions 内部运行。任何可观察对象在最外层的 action 完成之前都不会被更新，这一点保证了在 action 完成之前，action 执行期间生成的中间值或不完整的值对应用程序的其余部分都是不可见的</li><li>默认情况下，不允许在 actions 之外改变 state。这有助于在代码中清楚地对状态更新发生的位置进行定位</li></ul></li><li>action 注解应该仅用于会修改 state 的函数。派生其他信息（执行查询或者过滤数据）的函数不应该被标记为 actions，以便 MobX 可以对它们的调用进行跟踪</li></ul><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import { action, computed, makeObservable, observable, autorun } from &quot;mobx&quot;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Doubler {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  constructor(value) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    makeObservable(this, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      value: observable,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      double: computed,</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+     increment: action,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    this.value = value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  get double() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    return this.value * 2;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+  increment() {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    this.value++;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    this.value++;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    // 这里是一个action，相当于+2 触发一次autorun回调函数的执行</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const doubler = new Doubler(1);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">autorun(() =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.log(doubler.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+doubler.increment();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/**</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> */</span></span></code></pre></div><h3 id="_3-8-flow" tabindex="-1">3.8 flow <a class="header-anchor" href="#_3-8-flow" aria-label="Permalink to &quot;3.8 flow&quot;">​</a></h3><ul><li><a href="https://zh.mobx.js.org/actions.html#%E4%BD%BF%E7%94%A8-flow-%E4%BB%A3%E6%9B%BF-async--await-" target="_blank" rel="noreferrer">flow</a> 包装器是一个可选的 async / await 替代方案，它让 MobX action 使用起来更加容易</li><li>flow 将一个 generator 函数 作为唯一输入。 在 generator 内部，你可以使用 yield 串联 Promise（使用 yield somePromise 代替 await somePromise）。 flow 机制将会确保 generator 在 Promise resolve 之后继续运行或者抛出错误。</li><li>所以 flow 是 async / await 的一个替代方案，不需要再用 action 进行包装。它可以按照下面的方式使用： <ul><li>使用 flow 包装你的异步函数</li><li>使用 function * 代替 async</li><li>使用 yield 代替 await</li></ul></li></ul><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import { makeObservable, observable, autorun, action, computed } from &quot;mobx&quot;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Doubler {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  constructor(value) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    makeObservable(this, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      value: observable,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      double: computed,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      increment: action,</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+      fetch: flow,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }); // 添加注解</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    this.value = value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  get double() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    return this.value * 2;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  increment() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    this.value++;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    this.value++;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+  // 使用flow</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+  *fetch() {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    const response = yield new Promise((resolve) =&gt;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+      setTimeout(() =&gt; resolve(5), 1000)</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    );</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    this.value = response;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const doubler = new Doubler(1);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">autorun(() =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.log(doubler.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// doubler.increment();</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+doubler.fetch();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/**</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> *</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 1秒后</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> *</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> */</span></span></code></pre></div><h3 id="_3-9-bound" tabindex="-1">3.9 bound <a class="header-anchor" href="#_3-9-bound" aria-label="Permalink to &quot;3.9 bound&quot;">​</a></h3><ul><li><a href="https://zh.mobx.js.org/actions.html#flowbound" target="_blank" rel="noreferrer">flow.bound</a>注解可用于将方法自动绑定到正确的实例，这样 this 会始终被正确绑定在函数内部。 与 actions 一样，flows 默认可以使用 autoBind 选项</li></ul><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { runInAction } from &quot;mobx&quot;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { action } from &quot;mobx&quot;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { flow } from &quot;mobx&quot;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { computed } from &quot;mobx&quot;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { makeObservable, observable, autorun } from &quot;mobx&quot;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Doubler {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  constructor(value) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    makeObservable(this, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      value: observable,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      double: computed,</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+      increment: action.bound,</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+      fetch: flow.bound,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    this.value = value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  get double() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    return this.value * 2;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  increment() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    this.value++;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    this.value++;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  *fetch() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    const response = yield new Promise((resolve) =&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      setTimeout(() =&gt; resolve(5), 1000)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    this.value = response;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const doubler = new Doubler(1);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">autorun(() =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.log(doubler.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+const increment = doubler.increment;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+const fetch = doubler.fetch;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+increment();</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+fetch();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/**</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 3 // action中两次加操作只触发了一次autorun函数执行</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> *</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 1秒后</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> *</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * 5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> */</span></span></code></pre></div><h3 id="_3-10-makeautoobservable" tabindex="-1">3.10 makeAutoObservable <a class="header-anchor" href="#_3-10-makeautoobservable" aria-label="Permalink to &quot;3.10 makeAutoObservable&quot;">​</a></h3><ul><li>使用 makeAutoObservable(target, overrides?, options?)</li><li><a href="https://zh.mobx.js.org/observable-state.html#makeautoobservable" target="_blank" rel="noreferrer">makeAutoObservable</a> 就像是加强版的 makeObservable，在默认情况下它将推断所有的属性。你仍然可以使用 overrides 重写某些注解的默认行为</li><li>与使用 makeObservable 相比，makeAutoObservable 函数更紧凑，也更容易维护，因为新成员不需要显式地提及。 然而，makeAutoObservable 不能被用于带有 super 的类或 子类</li><li>推断规则： <ul><li>所有 自有 属性都成为 observable</li><li>所有 getters 都成为 computed</li><li>所有 setters 都成为 action</li><li>所有 prototype 中的 functions 都成为 autoAction</li><li>所有 prototype 中的 generator functions 都成为 flow</li><li>在 overrides 参数中标记为 false 的成员将不会被添加注解。例如，将其用于像标识符这样的只读字段</li></ul></li></ul><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import {observable,makeObservable,autorun,computed,flow,action,makeAutoObservable} from &#39;mobx&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Doubler {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+  PI = 3.14;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  constructor(value) {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    makeAutoObservable(this, { PI: false }, { autoBind: true }); // autoBind给函数绑定this</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    this.value = value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  get double() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    return this.value * 2;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  increment() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    this.value++;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    this.value++;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  *fetch() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    const response = yield new Promise((resolve) =&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      setTimeout(() =&gt; resolve(5), 1000)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    this.value = response;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const doubler = new Doubler(1);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+autorun(() =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+  console.log(doubler.PI);</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">autorun(() =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.log(doubler.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.log(doubler.double);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const increment = doubler.increment;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">increment();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const fetch = doubler.fetch;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fetch();</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+doubler.PI = 3.15; // PI如果不会变的话，可以通过注解取消响应</span></span></code></pre></div><h3 id="_3-11-reaction" tabindex="-1">3.11 Reaction <a class="header-anchor" href="#_3-11-reaction" aria-label="Permalink to &quot;3.11 Reaction&quot;">​</a></h3><ul><li>使用reaction(() =&gt; value, (value, previousValue, reaction) =&gt; { sideEffect }, options?).</li><li><a href="https://zh.mobx.js.org/reactions.html#reaction" target="_blank" rel="noreferrer">Reaction</a>类似于 autorun，但可以让你更加精细地控制要跟踪的可观察对象。 它接受两个函数作为参数：第一个 data 函数，其是被跟踪的函数并且其返回值将会作为第二个函数，effect 函数的输入。 重要的是要注意，副作用只会对 data 函数中被访问过的数据做出反应，这些数据可能少于 effect 函数中实际使用的数据。</li><li>一般的模式是在 data 函数中返回你在副作用中需要的所有数据， 并以这种方式更精确地控制副作用触发的时机。 与 autorun 不同，副作用在初始化时不会自动运行，而只会在 data 表达式首次返回新值之后运行</li></ul><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import {makeAutoObservable,reaction} from &#39;mobx&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Doubler {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    PI=3.14</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    value</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    constructor(value) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        makeAutoObservable(this,{PI:false},{autoBind:true})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.value = value</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    get double() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        return this.value * 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    increment() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.value++</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.value++</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    *fetch() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        const response = yield new Promise((resolve)=&gt;setTimeout(()=&gt;resolve(5),1000))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.value = response;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const doubler = new Doubler(1);</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+reaction(</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    () =&gt; doubler.value,</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    value =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+        console.log(&#39;value&#39;,value);</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    }</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+)</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+doubler.value=2;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// value 2</span></span></code></pre></div><h3 id="_3-12-when" tabindex="-1">3.12 When <a class="header-anchor" href="#_3-12-when" aria-label="Permalink to &quot;3.12 When&quot;">​</a></h3><ul><li>使用方式 when(predicate: () =&gt; boolean, effect?: () =&gt; void, options?)</li><li><a href="https://zh.mobx.js.org/reactions.html#when" target="_blank" rel="noreferrer">when</a>会观察并运行给定的 predicate 函数，直到其返回 true。 一旦 predicate 返回了 true，给定的 effect 函数就会执行并且自动执行器函数将会被清理掉</li><li>如果你没有传入 effect 函数，when 函数返回一个 Promise 类型的 disposer，并允许你手动取消</li></ul><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import {makeAutoObservable,reaction,when} from &#39;mobx&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Doubler {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    PI=3.14</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    value</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    constructor(value) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        makeAutoObservable(this,{PI:false},{autoBind:true})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.value = value</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    get double() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        return this.value * 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    increment() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.value++</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.value++</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    *fetch() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        const response = yield new Promise((resolve)=&gt;setTimeout(()=&gt;resolve(5),1000))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.value = response;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const doubler = new Doubler(1);</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+when(</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    () =&gt; doubler.value === 3,</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    () =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+        console.log(&#39;value&#39;,doubler.value);</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    }</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+)</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+doubler.value++;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+doubler.value++;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+doubler.value++;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// value 3</span></span></code></pre></div><h3 id="_3-13-runinaction" tabindex="-1">3.13 runInAction <a class="header-anchor" href="#_3-13-runinaction" aria-label="Permalink to &quot;3.13 runInAction&quot;">​</a></h3><ul><li>使用方式 runInAction(fn)</li><li>使用<a href="https://mobx.js.org/actions.html#runinaction" target="_blank" rel="noreferrer">runInAction</a>来创建一个会被立即调用的临时 action。在异步进程中非常有用</li></ul><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import {makeAutoObservable,reaction,when,autorun,runInAction} from &#39;mobx&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Doubler {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    PI=3.14</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    value</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    constructor(value) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        makeAutoObservable(this,{PI:false},{autoBind:true})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.value = value</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    get double() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        return this.value * 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    increment() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.value++</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.value++</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    *fetch() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        const response = yield new Promise((resolve)=&gt;setTimeout(()=&gt;resolve(5),1000))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.value = response;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const doubler = new Doubler(1);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 当做一个action来执行</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+autorun(()=&gt;console.log(doubler.value));</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+runInAction(()=&gt;{</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    doubler.value++;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    doubler.value++;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    doubler.value++;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 4</span></span></code></pre></div><h2 id="_4-mobx-react" tabindex="-1">4.mobx-react <a class="header-anchor" href="#_4-mobx-react" aria-label="Permalink to &quot;4.mobx-react&quot;">​</a></h2><ul><li><a href="https://github.com/mobxjs/mobx/tree/main/packages/mobx-react" target="_blank" rel="noreferrer">mobx-react</a></li><li><a href="https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite" target="_blank" rel="noreferrer">mobx-react-lite</a></li></ul><h3 id="_4-1-observer" tabindex="-1">4.1 observer <a class="header-anchor" href="#_4-1-observer" aria-label="Permalink to &quot;4.1 observer&quot;">​</a></h3><h4 id="_4-1-1-main-jsx" tabindex="-1">4.1.1 main.jsx <a class="header-anchor" href="#_4-1-1-main-jsx" aria-label="Permalink to &quot;4.1.1 main.jsx&quot;">​</a></h4><p>src\\main.jsx</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createRoot } from &quot;react-dom/client&quot;;</span></span>
<span class="line"><span>import Counter from &quot;./Counter&quot;;</span></span>
<span class="line"><span>const rootElement = document.getElementById(&quot;root&quot;);</span></span>
<span class="line"><span>const root = createRoot(rootElement);</span></span>
<span class="line"><span>root.render(&lt;Counter/&gt;);</span></span></code></pre></div><h4 id="_4-1-2-observer" tabindex="-1">4.1.2 observer <a class="header-anchor" href="#_4-1-2-observer" aria-label="Permalink to &quot;4.1.2 observer&quot;">​</a></h4><ul><li>使用<code>observer&lt;P&gt;(baseComponent: FunctionComponent&lt;P&gt;): FunctionComponent&lt;P&gt;</code></li><li>将React组件、React类组件或独立渲染函数转换为React组件的函数。转换后的组件将跟踪其有效渲染使用的观察值，并在其中一个值更改时自动重新渲染组件</li><li>React.memo自动应用于提供给观察者的功能组件</li><li>当使用React类组件时，this.props和this.state变得可观察，因此组件将对渲染使用的属性和状态的所有更改作出反应</li></ul><p>src\\Counter.jsx</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import {makeAutoObservable} from &#39;mobx&#39;;</span></span>
<span class="line"><span>import {observer} from &#39;mobx-react&#39;;</span></span>
<span class="line"><span>class Store {</span></span>
<span class="line"><span>    number=1</span></span>
<span class="line"><span>    constructor(){</span></span>
<span class="line"><span>        makeAutoObservable(this,{},{autoBind:true});</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    add(){</span></span>
<span class="line"><span>        this.number++;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>let store=new Store();</span></span>
<span class="line"><span>export default observer(function () {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>        &lt;div&gt;</span></span>
<span class="line"><span>            &lt;p&gt;{store.number}&lt;/p&gt;</span></span>
<span class="line"><span>            &lt;button onClick={store.add}&gt;+&lt;/button&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>});</span></span></code></pre></div><h3 id="_4-2-observer-class" tabindex="-1">4.2 observer class <a class="header-anchor" href="#_4-2-observer-class" aria-label="Permalink to &quot;4.2 observer class&quot;">​</a></h3><h4 id="_4-2-1-counter-jsx" tabindex="-1">4.2.1 Counter.jsx <a class="header-anchor" href="#_4-2-1-counter-jsx" aria-label="Permalink to &quot;4.2.1 Counter.jsx&quot;">​</a></h4><p>src\\Counter.jsx</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import React from &#39;react&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import {makeAutoObservable} from &#39;mobx&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import {observer} from &#39;mobx-react&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Store {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    number=1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    constructor(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        makeAutoObservable(this,{},{autoBind:true});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    add(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.number++;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">let store=new Store();</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+@observer</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+export default class Counter extends React.Component{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  render(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    return (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;div&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;p&gt;{store.number}&lt;/p&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;button onClick={store.add}&gt;+&lt;/button&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;/div&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+}</span></span></code></pre></div><h3 id="_4-3-observer" tabindex="-1">4.3 Observer <a class="header-anchor" href="#_4-3-observer" aria-label="Permalink to &quot;4.3 Observer&quot;">​</a></h3>`,69),E=s("li",null,[s("a",{href:"https://github.com/mobxjs/mobx/tree/main/packages/mobx-react#observer",target:"_blank",rel:"noreferrer"},"Observer")],-1),c=s("li",null,"Observer是一个React组件，它将观察者应用于组件中的匿名区域。它将单个无参数函数作为子函数，该函数应只返回一个React组件。将跟踪函数中的渲染，并在需要时自动重新渲染",-1),d=n(`<h4 id="_4-3-1-counter-jsx" tabindex="-1">4.3.1 Counter.jsx <a class="header-anchor" href="#_4-3-1-counter-jsx" aria-label="Permalink to &quot;4.3.1 Counter.jsx&quot;">​</a></h4><p>src\\Counter.jsx</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import React from &#39;react&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import {makeAutoObservable} from &#39;mobx&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import {observer,Observer} from &#39;mobx-react&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Store {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    number=1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    constructor(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        makeAutoObservable(this,{},{autoBind:true});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    add(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.number++;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">let store=new Store();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">export default function () {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    return (</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+       &lt;Observer&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                ()=&gt;(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                  &lt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    &lt;p&gt;{store.number}&lt;/p&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    &lt;button onClick={store.add}&gt;+&lt;/button&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                  &lt;/&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+      &lt;/Observer&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_4-4-useobserver" tabindex="-1">4.4 useObserver <a class="header-anchor" href="#_4-4-useobserver" aria-label="Permalink to &quot;4.4 useObserver&quot;">​</a></h3><ul><li><a href="https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite#useobservertfn---t-basecomponentname--observed-options-iuseobserveroptions-t-deprecated" target="_blank" rel="noreferrer">useObserver</a>允许您使用类似观察者的行为，但仍然允许您以任何方式优化组件（例如，使用自定义areEqual的memo，使用forwardRef等），并准确声明观察到的部分（渲染阶段）</li></ul><h4 id="_4-4-1-counter-jsx" tabindex="-1">4.4.1 Counter.jsx <a class="header-anchor" href="#_4-4-1-counter-jsx" aria-label="Permalink to &quot;4.4.1 Counter.jsx&quot;">​</a></h4><p>src\\Counter.jsx</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import React from &#39;react&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import {makeAutoObservable} from &#39;mobx&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import {observer,Observer,useObserver} from &#39;mobx-react&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Store {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    number=1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    constructor(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        makeAutoObservable(this,{},{autoBind:true});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    add(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        this.number++;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">let store=new Store();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">export default function () {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    return useObserver(()=&gt;(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          &lt;p&gt;{store.number}&lt;/p&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          &lt;button onClick={store.add}&gt;+&lt;/button&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;/&gt;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+     ));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_4-5-uselocalobservable" tabindex="-1">4.5 useLocalObservable <a class="header-anchor" href="#_4-5-uselocalobservable" aria-label="Permalink to &quot;4.5 useLocalObservable&quot;">​</a></h3><ul><li>使用 <code>useLocalObservable&lt;T&gt;(initializer: () =&gt; T, annotations?: AnnotationsMap&lt;T&gt;): T</code></li><li>当使用<a href="https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite#uselocalobservabletinitializer---t-annotations-annotationsmapt-t" target="_blank" rel="noreferrer">useLocalObservable</a>时，返回对象的所有属性都将自动可观察，getter将转换为计算属性，方法将绑定到存储并自动应用mobx事务</li></ul><h4 id="_4-5-1-counter-jsx" tabindex="-1">4.5.1 Counter.jsx <a class="header-anchor" href="#_4-5-1-counter-jsx" aria-label="Permalink to &quot;4.5.1 Counter.jsx&quot;">​</a></h4><p>src\\Counter.jsx</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import React from &#39;react&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import {makeAutoObservable} from &#39;mobx&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import {observer,Observer,useObserver,useLocalObservable} from &#39;mobx-react&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">export default function () {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+   const store = useLocalObservable(()=&gt;({</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+       number:1,</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+       add(){</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+           this.number++;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+       }</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+   }));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    return useObserver(()=&gt;(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          &lt;p&gt;{store.number}&lt;/p&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          &lt;button onClick={store.add}&gt;+&lt;/button&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;/&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_4-6-todos" tabindex="-1">4.6 todos <a class="header-anchor" href="#_4-6-todos" aria-label="Permalink to &quot;4.6 todos&quot;">​</a></h3><h4 id="_4-6-1-main-jsx" tabindex="-1">4.6.1 main.jsx <a class="header-anchor" href="#_4-6-1-main-jsx" aria-label="Permalink to &quot;4.6.1 main.jsx&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createRoot } from &quot;react-dom/client&quot;;</span></span>
<span class="line"><span>import App from &quot;./App&quot;;</span></span>
<span class="line"><span>const rootElement = document.getElementById(&quot;root&quot;);</span></span>
<span class="line"><span>const root = createRoot(rootElement);</span></span>
<span class="line"><span>root.render(&lt;App/&gt;);</span></span></code></pre></div><h4 id="_4-6-2-app-jsx" tabindex="-1">4.6.2 App.jsx <a class="header-anchor" href="#_4-6-2-app-jsx" aria-label="Permalink to &quot;4.6.2 App.jsx&quot;">​</a></h4><p>src\\App.jsx</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import React from &quot;react&quot;;</span></span>
<span class="line"><span>import store from &quot;./store&quot;;</span></span>
<span class="line"><span>import StoreContext from &#39;./context&#39;;</span></span>
<span class="line"><span>import Todos from &#39;./Todos&#39;;</span></span>
<span class="line"><span>import User from &#39;./User&#39;;</span></span>
<span class="line"><span>const App = () =&gt; {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;StoreContext.Provider value={store}&gt;</span></span>
<span class="line"><span>      &lt;User /&gt;</span></span>
<span class="line"><span>      &lt;hr /&gt;</span></span>
<span class="line"><span>      &lt;Todos/&gt;</span></span>
<span class="line"><span>    &lt;/StoreContext.Provider&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>export default App;</span></span></code></pre></div><h4 id="_4-6-3-context-jsx" tabindex="-1">4.6.3 context.jsx <a class="header-anchor" href="#_4-6-3-context-jsx" aria-label="Permalink to &quot;4.6.3 context.jsx&quot;">​</a></h4><p>src\\context.jsx</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import React from &quot;react&quot;;</span></span>
<span class="line"><span>const StoreContext = React.createContext();</span></span>
<span class="line"><span>export default StoreContext;</span></span></code></pre></div><h4 id="_4-6-4-user-jsx" tabindex="-1">4.6.4 User.jsx <a class="header-anchor" href="#_4-6-4-user-jsx" aria-label="Permalink to &quot;4.6.4 User.jsx&quot;">​</a></h4><p>src\\User.jsx</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { useContext,useRef } from &#39;react&#39;;</span></span>
<span class="line"><span>import StoreContext from &#39;./context&#39;;</span></span>
<span class="line"><span>import { observer } from &quot;mobx-react&quot;;</span></span>
<span class="line"><span>const User = observer(function () {</span></span>
<span class="line"><span>  const { userStore } = useContext(StoreContext);</span></span>
<span class="line"><span>  const ref = useRef(null);</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>     {userStore.isLogin?(</span></span>
<span class="line"><span>      &lt;&gt;</span></span>
<span class="line"><span>      {userStore.username}&lt;button onClick={() =&gt; userStore.logout()}&gt;退出&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;/&gt;</span></span>
<span class="line"><span>     ):(</span></span>
<span class="line"><span>      &lt;&gt;</span></span>
<span class="line"><span>      &lt;input ref={ref} type=&quot;text&quot; /&gt;</span></span>
<span class="line"><span>      &lt;button onClick={() =&gt; userStore.login(ref.current.value)}&gt;登录&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;/&gt;</span></span>
<span class="line"><span>     )}</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>export default User;</span></span></code></pre></div><h4 id="_4-6-5-todos-jsx" tabindex="-1">4.6.5 Todos.jsx <a class="header-anchor" href="#_4-6-5-todos-jsx" aria-label="Permalink to &quot;4.6.5 Todos.jsx&quot;">​</a></h4><p>src\\Todos.jsx</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { useContext ,useRef} from &#39;react&#39;;</span></span>
<span class="line"><span>import StoreContext from &#39;./context&#39;;</span></span>
<span class="line"><span>import { observer } from &quot;mobx-react&quot;;</span></span>
<span class="line"><span>import {TodoStore} from &#39;./store&#39;;</span></span>
<span class="line"><span>const Todo = observer(function ({todo}) {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;li&gt;</span></span>
<span class="line"><span>      &lt;input</span></span>
<span class="line"><span>        type=&quot;checkbox&quot;</span></span>
<span class="line"><span>        checked={todo.completed}</span></span>
<span class="line"><span>        onChange={() =&gt; todo.toggle()}</span></span>
<span class="line"><span>      /&gt;</span></span>
<span class="line"><span>      {todo.text}</span></span>
<span class="line"><span>    &lt;/li&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const TodoList = observer(function () {</span></span>
<span class="line"><span>  const { todoStore } = useContext(StoreContext);</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;ul&gt;</span></span>
<span class="line"><span>        {todoStore.list.map((todo, index) =&gt; (</span></span>
<span class="line"><span>          &lt;Todo todo={todo} key={index} /&gt;</span></span>
<span class="line"><span>        ))}</span></span>
<span class="line"><span>      &lt;/ul&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const TodoLeft = observer(function () {</span></span>
<span class="line"><span>  const { todoStore } = useContext(StoreContext);</span></span>
<span class="line"><span>  return &lt;&gt;未完成: {todoStore.unCompletedCount}&lt;/&gt;;</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const AddTodo = observer(function AddTodo() {</span></span>
<span class="line"><span>  const { todoStore } = useContext(StoreContext);</span></span>
<span class="line"><span>  const ref = useRef(null);</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>      &lt;input ref={ref} type=&quot;text&quot; /&gt;</span></span>
<span class="line"><span>      &lt;button</span></span>
<span class="line"><span>        onClick={() =&gt; {</span></span>
<span class="line"><span>          const item = new TodoStore(ref.current.value);</span></span>
<span class="line"><span>          todoStore.add(item);</span></span>
<span class="line"><span>          ref.current.value = &quot;&quot;;</span></span>
<span class="line"><span>        }}</span></span>
<span class="line"><span>      &gt;新增&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>export default observer(function () {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>      &lt;AddTodo /&gt;</span></span>
<span class="line"><span>      &lt;TodoList /&gt;</span></span>
<span class="line"><span>      &lt;TodoLeft /&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>});</span></span></code></pre></div><h4 id="_4-6-6-user-index-jsx" tabindex="-1">4.6.6 user\\index.jsx <a class="header-anchor" href="#_4-6-6-user-index-jsx" aria-label="Permalink to &quot;4.6.6 user\\index.jsx&quot;">​</a></h4><p>src\\store\\user\\index.jsx</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { makeAutoObservable } from &quot;mobx&quot;;</span></span>
<span class="line"><span>class UserStore {</span></span>
<span class="line"><span>  username=&#39;&#39;;</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    makeAutoObservable(this, {}, { autoBind: true });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  get isLogin() {</span></span>
<span class="line"><span>    return this.username.length &gt; 0;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  login(username) {</span></span>
<span class="line"><span>    this.username = username;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  logout() {</span></span>
<span class="line"><span>    this.username = &quot;&quot;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const userStore = new UserStore();</span></span>
<span class="line"><span>export default userStore;</span></span></code></pre></div><h4 id="_4-6-7-todos-index-jsx" tabindex="-1">4.6.7 todos\\index.jsx <a class="header-anchor" href="#_4-6-7-todos-index-jsx" aria-label="Permalink to &quot;4.6.7 todos\\index.jsx&quot;">​</a></h4><p>src\\store\\todos\\index.jsx</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { makeAutoObservable } from &quot;mobx&quot;;</span></span>
<span class="line"><span>class TodoStore {</span></span>
<span class="line"><span>  list = [];</span></span>
<span class="line"><span>  get unCompletedCount() {</span></span>
<span class="line"><span>    return this.list.filter((todo) =&gt; !todo.completed).length;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    makeAutoObservable(this,{},{autoBind: true});</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  add(todo) {</span></span>
<span class="line"><span>    this.list.push(todo);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const todoStore = new TodoStore();</span></span>
<span class="line"><span>export default todoStore;</span></span></code></pre></div><h4 id="_4-6-8-todo-jsx" tabindex="-1">4.6.8 todo.jsx <a class="header-anchor" href="#_4-6-8-todo-jsx" aria-label="Permalink to &quot;4.6.8 todo.jsx&quot;">​</a></h4><p>src\\store\\todos\\todo.jsx</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { makeAutoObservable } from &quot;mobx&quot;;</span></span>
<span class="line"><span>export class TodoStore {</span></span>
<span class="line"><span>  text = &quot;&quot;;</span></span>
<span class="line"><span>  completed = false;</span></span>
<span class="line"><span>  constructor(text) {</span></span>
<span class="line"><span>    makeAutoObservable(</span></span>
<span class="line"><span>      this,{},{autoBind: true}</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>    this.text = text;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  toggle() {</span></span>
<span class="line"><span>    this.completed = !this.completed;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-6-9-store-index-jsx" tabindex="-1">4.6.9 store\\index.jsx <a class="header-anchor" href="#_4-6-9-store-index-jsx" aria-label="Permalink to &quot;4.6.9 store\\index.jsx&quot;">​</a></h4><p>src\\store\\index.jsx</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import todoStore from &quot;./todos&quot;;</span></span>
<span class="line"><span>import userStore from &quot;./user&quot;;</span></span>
<span class="line"><span>const store = { todoStore, userStore };</span></span>
<span class="line"><span>export { TodoStore } from &quot;./todos/todo&quot;;</span></span>
<span class="line"><span>export default store;</span></span></code></pre></div>`,40);function u(g,b,y,m,v,f){const i=e("Observer");return r(),p("div",null,[k,s("ul",null,[s("li",null,[a("使用 "),t(i,null,{default:h(()=>[a("{renderFn}")]),_:1})]),E,c]),d])}const q=l(o,[["render",u]]);export{A as __pageData,q as default};
