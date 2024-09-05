---
tags:
  - 'eqIfExists'
  - 'neIfExists'
  - 'gtIfExists'
  - 'geIfExists'
  - 'ltIfExists'
  - 'leIfExists'
  - 'likeIfExists'
  - 'notLikeIfExists'
  - 'likeLeftIfExists'
  - 'likeRightIfExists'
  - 'notLikeLeftIfExists'
  - 'notLikeRightIfExists'
  - 'if-absent'
  - 'not_empty'
  - 'not_null'
  - 'not_blank'
---

# IfExists <Badge type="tip" text="1.4.9+" vertical="top" />

xxIfExists会自动判断条件值是否为空，且只会在不为空的情况下生效

## API

* eq -> eqIfExists
* ne -> neIfExists
* gt -> gtIfExists
* ge -> geIfExists
* lt -> ltIfExists
* le -> leIfExists
* like -> likeIfExists
* notLike -> notLikeIfExists
* likeLeft -> likeLeftIfExists
* likeRight -> likeRightIfExists
* notLikeLeft -> notLikeLeftIfExists
* notLikeRight -> notLikeRightIfExists

::: tip 举例:
```java
wrapper.eq(Objects.nonNull(name), UserDO::getName, name)  
```
等效于
```java
wrapper.eqIfExists(UserDO::getName, name)  
```
:::

# 判断策略

## **not_empty** 默认  
  如果值类型为String则调用 [StringUtils.isNotEmpty](https://gitee.com/best_handsome/mybatis-plus-join/blob/master/mybatis-plus-join-core/src/main/java/com/github/yulichang/toolkit/MPJStringUtils.java#L107)  
  其他数据类型调用 Objects.nonNull

## **not_null**  
  全部调用 Objects.nonNull

## **not_blank**  
  如果值类型为String则调用 [StringUtils.isNotBlank](https://gitee.com/best_handsome/mybatis-plus-join/blob/master/mybatis-plus-join-core/src/main/java/com/github/yulichang/toolkit/MPJStringUtils.java#L99)  
  其他数据类型调用 Objects.nonNull  

## 配置文件

```yml
mybatis-plus-join:
  #xxIfExists判断策略 not_null/not_empty/not_blank
  if-exists: not_empty
```

自定义Wrapper策略

```java
//针对指定wrapper生效
wrapper.setIfExists(val -> null != val);
//重载，enums参数用法同下
wrapper.setIfExists((val, enums) -> null != val);
```

自定义全局策略

```java
@Configuration
public class MybatisPlusConfig {
    /**
     * 自定义ifExists策略 优先级高于配置文件
     * 只对 xxIfExists生效 比如eqIfExists、neIfExists等
     */
    @Bean
    public MybatisPlusJoinIfExistsConsumer mybatisPlusJoinIfExistsConsumer() {
        // val是条件值 enums是条件类型
        return (val, enums) -> null != val;
    }
```

不同条件使用不同策略

```java
@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusJoinIfExistsConsumer mybatisPlusJoinIfExistsConsumer() {
        /* val是条件值 enums是条件类型
           以下代码解释 
           eqIfExists 判断条件为 Objects.nonNull
           likeIfExists 判断条件为 NOT_BLANK
           其他 xxIfExists 判断条件为 NOT_NULL
         */
        return (val, enums) -> {
            switch (enums) {
                case EQ:
                    return Objects.nonNull(val);
                case LIKE:
                    return IfExistsEnum.NOT_BLANK.test(val);
                default:
                    return IfExistsEnum.NOT_NULL.test(val);
            }
        };
    }
}
```
