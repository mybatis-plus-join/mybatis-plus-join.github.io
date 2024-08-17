---
tags:
  - 'selectSum'
  - 'selectCount'
  - 'selectMax'
  - 'selectMin'
  - 'selectAvg'
  - 'selectLen'
  - 'selectFunc'
---

# SQL函数


## Wrapper内置的常用函数支持

* selectSum(UserDO::getId)   
* selectCount(UserDO::getId) 
* selectMax(UserDO::getId)   
* selectMin(UserDO::getId)   
* selectAvg(UserDO::getId)   
* selectLen(UserDO::getId)   

支持自定义别名

```java
selectSum(UserDO::getId, UserDTO::getTotal)
```

对应sql

```
SUM(t.id) AS total
```

## 自定义聚合函数用法

```java
public enum FuncEnum implements BaseFuncEnum {
    IF_SEX("IF(%s=1,'男','女')"),                         //if 性别转换
    CASE_SEX("CASE %s WHEN 1 THEN '男' ELSE '女' END"),   //case 性别转换
    LCASE("LCASE(%s)");
    
    private final String sql;
    
    FuncEnum(String sql) {
        this.sql = sql;
    }

    @Override
    public String getSql() {
        return this.sql;
    }
}
```

测试

```java
void funcTest() {
    userMapper.selectJoinList(UserDTO.class, new MPJLambdaWrapper<>()
            // 自定义的函数枚举
            .selectFunc(FuncEnum.DATE_FORMAT, UserDO::getDel)
            // 也可以用lambda自定义
            .selectFunc(() -> "IF(%s=1,'男','女')", UserDO::getSex)
            // 支持多个通配符,参数顺序与arg参数顺序保持一致
            .selectFunc("concat(%s, %s)", arg -> arg.accept(UserDO::getName, UserDO::getId), UserDO::getSex)
            // 自定义字段别名
            .selectFunc("concat(%s, %s)", arg -> arg.accept(
                     Fun.f("t", UserDO::getName), //t.name
                     Fun.f("t", UserDO::getId)    //t.id
                ), UserDO::getSex)
            .leftJoin(UserAddressDO.class, on -> on
                    .eq(UserAddressDO::getUserId, UserDO::getId)
                    .eq(UserAddressDO::getId, UserDO::getId))
            .eq(UserDO::getId, 2));
}
```

对应sql

```sql
SELECT DATE_FORMAT(t.del, '%Y-%m-%d')            AS del,
       UCASE(t1.address)                         AS address,
       CASE t.sex WHEN 1 THEN '男' ELSE '女' END AS sex,
       IF(t.sex = 1, '男', '女')                 AS sex
FROM user t
         LEFT JOIN user_address t1 ON (t1.user_id = t.id AND t1.id = t.id)
WHERE (t.id = ?)
```
