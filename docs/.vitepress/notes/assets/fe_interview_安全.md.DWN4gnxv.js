import{_ as i,c as l,o as e,a4 as t}from"./chunks/framework.C5rzuSi5.js";const x=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"fe/interview/安全.md","filePath":"fe/interview/安全.md","lastUpdated":1698055960000}'),o={name:"fe/interview/安全.md"},a=t('<h2 id="常见的-web-前端攻击方式有哪些" tabindex="-1">常见的 web 前端攻击方式有哪些？ <a class="header-anchor" href="#常见的-web-前端攻击方式有哪些" aria-label="Permalink to &quot;常见的 web 前端攻击方式有哪些？&quot;">​</a></h2><ul><li>XSS 跨站请求攻击</li><li>CSRF 跨站请求伪造</li></ul><p>xss 攻击</p><ul><li>一个博客网站，我发表一篇博客，其中嵌入 <code>&lt;script&gt;</code> 脚本</li><li>脚本内容：获取 cookie，发送到我的服务器（服务器配合跨域）</li><li>发布这边博客，有人查看它，获取访问者的 cookie</li></ul><p>xss 预防</p><ul><li>替换特殊字符，如 &lt; 变为 $lt； &gt; 变为 %gt</li><li><code>&lt;script&gt;</code>变为 <code>$ltscript&amp;gt</code>，直接显示，而不会作为脚本执行</li><li>前后端都要替换</li></ul><p>可以使用 xss npm 包</p><p>XSRF 攻击</p><ul><li>你正在购物，看中了某个商品，商品 id 是 100</li><li>付费接口是 xxx.com/pay?id=100，但没有任何验证</li><li>我是攻击者，我看中了一个商品， id 是 200</li><li>我向你发送一封电子邮件， 邮件标题很吸引入</li><li>但邮件正文隐藏着 <code>&lt;img src=xxx.com/pay?id=200/&gt;</code></li><li>你一查看邮件，就帮我购买了 id 是 200 的商品</li></ul><p>XSRF 预防</p><ul><li>使用 POST 接口（跨域是需要后端验证的）</li><li>增加验证，例如密码、短信验证码、指纹等</li></ul>',11),c=[a];function s(d,r,p,_,n,u){return e(),l("div",null,c)}const f=i(o,[["render",s]]);export{x as __pageData,f as default};
