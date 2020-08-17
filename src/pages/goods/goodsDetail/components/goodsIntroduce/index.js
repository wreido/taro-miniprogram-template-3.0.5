/* 
* 产品介绍
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

class GoodsIntroduce extends Component {

  static defaultProps = {
    goodsDetailHtml: ''
  }

  render() {
    const { goodsDetailHtml } = this.props

    return (
      <View className='goodsIntroduceWarp'>
        <rich-text space='nbsp' nodes={goodsDetailHtml}></rich-text>
      </View>
    )

  }

}

export default GoodsIntroduce
