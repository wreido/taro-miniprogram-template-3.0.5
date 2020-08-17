/* 
* 焦点图 广告
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import ossProcess from '@/utils/ossProcess'

import './index.scss'

@inject('mainFlow')
@observer

class Banner extends Component {

  render() {
    const { slideLists } = this.props.mainFlow.advertisement

    if (slideLists) {
      return (
        <View className='bannerWarp'>
          <Swiper className='banner' indicatorColor='rgba(255,255,255,1)' indicatorActiveColor='#ff7113' circular autoplay indicatorDots interval='5000'>
            {
              slideLists.map((item) => {
                return <SwiperItem key={item.adId}>
                  <View className='banner-item'>
                    <Image className='image' mode='aspectFill' src={ossProcess(item.image, 'resizeFill', { width: 702, height: 240 })} />
                  </View>
                </SwiperItem>
              })
            }
          </Swiper>
        </View>
      )
    }
  }

}

export default Banner
