import{_ as n,c as a,d as p,o as e}from"./app-76Kc9uGz.js";const t={};function l(c,s){return e(),a("div",null,s[0]||(s[0]=[p(`<h1 id="连表查询返回记录总数-selectjoincount" tabindex="-1"><a class="header-anchor" href="#连表查询返回记录总数-selectjoincount"><span>连表查询返回记录总数 selectJoinCount</span></a></h1><h2 id="mpjlambdawrapper" tabindex="-1"><a class="header-anchor" href="#mpjlambdawrapper"><span>MPJLambdaWrapper</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">MpJoinTest</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Resource</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">UserMapper</span> userMapper<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Test</span></span>
<span class="line">    <span class="token keyword">void</span> <span class="token function">joinTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Integer</span> count <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">selectJoinCount</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">UserAddressDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">UserAddressDO</span><span class="token operator">::</span><span class="token function">getUserId</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应sql</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="line"><span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">FROM</span> <span class="token keyword">user</span> t</span>
<span class="line">         <span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> user_address t1 <span class="token keyword">ON</span> <span class="token punctuation">(</span>t1<span class="token punctuation">.</span>user_id <span class="token operator">=</span> t<span class="token punctuation">.</span>id<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">WHERE</span> <span class="token punctuation">(</span>t<span class="token punctuation">.</span>id <span class="token operator">=</span> ?<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如果要执行count-id-可以调用select-系列的方法-但是只能有一个字段" tabindex="-1"><a class="header-anchor" href="#如果要执行count-id-可以调用select-系列的方法-但是只能有一个字段"><span>如果要执行count(id),可以调用select()系列的方法,但是只能有一个字段</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">MpJoinTest</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Resource</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">UserMapper</span> userMapper<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Test</span></span>
<span class="line">    <span class="token keyword">void</span> <span class="token function">joinTest1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Integer</span> count <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">selectJoinCount</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">UserAddressDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">UserAddressDO</span><span class="token operator">::</span><span class="token function">getUserId</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应sql</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="line"><span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span>id<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">FROM</span> <span class="token keyword">user</span> t</span>
<span class="line">         <span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> user_address t1 <span class="token keyword">ON</span> <span class="token punctuation">(</span>t1<span class="token punctuation">.</span>user_id <span class="token operator">=</span> t<span class="token punctuation">.</span>id<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">WHERE</span> <span class="token punctuation">(</span>t<span class="token punctuation">.</span>id <span class="token operator">=</span> ?<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mpjquerywrapper" tabindex="-1"><a class="header-anchor" href="#mpjquerywrapper"><span>MPJQueryWrapper</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">MpJoinTest</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Resource</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">UserMapper</span> userMapper<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Test</span></span>
<span class="line">    <span class="token keyword">void</span> <span class="token function">joinTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Integer</span> count <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">selectJoinCount</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MPJQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token string">&quot;user_address addr on addr.user_id = t.id&quot;</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;t.id&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应sql</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="line"><span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">FROM</span> <span class="token keyword">user</span> t</span>
<span class="line">         <span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> user_address addr <span class="token keyword">on</span> addr<span class="token punctuation">.</span>user_id <span class="token operator">=</span> t<span class="token punctuation">.</span>id</span>
<span class="line"><span class="token keyword">WHERE</span> <span class="token punctuation">(</span>t<span class="token punctuation">.</span>id <span class="token operator">=</span> ?<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如果要执行count-id-可以调用select-系列的方法-但是只能有一个字段-1" tabindex="-1"><a class="header-anchor" href="#如果要执行count-id-可以调用select-系列的方法-但是只能有一个字段-1"><span>如果要执行count(id),可以调用select()系列的方法,但是只能有一个字段</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">MpJoinTest</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Resource</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">UserMapper</span> userMapper<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Test</span></span>
<span class="line">    <span class="token keyword">void</span> <span class="token function">joinTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Integer</span> count <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">selectJoinCount</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MPJQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&quot;t.id&quot;</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token string">&quot;user_address addr on addr.user_id = t.id&quot;</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;t.id&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应sql</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="line"><span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span>id<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">FROM</span> <span class="token keyword">user</span> t</span>
<span class="line">         <span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> user_address addr <span class="token keyword">on</span> addr<span class="token punctuation">.</span>user_id <span class="token operator">=</span> t<span class="token punctuation">.</span>id</span>
<span class="line"><span class="token keyword">WHERE</span> <span class="token punctuation">(</span>t<span class="token punctuation">.</span>id <span class="token operator">=</span> ?<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17)]))}const i=n(t,[["render",l],["__file","selectJoinCount.html.vue"]]),u=JSON.parse('{"path":"/pages/core/api/selectJoinCount.html","title":"连表查询返回记录总数 selectJoinCount","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"MPJLambdaWrapper","slug":"mpjlambdawrapper","link":"#mpjlambdawrapper","children":[{"level":3,"title":"如果要执行count(id),可以调用select()系列的方法,但是只能有一个字段","slug":"如果要执行count-id-可以调用select-系列的方法-但是只能有一个字段","link":"#如果要执行count-id-可以调用select-系列的方法-但是只能有一个字段","children":[]}]},{"level":2,"title":"MPJQueryWrapper","slug":"mpjquerywrapper","link":"#mpjquerywrapper","children":[{"level":3,"title":"如果要执行count(id),可以调用select()系列的方法,但是只能有一个字段","slug":"如果要执行count-id-可以调用select-系列的方法-但是只能有一个字段-1","link":"#如果要执行count-id-可以调用select-系列的方法-但是只能有一个字段-1","children":[]}]}],"git":{"updatedTime":1723896089000,"contributors":[{"name":"yulichang","email":"570810310@qq.com","commits":1}]},"filePathRelative":"pages/core/api/selectJoinCount.md"}');export{i as comp,u as data};
