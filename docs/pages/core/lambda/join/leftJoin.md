# leftJoin

## 左连接

单条件(等于 = )示例:

```java
//String
leftJoin("address t1 on t1.user_id = t.id);
//lambda
leftJoin(AddressDO.class, AddressDO::getUserId, UserDO::getId);
```

对应sql
```sql
LEFT JOIN address t1 on t1.user_id = t.id
```

lambda调用参数说明:

第一个参数: 参与连表的实体类class  
第二个参数: 连表的ON字段,这个属性必须是第一个参数实体类的属性  
第三个参数: 参与连表的ON的另一个实体类属性


## 自定义表别名

```java
// LEFT JOIN address addr on addr.user_id = t.id
leftJoin(AddressDO.class, "addr", AddressDO::getUserId, UserDO::getId)
```

指定其他表别名

```java
// LEFT JOIN address addr on addr.user_id = user.id
leftJoin(AddressDO.class, "addr", AddressDO::getUserId, "user", UserDO::getId)
```

比如需要关联同一张表两次及以上时候就需要自定义别名进行区分  
[别名使用案例](/pages/core/other/join-same-table-many)

## 多条件示例

```java
leftJoin(AddressDO.class, on -> on
        .eq(AddressDO::getUserId,UserDO::getId)
        .eq(AddressDO::getId,UserDO::getId))
//自定义别名
leftJoin(AddressDO.class, "addr", on -> on
        .eq(AddressDO::getUserId, UserDO::getId)
        .eq(AddressDO::getId, UserDO::getId)
        .ge(AddressDO::getId, 10))
```

分别对应sql

```sql
LEFT JOIN address t1 ON (t1.user_id = t.id AND t1.id = t.id)

LEFT JOIN address addr ON (addr.user_id = t.id AND addr.id = t.id AND addr.id = ?)
```

多条件字段别名示例

```java
leftJoin(AddressDO.class, "addr", on -> on
        .eq(AddressDO::getUserId, "u1", UserDO::getId)
        .eq(AddressDO::getId, "u2", UserDO::getId)
        .eq("addr1", AddressDO::getId, "u2", UserDO::getId))
```

对应sql

```sql
LEFT JOIN address addr ON (t1.user_id = u1.id AND t1.id = u2.id AND addr1.id = u2.id)
```

## 自定义数据表 <Badge type="tip" text="1.5.2+" />

join一个自定义表

```java
//String
leftJoin("(select * from address addr where addr.id = {0})", 1);
//lambda
JoinWrappers.lambda(UserDO.class)
        .selectAll()
        .leftJoin(AddressDO.class, t -> {
               t.setAlias("tt")
                .selectAll()
                .ge(AddressDO::getId, 0);
               }, AddressDO::getUserId, UserDO::getId)
        .le(AddressDO::getId, 10000)
        .list(UserDTO.class);
wrapper.list();
```

对应sql
```sql
SELECT t.id, t.pid, t.`name`, t.`json`, t.sex, t.head_img, t.del
FROM `user` t LEFT JOIN
       (
            SELECT tt.id, tt.user_id, tt.area_id, tt.tel, tt.address, tt.del
            FROM address tt
            WHERE (tt.id >= ?)
       ) t1 ON (t1.user_id = t.id)
WHERE (t1.id <= ?)
```

多层

```java
JoinWrappers.lambda(UserDO.class)
        .selectAll()
        .leftJoin(AddressDO.class, t -> {
               t.setAlias("tt")
                .selectAll()
                .leftJoin(AreaDO.class, tt -> {
                      tt.selectAll()
                        .ge(AreaDO::getId, -1);
                      }, AreaDO::getId, AddressDO::getAreaId)
                .ge(AddressDO::getId, 0);
                }, AddressDO::getUserId, UserDO::getId)
        .le(AddressDO::getId, 10000)
        .list(UserDTO.class);
wrapper.list();
```

对应sql

```sql
SELECT t.id, t.pid, t.`name`, t.`json`, t.sex, t.head_img, t.del
FROM `user` t LEFT JOIN
       (
            SELECT tt.id, tt.user_id, tt.area_id, tt.tel, tt.address, tt.del
                 FROM address tt LEFT JOIN
                    (
                        SELECT t.id, t.province, t.city, t.area, t.postcode, t.del 
                        FROM area t WHERE (t.id >= ?)
                    ) t1 ON (t1.id = tt.area_id)
            WHERE (tt.id >= ?)
       ) t1 ON (t1.user_id = t.id)
WHERE (t1.id <= ?)
```

<!--@include: ../../../../component/code-warn.md-->
