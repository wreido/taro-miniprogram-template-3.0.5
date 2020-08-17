/**
 * 更新用户昵称头像
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx'
import './index.scss'

@inject('loginFlow')
@observer

class GetUserInfoAuthModal extends Component {

  // Dom渲染完成
  componentDidMount() {
  }
  // 组件显示期
  componentDidShow() {
    const { loginFlow } = this.props
    if (loginFlow.userId && loginFlow.userInfo.user && loginFlow.userInfo.user.base && !loginFlow.userInfo.user.base.nickName) {
      loginFlow.showGetUserInfoAuthModal = true
    }
  }

  // 关闭模态框
  modalClose = () => {
    const { loginFlow } = this.props
    loginFlow.showGetUserInfoAuthModal = false
  }

  // 授权
  getUserInfoAuth = (WXEncryptionKey) => {
    const { loginFlow } = this.props
    if (!WXEncryptionKey.detail.encryptedData) return
    loginFlow.setWXEncryptionKey(WXEncryptionKey)
    loginFlow.asyncUpdateUserInfoAuth({
      WXEncryptionKey: loginFlow.WXEncryptionKey,
      openId: this.props.loginFlow.openId
    })
  }

  render() {
    const { showGetUserInfoAuthModal } = this.props.loginFlow

    return (
      <View className='getUserInfoAuthWrap'>
        {showGetUserInfoAuthModal && <View>
          <View className='modal_mask'></View>
          <View className='modal'>
            <View className='modal-head'>
              <Button className='closeBtn' onClick={this.modalClose}>X</Button>
            </View>
            <View className='modal-body'>
              <View className='inner'>
                <View className='coverimg'><Image className='image' mode='aspectFit' src='https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zy-mp/local/home/icon_wd_shouquan.png' /></View>
                <View className='tip'>
                  <View>亲~为了给您提供更好的服务</View>
                  <View>我们需要您的微信授权哦</View>
                </View>
              </View>
            </View>
            <View className='modal-foot'>
              <Button title='好的' className='besure' open-type='getUserInfo' onGetUserInfo={this.getUserInfoAuth}>好的</Button>
            </View>
          </View>
        </View>
        }
      </View >
    )
  }
}

export default GetUserInfoAuthModal
