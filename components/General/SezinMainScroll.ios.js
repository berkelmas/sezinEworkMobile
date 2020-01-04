import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../assets/styles/colors";
import { mainScrollData } from "../../assets/data/main-scroll.data";

const SezinMainScroll = props => {
  const menuItems = useSelector(state => state.AuthReducer.menuItems).map(
    item => item.mobilePath
  );

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      snapToAlignment="start"
      snapToInterval={265}
      decelerationRate="fast"
      contentContainerStyle={{
        height: (Dimensions.get("window").height * 11) / 32,
        paddingHorizontal: 20,
        paddingVertical: 10
      }}
    >
      {mainScrollData.map((item, index) => {
        return (
          <View
            style={{
              display: item.backendNames.some(item => {
                return menuItems.indexOf(item) >= 0 || item === "shown";
              })
                ? "block"
                : "none"
            }}
            key={item.id}
          >
            <TouchableOpacity
              onPress={props.onPress.bind(this, item.link)}
              style={styles.singleViewWrapper}
            >
              <View style={styles.singleView}>
                <Image
                  source={item.image}
                  style={{ height: "70%", width: "100%" }}
                />
                <View style={styles.contentWrapper}>
                  <Text style={styles.contentHeader}>{item.title}</Text>
                  <Text style={styles.contentDescription}>{item.content}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  singleView: {
    height: (Dimensions.get("window").height * 10) / 32,
    width: 250,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden"
  },
  singleViewWrapper: {
    marginRight: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7
  },
  contentWrapper: {
    padding: 5
  },
  contentHeader: {
    fontFamily: "Airbnb-Book",
    fontSize: 20
  },
  contentDescription: {
    fontFamily: "Airbnb-Light",
    fontSize: 15,
    color: colors.gray
  }
});

export default SezinMainScroll;
