# 连表查询返回一条记录 selectJoinOne

## MPJLambdaWrapper

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    @Test
    void joinTest() {
        UserDTO dto = userMapper.selectJoinOne(UserDTO.class,
                new MPJLambdaWrapper<>()
                        .selectAll(UserDO.class)
                        .select(UserAddressDO::getAddress)
                        .leftJoin(UserAddressDO.class, UserAddressDO::getUserId,UserDO::getId)
                        .eq(UserDO::getId, 2));
    }
}
```

对应sql

```sql
SELECT 
    t.id,
    t.name,
    t.sex,
    t.head_img,
    t1.address 
FROM 
    user t 
    LEFT JOIN user_address t1 ON t1.user_id = t.id 
WHERE (
    t.id = ?)
```

注意:如果执行sql返回多条记录会如下报错,请自行处理
```java
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.TooManyResultsException: Expected one result (or null) to be returned by selectOne(), but found: 2
```


## MPJQueryWrapper

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    @Test
    void joinTest() {
        UserDTO dto = userMapper.selectJoinOne(UserDTO.class, new MPJQueryWrapper<UserDO>()
                .selectAll(UserDO.class)
                .select("addr.address")
                .leftJoin("user_address addr on addr.user_id = t.id")
                .eq("t.id", 2));
    }
}
```

对应sql

```sql
SELECT 
    t.id,
    t.name,
    t.sex,
    t.head_img,
    addr.address,
FROM 
    user t 
    LEFT JOIN user_address addr on addr.user_id = t.id 
WHERE (
    t.id = ?)
```

