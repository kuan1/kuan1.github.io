---
title:  js实现语音朗读
date: 2018-06-18
---
## js实现语音朗读
> [文章原文](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651554403&idx=2&sn=b62cd169e41d5d580fcd4eacbec71d41&chksm=802555a2b752dcb47f68ba6a4c4d0dc7214e00fb3f4cca9b6ff5397d2e3d560e60837ac92810&mpshare=1&scene=1&srcid=0618V8L9hIrFkOfyUQ2WXJUx#rd)

```
<!doctype html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport'
        content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
  <meta http-equiv='X-UA-Compatible' content='ie=edge'>
  <title>测试语音合成</title>
</head>
<body>
<button id='play'>播放</button>
<button id='stop'>停止</button>
<script>
  const speaker = new window.SpeechSynthesisUtterance()

  // 播放语音
  function speak(text) {
    speaker.text = text
    window.speechSynthesis.speak(speaker)
  }

  // 停止语音
  function stop() {
    window.speechSynthesis.cancel()
  }

  document.querySelector('#play').onclick = () => speak('编号是：1234567890123415413512341')
  document.querySelector('#stop').onclick = stop

</script>
</body>
</html>
```

  