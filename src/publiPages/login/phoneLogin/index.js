/* 
* 手机号登录
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Input, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import $fetch, { $api } from '@/api'
import { graceChecker, debounceStart } from 'utilscore' //表单校验
import enumList from '@/utils/enumList'
import md5 from 'js-md5'
import './index.scss'

@inject('loginFlow', 'shareFlow')
@observer

class PhoneLogin extends Component {

  // 配置
  config = {
    navigationBarTitleText: '登录/注册'
  }

  state = {
    mobileIn: '',//手机号
    mobileCode: '',//验证码
    codename: '获取验证码',//获取验证码按钮文字展示
    checkRes: false,
    disabled: false,//获取验证码 禁用状态
    mobileInRule: [
      { name: 'mobileIn', checkType: 'reg', checkRule: enumList.regexpList.mobilePhoneReg, errorMsg: '请输入您的姓名' },
    ],
    mobileCodeRule: [
      { name: 'mobileCode', checkType: 'reg', checkRule: enumList.regexpList.mobileCodeReg, errorMsg: '请输入您的姓名' },
    ],
    mobileCodeCheckRes: false
  }

  // 手机号输入
  mobileInput = (e) => {
    const { mobileInRule } = this.state
    let checkRes = graceChecker.check({ mobileIn: e.detail.value.replace(/(^\s*)|(\s*$)/g, "") }, mobileInRule);
    this.setState({ mobileIn: e.detail.value, checkRes })
  }

  // 验证码输入
  mobileCodeInput = (e) => {
    const { mobileCodeRule } = this.state
    let checkRes = graceChecker.check({ appType: enumList.appType, mobileCode: e.detail.value.replace(/(^\s*)|(\s*$)/g, "") }, mobileCodeRule);
    this.setState({
      mobileCode: e.detail.value.replace(/(^\s*)|(\s*$)/g, ""),
      mobileCodeCheckRes: checkRes
    })
  }

  // 获取验证码
  getPhoneCode = debounceStart(async () => {
    const { mobileIn } = this.state
    const timestamp = enumList.currTime
    const sign = md5(`mobile=${mobileIn}&timestamp=${timestamp}&key=${enumList.phoneLoginSignKey}`)
    if (!this.state.disabled) {
      try {
        await $fetch($api.getValidCode, { mobile: mobileIn, sign, timestamp })
        var num = 61;
        var timer = setInterval(() => {
          num--;
          if (num <= 0) {
            clearInterval(timer);
            this.setState({ codename: '重新发送', disabled: false })
          } else {
            this.setState({ codename: num + "s", disabled: true })
          }
        }, 1000)
      } catch (err) {
        console.error(err)
      }
    }
  }, 1000)

  // 手机号登录
  phoneLogin = debounceStart(async () => {
    this.props.loginFlow.asyncAuthorizedLogin({
      WXEncryptionKey: this.props.loginFlow.WXEncryptionKey,
      openId: this.props.loginFlow.openId,
      shareParm: this.props.shareFlow.shareParm,
      mobileIn: this.state.mobileIn,
      mobileCode: this.state.mobileCode
    }).then(() => {
      Taro.navigateBack()
    }).catch(() => {
      console.log(1111111)
    })
  }, 1000)

  render() {

    const { mobileIn, mobileCode, codename, checkRes, mobileCodeCheckRes, disabled } = this.state

    return (
      <View className='phoneLoginWarp'>
        <View className='item'>
          <View className='item-inner'>
            <Text>手机号</Text>
            <Input placeholder='请输入手机号' placeholderClass='placeholderText' maxLength='11' type='number' onInput={this.mobileInput} value={mobileIn} />
          </View>
        </View>
        <View className='item'>
          <View className='item-inner'>
            <Text>验证码</Text>
            <Input placeholder='请输入验证码' placeholderClass='placeholderText' maxLength='6' disabled={checkRes ? false : true} type='number' onInput={this.mobileCodeInput} value={mobileCode} />
            {!checkRes && <View className='code-btn'>获取验证码</View>}
            {checkRes && <View className={disabled ? 'code-btn able disabled' : 'code-btn able'} onClick={this.getPhoneCode}>{codename}</View>}
          </View>
        </View>
        <View className={mobileCodeCheckRes ? 'submit' : 'submit disabled'} onClick={this.phoneLogin}>登录</View>
      </View >
    )
  }
}

export default PhoneLogin
