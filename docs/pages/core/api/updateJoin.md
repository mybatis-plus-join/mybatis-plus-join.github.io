# 连表更新

## updateJoin <Badge type="tip" text="1.4.5+" vertical="top" />

```java
/**
 * 根据 whereEntity 条件，更新记录
 *
 * @param entity  实体对象 (set 条件值,可以为 null)
 * @param wrapper 实体对象封装操作类（可以为 null,里面的 entity 用于生成 where 语句）
 */
int updateJoin(T entity,MPJBaseJoin<T> wrapper);
```

## wrapper设置set语句和where条件

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    /**
     * 手动set条件
     * 更新 user表name字段和address表address字段
     */
    @Test
    void update() {
        UpdateJoinWrapper<UserDO> update = JoinWrappers.update(UserDO.class)
                .set(UserDO::getName, "aaaaaa")
                .set(AddressDO::getAddress, "bbbbb")
                .leftJoin(AddressDO.class, AddressDO::getUserId, UserDO::getId)
                .eq(UserDO::getId, 1);
        int i = userMapper.updateJoin(null, update);
    }
}
```

对应sql

```sql
UPDATE
    `user` t
    LEFT JOIN address t1
ON (t1.user_id = t.id)
    SET t.`name`=?, t1.address=?
WHERE (t.id = ?)
```

## 根据实体更新, wrapper作为where条件

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    /**
     * 根据实体更新, wrapper作为where条件
     */
    @Test
    void update() {
        //主表实体 用于生成 set 语句
        UserDO user = new UserDO().setName("aaa").setUpdateBy(123);
        UpdateJoinWrapper<UserDO> update = JoinWrappers.update(UserDO.class)
                .leftJoin(AddressDO.class, AddressDO::getUserId, UserDO::getId)
                .eq(UserDO::getId, 1);
        int i = userMapper.updateJoin(user, update);
    }
}
```

对应sql

```sql
UPDATE
    `user` t
    LEFT JOIN address t1
ON (t1.user_id = t.id)
    SET t.`name`=?, t.update_by=?
WHERE (t.id = ?)
```

::: warning 注意事项:
实体类只更新非空字段, 如果要更新全部字段(非空字段和空字段)  
[参考**updateJoinAndNull**方法](./updateJoinAndNull)
:::

## 主表根据实体更新, 副表手动设置set语句

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    /**
     * 根据实体更新, wrapper作为where条件
     */
    @Test
    void update() {
        //主表实体 用于生成 set 语句
        UserDO user = new UserDO().setName("aaa").setUpdateBy(123);
        UpdateJoinWrapper<UserDO> update = JoinWrappers.update(UserDO.class)
                //设置副表 set 语句
                .set(AddressDO::getAddress, "bbbbb")
                .leftJoin(AddressDO.class, AddressDO::getUserId, UserDO::getId)
                .eq(UserDO::getId, 1);
        int i = userMapper.updateJoin(user, update);
    }
}
```

对应sql

```sql
UPDATE
    `user` t
    LEFT JOIN address t1
ON (t1.user_id = t.id)
    SET t.`name`=?, t.update_by=?, t1.address=?
WHERE (t.id = ?)
```

::: warning 注意事项:
实体类只更新非空字段, 如果要更新全部字段(非空字段和空字段)  
[参考**updateJoinAndNull**方法](./updateJoinAndNull)
:::

## 根据主表和副表实体类更新, wrapper作为where条件

这里提两个方法
```java
//更新实体非空字段
.setUpdateEntity(Object... entityList)
//更新实体空字段和非空字段
.setUpdateEntityAndNull(Object... entityList)
```

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    /**
     * 场景: 
     * 三表联查并且按照实体更新这三张表
     * 主表 user 副表 address 和 area
     */
    @Test
    void update() {
        //主表类 用于生成 set 语句
        UserDO user = new UserDO().setName("aaa").setUpdateBy(123);
        //两个关联表 用于生成 set 语句
        AddressDO address = new AddressDO().setTel("119").setAddress("人民广场");
        AreaDO area = new AreaDO().setProvince("北京").setCity("北京!");

        UpdateJoinWrapper<UserDO> update = JoinWrappers.update(UserDO.class)
                //设置两个副表的 set 语句
                .setUpdateEntity(address, area)
                //address和area 两张表空字段和非空字段一起更新 可以改成如下setUpdateEntityAndNull
                //.setUpdateEntityAndNull(address, area)
                .leftJoin(AddressDO.class, AddressDO::getUserId, UserDO::getId)
                .leftJoin(AreaDO.class, AreaDO::getId, AddressDO::getAreaId)
                .eq(UserDO::getId, 1);
        int i = userMapper.updateJoin(user, update);
    }
}
```

对应sql

```sql
UPDATE
    `user` t
    LEFT JOIN address t1
ON (t1.user_id = t.id)
    LEFT JOIN area t2 ON (t2.id = t1.area_id)
    SET t.`name`=?, t.update_by=?, t1.tel=?, t1.address=?, t2.province=?, t2.city=?
WHERE (t.id = ?)
```

::: warning 注意事项:
实体类只更新非空字段, 如果要更新全部字段(非空字段和空字段)  
[参考**updateJoinAndNull**方法](./updateJoinAndNull)
:::