
export default {
  title: 'tm的学习笔记',
  lastUpdated: true,
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com/wangtongmeng" }],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2,3,4,5],
      label: '目录'
    },
    nav: [
      { text: "前端", link: "/fe/" }, 
      { text: "读书", link: "/read/" }, 
      { text: "资源", link: "/resources/" }, 
      {text: '关于我', link: "/me/"}
    ],
    sidebar: {
      '/fe/': [
        {
          text: "前端笔记",
          link: '/fe/',
          items: [
            {
              text: "面试题",
              // link: "/fe/interview/",
              collapsed: true,
              items: [
                { text: "css", link: "/fe/interview/css" },
                { text: "javascript", link: "/fe/interview/javascript" },
                { text: "typescript", link: "/fe/interview/typescript" },
                { text: "vue", link: "/fe/interview/css" },
                { text: "react", link: "/fe/interview/vue体系" },
                { text: "react1", link: "/fe/interview/react" },
                { text: "react2", link: "/fe/interview/React面试题" },
                { text: "react3", link: "/fe/interview/React体系" },
                { text: "node", link: "/fe/interview/node" },
                { text: "webpack", link: "/fe/interview/webpack" },
                { text: "性能优化", link: "/fe/interview/性能优化" },
                { text: "安全", link: "/fe/interview/安全" },
                { text: "项目难点", link: "/fe/interview/项目难点" },
                { text: "项目设计", link: "/fe/interview/项目设计" },
                { text: "知识广度", link: "/fe/interview/知识广度" },
                { text: "软技能", link: "/fe/interview/软技能" },
              ],
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
            {
              text: 'React',
              collapsed: true,
              items: [
                {text: 'React核心用法', link: '/fe/react/React核心用法'},
                {text: 'Redux与React-Redux使用及原理', link: '/fe/react/Redux与React-Redux使用及原理'},
                {text: 'Redux中间件使用及实现原理', link: '/fe/react/Redux中间件使用及实现原理'},
                {text: 'connected-react-router', link: '/fe/react/connected-react-router'},
                {text: 'redux-first-history', link: '/fe/react/redux-first-history'},
                {text: 'redux-saga实现原理', link: '/fe/react/redux-saga实现原理'},
                {text: 'mobx使用', link: '/fe/react/mobx使用'},
                {text: 'mobx实现原理', link: '/fe/react/mobx实现原理'},
            
              ]
            },
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
                {
                  text: 'vite', 
                  collapsed: true,
                  items: [
                    {text: 'Vite使用', link: '/fe/engineering/vite/vite使用'}
                  ]
                },
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
            { 
              text: 'Node', 
              collapsed: true,
              items: [
                {text: 'mongodb使用', link: '/fe/node/mongo'},
              ]
            },
            // {
            //   text: '网络与浏览器',
            //   collapsed: true,
            //   items: [
            //     {text: '跨域的方式', link: '/fe/http/跨域的方式'},
            
            //   ]
            // },
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
    },
  },
};

