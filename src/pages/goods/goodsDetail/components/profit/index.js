/* 
* 收益
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

@inject('loginFlow')
@observer

class Profit extends Component {

  static defaultProps = {
    goodsDetail: {}
  }

  render() {
    const { userId } = this.props.loginFlow
    const { hasHead } = this.props.loginFlow.userInfo.user.roles || {}
    const { goodsDetail } = this.props

    if (userId && (goodsDetail.operatorCommission > 0 || goodsDetail.justCommission > 0)) {
      return (
        <View className='profitWarp' >
          {/* 是运营商 或 收益设置为零的运营商 则显示运营商收益 */}
          {
            hasHead &&
            (goodsDetail.operatorCommission > 0 || goodsDetail.operatorCommission == -1) &&
            (Number(goodsDetail.justCommission) + (Number(goodsDetail.operatorCommission) > 0 ? Number(goodsDetail.operatorCommission) : 0)) > 0 &&
            <View className='tag'>
              预估总收益￥{((Number(goodsDetail.justCommission) + (Number(goodsDetail.operatorCommission) > 0 ? Number(goodsDetail.operatorCommission) : 0))).toFixed(2)}
            </View>
          }

          {/* 是团长 且 不是运营商 则显示团长收益 */}
          {hasHead && goodsDetail.operatorCommission == 0 && goodsDetail.justCommission > 0 && <View className='tag'>预估收益￥{Number(goodsDetail.justCommission)}</View>}
        </View>
      )
    }

  }

}

export default Profit
