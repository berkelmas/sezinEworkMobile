import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../assets/styles/colors";

const SezinButton = props => {
  return (
    <View style={{ ...styles.buttonContainer, shadowColor: props.color }}>
      <TouchableHighlight
        onPress={props.onPress}
        underlayColor={colors.darkBlue}
        style={{ ...styles.loginButton, backgroundColor: props.color }}
      >
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
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
    fontSize: 25
  }
});

SezinButton.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func
};

export default SezinButton;
