/* 
* 顶层视图 应用顶层
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

@inject('loginFlow')
@observer

class Template extends Component {
  // 配置
  config = {
    navigationBarTitleText: '页面模板',
  }

  state = {}

  //初始化
  componentWillMount() {

  }

  //Dom渲染完成
  componentDidMount() {

  }

  //组件销毁期
  componentWillUnmount() {

  }

  //组件显示期
  componentDidShow() {

  }

  //页面隐藏
  componentDidHide() {

  }

  render() {
    return (
      <View></View>
    )
  }
}

export default Template
