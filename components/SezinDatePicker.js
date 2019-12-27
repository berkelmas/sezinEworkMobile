//import liraries
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { colors } from "../assets/styles/colors";
import IcomoonIcon from "./IcomoonIcon";

// create a component
const SezinDatePicker = () => {
  const bottomSheet = useRef(null);

  React.useEffect(() => {
    // bottomSheet.current.open();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => bottomSheet.current.open()}
        style={{
          borderBottomColor: colors.lightGray,
          borderBottomWidth: 1.2,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text style={styles.textStyle}>Select Date</Text>
        <IcomoonIcon
          name="chevron-down"
          size={25}
          style={{ paddingRight: 5, paddingBottom: 5 }}
          color={colors.dark}
        />
      </TouchableOpacity>
      <RBSheet ref={bottomSheet}>
        <View style={{ height: 100, width: 100, backgroundColor: "red" }} />
      </RBSheet>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  textStyle: {
    fontSize: 17,
    paddingLeft: 2,
    color: colors.dark,
    paddingBottom: 6,
    fontFamily: "Airbnb-Book"
  }
});

//make this component available to the app
export default SezinDatePicker;
