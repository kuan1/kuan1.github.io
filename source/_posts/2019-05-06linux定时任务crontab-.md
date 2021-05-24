---
title: linux定时任务crontab 
date: 2019-05-06 12:22:25
---
### 定时任务编辑 
```bash
# 会使用vim打开编辑页面
crontab -e
# 查看用户定时任务
crontab -l
# 查看定时任务日志
tail -f /var/log/cron
```

```bash
# 打开编辑页面
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * command to be executed
```


### 例子
```bash
# 每分钟刷新接口数据
0 7 * * * curl "https://www.luzhongkuan.cn/api/todayEnglish" >> /root/a.log 2>&1 &
```
  
  