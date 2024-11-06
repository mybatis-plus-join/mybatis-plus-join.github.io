# MPJLambdaWrapper扩展

## 继承

通常情况下可以通过继承 `MPJLambdaWrapper` 实现扩展或重写部分方法

```java
public class MyWrapper<T> extends MPJLambdaWrapper<T> {

    @Override
    public <X> MyWrapper<T> eq(SFunction<X, ?> column, Object val) {
        super.eq(Objects.nonNull(val), column, val);
        return this;
    }
}
```

调用

```java
new MyWrapper<User>().eq(User::getId, 1);
```

如果您就只是想重写部分方法，那么这种方法没有任何问题  
但是如果想扩展其他方法，那会有问题，就是无法完整的走完链式调用

```java
public class MyWrapper<T> extends MPJLambdaWrapper<T> {

    @Override
    public <X> MyWrapper<T> eqIfPresent(SFunction<X, ?> column, Object val) {
        super.eq(Objects.nonNull(val), column, val);
        return this;
    }
}
```

非扩展方法会返回 `MPJLambdaWrapper` 导致无法再调用扩展方法，需要拆分

```java
MyWrapper<User> wrapper = new MyWrapper<>();
wrapper.selectAll();
wrapper.eqIfPresent(User::getId, 1);
```

## 扩展

这里提供了另一种扩展方式，重写 `com.github.yulichang.wrapper.ext.Ext` 类

添加依赖时排除扩展包

::: code-group

```xml [Maven]
<dependency>
    <groupId>com.github.yulichang</groupId>
    <artifactId>mybatis-plus-join-boot-starter</artifactId>
    <version>${version}</version>
    <exclusions>
        <exclusion>
            <groupId>com.github.yulichang</groupId> // [!code ++]
            <artifactId>mybatis-plus-join-wrapper-ext</artifactId> // [!code ++]
        </exclusion>
    </exclusions>
</dependency>
```

```groovy [Gradle]
dependencies {
    implementation('com.github.yulichang:mybatis-plus-join-boot-starter:version') {
        exclude group: 'com.github.yulichang', module: 'mybatis-plus-join-wrapper-ext' // [!code ++]
    }
}
```

:::

这个 `mybatis-plus-join-wrapper-ext` 模块中就一个 `com.github.yulichang.wrapper.ext.Ext` 类

排除后重写

```java
package com.github.yulichang.wrapper.ext;

import com.baomidou.mybatisplus.core.toolkit.support.SFunction;
import com.github.yulichang.wrapper.MPJLambdaWrapper;
import com.github.yulichang.wrapper.interfaces.IExt;

public interface Ext<Children extends MPJLambdaWrapper<?>> extends IExt<Children> {

    default <T> Children eqIfPresent(SFunction<T, ?> column, Object val) {
        getChildren().eq(Objects.nonNull(val), column, val);
        return getChildren();
    }
}
```
::: warning 提示
扩展类的包目录和类名要和 `com.github.yulichang.wrapper.ext.Ext` 类一致且需要继承 `IExt` 如上
:::

调用

```java
JoinWrappers.lambda(User.class);
    .selectAll();
    .eqIfPresent(User::getId, 1)
    .eq(User::getId, 1);
```

::: warning 提示
扩展的方式不支持重写，只能重载或添加新的方法

不论是继承还是扩展在编码时都建议调用公共的方法（文档中提供的API）  
尽量避免调用 `MPJLambdaWrapper` 内部其他方法，这些方法后续可能会有迭代
:::