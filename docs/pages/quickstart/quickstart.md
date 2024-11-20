# 快速开始

我们将通过一个简单的 Demo 来阐述 MyBatis-Plus-Join 的强大功能，在此之前，我们假设您已经：

* 拥有 Java 开发环境以及相应 IDE
* 熟悉 Spring Boot
* 熟悉 MyBatis-Plus
* 熟悉 Maven

## 数据库

现有一张user表和一张address表，其表结构如下：

user

| id | name    | age | email              |
|----|---------|-----|--------------------|
| 1  | Jone    | 18  | `test1@baomidou.com` |
| 2  | Jack    | 20  | `test2@baomidou.com` |
| 3  | Tom     | 28  | `test3@baomidou.com` |
| 4  | Sandy   | 21  | `test4@baomidou.com` |
| 5  | Billie	 | 24  | `test5@baomidou.com` |

address

| id | user_id | city | address |
|----|---------|------|---------|
| 1  | 1       | 北京   | 人民广场    |
| 2  | 2       | 上海   | 人民广场    |
| 3  | 3       | 广州   | 人民广场    |
| 4  | 4       | 上海   | 人民广场    |
| 5  | 5       | 北京   | 人民广场    |

其对应的数据库 Schema 脚本如下：

```sql
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
    id    BIGINT(20) NOT NULL COMMENT '主键ID',
    name  VARCHAR(30) NULL DEFAULT NULL COMMENT '姓名',
    age   INT(11) NULL DEFAULT NULL COMMENT '年龄',
    email VARCHAR(50) NULL DEFAULT NULL COMMENT '邮箱',
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS address;

CREATE TABLE address
(
    id      BIGINT(20) NOT NULL COMMENT '主键ID',
    user_id BIGINT(20) NULL DEFAULT NULL COMMENT '用户id',
    city    VARCHAR(50) NULL DEFAULT NULL COMMENT '城市',
    address VARCHAR(50) NULL DEFAULT NULL COMMENT '地址',
    PRIMARY KEY (id)
);
```

其对应的数据库 Data 脚本如下：

```sql
DELETE
FROM user;

INSERT INTO user (id, name, age, email)
VALUES (1, 'Jone', 18, 'test1@baomidou.com'),
       (2, 'Jack', 20, 'test2@baomidou.com'),
       (3, 'Tom', 28, 'test3@baomidou.com'),
       (4, 'Sandy', 21, 'test4@baomidou.com'),
       (5, 'Billie', 24, 'test5@baomidou.com');

DELETE
FROM address;

INSERT INTO address (id, user_id, city, address)
VALUES (1, 1, '北京', '人民广场'),
       (2, 2, '上海', '人民广场'),
       (3, 3, '广州', '人民广场'),
       (4, 4, '上海', '人民广场'),
       (5, 5, '北京', '人民广场');
```

## 初始化工程
创建一个空的 Spring Boot 工程（工程将以 H2 作为默认数据库进行演示）

::: tip 提示
点此 [Spring Initializer](https://start.spring.io/#!type=maven-project&language=java&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=demo&name=demo&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.demo&dependencies=h2) 可快速初始化一个 Spring Boot 工程
:::

## 添加依赖

引入 MyBatis-Plus-Join Starter 依赖

<!--@include: ../../component/version.md-->

## 配置

在 application.yml 配置文件中添加 H2 数据库的相关配置：

数据源配置

```yaml
# DataSource Config
spring:
  datasource:
    driver-class-name: org.h2.Driver
    username: root
    password: test
  sql:
    init:
      schema-locations: classpath:db/schema-h2.sql
      data-locations: classpath:db/data-h2.sql

```

上面的配置是任何一个 Spring Boot 工程都会配置的数据库链接信息，如果您使用的是其他数据库，如 MySQL，则需要修改相应的配置信息。

在 Spring Boot 启动类中添加 `@MapperScan` 注解，扫描 Mapper 文件夹：

```java
@SpringBootApplication
@MapperScan("com.baomidou.mybatisplus.samples.quickstart.mapper")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```


## 编码

编写实体类 `User.java`、`Address.java` 和自定义查询结果 `UserDTO.java`（此处使用了 Lombok 简化代码）

```java
@Data
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}

@Data
public class Address {
    private Long id;
    private Long userId;
    private String city;
    private String address;
}

/**
 * 自定义resultType
 */
@Data
@ToString
public class UserDTO {
    private Long id;
    private String name;
    private Integer age;
    private String email;

    private String city;
    private String address;
}
```

::: warning 说明
上面的代码中使用了 [Lombok](https://projectlombok.org/) 进行代码生成，如果您不习惯，请自行生成相关 Getter/Setter 方法。
:::

编写 Mapper 包下的 UserMapper接口

```java
@Mapper
public interface UserMapper extends MPJBaseMapper<User> {

}

@Mapper
public interface AddressMapper extends MPJBaseMapper<Address> {

}
```

## 开始使用

添加测试类，进行功能测试：

```java
@SpringBootTest
public class SampleTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testSelect() {
        MPJLambdaWrapper<User> wrapper = new MPJLambdaWrapper<User>()
                .selectAll(User.class)//查询user表全部字段
                .select(Address::getCity, Address::getAddress)
                .leftJoin(Address.class, Address::getUserId, User::getId);

        List<UserDTO> userList = userMapper.selectJoinList(UserDTO.class, wrapper);

        userList.forEach(System.out::println);
    }

}
```

::: danger 注意
MPJLambdaWrapper类的泛型必须是主表类型, 并且要用主表对应的Mapper调用
:::

控制台输出：

```
User(id=1, name=Jone, age=18, email=test1@baomidou.com,city=北京,address=人民广场)
User(id=2, name=Jack, age=20, email=test2@baomidou.com,city=上海,address=人民广场)
User(id=3, name=Tom, age=28, email=test3@baomidou.com,city=广州,address=人民广场)
User(id=4, name=Sandy, age=21, email=test4@baomidou.com,city=上海,address=人民广场)
User(id=5, name=Billie, age=24, email=test5@baomidou.com,city=北京,address=人民广场)
```

::: warning 提示
如遇到异常或报错可参考 [常见问题](../problem)  
若还是无法解决可到GitHub提Issue或添加作者微信咨询
:::

::: tip 提示
完整的代码示例请移步：[Spring Boot 快速启动示例](https://gitee.com/best_handsome/mybatis-plus-join-demo)
:::

## 小结

通过以上几个简单的步骤，我们就实现了 User 表的连表功能，甚至连 XML 文件都不用编写！

从以上步骤中，我们可以看到集成MyBatis-Plus-Join非常的简单，只需要引入 starter 工程即可。

但 MyBatis-Plus-Join 的强大远不止这些功能，想要详细了解 MyBatis-Plus-Join 的强大功能？那就继续往下看吧！
