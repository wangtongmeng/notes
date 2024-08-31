# next 实现 ssr

## 知识点

- 样式
  - 全局样式
  - 组件样式
    - css in js
    - css modules
- 约定式路由
  - 普通路由
  - 动态路由
- 服务端初始化数据
- 客户端的LayoutApp 和 store，都是单例的，整个应用的生命周期都不销毁
- 

## 功能

- 登录
- 注册

## 项目难点

- store客户端和服务端处理
  - 初次访问，服务端会走LayoutApp的 getInitailProps方法
    - 1.其中执行getStore方法，此方法会在服务端创建一个新的空仓库
    - 2.如果是服务端环境，会调接口获取当前的登录用户，存入仓库
    - 3.在服务端执行时，把仓库的最新状态放在属性对象的initialState上 `props.initalState = store.getState()`
    - 4.返回props属性对象
  - 服务端，执行的 LayoutApp 的 constructor 方法
    - 5.把props作为属性对象传递给L ayout的构造函数
    - 6.在服务器根据getInitialProps得到的初始化状态创建新的仓库
  - 服务器端，执行 render函数
    - 7.通过使用仓库中的状态在服务器端渲染组件，获取 HTML 字符串
  - 8.服务器把LayoutApp的props序列化成字符串（script标签包裹）和render渲染出来的html一起发给客户端
  - 9.客户端收到数据后，把props反序列化为JS对象传递给LayoutApp的constructor （next做的）
  - 在客户端的constructor中
    - 10.通过服务器返回的状态创建客户端的仓库 `this.store = getStore(props.initialState)`
  - 在客户端的render中
    - 11.通过客户端的仓库的状态渲染组件，进行水合`const state = this.store.getState()`
  - 服务端返回生成的页面和序列化的store数据
  - 并在window上设置store变量，路由切换时复用store

透传cookie