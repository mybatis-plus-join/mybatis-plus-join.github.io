# selectJoinPage 连表分页查询返回所有命中记录(需要启用mybatis-plus分页插件)

## 示例

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    @Test
    void joinTest() {
        MPJLambdaWrapper<User> wrapper = new MPJLambdaWrapper<User>()
                .selectAll(User.class)
                .select(Address::getAddress)
                .leftJoin(Address.class, Address::getUserId, User::getId)
                .eq(User::getId, 1);
        IPage<UserDTO> page = userMapper.selectJoinPage(new Page<>(1, 10), UserDTO.class, wrapper);
    }
}
```

## 对应sql

```sql
SELECT t.id,
       t.name,
       t.sex,
       t.head_img,
       t1.address
FROM user t
         LEFT JOIN address t1 ON t1.user_id = t.id
WHERE (t.id = ?) LIMIT ?
```