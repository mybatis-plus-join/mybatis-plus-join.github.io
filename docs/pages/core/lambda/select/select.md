---
tags:
  - 'selectFilter'
---

# select

查询指定字段, user的id字段

```java
select(User::getId)
```

自定义字符串查询

```java
select("t.id");
select("t.id as 'pid'");
select("t.id", "t.name");
```

支持可变参数

```java
select(UserDO::getId,User::getSex,User::getName)
```

# 字段过滤 selectFilter <Badge type="tip" text="1.4.4.1+" vertical="top" />

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
.selectFilter(UserDO.class, e -> e.getColumnType() == String.class)
```
