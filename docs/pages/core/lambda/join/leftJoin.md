# 左连接 leftJoin

单条件(等于 = )示例:

```java
.leftJoin(UserAddressDO.class, UserAddressDO::getUserId, UserDO::getId) 
```

对应sql
```sql
LEFT JOIN user_address t1 on t1.user_id = t.id
```

说明:

第一个参数: 参与连表的实体类class  
第二个参数: 连表的ON字段,这个属性必须是第一个参数实体类的属性  
第三个参数: 参与连表的ON的另一个实体类属性


## 自定义表别名

```java
// LEFT JOIN user_address addr on addr.user_id = t.id
.leftJoin(UserAddressDO.class, "addr", UserAddressDO::getUserId, UserDO::getId)
```

指定其他表别名

```java
// LEFT JOIN user_address addr on addr.user_id = user.id
.leftJoin(UserAddressDO.class, "addr", UserAddressDO::getUserId, "user", UserDO::getId)
```

比如需要关联同一张表两次及以上时候就需要自定义别名进行区分  
[别名使用案例](/pages/core/qt/many.html)

## 多条件示例

```java
.leftJoin(UserAddressDO.class, on -> on
        .eq(UserAddressDO::getUserId,UserDO::getId)
        .eq(UserAddressDO::getId,UserDO::getId))
//自定义别名
.leftJoin(UserAddressDO.class, "addr", on -> on
        .eq(UserAddressDO::getUserId, UserDO::getId)
        .eq(UserAddressDO::getId, UserDO::getId)
        .ge(UserAddressDO::getId, 10))
```

对应sql

```sql
LEFT JOIN user_address t1 ON (t1.user_id = t.id AND t1.id = t.id)

LEFT JOIN user_address addr ON (addr.user_id = t.id AND addr.id = t.id)
```

多条件字段别名示例

```java
.leftJoin(UserAddressDO.class, "addr", on -> on
        .eq(UserAddressDO::getUserId, "u1", UserDO::getId)
        .eq(UserAddressDO::getId, "u2", UserDO::getId)
        .eq("addr1", UserAddressDO::getId, "u2", UserDO::getId))
```

对应sql

```sql
LEFT JOIN user_address addr ON (t1.user_id = u1.id AND t1.id = u2.id AND addr1.id = u2.id)
```
