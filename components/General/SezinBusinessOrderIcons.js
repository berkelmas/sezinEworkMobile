import React from "react";
import { View } from "react-native";
import IcomoonIcon from "../Typography/IcomoonIcon";
import { colors } from "../../assets/styles/colors";

export const notStarted = () => (
  <IcomoonIcon
    name="times"
    size={25}
    color={colors.red}
    style={{ paddingRight: 10 }}
  />
);

export const notStartedToWorkingOn = () => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <IcomoonIcon
      name="times"
      size={25}
      color={colors.red}
      style={{ paddingRight: 10 }}
    />
    <IcomoonIcon
      name="arrow-right"
      size={20}
      color={colors.gray}
      style={{ paddingRight: 10 }}
    />
    <IcomoonIcon
      name="spinner"
      size={23}
      color={colors.blue}
      style={{ paddingRight: 10 }}
    />
  </View>
);

export const startedToCompleted = () => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <IcomoonIcon
      name="spinner"
      size={23}
      color={colors.blue}
      style={{ paddingRight: 10 }}
    />
    <IcomoonIcon
      name="arrow-right"
      size={20}
      color={colors.gray}
      style={{ paddingRight: 10 }}
    />
    <IcomoonIcon
      name="check"
      size={21}
      color={colors.green}
      style={{ paddingRight: 10 }}
    />
  </View>
);
