//import liraries
import React from "react";
import {
  View,
  StyleSheet,
  ViewPropTypes,
  Picker,
  TouchableOpacity,
  Text
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import PropTypes, { instanceOf } from "prop-types";
import { colors } from "../assets/styles/colors";
import IcomoonIcon from "./IcomoonIcon";

// create a component
const SezinPicker = props => {
  const bottomSheet = React.useRef(null);
  const [selectedItem, setSelectedItem] = React.useState({
    value: null,
    label: props.placeholderText
  });

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
          {selectedItem.value ? selectedItem.label : props.placeholderText}
        </Text>
        <IcomoonIcon
          name="chevron-down"
          size={25}
          style={{ paddingRight: 5, paddingBottom: 5 }}
          color={colors.dark}
        />
      </TouchableOpacity>
      <RBSheet ref={bottomSheet}>
        <Picker
          selectedValue={selectedItem ? selectedItem.value : null}
          style={{ height: 50, width: "100%" }}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedItem({
              value: itemValue,
              label: props.items[itemIndex].label
            })
          }
        >
          {/* 
          <Picker.Item
            label={`${props.placeholderText} Seçiniz`}
            value={null}
          />
          */}
          {props.items.map((res, index) => (
            <Picker.Item key={index} label={res.label} value={res.value} />
          ))}
        </Picker>
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

SezinPicker.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  placeholderText: PropTypes.string,
  contentContainerStyle: ViewPropTypes.style
};

//make this component available to the app
export default SezinPicker;
