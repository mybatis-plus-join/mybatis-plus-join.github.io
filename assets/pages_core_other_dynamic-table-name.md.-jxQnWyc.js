import{_ as l,c as p,a2 as e,j as i,a,G as n,B as h,o as k}from"./chunks/framework.CuCbyi2k.js";const D=JSON.parse('{"title":"动态表名","description":"","frontmatter":{"tags":["setTableName","@DynamicTableName"]},"headers":[],"relativePath":"pages/core/other/dynamic-table-name.md","filePath":"pages/core/other/dynamic-table-name.md","lastUpdated":1730515804000}'),r={name:"pages/core/other/dynamic-table-name.md"},d={id:"wrapper动态表名支持",tabindex:"-1"},E={id:"配置-dynamictablename",tabindex:"-1"},g={class:"danger custom-block"};function o(y,s,m,b,c,u){const t=h("Badge");return k(),p("div",null,[s[12]||(s[12]=e('<h1 id="动态表名" tabindex="-1">动态表名 <a class="header-anchor" href="#动态表名" aria-label="Permalink to &quot;动态表名&quot;">​</a></h1><h2 id="mybatis-plus-动态表名插件" tabindex="-1"><a href="https://baomidou.com/plugins/dynamic-table-name/" target="_blank" rel="noreferrer">MyBatis-Plus 动态表名插件</a> <a class="header-anchor" href="#mybatis-plus-动态表名插件" aria-label="Permalink to &quot;[MyBatis-Plus 动态表名插件](https://baomidou.com/plugins/dynamic-table-name/)&quot;">​</a></h2>',2)),i("h2",d,[s[0]||(s[0]=a("wrapper动态表名支持 ")),n(t,{type:"tip",text:"1.4.4+",vertical:"top"}),s[1]||(s[1]=a()),s[2]||(s[2]=i("a",{class:"header-anchor",href:"#wrapper动态表名支持","aria-label":'Permalink to "wrapper动态表名支持 <Badge type="tip" text="1.4.4+" vertical="top" />"'},"​",-1))]),s[13]||(s[13]=e('<div class="warning custom-block"><p class="custom-block-title">注意事项:</p><p>wrapper 动态表名版本需要1.4.4+<br> 使用动态表名有sql有注入风险, 使用时需自行把控</p></div><div class="danger custom-block"><p class="custom-block-title">注意事项:</p><p><strong>动态表名不是表别名！</strong> 自定义表别名请参考 <strong><a href="./../lambda/join.html">join</a></strong><br> 动态表名和别名没有任何关系，动态表名不会修改表别名!</p><p>举个例子：user表改成user_2023表</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTableName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;_2023&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>修改前：<br> select ... from user t<br> 修改后：<br> select ... form user_2023 t</p></div>',2)),i("h2",E,[s[3]||(s[3]=a("配置 ")),s[4]||(s[4]=i("s",null,"@DynamicTableName",-1)),s[5]||(s[5]=a()),n(t,{type:"danger",text:"1.5.2-",vertical:"top"}),s[6]||(s[6]=a()),s[7]||(s[7]=i("a",{class:"header-anchor",href:"#配置-dynamictablename","aria-label":'Permalink to "配置 <s>@DynamicTableName</s> <Badge type="danger" text="1.5.2-" vertical="top" />"'},"​",-1))]),i("div",g,[s[8]||(s[8]=i("p",{class:"custom-block-title"},"说明",-1)),n(t,{type:"tip",text:"1.5.2+",vertical:"top"}),s[9]||(s[9]=a(" 及之后版本无需配置")),s[10]||(s[10]=i("br",null,null,-1)),n(t,{type:"danger",text:"1.5.2-",vertical:"top"}),s[11]||(s[11]=a(" 之前版本必须配置 "))]),s[14]||(s[14]=e(`<p>支持主表和副表动态表名<br> 主表需要添加@DynamicTableName注解启用动态表名 副表不需要添加也能实现动态表名</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">DynamicTableName</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> UserDO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>代码</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark has-diff vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">MPJLambdaWrapper&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">UserDO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; wrapper </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MPJLambdaWrapper&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">UserDO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(UserDO</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">getId)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">leftJoin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(AddressDO.class, on </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> on</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">eq</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(AddressDO</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">getUserId, UserDO</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">getId)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 副表动态表名 name 为原副表名 返回新表名</span></span>
<span class="line diff add"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTableName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;aaaaaaaaaa&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">leftJoin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(AreaDO.class, AreaDO</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">getId, AddressDO</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">getAreaId)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">le</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(UserDO</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">getId, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">orderByDesc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(UserDO</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">getId)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 主表动态表名 name 为原主表表名 返回新表名</span></span>
<span class="line diff add"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTableName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;bbbbbbb&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span></span></code></pre></div>`,4))])}const v=l(r,[["render",o]]);export{D as __pageData,v as default};