# 常见问题

* [nested exception is org.apache.ibatis.builder.BuilderException: Error evaluating expression 'ew.from != null and ew.from != '''. Cause: org.apache.ibatis.ognl.OgnlException](./problem.html#nested-exception-is-org-apache-ibatis-builder-builderexception-error-evaluating-expression-ew-from-null-and-ew-from-cause-org-apache-ibatis-ognl-ognlexception)
* [table not find by class &lt;xxx&gt;](./problem.html#table-not-find-by-class-xxx)
* [Invalid bound statement (not found)](./problem.html#invalid-bound-statement-not-found)
* [1.2.x升级1.4.x](./problem.html#_1-2-x升级1-4-x)

## nested exception is org.apache.ibatis.builder.BuilderException: Error evaluating expression 'ew.from != null and ew.from != '''. Cause: org.apache.ibatis.ognl.OgnlException

问题: 参与连表的实体类没有注册Mapper  
<br />
解决: 添加xxx类对应的Mapper

## table not find by class &lt;xxx&gt;

问题: 参与连表的实体类没有注册Mapper  
<br />
解决: 添加xxx类对应的Mapper

## Invalid bound statement (not found)

存在一下任意一种情况就会出现异常

* [自定义sql注入器](./problem.html#自定义sql注入器)
* [自定义sqlSessionFactory](./problem.html#自定义sqlsessionfactory)

## 自定义sql注入器

自定义sql注入器继承MPJSqlInjector

```java
@component
public class MySqlInjector extends MPJSqlInjector {

    @Override
    public List<AbstractMethod> getMethodList(Class<?> mapperClass, TableInfo tableInfo) {
        List<AbstractMethod> methodList = super.getMethodList(mapperClass, tableInfo);
        //添加你的自定义方法
        methodList.add(new DeleteAll());
        methodList.add(new MyInsertAll());
        methodList.add(new MysqlInsertAllBatch());
        return methodList;
    }
}
```

或者

```java
@Configuration
public class MybatisPlusConfig {

    @Bean
    public ISqlInjector sqlInjector() {
        return new MPJSqlInjector() {
            @Override
            public List<AbstractMethod> getMethodList(Class<?> mapperClass, TableInfo tableInfo) {
                List<AbstractMethod> list = super.getMethodList(mapperClass, tableInfo);
                //添加你的方法
                list.add(new InsertBatchSomeColumn());
                return list;
            }
        };
    }

}
```

## 自定义sqlSessionFactory

如果你没有自定义sqlSessionFactory, 不要添加此配置, 通常情况下stater会自动添加, 不需要配置

```java
@Configuration
public class MybatisPlusConfig {

    /**
     * 关联SqlSessionFactory与GlobalConfig
     * 设置mybatis 拦截器
     */
    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource)  {
        MybatisSqlSessionFactoryBean sessionFactory = new MybatisSqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource);
        // 关联SqlSessionFactory与GlobalConfig
        sessionFactory.setGlobalConfig(new GlobalConfig().setSqlInjector(new MPJSqlInjector()));
        // 添加拦截器 MPJInterceptor需要放在最后面
        // 如果项目没有使用拦截器, 只需要添加MPJ拦截器sessionFactory.setPlugins(new MPJInterceptor());
        sessionFactory.setPlugins(你的拦截器, new MPJInterceptor());
        // 其他配置 略
        return sessionFactory.getObject();
    }
}

```

## 1.2.x升级1.4.x
* Wrapper泛必须是主表(1.2不做限制) new MPJLambdaWrapper<主表>()
* 移除api selectIgnore

以上问题如果原代码有出现, 升级后编辑器会直接报错, 修改对应的报错就行了  

逻辑删除升级, 如果原项目有逻辑删除  
1.3.6以及之前的版本查询只会带上主表的逻辑删除, 副表逻辑删除需要手动添加  
1.3.7以及之后的版本会自动带上副表的逻辑删除  
可以通过全局配置关闭逻辑删除, 保证原代码的正常使用  
[逻辑删除](./core/logic/logic.html)
