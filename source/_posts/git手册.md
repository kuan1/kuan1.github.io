---
title: git手册
date: 2016-06-18 17:10:21
---
## - git手册
#### - git简介
>  git是分布式，svn是集中式

#### git基础操作
- mkdir + 文件名字：创建文件夹 
- rm + 文件名字：删除文件 
- git rm + 文件名字：删除版本库文件 
- git rm _rf：删除版本库中全部的文件 
- ls -all/ls -a列出当前文件 
- git init：初始化git仓库 
- git add 文件名字/*/.：将文件追加到git管理中/全部添加/全部添加 
- git commit 文件名 -m“注释”：将文件提交到git本地仓库中 
- git commit -a -m'注释'：将所有文件提交到本地仓库 
- git commit --amend -m'注释'：作为最新的提交覆盖上一次commit记录 
- git status：查看git仓库状态 
- git diff：查看修改 
- git log：查看日志 
- git reflog：查看过期日志 
- git reset --hard HEAD^：返回上级（获取加版本号） 
- git reset --:暂存区恢复 
- git checkout --文件名字（*）：撤销修改 
- git rm -fr --cache 文件名称：删除git管理

#### git远程操作:
- git clone git@github.com:kuan1/test.git ：克隆（ssh协议）
- git config --global user.name 'Your Name'
- git config --global user.email 'email@example.com'
- git init：初始化
- git remote add origin 远程地址：关联远程仓库
- git pull origin master：下载远程代码
- git pull --rebase origin master:下载并以远程代码为基础合并
- git push -u origin master:推送到远程仓库
#### 配置ssh秘钥：
- ○ ssh-keygen -t rsa -C 'luzhongk@126.com' ：（在git bash中打开bin目录下打开输入）
- ○ 完成后个人账户的文件夹中可以找到id_rsa和id_rsa_pub 
- ○ 将id_rsa_pub中内容复制到github中的ssh keys 
- ○ ssh协议相对快，临时使用适合https 
- git协助：
- git remote：判断并显示远程仓库 
- git remote show origin：显示远程仓库地址git 
- 常见解决方案
- ○ git remote rm origin：origin已经存在 
- ○ 安装了git gui，多个账户进行切换时候，需要删除github凭据（用户账户管理凭据） 
## git进阶
#### git协议：
- $ git clone http[s]://example.com/path/to/repo.git/ 
- $ git clone ssh://example.com/path/to/repo.git/ 
- $ git clone git://example.com/path/to/repo.git/ 
- $ git clone /opt/git/project.git 
- $ git clone file:///opt/git/project.git 
- $ git clone ftp[s]://example.com/path/to/repo.git/ 
- $ git clone rsync://example.com/path/to/repo.git/ 
#### git分支
- git branch：列出分支 / git brach -a '列出远程分支和本地' 
- git branch “名字”:创建分支 
- git checkout 【分支名称】：切换到某个分支上 
- git merge 【分支名字】--no-commit:将分支合并过来 
- git branch -d【分支名称】：将分支删除 
- git push -u origin --delete branchName：删除远程分支 
- git branch -m “old” “new”：重命名分支 
- 注意：因为编码格式，git不能管理word文件内容
  