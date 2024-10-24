# 自连接

以父子关系为例, 查询子User的name到父User的createName中

::: warning 注意
自连接 需要 mybatis-plus-join 版本 <Badge type="tip" text="1.4.0+" vertical="top" />
:::

## MPJLambdaWrapper

MPJLambdaWrapper可以这么写

```java
MPJLambdaWrapper<UserDO> wrapper = new MPJLambdaWrapper<UserDO>()
        .selectAll(UserDO.class)
        .select("u.`name` as createName")
        .leftJoin("`user` u on u.pid = t.id");
List<UserDO> dtos = userMapper.selectJoinList(UserDO.class, wrapper);
```

也可以lambda + String实现

```java
MPJLambdaWrapper<UserDO> wrapper = new MPJLambdaWrapper<UserDO>()
        .selectAll(UserDO.class)
        //这个select 和 后面的两个selectAs等效
        .select("u.`name` as createName")
        .selectAs("u.`name`", UserDO::getCreateName)
        .selectAs("u", UserDO::getName, UserDO::getCreateName)
        //这里容易混淆, on语句两个参数都是UserDO, 第一个为副表条件, 第二个为主表条件, 不要弄混了
        .leftJoin(UserDO.class, "u", UserDO::getPid, UserDO::getId);
List<UserDO> dtos1 = userMapper.selectJoinList(UserDO.class, wrapper);
```

也可以纯lambda实现

```java
MPJLambdaWrapper<UserDO> wrapper = new MPJLambdaWrapper<UserDO>()
        .selectAll(UserDO.class)
        //这里容易混淆, on语句两个参数都是UserDO, 第一个为副表条件, 第二个为主表条件, 不要弄混了
        .leftJoin(UserDO.class, UserDO::getPid, UserDO::getId, ext -> ext
                .selectAs(UserDO::getName, UserDO::getCreateName))
        //查询 t1.`name` AS createTime
        .lt(UserDO::getId, 5);
List<UserDO> dtos = userMapper.selectJoinList(UserDO.class, wrapper);
```
