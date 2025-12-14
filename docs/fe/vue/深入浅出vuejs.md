# 深入浅出Vue.js

## 第1章&第2章

vue是渐进是框架， Vue.js2.0引入了虚拟DOM， 8 0 % 的 场 景 下 变 得 更 快 了 ， 而 剩 下 的 2 0 % 反 而 变慢了。除了虚拟DO M，支持JSX和TypeScript， 支持流式服务端渲染，提供了跨平台的能力等。

**变化侦听**，变化侦测的作用是侦测数据的变化。当数据变化时，会通知视图进行相应的更新。

object 和Array的变化侦测采用不同的处理方式。

**Object的变化侦听**

从Vue.js 2.0 开始，它引入了虚拟DOM，将粒度调整为中等粒度， 即一个状态所绑定的依赖不再是具体的DOM 节点，而是一个组件。这样状态变化后，会通知 到 组 件 ， 组 件 内 部 再 使 用 虚 拟 D O M 进 行 比 对 。 这 可以 大 大 降 低 依 赖 数 量 ， 从 而 降 低 依 赖 追 踪 所消耗的内存。

**侦测一个对象的变化**：Object .defineProperty和ES6的Proxy

<img src="http://cdn.wangtongmeng.com/20250720154826.png" style="zoom:50%;" />

每当从dat a的key中读取数据时，get 函数被触发;每当往dat a的key中 设置数据时，set 函数被触发。

**如何收集依赖**

- 在 getter 中收集依赖，在 setter 中触发依赖
- 在Vue.js2.0中，模板使用数据等同于组件使用数据，所以当数据发生变化时，会将通知 发送到组件，然后组件内部再通过虚拟DOM 重新渲染。

**依赖收集在哪里**

- 收集到Dep中

假设依赖是一 个函数，保存在window.target 上

新增了数组dep，用来存储被收集的依赖，然后在set 被触发时，循环dep以触发收集到的依赖。

<img src="http://cdn.wangtongmeng.com/20250720155558.png" style="zoom:50%;" />

**依赖是谁**

- 收集的依赖是Watcher

在上面的代码中，我们收集的依赖是window.target，收集谁，换句话说，就是当属性发生变化后，通知谁。
我 们 要 通 知 用 到 数 据 的 地 方 ， 而 使 用 这 个 数 据 的 地 方 有 很 多 ， 而 且 类 型 还 不 一样 ， 既 有 可 能 是 模 板 ， 也 有 可 能 是 用 户 写的 一 个 w a t c h ， 这时 需 要 **抽 象 出 一 个能 集 中 处 理 这 些 情 况 的 类** 。然后，我们在依赖收集阶段只收集这个封装好的类的实例进来，通知也只通知它一个。接着， 它再负责通知其他地方。

**什么是watcher**

watcher 是一个中介的角色，数据发生变化时通知它，然后它再通知其他地方。

<img src="http://cdn.wangtongmeng.com/20250720162324.png" style="zoom:50%;" />

这段代码可以把watcher实例主动添加到dat a.a.b.c的Dep中去

-因为我在get 方法中先把window.target 设置成了this，也就是当前watcher 实例，然后 再 读 一 下 d a t a . a . b . c 的 值 ， 这肯 定 会 触 发 g e t t e r 。 触发了getter，就会触发收集依赖的逻辑。而关于收集依赖，上面已经介绍了，会从window. target 中读取一个依赖并添加到Dep中。
这就导致，只要先在window.target 赋一个this，然后再读一下值，去触发getter，就可 以把this 主动添加到keypath的Dep 中。
依赖注入到Dep 中后，每当data.a.b.c的值发生变化时，就会让依赖列表中所有的依赖循 环触发update 方法，也就是watcher 中的update 方法。而update 方法会执行参数中的回调函 数，将value 和oldValue 传到参数中。
所以，其实不管是用户执行的vm.$watch('a.b.c'，(value, oldValue)=>{})，还是模 板中用到的data，都是通过watcher 来通知自己是否需要发生变化。

**递归侦测所有key**

我们希望把数据中的所有属性(包括子属性)都侦测到，所以要封装一个observer 类。 这 个 类 的 作 用 是 将 一个 数 据 内 的 所 有 属 性 ( 包 括 子 属 性 ) 都 转 换 成 g e t t e r / s e t t e r 的 形 式 ， 然 后 去 追踪它们的变化。

