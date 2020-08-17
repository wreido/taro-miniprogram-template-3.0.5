/* 
* 个人中心 余额
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'


import './index.scss'

@inject('loginFlow', 'homeFlow')
@observer

class Balance extends Component {

  componentDidMount() {
    if (!this.props.loginFlow.userId) return
    //获取我的余额
    this.props.homeFlow.asyncGetMyBalance()
    //团长待发放余额 预估总收益
    if (this.props.loginFlow.userInfo.user.roles.hasHead) this.props.homeFlow.asyncGetLeaderAmountTotal()
  }

  popTips = (e) => {
    e.stopPropagation()
    Taro.showModal({
      title: '预估总收益',
      content: '已结算和待结算的消费收益、推荐收益之和（已失效的不统计入内）',
      showCancel: false,
      confirmText: '我知道啦',
      confirmColor: '#ff7113'
    })
  }

  // 待提现余额的提示
  popCashWithdrawalTips = (e) => {
    e.stopPropagation()
    Taro.showModal({
      title: '待提现余额',
      content: '消费收益会结算到待提现余额，可自行提现到银行卡',
      showCancel: false,
      confirmText: '我知道啦',
      confirmColor: '#ff7113'
    })
  }

  // 待发放余额的提示
  popProvideTips = (e) => {
    e.stopPropagation()
    Taro.showModal({
      title: '待发放余额',
      content: '推荐收益会结算到待发放余额，统一发放到银行卡',
      showCancel: false,
      confirmText: '我知道啦',
      confirmColor: '#ff7113'
    })
  }

  render() {
    const { userId } = this.props.loginFlow
    const { hasHead } = this.props.loginFlow.userInfo.user.roles || {}
    const { balance } = this.props.homeFlow
    const { allTotalCommission, recommendTeamWaitSendCommission } = this.props.homeFlow.leaderAmountTotal

    if (userId) {
      return (
        <View className='balance'>
          {/* 收益弹窗 */}
          <View className='balance-header' >
            <View className='balance-header-left' onClick={this.balanceRecord.bind(this)}>
              <View className='title'>待提现余额(元)</View>
              <View className='tip' onClick={this.popCashWithdrawalTips.bind(this)}>
                <Image className='tip-icon' mode='aspectFill' src='https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zy-mp/local/shopping/icon_question_jin.png'></Image>
              </View>
              <View className='number'>{balance}</View>
            </View>
            <View className='balance-header-right' onClick={this.cashWithdrawal.bind(this)}>
              立即提现
            </View>
          </View>

          {
            hasHead && <View className='balance-content'>
              <View className='balance-content-line'></View>
              <View className='balance-content-item balance-content-left'>
                <View className='title'>
                  待发放余额(元)
                <View className='tip' onClick={this.popProvideTips.bind(this)}>
                    <Image className='tip-icon' mode='aspectFill' src='https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zy-mp/local/shopping/question.png'></Image>
                  </View>
                </View>
                <View className='number'>{recommendTeamWaitSendCommission}</View>
              </View>
              <View className='balance-content-item balance-content-right'>
                <View className='title'>
                  预估总收益
              <View className='tip' onClick={this.popTips.bind(this)}>
                    <Image className='tip-icon' mode='aspectFill' src='https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zy-mp/local/shopping/question.png'></Image>
                  </View>
                </View>
                <View className='number'>{allTotalCommission}</View>
              </View>
            </View>
          }
        </View>
      )
    }

  }

}

export default Balance
