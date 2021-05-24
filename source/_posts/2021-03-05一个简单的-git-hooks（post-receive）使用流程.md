---
title: 一个简单的 git hooks（post-receive）使用流程
date: 2021-03-05 16:41:20
---
### 一、 服务器创建一个空仓库

```bash
# 进入部署目录
cd /var/www/temp

# 创建空仓库
git init --bare temp.git
```

### 二、配置 git hooks（.temp.git/hooks/post-receive）

```bash
#!/bin/sh
set -e

# 部署目录
DeployPath="/var/www/temp"

# 判断是不是远端仓库
IS_BARE=$(git rev-parse --is-bare-repository)
if [ -z "$IS_BARE" ]; then
echo >&2 "失败: 不是远端仓库"
exit 1
fi

echo "同步git仓库 ================================================"
unset GIT_DIR
# git --work-tree=$DeployPath checkout -f ## 这种方式git删除文件没有被删除
git --work-tree=$DeployPath reset --hard master

echo "部署成功 ================================================"
```

### 三、设置文件权限

```bash
# 设置新增文件文件权限
chomd 777 hooks/post-receive
```

### 四、客户端推送

```bash
# 关联远程git仓库（只要一次就好了）
git remote add production user@1.1.1.1:/var/www/temp/temp.git

# 推送
git push production
```

  