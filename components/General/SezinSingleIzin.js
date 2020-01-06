//import liraries
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  PixelRatio,
  ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";
import IzinImage1 from "../../assets/images/izin/izin-image-1.png";
import { colors } from "../../assets/styles/colors";

// create a component
const SezinSingleIzin = props => {
  const _renderStatus = () => {
    switch (props.status) {
      case "Bekleniyor":
        return (
          <Text style={{ ...styles.bottomRightTexts, color: colors.blue }}>
            {props.status}
          </Text>
        );
      case "Onaylandı":
        return (
          <Text style={{ ...styles.bottomRightTexts, color: colors.green }}>
            {props.status}
          </Text>
        );
      case "Reddedildi":
        return (
          <Text style={{ ...styles.bottomRightTexts, color: colors.red }}>
            {props.status}
          </Text>
        );
      default:
        break;
    }
  };

  return (
    <View style={{ ...styles.container, ...props.contentContainerStyle }}>
      <Image source={IzinImage1} style={styles.imageStyle} />
      {/* CONTENT CONTAINER */}
      <View style={{ padding: 10 }}>
        <Text style={styles.placeText}>{props.date}</Text>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text style={styles.descriptionText}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using ‘Content here, content here’, making it
          look like readable English.
        </Text>

        <View
          onPress={console.log.bind(this, "berkelmas")}
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 15,
            paddingBottom: 5
          }}
        >
          <Text style={styles.bottomTexts}>Durum:</Text>
          {_renderStatus()}
        </View>
      </View>
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

SezinSingleIzin.propTypes = {
  contentContainerStyle: ViewPropTypes.style,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string
};

//make this component available to the app
export default SezinSingleIzin;
