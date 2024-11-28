# 连表查询返回一条记录 selectJoinOne

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
                .leftJoin(Address.class, Address::getUserId,User::getId)
                .eq(User::getId, 2);
        UserDTO dto = userMapper.selectJoinOne(UserDTO.class, wrapper);
    }
}
```

## 对应sql

```sql
SELECT 
    t.id,
    t.name,
    t.sex,
    t.head_img,
    t1.address 
FROM 
    user t 
    LEFT JOIN address t1 ON t1.user_id = t.id 
WHERE (
    t.id = ?)
```

注意:如果执行sql返回多条记录会如下报错,请自行处理
```java
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.TooManyResultsException: Expected one result (or null) to be returned by selectOne(), but found: 2
```