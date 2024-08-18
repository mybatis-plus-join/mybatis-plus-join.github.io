# 链式调用

通过wrapper直接查询 参考MP的 LambdaQueryChainWrapper

## one() 
  返回一个主表实体
  ```java
    User user = wrapper.one();
  ```
## one(xxx.class) 
  返回一个自定义的实体
  ```java
    UserDTO dtp = wrapper.one(UserDTO.class);
  ```
## first() 
  返回第一个主表实体（先调用list，再取第一个）
  ```java
    User user = wrapper.first();
  ```
## first(xxx.class) 
  返回第一个自定义的实体（先调用list，再取第一个）
  ```java
    UserDTO dtp = wrapper.first(UserDTO.class);
  ```
## list() 
  返回主表实体的List
  ```java
    List<User> list = wrapper.list();
  ```
## list(xxx.class) 
  返回自定义实体的List
  ```java
    List<UserDTO> dtoList = wrapper.list(UserDTO.class);
  ```
## page(page) 
  分页查询主表
  ```java
    Page<User> page = wrapper.page(new Page(1, 10));
  ```
## page(page, xxx.class) 
  分页查询自定义实体类
  ```java
    Page<UserDTO> page = wrapper.page(new Page(1, 10), UserDTO.class);
  ```
