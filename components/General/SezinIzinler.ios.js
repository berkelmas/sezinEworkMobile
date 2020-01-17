import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  PixelRatio
} from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../assets/styles/colors";

import { izinlerData } from "../../assets/data/izinler.data";

// create a component
const SezinIzinler = props => {
  return (
    <View
      style={{
        ...styles.container,
        ...props.containerStyle
      }}
    >
      {Array(4)
        .fill(0)
        .map((item, index) => (
          <TouchableOpacity
            onPress={() => props.onIzinPress(izinlerData[index])}
            key={index}
            style={{
              ...styles.singleItem,
              marginRight: index % 2 === 0 ? 20 : 0
            }}
          >
            <Image
              source={izinlerData[index].image}
              style={styles.imageStyle}
            />
            <View style={{ height: "40%", padding: 5 }}>
              <Text style={styles.placeStyle}>{izinlerData[index].status}</Text>
              <Text style={styles.titleStyle}>{izinlerData[index].title}</Text>
              <Text style={styles.dateStyle}>
                {izinlerData[index].startDate}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    paddingHorizontal: 20
  },
  singleItem: {
    backgroundColor: "white",
    height: 180,
    marginTop: 20,
    width: (Dimensions.get("window").width - 60) / 2,
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
    width: "100%",
    height: "60%",
    resizeMode: "cover"
  },
  placeStyle: {
    color: colors.green,
    fontSize: 15 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Light"
  },
  titleStyle: {
    color: colors.dark,
    fontSize: 16 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Light"
  },
  dateStyle: {
    color: colors.gray,
    fontSize: 12 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Light"
  }
});

SezinIzinler.propTypes = {
  onIzinPress: PropTypes.func,
  izinler: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      startDateValue: PropTypes.instanceOf(Date),
      finishDateValue: PropTypes.instanceOf(Date),
      description: PropTypes.string,
      count: PropTypes.number,
      leaveRequestType: PropTypes.string,
      leaveRequestTypeEnum: PropTypes.number
    })
  )
};

//make this component available to the app
export default SezinIzinler;
