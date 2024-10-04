---
home: true
heroText: MyBatis-Plus-Join
heroImage: /lg-max.png
actions:
  - text: 快速开始
    link: /pages/quickstart/ksks
    type: primary
  - text: 项目简介
    link: /pages/quickstart/js
    type: secondary

features:
  - title: 润物无声
    details: 只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑。
  - title: 效率至上
    details: 只需简单配置，即可快速进行连表操作，从而节省大量时间。
  - title: 丰富功能
    details: 支持列枚举, 别名, 逻辑删除, TypeHandle, 一对一, 一对多等功能。

footer: Apache Licensed | Copyright © 2022-2024
---

<br/>
<br/>

## 当前 MyBatis-Plus-Join 最新版本

::: code-tabs

@tab Maven

```xml :no-line-numbers
<dependency>
    <groupId>com.github.yulichang</groupId>
    <artifactId>mybatis-plus-join-boot-starter</artifactId>
    <version>1.5.0</version>
</dependency>
```

@tab Gradle

```gradle :no-line-numbers
//Gradle
implementation group: 'com.github.yulichang', name: 'mybatis-plus-join-boot-starter', version: '1.5.0'
//Gradle short
implementation 'com.github.yulichang:mybatis-plus-join-boot-starter:1.5.0'
//Gradle kotlin
implementation("com.github.yulichang:mybatis-plus-join-boot-starter:1.5.0")
```

@tab Test

```java
package com.github.yulichang.test.join.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.github.yulichang.annotation.Table;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.Map;

@Table
@Data
@ToString
@Accessors(chain = true)
@TableName(value = "tablea", autoResultMap = true)
public class TableA {

    @TableId
    private Integer id;

    @TableField(typeHandler = JacksonTypeHandler.class)
    private Map<String, Integer> mapCol;

    @TableField(typeHandler = JacksonTypeHandler.class)
    private Inner entryCol;

    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> listCol;

    @Data
    @ToString
    public static class Inner{
        private String name;
    }
}
```

@tab js

```js
document.getElementById("aa")
```

:::



<br />

## 代码托管

[Github](https://github.com/yulichang/mybatis-plus-join) | [Gitee](https://gitee.com/best_handsome/mybatis-plus-join)

## 友情链接

[MyBatis-Plus](https://baomidou.com/)
