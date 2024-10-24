# selectCollection

## **一对多查询**

四个重载

- 全部映射，把数据库实体类AddressDO所有属性全部映射到 UserDTO的 addressList列表中
  ```java
  .selectCollection(AddressDO.class, UserDTO::getAddressList)
   ```
- 指定实体字段映射(只映射 id 和 address 两个字段) id、result方法对应mybatis中ResultMap里的 `<id>` 和 `<result>` 标签
    ```java
    .selectCollection(AddressDO.class, UserDTO::getAddressList, map -> map
            //此处只能映射 AddressDO.class 中的字段到 UserDTO::getAddressList 中
            .id(AddressDO::getId)
            .result(AddressDO::getAddress)
            //别名映射
            .result(AddressDO::getAddress, AddressDTO::getAddress));
    ```
- 字段映射，把address表中的id映射到UserDTO的 `List<String>` 属性的addressIds字段中
    ```java
    .selectCollection(AddressDO.class, UserDTO::getAddressIds, map -> map
                        .result(AddressDO::getId))
    ```
- 不指定实体字段映射(只映射 id 和 address 两个字段) id、result方法对应mybatis中ResultMap里的 `<id>` 和 `<result>` 标签 <Badge type="tip" text="1.4.4+" vertical="top" />
    ```java
    .selectCollection(UserDTO::getAddressList, map -> map
            //可以映射不同类的字段 到 UserDTO::getAddressList 中 比如 AddressDO 和 UserDO
            .id(AddressDO::getId)
            .result(UserDO::getName, AddressDTO::getAddress)
            //别名映射
            .result(UserDO::getAddr, AddressDTO::getAddress));
    ```

::: warning 注意事项:
调用selectCollection映射的字段不需要用wrapper进行select  
selectCollection会把映射字段自动加到select语句中
:::

::: danger 注意事项:
关于对多分页查询  
由于嵌套结果方式会导致结果集被折叠，因此分页查询的结果在折叠后总数会减少，所以无法保证分页结果数量正确。
:::

## 示例

```java
class JoinTest {
    @Resource
    private UserMapper userMapper;

    @Test
    void test() {
        //和MyBatis plus一致，MPJLambdaWrapper的泛型必须是主表的泛型，并且要用主表的Mapper来调用
        MPJLambdaWrapper<UserDO> wrapper = new MPJLambdaWrapper<UserDO>()
                .selectAll(UserDO.class)
                //全部映射 不用考虑字段名重复问题(比如 id), 会对重复列自动添加别名
                .selectCollection(AddressDO.class, UserDTO::getAddressList)
                .leftJoin(AddressDO.class, AddressDO::getUserId, UserDO::getId);
        List<UserDTO> dtoList= userMapper.selectJoinList(UserDTO.class, wrapper);
    }

    /**
     * 支持无限嵌套查询
     */
    @Test
    void testJoinCollection() {
        //4层嵌套  a对多b  b对多c  c对多d  d对多e
        MPJLambdaWrapper<TableA> wrapper = new MPJLambdaWrapper<TableA>()
                .selectAll(TableA.class)
                .selectCollection(TableB.class, TableADTO::getBList, b -> b
                        .collection(TableC.class, TableBDTO::getCcList, c -> c
                                .collection(TableD.class, TableCDTO::getDList, d -> d
                                        .collection(TableE.class, TableDDTO::getEList))))
                .leftJoin(TableB.class, TableB::getAid, TableA::getId)
                .leftJoin(TableC.class, TableC::getBid, TableB::getId)
                .leftJoin(TableD.class, TableD::getCid, TableC::getId)
                .leftJoin(TableE.class, TableE::getDid, TableD::getId);

        List<TableADTO> dtos = tableAMapper.selectJoinList(TableADTO.class, wrapper);
        System.out.println(dtos);
    }
    
    /**
     * 字段映射，把address表中的id映射到UserDTO的List<String>属性的addressIds字段中
     */
    @Test
    void testField() {
        MPJLambdaWrapper<UserDO> wrapper = new MPJLambdaWrapper<UserDO>()
                .selectAll(UserDO.class)
                .selectCollection(AddressDO.class, UserDTO::getAddressIds, map -> map
                        .result(AddressDO::getId))
                .leftJoin(AddressDO.class, AddressDO::getUserId, UserDO::getId)
                .le(UserDO::getId, 10000)
                .orderByDesc(UserDO::getId);
        List<UserDTO> list = userMapper.selectJoinList(UserDTO.class, wrapper);
        System.out.println(list);
    }
    
    /**
     * 支持将不同表的字段映射到同一个对象中
     */
    @Test
    void testJoinCollection() {
      MPJLambdaWrapper<TableA> wrapper = new MPJLambdaWrapper<TableA>()
              .selectAll(TableT.class)
              //TableADTO类中的table对象中有 bid和cid 分别用于映射 TableB表的id和TableC表的id
              .selectCollection(TableADTO::getTable, map -> map
                      .result(TableB::getId, Table::getBid)
                      .result(TableC::getid, Table::getCid))
              .leftJoin(TableB.class, TableB::getAid, TableA::getId)
              .leftJoin(TableC.class, TableC::getBid, TableB::getId);
      List<TableDTO> dtos = tableMapper.selectJoinList(TableDTO.class, wrapper);
    }
    
    /**
     * 支持自定义别名查询 用默认别名
     */
    @Test
    void testJoinCollection() {
      //关联同一张表两次并且对一映射
      MPJLambdaWrapper<TableT> wrapper = new MPJLambdaWrapper<TableT>()
              .selectAll(TableT.class)
              .selectAssociation("t1", TableA.class, TableDTO::getTable1)
              .selectAssociation("t2", TableA.class, TableDTO::getTable2)
              .leftJoin(TableA.class, TableA::getId, TableT::getAid1)
              .leftJoin(TableA.class, TableA::getId, TableT::getAid2);
      List<TableDTO> dtos = tableMapper.selectJoinList(TableDTO.class, wrapper);
      System.out.println(1);
    }

    /**
     * 支持自定义别名查询 用自定义别名
     */
    @Test
    void testJoinCollection() {
      //关联同一张表两次并且对一映射
      MPJLambdaWrapper<TableT> wrapper = new MPJLambdaWrapper<TableT>()
              .selectAll(TableT.class)
              .selectAssociation("aaaaa", TableA.class, TableDTO::getTable1)
              .selectAssociation("bbbbb", TableA.class, TableDTO::getTable2)
              .leftJoin(TableA.class, "aaaaa", TableA::getId, TableT::getAid1)
              .leftJoin(TableA.class, "bbbbb", TableA::getId, TableT::getAid2);
      List<TableDTO> dtos = tableMapper.selectJoinList(TableDTO.class, wrapper);
      System.out.println(1);
    }
}
```
