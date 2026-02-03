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
* between -> betweenIfExists <Badge type="tip" text="1.5.6+" vertical="top" />
* notBetween -> notBetweenIfExists <Badge type="tip" text="1.5.6+" vertical="top" />

::: tip 支持`in` <Badge type="tip" text="1.5.6+" vertical="top" />

API为`inIfNotEmpty`，**不适用IfExists策略，仅对集合做非空判断，不会对集合中的元素进行判断**

```java
wrapper.inIfNotEmpty(UserDO::getPid, Collections.emptyList());
```
:::

## 示例:

```java
wrapper.eq(Objects.nonNull(name), User::getName, name);
```
等效于
```java
wrapper.eqIfExists(User::getName, name);
```


## 判断策略

### **not_empty** 默认  
  如果值类型为String则调用 [StrUtils.isNotEmpty](https://github.com/yulichang/mybatis-plus-join/blob/master/mybatis-plus-join-core/src/main/java/com/github/yulichang/toolkit/StrUtils.java#L111)  
  其他数据类型调用 Objects.nonNull

### **not_null**  
  全部调用 Objects.nonNull

### **not_blank**  
  如果值类型为String则调用 [StrUtils.isNotBlank](https://github.com/yulichang/mybatis-plus-join/blob/master/mybatis-plus-join-core/src/main/java/com/github/yulichang/toolkit/StrUtils.java#L103)  
  其他数据类型调用 Objects.nonNull  

::: tip not_empty与not_blank的区别
not_empty：内容长度不为0  
not_blank：去除空白后长度不为0 (空白包括空格、换行符、制表符等)
:::

## 配置文件

```yml
mybatis-plus-join:
  #xxIfExists判断策略 not_null/not_empty/not_blank
  if-exists: not_empty
```

自定义Wrapper策略

```java
//针对指定wrapper生效
wrapper.setIfExists(IfExistsEnum.NOT_EMPTY);
wrapper.setIfExists(IfExistsEnum.NOT_BLANK);
wrapper.setIfExists(IfExistsEnum.NOT_NULL);
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
