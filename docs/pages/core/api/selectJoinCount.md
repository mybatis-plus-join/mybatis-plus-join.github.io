# 连表查询返回记录总数 selectJoinCount

## 示例

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    @Test
    void joinTest() {
        MPJLambdaWrapper<User> wrapper = new MPJLambdaWrapper<User>()
                .leftJoin(Address.class, Address::getUserId, User::getId)
                .eq(User::getId, 2);
        Integer count = userMapper.selectJoinCount(wrapper);
        System.out.println(count);
    }
}
```

## 对应sql

```sql
SELECT COUNT(*)
FROM user t
         LEFT JOIN address t1 ON (t1.user_id = t.id)
WHERE (t.id = ?)
```

如果要执行count(id),可以调用select()系列的方法,但是只能有一个字段

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    @Test
    void joinTest1() {
        MPJLambdaWrapper<User> wrapper = new MPJLambdaWrapper<User>()
                .select(User::getId)
                .leftJoin(Address.class, Address::getUserId, User::getId)
                .eq(User::getId, 2);
        Integer count = userMapper.selectJoinCount(wrapper);
        System.out.println(count);
    }
}
```

对应sql

```sql
SELECT COUNT(t.id)
FROM user t
         LEFT JOIN address t1 ON (t1.user_id = t.id)
WHERE (t.id = ?)
```