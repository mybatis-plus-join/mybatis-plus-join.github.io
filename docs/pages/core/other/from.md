# from <Badge type="tip" text="1.5.2+" />

## 自定义from数据表

示例

```java
MPJLambdaWrapper<User> wrapper = JoinWrappers.lambda(User.class)
        .selectAll()
        .from(from -> from
                .selectAll()
                .ge(User::getId, 0)
                .last("LIMIT 10"))
        .ge(User::getId, 0);
wrapper.list();
```

对应sql

```sql
SELECT t.id,
       t.pid,
       t.`name`,
       t.`json`,
       t.sex,
       t.head_img,
       t.create_time
FROM (SELECT t.id,
             t.pid,
             t.`name`,
             t.`json`,
             t.sex,
             t.head_img,
             t.create_time
      FROM `user` t
      WHERE t.id >= ? LIMIT 10) t
WHERE t.id >= ?
```

## 支持自定义别名

```java
MPJLambdaWrapper<User> wrapper = JoinWrappers.lambda(User.class)
        .selectAll()
        .from(from -> from
                .setAlias("tb") // [!code ++]
                .selectAll()
                .ge(User::getId, 0)
                .last("LIMIT 10"))
        .leftJoin(Address.class, Address::getUserId, User::getId)
        .ge(User::getId, 0);
wrapper.list();
```

对应sql

```sql
SELECT t.id,
       t.pid,
       t.`name`,
       t.`json`,
       t.sex,
       t.head_img,
       t.create_time
FROM (SELECT tb.id,
             tb.pid,
             tb.`name`,
             tb.`json`,
             tb.sex,
             tb.head_img,
             tb.create_time
      FROM `user` tb
      WHERE tb.id >= ? LIMIT 10) t
LEFT JOIN address t1 on t1.user_id = t.id
WHERE t.id >= ?

```

<!--@include: ../../../component/code-warn.md-->