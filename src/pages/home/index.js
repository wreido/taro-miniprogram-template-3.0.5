/* 
* 个人中心
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import UserInfoAuthModal from '@/components/modal/getUserInfoAuthModal'
import ShareModal from '@/components/modal/shareModal'
import Bus, { BusType } from '@/bus'
import Header from './components/header'
import Balance from './components/balance'

import './index.scss'

@inject('loginFlow', 'homeFlow')
@observer

class GoodsDetail extends Component {
  // 配置
  config = {
    navigationBarTitleText: '个人中心',
    enablePullDownRefresh: true,
    navigationStyle: 'custom',
    navigationBarBackgroundColor: '#fe5656',
    navigationBarTextStyle: 'white',
  }

  // Dom渲染完成
  componentDidMount() {
    Bus.on(BusType.refreshHome, () => { this.init() })
  }

  // 组件销毁期
  componentWillUnmount() {
    Bus.off(BusType.refreshHome)
  }

  // 数据初始化
  init = () => {
    if (!this.props.loginFlow.userId) return
    // 获取用户信息
    this.props.loginFlow.asyncUpdateUserInfo()
    // 获取我的余额
    this.props.homeFlow.asyncGetMyBalance()
    //团长待发放余额 预估总收益
    this.props.homeFlow.asyncGetLeaderAmountTotal()
  }

  // 下拉事件
  async onPullDownRefresh() {
    this.init()
    Taro.stopPullDownRefresh()
  }

  render() {

    return (
      <View className='homeWrap'>
        {/* 用户信息 */}
        <Header></Header>

        <View className='section'>
          {/* 余额 */}
          <Balance></Balance>
        </View>

        {/* 分享弹框 */}
        <ShareModal entry='index'></ShareModal>

        {/* 获取用户昵称头像 */}
        <UserInfoAuthModal></UserInfoAuthModal>
      </View>
    )
  }
}

export default GoodsDetail
