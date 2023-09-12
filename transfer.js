const items = [
  {
    text: "前端笔记",
    link: '/fe/',
    items: [
      {
        text: "面试题",
        // link: "/fe/interview/",
        collapsed: true,
        items: [{ text: "react面试题", link: "/fe/interview/react" }],
      },
      { text: 'JavaScript', collapsed: true },
      // es6+语法
      // 异步
      //   事件轮询
      //   promise原理
      //   async使用及原理
      //   generator
      // 作用域与作用域链
      // 正则
      // 新数据结构
      // 
      { text: 'Css', collapsed: true },
      // 常用知识点总结
      { 
        text: 'Vue', 
        collapsed: true,
        items: [
          {text: 'Pinia使用', link: '/fe/vue/Pinia使用'},
          {text: 'pinia实现原理', link: '/fe/vue/pinia实现原理'},
          {text: 'vue-router4实现原理', link: '/fe/vue/vue-router4实现原理'},
          // router 使用
          // vue3 options api 使用
          // vue3 组合式api使用
          // pinia 原理
          // vue-router原理
          // vue2原理
          // vue3原理
        ]
      },
      { text: 'React', collapsed: true },
      // react16简单实现
      // react使用
      // react18新特性
      // redux react-redux 中间件 使用及实现
      // mobx 使用及原理
      // react-router-5简单使用
      // react-router-6使用
      // react-router-6实现原理
      { 
        text: '工程化', 
        collapsed: true,
        items: [
          {text: 'webpack', collapsed: true },
          // webpack5使用
          // webpack5原理
          {text: 'vite', collapsed: true },
          // vite使用
          // vite原理
          {text: 'rollup', collapsed: true },
          // rollup使用
        ] 
      },
      { 
        text: 'TypeScript', 
        collapsed: true,
        items: [
          {text: 'TypeScript安装与编译', link: '/fe/typescript/01.TypeScript安装与编译'},
          {text: '数据类型', link: '/fe/typescript/02.数据类型'},
          {text: '函数', link: '/fe/typescript/03.函数'},
          {text: '类', link: '/fe/typescript/04.类'},
          {text: '接口', link: '/fe/typescript/05.接口'},
          {text: '泛型', link: '/fe/typescript/06.泛型'},
          {text: '结构类型系统', link: '/fe/typescript/08.结构类型系统'},
          {text: '类型变换', link: '/fe/typescript/09.类型变换'},
          {text: '模块VS命名空间', link: '/fe/typescript/10.模块VS命名空间'},
          {text: '类型声明', link: '/fe/typescript/11.类型声明'},
        ]
      },
      { text: 'Node', collapsed: true },
      { text: '网络', collapsed: true },
      { text: '浏览器', collapsed: true },
      { 
        text: '微前端', 
        collapsed: true,
        items: [
          {text: 'systemjs使用及原理', link: '/fe/micro-app/systemjs使用及原理'},
          {text: 'single-spa使用', link: '/fe/micro-app/single-spa使用'},
          {text: 'single-spa实现原理', link: '/fe/micro-app/single-spa实现原理'},
          {text: 'qiankun使用', link: '/fe/micro-app/qiankun使用'},
        ]
      },
      { text: '设计模式', collapsed: true },
      { text: '性能优化', collapsed: true },
      // { text: '架构', collapsed: true },
      // { text: 'Web3D', collapsed: true },
      { text: '安全', collapsed: true },
      { text: 'Git', collapsed: true },
      {
        text: '项目开发',
        collapsed: true,
        items: [
          {text: '真机调试（安卓+chrome）', link: '/fe/projects/真机调试（安卓+Chrome）'},
          {text: 'Vite4+Vue3+Typescript搭建开发环境', link: '/fe/projects/Vite4+Vue3+Typescript搭建开发环境'}
        ]
      },
      { text: 'Nginx', collapsed: true },
      { text: 'Mysql', collapsed: true },
      { text: 'MongoDB', collapsed: true },
      {
        text: "算法",
        // link: "/fe/alg/",
        collapsed: true,
        items: [
          { text: "时间与空间复杂度", link: "/fe/alg/complexity" },
          { text: "栈", link: "/fe/alg/stack" },
          { text: "队列", link: "/fe/alg/queue" },
          { text: "链表", link: "/fe/alg/linkList" },
          { text: "集合", link: "/fe/alg/set" },
          { text: "字典", link: "/fe/alg/map" },
          { text: "树", link: "/fe/alg/tree" },
          { text: "图", link: "/fe/alg/graph" },
          { text: "堆", link: "/fe/alg/heap" },
          { text: "排序与搜索", link: "/fe/alg/排序与搜索" },  
          { text: "分而治之", link: "/fe/alg/分而治之" },
          { text: "动态规划", link: "/fe/alg/动态规划" },
          { text: "贪心算法", link: "/fe/alg/贪心算法" },
          { text: "回溯算法", link: "/fe/alg/回溯算法" },
        ],
      },
    ],
  },
]
function transfer (items) {
    let str = ''
    const rec = (item) => {
        if (item.text && !item.link && Array.isArray(item.items)) {
            // 标题
            str += '\n' + item.text + '\n'
        }
        if (item.text && item.link) {
            // 文章
            str += `- [${item.text}](${item.link})` + '\n'
        }
        if (Array.isArray(item.items)) {
            item.items.forEach(rec)
        }
    }
    items.forEach(rec)
    return str
  }


  console.log(transfer(items));