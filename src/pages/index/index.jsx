import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import $fetch, { $api } from "@/api";
import Bus, { BusType } from "@/bus";
import { observer, inject } from "mobx-react";
import { styled } from "linaria/react";

import "./index.scss";

const Title = styled(Text)`
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  border: ${(props) => props.border};
`;

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
        <Title
          className="dadadada"
          color="red"
          width="10px"
          border="2px solid #000000"
        >
          13131
        </Title>
        <View>{goodsDetail}</View>
      </View>
    );
  }
}

export default Index;
