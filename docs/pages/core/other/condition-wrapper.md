# 条件构造器

MyBatis-Plus 提供了一套强大的条件构造器（Wrapper），用于构建复杂的数据库查询条件。Wrapper 类允许开发者以链式调用的方式构造查询条件，无需编写繁琐的 SQL 语句，从而提高开发效率并减少 SQL 注入的风险。

在 MyBatis-Plus 中，Wrapper 类是构建查询和更新条件的核心工具。以下是主要的 Wrapper 类及其功能：

- **AbstractWrapper**：这是一个抽象基类，提供了所有 Wrapper 类共有的方法和属性。它定义了条件构造的基本逻辑，包括字段（column）、值（value）、操作符（condition）等。所有的 QueryWrapper、UpdateWrapper、LambdaQueryWrapper 和 LambdaUpdateWrapper 都继承自 AbstractWrapper。

- **QueryWrapper**：专门用于构造查询条件，支持基本的等于、不等于、大于、小于等各种常见操作。它允许你以链式调用的方式添加多个查询条件，并且可以组合使用 `and` 和 `or` 逻辑。

- **UpdateWrapper**：用于构造更新条件，可以在更新数据时指定条件。与 QueryWrapper 类似，它也支持链式调用和逻辑组合。使用 UpdateWrapper 可以在不创建实体对象的情况下，直接设置更新字段和条件。

- **LambdaQueryWrapper**：这是一个基于 Lambda 表达式的查询条件构造器，它通过 Lambda 表达式来引用实体类的属性，从而避免了硬编码字段名。这种方式提高了代码的可读性和可维护性，尤其是在字段名可能发生变化的情况下。

- **LambdaUpdateWrapper**：类似于 LambdaQueryWrapper，LambdaUpdateWrapper 是基于 Lambda 表达式的更新条件构造器。它允许你使用 Lambda 表达式来指定更新字段和条件，同样避免了硬编码字段名的问题。

## 功能详解

MyBatis-Plus 的 Wrapper 类是构建复杂查询和更新条件的关键工具。它允许开发者以链式调用的方式构造 SQL 的 WHERE 子句，提供了极大的灵活性和便利性。

以下是对 Wrapper 功能的提示和注意事项。

::: note [温馨提示]

**条件判断**：Wrapper 方法通常接受一个 `boolean` 类型的参数，用于决定是否将该条件加入到最终的 SQL 中。例如：

```java
queryWrapper.like(StringUtils.isNotBlank(name), Entity::getName, name)
            .eq(age != null && age >= 0, Entity::getAge, age);
```

**默认行为**：如果某个方法没有显式提供 `boolean` 类型的参数，则默认为 `true`，即条件总是会被加入到 SQL 中。

**泛型参数**：Wrapper 类是泛型类，其中 `Param` 通常指的是 Wrapper 的子类实例，如 QueryWrapper、UpdateWrapper 等。

**字段引用**：在 LambdaWrapper 中，`R` 代表的是一个函数，用于引用实体类的属性，例如 `Entity::getId`。而在普通 Wrapper 中，`R` 代表的是数据库字段名。

**字段名注意事项**：当 `R` 具体类型为 `String` 时，表示的是数据库字段名，而不是实体类数据字段名。如果字段名是数据库关键字，需要使用转义符包裹。

**集合参数**：如果方法的参数是 `Map` 或 `List`，当它们为空时，对应的 SQL 条件不会被加入到最终的 SQL 中。

