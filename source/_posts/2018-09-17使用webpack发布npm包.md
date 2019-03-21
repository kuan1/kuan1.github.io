---
title: 使用webpack发布npm包
date: 2018-09-17 10:21:30
---
## 一、前言
使用npm来管理自己常用的工具类和组件使用和维护起很方便

### 先附上一个简单的npm包案例地址
[kuan-utils的github地址，可借鉴webpack配置](https://github.com/kuan1/kuan-utils#readme)


## 二、第一步npm申请账号
npm地址官网地址：[https://www.npmjs.com/](https://www.npmjs.com/)

申请步骤略过

## 三、制作自己的npm包
> webpack配置需要注意的问题 ==>[webpack配置地址示例](https://github.com/kuan1/kuan-utils/tree/master/build)

1. 发布的包应该是经过babel转义之后的
如果直接引用src下边编译之前的代码，使用包的项目打包上线，这个包下边的代码是没有被babel转化的，可能会出现兼容问题

比如webpack输出的代码输出到根目录下的lib中，可以在packapge.json添加一个`"main": "lib/打包文件`, 使用这个包的时候就会引入lib下的这个文件。不设置默认根目录下的index

2. 不应该将node_module中的依赖打包进入项目
可以在webpack中使用使用`webpack-node-externals`这个包，可以在打包的时候将node_module忽略掉，webpack配置中加入：

	```
	externals: [nodeExternals()],
	```


3. webpack.output.libraryTarget设置成commonjs2

## 四、发布

### 本地测试  
npm run build
npm link #当前项目
npm link 【package.json名字】#测试文件夹

#### 项目根目录输入命令：
```
npm login # 登陆（这个时候不能使用淘宝镜像）

npm publish # 输入账号、密码、邮箱登陆成功之后，输入这个命令就发布成功了

```

## 可能会碰到的问题：
1. 登陆失败？设置原npm地址 输入`npm config set registry   https://registry.npmjs.org/ `,然后重试
2. 版本冲突，修改版本号重试
```
npm version major # 大版本更新
npm version minor # 比较大的更新
npm version patch # 不影响功能的小改动
```
  