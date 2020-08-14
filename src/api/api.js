//分服务前缀
export const REST = '/rest'
export const SHOPPING_REST = '/shopping-rest'
export const SUPPLIER_REST = '/supplier-rest'
export const HEAD_REST = '/head-rest'
export const SEKILL_REST_TRADE_ORDER = '/seckill-rest-trade-order'
export const SEKILL_REST_MEMBER_INFO = '/seckill-rest-member-info'
export const SEKILL_REST_MAIN = '/seckill-rest-main'
export const HSZY_SECKILL_REST_THIRD = '/hszy-seckill-rest-third'

export default {
  /**
  * 登录 注册 用户
  */
  //登录
  login: `${REST}/api/mp/community/weixin/none/login`,
  //获取手机验证码
  getValidCode: `${REST}/api/mp/community/weixin/none/getValidCode`,
  //获取openId
  getOpenId: `${REST}/api/mp/community/weixin/none/getOpenId`,
  //获取用户信息
  getuserInfo: `${SEKILL_REST_MEMBER_INFO}/api/mp/community/member/info`,
  //获取团长信息
  getLeaderInfo: `${SEKILL_REST_MEMBER_INFO}/api/mp/community/member/leaderInfo`,
  //更新用户头像昵称
  updateWechatInfo: `${REST}/api/mp/community/member/updateWechatInfo`,
  //绑定团长
  bindLeader: `${HEAD_REST}/api/mp/community/member/bindFakeLeaderByMemberId`,

  /**
  * 商品
  */
  //商品列表
  getGoodsList: `${SEKILL_REST_MAIN}/main/shop/getGoodList`,
  //商品详情
  getGoodsDetail: `${SEKILL_REST_MAIN}/main/shop/getGoodDetail`,
  //商品分类 广告
  getCateOrAdvertisement: `${REST}/api/mp/shop/aggregate/home`,
  //产品富文本介绍
  getGoodsDetailHtml: `${REST}/api/common/oss/get`,

  /**
  * 支付流程
  */
  //获取支付凭证
  getPayment: `${SHOPPING_REST}/api/mp/shop/order/pay/weixin/getPaymentInfo`,

  /**
  * 个人中心
  */
  //我的余额
  getMyBalance: `${REST}/api/mp/community/account/myBalanceForMiniProgram`,
  //团长待发放余额 预估总收益
  getLeaderAmountTotal: `${HEAD_REST}/api/mp/community/recommendteam/stat/allTotalCommissionAndWaitSendCommission`

}