**学习资源**：对于不熟悉的函数式编程概念，可以参考[学习资源](https://www.jianshu.com/p/613a6118e2e0)进行学习。

:::

::: danger [注意事项]

**RPC 调用中的 Wrapper**：不支持也不赞成在 RPC 调用中传输 Wrapper 对象。Wrapper 对象通常包含大量信息，不适合作为传输对象。正确的做法是定义一个 DTO（数据传输对象）进行传输，然后在被调用方根据 DTO 执行相应的操作。

**维护性**：避免在 Controller 层使用 Map 接收值，这种做法虽然开发时方便，但会给后续的维护带来困难。

**问题反馈**：不接受任何关于 RPC 传输 Wrapper 报错相关的 issue 或 pr。

**安全性**： `QueryWrapper` `UpdateWrapper` 字段部分，如有允许 `前端传入 SQL 片段` 这可能会导致 `SQL 注入风险` 需要校验，更多查看 [预防安全漏洞](https://baomidou.com/reference/about-cve/)。

:::

::: caution [Wrapper 类说明]

QueryWrapper(LambdaQueryWrapper) 和 UpdateWrapper(LambdaUpdateWrapper) 的父类  
用于生成 sql 的 where 条件, entity 属性也用于生成 sql 的 where 条件  
注意：entity 生成的 where 条件与 使用各个 api 生成的 where 条件**没有任何关联行为**

:::

### allEq

`allEq` 方法是 MyBatis-Plus 中用于构建查询条件的方法之一，它允许我们通过一个 `Map` 来设置多个字段的相等条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置所有字段的相等条件，如果字段值为null，则根据null2IsNull参数决定是否设置为IS NULL
allEq(Map<String, Object> params)
allEq(Map<String, Object> params, boolean null2IsNull)
allEq(boolean condition, Map<String, Object> params, boolean null2IsNull)

// 设置所有字段的相等条件，通过filter过滤器决定哪些字段应该被包含，如果字段值为null，则根据null2IsNull参数决定是否设置为IS NULL
allEq(BiPredicate<String, Object> filter, Map<String, Object> params)
allEq(BiPredicate<String, Object> filter, Map<String, Object> params, boolean null2IsNull)
allEq(boolean condition, BiPredicate<String, Object> filter, Map<String, Object> params, boolean null2IsNull)
```

#### 参数说明

- `params`：一个 `Map`，其中 `key` 是数据库字段名，`value` 是对应的字段值。
- `null2IsNull`：如果设置为 `true`，当 `Map` 中的 `value` 为 `null` 时，会调用 `isNull` 方法；如果设置为 `false`，则会忽略 `value` 为 `null` 的键值对。
- `filter`：一个 `BiPredicate`，用于过滤哪些字段应该被包含在查询条件中。
- `condition`：一个布尔值，用于控制是否应用这些条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.allEq(Map.of("id", 1, "name", "老王", "age", null));
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.allEq(Map.of("id", 1, "name", "老王", "age", null));
```

**带过滤器的普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.allEq((field, value) -> field.contains("a"), Map.of("id", 1, "name", "老王", "age", null));
```

**带过滤器的 Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.allEq((field, value) -> field.contains("a"), Map.of("id", 1, "name", "老王", "age", null));
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE id = 1 AND name = '老王' AND age IS NULL

-- 带过滤器的普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE name = '老王' AND age IS NULL
```

### eq

`eq` 方法是 MyBatis-Plus 中用于构建查询条件的基本方法之一，它用于设置单个字段的相等条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的相等条件
eq(R column, Object val)

// 根据条件设置指定字段的相等条件
eq(boolean condition, R column, Object val)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val`：与字段名对应的值。
- `condition`：一个布尔值，用于控制是否应用这个相等条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.eq("name", "老王");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.eq(User::getName, "老王");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE name = '老王'
```

### ne

`ne` 方法是 MyBatis-Plus 中用于构建查询条件的基本方法之一，它用于设置单个字段的不相等条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的不相等条件
ne(R column, Object val)

// 根据条件设置指定字段的不相等条件
ne(boolean condition, R column, Object val)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val`：与字段名对应的值。
- `condition`：一个布尔值，用于控制是否应用这个不相等条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.ne("name", "老王");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.ne(User::getName, "老王");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE name <> '老王'
```

### gt

`gt` 方法是 MyBatis-Plus 中用于构建查询条件的基本方法之一，它用于设置单个字段的大于条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的大于条件
gt(R column, Object val)

// 根据条件设置指定字段的大于条件
gt(boolean condition, R column, Object val)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val`：与字段名对应的值。
- `condition`：一个布尔值，用于控制是否应用这个大于条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.gt("age", 18);
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.gt(User::getAge, 18);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE age > 18
```

::: note [注意事项]

- `gt` 方法适用于数值型字段，对于字符串等非数值型字段，使用 `gt` 可能会导致不期望的结果或错误。
- 在使用 `gt` 方法时，确保 `val` 参数的类型与字段类型相匹配，以避免类型转换错误。
- 如果需要根据某些条件动态添加大于条件，可以使用带有 `condition` 参数的重载方法。

:::

### ge

`ge` 方法是 MyBatis-Plus 中用于构建查询条件的基本方法之一，它用于设置单个字段的大于等于条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的大于等于条件
ge(R column, Object val)

// 根据条件设置指定字段的大于等于条件
ge(boolean condition, R column, Object val)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val`：与字段名对应的值。
- `condition`：一个布尔值，用于控制是否应用这个大于等于条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.ge("age", 18);
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.ge(User::getAge, 18);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE age >= 18
```

::: note [注意事项]

- `ge` 方法适用于数值型字段，对于字符串等非数值型字段，使用 `ge` 可能会导致不期望的结果或错误。
- 在使用 `ge` 方法时，确保 `val` 参数的类型与字段类型相匹配，以避免类型转换错误。
- 如果需要根据某些条件动态添加大于等于条件，可以使用带有 `condition` 参数的重载方法。

:::

### lt

`lt` 方法是 MyBatis-Plus 中用于构建查询条件的基本方法之一，它用于设置单个字段的小于条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的小于条件
lt(R column, Object val)

// 根据条件设置指定字段的小于条件
lt(boolean condition, R column, Object val)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val`：与字段名对应的值。
- `condition`：一个布尔值，用于控制是否应用这个小于是条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.lt("age", 18);
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.lt(User::getAge, 18);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE age < 18
```

::: note [注意事项]

- `lt` 方法适用于数值型字段，对于字符串等非数值型字段，使用 `lt` 可能会导致不期望的结果或错误。
- 在使用 `lt` 方法时，确保 `val` 参数的类型与字段类型相匹配，以避免类型转换错误。
- 如果需要根据某些条件动态添加小于条件，可以使用带有 `condition` 参数的重载方法。

:::

### le

`le` 方法是 MyBatis-Plus 中用于构建查询条件的基本方法之一，它用于设置单个字段的小于等于条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的小于等于条件
le(R column, Object val)

// 根据条件设置指定字段的小于等于条件
le(boolean condition, R column, Object val)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val`：与字段名对应的值。
- `condition`：一个布尔值，用于控制是否应用这个小于是条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.le("age", 18);
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.le(User::getAge, 18);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE age <= 18
```

::: note [注意事项]

- `le` 方法适用于数值型字段，对于字符串等非数值型字段，使用 `le` 可能会导致不期望的结果或错误。
- 在使用 `le` 方法时，确保 `val` 参数的类型与字段类型相匹配，以避免类型转换错误。
- 如果需要根据某些条件动态添加小于等于条件，可以使用带有 `condition` 参数的重载方法。

:::

### between

`between` 方法是 MyBatis-Plus 中用于构建查询条件的基本方法之一，它用于设置单个字段的 BETWEEN 条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的 BETWEEN 条件
between(R column, Object val1, Object val2)

// 根据条件设置指定字段的 BETWEEN 条件
between(boolean condition, R column, Object val1, Object val2)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val1`：与字段名对应的第一个值，表示 BETWEEN 条件的起始值。
- `val2`：与字段名对应的第二个值，表示 BETWEEN 条件的结束值。
- `condition`：一个布尔值，用于控制是否应用这个 BETWEEN 条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.between("age", 18, 30);
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.between(User::getAge, 18, 30);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE age BETWEEN 18 AND 30
```

::: note [注意事项]

- `between` 方法适用于数值型字段，对于字符串等非数值型字段，使用 `between` 可能会导致不期望的结果或错误。
- 在使用 `between` 方法时，确保 `val1` 和 `val2` 参数的类型与字段类型相匹配，以避免类型转换错误。
- 如果需要根据某些条件动态添加 BETWEEN 条件，可以使用带有 `condition` 参数的重载方法。

:::

### notBetween

`notBetween` 方法是 MyBatis-Plus 中用于构建查询条件的另一个基本方法，它用于设置单个字段的 NOT BETWEEN 条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的 NOT BETWEEN 条件
notBetween(R column, Object val1, Object val2)

// 根据条件设置指定字段的 NOT BETWEEN 条件
notBetween(boolean condition, R column, Object val1, Object val2)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val1`：与字段名对应的第一个值，表示 NOT BETWEEN 条件的起始值。
- `val2`：与字段名对应的第二个值，表示 NOT BETWEEN 条件的结束值。
- `condition`：一个布尔值，用于控制是否应用这个 NOT BETWEEN 条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.notBetween("age", 18, 30);
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.notBetween(User::getAge, 18, 30);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE age NOT BETWEEN 18 AND 30
```

::: note [注意事项]

- `notBetween` 方法同样适用于数值型字段，对于字符串等非数值型字段，使用 `notBetween` 可能会导致不期望的结果或错误。
- 在使用 `notBetween` 方法时，确保 `val1` 和 `val2` 参数的类型与字段类型相匹配，以避免类型转换错误。
- 如果需要根据某些条件动态添加 NOT BETWEEN 条件，可以使用带有 `condition` 参数的重载方法。

:::

### like

`like` 方法是 MyBatis-Plus 中用于构建模糊查询条件的基本方法之一，它用于设置单个字段的 LIKE 条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的 LIKE 条件
like(R column, Object val)

// 根据条件设置指定字段的 LIKE 条件
like(boolean condition, R column, Object val)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val`：与字段名对应的值，表示 LIKE 条件中的搜索值。
- `condition`：一个布尔值，用于控制是否应用这个 LIKE 条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.like("name", "王");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.like(User::getName, "王");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE name LIKE '%王%'
```

::: note [注意事项]

- `like` 方法适用于字符串类型的字段，用于模糊匹配。
- 默认情况下，`like` 方法会在搜索值前后添加 `%`，实现全模糊匹配。如果需要左模糊或右模糊匹配，可以使用 `likeRight` 或 `likeLeft` 方法。
- 在使用 `like` 方法时，确保 `val` 参数的类型是字符串，以避免类型转换错误。
- 如果需要根据某些条件动态添加 LIKE 条件，可以使用带有 `condition` 参数的重载方法。

:::

### notLike

`notLike` 方法是 MyBatis-Plus 中用于构建模糊查询条件的另一个基本方法，它用于设置单个字段的 NOT LIKE 条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的 NOT LIKE 条件
notLike(R column, Object val)

// 根据条件设置指定字段的 NOT LIKE 条件
notLike(boolean condition, R column, Object val)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val`：与字段名对应的值，表示 NOT LIKE 条件中的搜索值。
- `condition`：一个布尔值，用于控制是否应用这个 NOT LIKE 条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.notLike("name", "王");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.notLike(User::getName, "王");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE name NOT LIKE '%王%'
```

::: note [注意事项]

- `notLike` 方法适用于字符串类型的字段，用于排除特定的模糊匹配。
- 默认情况下，`notLike` 方法会在搜索值前后添加 `%`，实现全模糊排除。如果需要排除左模糊或排除右模糊匹配，可以使用 `notLikeRight` 或 `notLikeLeft` 方法。
- 在使用 `notLike` 方法时，确保 `val` 参数的类型是字符串，以避免类型转换错误。
- 如果需要根据某些条件动态添加 NOT LIKE 条件，可以使用带有 `condition` 参数的重载方法。

:::

### likeLeft

`likeLeft` 方法是 MyBatis-Plus 中用于构建模糊查询条件的基本方法之一，它用于设置单个字段的右模糊匹配条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的右模糊匹配条件
likeLeft(R column, Object val)

// 根据条件设置指定字段的右模糊匹配条件
likeLeft(boolean condition, R column, Object val)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val`：与字段名对应的值，表示右模糊匹配条件中的搜索值。
- `condition`：一个布尔值，用于控制是否应用这个右模糊匹配条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.likeLeft("name", "王");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.likeLeft(User::getName, "王");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE name LIKE '%王'
```

::: note [注意事项]

- `likeLeft` 方法适用于字符串类型的字段，用于右模糊匹配，即匹配以指定字符串开头的记录。
- 默认情况下，`likeLeft` 方法会在搜索值前添加 `%`，实现右模糊匹配。如果需要全模糊或左模糊匹配，可以使用 `like` 或 `likeRight` 方法。
- 在使用 `likeLeft` 方法时，确保 `val` 参数的类型是字符串，以避免类型转换错误。
- 如果需要根据某些条件动态添加右模糊匹配条件，可以使用带有 `condition` 参数的重载方法。

:::

通过上述优化，`likeLeft` 方法的文档更加清晰地展示了其用法、参数说明、示例以及注意事项，使得开发者能够更容易理解和正确使用该方法。

### likeRight

`likeRight` 方法是 MyBatis-Plus 中用于构建模糊查询条件的基本方法之一，它用于设置单个字段的左模糊匹配条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的左模糊匹配条件
likeRight(R column, Object val)

// 根据条件设置指定字段的左模糊匹配条件
likeRight(boolean condition, R column, Object val)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val`：与字段名对应的值，表示左模糊匹配条件中的搜索值。
- `condition`：一个布尔值，用于控制是否应用这个左模糊匹配条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.likeRight("name", "王");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.likeRight(User::getName, "王");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE name LIKE '王%'
```

::: note [注意事项]

- `likeRight` 方法适用于字符串类型的字段，用于左模糊匹配，即匹配以指定字符串结尾的记录。
- 默认情况下，`likeRight` 方法会在搜索值后添加 `%`，实现左模糊匹配。如果需要全模糊或右模糊匹配，可以使用 `like` 或 `likeLeft` 方法。
- 在使用 `likeRight` 方法时，确保 `val` 参数的类型是字符串，以避免类型转换错误。
- 如果需要根据某些条件动态添加左模糊匹配条件，可以使用带有 `condition` 参数的重载方法。

:::

### notLikeLeft

`notLikeLeft` 方法是 MyBatis-Plus 中用于构建模糊查询条件的另一个基本方法，它用于设置单个字段的非右模糊匹配条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的非右模糊匹配条件
notLikeLeft(R column, Object val)

// 根据条件设置指定字段的非右模糊匹配条件
notLikeLeft(boolean condition, R column, Object val)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val`：与字段名对应的值，表示非右模糊匹配条件中的搜索值。
- `condition`：一个布尔值，用于控制是否应用这个非右模糊匹配条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.notLikeLeft("name", "王");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.notLikeLeft(User::getName, "王");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE name NOT LIKE '%王'
```

::: note [注意事项]

- `notLikeLeft` 方法适用于字符串类型的字段，用于排除以指定字符串开头的记录。
- 默认情况下，`notLikeLeft` 方法会在搜索值前添加 `%`，实现非右模糊匹配。如果需要排除全模糊或左模糊匹配，可以使用 `notLike` 或 `notLikeRight` 方法。
- 在使用 `notLikeLeft` 方法时，确保 `val` 参数的类型是字符串，以避免类型转换错误。
- 如果需要根据某些条件动态添加非右模糊匹配条件，可以使用带有 `condition` 参数的重载方法。

:::

### notLikeRight

`notLikeRight` 方法是 MyBatis-Plus 中用于构建模糊查询条件的另一个基本方法，它用于设置单个字段的非左模糊匹配条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的非左模糊匹配条件
notLikeRight(R column, Object val)

// 根据条件设置指定字段的非左模糊匹配条件
notLikeRight(boolean condition, R column, Object val)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `val`：与字段名对应的值，表示非左模糊匹配条件中的搜索值。
- `condition`：一个布尔值，用于控制是否应用这个非左模糊匹配条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.notLikeRight("name", "王");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.notLikeRight(User::getName, "王");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE name NOT LIKE '王%'
```

::: note [注意事项]

- `notLikeRight` 方法适用于字符串类型的字段，用于排除以指定字符串结尾的记录。
- 默认情况下，`notLikeRight` 方法会在搜索值后添加 `%`，实现非左模糊匹配。如果需要排除全模糊或右模糊匹配，可以使用 `notLike` 或 `notLikeLeft` 方法。
- 在使用 `notLikeRight` 方法时，确保 `val` 参数的类型是字符串，以避免类型转换错误。
- 如果需要根据某些条件动态添加非左模糊匹配条件，可以使用带有 `condition` 参数的重载方法。

:::

通过上述优化，`notLikeRight` 方法的文档更加清晰地展示了其用法、参数说明、示例以及注意事项，使得开发者能够更容易理解和正确使用该方法。

### isNull

`isNull` 方法是 MyBatis-Plus 中用于构建查询条件的基本方法之一，它用于设置单个字段的 IS NULL 条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的 IS NULL 条件
isNull(R column)

// 根据条件设置指定字段的 IS NULL 条件
isNull(boolean condition, R column)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `condition`：一个布尔值，用于控制是否应用这个 IS NULL 条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.isNull("name");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.isNull(User::getName);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE name IS NULL
```

::: note [注意事项]

- `isNull` 方法适用于所有类型的字段，用于查询字段值为 NULL 的记录。
- 在使用 `isNull` 方法时，确保 `column` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- 如果需要根据某些条件动态添加 IS NULL 条件，可以使用带有 `condition` 参数的重载方法。

:::

### in

`in` 方法是 MyBatis-Plus 中用于构建查询条件的基本方法之一，它用于设置单个字段的 IN 条件，即字段的值在给定的集合中。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的 IN 条件，使用集合、
in(R column, Collection<?> value)
in(boolean condition, R column, Collection<?> value)

// 设置指定字段的 IN 条件，使用可变参数
in(R column, Object... values)
in(boolean condition, R column, Object... values)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `value`：一个集合，包含 IN 条件中字段可能的值。
- `values`：一个可变参数列表，包含 IN 条件中字段可能的值。
- `condition`：一个布尔值，用于控制是否应用这个 IN 条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.in("age", Arrays.asList(1, 2, 3));
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.in(User::getAge, Arrays.asList(1, 2, 3));
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE age IN (1, 2, 3)
```

::: note [注意事项]

- `in` 方法适用于所有类型的字段，用于查询字段值在给定集合中的记录。
- 在使用 `in` 方法时，确保 `column` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- 如果需要根据某些条件动态添加 IN 条件，可以使用带有 `condition` 参数的重载方法。

:::

### notIn

`notIn` 方法是 MyBatis-Plus 中用于构建查询条件的基本方法之一，它用于设置单个字段的 NOT IN 条件，即字段的值不在给定的集合中。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的 NOT IN 条件，使用集合
notIn(R column, Collection<?> value)
notIn(boolean condition, R column, Collection<?> value)

// 设置指定字段的 NOT IN 条件，使用可变参数
notIn(R column, Object... values)
notIn(boolean condition, R column, Object... values)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `value`：一个集合，包含 NOT IN 条件中字段可能的值。
- `values`：一个可变参数列表，包含 NOT IN 条件中字段可能的值。
- `condition`：一个布尔值，用于控制是否应用这个 NOT IN 条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.notIn("age", Arrays.asList(1, 2, 3));
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.notIn(User::getAge, Arrays.asList(1, 2, 3));
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE age NOT IN (1, 2, 3)
```

::: note [注意事项]

- `notIn` 方法适用于所有类型的字段，用于查询字段值不在给定集合中的记录。
- 在使用 `notIn` 方法时，确保 `column` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- 如果需要根据某些条件动态添加 NOT IN 条件，可以使用带有 `condition` 参数的重载方法。

:::

### inSql

`inSql` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它用于设置单个字段的 IN 条件，但与 `in` 方法不同的是，`inSql` 允许你直接使用 SQL 语句来生成 IN 子句中的值集合。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的 IN 条件，使用 SQL 语句
inSql(R column, String sqlValue)
inSql(boolean condition, R column, String sqlValue)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `sqlValue`：一个字符串，包含用于生成 IN 子句中值集合的 SQL 语句。
- `condition`：一个布尔值，用于控制是否应用这个 IN 条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.inSql("age", "1,2,3,4,5,6");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.inSql(User::getAge, "1,2,3,4,5,6");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE age IN (1, 2, 3, 4, 5, 6)
```

**使用子查询的示例**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.inSql("id", "select id from other_table where id < 3");
```

**生成的 SQL**

```sql
SELECT * FROM user WHERE id IN (select id from other_table where id < 3)
```

::: note [注意事项]

- `inSql` 方法允许你使用 SQL 语句来生成 IN 子句中的值集合，这为复杂的查询条件提供了灵活性。
- 在使用 `inSql` 方法时，确保 `column` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- `sqlValue` 参数应该是一个有效的 SQL 语句，它将直接嵌入到生成的 SQL 中，因此需要确保其安全性和正确性，应避免 SQL 由前端动态参数传入并直接引用。
- 如果需要根据某些条件动态添加 IN 条件，可以使用带有 `condition` 参数的重载方法。

:::

### notInSql

`notInSql` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它用于设置单个字段的 NOT IN 条件，但与 `notIn` 方法不同的是，`notInSql` 允许你直接使用 SQL 语句来生成 NOT IN 子句中的值集合。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置指定字段的 NOT IN 条件，使用 SQL 语句
notInSql(R column, String sqlValue)
notInSql(boolean condition, R column, String sqlValue)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `sqlValue`：一个字符串，包含用于生成 NOT IN 子句中值集合的 SQL 语句。
- `condition`：一个布尔值，用于控制是否应用这个 NOT IN 条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.notInSql("age", "1,2,3,4,5,6");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.notInSql(User::getAge, "1,2,3,4,5,6");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE age NOT IN (1, 2, 3, 4, 5, 6)
```

**使用子查询的示例**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.notInSql("id", "select id from other_table where id < 3");
```

**生成的 SQL**

```sql
SELECT * FROM user WHERE id NOT IN (select id from other_table where id < 3)
```

::: note [注意事项]

- `notInSql` 方法允许你使用 SQL 语句来生成 NOT IN 子句中的值集合，这为复杂的查询条件提供了灵活性。
- 在使用 `notInSql` 方法时，确保 `column` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- `sqlValue` 参数应该是一个有效的 SQL 语句，它将直接嵌入到生成的 SQL 中，因此需要确保其安全性和正确性，应避免 SQL 由前端动态参数传入并直接引用。
- 如果需要根据某些条件动态添加 NOT IN 条件，可以使用带有 `condition` 参数的重载方法。

:::

### eqSql <Badge text="Since 3.5.6" type="error"/>

`eqSql` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，允许你设置一个字段等于（EQ）某个 SQL 语句的结果。这个方法特别适用于需要将字段值与子查询结果进行比较的场景。

#### 方法签名

```java
// 设置指定字段等于 SQL 语句的结果
eqSql(R column, String inValue)

// 在条件满足时设置指定字段等于 SQL 语句的结果
eqSql(boolean condition, R column, String inValue)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `inValue`：一个字符串，包含用于生成等于条件的 SQL 语句。
- `condition`：一个布尔值，用于控制是否应用这个等于条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.eqSql("id", "select MAX(id) from table");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.eqSql(User::getId, "select MAX(id) from table");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE id = (select MAX(id) from table)
```

::: note [注意事项]

- `eqSql` 方法允许你将字段值与 SQL 语句的结果进行比较，这为复杂的查询条件提供了灵活性。
- 在使用 `eqSql` 方法时，确保 `column` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- `inValue` 参数应该是一个有效的 SQL 语句，它将直接嵌入到生成的 SQL 中，因此需要确保其安全性和正确性，应避免 SQL 由前端动态参数传入并直接引用。
- 如果需要根据某些条件动态添加等于条件，可以使用带有 `condition` 参数的重载方法。

:::

### gtSql <Badge text="Since 3.4.3.2" type="error"/>

`gtSql` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，允许你设置一个字段大于（GT）某个 SQL 语句的结果。

#### 方法签名

```java
// 设置指定字段大于 SQL 语句的结果
gtSql(R column, String inValue)

// 在条件满足时设置指定字段大于 SQL 语句的结果
gtSql(boolean condition, R column, String inValue)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `inValue`：一个字符串，包含用于生成大于条件的 SQL 语句。
- `condition`：一个布尔值，用于控制是否应用这个大于条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.gtSql("id", "select id from table where name = 'xx'");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.gtSql(User::getId, "select id from table where name = 'xx'");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE id > (select id from table where name = 'xx')
```

::: note [注意事项]

- `gtSql` 方法允许你将字段值与 SQL 语句的结果进行比较，这为复杂的查询条件提供了灵活性。
- 在使用 `gtSql` 方法时，确保 `column` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- `inValue` 参数应该是一个有效的 SQL 语句，它将直接嵌入到生成的 SQL 中，因此需要确保其安全性和正确性，应避免 SQL 由前端动态参数传入并直接引用。
- 如果需要根据某些条件动态添加大于条件，可以使用带有 `condition` 参数的重载方法。

:::

### geSql <Badge text="Since 3.4.3.2" type="error"/>

`geSql` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，允许你设置一个字段大于等于（GE）某个 SQL 语句的结果。

#### 方法签名

```java
// 设置指定字段大于等于 SQL 语句的结果
geSql(R column, String inValue)

// 在条件满足时设置指定字段大于等于 SQL 语句的结果
geSql(boolean condition, R column, String inValue)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `inValue`：一个字符串，包含用于生成大于等于条件的 SQL 语句。
- `condition`：一个布尔值，用于控制是否应用这个大于等于条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.geSql("id", "select id from table where name = 'xx'");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.geSql(User::getId, "select id from table where name = 'xx'");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE id >= (select id from table where name = 'xx')
```

::: note [注意事项]

- `geSql` 方法允许你将字段值与 SQL 语句的结果进行比较，这为复杂的查询条件提供了灵活性。
- 在使用 `geSql` 方法时，确保 `column` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- `inValue` 参数应该是一个有效的 SQL 语句，它将直接嵌入到生成的 SQL 中，因此需要确保其安全性和正确性，应避免 SQL 由前端动态参数传入并直接引用。
- 如果需要根据某些条件动态添加大于等于条件，可以使用带有 `condition` 参数的重载方法。

:::

### ltSql <Badge text="Since 3.4.3.2" type="error"/>

`ltSql` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，允许你设置一个字段小于（LT）某个 SQL 语句的结果。

#### 方法签名

```java
// 设置指定字段小于 SQL 语句的结果
ltSql(R column, String inValue)

// 在条件满足时设置指定字段小于 SQL 语句的结果
ltSql(boolean condition, R column, String inValue)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `inValue`：一个字符串，包含用于生成小于条件的 SQL 语句。
- `condition`：一个布尔值，用于控制是否应用这个小于条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.ltSql("id", "select id from table where name = 'xx'");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.ltSql(User::getId, "select id from table where name = 'xx'");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE id < (select id from table where name = 'xx')
```

::: note [注意事项]

- `ltSql` 方法允许你将字段值与 SQL 语句的结果进行比较，这为复杂的查询条件提供了灵活性。
- 在使用 `ltSql` 方法时，确保 `column` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- `inValue` 参数应该是一个有效的 SQL 语句，它将直接嵌入到生成的 SQL 中，因此需要确保其安全性和正确性，应避免 SQL 由前端动态入并直接引用。
- 如果需要根据某些条件动态添加小于条件，可以使用带有 `condition` 参数的重载方法。

:::

### leSql <Badge text="Since 3.4.3.2" type="error"/>

`leSql` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，允许你设置一个字段小于等于（LE）某个 SQL 语句的结果。

#### 方法签名

```java
// 设置指定字段小于等于 SQL 语句的结果
leSql(R column, String inValue)

// 在条件满足时设置指定字段小于等于 SQL 语句的结果
leSql(boolean condition, R column, String inValue)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `inValue`：一个字符串，包含用于生成小于等于条件的 SQL 语句。
- `condition`：一个布尔值，用于控制是否应用这个小于等于条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.leSql("id", "select id from table where name = 'xx'");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.leSql(User::getId, "select id from table where name = 'xx'");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE id <= (select id from table where name = 'xx')
```

::: note [注意事项]

- `leSql` 方法允许你将字段值与 SQL 语句的结果进行比较，这为复杂的查询条件提供了灵活性。
- 在使用 `leSql` 方法时，确保 `column` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- `inValue` 参数应该是一个有效的 SQL 语句，它将直接嵌入到生成的 SQL 中，因此需要确保其安全性和正确性，应避免 SQL 由前端动态参数传入并直接引用。
- 如果需要根据某些条件动态添加小于等于条件，可以使用带有 `condition` 参数的重载方法。

:::

### groupBy

`groupBy` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它用于设置查询结果的分组条件。通过指定一个或多个字段，`groupBy` 方法可以生成 SQL 语句中的 GROUP BY 子句。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置分组条件，使用字段名
groupBy(R... columns)
groupBy(boolean condition, R... columns)
```

#### 参数说明

- `columns`：一个可变参数列表，包含用于分组的字段名。
- `condition`：一个布尔值，用于控制是否应用这个分组条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.groupBy("id", "name");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.groupBy(User::getId, User::getName);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user GROUP BY id, name
```

::: note [注意事项]

- `groupBy` 方法适用于需要对查询结果进行分组的场景。
- 在使用 `groupBy` 方法时，确保 `columns` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- 如果需要根据某些条件动态添加分组条件，可以使用带有 `condition` 参数的重载方法。

:::

### orderByAsc

`orderByAsc` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它用于设置查询结果的升序排序条件。通过指定一个或多个字段，`orderByAsc` 方法可以生成 SQL 语句中的 ORDER BY 子句，并指定升序排序。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置升序排序条件，使用字段名
orderByAsc(R... columns)
orderByAsc(boolean condition, R... columns)
```

#### 参数说明

- `columns`：一个可变参数列表，包含用于排序的字段名。
- `condition`：一个布尔值，用于控制是否应用这个排序条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.orderByAsc("id", "name");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.orderByAsc(User::getId, User::getName);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user ORDER BY id ASC, name ASC
```

::: note [注意事项]

- `orderByAsc` 方法适用于需要对查询结果进行升序排序的场景。
- 在使用 `orderByAsc` 方法时，确保 `columns` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- 如果需要根据某些条件动态添加排序条件，可以使用带有 `condition` 参数的重载方法。

:::

### orderByDesc

`orderByDesc` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它用于设置查询结果的降序排序条件。通过指定一个或多个字段，`orderByDesc` 方法可以生成 SQL 语句中的 ORDER BY 子句，并指定降序排序。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置降序排序条件，使用字段名
orderByDesc(R... columns)
orderByDesc(boolean condition, R... columns)
```

#### 参数说明

- `columns`：一个可变参数列表，包含用于排序的字段名。
- `condition`：一个布尔值，用于控制是否应用这个排序条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.orderByDesc("id", "name");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.orderByDesc(User::getId, User::getName);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user ORDER BY id DESC, name DESC
```

::: note [注意事项]

- `orderByDesc` 方法适用于需要对查询结果进行降序排序的场景。
- 在使用 `orderByDesc` 方法时，确保 `columns` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- 如果需要根据某些条件动态添加排序条件，可以使用带有 `condition` 参数的重载方法。

:::

### orderBy

`orderBy` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它用于设置查询结果的排序条件。通过指定一个或多个字段以及排序方向（升序或降序），`orderBy` 方法可以生成 SQL 语句中的 ORDER BY 子句。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置排序条件，使用字段名和排序方向
orderBy(boolean condition, boolean isAsc, R... columns)
```

#### 参数说明

- `condition`：一个布尔值，用于控制是否应用这个排序条件。
- `isAsc`：一个布尔值，表示排序方向。`true` 表示升序（ASC），`false` 表示降序（DESC）。
- `columns`：一个可变参数列表，包含用于排序的字段名。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.orderBy(true, true, "id", "name");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.orderBy(true, true, User::getId, User::getName);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user ORDER BY id ASC, name ASC
```

::: note [注意事项]

- `orderBy` 方法提供了更灵活的排序设置，允许开发者指定排序方向。
- 在使用 `orderBy` 方法时，确保 `columns` 参数正确指向了数据库中的字段名或使用 `Lambda` 表达式的字段名。
- 如果需要根据某些条件动态添加排序条件，可以使用带有 `condition` 参数的重载方法。
- 排序可以应用于查询结果的展示，也可以用于优化查询性能，例如通过排序来减少需要扫描的数据量。

:::

### having

`having` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它用于设置 HAVING 子句，通常与 GROUP BY 一起使用，用于对分组后的数据进行条件筛选。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置 HAVING 子句，使用 SQL 语句和参数
having(String sqlHaving, Object... params)
having(boolean condition, String sqlHaving, Object... params)
```

#### 参数说明

- `sqlHaving`：一个字符串，包含用于生成 HAVING 子句的 SQL 语句。
- `params`：一个可变参数列表，包含 SQL 语句中占位符的替换值。
- `condition`：一个布尔值，用于控制是否应用这个 HAVING 条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.groupBy("age").having("sum(age) > 10");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.groupBy(User::getAge).having("sum(age) > {0}", 10);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user GROUP BY age HAVING sum(age) > 10
```

::: note [注意事项]

- `having` 方法通常与 `groupBy` 方法一起使用，用于对分组后的数据进行进一步的筛选。
- 在使用 `having` 方法时，确保 `sqlHaving` 参数是一个有效的 SQL 语句，它将直接嵌入到生成的 SQL 中，因此需要确保其安全性和正确性，应避免 SQL 由前端动态参数传入并直接引用。
- `params` 参数用于替换 `sqlHaving` 中的占位符，确保提供的参数类型和数量与占位符匹配。
- 如果需要根据某些条件动态添加 HAVING 条件，可以使用带有 `condition` 参数的重载方法。

:::

### func

`func` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它提供了一种在链式调用中根据条件执行不同查询操作的机制。通过传入一个 `Consumer` 函数式接口，`func` 方法允许你在不中断链式调用的情况下，根据条件执行不同的查询构建逻辑。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 根据条件执行不同的查询构建逻辑
func(Consumer<Children> consumer)
func(boolean condition, Consumer<Children> consumer)
```

#### 参数说明

- `consumer`：一个 `Consumer` 函数式接口，它接受一个 `Children` 类型的参数，并可以调用 `Children` 对象上的方法来构建查询条件。
- `condition`：一个布尔值，用于控制是否应用这个 `Consumer` 逻辑。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.func(i -> {
    if (true) {
        i.eq("id", 1);
    } else {
        i.ne("id", 1);
    }
});
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.func(i -> {
    if (true) {
        i.eq(User::getId, 1);
    } else {
        i.ne(User::getId, 1);
    }
});
```

**生成的 SQL**

```sql
-- 根据条件生成的 SQL 会有所不同
-- 如果条件为 true，则生成的 SQL 为：
SELECT * FROM user WHERE id = 1

-- 如果条件为 false，则生成的 SQL 为：
SELECT * FROM user WHERE id != 1
```

::: note [注意事项]

- `func` 方法提供了一种灵活的方式来根据条件动态构建查询条件，而不需要中断链式调用。
- 在使用 `func` 方法时，确保 `Consumer` 函数式接口中的逻辑正确构建了所需的查询条件。
- `condition` 参数用于控制是否应用 `Consumer` 逻辑，这允许你根据某些条件动态添加查询条件。
- 由于 `func` 方法允许执行复杂的逻辑，因此在使用时需要特别注意代码的可读性和维护性。

:::

### or

`or` 方法是 MyBatis-Plus 中用于构建查询条件的基本方法之一，它用于在查询条件中添加 OR 逻辑。通过调用 `or` 方法，可以改变后续查询条件的连接方式，从默认的 AND 连接变为 OR 连接。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 改变后续查询条件的连接方式为 OR
or()
or(boolean condition)

// 添加 OR 嵌套条件
or(Consumer<Param> consumer)
or(boolean condition, Consumer<Param> consumer)
```

#### 参数说明

- `condition`：一个布尔值，用于控制是否应用这个 OR 逻辑。
- `consumer`：一个 `Consumer` 函数式接口，它接受一个 `Param` 类型的参数，并可以调用 `Param` 对象上的方法来构建 OR 嵌套条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.eq("id", 1).or().eq("name", "老王");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.eq(User::getId, 1).or().eq(User::getName, "老王");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE id = 1 OR name = '老王'
```

**OR 嵌套示例**：

```java
// 普通 Wrapper
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.or(i -> i.and(j -> j.eq("name", "李白").eq("status", "alive"))
                         .or(j -> j.eq("name", "杜甫").eq("status", "alive")));

// Lambda Wrapper
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.or(i -> i.and(j -> j.eq(User::getName, "李白").eq(User::getStatus, "alive"))
                              .or(j -> j.eq(User::getName, "杜甫").eq(User::getStatus, "alive")));
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE (name = '李白' AND status = 'alive') OR (name = '杜甫' AND status = 'alive')
```

::: note [注意事项]

- 主动调用 `or` 方法表示紧接着下一个查询条件方法不是用 `and` 连接，而是用 `or` 连接。
- 如果不调用 `or` 方法，则默认使用 `and` 连接查询条件。
- `or` 方法可以嵌套使用，通过传入 `Consumer` 函数式接口来构建复杂的 OR 嵌套条件。
- 在使用 `or` 方法时，确保 `condition` 参数正确控制了 OR 逻辑的应用。
- `or` 方法的嵌套使用可以构建复杂的查询逻辑，但需要注意代码的可读性和维护性。

:::

### and

`and` 方法是 MyBatis-Plus 中用于构建查询条件的基本方法之一，它用于在查询条件中添加 AND 逻辑。通过调用 `and` 方法，可以创建 AND 嵌套条件，即在一个 AND 逻辑块中包含多个查询条件。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 添加 AND 嵌套条件
and(Consumer<Param> consumer)
and(boolean condition, Consumer<Param> consumer)
```

#### 参数说明

- `consumer`：一个 `Consumer` 函数式接口，它接受一个 `Param` 类型的参数，并可以调用 `Param` 对象上的方法来构建 AND 嵌套条件。
- `condition`：一个布尔值，用于控制是否应用这个 AND 嵌套逻辑。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.and(i -> i.and(j -> j.eq("name", "李白").eq("status", "alive"))
                         .and(j -> j.eq("name", "杜甫").eq("status", "alive")));
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.and(i -> i.and(j -> j.eq(User::getName, "李白").eq(User::getStatus, "alive"))
                              .and(j -> j.eq(User::getName, "杜甫").eq(User::getStatus, "alive")));
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE ((name = '李白' AND status = 'alive') AND (name = '杜甫' AND status = 'alive'))
```

::: note [注意事项]

- `and` 方法的嵌套使用可以构建复杂的查询逻辑，其中 AND 条件可以包含多个查询条件。
- 在使用 `and` 方法的嵌套功能时，确保 `Consumer` 函数式接口中的逻辑正确构建了所需的查询条件。
- `condition` 参数用于控制是否应用 `Consumer` 逻辑，这允许你根据某些条件动态添加查询条件。
- 由于 `and` 方法的嵌套使用可以执行复杂的逻辑，因此在使用时需要特别注意代码的可读性和维护性。

:::

### nested

`nested` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它用于创建一个独立的查询条件块，不带默认的 AND 或 OR 逻辑。通过调用 `nested` 方法，可以在查询条件中添加一个嵌套的子句，该子句可以包含多个查询条件，并且可以被外部查询条件通过 AND 或 OR 连接。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 添加一个独立的查询条件块
nested(Consumer<Param> consumer)
nested(boolean condition, Consumer<Param> consumer)
```

#### 参数说明

- `consumer`：一个 `Consumer` 函数式接口，它接受一个 `Param` 类型的参数，并可以调用 `Param` 对象上的方法来构建嵌套的查询条件。
- `condition`：一个布尔值，用于控制是否应用这个嵌套逻辑。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.nested(i -> i.eq("name", "李白").ne("status", "活着"));
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.nested(i -> i.eq(User::getName, "李白").ne(User::getStatus, "活着"));
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE (name = '李白' AND status <> '活着')
```

::: note [注意事项]

- `nested` 方法创建的查询条件块是一个独立的子句，可以被外部查询条件通过 AND 或 OR 连接。
- 在使用 `nested` 方法时，确保 `Consumer` 函数式接口中的逻辑正确构建了所需的查询条件。
- `condition` 参数用于控制是否应用 `Consumer` 逻辑，这允许你根据某些条件动态添加查询条件。
- 由于 `nested` 方法可以执行复杂的逻辑，因此在使用时需要特别注意代码的可读性和维护性。

:::

### apply

`apply` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它允许你直接拼接 SQL 片段到查询条件中。这个方法特别适用于需要使用数据库函数或其他复杂 SQL 构造的场景。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 拼接 SQL 片段
apply(String applySql, Object... params)
apply(boolean condition, String applySql, Object... params)
```

#### 参数说明

- `applySql`：一个字符串，包含要拼接的 SQL 片段。
- `params`：一个可变参数列表，包含 SQL 片段中占位符的替换值。
- `condition`：一个布尔值，用于控制是否应用这个 SQL 片段。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.apply("id = 1");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.apply("date_format(dateColumn, '%Y-%m-%d') = '2008-08-08'");
```

**使用参数占位符的示例**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.apply("date_format(dateColumn, '%Y-%m-%d') = {0}", "2008-08-08");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 生成的 SQL
SELECT * FROM user WHERE id = 1

-- Lambda Wrapper 生成的 SQL
SELECT * FROM user WHERE date_format(dateColumn, '%Y-%m-%d') = '2008-08-08'

-- 使用参数占位符生成的 SQL
SELECT * FROM user WHERE date_format(dateColumn, '%Y-%m-%d') = '2008-08-08'
```

:::warning[注意事项]

- `apply` 方法可用于拼接包含数据库函数的 SQL 片段。
- 动态入参的 `params` 对应 `applySql` 内部的 `{index}` 部分，这样是不会有 SQL 注入风险的。如果直接将参数拼接到 SQL 中，则会有 SQL 注入风险，故应避免 SQL 由前端动态参数传入并直接引用。
- 在使用 `apply` 方法时，确保 `applySql` 参数是一个有效的 SQL 片段，并且 `params` 参数正确地替换了占位符。
- `condition` 参数用于控制是否应用这个 SQL 片段，这允许你根据某些条件动态添加查询条件。

:::

### last

`last` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它允许你直接在查询的最后添加一个 SQL 片段，而不受 MyBatis-Plus 的查询优化规则影响。这个方法应该谨慎使用，因为它可能会绕过 MyBatis-Plus 的查询优化。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 在查询的最后添加一个 SQL 片段
last(String lastSql)
last(boolean condition, String lastSql)
```

#### 参数说明

- `lastSql`：一个字符串，包含要添加到查询最后的 SQL 片段。
- `condition`：一个布尔值，用于控制是否应用这个 SQL 片段。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.last("limit 1");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.last("limit 1");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user LIMIT 1
```

:::tip[注意事项]

- `last` 方法只能调用一次，多次调用将以最后一次为准。
- 使用 `last` 方法会绕过 MyBatis-Plus 的查询优化规则，可能会导致查询效率降低。
- 因为 `lastSql` 参数直接拼接到 SQL 中，所以必须确保输入的 SQL 片段是安全的，即保障 `lastSql` 应该是后端自行控制，而不是动态参数由前端传入。
- 在使用 `last` 方法时，确保 `lastSql` 参数是一个安全的 SQL 片段，并且 `condition` 参数正确地控制了 SQL 片段的应用。

:::

### exists

`exists` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它用于在查询中添加一个 EXISTS 子查询。通过调用 `exists` 方法，可以将一个完整的 SQL 子查询作为 EXISTS 条件添加到主查询中。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 添加 EXISTS 子查询
exists(String existsSql)
exists(boolean condition, String existsSql)
```

#### 参数说明

- `existsSql`：一个字符串，包含要作为 EXISTS 条件的 SQL 子查询。
- `condition`：一个布尔值，用于控制是否应用这个 EXISTS 条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.exists("select id from table where age = 1");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.exists("select id from table where age = 1");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE EXISTS (select id from table where age = 1)
```

:::tip[注意事项]

- `exists` 方法用于添加一个 EXISTS 子查询，这通常用于检查子查询是否返回任何行。
- 在使用 `exists` 方法时，确保 `existsSql` 参数是一个有效的 SQL 子查询，它将直接嵌入到生成的 SQL 中，因此需要确保其安全性和正确性，应避免 SQL 由前端动态参数传入并直接引用。
- `condition` 参数用于控制是否应用 EXISTS 条件，这允许你根据某些条件动态添加查询条件。
- 由于 `exists` 方法允许执行复杂的逻辑，因此在使用时需要特别注意代码的可读性和维护性。

:::

### notExists

`notExists` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它用于在查询中添加一个 NOT EXISTS 子查询。通过调用 `notExists` 方法，可以将一个完整的 SQL 子查询作为 NOT EXISTS 条件添加到主查询中。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`
- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 添加 NOT EXISTS 子查询
notExists(String notExistsSql)
notExists(boolean condition, String notExistsSql)
```

#### 参数说明

- `notExistsSql`：一个字符串，包含要作为 NOT EXISTS 条件的 SQL 子查询。
- `condition`：一个布尔值，用于控制是否应用这个 NOT EXISTS 条件。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.notExists("select id from table where age = 1");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.notExists("select id from table where age = 1");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT * FROM user WHERE NOT EXISTS (select id from table where age = 1)
```

:::tip[注意事项]

- `notExists` 方法用于添加一个 NOT EXISTS 子查询，这通常用于检查子查询是否不返回任何行。
- 在使用 `notExists` 方法时，确保 `notExistsSql` 参数是一个有效的 SQL 子查询，它将直接嵌入到生成的 SQL 中，因此需要确保其安全性和正确性，应避免 SQL 由前端动态参数传入并直接引用。
- `condition` 参数用于控制是否应用 NOT EXISTS 条件，这允许你根据某些条件动态添加查询条件。
- 由于 `notExists` 方法允许执行复杂的逻辑，因此在使用时需要特别注意代码的可读性和维护性。

:::

### select

`select` 方法是 MyBatis-Plus 中用于构建查询条件的高级方法之一，它用于设置查询的字段。通过调用 `select` 方法，可以指定在查询结果中包含哪些字段，从而实现字段级别的查询定制。

#### 使用范围

- `QueryWrapper`
- `LambdaQueryWrapper`

#### 方法签名

```java
// 设置查询字段
select(String... sqlSelect)

// 过滤查询字段（主键除外）
select(Predicate<TableFieldInfo> predicate)
select(Class<T> entityClass, Predicate<TableFieldInfo> predicate)
```

#### 参数说明

- `sqlSelect`：一个字符串数组，包含要查询的字段名。
- `predicate`：一个 `Predicate` 函数式接口，用于过滤查询字段。它接受一个 `TableFieldInfo` 类型的参数，并返回一个布尔值，表示是否选择该字段。
- `entityClass`：实体类的类型，用于获取字段信息。

#### 示例

**普通 Wrapper (`QueryWrapper`)**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.select("id", "name", "age");
```

**Lambda Wrapper (`LambdaQueryWrapper`)**：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.select(User::getId, User::getName, User::getAge);
```

**使用 Predicate 过滤字段的示例**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.select(i -> i.getProperty().startsWith("test"));
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
SELECT id, name, age FROM user

-- 使用 Predicate 过滤字段生成的 SQL
SELECT testField1, testField2 FROM user
```

:::tip[说明]

- `select` 方法分为两类：第一类直接指定要查询的字段名，第二类通过 `Predicate` 过滤字段。
- 第二类方法用于过滤查询字段（主键除外），如果入参不包含 `entityClass`，则在调用前需要确保 `wrapper` 内的 `entity` 属性有值。
- 这两类方法重复调用时，以最后一次调用为准。
- 在使用 `select` 方法时，确保指定的字段名或过滤条件正确，以避免查询结果不符合预期。

:::

### set

`set` 方法是 MyBatis-Plus 中用于构建更新操作的高级方法之一，它用于设置更新语句中的 SET 字段。通过调用 `set` 方法，可以指定在更新操作中要修改的字段及其新值。

#### 使用范围

- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置更新语句中的 SET 字段
set(R column, Object val)
set(R column, Object val, String mapping)
set(boolean condition, R column, Object val)
set(boolean condition, R column, Object val, String mapping)
```

#### 参数说明

- `column`：数据库字段名或使用 `Lambda` 表达式的字段名。
- `condition`：一个布尔值，用于控制是否应用这个 SET 字段。
- `val`：一个对象，表示要更新到字段的新值。
- `mapping`：额外指定,例如: `javaType=int,jdbcType=NUMERIC,typeHandler=xxx.xxx.MyTypeHandler`

#### 示例

**普通 Wrapper (`UpdateWrapper`)**：

```java
UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
updateWrapper.set("name", "老李头");
```

**Lambda Wrapper (`LambdaUpdateWrapper`)**：

```java
LambdaUpdateWrapper<User> lambdaUpdateWrapper = new LambdaUpdateWrapper<>();
lambdaUpdateWrapper.set(User::getName, "老李头");
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
UPDATE user SET name = '老李头'
```

**使用条件控制的示例**：

```java
UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
updateWrapper.set(true, "name", "");
```

**生成的 SQL**

```sql
-- 使用条件控制的 SQL
UPDATE user SET name = ''
```

:::tip[注意事项]

- `set` 方法用于设置更新语句中的 SET 字段，可以指定要更新的字段及其新值。
- 当 `val` 参数为空字符串时，数据库字段值将变为空字符串。
- 当 `val` 参数为 `null` 时，数据库字段值将变为 `null`。
- `condition` 参数用于控制是否应用这个 SET 字段，这允许你根据某些条件动态添加更新字段。
- 在使用 `set` 方法时，确保 `column` 参数是一个有效的字段名，并且 `val` 参数是一个合适的新值。

:::

### setSql

`setSql` 方法是 MyBatis-Plus 中用于构建更新操作的高级方法之一，它允许你直接设置更新语句中的 SET 部分 SQL。通过调用 `setSql` 方法，可以将一个自定义的 SQL 片段作为 SET 子句添加到更新语句中。

#### 使用范围

- `UpdateWrapper`
- `LambdaUpdateWrapper`

#### 方法签名

```java
// 设置更新语句中的 SET 部分 SQL
setSql(String setSql, Object... params)
setSql(boolean condition, String setSql, Object... params)
```

#### 参数说明

- `setSql`：一个字符串，包含要作为 SET 子句的 SQL 片段。
- `condition`：一个布尔值，用于控制是否应用这个 SET 字段。
- `params`：一个可变参数列表，包含 SQL 片段中占位符的替换值。

#### 示例

```java
setSql("name = '老李头'")
setSql("dateColumn={0}", LocalDate.now())
setSql("type={0,javaType=int,jdbcType=NUMERIC,typeHandler=xxx.xxx.MyTypeHandler}", "待处理字符串");
```

:::tip[注意事项]

- `setSql` 方法用于设置更新语句中的 SET 部分 SQL，这通常用于需要使用复杂 SQL 构造的场景。
- 在使用 `setSql` 方法时，确保 `sql` 参数是一个有效的 SQL 片段，它将直接嵌入到生成的 SQL 中，因此需要确保其安全性和正确性，应避免 SQL 由前端动态参数传入并直接引用
- 由于 `setSql` 方法允许执行复杂的逻辑，因此在使用时需要特别注意代码的可读性和维护性。

:::

### setIncrBy <Badge text="Since 3.5.6" type="error"/>

`setIncrBy` 方法是 MyBatis-Plus 中用于更新操作的高级方法之一，它允许你指定一个字段，并使其在数据库中的值增加指定的数值。这个方法特别适用于需要对数值字段进行增量操作的场景。

#### 使用范围

- `LambdaUpdateWrapper`

#### 方法签名

```java
// 字段自增指定数值
setIncrBy(SFunction<T, ?> column, Number val)

// 在条件满足时字段自增指定数值
setIncrBy(boolean condition, SFunction<T, ?> column, Number val)
```

#### 参数说明

- `column`：一个 `SFunction` 对象，表示要自增的字段。
- `val`：一个 `Number` 对象，表示要增加的数值。
- `condition`（可选）：一个布尔值，表示是否在满足条件时执行自增操作。

#### 示例

**普通 Wrapper (`UpdateWrapper`)**：

```java
UpdateWrapper<Product> updateWrapper = new UpdateWrapper<>();
updateWrapper.setIncrBy(Product::getNum, 1);
```

**Lambda Wrapper (`LambdaUpdateWrapper`)**：

```java
LambdaUpdateWrapper<Product> lambdaUpdateWrapper = new LambdaUpdateWrapper<>();
lambdaUpdateWrapper.setIncrBy(Product::getNum, 1);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
UPDATE product SET num = num + 1
```

:::tip[注意事项]

- `setIncrBy` 方法用于对指定字段进行自增操作，这通常用于需要对数值字段进行增量更新的场景。
- 在使用 `setIncrBy` 方法时，确保 `column` 参数是一个有效的字段表达式，`val` 参数是一个有效的数值。
- 如果提供了 `condition` 参数，则只有在条件为 `true` 时才会执行自增操作。

:::

### setDecrBy <Badge text="Since 3.5.6" type="error"/>

`setDecrBy` 方法是 MyBatis-Plus 中用于更新操作的高级方法之一，它允许你指定一个字段，并使其在数据库中的值减少指定的数值。这个方法特别适用于需要对数值字段进行减量操作的场景。

#### 使用范围

- `LambdaUpdateWrapper`

#### 方法签名

```java
// 字段自减指定数值
setDecrBy(SFunction<T, ?> column, Number val)

// 在条件满足时字段自减指定数值
setDecrBy(boolean condition, SFunction<T, ?> column, Number val)
```

#### 参数说明

- `column`：一个 `SFunction` 对象，表示要自减的字段。
- `val`：一个 `Number` 对象，表示要减少的数值。
- `condition`（可选）：一个布尔值，表示是否在满足条件时执行自减操作。

#### 示例

**普通 Wrapper (`UpdateWrapper`)**：

```java
UpdateWrapper<Product> updateWrapper = new UpdateWrapper<>();
updateWrapper.setDecrBy("num", 1);
```

**Lambda Wrapper (`LambdaUpdateWrapper`)**：

```java
LambdaUpdateWrapper<Product> lambdaUpdateWrapper = new LambdaUpdateWrapper<>();
lambdaUpdateWrapper.setDecrBy(Product::getNum, 1);
```

**生成的 SQL**

```sql
-- 普通 Wrapper 和 Lambda Wrapper 生成的 SQL 相同
UPDATE product SET num = num - 1
```

:::tip[注意事项]

- `setDecrBy` 方法用于对指定字段进行自减操作，这通常用于需要对数值字段进行减量更新的场景。
- 在使用 `setDecrBy` 方法时，确保 `column` 参数是一个有效的字段表达式，`val` 参数是一个有效的数值。
- 如果提供了 `condition` 参数，则只有在条件为 `true` 时才会执行自减操作。

:::

### lambda

`lambda` 方法是一个便捷的方法，它允许你从 `QueryWrapper` 或 `UpdateWrapper` 对象中获取对应的 `LambdaQueryWrapper` 或 `LambdaUpdateWrapper` 对象。这样，你就可以使用 Lambda 表达式来构建查询或更新条件，使得代码更加简洁和类型安全。

#### 使用范围

- `QueryWrapper`
- `UpdateWrapper`

#### 方法签名

```java
// 获取 Lamdba Wrapper
lambda();
```

#### 示例

**从 QueryWrapper 获取 LambdaQueryWrapper**：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
LambdaQueryWrapper<User> lambdaQueryWrapper = queryWrapper.lambda();
// 使用 Lambda 表达式构建查询条件
lambdaQueryWrapper.eq("name", "张三");
```

**从 UpdateWrapper 获取 LambdaUpdateWrapper**：

```java
UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
LambdaUpdateWrapper<User> lambdaUpdateWrapper = updateWrapper.lambda();
// 使用 Lambda 表达式构建更新条件
lambdaUpdateWrapper.set(User::getName, "李四");
```

#### 说明

- `lambda` 方法返回一个 `LambdaWrapper` 对象，具体类型取决于调用它的 `Wrapper` 类型。
- 在 `QueryWrapper` 上调用 `lambda` 方法将返回一个 `LambdaQueryWrapper`。
- 在 `UpdateWrapper` 上调用 `lambda` 方法将返回一个 `LambdaUpdateWrapper`。
- 使用 Lambda 表达式可以避免直接使用字符串来指定字段名，从而减少错误并提高代码的可读性。

:::tip[注意事项]

- 在使用 `lambda` 方法时，确保你已经正确地初始化了 `QueryWrapper` 或 `UpdateWrapper` 对象。
- 一旦获取了 `LambdaWrapper` 对象，你就可以使用 Lambda 表达式来构建查询或更新条件，这将使得代码更加类型安全和易于维护。

:::


## 使用 TypeHandler

> 在 `wrapper` 中使用 `typeHandler` 需要特殊处理利用 `formatSqlMaybeWithParam` 方法

```java
// 查询
queryWrapper.apply("type={0,typeHandler="+ MyTypeHandler.class.getCanonicalName()+ "}", "待处理字符串");

// 更新
updateWrapper.setSql("type={0,javaType=string,jdbcType=VARCHAR,typeHandler=xxx.xxx.MyTypeHandler}", "待处理字符串");
```


## 使用提示

通过使用 MyBatis-Plus 的 Wrapper 条件构造器，开发者可以更加高效地构建复杂的数据库查询条件，同时保持代码的简洁性和安全性。以下是一些注意事项与推荐做法：

- 在使用 Wrapper 时，尽量使用 Lambda 表达式来避免硬编码字段名，这样可以提高代码的可读性和可维护性。
- Wrapper 支持链式调用，可以组合多个条件，如 `and`、`or` 等逻辑操作符。
- 在更新操作中使用 UpdateWrapper 或 LambdaUpdateWrapper 时，可以省略实体对象，直接在 Wrapper 中设置更新字段。
- 注意 Wrapper 的线程安全性，通常在每次使用时创建新的 Wrapper 实例。
- 在使用 MyBatis-Plus 的 Wrapper 时，应避免将前端动态参数直接拼接到 SQL 片段中，以防止 SQL 注入攻击。MyBatis-Plus 提供了安全的参数绑定方式，如使用 `eq`、`apply` 等方法，它们会自动处理参数绑定，避免 SQL 注入风险。

### Wrappers

MyBatis-Plus 提供了 `Wrappers` 类，它是一个静态工厂类，用于快速创建 `QueryWrapper`、`UpdateWrapper`、`LambdaQueryWrapper` 和 `LambdaUpdateWrapper` 的实例。使用 `Wrappers` 可以减少代码量，提高开发效率。

**示例**：

```java
// 创建 QueryWrapper
QueryWrapper<User> queryWrapper = Wrappers.query();
queryWrapper.eq("name", "张三");

// 创建 LambdaQueryWrapper
LambdaQueryWrapper<User> lambdaQueryWrapper = Wrappers.lambdaQuery();
lambdaQueryWrapper.eq(User::getName, "张三");

// 创建 UpdateWrapper
UpdateWrapper<User> updateWrapper = Wrappers.update();
updateWrapper.set("name", "李四");

// 创建 LambdaUpdateWrapper
LambdaUpdateWrapper<User> lambdaUpdateWrapper = Wrappers.lambdaUpdate();
lambdaUpdateWrapper.set(User::getName, "李四");
```

:::tip[注意事项]

- 在使用 `QueryWrapper` `UpdateWrapper` 查询 设置 `条件字段部分` 一定要保证安全，避免 SQL 注入攻击。
- 任何 `前端` 传入的 `SQL片段` 都要 `严格过滤` 更多查看 [数据安全保护](/guides/security/) [预防安全漏洞](/reference/about-cve/)

:::

### 线程安全性

Wrapper 实例不是线程安全的，因此建议在每次使用时创建新的 Wrapper 实例。这样可以避免多线程环境下的数据竞争和潜在的错误。

**示例**：

```java
// 在每个方法或请求中创建新的 Wrapper 实例
public List<User> getUsersByName(String name) {
    QueryWrapper<User> queryWrapper = Wrappers.query();
    queryWrapper.eq("name", name);
    return userMapper.selectList(queryWrapper);
}
```

通过遵循这些最佳实践，开发者可以更加安全、高效地使用 MyBatis-Plus 的 Wrapper 条件构造器，构建出既安全又易于维护的数据库操作代码。

### 使用 Wrapper 自定义 SQL

MyBatis-Plus 提供了强大的 Wrapper 条件构造器，允许开发者自定义 SQL 语句，以满足更复杂的数据库查询需求。为了使用这一功能，请确保你的 `mybatis-plus` 版本不低于 `3.0.7`。

#### 注意事项

- **版本要求**：确保你的项目中使用的 `mybatis-plus` 版本至少为 `3.0.7`，以支持自定义 SQL 功能。
- **参数命名**：在自定义 SQL 时，传递 Wrapper 对象作为参数时，参数名必须为 `ew`，或者使用注解 `@Param(Constants.WRAPPER)` 明确指定参数为 Wrapper 对象。
- **使用 `${ew.customSqlSegment}`**：在 SQL 语句中，使用 `${ew.customSqlSegment}` 来引用 Wrapper 对象生成的 SQL 片段。
- **不支持基于 entity 的 where 语句**：自定义 SQL 时，Wrapper 对象不会基于实体类自动生成 where 子句，你需要手动编写完整的 SQL 语句。

#### 示例

以下是一个使用 Wrapper 自定义 SQL 的示例：

```java
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.Param;

public interface UserMapper extends BaseMapper<User> {
    @Select("SELECT * FROM user ${ew.customSqlSegment}")
    List<User> selectByCustomSql(@Param(Constants.WRAPPER) Wrapper<User> wrapper);
}
```

在上述示例中，我们定义了一个 `selectByCustomSql` 方法，它使用了一个自定义的 SQL 语句，并通过 `${ew.customSqlSegment}` 引入了 Wrapper 对象生成的 SQL 片段。

#### 使用方法

要使用自定义 SQL，只需调用上述方法并传入一个 Wrapper 对象：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.eq("name", "张三");

List<User> userList = userMapper.selectByCustomSql(queryWrapper);
```

在这个例子中，`selectByCustomSql` 方法将执行一个带有 where 条件的查询，该条件由传入的 `queryWrapper` 对象生成。

通过这种方式，你可以灵活地结合 MyBatis-Plus 的 Wrapper 功能和自定义 SQL，以满足各种复杂的数据库操作需求。

## Kotlin持久化对象定义最佳实践

在Kotlin中定义持久化对象时，我们应当遵循一些最佳实践，以确保代码的清晰性和可维护性。以下是一个使用MyBatis-Plus的示例，展示了如何定义一个持久化对象：

```kotlin
@TableName("sys_user")
class User {
    @TableId(type = IdType.AUTO)
    var id: Int? = null

    @TableField("username")
    var name: String? = null

    var roleId: Int? = null
}
```

**注意**：上述代码中的`@TableId`和`@TableField`注解是为了展示MyBatis-Plus的使用，并非必须。所有成员变量都应定义为可空类型，并赋予初始值`null`，以便在类似Java中的`updateSelective`场景中使用。

不推荐使用`data class`或全参数构造方法，因为这可能导致在创建空对象时需要提供不必要的`null`值。

### 使用注解查询

```java
@Select("select * from mysql_data ${ew.customSqlSegment}")
List<MysqlData> getAll(@Param(Constants.WRAPPER) Wrapper wrapper);
```

### 使用XML配置查询

```java
List<MysqlData> getAll(Wrapper ew);
```

```xml
<select id="getAll" resultType="MysqlData">
    SELECT * FROM mysql_data ${ew.customSqlSegment}
</select>
```

### Kotlin中使用Wrapper

Kotlin支持`QueryWrapper`和`UpdateWrapper`，但不支持`LambdaQueryWrapper`和`LambdaUpdateWrapper`。如果需要使用Lambda风格的Wrapper，可以使用`KtQueryWrapper`和`KtUpdateWrapper`。

参考示例：

```kotlin
val queryWrapper = KtQueryWrapper(User()).eq(User::name, "sss").eq(User::roleId, "sss2")
userMapper!!.selectList(queryWrapper)

val updateConditionWrapper = KtUpdateWrapper(User()).eq(User::name, "sss").eq(User::roleId, "sss2")
val updateRecord = User()
updateRecord.name = "newName"
userMapper!!.update(updateRecord, updateConditionWrapper)

val updateRecord = User()
updateRecord.id = 2
updateRecord.name = "haha"
userMapper.updateById(updateRecord)
```

### 链式调用与Lambda式调用

MyBatis-Plus提供了两种风格的链式调用：普通链式调用和Lambda式链式调用。需要注意的是，Lambda式链式调用不支持Kotlin。

```java
// 普通链式调用
UpdateChainWrapper<T> update();
// Lambda式链式调用（不支持Kotlin）
LambdaUpdateChainWrapper<T> lambdaUpdate();

// 等价示例：
query().eq("id", value).one();
lambdaQuery().eq(Entity::getId, value).one();

// 等价示例：
update().eq("id", value).remove();
lambdaUpdate().eq(Entity::getId, value).remove();
```

通过遵循这些最佳实践，我们可以确保Kotlin中的持久化对象定义既清晰又易于维护，同时充分利用MyBatis-Plus提供的功能。