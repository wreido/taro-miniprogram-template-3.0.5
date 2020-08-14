/* 
* 商品详情
*/
import Taro from '@tarojs/taro'
import { observable } from 'mobx'

const GoodsDetailFlow = observable({
  showVideo: false,//播放视频
  videoContext: '',//video DOM对象
})

export default GoodsDetailFlow
