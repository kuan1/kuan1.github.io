---
title: kuan-koa项目结构
date: 2017-02-25
---
#### 项目结构

![image](http://qiniu.kuan1.top/luzhongkuan/1517388304095.png)

#### request中间件

```
module.exports = async function (ctx, next) {
  try {
    await next();

    ctx.body = ctx.body ? ctx.body : {
      success: ctx.state.code === undefined,
      data: ctx.state.data !== undefined ? ctx.state.data : {}
    };
  } catch (e) {
    // catch 住全局的错误信息
    console.log('Catch Error: %o', e);

    // 设置状态码为 200 - 服务端错误
    ctx.status = 200;

    ctx.body = {
      success: false,
      error: e && e.message ? e.message : e.toString()
    };
  }
};

```

#### controller index.js
```
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

/**
 * 映射 d 文件夹下的文件为模块
 */
const mapDir = d => {
  const tree = {};

  // 获得当前文件夹下的所有的文件夹和文件
  const [dirs, files] = _(fs.readdirSync(d)).partition(p => fs.statSync(path.join(d, p)).isDirectory());

  // 映射文件夹
  dirs.forEach(dir => {
    tree[dir] = mapDir(path.join(d, dir));
  });

  // 映射文件
  files.forEach(file => {
    if (path.extname(file) === '.js') {
      tree[path.basename(file, '.js')] = require(path.join(d, file));
    }
  });

  return tree;
};

// 默认导出当前文件夹下的映射
module.exports = mapDir(path.join(__dirname));

```

#### 路由 index.js
```
const router = require('koa-router')();
const path = require('path');
const bodyParser = require('koa-bodyparser');
const response = require(path.join(__dirname, '../middlewares/response.js'));
const pageRouter = require('./pageTemplate');
const pageConfig = require(path.join(__dirname, '../pageConfig.js'));
const controller = require(path.join(__dirname, '../controller'));

const qn = require(path.join(__dirname, 'qn'));
const api = require(path.join(__dirname, 'api'));

router.use(response);
router.use(pageConfig);

router.get('/', controller.page.home);

// api
router.use('/qn', qn.routes());

router.use('/api', bodyParser(), api.routes());

// page router
router.get('/**', pageRouter);

module.exports = router;

```

#### api的路由

```
const router = require('koa-router')();
const path = require('path');

const controller = require(path.resolve(__dirname, '../controller'))

router.get('/test', controller.test);

module.exports = router;

```
  