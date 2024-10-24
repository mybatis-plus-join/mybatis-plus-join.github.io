# config

## 配置文件

```yaml
mybatis-plus-join:
  #是否打印 mybatis plus join banner 默认true
  banner: true
  #全局启用副表逻辑删除(默认true) 关闭后关联查询不会加副表逻辑删除
  sub-table-logic: true
  #拦截器MappedStatement缓存(默认true)
  ms-cache: true
  #表别名(默认 t)
  table-alias: t
  #副表逻辑删除条件的位置，支持where、on
  #默认ON （1.4.7.2及之前版本默认为where）
  logic-del-type: on
```

## MybatisPlusJoinPropertiesConsumer <Badge type="tip" text="1.4.9+" vertical="top" />

```java
@Configuration
public class MybatisPlusConfig {
    /**
     * 自定义配置
     * 名称与配置文件一致 优先级高于配置文件（这种方式会覆盖配置文件中的配置）
     */
    @Bean
    public MybatisPlusJoinPropertiesConsumer mybatisPlusJoinPropertiesConsumer() {
        return prop -> prop
                .setBanner(true)
                .setTableAlias("t");
    }
}
```

