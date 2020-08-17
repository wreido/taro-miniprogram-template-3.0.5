/* 
* 个人中心 header
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

@inject('loginFlow', 'shareFlow')
@observer

class Header extends Component {

  //切换登录
  switchingAccounts = () => {
    //设置登录页面来源
    this.props.loginFlow.setOrginPage('refreshHome')
    Taro.navigateTo({ url: '/publiPages/login/authorizedLogin/index' })
  }

  // 刷新用户头像昵称
  getUserInfoAuth = (WXEncryptionKey) => {
    const { loginFlow } = this.props
    if (!WXEncryptionKey.detail.encryptedData) return
    loginFlow.setWXEncryptionKey(WXEncryptionKey)
    loginFlow.asyncUpdateUserInfoAuth({
      WXEncryptionKey: loginFlow.WXEncryptionKey,
      openId: this.props.loginFlow.openId
    })
  }

  //去登录
  toLogin = () => {
    //设置登录页面来源
    this.props.loginFlow.setOrginPage('refreshHome')
    Taro.navigateTo({ url: '/publiPages/login/authorizedLogin/index' })
  }

  createHomePoster = () => {
    this.props.shareFlow.createHomePoster()
  }

  render() {
    const { userId } = this.props.loginFlow
    const { nickName, avatarUrl, registerMobile } = this.props.loginFlow.userInfo.user.base || {}
    const { fakeHeadNum } = this.props.loginFlow.userInfo.user || {}
    const { hasHead } = this.props.loginFlow.userInfo.user.roles || {}

    // 已登录
    if (userId) {
      return (
        <View className='headerWarp'>
          <View className='title'>个人中心</View>

          <View className='userInfo-box'>
            <View className='userInfo'>
              {/* 用户头像 */}
              <View className='user-img'>
                <Image className='image' mode='aspectFill' src={avatarUrl} />
              </View>
              {/* 用户昵称 用户手机号 */}
              <View className='user'>
                <View className='name'>
                  <Text className='user-name'>{nickName}</Text>
                  <Button className='btn' open-type='getUserInfo' onGetUserInfo={this.getUserInfoAuth}></Button>
                </View>
                <View className='phone'>
                  <Text>{registerMobile}</Text>
                  <View className='switching-accounts' onClick={this.switchingAccounts.bind(this)}>切换帐号</View>
                </View>
                {/* 团长编号 */}
                {hasHead && <View className='headNum'>编号：{fakeHeadNum}</View>}
              </View>
            </View>

            {/* 生成海报 */}
            <View className='user-code' onClick={this.createHomePoster}>
              <Image className='share-btn' mode='aspectFill' src='https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zy-mp/local/home/grzx_code.png' />
            </View>
          </View>
        </View>
      )
    }

    // 未登录
    if (!userId) {
      return (
        <View className='headerWarp'>
          <View className='title'>个人中心</View>
          <View className='userInfo-box' onClick={this.toLogin}>
            <View className='userInfo'>
              {/* 用户头像 */}
              <View className='user-img'>
                <Image mode='aspectFill' className='image' src='https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/ushare/local/index/moren.png' />
              </View>
              {/* 用户昵称 用户手机号 */}
              <View className='user'>
                <View className='name'>
                  <Text>点击登录</Text>
                </View>
              </View>
            </View>
            {/* 生成海报 */}
            <View className='user-code'><Image className='share-btn' mode='aspectFill' src='https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zy-mp/local/home/grzx_code.png' /></View>
          </View>
        </View>
      )
    }

  }

}

export default Header
