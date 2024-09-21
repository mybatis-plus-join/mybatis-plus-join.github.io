import{_ as p,c as l,b as a,e as s,a as e,d as t,o as c,r as i}from"./app-Cw1uu3eM.js";const o={},r=t(`<h1 id="链式调用" tabindex="-1"><a class="header-anchor" href="#链式调用"><span>链式调用</span></a></h1><p>通过wrapper直接查询 参考MP的 LambdaQueryChainWrapper</p><h2 id="one" tabindex="-1"><a class="header-anchor" href="#one"><span>one()</span></a></h2><p>返回一个主表实体</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">  <span class="token class-name">User</span> user <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">one</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="one-xxx-class" tabindex="-1"><a class="header-anchor" href="#one-xxx-class"><span>one(xxx.class)</span></a></h2><p>返回一个自定义的实体</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">  <span class="token class-name">UserDTO</span> dtp <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">one</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="first" tabindex="-1"><a class="header-anchor" href="#first"><span>first()</span></a></h2>`,9),u=a("br",null,null,-1),d=a("br",null,null,-1),k=t(`<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">  <span class="token class-name">User</span> user <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="first-xxx-class" tabindex="-1"><a class="header-anchor" href="#first-xxx-class"><span>first(xxx.class)</span></a></h2>`,2),g=a("br",null,null,-1),m=a("br",null,null,-1),h=t(`<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">  <span class="token class-name">UserDTO</span> dtp <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="list" tabindex="-1"><a class="header-anchor" href="#list"><span>list()</span></a></h2><p>返回主表实体的List</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">  <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="list-xxx-class" tabindex="-1"><a class="header-anchor" href="#list-xxx-class"><span>list(xxx.class)</span></a></h2><p>返回自定义实体的List</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">  <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDTO</span><span class="token punctuation">&gt;</span></span> dtoList <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="page-page" tabindex="-1"><a class="header-anchor" href="#page-page"><span>page(page)</span></a></h2><p>分页查询主表</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">  <span class="token class-name">Page</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span> page <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">page</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Page</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="page-page-xxx-class" tabindex="-1"><a class="header-anchor" href="#page-page-xxx-class"><span>page(page, xxx.class)</span></a></h2><p>分页查询自定义实体类</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">  <span class="token class-name">Page</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDTO</span><span class="token punctuation">&gt;</span></span> page <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">page</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Page</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">UserDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,13),v={id:"mapone",tabindex:"-1"},x={class:"header-anchor",href:"#mapone"},b=t(`<p>返回一个Map&lt;String, Object&gt;对象</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">  <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> one <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">mapOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,2),j={id:"mapfirst",tabindex:"-1"},f={class:"header-anchor",href:"#mapfirst"},_=t(`<p>返回第一个Map&lt;String, Object&gt;对象 （使用分页逻辑（Page(1,1)））</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">  <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> first <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">mapFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,2),y={id:"maplist",tabindex:"-1"},w={class:"header-anchor",href:"#maplist"},O=t(`<p>返回一个List&lt;Map&lt;String, Object&gt;&gt;对象</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">  <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Map</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">mapList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,2),P={id:"mappage",tabindex:"-1"},U={class:"header-anchor",href:"#mappage"},L=t(`<p>分页查询</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">  <span class="token class-name">Page</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Map</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">mapPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,2);function S(T,D){const n=i("Badge");return c(),l("div",null,[r,a("p",null,[s("返回第一个主表实体"),u,s(" 先调用list，再取第一个"),e(n,{type:"important",text:"1.4.13-",vertical:"top"}),d,s(" 使用分页逻辑（Page(1,1)）"),e(n,{type:"tip",text:"1.5.0+",vertical:"top"})]),k,a("p",null,[s("返回第一个自定义的实体"),g,s(" 先调用list，再取第一个"),e(n,{type:"important",text:"1.4.13-",vertical:"top"}),m,s(" 使用分页逻辑（Page(1,1)）"),e(n,{type:"tip",text:"1.5.0+",vertical:"top"})]),h,a("h2",v,[a("a",x,[a("span",null,[s("mapOne"),e(n,{type:"tip",text:"1.5.0+",vertical:"top"})])])]),b,a("h2",j,[a("a",f,[a("span",null,[s("mapFirst"),e(n,{type:"tip",text:"1.5.0+",vertical:"top"})])])]),_,a("h2",y,[a("a",w,[a("span",null,[s("mapList"),e(n,{type:"tip",text:"1.5.0+",vertical:"top"})])])]),O,a("h2",P,[a("a",U,[a("span",null,[s("mapPage"),e(n,{type:"tip",text:"1.5.0+",vertical:"top"})])])]),L])}const B=p(o,[["render",S],["__file","chain.html.vue"]]),N=JSON.parse('{"path":"/pages/core/logic/chain.html","title":"链式调用","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"one()","slug":"one","link":"#one","children":[]},{"level":2,"title":"one(xxx.class)","slug":"one-xxx-class","link":"#one-xxx-class","children":[]},{"level":2,"title":"first()","slug":"first","link":"#first","children":[]},{"level":2,"title":"first(xxx.class)","slug":"first-xxx-class","link":"#first-xxx-class","children":[]},{"level":2,"title":"list()","slug":"list","link":"#list","children":[]},{"level":2,"title":"list(xxx.class)","slug":"list-xxx-class","link":"#list-xxx-class","children":[]},{"level":2,"title":"page(page)","slug":"page-page","link":"#page-page","children":[]},{"level":2,"title":"page(page, xxx.class)","slug":"page-page-xxx-class","link":"#page-page-xxx-class","children":[]},{"level":2,"title":"mapOne","slug":"mapone","link":"#mapone","children":[]},{"level":2,"title":"mapFirst","slug":"mapfirst","link":"#mapfirst","children":[]},{"level":2,"title":"mapList","slug":"maplist","link":"#maplist","children":[]},{"level":2,"title":"mapPage","slug":"mappage","link":"#mappage","children":[]}],"git":{"updatedTime":1726887160000,"contributors":[{"name":"yulichang","email":"570810310@qq.com","commits":3}]},"filePathRelative":"pages/core/logic/chain.md"}');export{B as comp,N as data};