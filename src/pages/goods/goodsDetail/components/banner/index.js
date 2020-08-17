/* 
* 焦点图 广告
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import ossProcess from '@/utils/ossProcess'
import utils from '@/utils'
import './index.scss'

const playIconImage = require('@/assets/images/video_play.png')

@inject('goodsDetailFlow')
@observer

class Banner extends Component {

  static defaultProps = {
    goodsDetail: {}
  }

  state = {
    indicatorDotsIndex: 1
  }

  // 切换banner图改变当前第几张banner
  changeBanner = (currBanner) => {
    this.setState({ indicatorDotsIndex: currBanner.detail.current + 1 })
  }

  // 播放视频
  playVideo = (e) => {
    e.stopPropagation()
    this.props.goodsDetailFlow.showVideo = true
  }

  render() {
    const { goodsDetail } = this.props
    const { indicatorDotsIndex } = this.state

    return (
      <View className='bannerWarp'>
        <Swiper className='banner' indicatorColor='#EF3233' indicatorActiveColor='#FFFFFF' circular onChange={this.changeBanner.bind(this)}>
          {
            goodsDetail.detailImages && goodsDetail.detailImages.map((img, index) => {
              return <SwiperItem key={img}>
                <View className='banner-item' onClick={() => { utils.previewImage(goodsDetail.detailImages, img) }}>
                  <Image className='banner-image' mode='aspectFill' src={ossProcess(img, 'resizeFill', { width: 750, height: 750 })} />
                  {(index === 0 && goodsDetail.videos && goodsDetail.videos.length !== 0) && <View className='video-btn' onClick={this.playVideo}><Image className='video-img' src={playIconImage} /></View>}
                </View>
              </SwiperItem>
            })
          }
        </Swiper>
        <View className='indicatorDots'>{indicatorDotsIndex}/{goodsDetail.detailImages.length}</View>
      </View>
    )

  }

}

export default Banner
