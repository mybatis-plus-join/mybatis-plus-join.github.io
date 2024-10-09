---
tags:
  - 'install'
---

# 另外的一种安装方式

这种安装方式是基于MyBatis-Plus源码重新编译实现的  

如果您以<font color="red">插件方式安装报错</font>又或者您不喜欢改动 `Mapper` 和 `Service` 则可以选择这种安装方式

### 特点

* `Mapper` 无需继承 `MPJBaseMapper<T>` 使用原生的 `BaseMapper<T>` 就能实现join相关的api
* `Service` 无需继承 `MPJBaseService<T>` 使用原生的 `IService<T>` 就能实现join相关的api
* 无额外配置，即便您使用了自定义的 `SqlSessionFactory` 也无需额外配置

## 安装

您需要将MyBatis-Plus `groupId` 由原来的 `com.baomidou` 替换为 `com.github.yulichang`  
并且替换版本 [版本对应在文章最后](./install2.html#对应版本)

::: tip 提示:
已包含join插件依赖，替换后无需再引入`mybatis-plus-join`依赖
:::

### SpringBoot3

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
    <version>version</version>
</dependency>
```

替换为

```xml
<dependency>
    <groupId>com.github.yulichang</groupId>
    <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
    <version>version</version>
</dependency>
```

### SpringBoot2

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>version</version>
</dependency>
```

替换为

```xml
<dependency>
    <groupId>com.github.yulichang</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>version</version>
</dependency>
```

## 对应版本

| com.baomidou | com.github.yulichang | 内置的Join插件版本 |
|:------------:|:--------------------:|:-----------:|
|    3.5.8     |      3.5.8-001       |    1.5.1    |
|    3.5.7     |      3.5.7-001       |    1.5.1    |
|    3.5.6     |         暂未发行         |      -      |
|    3.5.4     |         暂未发行         |      -      |
|     更早版本     |         暂未发行         |      -      |

::: tip 提示:
MyBatis-Plus:3.5.8需要JDK11+  
MyBatis-Plus:3.5.7是最后支持JDK8的版本   

如果可以请升级到最新版（3.5.8或3.5.7）  
后续会支持更多的版本  
:::
