import React from "react";
import { View, Text, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { colors } from "../assets/styles/colors";

const SezinTitle = props => {
  return (
    <Text style={{ ...styles.mainStyle, ...props.styles }}>{props.text}</Text>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    fontFamily: "Airbnb-Medium",
    fontSize: 32,
    color: colors.dark
  }
});

SezinTitle.propTypes = {
  text: PropTypes.string,
  style: ViewPropTypes.style
};

export default SezinTitle;
