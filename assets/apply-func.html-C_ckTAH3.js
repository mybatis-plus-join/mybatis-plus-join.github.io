import{_ as p,c as t,a as s,e,b as c,d as o,o as l,r as i}from"./app-CkK83PdG.js";const u={},r={id:"函数条件-applyfunc",tabindex:"-1"},k={class:"header-anchor",href:"#函数条件-applyfunc"};function d(m,n){const a=i("Badge");return l(),t("div",null,[s("h1",r,[s("a",k,[s("span",null,[n[0]||(n[0]=e("函数条件 applyFunc ")),c(a,{type:"tip",text:"1.4.13+",vertical:"top"})])])]),n[1]||(n[1]=o(`<p>支持在 where 语句中使用函数<br> 由 MyBatis-Plus 中的 <a href="https://baomidou.com/guides/wrapper/#apply" target="_blank" rel="noopener noreferrer">apply()方法</a> 扩展而来</p><p>示例</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token class-name">JoinWrappers</span><span class="token punctuation">.</span><span class="token function">lambda</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">AddressDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getUserId</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">applyFunc</span><span class="token punctuation">(</span><span class="token string">&quot;concat(%s,%s,{0}) is not null&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                arg <span class="token operator">-&gt;</span> arg<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getUserId</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token string">&quot;12&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">//自定义别名</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">applyFunc</span><span class="token punctuation">(</span><span class="token string">&quot;concat(%s,%s,{0}) is not null&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                arg <span class="token operator">-&gt;</span> arg<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span></span>
<span class="line">                        <span class="token class-name">Fun</span><span class="token punctuation">.</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token string">&quot;t&quot;</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">                        <span class="token class-name">Fun</span><span class="token punctuation">.</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token string">&quot;t1&quot;</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getUserId</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token string">&quot;12&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应sql</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="line"><span class="token keyword">SELECT</span> t<span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>pid<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>name<span class="token punctuation">\`</span></span><span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>json<span class="token punctuation">\`</span></span><span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>sex<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>head_img<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>create_time<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>address_id<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>address_id2<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>del<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>create_by<span class="token punctuation">,</span></span>
<span class="line">       t<span class="token punctuation">.</span>update_by</span>
<span class="line"><span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">\`</span>user<span class="token punctuation">\`</span></span> t</span>
<span class="line">         <span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> address t1 <span class="token keyword">ON</span> <span class="token punctuation">(</span>t1<span class="token punctuation">.</span>user_id <span class="token operator">=</span> t<span class="token punctuation">.</span>id<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">WHERE</span> concat<span class="token punctuation">(</span>t<span class="token punctuation">.</span>id<span class="token punctuation">,</span> t1<span class="token punctuation">.</span>user_id<span class="token punctuation">,</span> ?<span class="token punctuation">)</span> <span class="token operator">is</span> <span class="token operator">not</span> <span class="token boolean">null</span></span>
<span class="line">  <span class="token operator">AND</span> concat<span class="token punctuation">(</span>t<span class="token punctuation">.</span>id<span class="token punctuation">,</span> t1<span class="token punctuation">.</span>user_id<span class="token punctuation">,</span> ?<span class="token punctuation">)</span> <span class="token operator">is</span> <span class="token operator">not</span> <span class="token boolean">null</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5))])}const b=p(u,[["render",d],["__file","apply-func.html.vue"]]),g=JSON.parse('{"path":"/pages/core/other/apply-func.html","title":"函数条件 applyFunc","lang":"en-US","frontmatter":{},"headers":[],"git":{"updatedTime":1726959493000,"contributors":[{"name":"yulichang","email":"570810310@qq.com","commits":2}]},"filePathRelative":"pages/core/other/apply-func.md"}');export{b as comp,g as data};