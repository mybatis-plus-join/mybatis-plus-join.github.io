---
tags:
  - 'install'
---

# 安装

全新的 MyBatis-Plus-Join 版本基于 JDK8，提供了 lambda 形式的调用，所以安装集成要求如下：

* JDK 8+
* Maven or Gradle

## Spring Boot

Maven：

```xml
<dependency>
    <groupId>com.github.yulichang</groupId>
    <artifactId>mybatis-plus-join-boot-starter</artifactId>
    <version>最新版本</version>
</dependency>
```

Gradle：

```gradle
implementation 'com.github.yulichang:mybatis-plus-join-boot-starter:最新版本'
```
<br/>

::: warning 注意

MyBatis-Plus-Join 需要配合 MyBatis-plus 3.3.0 及以上的版本使用 
:::


## mapper继承MPJBaseMapper

```java
@Mapper
public interface UserMapper extends MPJBaseMapper<UserDO> {

}
```

## (可选)service继承MPJBaseService

```java
public interface UserService extends MPJBaseService<UserDO> {

}
```

## (可选)serviceImpl继承MPJBaseServiceImpl


```java
@Service
public class UserServiceImpl extends MPJBaseServiceImpl<UserMapper, UserDO> implements UserService {

}
```
