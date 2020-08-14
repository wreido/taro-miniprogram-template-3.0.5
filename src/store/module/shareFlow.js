/* 
* 分享
*/
import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import store from '@/store'
import utils from '@/utils'

const ShareFlow = observable({
  showShareModal: false,// 分享模态框状态
  showSharePosterModal: false,// 是否显示所有生成的海报弹层
  posterImgUrl: '',//海报
  shareParm: {},// 分享参数 
  // 设置分享参数
  setShareParm(param) {
    this.shareParm = param
    console.log('分享参数', this.shareParm, utils.parseParam(this.shareParm))
    // 绑定团长
    if (store.loginFlow.userId) store.loginFlow.asyncBindLeader(this.shareParm)

    //路由重定向
    if (this.shareParm.redirectTo) Taro.redirectTo({ url: `${this.shareParm.redirectTo}?${utils.parseParam(this.shareParm)}` })
    if (this.shareParm.reLaunch) Taro.reLaunch({ url: `${this.shareParm.reLaunch}?${utils.parseParam(this.shareParm)}` })
  },
  // 首页海报
  async createHomePoster() {
    this.posterImgUrl = 'https://img.alicdn.com/imgextra/i2/913662479/O1CN01lbR64R1UBQR0rKACF_!!913662479.jpg'
    this.showSharePosterModal = true
    this.showShareModal = false
  },
  // 商品海报
  async createGoodsPoster() {
    this.posterImgUrl = 'https://img.alicdn.com/imgextra/i2/913662479/O1CN01lbR64R1UBQR0rKACF_!!913662479.jpg'
    this.showSharePosterModal = true
    this.showShareModal = false
  }
})

export default ShareFlow
