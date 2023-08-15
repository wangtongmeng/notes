export default {
  themeConfig: {
    nav: [{ text: "前端笔记", link: "/fe/" }],
    sidebar: [
      {
        text: "前端笔记",
        items: [
          {
            text: "面试题",
            // link: "/fe/interview/",
            items: [{ text: "react面试题", link: "/fe/interview/react" }],
          },
          {
            text: "算法",
            // link: "/fe/alg/",
            items: [
              { text: "时间与空间复杂度", link: "/fe/alg/complexity" },
              { text: "栈", link: "/fe/alg/stack" }
            ],
          },
        ],
      },
    ],
  },
};
