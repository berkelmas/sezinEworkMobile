//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewPropTypes,
  TouchableHighlight,
  PixelRatio
} from "react-native";
import PropTypes from "prop-types";

// MATERIAL LOADING INDICATOR
import { MaterialIndicator } from "react-native-indicators";

// create a component
const SezinLoadingButton = props => {
  return (
    <View
      style={{
        ...styles.buttonContainer,
        ...props.containerStyle,
        shadowColor: props.color
      }}
    >
      <TouchableHighlight
        disabled={props.loading ? true : false}
        onPress={props.onPress}
        underlayColor={props.overlayColor}
        style={{ ...styles.Button, backgroundColor: props.color }}
      >
        {props.loading ? (
          <View style={{ height: 32, width: 25 }}>
            <MaterialIndicator color="white" size={30} />
          </View>
        ) : (
          <Text style={{ ...styles.buttonText, ...props.buttonTextStyle }}>
            {props.text}
          </Text>
        )}
      </TouchableHighlight>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  Button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8
  },
  buttonContainer: {
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15
  },
  buttonText: {
    color: "white",
    fontFamily: "Airbnb-Book",
    fontSize: 25 / PixelRatio.getFontScale()
  }
});

SezinLoadingButton.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func,
  text: PropTypes.string,
  overlayColor: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  buttonTextStyle: Text.propTypes.style,
  loading: PropTypes.bool
};

//make this component available to the app
export default SezinLoadingButton;
