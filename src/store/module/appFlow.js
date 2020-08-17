/* 
* app
*/
import Taro from '@tarojs/taro'
import { observable } from 'mobx'

const ShareFlow = observable({
  systemInfo: {},// 设备信息
  isIphoneX: false,
  async getSystemInfo() {
    this.systemInfo = await Taro.getSystemInfo() || {}
    if (this.systemInfo.model.search('iPhone X') !== -1 || this.systemInfo.model.search('iPhone 11') !== -1) {
      this.isIphoneX = true
    }
  }
})

export default ShareFlow
