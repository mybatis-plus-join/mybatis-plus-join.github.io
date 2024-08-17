---
tags:
  - 'selectAsClass'
---

# 查询两个类的交集字段(根据属性名取交集)

## selectAsClass

查询user表中被UserDTO使用的字段

```java
selectAsClass(User.class, UserDTO.class)
```
