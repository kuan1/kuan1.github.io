---
title: windows设置免密码登陆linux
date: 2018-03-11 17:45:48
---
## windows
1. 安装git（gitbash可以试用ssh，scp等）
2. `ssh-keygen -t rsa -C '邮箱'` ，然后三下enter键
3. 在当前用户文件夹`～/ssh`下找到`id_rsa.pub`，复制文件内容

## linux
1. 检查用户文件夹（root）的.ssh有没有`authorized_keys`，没有话手动创建
2. `vi authorized_keys`，讲上边`id_rsa.pub`内容粘贴过来，`wq`退出
3. 重启ssh服务`service sshd restart`

> NaNundefined在云服务器 ECS Linux CentOS 7 下重启服务不再通过 service，[Redirecting to /bin/systemctl restart sshd.service]，使用下边命令  


```
    1. systemctl start sshd.service
   
    2. systemctl restart sshd.service
    
    3. systemctl enable sshd.service
```

  