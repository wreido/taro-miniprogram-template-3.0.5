import appFlow from './module/appFlow'
import loginFlow from './module/loginFlow'
import shareFlow from './module/shareFlow'
import mainFlow from './module/mainFlow'
import homeFlow from './module/homeFlow'
import goodsDetailFlow from './module/goodsDetailFlow'

const Store = {
  appFlow,//app
  loginFlow,//登录用户
  shareFlow,//分享
  mainFlow,//首页
  homeFlow,//个人中心
  goodsDetailFlow,//商品详情
}

export default Store