import React from "react";
import { View, Text, StyleSheet, PixelRatio } from "react-native";
import { Tooltip } from "react-native-elements";
import { colors } from "../assets/styles/colors";

const _renderTooltip = (text, width, fontSize = 20) => {
  return (
    <Tooltip
      containerStyle={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowOpacity: 0.15,
        shadowRadius: 7,

        elevation: 9
      }}
      height={40}
      width={width}
      backgroundColor={colors.lightGray}
      popover={
        <View>
          <Text
            style={{
              fontFamily: "Airbnb-Light",
              fontSize: 15,
              color: colors.dark
            }}
          >
            {text}
          </Text>
        </View>
      }
    >
      <Text
        style={{ ...styles.bottomRightTexts, color: colors.blue, fontSize }}
      >
        {text
          .split("")
          .slice(0, 20)
          .join("") + "..."}
      </Text>
    </Tooltip>
  );
};

export const _convertIzinStatus = (param, fontSize = 20) => {
  switch (param) {
    case 0:
      return (
        <Text
          style={{ ...styles.bottomRightTexts, color: colors.blue, fontSize }}
        >
          B. Sorumlusunda
        </Text>
      );
    case 1:
      return (
        <Text
          style={{ ...styles.bottomRightTexts, color: colors.blue, fontSize }}
        >
          Y. Onayında
        </Text>
      );
    case 2:
      return (
        <Text
          style={{ ...styles.bottomRightTexts, color: colors.green, fontSize }}
        >
          Onaylandı
        </Text>
      );
    case 3:
      return (
        <Text
          style={{
            ...styles.bottomRightTexts,
            color: colors.darkRed,
            fontSize
          }}
        >
          İptal Edildi
        </Text>
      );
    case 4:
      return (
        <Text
          style={{ ...styles.bottomRightTexts, color: colors.blue, fontSize }}
        >
          T. Sorumlusunda
        </Text>
      );
    case 5:
      return (
        <Text
          style={{ ...styles.bottomRightTexts, color: colors.red, fontSize }}
        >
          İptal Sürecinde
        </Text>
      );
    case 6:
      return (
        <Text
          style={{ ...styles.bottomRightTexts, color: colors.red, fontSize }}
        >
          Silindi
        </Text>
      );
    case 7:
      return (
        <Text
          style={{ ...styles.bottomRightTexts, color: colors.red, fontSize }}
        >
          Reddedildi
        </Text>
      );
    case 8:
      return (
        <Text
          style={{ ...styles.bottomRightTexts, color: colors.blue, fontSize }}
        >
          IK'da Bekliyor
        </Text>
      );
    default:
      return (
        <Text
          style={{ ...styles.bottomRightTexts, color: colors.red, fontSize }}
        ></Text>
      );
  }
};

export const _showIzinCancelButton = param => {
  switch (param) {
    case 0:
      return true;
    case 1:
      return true;
    case 2:
      return true;
    case 3:
      return false;
    case 4:
      return true;
    case 5:
      return false;
    case 6:
      return false;
    case 7:
      return false;
    default:
      break;
  }
};

export const _showIzinDenyDetailsButton = param => {
  switch (param) {
    case 0:
      return false;
    case 1:
      return false;
    case 2:
      return false;
    case 3:
      return false;
    case 4:
      return false;
    case 5:
      return false;
    case 6:
      return true;
    case 7:
      return true;
    default:
      break;
  }
};

export const _showIzinCancelDetailsButton = param => {
  return param === 3 ? true : false;
};

export const _showIzinCancelWaitingButton = param => {
  return param === 5 ? true : false;
};

const styles = StyleSheet.create({
  bottomRightTexts: {
    fontSize: 20 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Light"
  }
});
