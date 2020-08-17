/* 
* 分享中间页
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

@inject('shareFlow')
@observer

class Share extends Component {

  // 组件显示期
  componentDidShow() {
    this.props.shareFlow.setShareParm(this.$router.params)
  }

  render() {
    return (
      <View></View>
    )
  }
}

export default Share
