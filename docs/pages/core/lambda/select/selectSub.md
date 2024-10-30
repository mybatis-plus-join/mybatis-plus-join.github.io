# selectSub

## 子查询

selectSub <Badge type="tip" text="1.4.5+" vertical="top" />

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    @Test
    void sub() {
        MPJLambdaWrapper<UserDO> wrapper = JoinWrappers.lambda(UserDO.class)
                .selectSub(UserDO.class, w -> w.select(UserDO::getId)
                        .eq(UserDO::getId, UserDO::getId)
                        .last("limit 1"), UserDO::getId)
                .leftJoin(AddressDO.class, AddressDO::getUserId, UserDO::getId)
                .le(UserDO::getId, 100);
        wrapper.list();
    }
}

```

对应log

```sql
SELECT 
    (SELECT st.id FROM `user` st WHERE (st.id = t.id) limit 1 ) AS id
FROM `user` t LEFT JOIN address t1
ON (t1.user_id = t.id)
WHERE t1.del= false AND (t.id <= ?)
```

::: tip 提示:
st 是默认的子查询中的主表别名
:::