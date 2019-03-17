---
title: 上手sublime
date: 2016-07-07
---
##  快捷键：
- Ctrl+P：快速打开文件
- Ctrl+K+B : 开启/关闭侧边栏
- Ctrl + Shift + P：调出命令板（Command Palette）
- Ctrl + `：打开控制台
- Ctrl + Shift + N：新建窗口
- Ctrl + N：创建标签
- ctril+F || ctrl + H：搜索替换
- F3：下一个
- Ctrl + Enter：在当前行下面新增一行然后跳至该行
- Ctrl+K+L : 改为小写
- Ctrl+K+U : 改为大写
- Alt + Shift + 2：左右分屏
- 
- 快捷键设置（预览代码、格式化、删除整行）
- 在sublime text3首选项菜单（preferences）下找到“按键-用户”（key bindings user）选项
```
 [
 	{ 'keys': ['f12'], 'command': 'open_in_browser' },
 	{ 'keys': ['ctrl+alt+l'], 'command': 'reindent' },
 	{ 'keys': ['ctrl+d'], 'command': 'run_macro_file', 'args': {'file': 'res://Packages/Default/Delete Line.sublime-macro'} },
 ]
```

## - 安装插件：
- html5
- emmet
- SideBarEnhancements： 右键增强
- autofilename：路径自动补全
- import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
- 

 
##  全部快捷键
- Ctrl+D : 选择单词，重复可增加选择下一个相同的单词
- Ctrl+F : 查找内容
- Ctrl+G : 跳转到指定行
- Ctrl+H : 替换    
- Ctrl+J : 合并行（已选择需要合并的多行时）
- Ctrl+K0 : 展开所有
- Ctrl+K+T : 折叠属性
- Ctrl+K+B : 开启/关闭侧边栏
- Ctrl+K+K : 从光标处删除至行尾
- Ctrl+K+Backspace : 从光标处删除至行首
- Ctrl+K+L : 改为小写
- Ctrl+K+U : 改为大写
- Ctrl+L : 选择整行，重复可依次增加选择下一行
- Ctrl+M : 跳转到对应括号
- Ctrl+N : 新建窗口
- Ctrl+P : 搜索项目中的文件
- Ctrl+R : 搜索指定文件的函数标签
- Ctrl+T : 词互换
- Ctrl+U : 软撤销，撤销光标位置
- Ctrl+W : 关闭当前打开文件
- Ctrl+X : 删除当前行
- Ctrl+Y : 恢复撤销
- Ctrl+Z : 撤销
- Ctrl+/ : 注释当前行
- Ctrl+F2 : 设置/删除标记
- Ctrl+Enter : 插入行后（快速换行）
- Ctrl+Tab : 当前窗口中的标签页切换
- Ctrl+PageDown 、Ctrl+PageUp : 文件按开启的前后顺序切换
- Ctrl+鼠标左键 : 可以同时选择要编辑的多处文本
- Ctrl+Shift+A : 选择当前标签前后，修改标签用的
- Ctrl+Shift+D : 复制光标所在整行，插入在该行之前
- Ctrl+Shift+F : 查找并替换，在文件夹内查找，sublime允许添加多个文件夹进行查找
- Ctrl+Shift+K : 删除整行
- Ctrl+Shift+L : 鼠标选中多行（按下快捷键），即可同时编辑这些行
- Ctrl+Shift+M : 选择括号内的内容（按住-继续选择父括号）    
- Ctrl+Shift+P : 打开命令面板
- 
- Ctrl+Shift+W : 关闭所有打开文件
- Ctrl+Shift+V : 粘贴并格式化
- Ctrl+Shift+/ : 注释已选择内容, 或在当前位置插入块注释，并Focus到首行，写注释说明用的
- Ctrl+Shift+Enter : 在当前行前插入新行
- Ctrl+Shift+↑ : 可以移动此行代码，与上行互换
- Ctrl+Shift+↓ : 可以移动此行代码，与下行互换
- Ctrl+Shift+[ : 折叠代码
- Ctrl+Shift+] : 展开代码
- Ctrl+Shift+分屏序号 : 将当前焦点页分配到分屏序号页
- 
- Shift+F2 : 上一个书签
- Shift+F11 : 全屏免打扰模式，只编辑当前文件
- Shift+鼠标右键（或使用鼠标中键） : 可以用鼠标进行竖向多行选择
- Shift+Tab : 去除缩进
- 
- Alt+Shift+1 : （非小键盘）窗口分屏，恢复默认1屏
- Alt+Shift+2 : 左右分屏-2列
- Alt+Shift+3 : 左右分屏-3列
- Alt+Shift+4 : 左右分屏-4列
- Alt+Shift+5 : 等分4屏
- Alt+Shift+8 : 垂直分屏-2屏
- Alt+Shift+9 : 垂直分屏-3屏        
-   
- F2 : 下一个书签
- F6 : 检测语法错误    
- F9 : 行排序(按a-z)
- F11 : 全屏模式
- 
- Alt+F3 : 选中文本，按下快捷键，即可一次性选择全部的相同文本进行同时编辑
- Alt+. : 闭合当前标签
- Alt+数字 :　切换打开第N个文件
  