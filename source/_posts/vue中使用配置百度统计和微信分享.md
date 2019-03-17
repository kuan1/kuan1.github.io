---
title: vue中使用配置百度统计和微信分享
date: 2018-06-27
---
微信1.4.0sdk分享 https://www.luzhongkuan.cn/detail/167

#### 在路由的钩子函数中使用百度统计和微信分享
> 中间延迟300毫秒为了拿到正确的路径

```
import wechatShare from '@/utils/wx/share'
import statistics from './statistics' // 统计

router.afterEach((route) => {
  // 设置路由title
  if (route.meta.title) {
    setTitle(route.meta.title)
  }

  // 拿到正确的路径，多以添加延迟
  setTimeout(() => {
    statistics(route.fullPath) // 百度统计

    // 分享
    if (route.name === 'userBuyTickets' || route.name === 'userRushBuy') {
      wechatShare({ link: window.location.href })
    } else {
      wechatShare()
    }
  }, 300)

  NProgress.done()
})
```

#### 百度统计
```
// 百度统计
const baiduAnalytics = (href) => {
  if (typeof _hmt === 'undefined') {
    // 服务端渲染时候, _hmt 是 undefined
    return;
  }
  _hmt.push(['_trackPageview', href]);
};

export default (href) => {
  baiduAnalytics(ref);
};

```

#### 微信分享
> 分享到朋友圈没有标题，分享到朋友有标题和表述，所以配置分享朋友圈的时候使用分享朋友的描述，防止分享朋友圈内容过短（注意：最近看到微信文档上说可能会下线分享功能）

```
// 微信分享, 使用方法 【loadWechatJSSDK动态引入微信sdk js文件，getWechatConfig获取需要注入的参数】
import { loadWechatJSSDK, isWechat, getWechatConfig } from './tools';

// 微信分享的默认数据
const getDefaultData = () => ({
  title: '', // 分享标题
  desc: '', // 分享描述
  link: window.location.origin, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: '', // 分享图标
  type: 'link', // 分享类型,music、video 或 link，不填默认为link
  dataUrl: '', // 如果 type 是 music 或 video，则要提供数据链接，默认为空
  success() {}, // 用户确认分享后执行的回调函数
  cancel() {}, // 用户取消分享后执行的回调函数
});

// 分享到朋友圈
function menuShareTimeline(shareConfig) {
  const { title, link, imgUrl, success } = shareConfig;
  const timeLineConfig = {
    title, // 分享标题
    link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl, // 分享图标
    success, // 用户确认分享后执行的回调函数
  };
  wx.onMenuShareTimeline(timeLineConfig);
}

// 分享给朋友
function menuShareAppMessage(shareConfig) {
  const {
    title,
    link,
    imgUrl,
    success,
    cancel,
    desc,
    type,
    dataUrl,
  } = shareConfig;
  const appMsgConfig = {
    title, // 分享标题
    desc, // 分享描述
    link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl, // 分享图标
    type, // 分享类型,music、video 或 link，不填默认为link
    dataUrl, // 如果 type 是 music 或 video，则要提供数据链接，默认为空
    success, // 用户确认分享后执行的回调函数
    cancel, // 用户取消分享后执行的回调函数
  };
  // 注意: 下个微信版本, 会取消[分享成功, 分享失败]的回调;
  wx.onMenuShareAppMessage(appMsgConfig); // 分享给朋友
}

// 微信分享 export default
export default async function wechatShare(shareData) {
  if (!isWechat) {
    // 服务器渲染时也是非微信浏览器, 非微信浏览器 不进行微信分享
    return;
  }
  // 同时获取 微信签名, 和 微信 JS-SDK
  const [wechatConfig] = await Promise.all([
    getWechatConfig(),
    loadWechatJSSDK(),
  ]);
  wx.config(wechatConfig); // 配置微信参数, 为 jsapi 授权
  const shareConfig = { ...getDefaultData(), ...shareData };
  wx.ready(() => {
    menuShareTimeline(shareConfig); // 分享到朋友圈
    menuShareAppMessage(shareConfig); // 分享给朋友
  });
}

```
  