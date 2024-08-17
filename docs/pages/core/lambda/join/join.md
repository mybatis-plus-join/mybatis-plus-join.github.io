# 自定义关键词连接 join

## 以 full join 为例

```java
.join("FULL JOIN", UserAddressDO.class, on -> on
                        .eq(UserAddressDO::getUserId, UserDO::getId)
                        .eq(UserAddressDO::getId, UserDO::getId))
```

对应sql

```sql
FULL JOIN user_address t1 ON (t1.user_id = t.id AND t1.id = t.id)
```
