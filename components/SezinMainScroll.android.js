import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  PixelRatio
} from "react-native";
import IsEmri from "../assets/images/is-emri.jpg";
import { colors } from "../assets/styles/colors";
import { mainScrollData } from "../assets/data/main-scroll.data";

const SezinMainScroll = props => {
  console.log(PixelRatio.getFontScale());

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
      {mainScrollData.map((item, index) => (
        <TouchableOpacity
          onPress={props.onPress.bind(this, item.link)}
          key={item.id}
          style={styles.singleView}
        >
          <Image
            source={item.image}
            style={{
              height: "70%",
              width: "100%",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10
            }}
          />
          <View style={styles.contentWrapper}>
            <Text style={styles.contentHeader}>{item.title}</Text>
            <Text style={styles.contentDescription}>{item.content}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  singleView: {
    width: 250,
    backgroundColor: "white",
    borderRadius: 10,
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
