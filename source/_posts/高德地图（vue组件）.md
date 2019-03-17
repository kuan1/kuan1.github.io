---
title: 高德地图（vue组件）
date: 2018-05-11
---
### 高德地图（vue组件）
> 搜索提示，添加maker，拖拽maker


```
<template>
  <div class="my-map">
    <el-button>{{ buttonText }}</el-button>
    <div class="control-container">
      <div id="map-container" class="map-container"></div>
      <el-button @click="visible = !visible" class="confirm-btn" type="success">确定位置</el-button>
      <div class="search-box">
        <el-input id="search-input" :value="keyword" @change="search" suffix-icon="el-icon-search" placeholder="请输入地址"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
  // 父组件通过 select 获取到经纬度
  // search 方法获取到地理位置
  const key = '***'
  const BEIJING = [116.39, 39.9]
  export default {
    name: 'amap',
    props: {
      shouldSelect: { // 是否添加marker选择地址
        type: Boolean,
        default: true
      },
      value: {
        type: Array,
        default() {
          return BEIJING
        }
      },
      keyword: {
        type: String,
        default: '天安门'
      },
      city: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {
        visible: false,
        buttonText: this.value.join('、')
      }
    },
    watch: {
      value(value) {
        if (!value || !value.length) return
        this.buttonText = value.join('、')
        this.addMarker({
          lng: value[0],
          lat: value[1],
          O: value[0],
          P: value[1]
        })
      }
    },
    methods: {
      savePos(lnglat) {
        const posArr = [lnglat.lng, lnglat.lat]
        this.buttonText = posArr.join('、')
        this.$emit('select', lnglat)
        this.$emit('input', posArr)
        this.$emit('update:value', posArr)
        this.addMarker(lnglat)
      },
      // 加载sdk
      loadSdk() {
        return new Promise((resolve, reject) => {
          if (!window.AMap) {
            const script = document.createElement('script')
            script.src = `//webapi.amap.com/maps?v=1.4.6&key=${key}`
            document.head.appendChild(script)
            script.onload = resolve
            script.onerror = reject
          } else {
            resolve()
          }
        })
      },
      // 初始化地图
      async initMap() {
        await this.loadSdk()
        this.map = new window.AMap.Map('map-container', {
          zoom: 10,
          center: this.value && this.value.length ? this.value : BEIJING
        })
        const {city} = this
        window.AMap.plugin('AMap.Autocomplete', function(){
          // 实例化Autocomplete
          var autoOptions = {
            //city 限定城市，默认全国
            city: city || '全国',
            input: 'search-input'
          }
          new AMap.Autocomplete(autoOptions);
          // const autoComplete= new AMap.Autocomplete(autoOptions);
          // autoComplete.search(keyword, function(status, result) {
            // 搜索成功时，result即是对应的匹配数据
          // })
        })
        // 手动选择
        if (this.shouldSelect) {
          AMap.event.addListener(this.map, 'click', ({lnglat}) => {
            this.savePos(lnglat)
          })
        }
      },
      // 设置地图中心
      setCenter(pointer) {
        if (!pointer) return
        
        // this.map.setZoom(14);
        this.map.setCenter(pointer)
      },
      // 覆盖物
      addMarker(position = {}) {
        // 设置居中
        this.setCenter(position)

        if (this.marker) {
          this.map.remove(this.marker)
        }

        // 添加marker
        const {lat, lng} = position
        this.marker = new AMap.Marker({
          position: [lng, lat], // marker所在的位置
          map: this.map, // 创建时直接赋予map属性
          draggable: true,  //是否可拖动
          icon: new AMap.Icon({
            image: 'http://webapi.amap.com/images/0.png',
            size: new AMap.Size(36, 36),
            imageOffset: new AMap.Pixel(-0, -0)
          })
        })
        this.marker.on('dragend', ({lnglat}) => {
            this.savePos(lnglat)
          })
      },
      // 搜索 return Promise<array>
      search(keyword = this.keyword, city = this.city) {
        if (!keyword) {
          keyword = '天安门'
        }
        const searchOptions = {
          pageSize: 5,
          pageIndex: 1,
          city
        }
        return new Promise(resolve => {
          AMap.service('AMap.PlaceSearch', () => {
            const placeSearch = new AMap.PlaceSearch(searchOptions)
            placeSearch.search(keyword, (status, result) => {
              // 搜索到结果
              if (result.info !== 'OK') {
                resolve(null)
                return
              }
              // 结果列表
              const {poiList: {pois = []}} = result
              const res = pois[0]
              console.log('搜索结果', res)
              this.savePos(res.location)
            })
          })
        })
      }
    },
    mounted() {
      this.initMap()
    }
  }
</script>

<style lang='scss' scoped>
.my-map {
  display: inline-block;
  width: 100%;
}

.control-container {
  height: 350px;
  position: relative;
  margin: 20px 0;
}

.map-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10000;
}

.confirm-btn,
.search-box {
  position: absolute;
  right: 10px;
  top: 20px;
  z-index: 10000;
}

.search-box {
  right: 100px;
  width: 300px;
}
</style>

<style>
.amap-sug-result {
  z-index: 10000;
}
</style>


```
  