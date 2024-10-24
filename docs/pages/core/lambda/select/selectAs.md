# selectAs

## 别名查询

字段别名

```java
selectAs(User::getName, UserDTO::getNickname);
selectAs("t", User::getName, UserDTO::getNickname);
selectAs(User::getName, "nickname");
selectAs("t.name", UserDTO::getNickname);

select("t.name AS nickname");
```

对应sql

```sql
t.name AS nickname
```
