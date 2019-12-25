import React from "react";
import { View, Text, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../assets/styles/colors";

const SezinDescription = props => {
  return (
    <View style={props.containerStyle}>
      <Text style={{ ...styles.text, ...props.textStyle }}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Airbnb-Light",
    color: colors.gray,
    fontSize: 16
  }
});

SezinDescription.propTypes = {
  text: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style
};

export default SezinDescription;
