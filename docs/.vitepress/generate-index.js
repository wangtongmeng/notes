import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { hideConfig } from './hideConfig.js';

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

// 递归获取目录下所有markdown文件路径
function getAllMarkdownFiles(fullPath, basePath, dirPath = '') {
  const files = [];
  const items = fs.readdirSync(fullPath);
  
  for (const item of items) {
    const itemPath = path.join(fullPath, item);
    const stat = fs.statSync(itemPath);
    const relativePath = path.join(dirPath, item);
    
    // 检查整个目录是否应该隐藏
    if (stat.isDirectory()) {
      if (shouldHideDirectory(itemPath, basePath)) {
        continue;
      }
      files.push(...getAllMarkdownFiles(itemPath, basePath, relativePath));
    } else if (item.endsWith('.md') && item !== 'index.md') {
      // 检查文件是否应该隐藏
      if (shouldHideFile(itemPath, basePath)) {
        continue;
      }
      files.push({
        name: item.replace('.md', ''),
        fullPath: itemPath,
        relativePath: `${dirPath}/${item}`.replace(/^\/+/, '')
      });
    }
  }
  
  return files;
}

// 为目录生成index.md内容
function generateIndexContent(docsPath, dir) {
  const fullPath = path.join(docsPath, dir);
  
  // 检查目录是否应该隐藏
  if (shouldHideDirectory(fullPath, docsPath)) {
    return null;
  }
  
  const items = fs.readdirSync(fullPath);
  console.log('item', items);
  
  const groups = {};
  
  // 按子目录分组
  for (const item of items) {
    const itemPath = path.join(fullPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory() && !shouldHideDirectory(itemPath, docsPath)) {
      const subFiles = getAllMarkdownFiles(itemPath, docsPath, item);
      if (subFiles.length > 0) {
        groups[item] = subFiles;
      }
    } else if (item.endsWith('.md') && item !== 'index.md') {
      // 检查文件是否应该隐藏
      if (shouldHideFile(itemPath, docsPath)) {
        continue;
      }
      if (!groups['直接文件']) {
        groups['直接文件'] = [];
      }
      groups['直接文件'].push({
        name: item.replace('.md', ''),
        fullPath: itemPath,
        relativePath: item
      });
    }
  }
  
  // 生成Markdown内容
  let content = '# 文章汇总\n\n';
  
  // 递归生成目录索引
  content += generateDirIndex(docsPath, dir, 0);
  
  return content;
}

// 递归遍历目录并生成索引内容
function generateDirIndex(docsPath, topLevelDir, indentLevel) {
  const fullPath = path.join(docsPath, topLevelDir);
  let content = '';
  
  // 检查目录是否应该隐藏
  if (shouldHideDirectory(fullPath, docsPath)) {
    return '';
  }
  
  return generateDirContent(docsPath, topLevelDir, '', indentLevel);
}

// 递归遍历目录并生成内容
function generateDirContent(docsPath, topLevelDir, currentRelativePath, indentLevel) {
  const fullPath = path.join(docsPath, topLevelDir, currentRelativePath || '');
  let content = '';
  
  // 检查目录是否应该隐藏
  if (shouldHideDirectory(fullPath, docsPath)) {
    return '';
  }
  
  const items = fs.readdirSync(fullPath);
  
  // 按字母顺序排序
  const sortedItems = items.sort((a, b) => a.localeCompare(b));
  
  for (const item of sortedItems) {
    const itemPath = path.join(fullPath, item);
    const stat = fs.statSync(itemPath);
    const indent = '  '.repeat(indentLevel);
    
    // 检查是否应该隐藏
    if (shouldHideDirectory(itemPath, docsPath) || 
        (stat.isFile() && shouldHideFile(itemPath, docsPath))) {
      continue;
    }
    
    if (stat.isDirectory()) {
      // 检查目录是否有有效的markdown文件
      const hasValidFiles = fs.readdirSync(itemPath).some(subItem => {
        const subItemPath = path.join(itemPath, subItem);
        const subStat = fs.statSync(subItemPath);
        return (subStat.isFile() && subItem.endsWith('.md') && subItem !== 'index.md' && !shouldHideFile(subItemPath, docsPath)) ||
               (subStat.isDirectory() && !shouldHideDirectory(subItemPath, docsPath));
      });
      
      if (hasValidFiles) {
        // 目录：显示目录名并递归
        const nextRelativePath = currentRelativePath ? `${currentRelativePath}/${item}` : item;
        content += `${indent}- ${item}\n`;
        content += generateDirContent(docsPath, topLevelDir, nextRelativePath, indentLevel + 1);
      }
    } else if (item.endsWith('.md') && item !== 'index.md') {
      // 文件：显示文件链接
      const fileName = item.replace('.md', '');
      // 当前文件相对于topLevelDir的路径
      const relativePath = currentRelativePath ? `${currentRelativePath}/${fileName}` : fileName;
      // 链接应该是相对于当前index.md所在目录的路径
      const link = `./${relativePath}`;
      content += `${indent}- [${fileName}](${link})\n`;
    }
  }
  
  return content;
}

// 生成所有一级目录的index.md文件
function generateAllIndexFiles() {
  const docsPath = path.join(__dirname, '../');
  const items = fs.readdirSync(docsPath);
  
  for (const item of items) {
    const fullPath = path.join(docsPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && 
        !item.startsWith('.') && 
        item !== 'public' && 
        !shouldHideDirectory(fullPath, docsPath)) {
      
      const content = generateIndexContent(docsPath, item);
      if (content) {
        const indexPath = path.join(fullPath, 'index.md');
        fs.writeFileSync(indexPath, content, 'utf8');
        console.log(`已生成: ${indexPath}`);
      }
    }
  }
}

// 执行生成
if (import.meta.url === `file://${__filename}`) {
  generateAllIndexFiles();
  console.log('✅ 所有一级目录的index.md文件已生成完成！');
}

export { generateIndexContent };