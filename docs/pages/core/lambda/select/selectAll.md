# selectAll

## 查询全部

查询指定类的全部字段

::: warning 注意事项:
一般一次查询只建议调用一次selectAll(),
因为不同表之间可能会存在相同的字段, 比如id,create_time等通用字段, 多次调用会导致字段名重复, 除非能保证字段不重复

通常是对主表使用, 其他表字段通过其他方式查询, 比如select, selectAs, selectAsClass等
:::

```java
wrapper.selectAll(User.class)
```

若Wrapper构造传了class可省略class  
new MPJLambdaWrapper<>(class) 或者 JoinWrappers.lambda(class)

```java
wrapper.selectAll()
```

查询User类的全部字段，除了name，支持可变参数 <Badge type="tip" text="1.4.13+" vertical="top" />

```java
wrapper.selectAll(User.class, User::getName)
```
