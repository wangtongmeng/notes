# nuxt.js 实现 ssr

## 安装

```bash
npx nuxi@latest init nuxt3-learn
# 选择 npm
cd nuxt3-learn
npm run dev
```





基本原理

- 通过 Vue 的 server-renderer 模块将 Vue 应用实例转换成一段文本的 HTML 字符串；
- 通过 Nodejs 创建一个静态 Web 服务器；
- 通过 Nodejs 将服务端所转好的 HTML 结构发送给浏览器端进行展示。



nuxt.js+vue2的原理图

![](http://cdn.wangtongmeng.com/20240826190720-6e6b94.png)

目录结构

<img src="http://cdn.wangtongmeng.com/20240826193909-7a27a1.png" style="zoom:33%;" />

第二次ssr改造

- 服务端数据预取：封装 asyncData函数、create函数
- 同步数据状态：vuex-router-sync、window.INITIAL_STATE__
- SSR 优化：生成预加载指令 ssr-manifest.json