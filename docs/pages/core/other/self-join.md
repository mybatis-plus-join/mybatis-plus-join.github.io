# 自连接

以父子关系为例, 查询子User的name到父User的createName中

::: warning 注意
自连接 需要 mybatis-plus-join 版本 <Badge type="tip" text="1.4.0+" vertical="top" />
:::

## MPJLambdaWrapper

MPJLambdaWrapper可以这么写

```java
MPJLambdaWrapper<User> wrapper = new MPJLambdaWrapper<User>()
        .selectAll(User.class)
        .select("u.`name` as createName")
        .leftJoin("`user` u on u.pid = t.id");
List<User> dtos = userMapper.selectJoinList(User.class, wrapper);
```

也可以lambda + String实现

```java
MPJLambdaWrapper<User> wrapper = new MPJLambdaWrapper<User>()
        .selectAll(User.class)
        //这个select 和 后面的两个selectAs等效
        .select("u.`name` as createName")
        .selectAs("u.`name`", User::getCreateName)
        .selectAs("u", User::getName, User::getCreateName)
        //这里容易混淆, on语句两个参数都是User, 第一个为副表条件, 第二个为主表条件, 不要弄混了
        .leftJoin(User.class, "u", User::getPid, User::getId);
List<User> dtos1 = userMapper.selectJoinList(User.class, wrapper);
```

也可以纯lambda实现

```java
MPJLambdaWrapper<User> wrapper = new MPJLambdaWrapper<User>()
        .selectAll(User.class)
        //这里容易混淆, on语句两个参数都是User, 第一个为副表条件, 第二个为主表条件, 不要弄混了
        .leftJoin(User.class, User::getPid, User::getId, ext -> ext
                .selectAs(User::getName, User::getCreateName))
        //查询 t1.`name` AS createTime
        .lt(User::getId, 5);
List<User> dtos = userMapper.selectJoinList(User.class, wrapper);
```
