---
title: nuxt在组件外部使用$router、$route、$store
date: 2019-04-09 10:53:15
---
## nuxt在组件外部使用$router、$route、$store
> 有些业务需求，需要在客户端根据业务场景需要控制路由或者访问vuex store

```
// 客户端根据接口返回条件重定向登陆
aysnc function test () {
    // 判断是浏览器环境使用
    if (typeof window === 'undefined') return
    
    // 通过window.$nuxt访问router、store
    const {$router, $store} = window.$nuxt
    
    // 根据条件跳转路由
    const res = await request($store.state.data) // ...
    if (res.aaa) {
        $router.push({name: 'login'})
    }
}

```
  