<img src="http://cdn.wangtongmeng.com/20250720162804.png" style="zoom:50%;" />

我们定义了observer 类，它用来将一个正常的object 转换成被侦测的object.
然后判断数据的类型，只有object 类型的数据才会调用walk 将每一个属性转换成 getter/s etter 的形式来侦测变化。
最 后 ， 在 d e f i n e R e a c t i v e 中 新 增 n e w O b s e r v e r (v a l )来 递 归 子 属性 ， 这 样 我 们 就 可 以 把 data 中的所有属性(包括子属性)都转换成getter/setter的形式来侦测变化。
当 d a t a 中 的 属 性 发 生 变 化 时 ， 与 这 个 属 性 对 应的 依 赖 就 会 接 收 到 通 知 。
也 就 是 说 ， 只 要 我 们 将 一个 o b j e c t 传 到 o b s e r v e r 中 ， 那 么 这 个 o b j e c t 就 会 变 成 响 应 式 的object.

**关于Object的问题**
Vue.js通过object. defineProperty 来将对象的key转换成getter/setter的形式来追踪变化， 但getter/setter 只能追踪一个数据是否被修改，**无法追踪新增属性和删除属性**，为了解决这个问题， Vue.js提供了两个API- -vm.$set 与vm.$delete

<img src="http://cdn.wangtongmeng.com/20250720163342.png" style="zoom:50%;" />

## 3.1-3.7

## 第3章 Array的变化侦测

通过Array 原型上的方法来改变数组的内容，所以object 那种通过 getter /setter 的实现方式就行不通了，例如 `this.list.push(1)`不会触发getter/setter。

### 3.1 如何追踪变化

用一个拦截器覆盖Ar r ay. pr ot ot ype。之后，每当使用Ar r ay 原型 上的方法操作数组时，其实执行的都是拦截器中提供的方法，比如push 方法。然后，在拦截器 中使用原生Anr ay 的原型方法去操作数组。

 **通 过 拦 截 器 ， 我 们 就 可 以 追 踪 到 A r r a y 的 变化 。**

<img src="http://cdn.wangtongmeng.com/20250720164522.png" style="zoom:50%;" />

### 3.2 拦截器

Array原型中可以改变数组自身内容的方法有7 个，分别是push、pop、 shift, unshift, splice, sort fi reverse。

 以 在 **m u t a t o r 函 数 中 做 一些 其 他的 事** ， 比 如 说 **发 送 变 化 通 知** 。

<img src="/Users/wangtongmeng/Library/Application Support/typora-user-images/image-20250720164704899.png" alt="image-20250720164704899" style="zoom: 50%;" />

### 3.3 使用拦截器覆盖 Array 原型

希望拦截器只覆盖那些响应式数组的原型，而将 一个数据转换成响应式的，需要通过obs erver，所以我们只需要在Observer 中使用拦 截器覆盖那些即将被转换成响应式Array 类型数据的原型就好了

<img src="http://cdn.wangtongmeng.com/20250720165453.png" style="zoom:50%;" />

### 3.4 将拦截器方法挂载到数组的属性 上

处理不能使用`__proto__`的情况

<img src="http://cdn.wangtongmeng.com/20250720165739.png" style="zoom:50%;" />

在浏览器不支持`__proto__`的情况下，会在数组上挂载一些方法。当用户使 用这些方法时，其实执行的并不是浏览器原生提供的Array.prototype 上的方法，而是拦截器 中提供的方法。

<img src="http://cdn.wangtongmeng.com/20250720170348.png" style="zoom:50%;" />

### 3.5 如何收集依赖

Array 在 getter 中收集依赖，在拦截器中触发依赖。

<img src="http://cdn.wangtongmeng.com/20250720171210.png" style="zoom:50%;" />

### 3 .6 依赖列表存在哪儿

Vue.js 把 Array 的依赖存放在observer 中， **保证在 getter 中可以访问到 observer 实例 ， 同时在Array拦截器中也可以访问到observer 实例。**

<img src="http://cdn.wangtongmeng.com/20250720171646.png" style="zoom:50%;" />



### 3.7 收集依赖

