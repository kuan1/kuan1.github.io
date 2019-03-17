---
title: 微信分享sdk升级 1.4.0
date: 2018-12-20
---
官网地址：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115



```
import { isWx } from './validate'
import axios from 'axios'

// 加载sdk
let PromiseSDK
function loadWechatJSSDK() {
  if (PromiseSDK) {
    return PromiseSDK
  }
  // 短时间内,多次调用时; 避免重复加载
  PromiseSDK = new Promise((resolve, reject) => {
    const loaded = typeof wx !== 'undefined'
    if (loaded) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = '//res.wx.qq.com/open/js/jweixin-1.4.0.js '
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
  return PromiseSDK
}

// 获取分享配置
async function getConfig() {
  await loadWechatJSSDK()
  const href = window.location.href.split('#')[0]
  const { data } = await axios({
    url: `//api.luzhongkuan.cn/wx/share?url=${encodeURIComponent(href)}`
  })
  if (data.success) {
    return data.data
  }
  return Promise(Error('获取分享配置失败'))
}

// 分享内容，分享配置
export default async (userShareData, userConfig) => {
  if (!isWx) return
  const defaultShare = {
    title: '没有标题', // 分享标题
    desc: '这里没有描述', // 分享描述
    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: 'http://lib.luzhongkuan.cn/images/logo.png' // 分享图标
  }
  // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  // appId: '', // 必填，公众号的唯一标识
  // timestamp: , // 必填，生成签名的时间戳
  // nonceStr: '', // 必填，生成签名的随机串
  // signature: '',// 必填，签名
  // jsApiList: [] // 必填，需要使用的JS接口列表
  let config = userConfig || (await getConfig())
  wx.config(config)
  wx.ready(() => {
    const shareData = { ...defaultShare, ...userShareData }
    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
    wx.updateAppMessageShareData(shareData)
    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
    wx.updateTimelineShareData(shareData)
  })
}

```


1. 原有的 wx.onMenuShareTimeline、wx.onMenuShareAppMessage、wx.onMenuShareQQ、wx.onMenuShareQZone 接口，即将废弃。请尽快迁移使用客户端6.7.2及JSSDK 1.4.0以上版本支持的 wx.updateAppMessageShareData、updateTimelineShareData 接口。
1. 14.0分享成功回掉是微信分享配置成功的回掉，“分享监听”能力调整 https://developers.weixin.qq.com/community/develop/doc/0000447a5b431807af57249a551408?highLine=%25E5%2588%2586%25E4%25BA%25AB%25E5%259B%259E%25E8%25B0%2583
  