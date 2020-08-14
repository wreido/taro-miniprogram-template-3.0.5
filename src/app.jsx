import React, { Component } from "react";
import { Provider } from "mobx-react";
import store from "@/store";

import "./app.scss";

class App extends Component {
  componentDidMount() {}

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
