# 连表查询返回所有命中记录 selectJoinList

## 示例

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    @Test
    void joinTest() {
        MPJLambdaWrapper<User> wrapper = new MPJLambdaWrapper<User>()
                .selectAll(User.class)
                .select(Address::getTel)
                .leftJoin(Address.class, Address::getUserId, User::getId)
                .eq(User::getId, 2);
        List<UserDTO> list = userMapper.selectJoinList(UserDTO.class, wrapper);
    }
}
```

## 对应sql

```sql
SELECT t.id,
       t.name,
       t.sex,
       t.head_img,
       t1.tel
FROM user t
         LEFT JOIN address t1 ON t1.user_id = t.id
WHERE (t.id = ?)
```