import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewPropTypes,
  Dimensions,
  Image,
  TouchableOpacity,
  PixelRatio,
  TouchableNativeFeedback
} from "react-native";
import PropTypes from "prop-types";
import { Tooltip } from "react-native-elements";
import { MaterialIndicator } from "react-native-indicators";
import { colors } from "../../assets/styles/colors";

// FAKE DATA
import { businessOrdersData } from "../../assets/data/business-orders.data";
import moment from "moment";
import "moment/locale/tr"; // without this line it didn't work

const SezinOrders = props => {
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
            height: 360,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <MaterialIndicator size={50} color={colors.blue} />
        </View>
      ) : (
        props.businessOrders.map((item, index) => (
          <View key={index}>
            <View>
              <View
                style={{
                  ...styles.singleItem,
                  marginRight: index % 2 === 0 ? 20 : 0
                }}
              >
                <Image
                  source={businessOrdersData[index].image}
                  style={styles.imageStyle}
                />
                <View style={{ height: "40%", padding: 5 }}>
                  <Text style={styles.placeStyle}>
                    {businessOrdersData[index].place}
                  </Text>
                  {item.title.length > 16 ? (
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
                      height={40 + 3 * 20}
                      width={200}
                      backgroundColor={colors.lightGray}
                      popover={
                        <View>
                          <Text
                            key={index}
                            style={{
                              fontFamily: "Airbnb-Light",
                              fontSize: 15,
                              color: colors.dark
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>
                      }
                    >
                      <Text style={styles.titleStyle}>
                        {item.title
                          .split("")
                          .slice(0, 10)
                          .join("") + "..."}
                      </Text>
                    </Tooltip>
                  ) : (
                    <Text style={styles.titleStyle}>{item.title}</Text>
                  )}
                  <Text style={styles.dateStyle}>
                    {moment(item.finishDateValue)
                      .locale("tr")
                      .format("ll")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

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

SezinOrders.propTypes = {
  containerStyle: ViewPropTypes.style,
  onPress: PropTypes.func
};

export default SezinOrders;
