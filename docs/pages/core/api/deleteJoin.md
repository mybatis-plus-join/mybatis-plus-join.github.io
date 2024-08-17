# 连表删除

## deleteJoin API(1.4.5+)

```java
/**
 * 根据 Wrapper 条件，连表删除
 *
 * @param wrapper joinWrapper
 */
int deleteJoin(MPJBaseJoin<T> wrapper);
```

::: warning 注意事项:
连表删除支持MP的逻辑删除  
如果使用了MP的逻辑删除, 调用deleteJoin会执行Update语句
:::

## wrapper连表删除(删除主表)

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    /**
     * wrapper连表删除(删除主表)
     */
    @Test
    void update() {
        DeleteJoinWrapper<UserDO> wrapper = JoinWrappers.delete(UserDO.class)
                .leftJoin(AddressDO.class, AddressDO::getUserId, UserDO::getId)
                .leftJoin(AreaDO.class, AreaDO::getId, AddressDO::getAreaId)
                .eq(UserDO::getId, 1);
        int i = userMapper.deleteJoin(wrapper);
    }
}
```

对应log

```sql
==>  Preparing: DELETE
t FROM `user` t LEFT JOIN address t1 ON (t1.user_id = t.id) LEFT JOIN area t2 ON (t2.id = t1.area_id) WHERE (t.id = ?)
==> Parameters: 1(Integer)
<==    Updates: 1
```

## wrapper连表删除(删除全部表)

```java
class MpJoinTest {
    @Resource
    private UserMapper userMapper;

    /**
     * wrapper连表删除(删除全部表)
     */
    @Test
    void update() {
        DeleteJoinWrapper<UserDO> wrapper = JoinWrappers.delete(UserDO.class)
                //删除全部的表数据 (主表和副表)
                .deleteAll()
                //也可以删除指定的表数据,调用 delete() 传要删除的实体类class 如下
                //.delete(UserDO.class, AddressDO.class, AreaDO.class)
                .leftJoin(AddressDO.class, AddressDO::getUserId, UserDO::getId)
                .leftJoin(AreaDO.class, AreaDO::getId, AddressDO::getAreaId)
                .eq(UserDO::getId, 1);
        int i = userMapper.deleteJoin(wrapper);
    }
}
```

对应sql

```log
==>  Preparing: DELETE t,t1,t2 FROM `user` t LEFT JOIN address t1 ON (t1.user_id = t.id) LEFT JOIN area t2 ON (t2.id = t1.area_id) WHERE (t.id = ?)
==> Parameters: 1(Integer)
<==    Updates: 19
```

::: warning 注意事项:
还是关于MP逻辑删除问题  
MPJ支持都是物理删除或者都是逻辑删除, 不支持既有物理删除也有逻辑删除

比如: 有 tableA 和 tableB 两张表需要连表删除

支持 tableA(物理)、tableB(物理)  
支持 tableA(逻辑)、tableB(逻辑)

不支持 tableA(物理)、tableB(逻辑)  
不支持 tableA(逻辑)、tableB(物理)
:::