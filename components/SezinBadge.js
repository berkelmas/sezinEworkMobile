//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";

// create a component
const SezinBadge = props => {
  return (
    <View
      style={{ ...styles.contentContainer, ...props.contentContainerStyle }}
    >
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          ...styles.button,
          backgroundColor: props.color,
          width: props.width,
          borderWidth: 1.5,
          borderColor: props.borderColor ? props.borderColor : props.color
        }}
      >
        <Text style={{ ...styles.text, ...props.textStyle }}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  contentContainer: {},
  button: {
    paddingHorizontal: 5,
    paddingVertical: 7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100
  },
  text: {
    fontFamily: "Airbnb-Book",
    fontSize: 18
  }
});

SezinBadge.propTypes = {
  contentContainerStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
  text: PropTypes.string,
  textStyle: Text.propTypes.style,
  width: PropTypes.number,
  borderColor: PropTypes.string
};

//make this component available to the app
export default SezinBadge;
