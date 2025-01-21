# 连表查询

支持 `left join` 、 `right join` 、 `inner join` 以及其他自定义连接

## left join

单条件(等于 = )示例:

```java
//String
leftJoin("address t1 on t1.user_id = t.id);
//lambda
leftJoin(Address.class, Address::getUserId, User::getId);
```

对应sql
```sql
LEFT JOIN address t1 on t1.user_id = t.id
```

lambda调用参数说明:

第一个参数: 参与连表的实体类class  
第二个参数: 连表的ON字段,这个属性必须是第一个参数实体类的属性  
第三个参数: 参与连表的ON的另一个实体类属性


### 自定义表别名

```java
// LEFT JOIN address addr on addr.user_id = t.id
leftJoin(Address.class, "addr", Address::getUserId, User::getId)
```

指定其他表别名

```java
// LEFT JOIN address addr on addr.user_id = user.id
leftJoin(Address.class, "addr", Address::getUserId, "user", User::getId)
```

比如需要关联同一张表两次及以上时候就需要自定义别名进行区分  
[别名使用案例](/pages/core/other/join-same-table-many)

### 多条件示例

```java
leftJoin(Address.class, on -> on
        .eq(Address::getUserId,User::getId)
        .eq(Address::getId,User::getId))
//自定义别名
leftJoin(Address.class, "addr", on -> on
        .eq(Address::getUserId, User::getId)
        .eq(Address::getId, User::getId)
        .ge(Address::getId, 10))
```

分别对应sql

```sql
LEFT JOIN address t1 ON (t1.user_id = t.id AND t1.id = t.id)

LEFT JOIN address addr ON (addr.user_id = t.id AND addr.id = t.id AND addr.id = ?)
```

多条件字段别名示例

```java
leftJoin(Address.class, "addr", on -> on
        .eq(Address::getUserId, "u1", User::getId)
        .eq(Address::getId, "u2", User::getId)
        .eq("addr1", Address::getId, "u2", User::getId))
```

对应sql

```sql
LEFT JOIN address addr ON (t1.user_id = u1.id AND t1.id = u2.id AND addr1.id = u2.id)
```

### 自定义数据表 <Badge type="tip" text="1.5.2+" />

join一个自定义表

```java
//String
leftJoin("(select * from address addr where addr.id = {0})", 1);
//lambda
var wrapper = JoinWrappers.lambda(User.class)
        .selectAll()
        .leftJoin(Address.class, t -> {
               t.setAlias("tt")
                .selectAll()
                .ge(Address::getId, 0);
               }, Address::getUserId, User::getId)
        .le(Address::getId, 10000);
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

支持嵌套

```java
var wrapper = JoinWrappers.lambda(User.class)
        .selectAll()
        .leftJoin(Address.class, t -> {
               t.setAlias("tt")
                .selectAll()
                .leftJoin(Area.class, tt -> {
                      tt.selectAll()
                        .ge(Area::getId, -1);
                      }, Area::getId, Address::getAreaId)
                .ge(Address::getId, 0);
                }, Address::getUserId, User::getId)
        .le(Address::getId, 10000);
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

<!--@include: ../../../component/code-warn.md-->

## right join

用法与 `left join` 一致，请参考 [`left join`](./join.html#left-join)

## inner join

用法与 `left join` 一致，请参考 [`left join`](./join.html#left-join)

## 自定义连接

支持传入自定义关键词，以 `full join` 为例

```java
.join("FULL JOIN", Address.class, on -> on
                        .eq(Address::getUserId, User::getId)
                        .eq(Address::getId, User::getId))
```

对应sql

```sql
FULL JOIN address t1 ON (t1.user_id = t.id AND t1.id = t.id)
```
