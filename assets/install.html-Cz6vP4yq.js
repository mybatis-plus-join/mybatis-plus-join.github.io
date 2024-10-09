import{_ as c,c as o,a as s,b as e,w as l,d as r,r as p,o as u,e as a}from"./app-BvwUZdhv.js";const d={};function m(v,n){const t=p("CodeGroupItem"),i=p("CodeGroup");return u(),o("div",null,[n[2]||(n[2]=s("h1",{id:"安装",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#安装"},[s("span",null,"安装")])],-1)),n[3]||(n[3]=s("p",null,"全新的 MyBatis-Plus-Join 版本基于 JDK8，提供了 lambda 形式的调用，所以安装集成要求如下：",-1)),n[4]||(n[4]=s("ul",null,[s("li",null,"JDK 8+"),s("li",null,"Maven or Gradle")],-1)),n[5]||(n[5]=s("h2",{id:"spring-boot",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#spring-boot"},[s("span",null,"Spring Boot")])],-1)),n[6]||(n[6]=s("p",null,"添加依赖",-1)),e(i,null,{default:l(()=>[e(t,{title:"Maven"},{default:l(()=>n[0]||(n[0]=[s("div",{class:"language-xml","data-highlighter":"prismjs","data-ext":"xml","data-title":"xml"},[s("pre",{class:"language-xml"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"<"),a("dependency")]),s("span",{class:"token punctuation"},">")])]),a(`
`),s("span",{class:"line"},[a("    "),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"<"),a("groupId")]),s("span",{class:"token punctuation"},">")]),a("com.github.yulichang"),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"</"),a("groupId")]),s("span",{class:"token punctuation"},">")])]),a(`
`),s("span",{class:"line"},[a("    "),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"<"),a("artifactId")]),s("span",{class:"token punctuation"},">")]),a("mybatis-plus-join-boot-starter"),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"</"),a("artifactId")]),s("span",{class:"token punctuation"},">")])]),a(`
`),s("span",{class:"line"},[a("    "),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"<"),a("version")]),s("span",{class:"token punctuation"},">")]),a("最新版本"),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"</"),a("version")]),s("span",{class:"token punctuation"},">")])]),a(`
`),s("span",{class:"line"},[s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"</"),a("dependency")]),s("span",{class:"token punctuation"},">")])]),a(`
`),s("span",{class:"line"})])])],-1)])),_:1}),e(t,{title:"Gradle"},{default:l(()=>n[1]||(n[1]=[s("div",{class:"language-gradle line-numbers-mode","data-highlighter":"prismjs","data-ext":"gradle","data-title":"gradle"},[s("pre",{class:"language-gradle"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"token keyword"},"implementation"),a(),s("span",{class:"token string"},"'com.github.yulichang:mybatis-plus-join-boot-starter:最新版本'")]),a(`
`),s("span",{class:"line"})])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"})])],-1)])),_:1})]),_:1}),n[7]||(n[7]=r(`<div class="custom-container warning"><p class="custom-container-title">注意</p><p>MyBatis-Plus-Join 需要配合 MyBatis-plus 3.3.0 及以上的版本使用</p></div><h2 id="mapper继承mpjbasemapper" tabindex="-1"><a class="header-anchor" href="#mapper继承mpjbasemapper"><span>mapper继承MPJBaseMapper</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token annotation punctuation">@Mapper</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserMapper</span> <span class="token keyword">extends</span> <span class="token class-name">MPJBaseMapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="可选-service继承mpjbaseservice" tabindex="-1"><a class="header-anchor" href="#可选-service继承mpjbaseservice"><span>(可选)service继承MPJBaseService</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserService</span> <span class="token keyword">extends</span> <span class="token class-name">MPJBaseService</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="可选-serviceimpl继承mpjbaseserviceimpl" tabindex="-1"><a class="header-anchor" href="#可选-serviceimpl继承mpjbaseserviceimpl"><span>(可选)serviceImpl继承MPJBaseServiceImpl</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token annotation punctuation">@Service</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserServiceImpl</span> <span class="token keyword">extends</span> <span class="token class-name">MPJBaseServiceImpl</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserMapper</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">implements</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7))])}const g=c(d,[["render",m],["__file","install.html.vue"]]),b=JSON.parse('{"path":"/pages/quickstart/install.html","title":"安装","lang":"en-US","frontmatter":{"tags":["install"]},"headers":[{"level":2,"title":"Spring Boot","slug":"spring-boot","link":"#spring-boot","children":[]},{"level":2,"title":"mapper继承MPJBaseMapper","slug":"mapper继承mpjbasemapper","link":"#mapper继承mpjbasemapper","children":[]},{"level":2,"title":"(可选)service继承MPJBaseService","slug":"可选-service继承mpjbaseservice","link":"#可选-service继承mpjbaseservice","children":[]},{"level":2,"title":"(可选)serviceImpl继承MPJBaseServiceImpl","slug":"可选-serviceimpl继承mpjbaseserviceimpl","link":"#可选-serviceimpl继承mpjbaseserviceimpl","children":[]}],"git":{"updatedTime":1728482765000,"contributors":[{"name":"yulichang","email":"570810310@qq.com","commits":1}]},"filePathRelative":"pages/quickstart/install.md"}');export{g as comp,b as data};