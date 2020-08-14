export default function (imgSrc, type, { width = 100, height = 100 } = {}) {
  let process = '?x-oss-process=image'
  // 大小-处理 cover中心显示   imgcard图片卡片
  switch (type) {
    case 'xs-cover':
      process += '/resize,m_fill,h_50,w_50'
      break
    case 'sm-cover':
      process += '/resize,m_fill,h_100,w_100'
      break
    case 'md-cover':
      process += '/resize,m_fill,h_380,w_380'
      break
    case 'lg-cover':
      process += '/resize,m_fill,h_500,w_500'
      break
    case 'xl-cover':
      process += '/resize,m_fill,h_1000,w_1000'
      break
    case 'imgcard':
      process += '/resize,m_fill,h_240,w_380'
      break
    case 'orient':
      process += '/resize,h_4096,w_4096/auto-orient,1'
      break
    case 'storeimg':
      process += '/resize,m_fill,h_180,w_240'
      break
    case 'goodsimg':
      process += '/resize,m_fill,h_250,w_375'
      break
    case 'detailimg':
      process += '/resize,w_750'
      break
    case 'lg-rectangle':
      // 中尺寸矩形
      process += '/resize,m_fill,h_320,w_700,limit_0'
      break
    case 'resizeFill':
      process += '/resize,m_fill,w_' + width + ',h_' + height
      break
    default:
      break
  }
  return imgSrc + process
}
