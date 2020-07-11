---
title: mac使用electron-builder打包exe文件踩坑笔记
date: 2020-01-07 12:06:41
---
### 问题一、electron-builder part download request failed with status code 403
> electron-builder打包需要从github上拉取一直文件，但是经常会卡死在这个页面

####  方案一：命令行翻墙
使用shadowsocks设置全局代理之后，在命令行中输入
```bash
export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;
# 其他命令...
```
####  方案二：下载`winCodeSign`、`wine`后手动解压到`～Library/Caches/electron-builder`
```bash
# https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.4.0/winCodeSign-2.4.0.7z
# https://github.com/electron-userland/electron-builder-binaries/releases/download/wine-2.0.3-mac-10.13/wine-2.0.3-mac-10.13.7z
# https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.3.2/nsis-3.0.3.2.7z
# https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-resources-3.3.0/nsis-resources-3.3.0.7z
```
####  最终目录结构
```
.
+-- nsis
|   +-- nsis-3.0.3.2
|   +-- nsis-resources-3.3.0
+-- winCodeSign
|   +-- winCodeSign-2.4.0
+-- wine
|   +-- wine-2.0.3-mac-10.13
```

### 问题二、wine-home is not owned by you
####  第一次尝试
```bash 
electron-builder --win --x64
# 发生错误： EACCES: permission denied, unlink
```

####  第二次尝试
```bash
sudo electron-builder --win --x64
# 发生错误 wine-home is not owned by you
```
####  第三次尝试，解决问题 
> 添加sudo后当前执行用户是root，所以要给wine-home添加权限

```
sudo chown -R root ~/Library/Caches/electron-builder/wine/wine-2.0.3-mac-10.13/wine-home
sudo electron-builder --win --x64
```
  