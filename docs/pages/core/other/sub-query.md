# 子查询 <Badge type="tip" text="1.5.2+" />

## 支持范围

<ul style="display: flex;flex-wrap: wrap;font-size: large;font-weight: bolder;line-height: 1.5">
 <li style="width: 255px">eq</li>
 <li style="width: 255px">ne</li>
 <li style="width: 255px">gt</li>
 <li style="width: 255px">ge</li>
 <li style="width: 255px">lt</li>
 <li style="width: 255px">le</li>
 <li style="width: 255px">in</li>
 <li style="width: 255px">notIn</li>
 <li style="width: 255px">exists</li>
 <li style="width: 255px">notExists</li>
 <li style="width: 255px">isNull</li>
 <li style="width: 255px">isNotNull</li>
</ul>

## API

以eq为例

```java
/**
 * 参数说明
 * @param colum eq对应的列
 * @param queryClass 子查询对应的主表类
 * @param wrapper 子查询构造器
 */
eq(SFunction colum, Class queryClass, Function wrapper);// [!code highlight]
/**
 * 条件重载 condition 为 false 时不添加条件
 */
eq(boolean condition, SFunction colum, Class queryClass, Function wrapper);// [!code highlight]
```

## 示例

以in为例

```java
MPJLambdaWrapper<UserDO> wrapper = JoinWrappers.lambda(UserDO.class)
        .selectAll()
        .leftJoin(AddressDO.class, AddressDO::getUserId, UserDO::getId)
        .in(UserDO::getId, UserDO.class, u -> u// [!code highlight]
                .select(UserDO::getId)// [!code highlight]
                .between(UserDO::getId, 0, 100));// [!code highlight]
wrapper.list();
```

对应sql

```sql
SELECT t.id,
       t.pid,
       t.`name`,
       t.`json`,
       t.sex,
       t.head_img,
       t.create_time
FROM `user` t
         LEFT JOIN address t1 ON (t1.user_id = t.id)
WHERE t.id IN (SELECT t.id FROM `user` t WHERE (t.id BETWEEN ? AND ?))
```

## 子查询别名

setAlias

```java
MPJLambdaWrapper<UserDO> wrapper = JoinWrappers.lambda(UserDO.class)
        .selectAll()
        .leftJoin(AddressDO.class, AddressDO::getUserId, UserDO::getId)
        .in(UserDO::getId, UserDO.class, u -> u
                .setAlias("sub") // [!code ++]
                .select(UserDO::getId)
                .between(UserDO::getId, 0, 100));
wrapper.list();
```

对应sql

```sql
SELECT t.id,
       t.pid,
       t.`name`,
       t.`json`,
       t.sex,
       t.head_img,
       t.create_time
FROM `user` t
         LEFT JOIN address t1 ON (t1.user_id = t.id)
WHERE t.id IN (SELECT sub.id FROM `user` sub WHERE sub.del = false AND (sub.id BETWEEN ? AND ?))
```

<!--@include: ../../../component/code-warn.md-->
