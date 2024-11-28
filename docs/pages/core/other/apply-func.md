# applyFunc <Badge type="tip" text="1.4.13+" vertical="top" />

## 函数条件

支持在 where 语句中使用函数  
由 MyBatis-Plus 中的 [apply()方法](https://baomidou.com/guides/wrapper/#apply) 扩展而来

## 示例

```java
List<User> list = JoinWrappers.lambda(User.class)
    .selectAll(User.class)
    .leftJoin(AddressDO.class, AddressDO::getUserId, User::getId)
    .applyFunc("concat(%s,%s,{0}) is not null",
            arg -> arg.accept(User::getId, AddressDO::getUserId),
            "12")
    //自定义别名
    .applyFunc("concat(%s,%s,{0}) is not null",
            arg -> arg.accept(
                    Fun.f("t", User::getId),
                    Fun.f("t1", AddressDO::getUserId)),
            "12")
    .list();
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
FROM `user` t
         LEFT JOIN address t1 ON (t1.user_id = t.id)
WHERE concat(t.id, t1.user_id, ?) is not null
  AND concat(t.id, t1.user_id, ?) is not null
```


