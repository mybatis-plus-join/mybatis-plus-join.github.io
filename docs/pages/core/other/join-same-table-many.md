# 关联同一张表多次

以User表关联两次Address为例

::: warning 注意
关联同一张表多次 需要 mybatis-plus-join 版本 <Badge type="tip" text="1.4.0+" vertical="top" />
:::

## MPJLambdaWrapper

```java
MPJQueryWrapper<UserDO> wrapper = new MPJQueryWrapper<UserDO>()
        .selectAll(UserDO.class)
        .select("a.`name` as createName1")
        .select("b.`name` as createName2")
        .leftJoin("address a on a.id = t.address_id1")
        .leftJoin("address b on b.id = t.address_id2");
List<UserDTO> dtos = userMapper.selectJoinList(UserDTO.class, wrapper);
```

也可以lambda + String实现

```java
MPJLambdaWrapper<UserDO> wrapper = new MPJLambdaWrapper<UserDO>()
        .selectAll(UserDO.class)
        .selectAs("a", AddressDO::getName, UserDTO::getCreateName1)
        .selectAs("b", AddressDO::getName, UserDTO::getCreateName2)
        .leftJoin(AddressDO.class, "a", AddressDO::getId, UserDO::getAddressId1)
        .leftJoin(AddressDO.class, "b", AddressDO::getId, UserDO::getAddressId2)
        //指定address表别名
        .leftJoin(AreaDO.class, AreaDO::getId, "a", AddressDO::getAreaId);
List<UserDTO> dtos1 = userMapper.selectJoinList(UserDTO.class, wrapper);
```

条件别名 <Badge type="tip" text="1.4.8+" vertical="top" />

```java
MPJLambdaWrapper<UserDO> wrapper = new MPJLambdaWrapper<UserDO>()
        .selectAll(UserDO.class)
        .selectAs("a", AddressDO::getName, UserDTO::getCreateName1)
        .selectAs("b", AddressDO::getName, UserDTO::getCreateName2)
        .leftJoin(AddressDO.class, "a", AddressDO::getId, UserDO::getAddressId1)
        .leftJoin(AddressDO.class, "b", AddressDO::getId, UserDO::getAddressId2)
        //指定address表别名
        .leftJoin(AreaDO.class, AreaDO::getId, "a", AddressDO::getAreaId)
        .eq("a", AddressDO::getId, 1)
        .eq("b", AddressDO::getId, 1);
List<UserDTO> dtos1 = userMapper.selectJoinList(UserDTO.class, wrapper);
```

也可以纯lambda实现

```java
MPJLambdaWrapper<UserDO> wrapper = new MPJLambdaWrapper<UserDO>()
        .selectAll(UserDO.class)
        .leftJoin(AddressDO.class, AddressDO::getId, UserDO::getAddressId1, ext -> ext
                .selectAs(AddressDO::getName, UserDTO::getAddressId1)
                .like(AddressDO::getName, "abc"))
        .leftJoin(AddressDO.class, AddressDO::getId, UserDO::getAddressId2, ext -> ext
                .selectAs(AddressDO::getName, UserDTO::getAddressId2)
                .like(AddressDO::getName, "abc"))
        .lt(UserDO::getId, 5);
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
