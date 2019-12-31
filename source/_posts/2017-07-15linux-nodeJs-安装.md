---
title: linux nodeJs 安装
date: 2017-07-15 22:48:12
---
## linux nodeJs 安装
### 方法一：
```bash
# centos
curl -sl https://rpm.nodesource.com/setup_10.x | sudo bash -    
yum install nodejs -y

# ubuntu
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 方法二：
 
#### 下载

```bash 
wget https://nodejs.org/dist/v8.1.2/node-v8.1.2-linux-x64.tar.xz # 下载

tar-xvf node-v8.1.2-linux-x64.tar.xz # 解压 
```

#### 设置环境变量
```
vi ~/.bashrc  # 在最下面加入   

export PATH=$PATH:/opt/software/node-v8.1.2-linux-x64/bin  
source ~/.bashrc
```

## 检查是否安装完成  
```
node -v
```

## 安装pm2  
```
npm install -g pm2
```

## linux卸载node

```bash
sudo npm uninstall npm -g
 
 sudo rm -rf /usr/local/lib/node /usr/local/lib/node_modules /var/db/receipts/org.nodejs.*
 
 sudo rm -rf /usr/local/include/node /Users/$USER/.npm
 
 sudo rm /usr/local/bin/node
 
 sudo rm /usr/local/share/man/man1/node.1

 sudo rm /usr/local/lib/dtrace/node.d
```
  