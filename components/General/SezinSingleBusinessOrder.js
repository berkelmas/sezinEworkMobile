import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ViewPropTypes,
  PixelRatio
} from "react-native";
import { Tooltip } from "react-native-elements";
import PropTypes from "prop-types";
import IsTakibi from "../../assets/images/saha-takibi.jpg";
import { colors } from "../../assets/styles/colors";
import SezinButton from "../Buttons/SezinButton";
import {
  _renderStatus,
  _renderStatusColor
} from "../../utilities/business-order-functions";

const SezinSingleBusinessOrder = props => {
  return (
    <View style={{ ...styles.container, ...props.contentContainerStyle }}>
      <Image source={IsTakibi} style={styles.imageStyle} />
      {/* CONTENT CONTAINER */}
      <View style={{ padding: 10 }}>
        <Text style={styles.placeText}>{props.place}</Text>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text style={styles.descriptionText}>{props.description}</Text>

        {/* BOTTOM TEXT CONTAINER */}
        {!props.assignedByMe && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              paddingBottom: 8
            }}
          >
            <Text style={styles.bottomTexts}>Oluşturan:</Text>
            <Text style={styles.bottomRightTexts}>{props.createdBy}</Text>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 8
          }}
        >
          <Text style={styles.bottomTexts}>Atananlar:</Text>
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
            height={40 + props.assignedUsers.length * 20}
            width={200}
            backgroundColor={colors.lightGray}
            popover={
              <View>
                {props.assignedUsers.map((item, index) => (
                  <Text
                    key={index}
                    style={{
                      fontFamily: "Airbnb-Light",
                      fontSize: 15,
                      color: colors.dark
                    }}
                  >
                    - {item}
                  </Text>
                ))}
              </View>
            }
          >
            <Text style={{ ...styles.bottomRightTexts }}>
              {props.assignedUsers.length} Kişi
            </Text>
          </Tooltip>
        </View>

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 6
          }}
        >
          <Text style={styles.bottomTexts}>Bitiş Tarihi:</Text>
          <Text style={styles.bottomRightTexts}>{props.deadline}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={styles.bottomTexts}>Durum:</Text>

          <Text
            style={{
              ...styles.bottomRightTexts,
              color: _renderStatusColor(props.status),
              paddingBottom: 10
            }}
          >
            {_renderStatus(props.status)}
          </Text>
        </View>

        {props.assignedByMe ? (
          <SezinButton
            onPress={props.onMoreDetailsButtonPressed.bind(this)}
            color={colors.blue}
            text="İş Emri Detayları"
            overlayColor={colors.darkBlue}
            buttonTextStyle={{ fontSize: 21 }}
            containerStyle={{ marginTop: 10, paddingVertical: 10 }}
          />
        ) : (
          <View style={{ flexDirection: "row" }}>
            <SezinButton
              onPress={props.onMoreDetailsButtonPressed.bind(this)}
              color={colors.blue}
              text="Detaylar"
              overlayColor={colors.darkBlue}
              buttonTextStyle={{ fontSize: 21 }}
              containerStyle={{
                marginTop: 10,
                paddingVertical: 10,
                flex: 1,
                marginRight: 15
              }}
            />
            <SezinButton
              onPress={props.onChangeBusinessOrderStatusPressed.bind(this)}
              color={colors.green}
              text="Yönet"
              overlayColor={colors.darkGreen}
              buttonTextStyle={{ fontSize: 21 }}
              containerStyle={{
                marginTop: 10,
                paddingVertical: 10,

                flex: 1
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

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
    color: colors.blue,
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
    fontFamily: "Airbnb-Light",
    marginBottom: 10
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

SezinSingleBusinessOrder.propTypes = {
  contentContainerStyle: ViewPropTypes.style,
  place: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  createdBy: PropTypes.string,
  deadline: PropTypes.string,
  status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  assignedByMe: PropTypes.bool,
  onMoreDetailsButtonPressed: PropTypes.func,
  onChangeBusinessOrderStatusPressed: PropTypes.func,
  assignedUsers: PropTypes.arrayOf(PropTypes.string)
};

export default React.memo(SezinSingleBusinessOrder);
