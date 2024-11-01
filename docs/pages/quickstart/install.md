---
tags:
  - 'install'
---

# 安装

全新的 MyBatis-Plus-Join 版本基于 JDK8，提供了 lambda 形式的调用，所以安装集成要求如下：

* JDK 8+
* Maven or Gradle

## Spring Boot

添加依赖

<!--@include: ../../component/version.md-->

::: warning 注意
MyBatis-Plus-Join 需要配合 MyBatis-plus 3.3.0 及以上的版本使用 
:::


## 修改代码

```java
@Mapper
public interface UserMapper extends MPJBaseMapper<UserDO> {

}
```

::: details Service(可选)
```java
public interface UserService extends MPJBaseService<UserDO> {

}
```
:::

::: details ServiceImpl(可选)
```java
@Service
public class UserServiceImpl extends MPJBaseServiceImpl<UserMapper, UserDO> implements UserService {

}
```

::: details Repository(可选) <Badge type="tip" text="MPJ 1.5.2+" /> <Badge type="tip" text="MP 3.5.9+" />
```java
@Repository
public class UserRepository extends JoinCrudRepository<UserMapper, UserDO>  {

}
```
