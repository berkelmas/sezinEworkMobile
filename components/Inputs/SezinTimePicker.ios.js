//import liraries
import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  PixelRatio,
  ViewPropTypes
} from "react-native";
import IcomoonIcon from "../Typography/IcomoonIcon";
import DateTimePicker from "@react-native-community/datetimepicker";
import RBSheet from "react-native-raw-bottom-sheet";
import PropTypes from "prop-types";
import { colors } from "../../assets/styles/colors";

// create a component
const SezinTimePicker = props => {
  const [selectedDate, setSelectedDate] = useState(new Date(10, 10, 3000));
  const bottomSheet = useRef(null);

  return (
    <View style={{ ...styles.container, ...props.contentContainerStyle }}>
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
        <Text style={styles.textStyle}>
          {selectedDate.getFullYear() !== 1919
            ? `${
                selectedDate.getHours().toString().length < 2
                  ? "0" + selectedDate.getHours().toString()
                  : selectedDate.getHours()
              }.${
                selectedDate.getMinutes().toString().length < 2
                  ? "0" + selectedDate.getMinutes().toString()
                  : selectedDate.getMinutes()
              }`
            : props.placeholderText}
        </Text>
        <IcomoonIcon
          name="chevron-down"
          size={25}
          style={{ paddingRight: 5, paddingBottom: 5 }}
          color={colors.dark}
        />
      </TouchableOpacity>
      <RBSheet ref={bottomSheet}>
        <DateTimePicker
          value={selectedDate}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={(_, date) => {
            const newDate = date.setFullYear(2020);
            setSelectedDate(new Date(newDate));
            props.onValueChange(new Date(newDate));
          }}
        />
      </RBSheet>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 35
  },
  textStyle: {
    fontSize: 17 / PixelRatio.getFontScale(),
    paddingLeft: 2,
    color: colors.dark,
    paddingBottom: 6,
    fontFamily: "Airbnb-Book"
  }
});

SezinTimePicker.propTypes = {
  onValueChange: PropTypes.func,
  placeholderText: PropTypes.string,
  contentContainerStyle: ViewPropTypes.style
};

//make this component available to the app
export default SezinTimePicker;
