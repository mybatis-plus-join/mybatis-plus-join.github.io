# 连表查询返回所有命中记录 selectJoinList

## 示例

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    @Test
    void joinTest() {
        MPJLambdaWrapper<UserDO> wrapper = new MPJLambdaWrapper<UserDO>()
                .selectAll(UserDO.class)
                .select(UserAddressDO::getTel)
                .leftJoin(UserAddressDO.class, UserAddressDO::getUserId, UserDO::getId)
                .eq(UserDO::getId, 2);
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
         LEFT JOIN user_address t1 ON t1.user_id = t.id
WHERE (t.id = ?)
```