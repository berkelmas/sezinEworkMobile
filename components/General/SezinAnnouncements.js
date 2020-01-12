import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PixelRatio
} from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../assets/styles/colors";
import IcomoonIcon from "../Typography/IcomoonIcon";

import { MaterialIndicator } from "react-native-indicators";
import moment from "moment";
import "moment/locale/tr"; // without this line it didn't work

const SezinAnnouncements = props => {
  const renderAnnouncements = () => {
    return props.announcementsData.map(
      (res, index) =>
        index < 5 && (
          <TouchableOpacity
            onPress={props.onPress.bind(this, res)}
            key={res.id}
            style={styles.itemContainer}
          >
            <View>
              <Text style={styles.dateText}>
                {moment(res.startDateValue)
                  .locale("tr")
                  .format("ll")}
              </Text>
              <Text style={styles.titleText}>{res.title}</Text>
            </View>
            <IcomoonIcon name="chevron-right" size={25} color={colors.gray} />
          </TouchableOpacity>
        )
    );
  };

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
      {props.loading ? (
        <View style={{ height: 229 }}>
          <MaterialIndicator size={50} color={colors.blue} />
        </View>
      ) : (
        renderAnnouncements()
      )}
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
    fontSize: 12 / PixelRatio.getFontScale()
  },
  titleText: {
    color: colors.dark,
    fontFamily: "Airbnb-Light",
    fontSize: 15 / PixelRatio.getFontScale()
  }
});

SezinAnnouncements.propTypes = {
  onPress: PropTypes.func
};

export default SezinAnnouncements;
