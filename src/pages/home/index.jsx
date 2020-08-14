import React, { Component } from "react";
import Bus, { BusType } from "@/bus";
import { View } from "@tarojs/components";

import "./index.scss";

class Index extends Component {
  toHome = () => {
    Bus.trigger(BusType.refreshHome, true);
  };

  render() {
    return (
      <View className="index" onClick={this.toHome}>
        11111111
      </View>
    );
  }
}

export default Index;