在`defineReactive`函数中，`val`可能是一个数组。通过`observe`方法我们得到了数组的`Observer`实例(`childOb`)，最后通过`childOb`的`dep`执行`depend`方法来收集依赖。通过这种方式，我们就可以实现在`getter`中将依赖收集到`Observer`实例的`dep`中。更通俗的解释是：通过这样的方式可以为数组收集依赖。

<img src="http://cdn.wangtongmeng.com/20250720172209.png" style="zoom:50%;" />

## 3.8-3.13

### 3.8 在拦截器中获取Observer 实例

Array拦截器是对原型的封装，可以在拦截器里访问this(正在**被操作的数组**)，而dep保存在Observer中，所以**需要在this上读到Observer实例**。

observer中新增了一段代码，它可以在value 上新增一个不可枚 举的属性`__proto__`这个属性的值就是当前observer 的实例。

`__ob__`除了在拦截器中访问Observer，还可以用来标记当前value是否已经被Observer转换成了响应式数据。

当value身上被标记了`__ob__`之后，就可以通过`__ob__`来访问Observer实例。如果是Array拦截器，因为拦截器是原型方法，所以可以直接通过`this.__ob__`来访问Observer 实例

![](http://cdn.wangtongmeng.com/20250721073448.png)

### 3.9 向数组的依赖发送通知

当侦测到数组发生变化时，会向依赖发送通知。

<img src="http://cdn.wangtongmeng.com/20250721073741.png" style="zoom:50%;" />

### 3.10 侦测数组中元素的变化

**1.数字保存的数据子集变化需要侦测 2.新增元素也需要侦测**

在`Observer`中新增了对`Array`类型数据的处理逻辑。这里新增了`observeArray`方法，其作用是循环`Array`中的每一项，执行`observe`函数来侦测变化。前面介绍过`observe`函数，其实就是将数组中的每个元素都执行一遍`new Observer`，这很明显是一个递归的过程。现在只要将一个数据丢进去，`Observer`就会把这个数据的所有子数据转换成响应式的。

<img src="http://cdn.wangtongmeng.com/20250721075020.png" style="zoom:50%;" />

### 3.11 侦测新增元素的变化

只要能获取新增的元素并使用Observer 来侦测它们就行

**获取新增元素**

如果`method`是`push`、`unshift`、`splice`这种可以新增数组元素的方法，那么从`args`中将新增元素取出来，暂存在`inserted`中。接下来，我们要使用`observer`把`inserted`中的元素转换成响应式的。

<img src="http://cdn.wangtongmeng.com/20250721075407.png" style="zoom:50%;" />

**使用observer 侦测新增元素**

在拦截器中通过`this`访问到`__ob__`，然后调用`__ob__`上的`observeArray`方法，用 `ob.observeArray` 侦测新增元素变化。

<img src="http://cdn.wangtongmeng.com/20250721075707.png" style="zoom:50%;" />

### 3.12 关于Array的问题

通过索引改变数组` this.list[0]= 2`，或者改变length清空数组`this.list.length = 0`的操作无法拦截。

## 4.1

## 第4章 变化侦测相关的API 实现 原理

### 4.1 vm.$watch

#### 4.1.1 用法

```bash
# 用法
vm.$watch(expOrFn, callback, [options])
# 观察一个表达式或computed函数
vm.$watch('a.b.c', function (newVal, oldVal) {})
# 返回一个取消观察函数
var unwatch = vm. $watch'a', (newVal, oldVal) >= (})
unwatch ()

# 对象深度监听，数组变动不需要
vm.$watch('someObject', callback, {deep: true})
vm.someObject.nestedValue = 123 # 回调函数将被触发
# 立即执行
vm.$watch('a', callback, { immediate: true}) # 立即以'a' 的当前值触发回调
```

#### 4.1.2 watch的内部原理

- vm.$watch 是对 Watcher的一种封装
- exponFn 是函数时，会发生很神奇的事情。它不只可以动态返回数据，其中读取的所有数 据 也 都 会 被 watcher观 察 。
- 执行newwatcher 后，代码会判断用户是否使用了imediate 参数，
- 如果使用了，则立即 执 行 一次 c b 。最后，返回 一个函数unwatchFn。顾名思义，它的作用是取消观察数据。 其 本 质 是 把watcher 实例从当前正在观察的状态的依赖列表中移除。

![](http://cdn.wangtongmeng.com/20250726162520.png)

#### 4.1.3 deep 参数的实现原理

除了要触发当前这个被监听数据的收集依赖的逻辑之外，还要 把当前监听的这个值在内的所有子值都触发一遍收集依赖逻辑。

如果用户使用了deep 参数，则在window.target= undefined之前调 用traverse 来处理deep的逻辑。



![](http://cdn.wangtongmeng.com/20250726163112.png)

## 4.2-4.4

### 4.2 vm.$set

#### 4.2.1 用法

```bash
vm.$set( target, key, value )
参数:
• {Object | Array} target 
• {string | number} key
• (any} value
返回值:{Funct ion}unwatch
用法:在object 上设置 一个属性，如果object 是响应式的，Vue.js 会保证属性被创建 后也是响应式的，并且触发视图更新。这个方法主要用来避开Vue.js 不能侦测属性被添 加的限制。
```

<img src="http://cdn.wangtongmeng.com/20250726165516.png" style="zoom:50%;" />

vm.$set 的具体实现其实是在observer 中抛出的set 方法

**target 不能是Vuejs实例或者Vue.js实例的根数据对象。**

#### 4.2.2 Array的处理

如果target 是数组并且key 是一个有效的索引值，就先设置length 属性。这样如果我们传递的索引值大于当前数组的length，就需要让target 的length 等于 索引值。
接下来，通过splice 方法把val 设置到target 中的指定位置(参数中提供的索引值的位置)。**当我们使用splice方法把val 设置到target中的时候，数组拦截器会侦测到target发生了变化，并且会自动帮助我们把这个新增的val 转换成响应式的**。

<img src="http://cdn.wangtongmeng.com/20250726165610.png" style="zoom:50%;" />

#### 4.2.3 key 已存在于 target 中

由于key已经存在于target 中，所以其实这个key已经被侦测了变化。直接赋值。

<img src="http://cdn.wangtongmeng.com/20250726165740.png" style="zoom:50%;" />

#### 4.2.4 处理新增的属性

- 获取`target.__ob__` 属性。
- 处理文档中所说的“target 不能是Vuejs实例或Vue.js实例的根数据对象”的情况。
- 如果 target 身上没有 __ 属性，说明它并不是响应式的，并不需要做什么特殊处理，只需要通过 key 和 val 在 target 上设置就行了。
- 如果前面的所有判断条件都不满足，那么说明用户是在响应式数据上新增了一个属性，这种 情况下需要追踪这个新增属性的变化，即使用defineReactive 将新增属性转换成getter/setter 的形式即可。
- 最后，向target 的依赖触发变化通知，并返回val。



<img src="http://cdn.wangtongmeng.com/20250726170953.png" style="zoom:50%;" />

### 4.3 vm.$delete

#### 4.3.1 用法

```bash
vm.$delete( target, key )
参数:
• {Object | Array} target
• {string | number} key/index
用法:删除对象的属性。如果对象是响应式的，需要确 保删除能触发更新视图。这个方法主要用于避开Vuejs 不能检测到属性被删除的限制。 在2.2.0+中，同样支持在数组上工作。
```

**注意：目标对象不能是Vue.js实例或Vuejs 实例的根数据对象。**

#### 4.3.2 实现原理

在ES6之前，JavaScript并没有办法侦测到 一个属性在object 中被删除，所以如果使用delete 来删除 一个属性，Vue.js根本不知道这个属 性被删除了。

使用 `vm.$delete`。它帮助我们在删除属性后自动向依赖发送消息，通知 watcher 数据发生了变化。

![](http://cdn.wangtongmeng.com/20250726172345.png)

## 5.1-5.4

## 第5章 虚拟 DOM简介

### 5.1 什么是虚拟 DOM

虚拟 DOM 的解决方式是 通过状态 生成 一个虚拟节点树，然 后使用虚拟节点树进行渲染。 在渲染之前，会使用新生成的虚拟节点树和上一次生成的虚拟节点树进行对比，只渲染不同的 部分。

### 5.2 为什么要引入虚拟 DOM

Vue.js 2.0 开始选择了一个中等粒度的解决方案，那就是引入了虚拟 DOM。组件级别是一个 watcher 实例，就是说即便一个组件内有 10 个节点使用了某个状态，但其实也只有一个 watcher 在观察这个状态的变化。所以当这个状态发生变化时，只能通知到组件，然后组件内部通过虚拟 DOM 去进行比对与渲染。这是一个比较折中的方案。

### 5.3 Vue.js 中的虚拟DOM

在Vue.js 中，我们使用模板来描述状态与DOM之间的映射关系。Vue.js通过编译将模板转 换成渲染函数(render )，执行渲染函数就 可以得到 一个虚拟节点树，使用这个虚拟节点树就可以渲染页面

<img src="http://cdn.wangtongmeng.com/20250729073934.png" style="zoom:50%;" />

为了避免不必要的DOM操作，虚拟D OM 在虚拟节点映射到视图的过程中，将虚拟节点与 上一次渲染视图所使用的旧虚拟节点 (oldVnode)做对比，找出真正需要更新的节点来进行DOM 操作，从而避免操作其他无任何改动的DOM。

<img src="http://cdn.wangtongmeng.com/20250729074035.png" style="zoom:50%;" />

虚拟DOM做的两件事

- 提供与真实DOM 节点所对应的虚拟节点vnode。
- 又将虚拟节点vnode 和旧虚拟节点oldVnode进行比对，然后更新视图。



## 第6章 VNode

### 6.1什么是 VNode

Vnode类，可以生成不同类型的vnode 实例，而不同类型的vnode 表示不同类型的真实DOM元素。vnode本质上是一个js对象，用于创建真实DOM节点。

![](http://cdn.wangtongmeng.com/20250804075321.png)

### 6.2 VNode 的作用

每次渲染视图时，都是先创建 vnode，再使用它创建真实DOM插入页面，我们会缓存上一次的vnode，在重新渲染视图时，对比新老vnode，找出需要更新的真实DOM再去更新。

Vue.js侦测策略时中等粒度，也就是组件级别

- 当组件使用的状态中有一个发生变化，组件会重新渲染
- 组件中只有一个节点发生变化，也会重新渲染整个组件的所有节点，造成**性能浪费**。因此进行**新老vnode对比**只更新发生变化的节点就变得尤为重要。

### 6.3 Vnode 的类型

- 注释节点、文本节点、元素节点、组件节点、函数式组件、克隆节点

#### 6.3.1 注释节点

一个注释节点只有两个有效属性 text 和isComment，其余属性全是默认的 undefined 或者false。

![](http://cdn.wangtongmeng.com/20250804080325.png)

#### 6.3.2 文本节点

![](http://cdn.wangtongmeng.com/20250804080452.png)

#### 6.3.3 克隆节点

克隆节点是将现有节点的属性复制到新节点中，让新创建的节点和被克隆节点的属性保持 一 致 ，从而实现克隆效果。它的作用时优化静态节点和插槽节点(slot node)。

当组件某个状态发生变化后，当前组件会通过虚拟DOM重新渲染视图，静态节点内容不会改变，只需要首次执行渲染函数获取vnode，后面更新不需要重新生成。所以会将vnode克隆一份，**使用克隆节点进行渲染**。这样**不需要重新执行渲染函数生成静态节点的vnode**，从而提升一定程度的性能。

<img src="http://cdn.wangtongmeng.com/20250804081051.png" style="zoom:50%;" />

#### 6.3.4 元素节点

元素节点通常会存在以下4种有效属性。 

- tag:顾名思义，tag就是一个节点的名称，例如p、ul、li和div等。
- data:该属性包含了一些节点上的数据，比如attrs、class 和style等。
- children:当前节点的子节点列表。
- context:它当前组件的Vue.js实例。

<img src="http://cdn.wangtongmeng.com/20250804081314.png" style="zoom:50%;" />

#### 6.3.5 组件节点

除了元素节点的属性，还有两个独有属性。

- componentOptions：组件节点的选项参数，包含 propsData、tag、children等信息。
- componentInstance：组件的实例，也是Vue.js的实例。

<img src="http://cdn.wangtongmeng.com/20250804081754.png" style="zoom:50%;" />

#### 6.3.6 函数式组件

也有两个独有属性，functionalContext和functionalOptions。

<img src="http://cdn.wangtongmeng.com/20250804081903.png" style="zoom:50%;" />

## 第7章 patch

虚拟DOM最核心的部分是patch，它可以将vnode渲染成真实的DOM。

因为DOM操作的执行速度远不如JavaScript的运算速度快，因此将大量的DOM操作转移到JavaScript中，使用patching算法计算出真正需要更新的节点，最大限度地减少DOM操作，从而显著提升性能。

### 7.1 patch介绍

Patch 对比新老node，找出差异，在现有DOM上进行修改来达到渲染视图的目的。

对现有DOM进行修改需要做三件事：

- 创建新增的节点；
- 删除已经废弃的节点；
- 修改需要更新的节点"

### 7.1.1 新增节点

需要使用vnode生成真实DOM元素并插入到视图

- 当oldVnode不存在而vnode存在时
- 当 vnode和oldVnode完全不是同一个节点时

<img src="http://cdn.wangtongmeng.com/20250812074528.png" style="zoom: 33%;" />

### 7.1.2 删除节点

需要删除的场景

- 当一个节点只在 oldVnode中存在时

### 7.1.3 更新节点

需要更新的场景

- 当oldVnode和vnode是同一个节点时，使用更详细的对⽐操作对真实的DOM节点进行更新。

### 7.1.4小结

<img src="http://cdn.wangtongmeng.com/20250812075058.png" style="zoom: 33%;" />

## 7.2-7.3

### 7.2 创建节点

一个元素从创建到渲染的过程

根据vnode创建DOM元素，然后将DOM插入视图中。

有三种类型节点会被创建插入DOM中：元素节点(是否具有tag属性，创建子节点是递归的过程)、注释节点（isComment是否为true）和文本节点。

<img src="http://cdn.wangtongmeng.com/20250817091904.png" style="zoom:50%;" />



### 7.3 删除节点

通过索引值找到对应vnode，通过其父元素删除自己。

nodeOps的写法是为了实现框架渲染机制和DOM解耦，方便跨平台渲染。

<img src="http://cdn.wangtongmeng.com/20250817092111.png" style="zoom:50%;" />
### 7.4 更新节点
只有两个节点是同一个节点时，才需要更新节点，找出最小更新范围更新。
#### 7.4.1 静态节点
如果新旧虚拟节点是静态节点，直接跳过。
#### 7.4.2 新虚拟节点有文本属性
当新旧虚拟节点不是静态节点，且属性不同时，以新虚拟节点为准更新时图。
新节点有text属性，直接setTextContent方法更新视图dom。
#### 7.4.3 新虚拟节点无文本属性
新节点无text属性，说明是元素节点
- 有children的情况
	- oldVnode有children属性：新旧vnode children对比更新。
	- oldVnode无children属性：说明oldVnode是空标签或有文本的文本节点。只需清空标签，将vnode中的children挨个创建真是DOM节点并插入视图DOM节点下面。
- 无children的情况
	- 当vnode无text属性也无children属性时，说明创建的是空节点。只需要删除oldVnode的子节点或文本。
### 7.5 更新子节点
更新节点时，当新旧vnode都存在子节点且不同时，需要进行子节点的更新操作。
更新子节点有4种操作：更新、新增、删除、移动节点。
#### 7.5.1 更新策略
循环newCihldren新子节点列表，判断oldChildren中有没有相同节点，没有则说明是新增节点，则创建节点并插入视图。如果oldChildren中有节点，则做更新操作。如果只是位置不同则移动节点。
#### 7.5.2 优化策略
一些快捷查找节点的操作：
- 新前与旧前
- 新后与旧后
- 新后与旧前
- 新前与旧后
新前：newChildren中所有未处理的第一个节点。
新后：newChildren中所有未处理的最后一个节点。
旧前：oldChildren中所有未处理的第一个节点。
旧后：oldChildren中所有未处理的最后一个节点。

通过4种方式就可以找到相同节点，节省循环操作。
#### 7.5.3 哪些节点是为处理过的
未循环到的是未处理过的，结合前面的优化策略，通过双指针记录范围，最后在进行循环操作。
## 第8章 模板编译

模板编译，主要是将模板编译成渲染函数。

模板编译分三部分内容：

- 解析器将模板解析成 AST
- 优化器遍历 AST 标记静态节点
- 代码生成器使用 AST 生成渲染函数

## 9.1-9.3.1
## 9.3-9.3.3
## 9.3.3-.9.3.7
## 9.3.8-9.5
## 第10章
## 第11章
## 第12章
## 13.1-13.2
## 13.3.1-13.2
## 13.3.1-13.3.3
## 13.3.4 vm.$mount

`vm.$mount` 

- 参数：Element | string（elementOrSelector）
- 返回值：vm，实例本身。
- 用法：可以让vue实例关联到DOM元素。

<img src="http://cdn.wangtongmeng.com/20251207230747.png" style="zoom:50%;" />

`vm.$mount`在完整版(vue.js)和只包含运行时版本(vue.runtime.js)中的表现不一样。

- 完整版：**模板编译**->渲染函数->挂载与渲染
- 运行时版：渲染函数->挂载与渲染

<img src="http://cdn.wangtongmeng.com/20251207231403.png" style="zoom:50%;" />

**1.完整版`vm.$mount`的实现原理**

- 函数劫持`vm.$mount`原始方法，增加编译功能。
- 编译功能
  - **第一步：通过 el 获取 DOM 元素**
  - **第二步：获取模板 template**
    - vue 实例有 render 选项，直接使用 render，不进入模板编译。
    - 有 template，无 render
      - template 是模板字符串，说明用户设置的模板，直接使用
      - template 是#开头的选择器，获取 DOM 元素的 innerHTML 作为模板
      - template 是 DOM 元素，取元素的 innerHTML 作为模板
    - 无 template，会从 el 选项中获取 HTML 字符串(`el.outerHTML`)作为模板
  - **第三步：将模板编译成渲染函数**
    - 检查编译缓存
    - 模板编译成代码字符串并存储在 compiled 中的 render 属性中，例如`with(this) freturn _C("div",{attrs:("id":"el"}},[_v("Hello "+_s(name))])}'`
    - 调用 createFunction 函数将代码字符串转换为函数（`new Function(code)`），并设置到 `this.$options` 上。

**2.只包含运行时版本的 `vm.$mount` 的实现原理**

- 获取el 对应的 DOM 元素
- 使用 mountComponent 将 vue 实例挂在到 DOM 元素上
  - _update：调用虚拟 DOM 中的 patch 方法执行节点对比与渲染操作。
  - _render：执行渲染函数，生成新 Vnode。
  - 函数所有读操作会被 watcher观察，wacher 会监听数据变化，持续渲染到指定 DOM 元素上。

<img src="http://cdn.wangtongmeng.com/20251208080952.png" style="zoom:50%;" />



## 13.4.1-13.4.5

Vue.extend：使用Vue构造器创建一个子类，参数为组件选项。 内部创建一个 Sub 函数并继承父类。

- 增加缓存策略使用父类 id 作为缓存的 key，将子类缓存在 cachedCtors 中。
- 创建子类并返回，此时还没有继承 Vue 的能力。
- 新增原型继承的逻辑(`Sub.prototype = Object.create(Super.prototype)`)，并将父类的 options 选项继承到子类中(mergeOptions)
- 如果选项中存在 props 属性，则初始化`initProps(Sub)`，作用是将 key 代理到 _props 中。此时 vm.name 访问的是 `Sub.prototype._props.name`
- 如果有 computed，也进行初始化(`initComputed(sub)`)
- 将父类中存在的属性依此复制到子类中，包括 extend，mixin，use，component，directive 和 filter。同时子类上新增了 superOptions，extendOptions 和 sealedOptions 属性。

Vue.nextTick：在下次DOM更新循环结束后执行延迟回调，可用来获取更新后的DOM。

Vue.set：同vm.$set，设置对象属性，如果对象是响应式的，则创建后也是响应式的。用于避开 Vue 不能检测属性被添加的限制。

Vue.delete：删除对象属性。如果对象是响应式的，则会触发更新试图。用于避开Vue不能检测到属性被删除的限制。

Vue.directive：注册或获取全局指令。

## 13.4.6-13.5

## 14.1-14.2

## 14.3.-14.6

## 14.7.1-14.7.3

## 14.7.4-14.9

## 15

## 16

## 17.1-17.6

## 17.7-17.10

## 17.11-17.18









































































































































































































