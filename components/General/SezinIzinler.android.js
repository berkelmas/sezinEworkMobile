import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  PixelRatio,
  TouchableNativeFeedback
} from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../assets/styles/colors";
import { MaterialIndicator } from "react-native-indicators";
import { _convertIzinStatus } from "../../utilities/izin-functions";

import moment from "moment";
import "moment/locale/tr"; // without this line it didn't work

// FAKE DATA
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
      {props.loading ? (
        <View
          style={{
            height: 400,
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <MaterialIndicator color={colors.blue} size={50} />
        </View>
      ) : (
        props.izinler.map((item, index) => (
          <View key={index}>
            <TouchableNativeFeedback
              useForeground={true}
              onPress={() => props.onIzinPress(item)}
            >
              <View
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
                  <Text style={styles.placeStyle}>
                    {_convertIzinStatus(item.leaveRequestStatuTypeValue, 15)}
                  </Text>

                  <Text style={styles.titleStyle}>{item.leaveRequestType}</Text>

                  <Text style={styles.dateStyle}>
                    {moment(item.startDateValue)
                      .locale("tr")
                      .format("ll")}
                  </Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
        ))
      )}
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
  onIzinPress: PropTypes.func
};

//make this component available to the app
export default SezinIzinler;
