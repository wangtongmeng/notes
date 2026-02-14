
import generateConfig from './generateSidebar.js';

const { nav, sidebar } = generateConfig();

export default {
  title: 'tm的学习笔记',
  lastUpdated: true,
  base: '/notes/',
  outDir: '../notes',
  ignoreDeadLinks: [/^http:\/\/localhost/, /^https:\/\/localhost/],
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com/wangtongmeng" }],
    search: {
      provider: 'local'
    },
    nav,
    sidebar
  },
};

