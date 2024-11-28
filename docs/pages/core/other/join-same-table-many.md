# 关联同一张表多次

以User表关联两次Address为例

::: warning 注意
关联同一张表多次 需要 mybatis-plus-join 版本 <Badge type="tip" text="1.4.0+" vertical="top" />
:::

## MPJLambdaWrapper

```java
MPJQueryWrapper<User> wrapper = new MPJQueryWrapper<User>()
        .selectAll(User.class)
        .select("a.`name` as createName1")
        .select("b.`name` as createName2")
        .leftJoin("address a on a.id = t.address_id1")
        .leftJoin("address b on b.id = t.address_id2");
List<UserDTO> dtos = userMapper.selectJoinList(UserDTO.class, wrapper);
```

也可以lambda + String实现

```java
MPJLambdaWrapper<User> wrapper = new MPJLambdaWrapper<User>()
        .selectAll(User.class)
        .selectAs("a", Address::getName, UserDTO::getCreateName1)
        .selectAs("b", Address::getName, UserDTO::getCreateName2)
        .leftJoin(Address.class, "a", Address::getId, User::getAddressId1)
        .leftJoin(Address.class, "b", Address::getId, User::getAddressId2)
        //指定address表别名
        .leftJoin(Area.class, Area::getId, "a", Address::getAreaId);
List<UserDTO> dtos1 = userMapper.selectJoinList(UserDTO.class, wrapper);
```

条件别名 <Badge type="tip" text="1.4.8+" vertical="top" />

```java
MPJLambdaWrapper<User> wrapper = new MPJLambdaWrapper<User>()
        .selectAll(User.class)
        .selectAs("a", Address::getName, UserDTO::getCreateName1)
        .selectAs("b", Address::getName, UserDTO::getCreateName2)
        .leftJoin(Address.class, "a", Address::getId, User::getAddressId1)
        .leftJoin(Address.class, "b", Address::getId, User::getAddressId2)
        //指定address表别名
        .leftJoin(Area.class, Area::getId, "a", Address::getAreaId)
        .eq("a", Address::getId, 1)
        .eq("b", Address::getId, 1);
List<UserDTO> dtos1 = userMapper.selectJoinList(UserDTO.class, wrapper);
```

也可以纯lambda实现

```java
MPJLambdaWrapper<User> wrapper = new MPJLambdaWrapper<User>()
        .selectAll(User.class)
        .leftJoin(Address.class, Address::getId, User::getAddressId1, ext -> ext
                .selectAs(Address::getName, UserDTO::getAddressId1)
                .like(Address::getName, "abc"))
        .leftJoin(Address.class, Address::getId, User::getAddressId2, ext -> ext
                .selectAs(Address::getName, UserDTO::getAddressId2)
                .like(Address::getName, "abc"))
        .lt(User::getId, 5);
List<UserDTO> dtos = userMapper.selectJoinList(UserDTO.class, wrapper);
```

# 对一或对多查询

使用默认别名

```java
MPJLambdaWrapper<TableT> wrapper = new MPJLambdaWrapper<TableT>()
        .selectAll(TableT.class)
        .selectAssociation("t1", TableA.class, TableDTO::getTable1)
        .selectAssociation("t2", TableA.class, TableDTO::getTable2)
        .leftJoin(TableA.class, TableA::getId, TableT::getAid1)
        .leftJoin(TableA.class, TableA::getId, TableT::getAid2);
```

使用自定义别名

```java
MPJLambdaWrapper<TableT> wrapper = new MPJLambdaWrapper<TableT>()
        .selectAll(TableT.class)
        .selectAssociation("aaaaa", TableA.class, TableDTO::getTable1)
        .selectAssociation("bbbbb", TableA.class, TableDTO::getTable2)
        .leftJoin(TableA.class, "aaaaa", TableA::getId, TableT::getAid1)
        .leftJoin(TableA.class, "bbbbb", TableA::getId, TableT::getAid2);
```

嵌套自定义别名

```java
MPJLambdaWrapper<TableA> wrapper1 = new MPJLambdaWrapper<TableA>()
        .selectAll(TableA.class)
        .selectAssociation(TableB.class, TableADTO::getB, b -> b
                .collection("t2", TableC.class, TableBDTO::getCList))
        .leftJoin(TableB.class, TableB::getAid, TableA::getId)
        .leftJoin(TableC.class, TableC::getBid, TableB::getId);
```

把TableC的字段对一映射到TableBDTO中

```java
MPJLambdaWrapper<TableA> wrapper1 = new MPJLambdaWrapper<TableA>()
        .selectAll(TableA.class)
        .selectAssociation(TableADTO::getB, b -> b
                .all(TableB.class)
                .result(TableC::getId, TableBDTO::getCid))
        .leftJoin(TableB.class, TableB::getAid, TableA::getId)
        .leftJoin(TableC.class, TableC::getBid, TableB::getId);
```
