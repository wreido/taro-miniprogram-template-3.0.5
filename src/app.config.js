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
  }
}
