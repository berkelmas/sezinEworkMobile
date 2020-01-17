//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import IcomoonIcon from "../Typography/IcomoonIcon";
import { colors } from "../../assets/styles/colors";

// create a component
const ErrorStateComponent = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <IcomoonIcon name="redo" size={45} color={colors.red} />
      <Text
        style={{
          fontFamily: "Airbnb-Light",
          fontSize: 18,
          color: colors.red,
          textAlign: "center"
        }}
      >
        Hata Meydana Geldi.
      </Text>
      <Text
        style={{
          fontFamily: "Airbnb-Light",
          fontSize: 18,
          color: colors.red,
          textAlign: "center"
        }}
      >
        Tekrar Yüklemek İçin Tıklayın.
      </Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 400,
    justifyContent: "center",
    alignItems: "center"
  }
});

ErrorStateComponent.propTypes = {
  onPress: PropTypes.func
};

//make this component available to the app
export default ErrorStateComponent;
