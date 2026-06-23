---
tags:
  - 'selectFilter'
---

# select

## select

查询指定字段, user的id字段

```java
select(User::getId)
```

自定义字符串查询

::: warning 注意事项:
与MyBatis-Plus的`QueryWrapper`一致，`MPJLambdaWrapper`字符串列明默认关闭sql注入检查, 建议面向可信输入,如果需要开启检查请使用`wrapper.checkSqlInjection()`
:::

```java
select("t.id");
select("t.id as 'pid'");
select("t.id", "t.name");
```

支持可变参数

```java
select(User::getId,User::getSex,User::getName)
```

## 字段过滤 selectFilter <Badge type="tip" text="1.4.4.1+" vertical="top" />

只要 java 字段名以 "test" 开头的

```java
.selectFilter(User.class, i -> i.getColumProperty().startsWith("test"))
```

只要 数据库 字段名以 "test" 开头的

```java
.selectFilter(User.class, i -> i.getColumn().startsWith("test"))
```

只要 java 字段类型是String的

```java
.selectFilter(User.class, e -> e.getColumnType() == String.class)
```
