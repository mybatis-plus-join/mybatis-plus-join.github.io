import{_ as a,c as p,b as n,e as t,a as e,d as l,o as c,r as i}from"./app-yHP-xtTQ.js";const o={},u=n("h1",{id:"联合查询",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#联合查询"},[n("span",null,"联合查询")])],-1),d={id:"union-union-all-示例",tabindex:"-1"},k={class:"header-anchor",href:"#union-union-all-示例"},r=l(`<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">MpJoinTest</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Resource</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">UserMapper</span> userMapper<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Test</span></span>
<span class="line">    <span class="token keyword">void</span> <span class="token function">union</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span> w <span class="token operator">=</span> <span class="token class-name">JoinWrappers</span><span class="token punctuation">.</span><span class="token function">lambda</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">union</span><span class="token punctuation">(</span><span class="token class-name">AddressDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> union <span class="token operator">-&gt;</span> union</span>
<span class="line">                        <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">union</span><span class="token punctuation">(</span><span class="token class-name">AddressDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> union <span class="token operator">-&gt;</span> union</span>
<span class="line">                        <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">//union all 调用unionAll即可 如下</span></span>
<span class="line">        <span class="token comment">//.unionAll(AddressDO.class, union -&gt; union...);</span></span>
<span class="line">        w<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应log</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="line"><span class="token keyword">SELECT</span> t<span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>pid<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>name<span class="token punctuation">\`</span></span><span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>json<span class="token punctuation">\`</span></span><span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>sex<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>head_img<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>create_time<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>address_id<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>address_id2<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>create_by<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>update_by</span>
<span class="line"><span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">\`</span>user<span class="token punctuation">\`</span></span> t</span>
<span class="line"><span class="token keyword">UNION</span></span>
<span class="line"><span class="token keyword">SELECT</span> t<span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>pid<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>name<span class="token punctuation">\`</span></span><span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>json<span class="token punctuation">\`</span></span><span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>sex<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>head_img<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>create_time<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>address_id<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>address_id2<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>create_by<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>update_by</span>
<span class="line"><span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">\`</span>user<span class="token punctuation">\`</span></span> t</span>
<span class="line"><span class="token keyword">UNION</span></span>
<span class="line"><span class="token keyword">SELECT</span> t<span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>pid<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>name<span class="token punctuation">\`</span></span><span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>json<span class="token punctuation">\`</span></span><span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>sex<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>head_img<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>create_time<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>address_id<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>address_id2<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>create_by<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>update_by</span>
<span class="line"><span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">\`</span>user<span class="token punctuation">\`</span></span> t</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function v(m,b){const s=i("Badge");return c(),p("div",null,[u,n("h2",d,[n("a",k,[n("span",null,[t("union/union all 示例 "),e(s,{type:"tip",text:"1.4.8+",vertical:"top"})])])]),r])}const h=a(o,[["render",v],["__file","union.html.vue"]]),g=JSON.parse('{"path":"/pages/core/logic/union.html","title":"联合查询","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"union/union all 示例","slug":"union-union-all-示例","link":"#union-union-all-示例","children":[]}],"git":{"updatedTime":1724150898000,"contributors":[{"name":"yulichang","email":"570810310@qq.com","commits":2}]},"filePathRelative":"pages/core/logic/union.md"}');export{h as comp,g as data};