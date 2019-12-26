import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewPropTypes,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { colors } from "../assets/styles/colors";

// FAKE DATA
import { businessOrdersData } from "../assets/data/business-orders.data";

const SezinOrders = props => {
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
            onPress={props.onPress.bind(this, businessOrdersData[index])}
            key={index}
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
              <Text style={styles.titleStyle}>
                {businessOrdersData[index].title}
              </Text>
              <Text style={styles.dateStyle}>
                {businessOrdersData[index].date}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
    fontSize: 15,
    fontFamily: "Airbnb-Light"
  },
  titleStyle: {
    color: colors.dark,
    fontSize: 16,
    fontFamily: "Airbnb-Light"
  },
  dateStyle: {
    color: colors.gray,
    fontSize: 12,
    fontFamily: "Airbnb-Light"
  }
});

SezinOrders.propTypes = {
  containerStyle: ViewPropTypes.style,
  onPress: PropTypes.func
};

export default SezinOrders;
