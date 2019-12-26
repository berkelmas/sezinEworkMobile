import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../assets/styles/colors";
import IcomoonIcon from "./IcomoonIcon";

// FAKE DATA
import { notifications } from "../assets/data/notifications.data";

const SezinAnnouncements = props => {
  return (
    <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
      {notifications.map((res, index) => (
        <TouchableOpacity
          onPress={props.onPress.bind(this, res)}
          key={res.id}
          style={styles.itemContainer}
        >
          <View>
            <Text style={styles.dateText}>{res.date}</Text>
            <Text style={styles.titleText}>{res.title}</Text>
          </View>
          <IcomoonIcon name="chevron-right" size={25} color={colors.gray} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 0.3,
    borderBottomColor: colors.gray,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dateText: {
    color: colors.green,
    fontFamily: "Airbnb-Light",
    fontSize: 12
  },
  titleText: {
    color: colors.dark,
    fontFamily: "Airbnb-Light",
    fontSize: 15
  }
});

SezinAnnouncements.propTypes = {
  onPress: PropTypes.func
};

export default SezinAnnouncements;
