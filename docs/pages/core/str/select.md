# select

查询指定字段, 支持可变参数
```java
select("t.id")
select("t.id", "t.name")
select("MAX(t.id) as max", "t.name as nickname")
```

# selectAll

查询指定类的全部字段

```java
selectAll(User.class)
```

支持自定义别名(别名要和后续的join部分中定义的别名一致)

```java
selectAll(User.class, "user")
```
