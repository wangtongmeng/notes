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

## 4.2-4.4

## 5.1-5.4

## 第6章

