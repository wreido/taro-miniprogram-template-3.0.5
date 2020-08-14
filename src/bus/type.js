/*
 * 消息机制
 * @example
 * 
 * Bus.on(BusType.refreshHome, (data) => { console.long(data) })
 * Bus.trigger(BusType.refreshHome)
 * 
*/

const type = Object.create(null)

// 个人中心
type.refreshHome = 'home'
// 首页
type.refreshIndex = 'index'
// 商品详情
type.refreshGoodsDetail = 'goodsDetail'

export default type
