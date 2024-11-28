---
tags:
  - '@EntityMapping'
  - '@FieldMapping'
  - 'MPJDeepService'
  - 'thisField'
  - 'joinField'
---

# 注解映射

## 介绍 @EntityMapping, @FieldMapping

@EntityMapping和@FieldMapping两个注解早在 <Badge type="tip" text="1.2.0" vertical="top" /> 版本就已经发布
, <Badge type="tip" text="1.4.5" vertical="top" /> 对这两个注解进行了小升级

### 使用

修改service

注解查询的调用方式由之前的Mapper层改成了Service层  
修改service, service由MP的IService\<T\> 改为 MPJDeepService\<T\>  
MPJDeepService\<T\> 继承MP的IService\<T\> ,所以改了不会对原有代码产生影响

```java
public interface UserService extends MPJDeepService<User> {
}
```

添加注解

```java

@Data
@TableName("user")
public class User {

    @TableId
    private Integer id;
    private Integer pid;//父id
    /* 其他属性略 */

    /**
     * 查询上级 一对一
     */
    @TableField(exist = false)
    @EntityMapping(thisField = "pid", joinField = "id")
    private User parentUser;

    /**
     * 查询下级 一对多
     */
    @TableField(exist = false)
    @EntityMapping(thisField = "id", joinField = "pid")
    private List<User> childUser;

    /**
     * 带条件的查询下级 一对多
     */
    @TableField(exist = false)
    @EntityMapping(thisField = "id", joinField = "pid",
            condition = {
                    //sex = '0' 默认条件是等于
                    @Condition(column = "sex", value = "0"),
                    //name like '%a%'
                    @Condition(column = "name", value = "张三", keyWord = SqlKeyword.LIKE)
            },
            apply = @Apply(value = "id between 1 and 20"))//拼接sql 同 wrapper.apply()
    private List<User> childUserCondition;

    /**
     * 查询地址 (一对多)
     */
    @TableField(exist = false)
    @EntityMapping(thisField = "id", joinField = "userId")
    private List<Address> addressList;

    /**
     * 绑定字段 （一对多）
     */
    @TableField(exist = false)
    @FieldMapping(tag = User.class, thisField = "id", joinField = "pid", select = "id")
    private List<Integer> childIds;
}
```

::: tip
可以使用 lombok 的 @FieldNameConstants 注解生成字段常量
[lombok优化](./intro.html#lombok优化注解写法)
:::

调用

```java
/**
 * 一对一，一对多关系映射查询
 * 以Deep结尾的方法会进行映射查询
 * 如果不需要关系映射就使用mybatis plus原生方法即可，比如 getById listByIds 等
 * <p>
 * 注意：关系映射不会去关联查询，而是执行多次单表查询（对结果汇总后使用in语句查询,再对结果进行匹配）
 */
@SpringBootTest
class MappingTest {
    @Resource
    private UserService userService;

    @Test
    void test1() {
        User uesr = userService.getByIdDeep(2);
        System.out.println(deep);
    }

    @Test
    void test2() {
        List<User> list = userService.listDeep(Wrappers.emptyWrapper());
        list.forEach(System.out::println);
    }

    @Test
    void test3() {
        Page<User> page = new Page<>(2, 2);
        Page<User> result = userService.pageDeep(page, Wrappers.emptyWrapper());
        result.getRecords().forEach(System.out::println);
    }
}
```

::: warning 注意事项
映射查询默认只查询两层  
比如: user -> 上级user -> 停止(不会继续查询上级user的上级user)  
开启多级查询, 添加第二个参数(不建议在父子关系表中使用, 可能会造成死循环)

```java
userService.listDeep(Wrappers.emptyWrapper(), conf -> conf.loop(true));
```

:::

## lombok优化注解写法

在实体类上添加 @FieldNameConstants 注解

::: tip 提示
[lombok FieldNameConstants注解文档](https://projectlombok.org/features/experimental/FieldNameConstants)
:::

```java

@Data
@FieldNameConstants
@TableName("user")
public class User {

    @TableId
    private Integer id;
    private Integer pid;//父id
    /* 其他属性略 */

    /**
     * 查询上级 一对一
     */
    @TableField(exist = false)
    @EntityMapping(thisField = Fields.pid, joinField = Fields.id)
    private User parentUser;

    /**
     * 查询下级 一对多
     */
    @TableField(exist = false)
    @EntityMapping(thisField = Fields.id, joinField = Fields.pid)
    private List<User> childUser;

    /**
     * 带条件的查询下级 一对多
     */
    @TableField(exist = false)
    @EntityMapping(thisField = Fields.id, joinField = Fields.pid,
            condition = {
                    //sex = '0' 默认条件是等于
                    @Condition(column = Fields.sex, value = "0"),
                    //name like '%a%'
                    @Condition(column = Fields.name, value = "张三", keyWord = SqlKeyword.LIKE)
            },
            apply = @Apply(value = "id between 1 and 20"))//拼接sql 同 wrapper.apply()
    private List<User> childUserCondition;

    /**
     * 查询地址 (一对多)
     */
    @TableField(exist = false)
    @EntityMapping(thisField = Fields.id, joinField = Address.Fields.userId)
    private List<Address> addressList;

    /**
     * 绑定字段 （一对多）
     */
    @TableField(exist = false)
    @FieldMapping(tag = User.class, thisField = Fields.id, joinField = Fields.pid, select = Fields.id)
    private List<Integer> childIds;
}
```