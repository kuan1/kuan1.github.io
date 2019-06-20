---
title: Hello VuePress
date: 2019-06-08 20:54:29
---
# hello VuePress!

[hello VuePress](https://www.kuan1.top/test-vuepress/)

[vuepress 官方文文档](https://v1.vuepress.vuejs.org)


## 安装和配置

### 安装和使用
```bash
# 安装
vuepress install -g vuepress

# 开发（开发文件夹docs）
npm dev docs

# 编译
vuepress build docs
```

## 目录结构
```
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json

```
- docs/.vuepress: 用于存放全局的配置、组件、静态资源等。
- docs/.vuepress/components: 该目录中的 Vue 组件将会被自动注册为全局组件。
- docs/.vuepress/theme: 用于存放本地主题。
- docs/.vuepress/styles: 用于存放样式相关的文件。
- docs/.vuepress/styles/index.styl: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
- docs/.vuepress/styles/palette.styl: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
- docs/.vuepress/public: 静态资源目录。
- docs/.vuepress/templates: 存储 HTML 模板文件。
- docs/.vuepress/templates/dev.html: 用于开发环境的 HTML 模板文件。
- docs/.vuepress/templates/ssr.html: 构建时基于 Vue SSR 的 HTML 模板文件。
- docs/.vuepress/config.js: 配置文件的入口文件，也可以是 YML 或 toml。
d- ocs/.vuepress/enhanceApp.js: 客户端应用的增强。

## 默认路由
文件的相对路径 | 页面路由地址
---|---
/README.md | /
/guide/README.md | /guide/
/config.md | /config.html

## 基础配置
```js
// .vuepress/config.js
module.exports = {
  title: 'Hello VuePress', // 导航title
  description: 'Just playing around', // 网页描述
  themeConfig: {
    nav: [ // 导航链接
      { text: '首页', link: '/' },
      {
        text: '指导', items: [
          { text: '基础', link: '/guide/' },
          { text: '配置', link: '/config/' }
        ]
      },
      { text: 'Github', link: 'https://github.com/kuan1/test-vuepress' },
    ],
    sidebar: {
      '/guide/': [
        '',
      ],
      '/config/': [
        '',
      ]
    }
  }
}
```

## 静态资源
```md
![An image](./image.png)
```

## 配置别名
```md
![Image from alias](~@alias/image.png)
![Image from dependency](~some-dependency/image.png)
```
```js
// .vuepress/config.js
module.exports = {
 configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}
```

## 公共文件
`.vuepress/public`

## 基础路径
```html
<img :src="$withBase('/foo.png')" alt="foo">
```

# markdown使用vue

.vuepress/components 会被全局注入组件，markdown中写入组件名字

```
<test />
```

<test />
  