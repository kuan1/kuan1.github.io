---
title: css媒体查询
date: 2016-09-17 06:27:05
---
```
<link rel='stylesheet' type='text/css' media='screen and (max-width:960px)' href='style.css'>
<style>
@media screen and (min-width:960px) and (max-width:1200px){
body{background:yellow;}
}
</style>

```
- width:浏览器可视宽度。
- height:浏览器可视高度。
- device-width:设备屏幕的宽度。
- device-height:设备屏幕的高度。
- orientation:检测设备目前处于横向还是纵向状态。
- aspect-ratio:检测浏览器可视宽度和高度的比例。(例如：aspect-ratio:16/9)
- device-aspect-ratio:检测设备的宽度和高度的比例。
- color:检测颜色的位数。（例如：min-color:32就会检测设备是否拥有32位颜色）
- color-index:检查设备颜色索引表中的颜色，他的值不能是负数。
- monochrome:检测单色楨缓冲区域中的每个像素的位数。（这个太高级，估计咱很少会用的到）
- resolution:检测屏幕或打印机的分辨率。(例如：min-resolution:300dpi或min-resolution:118dpcm)。
- grid:检测输出的设备是网格的还是位图设备。
  