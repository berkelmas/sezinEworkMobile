//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  PixelRatio,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types";
import IzinImage1 from "../../assets/images/izin/izin-image-1.png";
import { colors } from "../../assets/styles/colors";
import SezinLoadingButton from "../Buttons/SezinLoadingButton";
import moment from "moment";
import "moment/locale/tr"; // without this line it didn't work

// create a component
const SezinSingleIzinOptions = (props) => {
  return (
    <View style={{ ...styles.container, ...props.contentContainerStyle }}>
      <Image source={IzinImage1} style={styles.imageStyle} />
      {/* CONTENT CONTAINER */}
      <View style={{ padding: 10 }}>
        <Text style={styles.placeText}>{`${props.count} Gün`}</Text>
        <Text style={styles.titleText}>{props.leaveRequestType}</Text>
        <Text style={styles.descriptionText}>{props.description}</Text>

        <View style={styles.askedByContainer}>
          <Text style={styles.bottomTexts}>İzin Talep Eden:</Text>
          <Text style={{ ...styles.bottomRightTexts, color: colors.blue }}>
            {props.userName}
          </Text>
        </View>

        <View style={styles.askedByContainer}>
          <Text style={styles.bottomTexts}>İzin Başlangıcı:</Text>
          <Text style={{ ...styles.bottomRightTexts, color: colors.blue }}>
            {moment(props.startDate).locale("tr").format("ll")}
          </Text>
        </View>

        <View style={styles.bottomButtonsContainer}>
          <SezinLoadingButton
            loading={props.denyLoading}
            onPress={() => props.onDenyRequest()}
            color={colors.red}
            overlayColor={colors.darkRed}
            text={props.denyButtonText}
            buttonTextStyle={{
              fontSize: 20,
            }}
            containerStyle={{ flex: 1, marginRight: 20 }}
            buttonHeight={26}
          />
          <SezinLoadingButton
            loading={props.approveLoading}
            onPress={() => props.onApproveRequest()}
            color={colors.green}
            overlayColor={colors.darkGreen}
            text={props.approveButtonText}
            buttonTextStyle={{
              fontSize: 20,
            }}
            containerStyle={{ flex: 1 }}
            buttonHeight={26}
          />
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
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  imageStyle: {
    borderRadius: 4,
    height: 300,
    width: "100%",
    resizeMode: "cover",
  },
  placeText: {
    color: colors.green,
    fontSize: 15 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Book",
  },
  titleText: {
    color: colors.dark,
    fontSize: 21 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Book",
  },
  descriptionText: {
    color: colors.gray,
    fontSize: 15 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Light",
  },
  bottomTexts: {
    color: colors.dark,
    fontSize: 15 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Light",
  },
  bottomRightTexts: {
    fontSize: 20 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Light",
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "4%",
    paddingBottom: "4%",
  },
  askedByContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 5,
  },
});

SezinSingleIzinOptions.propTypes = {
  contentContainerStyle: ViewPropTypes.style,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
  askedBy: PropTypes.string,
  startDate: PropTypes.string,
  onDenyRequest: PropTypes.func,
  onApproveRequest: PropTypes.func,
  denyLoading: PropTypes.bool,
  approveLoading: PropTypes.bool,
  approveButtonText: PropTypes.string,
  denyButtonText: PropTypes.string,
};

//make this component available to the app
export default React.memo(SezinSingleIzinOptions);
