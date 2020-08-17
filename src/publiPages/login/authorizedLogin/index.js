/* 
* 微信授权登录
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

@inject('loginFlow', 'shareFlow')
@observer

class GoodsDetail extends Component {

  // 配置
  config = {
    navigationBarTitleText: '注册/登录'
  }

  // 组件显示期
  componentDidShow() {
    this.props.loginFlow.asyncUpdateOpenId()
  }

  // 微信授权一键登录
  getPhoneNumberAuth = async (WXEncryptionKey) => {
    if (!WXEncryptionKey.detail.encryptedData) return
    this.props.loginFlow.setWXEncryptionKey(WXEncryptionKey)
    this.props.loginFlow.asyncAuthorizedLogin({
      WXEncryptionKey: this.props.loginFlow.WXEncryptionKey,
      openId: this.props.loginFlow.openId,
      shareParm: this.props.shareFlow.shareParm
    }).then(() => {
      Taro.navigateBack()
    })
  }

  // 手机号登录
  getUserInfoAuth = (WXEncryptionKey) => {
    if (!WXEncryptionKey.detail.encryptedData) return
    this.props.loginFlow.setWXEncryptionKey(WXEncryptionKey)
    Taro.redirectTo({ url: '/publiPages/login/phoneLogin/index' })
  }

  render() {
    return (
      <View className='authorizedLoginWrap'>
        <View className='head'>
          <View className='ban'>
            <View className='logo'>
              <Image mode='aspectFit' src='https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zhiyou-miniprogram/icon.png' />
            </View>
          </View>
        </View>
        <View className='body'>
          <Button open-type='getPhoneNumber' onGetphonenumber={this.getPhoneNumberAuth}>微信授权一键登录</Button>
          <Button open-type='getUserInfo' onGetUserInfo={this.getUserInfoAuth}>手机号登录</Button>
        </View>
      </View>
    )
  }
}

export default GoodsDetail
