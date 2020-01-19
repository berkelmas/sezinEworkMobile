//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewPropTypes,
  TouchableHighlight,
  PixelRatio,
  TouchableNativeFeedback
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
        ...props.buttonStyle,
        shadowColor: props.color
      }}
    >
      <TouchableNativeFeedback
        disabled={props.loading ? true : false}
        onPress={props.onPress}
      >
        {props.loading ? (
          <View
            style={{
              ...styles.Button,
              backgroundColor: props.color
            }}
          >
            <View
              style={{
                height: props.buttonHeight ? props.buttonHeight : 31,
                width: 25
              }}
            >
              <MaterialIndicator color="white" size={30} />
            </View>
          </View>
        ) : (
          <View style={{ ...styles.Button, backgroundColor: props.color }}>
            <Text style={{ ...styles.buttonText, ...props.buttonTextStyle }}>
              {props.text}
            </Text>
          </View>
        )}
      </TouchableNativeFeedback>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  Button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
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

    elevation: 10,
    borderRadius: 8,
    overflow: "hidden"
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
  loading: PropTypes.bool,
  buttonStyle: PropTypes.object,
  buttonHeight: PropTypes.number
};

//make this component available to the app
export default React.memo(SezinLoadingButton);
