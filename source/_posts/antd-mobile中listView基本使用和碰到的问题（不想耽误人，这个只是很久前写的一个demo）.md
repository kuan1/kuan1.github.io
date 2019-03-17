---
title: antd-mobile中listView基本使用和碰到的问题（不想耽误人，这个只是很久前写的一个demo）
date: 2017-06-09
---
## （不想耽误人，这个只是很久前写的一个demo，没有技术含量）

[前往->官网地址]( https://mobile.ant.design/components/list-view-cn)

#### 在dataSourse中设置了很多数据，即使是本地静态的数据，页面上也只显示10条？ 

>listView默认把数据放在页面上10条，如果10条数据在页面显示高度不高过容器，就不会刷新，再次更新（最新文档有设置默认加载个数介绍）

```
import React from 'react'
import {Flex, ListView} from '../../component'

const {Component, PropTypes} = React

// 虚拟数据
const dataItem = {
  img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
  title: 'Meet hotel',
  des: '不是所有的兼职汪都需要风吹日晒',
}
const data = []
for (let i = 0; i < 100; i++) {
  dataItem.key = i
  data.push(dataItem)
}

class Bargain extends Component {
  constructor (props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource: dataSource.cloneWithRows({}),
      isLoading: true,
    }
  }

  componentDidMount () {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
      isLoading: false,
    })
  }

  static propTypes = {
    dispatch: PropTypes.func
  }
  renderList() {
    const row = (dataRow) => {
      return (
        <Flex style={{height: 200}}>
          <p>{dataRow.title}</p>
          {dataRow.des}
        </Flex>
      )
    }
    return (
      <ListView
        style={{
          height: document.documentElement.clientHeight,
          overflow: 'auto',
        }}
        dataSource={this.state.dataSource} // 渲染的数据源
        renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
          {this.state.isLoading ? '加载中' : '加载完成'}
        </div>)}
        renderRow={row} // 单条数据
        pageSize={4} // 每次渲染的行数
        scrollRenderAheadDistance={500} // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
        scrollEventThrottle={20} // 控制在滚动过程中，scroll事件被调用的频率
        onEndReachedThreshold={10} // 调用onEndReached之前的临界值，单位是像素
				onEndReached={() => {}} // 上拉加载事件
      />
    )
  }
  render () {
    return (
      <div
        className='bargain-container'
      >
        {data.length === 0 ? (<h1>暂时没有商品</h1>) : this.renderList()}
      </div>
    )
  }
}

export default Bargain

```
  