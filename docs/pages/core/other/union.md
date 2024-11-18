# 联合查询

## union/union all 示例 <Badge type="tip" text="1.4.8+" vertical="top" />

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    @Test
    void union() {
        MPJLambdaWrapper<UserDO> w = JoinWrappers.lambda(UserDO.class)
                .selectAll(UserDO.class)
                .union(UserDO.class, union -> union
                        .selectAll(UserDO.class))
                .union(UserDO.class, union -> union
                        .selectAll(UserDO.class));
        //union all 调用unionAll即可 如下
        //.unionAll(UserDO.class, union -> union...);
        w.list();
    }
}

```

对应log

```sql
SELECT t.id,
       t.pid,
       t.`name`,
       t.`json`,
       t.sex,
       t.head_img,
       t.create_time
FROM `user` t
UNION
SELECT t.id,
       t.pid,
       t.`name`,
       t.`json`,
       t.sex,
       t.head_img,
       t.create_time
FROM `user` t
UNION
SELECT t.id,
       t.pid,
       t.`name`,
       t.`json`,
       t.sex,
       t.head_img,
       t.create_time
FROM `user` t
```
