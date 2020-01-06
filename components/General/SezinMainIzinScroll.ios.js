//import liraries
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { colors } from "../../assets/styles/colors";
import { izinMainScrollData } from "../../assets/data/izin-main-scroll.data";

// create a component
const SezinMainIzinScroll = props => {
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
      {izinMainScrollData.map((item, index) => {
        return (
          <View key={item.id}>
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

// define your styles
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

//make this component available to the app
export default SezinMainIzinScroll;
