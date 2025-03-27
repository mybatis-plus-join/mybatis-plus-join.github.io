# 链式调用

通过wrapper直接查询 参考MP的 LambdaQueryChainWrapper

## one() 
  返回一个主表实体
  ```java
  User user = wrapper.one();
  ```
## one(class) 
  返回一个自定义的实体
  ```java
  UserDTO dtp = wrapper.one(UserDTO.class);
  ```
## first() 
  返回第一个主表实体  
  <s>先调用list，再取第一个</s> <Badge type="danger" text="1.4.13-" vertical="top" />  
  使用分页逻辑（Page(1,1)）<Badge type="tip" text="1.5.0+" vertical="top" />
  ```java
  User user = wrapper.first();
  ```
## first(class) 
  返回第一个自定义的实体    
  <s>先调用list，再取第一个</s> <Badge type="danger" text="1.4.13-" vertical="top" />  
  使用分页逻辑（Page(1,1)）<Badge type="tip" text="1.5.0+" vertical="top" />
  ```java
  UserDTO dto = wrapper.first(UserDTO.class);
  ```
## list() 
  返回主表实体的List
  ```java
  List<User> list = wrapper.list();
  ```
## list(class) 
  返回自定义实体的List
  ```java
  List<UserDTO> list = wrapper.list(UserDTO.class);
  ```
## page(page) 
  分页查询主表
  ```java
  Page<User> page = wrapper.page(new Page(1, 10));
  ```
## page(page, class) 
  分页查询自定义实体类
  ```java
  Page<UserDTO> page = wrapper.page(new Page(1, 10), UserDTO.class);
  ```
## mapOne <Badge type="tip" text="1.5.0+" vertical="top" />
  返回一个`Map<String, Object>`对象  
  ```java
  Map<String, Object> one = wrapper.mapOne();
  ```
## mapFirst <Badge type="tip" text="1.5.0+" vertical="top" />
  返回第一个`Map<String, Object>`对象，使用分页逻辑Page(1,1)  
  ```java
  Map<String, Object> first = wrapper.mapFirst();
  ```
## mapList <Badge type="tip" text="1.5.0+" vertical="top" />
  返回一个`List<Map<String, Object>>`对象  
  ```java
  List<Map<String, Object>> list = wrapper.mapList();
  ```
## mapPage <Badge type="tip" text="1.5.0+" vertical="top" />
  分页查询
  ```java
  Page<Map<String, Object>> page = wrapper.mapPage(new Page(1, 10));
  ```
