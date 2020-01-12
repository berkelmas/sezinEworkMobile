import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  PixelRatio,
  TouchableNativeFeedback
} from "react-native";
import { Image } from "react-native-elements";
import { MaterialIndicator } from "react-native-indicators";
import { useSelector } from "react-redux";
import { colors } from "../../assets/styles/colors";
import { mainScrollData } from "../../assets/data/main-scroll.data";

const SezinMainScroll = props => {
  const menuItems = useSelector(state => state.AuthReducer.menuItems).map(
    item => item.mobilePath
  );

  return (
    <ScrollView
      disableIntervalMomentum={true}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      snapToAlignment="start"
      snapToInterval={265}
      decelerationRate="fast"
      contentContainerStyle={{
        height: (Dimensions.get("window").height * 14) / 32,
        paddingHorizontal: 20,
        paddingVertical: 10
      }}
    >
      {mainScrollData.map((item, index) => {
        return (
          <View key={item.id}>
            <TouchableNativeFeedback
              useForeground={true}
              style={{
                display: item.backendNames.some(item => {
                  return menuItems.indexOf(item) >= 0 || item === "shown";
                })
                  ? "block"
                  : "none"
              }}
              onPress={props.onPress.bind(this, item.link)}
            >
              <View style={styles.singleView}>
                <Image
                  placeholderStyle={{
                    backgroundColor: "white",
                    height: "100%"
                  }}
                  PlaceholderContent={
                    <MaterialIndicator color={colors.blue} size={60} />
                  }
                  source={item.image}
                  containerStyle={{
                    height: "70%",
                    width: "100%"
                  }}
                />
                <View style={styles.contentWrapper}>
                  <Text style={styles.contentHeader}>{item.title}</Text>
                  <Text style={styles.contentDescription}>{item.content}</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  singleView: {
    width: 250,
    backgroundColor: "white",
    elevation: 4,
    marginRight: 25
  },
  contentWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  contentHeader: {
    fontFamily: "Airbnb-Book",
    fontSize: 20 / PixelRatio.getFontScale()
  },
  contentDescription: {
    fontFamily: "Airbnb-Light",
    fontSize: 15 / PixelRatio.getFontScale(),
    color: colors.gray
  }
});

export default SezinMainScroll;
