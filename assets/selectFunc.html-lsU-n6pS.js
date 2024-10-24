import{_ as n,c as a,d as p,o as e}from"./app-76Kc9uGz.js";const t={};function c(l,s){return e(),a("div",null,s[0]||(s[0]=[p(`<h1 id="sql函数" tabindex="-1"><a class="header-anchor" href="#sql函数"><span>SQL函数</span></a></h1><h2 id="wrapper内置的常用函数支持" tabindex="-1"><a class="header-anchor" href="#wrapper内置的常用函数支持"><span>Wrapper内置的常用函数支持</span></a></h2><ul><li>selectSum(UserDO::getId)</li><li>selectCount(UserDO::getId)</li><li>selectMax(UserDO::getId)</li><li>selectMin(UserDO::getId)</li><li>selectAvg(UserDO::getId)</li><li>selectLen(UserDO::getId)</li></ul><p>支持自定义别名</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token function">selectSum</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">UserDTO</span><span class="token operator">::</span><span class="token function">getTotal</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>对应sql</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="line"><span class="token function">SUM</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token keyword">AS</span> total</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="自定义聚合函数用法" tabindex="-1"><a class="header-anchor" href="#自定义聚合函数用法"><span>自定义聚合函数用法</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">FuncEnum</span> <span class="token keyword">implements</span> <span class="token class-name">BaseFuncEnum</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">IF_SEX</span><span class="token punctuation">(</span><span class="token string">&quot;IF(%s=1,&#39;男&#39;,&#39;女&#39;)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>                         <span class="token comment">//if 性别转换</span></span>
<span class="line">    <span class="token function">CASE_SEX</span><span class="token punctuation">(</span><span class="token string">&quot;CASE %s WHEN 1 THEN &#39;男&#39; ELSE &#39;女&#39; END&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>   <span class="token comment">//case 性别转换</span></span>
<span class="line">    <span class="token function">LCASE</span><span class="token punctuation">(</span><span class="token string">&quot;LCASE(%s)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> sql<span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">    <span class="token class-name">FuncEnum</span><span class="token punctuation">(</span><span class="token class-name">String</span> sql<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>sql <span class="token operator">=</span> sql<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getSql</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sql<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token keyword">void</span> <span class="token function">funcTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    userMapper<span class="token punctuation">.</span><span class="token function">selectJoinList</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token comment">// 自定义的函数枚举</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">selectFunc</span><span class="token punctuation">(</span><span class="token class-name">FuncEnum</span><span class="token punctuation">.</span><span class="token constant">DATE_FORMAT</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getDel</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token comment">// 也可以用lambda自定义</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">selectFunc</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;IF(%s=1,&#39;男&#39;,&#39;女&#39;)&quot;</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getSex</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token comment">// 支持多个通配符,参数顺序与arg参数顺序保持一致</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">selectFunc</span><span class="token punctuation">(</span><span class="token string">&quot;concat(%s, %s)&quot;</span><span class="token punctuation">,</span> arg <span class="token operator">-&gt;</span> arg<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getSex</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token comment">// 自定义字段别名</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">selectFunc</span><span class="token punctuation">(</span><span class="token string">&quot;concat(%s, %s)&quot;</span><span class="token punctuation">,</span> arg <span class="token operator">-&gt;</span> arg<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span></span>
<span class="line">                     <span class="token class-name">Fun</span><span class="token punctuation">.</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token string">&quot;t&quot;</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//t.name</span></span>
<span class="line">                     <span class="token class-name">Fun</span><span class="token punctuation">.</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token string">&quot;t&quot;</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span>    <span class="token comment">//t.id</span></span>
<span class="line">                <span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getSex</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">UserAddressDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> on <span class="token operator">-&gt;</span> on</span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">UserAddressDO</span><span class="token operator">::</span><span class="token function">getUserId</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">UserAddressDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应sql</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="line"><span class="token keyword">SELECT</span> DATE_FORMAT<span class="token punctuation">(</span>t<span class="token punctuation">.</span>del<span class="token punctuation">,</span> <span class="token string">&#39;%Y-%m-%d&#39;</span><span class="token punctuation">)</span>            <span class="token keyword">AS</span> del<span class="token punctuation">,</span></span>
<span class="line">       <span class="token function">UCASE</span><span class="token punctuation">(</span>t1<span class="token punctuation">.</span>address<span class="token punctuation">)</span>                         <span class="token keyword">AS</span> address<span class="token punctuation">,</span></span>
<span class="line">       <span class="token keyword">CASE</span> t<span class="token punctuation">.</span>sex <span class="token keyword">WHEN</span> <span class="token number">1</span> <span class="token keyword">THEN</span> <span class="token string">&#39;男&#39;</span> <span class="token keyword">ELSE</span> <span class="token string">&#39;女&#39;</span> <span class="token keyword">END</span> <span class="token keyword">AS</span> sex<span class="token punctuation">,</span></span>
<span class="line">       <span class="token keyword">IF</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span>sex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;女&#39;</span><span class="token punctuation">)</span>                 <span class="token keyword">AS</span> sex</span>
<span class="line"><span class="token keyword">FROM</span> <span class="token keyword">user</span> t</span>
<span class="line">         <span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> user_address t1 <span class="token keyword">ON</span> <span class="token punctuation">(</span>t1<span class="token punctuation">.</span>user_id <span class="token operator">=</span> t<span class="token punctuation">.</span>id <span class="token operator">AND</span> t1<span class="token punctuation">.</span>id <span class="token operator">=</span> t<span class="token punctuation">.</span>id<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">WHERE</span> <span class="token punctuation">(</span>t<span class="token punctuation">.</span>id <span class="token operator">=</span> ?<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13)]))}const i=n(t,[["render",c],["__file","selectFunc.html.vue"]]),u=JSON.parse('{"path":"/pages/core/lambda/select/selectFunc.html","title":"SQL函数","lang":"en-US","frontmatter":{"tags":["selectSum","selectCount","selectMax","selectMin","selectAvg","selectLen","selectFunc"]},"headers":[{"level":2,"title":"Wrapper内置的常用函数支持","slug":"wrapper内置的常用函数支持","link":"#wrapper内置的常用函数支持","children":[]},{"level":2,"title":"自定义聚合函数用法","slug":"自定义聚合函数用法","link":"#自定义聚合函数用法","children":[]}],"git":{"updatedTime":1724065005000,"contributors":[{"name":"yulichang","email":"570810310@qq.com","commits":2}]},"filePathRelative":"pages/core/lambda/select/selectFunc.md"}');export{i as comp,u as data};
