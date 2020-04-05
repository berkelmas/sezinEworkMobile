//import liraries
import React from "react";
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
import {
  _convertIzinStatus,
  _showIzinCancelButton,
  _showIzinCancelWaitingButton,
  _showIzinDenyDetailsButton,
  _showIzinCancelDetailsButton,
} from "../../utilities/izin-functions";
import IzinImage1 from "../../assets/images/izin/izin-image-1.png";
import { colors } from "../../assets/styles/colors";
import SezinButton from "../Buttons/SezinButton";
import moment from "moment";
import "moment/locale/tr"; // without this line it didn't work

// create a component
const SezinSingleIzin = (props) => {
  console.log(props);
  return (
    <View style={{ ...styles.container, ...props.contentContainerStyle }}>
      <Image source={IzinImage1} style={styles.imageStyle} />
      {/* CONTENT CONTAINER */}
      <View style={{ padding: 10 }}>
        <Text style={styles.placeText}>{`${props.count} Gün`}</Text>
        <Text style={styles.titleText}>{props.leaveRequestType}</Text>
        <Text style={styles.descriptionText}>{props.description}</Text>

        <View
          onPress={console.log.bind(this, "berkelmas")}
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 15,
            paddingBottom: 5,
          }}
        >
          <Text style={styles.bottomTexts}>Durum:</Text>
          {_convertIzinStatus(props.leaveRequestStatuTypeValue)}
        </View>
        <View
          onPress={console.log.bind(this, "berkelmas")}
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 15,
            paddingBottom: 5,
          }}
        >
          <Text style={styles.bottomTexts}>Başlangıç Tarihi:</Text>
          <Text style={{ ...styles.bottomRightTexts, color: colors.blue }}>
            {moment(props.startDate).locale("tr").format("ll")}
          </Text>
        </View>

        {!props.buttonsNotRendered && (
          <>
            {/* IZIN CANCEL BUTTON */}
            {_showIzinCancelButton(props.leaveRequestStatuTypeValue) && (
              <SezinButton
                onPress={() => props.onCancelRequestButtonPressed()}
                color={colors.red}
                overlayColor={colors.darkRed}
                text="Talebi İptal Et"
                containerStyle={{
                  marginVertical: 10,
                }}
                buttonTextStyle={{
                  fontSize: 19,
                }}
              />
            )}
            {/* IZIN CANCEL WAITING BUTTON */}
            {_showIzinCancelWaitingButton(props.leaveRequestStatuTypeValue) && (
              <SezinButton
                onPress={() => props.onIzinCancelWaitingButtonPressed()}
                color={colors.blue}
                overlayColor={colors.darkBlue}
                text="İptal Talebi Beklemede"
                containerStyle={{
                  marginVertical: 10,
                }}
                buttonTextStyle={{
                  fontSize: 19,
                }}
              />
            )}

            {/* IZIN DENY DETAILS BUTTON */}
            {_showIzinDenyDetailsButton(props.leaveRequestStatuTypeValue) && (
              <SezinButton
                onPress={() => props.onIzinDenyDetailsButtonPressed()}
                color={colors.blue}
                overlayColor={colors.darkBlue}
                text="Ret Açıklaması"
                containerStyle={{
                  marginVertical: 10,
                }}
                buttonTextStyle={{
                  fontSize: 19,
                }}
              />
            )}

            {/* MY CANCEL DESCRIPTION BUTTON */}
            {_showIzinCancelDetailsButton(props.leaveRequestStatuTypeValue) && (
              <SezinButton
                onPress={() => props.onIzinCancelDetailsButtonPressed()}
                color={colors.blue}
                overlayColor={colors.darkBlue}
                text="İptal Açıklaması"
                containerStyle={{
                  marginVertical: 10,
                }}
                buttonTextStyle={{
                  fontSize: 19,
                }}
              />
            )}
          </>
        )}
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
    height: 200,
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
});

SezinSingleIzin.propTypes = {
  contentContainerStyle: ViewPropTypes.style,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
  onCancelRequestButtonPressed: PropTypes.func,
  onIzinCancelWaitingButtonPressed: PropTypes.func,
  onIzinDenyDetailsButtonPressed: PropTypes.func,
  onIzinCancelDetailsButtonPressed: PropTypes.func,
};

//make this component available to the app
export default React.memo(SezinSingleIzin);
