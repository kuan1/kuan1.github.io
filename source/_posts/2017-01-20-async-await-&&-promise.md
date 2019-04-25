---
title:  async/await && promise
date: 2017-01-20 13:19:04
---
```
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <title>Document</title>
</head>
<body>
  <script>
    function test(num) {
      return new Promise((resove, reject) => {
        setTimeout(() => {
          let random = Math.floor(Math.random() * 100);
          if (num > random) {
            resove('成功' + num + ',' + random);
          } else {
            reject('失败' + num + ',' + random);
          }
        }, 1000)
      });
    }
    (async () => {
     let  res = await test(50);
     console.log(res);
   })()
 </script>
</body>
</html>
```
  