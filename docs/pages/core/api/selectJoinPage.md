# selectJoinPage 连表分页查询返回所有命中记录(需要启用mybatis-plus分页插件)

## 示例

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    @Test
    void joinTest() {
        MPJLambdaWrapper<UserDO> wrapper = new MPJLambdaWrapper<UserDO>()
                .selectAll(UserDO.class)
                .select(UserAddressDO::getAddress)
                .leftJoin(UserAddressDO.class, UserAddressDO::getUserId, UserDO::getId)
                .eq(UserDO::getId, 1);
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
         LEFT JOIN user_address t1 ON t1.user_id = t.id
WHERE (t.id = ?) LIMIT ?
```