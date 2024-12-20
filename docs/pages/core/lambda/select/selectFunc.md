# SQL函数

## 内置函数支持

* `selectSum(User::getId)`  -> `SUM(t.id) AS id`
* `selectCount(User::getId)`  -> `COUNT(t.id) AS id`
* `selectMax(User::getId)`  -> `MAX(t.id) AS id`
* `selectMin(User::getId)`  -> `MIN(t.id) AS id`
* `selectAvg(User::getId)`  -> `AVG(t.id) AS id`
* `selectLen(User::getId)`  -> `LEN(t.id) AS id`

支持自定义别名

```java
selectSum(User::getId, UserDTO::getTotal)
```

对应sql

```sql
SUM(t.id) AS total
```

## 自定义聚合函数用法

### 使用函数枚举

::: tip 提示
框架自带的枚举类 [`DefaultFuncEnum.java`](https://github.com/yulichang/mybatis-plus-join/blob/master/mybatis-plus-join-core/src/main/java/com/github/yulichang/wrapper/enums/DefaultFuncEnum.java)
:::

自定义函数枚举类 `FuncEnum` 实现 `BaseFuncEnum`

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

::: warning 通配符说明
底层实现调用的是`String.format(String format, Object... args)`  
会存在 `String.format` 占位符与sql冲突的情况  
比如日期格式化    
错误写法 `DATE_FORMAT(%s, '%Y-%m-%d')`  
存在其他占位符，要用 `%%` 来代替 `%`  
正确写法 `DATE_FORMAT(%s, '%%Y-%%m-%%d')`
:::

示例
```java
.selectFunc(FuncEnum.DATE_FORMAT, User::getCreateTime);
//如果不想定义枚举，可以直接写函数，效果是一样的
.selectFunc(() -> "DATE_FORMAT(%s, '%%Y-%%m-%%d')", User::getCreateTime);
```
对应sql
```sql
DATE_FORMAT(t.create_time, '%Y-%m-%d') AS createTime
```

### 多个字段的函数

示例
```java
.selectFunc("concat(%s, %s)", arg -> arg
        .accept(User::getFirstName, User::getLastName)
        , UserDTO::getFullName)
//支持自定义别名
.selectFunc("concat(%s, %s)", arg -> arg
        .accept(Fun.f("t", User::getFirstName), 
                Fun.f("t", User::getLastName))
        , UserDTO::getFullName)
```
对应sql
```sql
concat(t.first_name, t.last_name) AS fullName
```

### 带参数的函数 <Badge type="tip" text="1.5.2+" />

示例
```java
.selectFunc("if(%s < 18, {0}, {1})", arg -> arg
        .accept(User::getAge).values("未成年", "成年")
        , UserDTO::getStatus)
```
对应sql
```sql
if(t.age < 18, ?, ?) AS status
```

带子查询 
```java
.selectFunc("concat(%s, %s, {0}, {1})", arg -> arg
        .accept(User::getId,
                Fun.f(User.class, u -> u
                    .select(User::getId)
                    .eq(User::getId, User::getId)))
        .values("abc", 123),
        UserDTO::getAddress)
```
对应sql
```sql
concat(t.id, (SELECT st.id FROM `user` st WHERE (st.id = t.id)), ?, ?) AS address
```

## 完整示例
```java
MPJLambdaWrapper<User> wrapper = JoinWrappers.lambda(User.class)
        .selectFunc(() -> "DATE_FORMAT(%s, '%%Y-%%m-%%d')", User::getCreateTime)
        .selectFunc("concat(%s, %s)", arg -> arg
                .accept(User::getFirstName, User::getLastName)
                , UserDTO::getFullName)
        .selectFunc("if(%s < 18, {0}, {1})", arg -> arg
                .accept(User::getAge).values("未成年", "成年")
                , UserDTO::getStatus);

List<UserDTO> userList = wrapper.list(UserDTO.class);
```

对应sql

```sql
select 
    DATE_FORMAT(t.create_time, '%Y-%m-%d') AS createTime,
    concat(t.first_name, t.last_name) AS fullName,
    if(t.age < 18, ?, ?) AS status
from user t
```
<!--@include: ../../../../component/code-warn.md-->
