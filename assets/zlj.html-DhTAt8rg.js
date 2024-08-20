import{_ as a,c as p,b as s,e as t,a as e,d as c,o,r as l}from"./app-CNsAH4Lb.js";const i={},u=s("h1",{id:"自连接",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#自连接"},[s("span",null,"自连接")])],-1),r=s("p",null,"以父子关系为例, 查询子User的name到父User的createName中",-1),k={class:"custom-container warning"},d=s("p",{class:"custom-container-title"},"注意",-1),m=c(`<h2 id="mpjlambdawrapper" tabindex="-1"><a class="header-anchor" href="#mpjlambdawrapper"><span>MPJLambdaWrapper</span></a></h2><p>MPJLambdaWrapper可以这么写</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span> dtos <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">selectJoinList</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&quot;u.\`name\` as createName&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token string">&quot;\`user\` u on u.pid = t.id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以lambda + String实现</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span> dtos1 <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">selectJoinList</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">//这个select 和 后面的两个selectAs等效</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&quot;u.\`name\` as createName&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAs</span><span class="token punctuation">(</span><span class="token string">&quot;u.\`name\`&quot;</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getCreateName</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAs</span><span class="token punctuation">(</span><span class="token string">&quot;u&quot;</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getCreateName</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">//这里容易混淆, on语句两个参数都是UserDO, 第一个为副表条件, 第二个为主表条件, 不要弄混了</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;u&quot;</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getPid</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以纯lambda实现</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span> dtos <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">selectJoinList</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">//这里容易混淆, on语句两个参数都是UserDO, 第一个为副表条件, 第二个为主表条件, 不要弄混了</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getPid</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> ext <span class="token operator">-&gt;</span> ext</span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">selectAs</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span><span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getCreateName</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">//查询 t1.\`name\` AS createTime</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">lt</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function v(g,b){const n=l("Badge");return o(),p("div",null,[u,r,s("div",k,[d,s("p",null,[t("自连接 需要 mybatis-plus-join 版本 "),e(n,{type:"tip",text:"1.4.0+",vertical:"top"})])]),m])}const h=a(i,[["render",v],["__file","zlj.html.vue"]]),U=JSON.parse('{"path":"/pages/core/qt/zlj.html","title":"自连接","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"MPJLambdaWrapper","slug":"mpjlambdawrapper","link":"#mpjlambdawrapper","children":[]}],"git":{"updatedTime":1724150898000,"contributors":[{"name":"yulichang","email":"570810310@qq.com","commits":2}]},"filePathRelative":"pages/core/qt/zlj.md"}');export{h as comp,U as data};
