# Vue3使用的vscode插件

## Volar

随着 Vue3 正式版发布，Vue 团队官方推荐Volar 插件来代替 Vetur 插件，不仅支持 Vue3 语言高亮、语法检测，还支持 TypeScript 和基于vue-tsc 的类型检查功能。

使用时需要注意：

首先要禁用 Vetur 插件，避免冲突；

推荐使用css /less /scss 作为`<style>` 的语言，因为这些基于vscode-css-language 服务提供了可靠的语言支持；

如果使用postcss /stylus /sass 的话，需要安装额外的语法高亮扩展。postcss 使用language-postcss，stylus 使用language-stylus 拓展，sass 使用Sass 拓展；

Volar 不包含 ESLint 和 Prettier，而官方的ESLint 和Prettier 扩展支持 Vue，所以需要自行安装。

## Vue VSCode Snippets

Vue VSCode Snippets 插件旨在为开发者提供最简单快速的生成 Vue 代码片段的方法，通过各种快捷键就可以在 .vue 文件中快速生成各种代码片段。简直是 Vue3 开发必备神器。

该插件支持：Volar、Vue2 和 Vue3。

## Auto Close Tag

Auto Close Tag 插件是一个很好用的 VS Code 扩展，它对生产率有很大影响。顾名思义，当我们在结束标记中键入结束括号时，它将添加结束标记。它支持HTML，Handlebars，XML，PHP，Vue，JavaScript，Typescript，JSX等。

## Vue Peek

Vue Peek 插件用来拓展 Vue 代码编辑的体验，可以让我们快速跳转到组件、模块定义的文件。

