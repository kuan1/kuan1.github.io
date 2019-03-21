---
title: WebViewJavascriptBridge使用
date: 2018-10-08 18:27:32
---
> 重写了app通信的方法，中间碰到了一些兼容问题，看了很多资料，最终确定版，兼容性好&&使用方便

## app通信WebViewJavascriptBridge方法使用
```
// 注册方法获取WebViewJavascriptBridge对象
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  // 兼容安卓
  document.addEventListener(
    'WebViewJavascriptBridgeReady',
    () => callback(window.WebViewJavascriptBridge),
    false
  )
  // 兼容ios
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

//  获取WebViewJavascriptBridge对象
function getBirdge() {
  return new Promise(resolve => {
    if (window.WebViewJavascriptBridge) {
      return resolve(window.WebViewJavascriptBridge)
    }
    setupWebViewJavascriptBridge(bridge => {
      alert(1)
      resolve(bridge)
    })
  })
}

// 重写之后的birdge
const bridge = {
  ctx: null, // WebViewJavascriptBridge
  callHandler(data) {
    return new Promise(async resolve => {
      if (!this.ctx) {
        this.ctx = await getBirdge()
      }
      // 根据业务场景重写数据
      data.data = JSON.stringify(data.data)
      this.ctx.callHandler('commonActionV2', data, res => resolve(res))
    })
  },
  registerHandler(jsHandlerName) {
    // 重写事件注册方法
    this.ctx.registerHandler(jsHandlerName, (data, callback) => {
      if (callback) {
        callback(
          `返回一个字符串，告诉ObjC：我已收到数据${JSON.stringify(data)}`
        )
      }
    })
  }
}

export default bridge

```


## 使用
```
/**
 * 获取状态栏高度
 * return {Promise}
 */
export function getBarHeight() {
  return bridge.callHandler({
    action: 'halo_ui_statusbar',
    data: { get_height: 1 }
  })
}

```
  