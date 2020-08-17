import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from '@/pages/index/index'
import store from '@/store'
import '@/assets/style/index.scss'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "Taro小程序模板",
      navigationBarTextStyle: "black",
      backgroundTextStyle: 'dark'
    },
    //主包
    pages: [
      "pages/index/index",//首页
      "pages/home/index",//个人中心
      "pages/goods/goodsDetail/index",//商品详情
      "pages/template",//模板
    ],
    // 小程序分包
    subpackages: [
      // 分包 公共
      {
        root: 'publiPages',
        pages: [
          'login/authorizedLogin/index',//微信授权登陆
          'login/phoneLogin/index',//手机号登陆
          'share/index', //分享
        ]
      }
    ],
    // 分包预下载
    preloadRule: {},
    // 底部导航栏
    tabBar: {
      color: "#999999",
      selectedColor: "#FF6000",
      backgroundColor: "#ffffff",
      borderStyle: "white",
      position: "bottom",
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "./assets/images/tabBarIcon/home_off.png",
          selectedIconPath: "./assets/images/tabBarIcon/home_on.png"
        },
        {
          pagePath: "pages/home/index",
          text: "我的",
          iconPath: "./assets/images/tabBarIcon/mine_off.png",
          selectedIconPath: "./assets/images/tabBarIcon/mine_on.png"
        },
      ]
    },
    // 小程序授权页文案提示，例如：授权登录
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示"
      }
    },
    // 是否开启调试模式
    debug: false,
    // 异步请求超时时间
    networkTimeout: {
      request: 5000
    }
  }

  componentDidMount() {

    //获取设备信息
    store.appFlow.getSystemInfo()

    //非从分享链路进来 默认绑定上级运营商(绑定团长)
    if (store.loginFlow.userId && JSON.stringify(this.$router.params.query) === '{}') {
      store.loginFlow.asyncBindLeader()
    }
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById("app"));
