import{_ as i,c as a,a2 as t,o as e}from"./chunks/framework.CuCbyi2k.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"MyBatis-Plus-Join","tagline":"MyBatis-Plus 最佳搭档，只做增强不做改变，为简化开发、提高效率而生。","actions":[{"theme":"brand","text":"什么是 MyBatis-Plus-Join ?","link":"/pages/quickstart/introduce"},{"theme":"alt","text":"快速开始","link":"/pages/quickstart/quickstart"},{"theme":"alt","text":"Github","link":"https://github.com/yulichang/mybatis-plus-join"}],"image":{"src":"/log.svg","alt":"MyBatis-Plus-Join"}},"features":[{"title":"润物无声","icon":"☕️","details":"只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑。"},{"title":"效率至上","icon":"🚀","details":"只需简单配置，即可快速进行连表操作，从而节省大量时间。"},{"title":"丰富功能","icon":"📚","details":"支持列枚举, 别名, 逻辑删除, TypeHandle, 一对一, 一对多等功能。"}]},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1729747674000}'),n={name:"index.md"};function l(h,s,p,r,k,o){return e(),a("div",null,s[0]||(s[0]=[t(`<h2 id="当前-mybatis-plus-join-最新版本" tabindex="-1">当前 MyBatis-Plus-Join 最新版本 <a class="header-anchor" href="#当前-mybatis-plus-join-最新版本" aria-label="Permalink to &quot;当前 MyBatis-Plus-Join 最新版本&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-rEs7K" id="tab-0R125eo" checked><label data-title="Maven" for="tab-0R125eo">Maven</label><input type="radio" name="group-rEs7K" id="tab-s8ZmvPc"><label data-title="Gradle" for="tab-s8ZmvPc">Gradle</label></div><div class="blocks"><div class="language-xml vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;com.github.yulichang&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;mybatis-plus-join-boot-starter&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;1.5.1&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//Gradle</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">implementation </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;com.github.yulichang&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;mybatis-plus-join-boot-starter&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1.5.1&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//Gradle short</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">implementation </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;com.github.yulichang:mybatis-plus-join-boot-starter:1.5.1&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//Gradle kotlin</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">implementation(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;com.github.yulichang:mybatis-plus-join-boot-starter:1.5.1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div></div></div><h2 id="代码托管" tabindex="-1">代码托管 <a class="header-anchor" href="#代码托管" aria-label="Permalink to &quot;代码托管&quot;">​</a></h2><p>👉️ <a href="https://github.com/yulichang/mybatis-plus-join" target="_blank" rel="noreferrer">Github</a> | 👉️ <a href="https://gitee.com/best_handsome/mybatis-plus-join" target="_blank" rel="noreferrer">Gitee</a></p><h2 id="演示工程" tabindex="-1">演示工程 <a class="header-anchor" href="#演示工程" aria-label="Permalink to &quot;演示工程&quot;">​</a></h2><p>👉️ <a href="https://github.com/yulichang/mybatis-plus-join-demo" target="_blank" rel="noreferrer">Github</a> | 👉️ <a href="https://gitee.com/best_handsome/mybatis-plus-join-demo" target="_blank" rel="noreferrer">Gitee</a></p><h2 id="友情链接" tabindex="-1">友情链接 <a class="header-anchor" href="#友情链接" aria-label="Permalink to &quot;友情链接&quot;">​</a></h2><p><a href="https://baomidou.com/" target="_blank" rel="noreferrer">MyBatis-Plus</a></p>`,8)]))}const g=i(n,[["render",l]]);export{E as __pageData,g as default};
