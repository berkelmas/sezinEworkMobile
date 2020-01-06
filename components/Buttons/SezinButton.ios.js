import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ViewPropTypes,
  PixelRatio
} from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../assets/styles/colors";

const SezinButton = props => {
  return (
    <View
      style={{
        ...styles.buttonContainer,
        ...props.containerStyle,
        shadowColor: props.color
      }}
    >
      <TouchableHighlight
        onPress={props.onPress}
        underlayColor={props.overlayColor}
        style={{
          ...styles.loginButton,
          ...props.buttonStyle,
          backgroundColor: props.color
        }}
      >
        <Text style={{ ...styles.buttonText, ...props.buttonTextStyle }}>
          {props.text}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8
  },
  buttonContainer: {
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
    borderRadius: 8
  },
  buttonText: {
    color: "white",
    fontFamily: "Airbnb-Book",
    fontSize: 25 / PixelRatio.getFontScale()
  }
});

SezinButton.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func,
  text: PropTypes.string,
  overlayColor: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  buttonTextStyle: Text.propTypes.style,
  buttonStyle: PropTypes.object
};

export default SezinButton;
