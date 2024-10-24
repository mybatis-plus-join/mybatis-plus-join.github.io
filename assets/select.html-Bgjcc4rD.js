import{_ as a,c as n,d as e,o as t}from"./app-76Kc9uGz.js";const l={};function c(p,s){return t(),n("div",null,s[0]||(s[0]=[e(`<h1 id="select" tabindex="-1"><a class="header-anchor" href="#select"><span>select</span></a></h1><p>查询指定字段, 支持可变参数</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&quot;t.id&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&quot;t.id&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;t.name&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&quot;MAX(t.id) as max&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;t.name as nickname&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="selectall" tabindex="-1"><a class="header-anchor" href="#selectall"><span>selectAll</span></a></h1><p>查询指定类的全部字段</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>支持自定义别名(别名要和后续的join部分中定义的别名一致)</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;user&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,8)]))}const o=a(l,[["render",c],["__file","select.html.vue"]]),u=JSON.parse('{"path":"/pages/core/str/select.html","title":"select","lang":"en-US","frontmatter":{},"headers":[],"git":{"updatedTime":1723896089000,"contributors":[{"name":"yulichang","email":"570810310@qq.com","commits":1}]},"filePathRelative":"pages/core/str/select.md"}');export{o as comp,u as data};
