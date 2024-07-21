import config from './docs/.vitepress/config.js'
import fs from 'fs'
import path from 'path'
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

  const md = transfer(config.themeConfig.sidebar['/fe/'][0].items)
  console.log(md);
  fs.writeFileSync(path.resolve('./docs/fe/index.md') ,md)
