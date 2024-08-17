# 自定义关键词连接 join

## 以 full join 为例

```java
.join("FULL JOIN", UserAddressDO.class, "user_address addr on t.id = addr.user_id")
```

对应sql

```sql
FULL JOIN user_address addr on t.id = addr.user_id
```
