---
tags:
  - 'selectAs'
---

# 别名查询

字段别名

```java
selectAs(User::getName, UserDTO::getNickname)
```

对应sql

```sql
t.name AS nickname
```
