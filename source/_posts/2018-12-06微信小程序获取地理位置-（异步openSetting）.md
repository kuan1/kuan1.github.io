---
title: 微信小程序获取地理位置 （异步openSetting）
date: 2018-12-06 18:04:03
---
> 微信小程序打开设置，不可以写在异步方法中，但是可以通过confirm中的success的回掉中。通过封装，同样可以实现异步操作

```js
import authority from '@/utils/authority'
import setting from '@/utils/setting'

const defaultAddress = {
  region_code: '320500',
  latitude: 31.28339,
  longitude: 120.60413
}

// 获取定位前价检查定位
async function beforeGetLocation() {
  const authSetting = await setting.get()
  if (authSetting['scope.userLocation'] !== false) {
    return true
  }
  return new Promise(resolve => {
    wx.showModal({
      title: '定位失败',
      content: '请打开位置授权',
      success(res) {
        if (res.confirm) {
          setting.open('userLocation', isSuccess => {
            if (isSuccess) {
              resolve(true)
            } else {
              resolve(false)
            }
          })
        } else {
          resolve(false)
        }
      }
    })
  })
}

// 错误处理
export function getLocationError() {
  authority.set(defaultAddress)
  return defaultAddress
}

// 获取地理位置
export async function getLocation() {
  const hasAUth = await beforeGetLocation()
  if (!hasAUth) {
    return getLocationError()
  }
  return new Promise(resolve => {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/', // 腾讯地图api
          data: { 
            location: `${res.latitude},${res.longitude}`,
            key: ''
          },
          success({ data: { status, result } }) {
            if (status) {
              console.error('定位失败')
              return getLocationError()
            }
            const {
              ad_info: { city, adcode }
            } = result
            res.region_code = Math.floor(adcode / 100) * 100

            const { region_code, latitude, longitude } = res
            const user = region_code
              ? { region_code, latitude, longitude, city }
              : defaultAddress
            authority.set(user)
            resolve(res)
          },
          fail(e) {
            console.error(e)
            resolve(getLocationError())
          }
        })
      },
      fail(e) {
        console.error(e)
        resolve(getLocationError())
      }
    })
  })
}

export default {
  get: getLocation
}

```
  