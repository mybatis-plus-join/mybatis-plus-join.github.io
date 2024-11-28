---
tags:
  - 'install'
---

# 安装

全新的 MyBatis-Plus-Join 版本基于 JDK8，提供了 lambda 形式的调用，所以安装集成要求如下：

* JDK 8+
* Maven or Gradle

## 添加依赖

<!--@include: ../../component/version.md-->

## 修改代码

```java
@Mapper
public interface UserMapper extends MPJBaseMapper<User> {

}
```

::: warning 提示
如遇到异常或报错可参考 [常见问题](../problem)  
若还是无法解决可到GitHub提Issue或添加作者微信咨询
:::

::: details Service(可选)
```java
public interface UserService extends MPJBaseService<User> {

}
```
:::

::: details ServiceImpl(可选)
```java
@Service
public class UserServiceImpl extends MPJBaseServiceImpl<UserMapper, User> implements UserService {

}
```
:::

::: details Repository(可选) <Badge type="tip" text="MPJ 1.5.2+" /> <Badge type="tip" text="MP 3.5.9+" />
```java
@Repository
public class UserRepository extends JoinCrudRepository<UserMapper, User>  {

}
```
:::
