import React from "react";
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

// FAKE DATA
import { announcements } from "../../assets/data/announcements.data";

const SezinAnnouncements = props => {
  return (
    <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
      {announcements.map(
        (res, index) =>
          index < 5 && (
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
          )
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
