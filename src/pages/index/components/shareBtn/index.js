/**
* 首页 分享按钮
*/
import Taro, { Component } from '@tarojs/taro'
import { View, MovableArea, MovableView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'

@inject('shareFlow', 'loginFlow')
@observer

class ShareBtn extends Component {

  // 点击事件
  handleClick = () => {
    //设置登录页面来源
    this.props.loginFlow.setOrginPage('refreshIndex')
    // 登陆可分享
    if (!this.props.loginFlow.userId) return Taro.navigateTo({ url: '/publiPages/login/authorizedLogin/index' })
    this.props.shareFlow.showShareModal = true
    Taro.hideTabBar()
  }

  render() {
    return (
      <View className='shareBtnBarWrap'>
        <MovableArea className='shareBar' scale-area>
          <MovableView x='320' y='0' onClick={this.handleClick} className='shareAction' direction='all' ></MovableView>
        </MovableArea>
      </View>
    )
  }
}

export default ShareBtn
