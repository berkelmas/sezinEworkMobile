//import liraries
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  Dimensions,
  PixelRatio
} from "react-native";
import { Image } from "react-native-elements";
import { MaterialIndicator } from "react-native-indicators";
import { colors } from "../../assets/styles/colors";
import { izinMainScrollData } from "../../assets/data/izin-main-scroll.data";

// create a component
const SezinIzinMainScroll = props => {
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
      {izinMainScrollData.map((item, index) => {
        return (
          <View key={item.id}>
            <TouchableNativeFeedback
              useForeground={true}
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

// define your styles
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

//make this component available to the app
export default SezinIzinMainScroll;
