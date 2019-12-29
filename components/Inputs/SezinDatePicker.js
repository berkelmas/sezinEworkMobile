//import liraries
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PixelRatio
} from "react-native";
import PropTypes from "prop-types";
import RBSheet from "react-native-raw-bottom-sheet";
import { Calendar } from "react-native-calendars";
import { colors } from "../../assets/styles/colors";
import IcomoonIcon from "../Typography/IcomoonIcon";

// create a component
const SezinDatePicker = props => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedMarkerDate, setSelectedMarkerDate] = React.useState({
    [`${new Date().getFullYear()}-${new Date().getMonth() +
      1}-${new Date().getDate()}`]: {
      selected: true,
      marked: true
    }
  });
  const bottomSheet = useRef(null);

  React.useEffect(() => {
    bottomSheet.current.close();
    if (selectedDate) {
      setSelectedMarkerDate({
        [`${selectedDate.getFullYear()}-${selectedDate.getMonth() +
          1}-${selectedDate.getDate()}`]: {
          selected: true,
          marked: true
        }
      });
    }
  }, [selectedDate]);

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
        <Text style={styles.textStyle}>
          {selectedDate
            ? `${selectedDate.getDate()} / ${selectedDate.getMonth() +
                1} / ${selectedDate.getFullYear()}`
            : props.placeholderText}
        </Text>
        <IcomoonIcon
          name="chevron-down"
          size={25}
          style={{ paddingRight: 5, paddingBottom: 5 }}
          color={colors.dark}
        />
      </TouchableOpacity>
      <RBSheet height={340} ref={bottomSheet}>
        <Calendar
          // Initially visible month. Default = Date()
          current={new Date()}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            setSelectedDate(new Date(day.dateString));
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"yyyy MM"}
          theme={{
            arrowColor: colors.blue,
            selectedDayBackgroundColor: colors.blue,
            textSectionTitleColor: colors.blue,
            selectedDayTextColor: "white",
            todayTextColor: colors.blue
          }}
          markedDates={selectedMarkerDate}
        />
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
    fontSize: 17 / PixelRatio.getFontScale(),
    paddingLeft: 2,
    color: colors.dark,
    paddingBottom: 6,
    fontFamily: "Airbnb-Book"
  }
});

SezinDatePicker.propTypes = {
  placeholderText: PropTypes.string
};

//make this component available to the app
export default SezinDatePicker;
