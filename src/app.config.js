export default {
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  pages: [
    'pages/index/index',
    'pages/home/index',
  ],
  subpackages: [
    {
      root: 'publiPages',
      pages: [
        'test/index',//分包测试
      ]
    }
  ],
  // 分包预下载
  preloadRule: {},
  tabBar: {
    color: "#999999",
    selectedColor: "#FF6000",
    backgroundColor: "#ffffff",
    borderStyle: "white",
    position: "bottom",
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: "./assets/images/tabBarIcon/home_off.png",
        selectedIconPath: "./assets/images/tabBarIcon/home_on.png"
      },
      {
        pagePath: 'pages/home/index',
        text: '我的',
        iconPath: "./assets/images/tabBarIcon/mine_off.png",
        selectedIconPath: "./assets/images/tabBarIcon/mine_on.png"
      }
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
