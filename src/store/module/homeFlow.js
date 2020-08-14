/* 
* 个人中心
*/
import { observable } from 'mobx'
import $fetch, { $api } from '@/api'

const HomeFlow = observable({
  balance: '0.00',//商品分类
  myCommission: '0.00',
  leaderAmountTotal: {
    allTotalCommission: '0.00',
    recommendTeamWaitSendCommission: "0.00"
  },
  //获取我的余额
  async asyncGetMyBalance() {
    try {
      const { data: { data } } = await $fetch($api.getMyBalance)
      this.balance = data.balance
    } catch (err) {
      console.error('我的余额', err)
    }
  },
  //团长待发放余额 预估总收益
  async asyncGetLeaderAmountTotal() {
    try {
      const { data } = await $fetch($api.getLeaderAmountTotal)
      this.leaderAmountTotal = {
        allTotalCommission: data.allTotalCommission,
        recommendTeamWaitSendCommission: data.recommendTeamWaitSendCommission
      }
    } catch (err) {
      console.error('我的收益', err)
    }
  }
})


export default HomeFlow