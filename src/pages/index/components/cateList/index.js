/* 
* 首页 商品分类
*/
import Taro, { Component } from '@tarojs/taro'
import { View, MovableArea, MovableView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

@inject('mainFlow')
@observer

class CateList extends Component {

  state = {
    curCateIndex: 0,
    initX: 0
  }

  changeCate = (index, item) => {
    this.props.mainFlow.setCurrCate(item)

    Taro.pageScrollTo({ scrollTop: 0 })
    this.setState({ curCateIndex: index })
  }

  choiceSort = (e) => {
    (e.target.offsetLeft - 150) < 0 ? this.setState({ initX: 0 }) : this.setState({ initX: 120 - e.target.offsetLeft })
  }

  render() {
    const { cateList } = this.props.mainFlow
    const { curCateIndex, initX } = this.state
    return (
      <View className='cateboxWarp'>
        {
          (cateList.length > 1) && <View className='cate-box'>
            <MovableArea style='height:70rpx;width:100%' className='cate-list' scale-area>
              <MovableView onClick={this.choiceSort.bind(this)} x={initX} y='0' className='cate-list-inner' style='height:70rpx; width: auto;' direction='horizontal'>
                {
                  cateList.map((item, index) => {
                    return <View
                      key={item.categoryShowId}
                      className={index === curCateIndex ? 'cate-list-item cur' : 'cate-list-item'}
                      onClick={this.changeCate.bind(this, index, item)}
                    >{item.name}</View>
                  })
                }
              </MovableView>
            </MovableArea>
          </View >
        }
      </View>
    )
  }

}

export default CateList
