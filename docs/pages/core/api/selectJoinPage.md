# selectJoinPage 连表分页查询返回所有命中记录(需要启用mybatis-plus分页插件)

## MPJLambdaWrapper

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    @Test
    void joinTest() {
        IPage<UserDTO> page = userMapper.selectJoinPage(new Page<>(1, 10), UserDTO.class,
                new MPJLambdaWrapper<>()
                        .selectAll(UserDO.class)
                        .select(UserAddressDO::getAddress)
                        .leftJoin(UserAddressDO.class, UserAddressDO::getUserId, UserDO::getId)
                        .eq(UserDO::getId, 1));
    }
}
```

对应sql

```sql
SELECT t.id,
       t.name,
       t.sex,
       t.head_img,
       t1.address
FROM user t
         LEFT JOIN user_address t1 ON t1.user_id = t.id
WHERE (t.id = ?) LIMIT ?
```

## MPJQueryWrapper

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    @Test
    void joinTest() {
        IPage<UserDTO> page = userMapper.selectJoinPage(new Page<>(1, 10), UserDTO.class,
                new MPJQueryWrapper<UserDO>()
                        .selectAll(UserDO.class)
                        .select("addr.address")
                        .leftJoin("user_address addr on addr.user_id = t.id")
                        .eq("t.id", 1));
    }
}
```

对应sql

```sql
SELECT t.id,
       t.name,
       t.sex,
       t.head_img,
       addr.address
FROM user t
         LEFT JOIN user_address addr on addr.user_id = t.id
WHERE (t.id = ?) LIMIT ?,?
```


