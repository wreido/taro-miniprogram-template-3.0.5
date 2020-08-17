/**
 * 分享模态框
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Icon, Button } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'

@inject('loginFlow', 'shareFlow')
@observer
class ShareModal extends Component {

  static defaultProps = {
    // 父级组件来源 (必传)  index:首页  goods:商品
    entry: '',
    // 拓展参数 非通用
    extraData: {}
  }

  // 组件显示期
  componentDidShow() {
    this.props.shareFlow.showShareModal = false
  }

  // 组件销毁期
  componentWillUnmount() {
    this.props.shareFlow.showShareModal = false
  }

  // 销毁
  componentDidHide() {
    this.props.shareFlow.showShareModal = false
  }

  // 分享给朋友 配置  onShareAppMessage钩子函数必须放父级组件,子组件内无效
  onShareAppMessage() { }

  // 分享朋友圈 生成海报
  hanldShareQuan = () => {
    const { entry, shareFlow, extraData } = this.props
    if (!entry) return

    switch (entry) {
      case 'index': // 首页
        shareFlow.createHomePoster()
        break;
      case 'goods': // 商品 必须传商品ID、商品图片
        shareFlow.createGoodsPoster(extraData)
        break;
    }

    shareFlow.showShareModal = true
    this.closeShareModal()
  }

  // 保存海报
  handleSavePoster = async () => {
    const { authSetting } = await Taro.getSetting()
    if (authSetting['scope.writePhotosAlbum'] || authSetting['scope.writePhotosAlbum'] == void 0) {
      try {
        const posterImgUrlFlag = await Taro.downloadFile({ url: this.props.shareFlow.posterImgUrl })
        await Taro.saveImageToPhotosAlbum({ filePath: posterImgUrlFlag.tempFilePath })
        Taro.showToast({ title: '海报保存成功,快去分享给好友吧', icon: 'none', duration: 1000 })
      } catch (err) {
        console.error(err)
      }
    } else {
      Taro.openSetting()
    }
  }

  // 关闭分享弹窗
  closeShareModal = () => {
    const { entry, shareFlow } = this.props
    shareFlow.showShareModal = false
    if (entry === 'index') Taro.showTabBar()
  }

  // 关闭分享海报弹窗
  closeSharePosterModal = () => {
    this.props.shareFlow.showSharePosterModal = false
  }

  render() {
    const { showShareModal, showSharePosterModal, posterImgUrl } = this.props.shareFlow
    return (
      <View className='shareModalWrap'>
        {
          showSharePosterModal && <View className='posterModal' catchtouchmove='ture'>
            <View className='posterImg'>
              <Image className='image' src={posterImgUrl} />
              <View className='close' onClick={() => { this.closeSharePosterModal() }}></View>
            </View>
            <View className='save' title='保存图片' onClick={() => { this.handleSavePoster() }}>保存图片</View>
          </View>
        }

        {showShareModal && (<View className='shareWrapper'>
          <View className='modal_mask' onClick={() => { this.closeShareModal() }}></View>
          <View className='shareModal'>
            <View className='head'>分享给好友，TA购买你将得收益</View>
            <View className='body'>
              <Button className='item shareFriend' openType='share' title='分享微信好友' >
                <View className='icon'><Icon className='icon-image'></Icon></View>
                <View className='text'><Text className='tip-text'>分享给好友</Text></View>
              </Button>
              <Button className='item shareQuan' onClick={this.hanldShareQuan} title='生成海报分享朋友圈'>
                <View className='icon'><Icon className='icon-image'></Icon></View>
                <View className='text'><Text className='tip-text'>生成图片</Text></View>
              </Button>
            </View>
            <View className='foot' onClick={() => { this.closeShareModal() }}>取消</View>
          </View>
        </View>
        )}
      </View>
    )
  }
}

export default ShareModal
