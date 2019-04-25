---
title: mac电脑在terminal中打开vscode
date: 2019-04-01 14:38:16
---
[文档地址](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)
### terminal中输入
```bash
cat << EOF >> ~/.bash_profile
# Add Visual Studio Code (code)
export PATH="\$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
EOF
```

### 关闭terminal重新启动

### 打开文件
```bash
# 打开当前页面
code .
```
  