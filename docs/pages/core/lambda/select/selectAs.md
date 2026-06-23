# selectAs

## 别名查询

字段别名

::: warning 注意事项:
与MyBatis-Plus的`QueryWrapper`一致，`MPJLambdaWrapper`字符串列明默认关闭sql注入检查, 建议面向可信输入,如果需要开启检查请使用`wrapper.checkSqlInjection()`
:::

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
