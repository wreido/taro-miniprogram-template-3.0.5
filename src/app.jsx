import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { Provider } from "mobx-react";
import store from "@/store";

import "./app.scss";

class App extends Component {
  componentDidMount() {
    if (Taro.canIUse("getUpdateManager")) {
      const updateManager = Taro.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            Taro.showModal({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              success: function (ress) {
                if (ress.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              },
            });
          });
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            Taro.showModal({
              title: "已经有新版本了哟~",
              content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
            });
          });
        }
      });
    }
  }

  componentDidShow() {
    //获取设备信息
    store.appFlow.getSystemInfo();
  }

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider {...store}>{this.props.children}</Provider>;
  }
}

export default App;
