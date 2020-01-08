//import liraries
import React from "react";
import {
  View,
  StyleSheet,
  ViewPropTypes,
  Picker,
  TouchableOpacity,
  Text,
  PixelRatio
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import PropTypes from "prop-types";
import { colors } from "../../assets/styles/colors";
import IcomoonIcon from "../Typography/IcomoonIcon";

// create a component
const SezinPicker = props => {
  const bottomSheet = React.useRef(null);
  const [items, setItems] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState({
    value: null,
    label: props.placeholderText
  });

  // set initial props for picker items and
  // render them again when items prop changes.
  React.useEffect(() => {
    setItems([
      {
        label: `${props.placeholderText} Seçiniz`,
        value: null
      },
      ...props.items
    ]);
  }, [props.items]);

  // set initial selected props for picker items
  React.useEffect(() => {
    setSelectedItem(
      props.initialSelection
        ? props.initialSelection
        : {
            value: null,
            label: props.placeholderText
          }
    );
  }, [props.initialSelection]);

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
          onValueChange={(itemValue, itemIndex) => {
            setSelectedItem({
              value: itemValue,
              label: itemIndex - 1 < 0 ? 0 : props.items[itemIndex - 1].label
            });
            props.onValueChange && props.onValueChange(itemValue);
          }}
        >
          {/* 
          <Picker.Item
            label={`${props.placeholderText} Seçiniz`}
            value={null}
          />
          */}
          {items.map((res, index) => (
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
    marginTop: 40
  },
  textStyle: {
    fontSize: 17 / PixelRatio.getFontScale(),
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
  contentContainerStyle: ViewPropTypes.style,
  onValueChange: PropTypes.func,
  initialSelection: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
};

//make this component available to the app
export default SezinPicker;
