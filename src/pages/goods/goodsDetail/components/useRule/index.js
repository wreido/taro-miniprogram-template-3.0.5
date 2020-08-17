/* 
* 购买规则
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

class UseRule extends Component {

  static defaultProps = {
    goodsDetail: []
  }

  //配送
  deliveryRule = () => {
    Taro.showModal({
      content: this.props.goodsDetail.excludedAreaDesc,
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#ff7113'
    })
  }

  render() {
    const { goodsDetail } = this.props

    return (
      <View className='useRuleWarp'>
        {
          goodsDetail.restrictQty > 0 && <View className='item delivery' onClick={this.deliveryRule}>
            <Text className='title'>限购</Text>
            <View className='content'>
              <View>每人限购{goodsDetail.restrictQty}份</View>
            </View>
          </View>
        }

        <View className='item delivery' onClick={this.deliveryRule}>
          <Text className='title'>配送</Text>
          <View className='content'>
            <View>不发售地区</View>
            <Image className='icon' mode='aspectFill' src='https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zy-mp/local/shopping/question.png'></Image>
          </View>
        </View>
      </View>
    )

  }

}

export default UseRule
