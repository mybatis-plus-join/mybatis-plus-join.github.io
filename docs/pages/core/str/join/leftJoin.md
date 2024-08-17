# 左连接 leftJoin

示例:

```java
leftJoin("user_address addr on t.id = addr.user_id") 
```

对应sql

```sql
LEFT JOIN user_address addr ON t.id = addr.user_id
```

自定义数据集

```java
leftJoin("(select * from user_address) addr on t.id = addr.user_id")
```

对应sql

```sql
LEFT JOIN (select * from user_address) addr ON t.id = addr.user_id
```
