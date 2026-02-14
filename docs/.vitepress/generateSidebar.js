import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { hideConfig } from './hideConfig.js';
import { navConfig } from './nav-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 检查目录是否应该隐藏
function shouldHideDirectory(dirPath, docsPath) {
  // 转换为docs开头的格式
  const docsRelativePath = `docs/${path.relative(docsPath, dirPath)}`;
  return hideConfig.hiddenDirectories.some(hiddenDir => 
    docsRelativePath === hiddenDir || docsRelativePath.startsWith(hiddenDir + '/')
  );
}

// 检查文件是否应该隐藏
function shouldHideFile(filePath, docsPath) {
  // 转换为docs开头的格式，去掉.md扩展名
  const relativePath = path.relative(docsPath, filePath);
  const docsRelativePath = `docs/${relativePath.replace('.md', '')}`;
  return hideConfig.hiddenFiles.includes(docsRelativePath);
}

// 获取docs下所有一级目录
function getFirstLevelDirs(docsPath) {
  return fs.readdirSync(docsPath)
    .filter(item => {
      const fullPath = path.join(docsPath, item);
      const isDirectory = fs.statSync(fullPath).isDirectory();
      const isHidden = item.startsWith('.');
      const isExcludedDir = ['public'].includes(item);
      const isHiddenByConfig = shouldHideDirectory(fullPath, docsPath);
      return isDirectory && !isHidden && !isExcludedDir && !isHiddenByConfig;
    });
}

// 递归生成侧边栏配置
function generateSidebarConfig(docsPath, dir, depth = 1) {
  const fullPath = path.join(docsPath, dir);
  
  // 检查整个目录是否应该隐藏
  if (shouldHideDirectory(fullPath, docsPath)) {
    return [];
  }
  
  const items = fs.readdirSync(fullPath);
  
  return items.map(item => {
    const itemPath = path.join(fullPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // 如果是目录，递归处理，深度加1
      const subItems = generateSidebarConfig(docsPath, path.join(dir, item), depth + 1);
      // 如果子目录没有内容，不返回
      if (subItems.length === 0) {
        return null;
      }
      
      // 二级目录（depth=1，如alg）应该默认展开
      // 三级及更深目录（depth>=2）应该默认收起
      const shouldCollapse = depth >= 2;
      
      return {
        text: item,
        collapsible: true,      // 允许折叠
        collapsed: shouldCollapse,  // 三级及以下目录默认收起
        items: subItems
      };
    } else if (item.endsWith('.md') && item !== 'index.md') {
      // 如果是md文件且不是index.md
      
      // 检查文件是否应该隐藏
      if (shouldHideFile(itemPath, docsPath)) {
        return null;
      }
      
      const name = item.replace('.md', '');
      return {
        text: name,
        link: `/${dir}/${name}`
      };
    }
    return null;
  }).filter(Boolean); // 过滤掉undefined项
}

// 生成完整的配置
function generateConfig() {
  const docsPath = path.join(__dirname, '../');
  const dirs = getFirstLevelDirs(docsPath);
  
  // 根据nav-config中的排序配置生成导航
  const nav = [];
  navConfig.navigation.order.forEach(dirName => {
    if (dirs.includes(dirName)) {
      nav.push({
        text: navConfig.navigation.names[dirName] || dirName,
        link: `/${dirName}/`
      });
    }
  });
  
  // 添加未在order中配置的其他目录
  dirs.forEach(dir => {
    if (!navConfig.navigation.order.includes(dir)) {
      nav.push({
        text: navConfig.navigation.names[dir] || dir,
        link: `/${dir}/`
      });
    }
  });

  // 生成sidebar配置
  const sidebar = {};
  dirs.forEach(dir => {
    const items = generateSidebarConfig(docsPath, dir);
    if (items.length > 0) {
      // 直接使用子目录作为侧边栏项，不嵌套在父目录下
      sidebar[`/${dir}/`] = items;
    }
  });
  
  return { nav, sidebar };
}

export default generateConfig;