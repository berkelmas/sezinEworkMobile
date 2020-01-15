//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, PixelRatio } from "react-native";

// create a component
const SezinSingleBusinessReport = () => {
  return (
    <View style={styles.container}>
      <Text>SezinSingleBusinessReport</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
  },
  imageStyle: {
    borderRadius: 4,
    height: 300,
    width: "100%",
    resizeMode: "cover"
  },
  placeText: {
    color: colors.green,
    fontSize: 15 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Book"
  },
  titleText: {
    color: colors.dark,
    fontSize: 21 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Book"
  },
  descriptionText: {
    color: colors.gray,
    fontSize: 15 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Light"
  },
  bottomTexts: {
    color: colors.dark,
    fontSize: 15 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Light"
  },
  bottomRightTexts: {
    fontSize: 20 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Light"
  }
});

SezinSingleBusinessReport.propTypes = {
  contentContainerStyle: ViewPropTypes.style,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string
};

//make this component available to the app
export default SezinSingleBusinessReport;
