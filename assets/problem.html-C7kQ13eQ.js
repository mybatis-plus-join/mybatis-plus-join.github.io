import{_ as p,c as l,b as n,a as t,w as e,e as s,d as o,r as c,o as i}from"./app-CNsAH4Lb.js";const u={},r=n("h1",{id:"常见问题",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#常见问题"},[n("span",null,"常见问题")])],-1),d=n("h2",{id:"invalid-bound-statement-not-found",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#invalid-bound-statement-not-found"},[n("span",null,"Invalid bound statement (not found)")])],-1),k=n("p",null,"存在以下任意一种情况就会出现异常",-1),m=o(`<h2 id="自定义sql注入器" tabindex="-1"><a class="header-anchor" href="#自定义sql注入器"><span>自定义sql注入器</span></a></h2><p>自定义sql注入器继承MPJSqlInjector</p><div class="custom-container warning"><p class="custom-container-title">注意事项:</p><p>因为 MPJSqlInjector 已经继承了<a href="https://baomidou.com/guides/sql-injector" target="_blank" rel="noopener noreferrer">com.baomidou.mybatisplus.core.injector.DefaultSqlInjector</a>，如果自定义sql注入器直接继承 DefaultSqlInjector，会导致 MyBatis-Plus-Join 的 MPJSqlInjector 失效，从而引发“Invalid bound statement (not found)”异常。</p><p>因此自定义sql注入器需要<strong>继承 MPJSqlInjector</strong> 而不能继承 DefaultSqlInjector，通过<strong>多层继承</strong>实现自定义sql注入器。</p></div><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token annotation punctuation">@component</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MySqlInjector</span> <span class="token keyword">extends</span> <span class="token class-name">MPJSqlInjector</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AbstractMethod</span><span class="token punctuation">&gt;</span></span> <span class="token function">getMethodList</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> mapperClass<span class="token punctuation">,</span> <span class="token class-name">TableInfo</span> tableInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AbstractMethod</span><span class="token punctuation">&gt;</span></span> methodList <span class="token operator">=</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getMethodList</span><span class="token punctuation">(</span>mapperClass<span class="token punctuation">,</span> tableInfo<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">//添加你的自定义方法</span></span>
<span class="line">        methodList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">DeleteAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        methodList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyInsertAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        methodList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MysqlInsertAllBatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> methodList<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token annotation punctuation">@Configuration</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MybatisPlusConfig</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Bean</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">ISqlInjector</span> <span class="token function">sqlInjector</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MPJSqlInjector</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token annotation punctuation">@Override</span></span>
<span class="line">            <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AbstractMethod</span><span class="token punctuation">&gt;</span></span> <span class="token function">getMethodList</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> mapperClass<span class="token punctuation">,</span> <span class="token class-name">TableInfo</span> tableInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AbstractMethod</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getMethodList</span><span class="token punctuation">(</span>mapperClass<span class="token punctuation">,</span> tableInfo<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token comment">//添加你的方法</span></span>
<span class="line">                list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InsertBatchSomeColumn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token keyword">return</span> list<span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义sqlsessionfactory" tabindex="-1"><a class="header-anchor" href="#自定义sqlsessionfactory"><span>自定义sqlSessionFactory</span></a></h2><p>如果你没有自定义sqlSessionFactory, 不要添加此配置, 通常情况下stater会自动添加, 不需要配置</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token annotation punctuation">@Configuration</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MybatisPlusConfig</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * 关联SqlSessionFactory与GlobalConfig</span>
<span class="line">     * 设置mybatis 拦截器</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token annotation punctuation">@Bean</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">SqlSessionFactory</span> <span class="token function">sqlSessionFactory</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span>  <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">MybatisSqlSessionFactoryBean</span> sessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MybatisSqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        sessionFactory<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">// 关联SqlSessionFactory与GlobalConfig</span></span>
<span class="line">        sessionFactory<span class="token punctuation">.</span><span class="token function">setGlobalConfig</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">GlobalConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setSqlInjector</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MPJSqlInjector</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">// 添加拦截器 MPJInterceptor需要放在最后面</span></span>
<span class="line">        <span class="token comment">// 如果项目没有使用拦截器, 只需要添加MPJ拦截器sessionFactory.setPlugins(new MPJInterceptor());</span></span>
<span class="line">        sessionFactory<span class="token punctuation">.</span><span class="token function">setPlugins</span><span class="token punctuation">(</span>你的拦截器<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">MPJInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">// 其他配置 略</span></span>
<span class="line">        <span class="token keyword">return</span> sessionFactory<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-2-x升级1-4-x" tabindex="-1"><a class="header-anchor" href="#_1-2-x升级1-4-x"><span>1.2.x升级1.4.x</span></a></h2><ul><li>Wrapper泛必须是主表(1.2不做限制) new MPJLambdaWrapper&lt;主表&gt;()</li><li>移除api selectIgnore</li></ul><p>以上问题如果原代码有出现, 升级后编辑器会直接报错, 修改对应的报错就行了</p>`,12),v=n("br",null,null,-1),b=n("br",null,null,-1),h=n("br",null,null,-1),g=n("br",null,null,-1);function f(y,q){const a=c("RouteLink");return i(),l("div",null,[r,n("ul",null,[n("li",null,[t(a,{to:"/pages/problem.html#invalid-bound-statement-not-found"},{default:e(()=>[s("Invalid bound statement (not found)")]),_:1})]),n("li",null,[t(a,{to:"/pages/problem.html#_1-2-x%E5%8D%87%E7%BA%A71-4-x"},{default:e(()=>[s("1.2.x升级1.4.x")]),_:1})])]),d,k,n("ul",null,[n("li",null,[t(a,{to:"/pages/problem.html#%E8%87%AA%E5%AE%9A%E4%B9%89sql%E6%B3%A8%E5%85%A5%E5%99%A8"},{default:e(()=>[s("自定义sql注入器")]),_:1})]),n("li",null,[t(a,{to:"/pages/problem.html#%E8%87%AA%E5%AE%9A%E4%B9%89sqlsessionfactory"},{default:e(()=>[s("自定义sqlSessionFactory")]),_:1})])]),m,n("p",null,[s("逻辑删除升级, 如果原项目有逻辑删除"),v,s(" 1.3.6以及之前的版本查询只会带上主表的逻辑删除, 副表逻辑删除需要手动添加"),b,s(" 1.3.7以及之后的版本会自动带上副表的逻辑删除"),h,s(" 可以通过全局配置关闭逻辑删除, 保证原代码的正常使用"),g,t(a,{to:"/pages/core/logic/logic.html"},{default:e(()=>[s("逻辑删除")]),_:1})])])}const w=p(u,[["render",f],["__file","problem.html.vue"]]),S=JSON.parse('{"path":"/pages/problem.html","title":"常见问题","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Invalid bound statement (not found)","slug":"invalid-bound-statement-not-found","link":"#invalid-bound-statement-not-found","children":[]},{"level":2,"title":"自定义sql注入器","slug":"自定义sql注入器","link":"#自定义sql注入器","children":[]},{"level":2,"title":"自定义sqlSessionFactory","slug":"自定义sqlsessionfactory","link":"#自定义sqlsessionfactory","children":[]},{"level":2,"title":"1.2.x升级1.4.x","slug":"_1-2-x升级1-4-x","link":"#_1-2-x升级1-4-x","children":[]}],"git":{"updatedTime":1724046246000,"contributors":[{"name":"yulichang","email":"570810310@qq.com","commits":3},{"name":"Louis","email":"louis.liu.oneself@hotmail.com","commits":1}]},"filePathRelative":"pages/problem.md"}');export{w as comp,S as data};
