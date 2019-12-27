import React from "react";
import { Text, StyleSheet, PixelRatio } from "react-native";
import PropTypes from "prop-types";

import { colors } from "../assets/styles/colors";

const SezinTitle = props => {
  return (
    <Text style={{ ...styles.mainStyle, ...props.textStyle }}>
      {props.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    fontFamily: "Airbnb-Medium",
    fontSize: 32 / PixelRatio.getFontScale(),
    color: colors.dark
  }
});

SezinTitle.propTypes = {
  text: PropTypes.string,
  textStyle: Text.propTypes.style
};

export default SezinTitle;
