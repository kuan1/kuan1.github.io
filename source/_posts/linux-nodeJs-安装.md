---
title: linux nodeJs 安装
date: 2017-07-15
---
## linux nodeJs 安装
### 方法一：
* 安装node：
> curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -    
> yum install nodejs -y

### 方法二：
- 下载  
wget https://nodejs.org/dist/v8.1.2/node-v8.1.2-linux-x64.tar.xz

- 解压  
tar-xvf node-v8.1.2-linux-x64.tar.xz

- 设置环境变量
vi ~/.bashrc  
在最下面加入   
export PATH=$PATH:/opt/software/node-v8.1.2-linux-x64/bin  
source ~/.bashrc

- 检查是否安装完成  
node -v
- 安装pm2  
npm install -g pm2
  