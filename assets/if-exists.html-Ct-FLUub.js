import{_ as e,c as t,a as n,e as l,b as i,d as p,o as c,r as o}from"./app-76Kc9uGz.js";const u={},r={id:"ifexists",tabindex:"-1"},d={class:"header-anchor",href:"#ifexists"};function k(m,s){const a=o("Badge");return c(),t("div",null,[n("h1",r,[n("a",d,[n("span",null,[s[0]||(s[0]=l("IfExists ")),i(a,{type:"tip",text:"1.4.9+",vertical:"top"})])])]),s[1]||(s[1]=p(`<p>xxIfExists会自动判断条件值是否为空，且只会在不为空的情况下生效</p><h2 id="api" tabindex="-1"><a class="header-anchor" href="#api"><span>API</span></a></h2><ul><li>eq -&gt; eqIfExists</li><li>ne -&gt; neIfExists</li><li>gt -&gt; gtIfExists</li><li>ge -&gt; geIfExists</li><li>lt -&gt; ltIfExists</li><li>le -&gt; leIfExists</li><li>like -&gt; likeIfExists</li><li>notLike -&gt; notLikeIfExists</li><li>likeLeft -&gt; likeLeftIfExists</li><li>likeRight -&gt; likeRightIfExists</li><li>notLikeLeft -&gt; notLikeLeftIfExists</li><li>notLikeRight -&gt; notLikeRightIfExists</li></ul><div class="custom-container tip"><p class="custom-container-title">举例:</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">wrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">nonNull</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>  </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>等效于</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line">wrapper<span class="token punctuation">.</span><span class="token function">eqIfExists</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>  </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></div><h1 id="判断策略" tabindex="-1"><a class="header-anchor" href="#判断策略"><span>判断策略</span></a></h1><h2 id="not-empty-默认" tabindex="-1"><a class="header-anchor" href="#not-empty-默认"><span><strong>not_empty</strong> 默认</span></a></h2><p>如果值类型为String则调用 <a href="https://gitee.com/best_handsome/mybatis-plus-join/blob/master/mybatis-plus-join-core/src/main/java/com/github/yulichang/toolkit/MPJStringUtils.java#L111" target="_blank" rel="noopener noreferrer">StringUtils.isNotEmpty</a><br> 其他数据类型调用 Objects.nonNull</p><h2 id="not-null" tabindex="-1"><a class="header-anchor" href="#not-null"><span><strong>not_null</strong></span></a></h2><p>全部调用 Objects.nonNull</p><h2 id="not-blank" tabindex="-1"><a class="header-anchor" href="#not-blank"><span><strong>not_blank</strong></span></a></h2><p>如果值类型为String则调用 <a href="https://gitee.com/best_handsome/mybatis-plus-join/blob/master/mybatis-plus-join-core/src/main/java/com/github/yulichang/toolkit/MPJStringUtils.java#L103" target="_blank" rel="noopener noreferrer">StringUtils.isNotBlank</a><br> 其他数据类型调用 Objects.nonNull</p><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h2><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="line"><span class="token key atrule">mybatis-plus-join</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment">#xxIfExists判断策略 not_null/not_empty/not_blank</span></span>
<span class="line">  <span class="token key atrule">if-exists</span><span class="token punctuation">:</span> not_empty</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自定义Wrapper策略</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token comment">//针对指定wrapper生效</span></span>
<span class="line">wrapper<span class="token punctuation">.</span><span class="token function">setIfExists</span><span class="token punctuation">(</span>val <span class="token operator">-&gt;</span> <span class="token keyword">null</span> <span class="token operator">!=</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">//重载，enums参数用法同下</span></span>
<span class="line">wrapper<span class="token punctuation">.</span><span class="token function">setIfExists</span><span class="token punctuation">(</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> enums<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">null</span> <span class="token operator">!=</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自定义全局策略</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token annotation punctuation">@Configuration</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MybatisPlusConfig</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * 自定义ifExists策略 优先级高于配置文件</span>
<span class="line">     * 只对 xxIfExists生效 比如eqIfExists、neIfExists等</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token annotation punctuation">@Bean</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">MybatisPlusJoinIfExistsConsumer</span> <span class="token function">mybatisPlusJoinIfExistsConsumer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// val是条件值 enums是条件类型</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token punctuation">(</span>val<span class="token punctuation">,</span> enums<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">null</span> <span class="token operator">!=</span> val<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不同条件使用不同策略</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token annotation punctuation">@Configuration</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MybatisPlusConfig</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Bean</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">MybatisPlusJoinIfExistsConsumer</span> <span class="token function">mybatisPlusJoinIfExistsConsumer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">/* val是条件值 enums是条件类型</span>
<span class="line">           以下代码解释 </span>
<span class="line">           eqIfExists 判断条件为 Objects.nonNull</span>
<span class="line">           likeIfExists 判断条件为 NOT_BLANK</span>
<span class="line">           其他 xxIfExists 判断条件为 NOT_NULL</span>
<span class="line">         */</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token punctuation">(</span>val<span class="token punctuation">,</span> enums<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">switch</span> <span class="token punctuation">(</span>enums<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">case</span> <span class="token constant">EQ</span><span class="token operator">:</span></span>
<span class="line">                    <span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">nonNull</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token keyword">case</span> <span class="token constant">LIKE</span><span class="token operator">:</span></span>
<span class="line">                    <span class="token keyword">return</span> <span class="token class-name">IfExistsEnum</span><span class="token punctuation">.</span><span class="token constant">NOT_BLANK</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token keyword">default</span><span class="token operator">:</span></span>
<span class="line">                    <span class="token keyword">return</span> <span class="token class-name">IfExistsEnum</span><span class="token punctuation">.</span><span class="token constant">NOT_NULL</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19))])}const b=e(u,[["render",k],["__file","if-exists.html.vue"]]),g=JSON.parse('{"path":"/pages/core/other/if-exists.html","title":"IfExists","lang":"en-US","frontmatter":{"tags":["eqIfExists","neIfExists","gtIfExists","geIfExists","ltIfExists","leIfExists","likeIfExists","notLikeIfExists","likeLeftIfExists","likeRightIfExists","notLikeLeftIfExists","notLikeRightIfExists","if-absent","not_empty","not_null","not_blank"]},"headers":[{"level":2,"title":"API","slug":"api","link":"#api","children":[]},{"level":2,"title":"not_empty 默认","slug":"not-empty-默认","link":"#not-empty-默认","children":[]},{"level":2,"title":"not_null","slug":"not-null","link":"#not-null","children":[]},{"level":2,"title":"not_blank","slug":"not-blank","link":"#not-blank","children":[]},{"level":2,"title":"配置文件","slug":"配置文件","link":"#配置文件","children":[]}],"git":{"updatedTime":1726959355000,"contributors":[{"name":"yulichang","email":"570810310@qq.com","commits":1}]},"filePathRelative":"pages/core/other/if-exists.md"}');export{b as comp,g as data};
