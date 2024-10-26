---
tags:
  - 'setTableName'
  - '@DynamicTableName'
---

# 动态表名

## [MyBatis-Plus 动态表名插件](https://baomidou.com/plugins/dynamic-table-name/)

## wrapper动态表名支持 <Badge type="tip" text="1.4.4+" vertical="top" />

::: warning 注意事项:
wrapper 动态表名版本需要1.4.4+  
使用动态表名有sql有注入风险, 使用时需自行把控
:::

::: danger 注意事项:
**动态表名不是表别名！** 自定义表别名请参考 **[leftJoin](../lambda/join/leftJoin)**  
动态表名和别名没有任何关系，动态表名不会修改表别名!

举个例子：user表改成user_2023表  
```java
.setTableName(name -> name + "_2023")
```
修改前：  
select ... from user t  
修改后：    
select ... form user_2023 t
:::

## 配置 @DynamicTableName
支持主表和副表动态表名  
主表需要添加@DynamicTableName注解启用动态表名 副表不需要添加也能实现动态表名
```java
@DynamicTableName
public class UserDO{
}
```

代码
```java
MPJLambdaWrapper<UserDO> wrapper = new MPJLambdaWrapper<UserDO>()
        .select(UserDO::getId)
        .leftJoin(AddressDO.class, on -> on
                .eq(AddressDO::getUserId, UserDO::getId)
                // 副表动态表名 name 为原副表名 返回新表名
                .setTableName(name -> name + "aaaaaaaaaa"))
        .leftJoin(AreaDO.class, AreaDO::getId, AddressDO::getAreaId)
        .le(UserDO::getId, 10000)
        .orderByDesc(UserDO::getId)
        // 主表动态表名 name 为原主表表名 返回新表名
        .setTableName(name -> name + "bbbbbbb");
```
 
