import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Bus, { BusType } from '@/bus'
import utils from '@/utils'
import ShareModal from '@/components/modal/shareModal'
import UserInfoAuthModal from '@/components/modal/getUserInfoAuthModal'
import GoodsList from './components/goodsList'
import ShopInfo from './components/shopInfo'
import CateList from './components/cateList'
import Banner from './components/banner'
import ShareBtn from './components/shareBtn'

import './index.scss'

@inject('loginFlow', 'mainFlow')
@observer

class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
  }

  // 初始化
  async componentWillMount() {
    // 隐藏右上角分享
    Taro.hideShareMenu()
    Bus.on(BusType.refreshIndex, () => { this.init() })
    this.init()
  }

  // 组件销毁期
  componentWillUnmount() {
    Bus.off(BusType.refreshIndex)
  }

  // 下拉事件
  async onPullDownRefresh() {
    await this.init()
    Taro.stopPullDownRefresh()
  }

  // 触底事件
  onReachBottom = () => {
    this.props.mainFlow.asyncGetGoodsList()
  }

  // 数据初始化
  init = async () => {
    // 获取用户信息
    if (this.props.loginFlow.userId) await this.props.loginFlow.asyncUpdateUserInfo()
    // 获取商品分类、广告
    this.props.mainFlow.asyncGetCateOrAdvertisement()
    // 商品列表
    this.props.mainFlow.currGoodsListPage = 1
    this.props.mainFlow.asyncGetGoodsList()
  }

  // 分享给朋友 配置 onShareAppMessage钩子函数必须放父级组件,子组件内无效
  onShareAppMessage() {
    const { loginFlow } = this.props
    let shareParam = {
      invitationCode: loginFlow.userId,
      reLaunch: '/pages/index/index'
    }
    Taro.showTabBar()

    return {
      title: `${loginFlow.userInfo.user.base.nickName} 邀你一起吃喝玩乐`,
      path: `/publiPages/share/index?${utils.parseParam(shareParam)}`,
      imageUrl: 'https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zy-mp/local/share/shareImg.png',
    }
  }

  render() {
    const { currCate } = this.props.mainFlow

    return (
      <View className='indexWarp'>
        <View className='header'>

          {/* 店铺信息 */}
          <ShopInfo></ShopInfo>

          {/* 商品分类 */}
          <CateList></CateList>

        </View>

        {/* 焦点图 */}
        {currCate.categoryShowId === 0 && <Banner></Banner>}

        {/* 商品列表 */}
        <GoodsList></GoodsList>

        {/* 分享按钮 */}
        <ShareBtn></ShareBtn>

        {/* 分享弹框 */}
        <ShareModal entry='index'></ShareModal>

        {/* 获取用户昵称头像 */}
        <UserInfoAuthModal></UserInfoAuthModal>

      </View>
    )
  }

}

export default Index 
