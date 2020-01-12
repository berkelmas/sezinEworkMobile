import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewPropTypes,
  PixelRatio
} from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../assets/styles/colors";
import moment from "moment";
import "moment/locale/tr";

const SezinSingleAnnouncement = props => {
  return (
    <View style={{ ...styles.container, ...props.contentContainerStyle }}>
      <Text style={styles.dateText}>
        {moment(props.date)
          .locale("tr")
          .format("ll")}
      </Text>
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
    fontSize: 15 / PixelRatio.getFontScale()
  },
  titleText: {
    fontFamily: "Airbnb-Book",
    fontSize: 21 / PixelRatio.getFontScale(),
    color: colors.dark
  },
  descriptionText: {
    fontFamily: "Airbnb-Light",
    fontSize: 15 / PixelRatio.getFontScale(),
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

export default React.memo(SezinSingleAnnouncement);
