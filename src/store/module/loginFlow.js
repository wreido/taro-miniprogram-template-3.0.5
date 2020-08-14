/* 
* 登录
*/
import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import $fetch, { $api } from '@/api'
import Bus, { BusType } from '@/bus'
import enumList from '@/utils/enumList'

const LoginFlow = observable({
  userId: Taro.getStorageSync('userId'),//userId
  openId: Taro.getStorageSync('openId'),//openId
  WXEncryptionKey: {},//微信加密串
  showGetUserInfoAuthModal: false,//用户昵称头像授权弹框状态
  orginPage: '',//登录页面来源
  userInfo: {
    user: {},//用户信息
    leader: {},//团长信息
    openId: '',
    userId: '',
    ...Taro.getStorageSync('userInfo')
  },
  //设置登录页面来源
  setOrginPage(orginPage) {
    this.orginPage = orginPage
  },
  //获取openId
  async asyncUpdateOpenId() {
    try {
      const { code } = await Taro.login()
      const { data } = await $fetch($api.getOpenId, { code, appType: enumList.appType })
      this.openId = data
      Taro.setStorageSync('openId', this.openId)
    } catch (err) {
      console.error('获取openId', err)
    }
  },
  //更新微信加密串
  setWXEncryptionKey(WXEncryptionKey) {
    this.WXEncryptionKey = WXEncryptionKey.detail
  },
  //登录
  async asyncAuthorizedLogin(option) {
    return new Promise(async (resolve, reject) => {
      try {
        const { WXEncryptionKey, openId, shareParm, mobileIn, mobileCode } = option
        let param = {
          appType: enumList.appType,
          openId,
          ivData: WXEncryptionKey.iv,
          encryptedData: WXEncryptionKey.encryptedData,
          invitationCode: shareParm.invitationCode || '',
        }
        if (mobileIn) param['mobileIn'] = mobileIn
        if (mobileCode) param['mobileCode'] = mobileCode

        const { data } = await $fetch($api.login, param, { loadingOps: { loading: true, loadingText: '登录中...' } })
        this.userId = data
        Taro.setStorageSync('userId', this.userId)
        this.asyncBindLeader(shareParm)
        if (this.orginPage) this.refreshPage()
        if (!this.orginPage) await this.asyncUpdateUserInfo()
        resolve(this.userInfo)
      } catch (err) {
        console.log('登录', err)
        reject(err)
      }
    })
  },
  //获取用户信息
  async asyncUpdateUserInfo() {
    try {
      const user = await $fetch($api.getuserInfo)
      let leader = await $fetch($api.getLeaderInfo, { memberId: user.data.fakeHeadId })
      this.userInfo = { user: user.data, leader: leader.data, openId: this.openId, userId: this.userId }
      Taro.setStorageSync('userInfo', this.userInfo)
    } catch (err) {
      console.error('获取用户信息', err)
    }
  },
  //更新用户头像昵称
  async asyncUpdateUserInfoAuth(option) {
    const { WXEncryptionKey, openId } = option
    try {
      let param = {
        appType: enumList.appType,
        openId,
        ivData: WXEncryptionKey.iv,
        encryptedData: WXEncryptionKey.encryptedData
      }
      await $fetch($api.updateWechatInfo, param)
      this.asyncUpdateUserInfo()
    } catch (err) {
      this.asyncUpdateOpenId()
      console.error('更新用户头像昵称', err)
    }
  },
  //绑定团长
  async asyncBindLeader(shareParm = {}) {
    try {
      let param = {
        shareMemberId: shareParm.invitationCode
      }
      await $fetch($api.bindLeader, param)
    } catch (err) {
      console.error('绑定团长', err)
    }
  },
  //登录后刷新页面
  refreshPage() {
    Bus.trigger(BusType[this.orginPage])
  }
})
export default LoginFlow