# 快速开始


我们将通过一个简单的 Demo 来阐述 MyBatis-Plus-Join 的强大功能，在此之前，我们假设您已经：

* 拥有 Java 开发环境以及相应 IDE
* 熟悉 Spring Boot
* 熟悉 MyBatis-Plus
* 熟悉 Maven

### 现有一张user表和一张address表，其表结构如下：

user

| id  | name    | age | email              |
|-----|---------|-----|--------------------|
| 1   | Jone    | 18  | test1@baomidou.com |
| 2   | Jack    | 20  | test2@baomidou.com |
| 3   | Tom     | 28  | test3@baomidou.com |
| 4   | Sandy   | 21  | test4@baomidou.com |
| 5   | Billie	 | 24  | test5@baomidou.com |

address

| id  | user_id | city | address |
|-----|---------|------|---------|
| 1   | 1       | 北京   | 人民广场    |
| 2   | 2       | 上海   | 人民广场    |
| 3   | 3       | 广州   | 人民广场    |
| 4   | 4       | 上海   | 人民广场    |
| 5   | 5       | 北京   | 人民广场    |

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

### 问题

如果从零开始用 MyBatis-Plus-Join 来实现该表的增删改查我们需要做什么呢？

初始化工程
创建一个空的 Spring Boot 工程（工程将以 H2 作为默认数据库进行演示）

### 提示

可以使用 Spring Initializer 快速初始化一个 Spring Boot 工程

### 添加依赖

引入 Spring Boot Starter 父工程：

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.0+ 版本</version>
    <relativePath/>
</parent>
```

引入 spring-boot-starter、spring-boot-starter-test、mybatis-plus-boot-starter、h2 依赖：

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>com.github.yulichang</groupId>
        <artifactId>mybatis-plus-join-boot-starter</artifactId>
        <version>最新版本</version>
    </dependency>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>最新版本</version>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

###  配置
在 application.yml 配置文件中添加 H2 数据库的相关配置：

数据源配置

```yaml
spring:
  datasource:
  driver-class-name: org.h2.Driver
  schema: classpath:db/schema-h2.sql
  username: root
  password: test
  sql:
    init:
      schema-locations: classpath:db/schema-h2.sql
      data-locations: classpath:db/data-h2.sql

```

在 Spring Boot 启动类中添加 @MapperScan 注解，扫描 Mapper 文件夹：

```java
@SpringBootApplication
@MapperScan("com.baomidou.mybatisplus.samples.quickstart.mapper")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```

###  编码
编写实体类 User.java、Addser.java和自定义resultType UserDTO.java（此处使用了 Lombok 简化代码）

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

编写 Mapper 包下的 UserMapper接口

```java
@Mapper
public interface UserMapper extends MPJBaseMapper<User> {

}

@Mapper
public interface AddressMapper extends MPJBaseMapper<Address> {

}
```

###  开始使用

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
                .select(AddressDO::getCity, AddressDO::getAddress)
                .leftJoin(AddressDO.class, AddressDO::getUserId, User::getId);

        List<UserDTO> userList = userMapper.selectJoinList(UserDTO.class, wrapper);

        userList.forEach(System.out::println);
    }

}
```
::: tip 提示
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

###  提示

完整的代码示例请移步：[Spring Boot 快速启动示例](https://gitee.com/best_handsome/mybatis-plus-join-demo)

###  小结

通过以上几个简单的步骤，我们就实现了 User 表的连表功能，甚至连 XML 文件都不用编写！

从以上步骤中，我们可以看到集成MyBatis-Plus-Join非常的简单，只需要引入 starter 工程即可。

但 MyBatis-Plus-Join 的强大远不止这些功能，想要详细了解 MyBatis-Plus-Join 的强大功能？那就继续往下看吧！
