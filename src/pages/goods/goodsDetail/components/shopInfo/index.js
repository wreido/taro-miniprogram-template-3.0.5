/* 
* 店铺信息
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

@inject('loginFlow')
@observer

class ShopInfo extends Component {

  toIndex = () => {
    Taro.reLaunch({ url: '/pages/index/index' })
  }

  render() {
    const { avatarUrl, nickName } = this.props.loginFlow.userInfo.leader
    const { userId } = this.props.loginFlow

    if (userId) {
      return (
        <View className='shopInfoWarp' onClick={this.toIndex}>
          {
            (nickName || avatarUrl) && <View className='shopInfo'>
              <Image className='user-image' mode='aspectFill' src={avatarUrl} />
              <Text className='user-name'>{nickName}的小店</Text>
            </View>
          }
          <View className='to-shop'>进入店铺</View>
        </View>
      )
    }

  }

}

export default ShopInfo
