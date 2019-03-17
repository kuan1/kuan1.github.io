---
title: react中使用百度地图选择位置
date: 2017-08-28
---
>  项目需要，制作一个简单的react使用百度地图选择位置的组件

```
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddressManage extends Component {
  static propTypes = {
    confirmAddress: PropTypes.func
  };

  componentDidMount() {
    this.initMap();
  }

  initMap = () => {
    let map = new BMap.Map('chooseAddress');
    let point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);

    map.enableScrollWheelZoom(true);  //开启鼠标滚轮缩放

    let geolocation = new BMap.Geolocation();
    // 开启SDK辅助定位
    geolocation.enableSDKLocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        map.panTo(r.point);
      } else {
        console.log('failed' + this.getStatus());
      }
    });

    let geoc = new BMap.Geocoder();
    map.addEventListener('click', function(e) {
      let pt = e.point;
      geoc.getLocation(pt, function(rs) {
        console.log(rs);
        let addComp = rs.addressComponents;
        this.props.confirmAddress({
          point: rs.point,
          address: addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
        });
      });
    });
  };

  render() {
    return (
      <div className='full'>
        <div id='chooseAddress' className='full'>
        </div>
      </div>
    );
  }
}

export default AddressManage;


```
  