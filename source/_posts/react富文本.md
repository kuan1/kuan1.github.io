---
title: react富文本
date: 2017-07-23
---
> 最近看了几个开源的富文本的库，quill 、react-draft-wysiwyg、braft-editor、braft-editor

### 自己用的简单的富文本
```
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import * as FileAction from 'actions/FileAction';
import {message} from 'antd';
import {onReceive} from 'qy-react';

class Editor extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    sendHtml: PropTypes.func,
    html: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    let {html} = nextProps;
    if (html !== this.props.html) {
      this.editorInstance.setContent(html)
    }
    onReceive.call(this, {
      key: 'file',
      nextProps,
      success: ({result}) => {
        message.destroy();
        message.success('上传成功', 1);
        this.param.success({
          url: result,
        });
      },
    });
  }

  handleHTMLChange = (html) => {
    this.html = html;
    this.props.sendHtml(html);
  };

  uploadFile = (param) => {
    this.param = param;
    let fd = new FormData();
    fd.append('file', param.file);
    this.props.dispatch(FileAction.update(fd));
    message.info('正在上传...', 1000);
  };

  render() {
    const editorProps = {
      placeholder: '请输入内容!',
      onHTMLChange: this.handleHTMLChange,
      viewWrapper: '#editor',
      extendControls: [
        {
          type: 'split',
        },
        {
          type: 'button',
          text: '预览',
          className: 'preview-button',
          onClick: () => {
            window.open().document.write(this.html);
          },
        },
      ],
      media: {
        image: true,
        video: false,
        audio: false,
        uploadFn: this.uploadFile,
      },
      contentFormat: 'html',
      initialContent: this.props.html,
    };
    return (
      <div id='editor'>
        <BraftEditor ref={instance => this.editorInstance = instance} {...editorProps} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    file: state.file.upload,
  };
}

export default connect(mapStateToProps)(Editor);

```
#### 其他
* 安装： npm install react-draft-wysiwyg draftjs-to-html 
* 引入样式： import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


<https://jpuri.github.io/react-draft-wysiwyg>  <https://github.com/jpuri/react-draft-wysiwyg>  
 <https://github.com/margox/braft-editor>

### 与html相互转换
```
import React, {Component} from 'react';
import {EditorState, convertToRaw, ContentState, convertFromHTML} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';


class App extends Component {
  state = {
    editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML('<p>默认</p>')
        )
      ),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  render() {
    const {editorState} = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName='demo-wrapper'
          editorClassName='demo-editor'
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}

export default App;

```

### 转化JSON
```
import React, { Component } from 'react';
import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';


const content = {'entityMap':{},'blocks':[{'key':'637gr','text':'Initialized from content state.','type':'unstyled','depth':0,'inlineStyleRanges':[],'entityRanges':[],'data':{}}]};

class App extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    }
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });
  };

  render() {
    const { contentState } = this.state;
    return (
      <div>
        <Editor
          defaultContentState={content}
          wrapperClassName='demo-wrapper'
          editorClassName='demo-editor'
          onContentStateChange={this.onContentStateChange}
        />
        <textarea
          disabled
          value={JSON.stringify(contentState, null, 4)}
        />
      </div>
    );
  }
}
export default App;
```

### 拖拽上传图片
```
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';


function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    }
  );
}

const EditorImage = () => (
  <Editor
    wrapperClassName='demo-wrapper'
    editorClassName='demo-editor'
    toolbar={{
      inline: { inDropdown: true },
      list: { inDropdown: true },
      textAlign: { inDropdown: true },
      link: { inDropdown: true },
      history: { inDropdown: true },
      image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
    }}
  />
);
```


### 自定义工具栏

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';


class CustomOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addStar = () => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '⭐',
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  };

  render() {
    return (
      <div onClick={this.addStar}>⭐</div>
    );
  }
}

const App = () => (
  <Editor
    wrapperClassName='demo-wrapper'
    editorClassName='demo-editor'
    toolbarCustomButtons={[<CustomOption />]}
  />
);
export default App;
```








  