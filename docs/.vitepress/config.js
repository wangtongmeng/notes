export default {
  title: 'tm的学习笔记',
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com/wangtongmeng" }],
    nav: [
      { text: "前端", link: "/fe/" }, 
      { text: "读书", link: "/read/" }, 
      {text: '关于我', link: "/me/"}
    ],
    sidebar: {
      '/fe/': [
        {
          text: "前端笔记",
          items: [
            {
              text: "面试题",
              // link: "/fe/interview/",
              collapsed: true,
              items: [{ text: "react面试题", link: "/fe/interview/react" }],
            },
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
              ],
            },
            { text: 'JavaScript', collapsed: true },
            { text: 'Css', collapsed: true },
            { text: 'Vue', collapsed: true },
            { text: 'React', collapsed: true },
            { text: '工程化', collapsed: true },
            { text: 'TypeScript', collapsed: true },
            { text: 'Node', collapsed: true },
            { text: '网络', collapsed: true },
            { text: '浏览器', collapsed: true },
            { text: '微前端', collapsed: true },
            { text: '设计模式', collapsed: true },
            // { text: '架构', collapsed: true },
            { text: 'Web3D', collapsed: true },
            { text: '安全', collapsed: true },
            { text: 'Git', collapsed: true },
            { text: '项目与轮子', collapsed: true },
            { text: 'Nginx', collapsed: true },
            { text: 'Mysql', collapsed: true },
            { text: 'MongoDB', collapsed: true },
          ],
        },
      ]
    },
  },
};
