---
title: electron在mac电脑上复制粘贴全选失效
date: 2019-12-31 14:18:33
---
### 判断mac环境下手动注册快捷键
```js
import { app, BrowserWindow, screen, globalShortcut } from "electron";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow()
    
  if (process.platform === "darwin") {
    let contents = mainWindow.webContents;
    globalShortcut.register("CommandOrControl+C", () => {
      contents.copy();
    });
    globalShortcut.register("CommandOrControl+V", () => {
      contents.paste();
    });
    globalShortcut.register("CommandOrControl+X", () => {
      contents.cut();
    });
    globalShortcut.register("CommandOrControl+A", () => {
      contents.selectAll();
    }); 
  }
}


app.on("ready", createWindow);
```

#### [electron文档](https://electronjs.org/docs/api/web-contents#contentsselectall)
  