import React from "react";
import { View, Text, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../assets/styles/colors";

const SezinSingleAnnouncement = props => {
  return (
    <View style={{ ...styles.container, ...props.contentContainerStyle }}>
      <Text style={styles.dateText}>{props.date}</Text>
      <Text style={styles.titleText}>{props.title}</Text>
      <Text style={styles.descriptionText}>{props.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 15,
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
  dateText: {
    color: colors.green,
    fontFamily: "Airbnb-Book",
    fontSize: 15
  },
  titleText: {
    fontFamily: "Airbnb-Book",
    fontSize: 21,
    color: colors.dark
  },
  descriptionText: {
    fontFamily: "Airbnb-Light",
    fontSize: 15,
    color: colors.gray,
    marginTop: 10
  }
});

SezinSingleAnnouncement.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  contentContainerStyle: ViewPropTypes.style
};

export default SezinSingleAnnouncement;
