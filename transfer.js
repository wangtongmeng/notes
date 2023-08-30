const items = [
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
    { 
      text: 'Vue', 
      collapsed: true,
      items: [
        {text: 'Pinia使用', link: '/fe/vue/Pinia使用'}
      ]
    },
    { text: 'React', collapsed: true },
    { 
      text: '工程化', 
      collapsed: true,
      items: [
        {text: 'webpack', collapsed: true },
        {text: 'vite', collapsed: true },
        {text: 'rollup', collapsed: true },
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
    { text: '微前端', collapsed: true },
    { text: '设计模式', collapsed: true },
    { text: '性能优化', collapsed: true },
    // { text: '架构', collapsed: true },
    // { text: 'Web3D', collapsed: true },
    { text: '安全', collapsed: true },
    { text: 'Git', collapsed: true },
    {
      text: '项目与轮子',
      collapsed: true,
      items: [
        {text: '真机调试（安卓+chrome）', link: '/fe/projects/真机调试（安卓+Chrome）'}
      ]
    },
    { text: 'Nginx', collapsed: true },
    { text: 'Mysql', collapsed: true },
    { text: 'MongoDB', collapsed: true },
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