import{_ as c,c as o,a as n,e as p,b as t,d as e,o as l,r as u}from"./app-76Kc9uGz.js";const i={},k={class:"custom-container warning"};function r(d,s){const a=u("Badge");return l(),o("div",null,[s[3]||(s[3]=n("h1",{id:"关联同一张表多次",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#关联同一张表多次"},[n("span",null,"关联同一张表多次")])],-1)),s[4]||(s[4]=n("p",null,"以User表关联两次Address为例",-1)),n("div",k,[s[1]||(s[1]=n("p",{class:"custom-container-title"},"注意",-1)),n("p",null,[s[0]||(s[0]=p("关联同一张表多次 需要 mybatis-plus-join 版本 ")),t(a,{type:"tip",text:"1.4.0+",vertical:"top"})])]),s[5]||(s[5]=e(`<h2 id="mpjlambdawrapper" tabindex="-1"><a class="header-anchor" href="#mpjlambdawrapper"><span>MPJLambdaWrapper</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDTO</span><span class="token punctuation">&gt;</span></span> dtos <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">selectJoinList</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">MPJQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&quot;a.\`name\` as createName1&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&quot;b.\`name\` as createName2&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token string">&quot;address a on a.id = t.address_id1&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token string">&quot;address b on b.id = t.address_id2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以lambda + String实现</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDTO</span><span class="token punctuation">&gt;</span></span> dtos1 <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">selectJoinList</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">selectAs</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token class-name">UserDTO</span><span class="token operator">::</span><span class="token function">getCreateName1</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">selectAs</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token class-name">UserDTO</span><span class="token operator">::</span><span class="token function">getCreateName2</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">AddressDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getAddressId1</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">AddressDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getAddressId2</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">//指定address表别名</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">AreaDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">AreaDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getAreaId</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),n("p",null,[s[2]||(s[2]=p("条件别名 ")),t(a,{type:"tip",text:"1.4.8+",vertical:"top"})]),s[6]||(s[6]=e(`<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDTO</span><span class="token punctuation">&gt;</span></span> dtos1 <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">selectJoinList</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">selectAs</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token class-name">UserDTO</span><span class="token operator">::</span><span class="token function">getCreateName1</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">selectAs</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token class-name">UserDTO</span><span class="token operator">::</span><span class="token function">getCreateName2</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">AddressDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getAddressId1</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">AddressDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getAddressId2</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token comment">//指定address表别名</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">AreaDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">AreaDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getAreaId</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以纯lambda实现</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDTO</span><span class="token punctuation">&gt;</span></span> dtos <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">selectJoinList</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDO</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">AddressDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getAddressId1</span><span class="token punctuation">,</span> ext <span class="token operator">-&gt;</span> ext</span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">selectAs</span><span class="token punctuation">(</span><span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token class-name">UserDTO</span><span class="token operator">::</span><span class="token function">getAddressId1</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">like</span><span class="token punctuation">(</span><span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">AddressDO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getAddressId2</span><span class="token punctuation">,</span> ext <span class="token operator">-&gt;</span> ext</span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">selectAs</span><span class="token punctuation">(</span><span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token class-name">UserDTO</span><span class="token operator">::</span><span class="token function">getAddressId2</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">like</span><span class="token punctuation">(</span><span class="token class-name">AddressDO</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">lt</span><span class="token punctuation">(</span><span class="token class-name">UserDO</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="对一或对多查询" tabindex="-1"><a class="header-anchor" href="#对一或对多查询"><span>对一或对多查询</span></a></h1><p>使用默认别名</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TableT</span><span class="token punctuation">&gt;</span></span> wrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TableT</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">TableT</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAssociation</span><span class="token punctuation">(</span><span class="token string">&quot;t1&quot;</span><span class="token punctuation">,</span> <span class="token class-name">TableA</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">TableDTO</span><span class="token operator">::</span><span class="token function">getTable1</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAssociation</span><span class="token punctuation">(</span><span class="token string">&quot;t2&quot;</span><span class="token punctuation">,</span> <span class="token class-name">TableA</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">TableDTO</span><span class="token operator">::</span><span class="token function">getTable2</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">TableA</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">TableA</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">TableT</span><span class="token operator">::</span><span class="token function">getAid1</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">TableA</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">TableA</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">TableT</span><span class="token operator">::</span><span class="token function">getAid2</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用自定义别名</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TableT</span><span class="token punctuation">&gt;</span></span> wrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TableT</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">TableT</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAssociation</span><span class="token punctuation">(</span><span class="token string">&quot;aaaaa&quot;</span><span class="token punctuation">,</span> <span class="token class-name">TableA</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">TableDTO</span><span class="token operator">::</span><span class="token function">getTable1</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAssociation</span><span class="token punctuation">(</span><span class="token string">&quot;bbbbb&quot;</span><span class="token punctuation">,</span> <span class="token class-name">TableA</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">TableDTO</span><span class="token operator">::</span><span class="token function">getTable2</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">TableA</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;aaaaa&quot;</span><span class="token punctuation">,</span> <span class="token class-name">TableA</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">TableT</span><span class="token operator">::</span><span class="token function">getAid1</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">TableA</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;bbbbb&quot;</span><span class="token punctuation">,</span> <span class="token class-name">TableA</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">TableT</span><span class="token operator">::</span><span class="token function">getAid2</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>嵌套自定义别名</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TableA</span><span class="token punctuation">&gt;</span></span> wrapper1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TableA</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">TableA</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAssociation</span><span class="token punctuation">(</span><span class="token class-name">TableB</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">TableADTO</span><span class="token operator">::</span><span class="token function">getB</span><span class="token punctuation">,</span> b <span class="token operator">-&gt;</span> b</span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">&quot;t2&quot;</span><span class="token punctuation">,</span> <span class="token class-name">TableC</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">TableBDTO</span><span class="token operator">::</span><span class="token function">getCList</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">TableB</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">TableB</span><span class="token operator">::</span><span class="token function">getAid</span><span class="token punctuation">,</span> <span class="token class-name">TableA</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">TableC</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">TableC</span><span class="token operator">::</span><span class="token function">getBid</span><span class="token punctuation">,</span> <span class="token class-name">TableB</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把TableC的字段对一映射到TableBDTO中</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TableA</span><span class="token punctuation">&gt;</span></span> wrapper1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MPJLambdaWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TableA</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token class-name">TableA</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">selectAssociation</span><span class="token punctuation">(</span><span class="token class-name">TableADTO</span><span class="token operator">::</span><span class="token function">getB</span><span class="token punctuation">,</span> b <span class="token operator">-&gt;</span> b</span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token class-name">TableB</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">result</span><span class="token punctuation">(</span><span class="token class-name">TableC</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">TableBDTO</span><span class="token operator">::</span><span class="token function">getCid</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">TableB</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">TableB</span><span class="token operator">::</span><span class="token function">getAid</span><span class="token punctuation">,</span> <span class="token class-name">TableA</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">leftJoin</span><span class="token punctuation">(</span><span class="token class-name">TableC</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">TableC</span><span class="token operator">::</span><span class="token function">getBid</span><span class="token punctuation">,</span> <span class="token class-name">TableB</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12))])}const b=c(i,[["render",r],["__file","join-same-table-many.html.vue"]]),v=JSON.parse('{"path":"/pages/core/other/join-same-table-many.html","title":"关联同一张表多次","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"MPJLambdaWrapper","slug":"mpjlambdawrapper","link":"#mpjlambdawrapper","children":[]}],"git":{"updatedTime":1726959355000,"contributors":[{"name":"yulichang","email":"570810310@qq.com","commits":1}]},"filePathRelative":"pages/core/other/join-same-table-many.md"}');export{b as comp,v as data};
