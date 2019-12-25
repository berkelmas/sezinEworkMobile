import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/icomoon-selection.json";
const expoAssetId = require("../assets/fonts/icomoon.ttf");
const CustomIcon = createIconSetFromIcoMoon(
  icoMoonConfig,
  "Icomoon",
  expoAssetId
);

const IcomoonIcon = props => {
  return <CustomIcon name={props.name} size={props.size} color={props.color} />;
};

IcomoonIcon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string
};

export default IcomoonIcon;
