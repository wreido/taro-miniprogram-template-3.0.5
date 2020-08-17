/* 
* 首页 商品列表
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import ossProcess from '@/utils/ossProcess'
import utils from '@/utils'

import './index.scss'

@inject('loginFlow', 'mainFlow')
@observer

class GoodsDetail extends Component {

  // 立即购买
  toPay = (goods, e) => {
    e.stopPropagation()
    if (goods.status !== 0) return
    console.log(goods)
  }

  toGoodsDetail = (goodsId) => {
    Taro.navigateTo({ url: `/pages/goods/goodsDetail/index?goodsId=${goodsId}` })
  }

  render() {
    const { goodsList } = this.props.mainFlow
    const { hasHead } = this.props.loginFlow.userInfo.user.roles || {}

    return (
      <View className='goodsListWarp'>
        {
          goodsList.map((goods) => {
            return <View className='goods' key={goods.goodId} onClick={this.toGoodsDetail.bind(this, goods.goodId)}>
              <View className='goods-img'>
                <Image className='image' mode='aspectFill' src={ossProcess(goods.mainSquareImage, 'resizeFill', { width: 702, height: 396 })} />

                {goods.status === 0 && goods.tagShowVOList.length > 0 && <View className='label tag tagShowVOList'>{goods.tagShowVOList[0].name}</View>}
                {goods.status === 1 && <View className='label tag ahead'>{utils.timeStr(utils.formatDate(goods.goodsSalesBeginTime, 'MM-DD HH:mm'))}</View>}
                {(goods.status === -2 || goods.status == 2) && <View className='label looting'><Image className='image' mode='aspectFill' src='https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zy-mp/local/index/state_sy_lootall.png'></Image></View>}
                {(goods.status === -1) && <View className='label end'><Image className='image' mode='aspectFill' src='https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zy-mp/local/index/state_sy_end.png'></Image></View>}

              </View>
              <View className='goods-info'>
                <View className='goods-name'>{goods.title}</View>
                <View className='goods-follow-number'>
                  <Text className='follow-number'>{goods.accessCount}</Text>
                  <Text className='follow-title'>关注人数</Text>
                </View>
              </View>
              <View className='goods-price'>
                <View className='price-box'>
                  <View className='sale-stock'>剩余{goods.usableQty}件 / 已售{goods.salesCount}件</View>
                  <View className='price-inner'>

                    <View className='price'>
                      <View className='sale-price'><Text className='text'>￥</Text> <Text className='text'>{goods.price}</Text></View>
                      <View className='original-price'>￥{goods.originalPrice}</View>
                    </View>

                    {/* 是运营商 或 收益设置为零的运营商 则显示运营商收益 */}
                    {
                      hasHead &&
                      (goods.operatorCommission > 0 || goods.operatorCommission == -1) &&
                      (Number(goods.justCommission) + (Number(goods.operatorCommission) > 0 ? Number(goods.operatorCommission) : 0)) > 0 &&
                      <View className='tag'>
                        总收益￥{((Number(goods.justCommission) + (Number(goods.operatorCommission) > 0 ? Number(goods.operatorCommission) : 0))).toFixed(2)}
                      </View>
                    }

                    {/* 是团长 且 不是运营商 则显示团长收益 */}
                    {hasHead && goods.operatorCommission == 0 && goods.justCommission > 0 && <View className='tag'>收益￥{Number(goods.justCommission)}</View>}

                    {goods.restrictQty > 0 && <View className='tag'>限购{goods.restrictQty}份</View>}
                  </View>
                </View>
                <View className={goods.status === 0 ? 'pay' : 'pay disabled'} onClick={this.toPay.bind(this, goods)}>立即购买</View>
              </View>
            </View>
          })
        }

      </View>
    )
  }

}

export default GoodsDetail
