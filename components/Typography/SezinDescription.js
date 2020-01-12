import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewPropTypes,
  PixelRatio
} from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../assets/styles/colors";

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
    fontSize: 16 / PixelRatio.getFontScale()
  }
});

SezinDescription.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style
};

export default SezinDescription;
