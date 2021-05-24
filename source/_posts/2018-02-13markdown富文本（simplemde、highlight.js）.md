---
title: markdown富文本（simplemde、highlight.js）
date: 2018-02-13 14:54:42
---
>  碰到了一个很满意的markdown富文本编辑器

## 安装
`npm install simplemde marked highlight.js --save`

## 引入样式
```js
@import '~font-awesome/css/font-awesome.css';
@import '~simplemde/dist/simplemde.min.css';
@import '~highlight.js/styles/idea.css';
```

## react组件
```js
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {shouldUpdate} from 'qy-react';

import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'

class Editor extends Component {

  static propTypes = {
    content: PropTypes.string,
    sendContent: PropTypes.func
  };

  static defaultProps = {
    content: ''
  };

  componentDidMount() {
    this.smde = new SimpleMDE({
      element: this.editorDiv,
      autofocus: true,
      autosave: true,
      placeholder: '请输入内容',
      previewRender: (plainText) => {
        return marked(plainText, {
          renderer: new marked.Renderer(),
          gfm: true,
          pedantic: false,
          sanitize: false,
          tables: true,
          breaks: true,
          smartLists: true,
          smartypants: true,
          highlight: function (code) {
            return highlight.highlightAuto(code).value;
          }
        });
      },
    });
    this.smde.value(this.props.content);
    this.smde.codemirror.on('change', () => {
      this.props.sendContent(this.smde.value())
    })
  }

  shouldComponentUpdate() {
    return shouldUpdate.apply(this, arguments);
  }

  render() {
    return (
      <textarea ref={r => this.editorDiv = r}></textarea>
    );
  }
}

export default Editor;

```
  