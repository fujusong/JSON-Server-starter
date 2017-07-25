# JSON-Server-starter
how to use JSON Server in project.
在开发过程中，前后端不论是否分离，接口多半是滞后于页面开发的。所以建立一个REST风格的API接口，给前端页面提供虚拟的数据，是非常有必要的。JSON Server 是基于Express开发的。


```
npm install json-server -g
json-server db.json -p 3003
```

本实例运行,先安装依赖

```
npm run install
```

然后运行静态实例，

```
npm run server 
```
或者运行动态实例

```
npm run dserver 
```
静态实例访问

```
Get http://localhost:3003/list
POST http://localhost:3003/list
```

支持增删查改及部分更新

```
GET    /list  获取列表
GET    /list/1 获取id=1的数据
POST   /list   创建一个项目
PUT    /list/1 更新一个id为1的数据
PATCH  /list/1 部分更新id为1的数据
DELETE /list/1 删除id为1的数据
```

查询

```
http://localhost:3003/list?id=3
http://localhost:3003/list?tel=15223810923&&name=%E6%9D%8E%E5%9B%9B
```

翻页

```
http://localhost:3003/list?_page=2&_limit=2
```
自定义挂载点

```js
server.use("/api",router);
```

自定义header

```js
server.use((req, res, next) => {
     res.header('X-Hello', 'World');
     next();
})
```
自定义返回结构

```js
router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data,
    code: 0
  })
}
```

> vue项目设置本地代理，在`config/index.js`
>
```
proxyTable: {
      '/api': {
        target: 'http://127.0.0.1:3003',
        changeOrigin: false
      }
  }
```

详细参考[http://www.jianshu.com/p/ebb823bfbcb2](http://www.jianshu.com/p/ebb823bfbcb2)，复杂开发参考Express



