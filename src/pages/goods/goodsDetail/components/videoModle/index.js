/* 
* 视频
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Video, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

const closeIconImage = require('@/assets/images/video_close.png')

@inject('goodsDetailFlow')
@observer

class VideoModle extends Component {

  static defaultProps = {
    goodsDetail: {}
  }

  //Dom渲染完成
  componentDidMount() {
    this.props.goodsDetailFlow.videoContext = Taro.createVideoContext('video')
  }

  // 组件销毁期
  componentWillUnmount() {
    this.props.goodsDetailFlow.showVideo = false
  }

  //视频结束隐藏
  playEnd() {
    this.props.goodsDetailFlow.showVideo = false
  }

  //关闭视频
  playClose() {
    this.props.goodsDetailFlow.videoContext.stop()
    this.props.goodsDetailFlow.showVideo = false
  }

  render() {

    const { goodsDetail } = this.props
    const { showVideo } = this.props.goodsDetailFlow

    if (showVideo) {
      return (
        <View className='videoWarp'>
          <Video className='video' id='video' src={goodsDetail.videos[0]} autoplay show-center-play-btn={false} initial-time='0' onEnded={this.playEnd.bind(this)}></Video>
          <View className='close' onClick={this.playClose.bind(this)}><Image className='close-play' src={closeIconImage} /></View>
        </View>
      )
    }

  }

}

export default VideoModle
