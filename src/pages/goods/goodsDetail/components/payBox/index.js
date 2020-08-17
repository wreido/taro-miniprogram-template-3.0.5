/* 
* 去付款
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'

@inject('appFlow', 'mainFlow')
@observer

class PayBoxWarp extends Component {

  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    goodsDetail: {}
  }

  render() {
    const { goodsDetail } = this.props
    const { isIphoneX } = this.props.appFlow

    return (
      <View className={!isIphoneX ? 'payBoxWarp' : 'payBoxWarp isIphoneX'}>
        <View className='to-home'>
          <Image className='home-icon' src='../../../../../assets/images/tabBarIcon/home_off.png' />
        </View>

        {goodsDetail.status == 0 && <View className='to-pay'>立即购买</View>}
        {(goodsDetail.status == -2 || goodsDetail.status == 2) && <View className='to-pay disabled'>已抢光</View>}
        {goodsDetail.status == 1 && <View className='to-pay disabled'>即将开抢</View>}
        {goodsDetail.status == -1 && <View className='to-pay disabled'>已结束</View>}
      </View>
    )

  }

}

export default PayBoxWarp
