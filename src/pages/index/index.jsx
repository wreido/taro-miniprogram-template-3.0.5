import React, { Component } from "react";
import { View } from "@tarojs/components";
import $fetch, { $api } from "@/api";
import Bus, { BusType } from "@/bus";
import { observer, inject } from "mobx-react";

import "./index.scss";

@inject("appFlow")
@observer
class Index extends Component {
  state = {
    goodsDetail: 0, //商品详情
  };

  componentDidMount() {
    Bus.on(BusType.refreshHome, (is) => {
      this.getGoodsList(is);
    });
    this.getGoodsList();
  }

  // 组件销毁期
  componentWillUnmount() {
    Bus.off(BusType.refreshHome);
  }

  getGoodsList = async (is) => {
    try {
      const { data } = await $fetch($api.getGoodsList);
      this.setState({ goodsDetail: is ? 131 : 555 }, () => {
        console.log(this.props.appFlow.isIphoneX);
        console.log(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { goodsDetail } = this.state;

    return (
      <View className="index">
        <View>{goodsDetail}</View>
      </View>
    );
  }
}

export default Index;
