//import liraries
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";
import SelectMultiple from "react-native-select-multiple";
import RBSheet from "react-native-raw-bottom-sheet";

import IcomoonIcon from "../Typography/IcomoonIcon";
import { colors } from "../../assets/styles/colors";
import CheckedMulti from "../../assets/images/checked-multi.png";
import UnCheckedMulti from "../../assets/images/unchecked-multi.png";

// create a component
const SezinMultipleSelect = props => {
  const [selectedItems, setSelectedItems] = useState([]);
  const bottomSheet = useRef(null);
  const onSelectionsChange = selectedItems => {
    setSelectedItems(selectedItems);
  };
  const handleRemove = item => {
    setSelectedItems(prev =>
      prev.filter(single => single.value !== item.value)
    );
  };

  useEffect(() => {
    props.onSelectionChange(selectedItems);
  }, [selectedItems]);

  const renderItems = items => {
    return items.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleRemove(item)}
        style={{ ...styles.badgeContainer, marginLeft: index < 1 ? 0 : 4 }}
      >
        <Text style={styles.badgeText}>{item.label}</Text>
        <IcomoonIcon
          name="times"
          size={20}
          color={colors.dark}
          style={{ paddingHorizontal: 5 }}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={{ ...styles.container, ...props.contentContainerStyle }}>
      <TouchableOpacity
        onPress={() => bottomSheet.current.open()}
        style={styles.inputTouchable}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "90%"
          }}
        >
          {selectedItems.length < 1 && (
            <Text style={styles.textStyle}>{props.placeholderText}</Text>
          )}
          {selectedItems.length > 0 && renderItems(selectedItems)}
        </View>
        <IcomoonIcon
          name="chevron-down"
          size={25}
          style={{ paddingRight: 5, paddingBottom: 5 }}
          color={colors.dark}
        />
      </TouchableOpacity>
      <RBSheet height={340} ref={bottomSheet}>
        <SelectMultiple
          checkboxSource={UnCheckedMulti}
          selectedCheckboxSource={CheckedMulti}
          labelStyle={{
            fontFamily: "Airbnb-Light",
            color: colors.dark,
            fontSize: 17
          }}
          items={props.items}
          selectedItems={selectedItems}
          onSelectionsChange={onSelectionsChange}
        />
      </RBSheet>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 25
  },
  inputTouchable: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textStyle: {
    fontSize: 17 / PixelRatio.getFontScale(),
    paddingLeft: 2,
    color: colors.dark,
    paddingBottom: 6,
    fontFamily: "Airbnb-Book"
  },
  badgeContainer: {
    borderColor: colors.gray,
    borderRadius: 8,
    borderWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    flexDirection: "row"
  },
  badgeText: {
    fontSize: 17 / PixelRatio.getFontScale(),
    color: colors.dark,
    paddingRight: 3,
    paddingLeft: 5,
    paddingVertical: 3,
    fontFamily: "Airbnb-Book"
  }
});

SezinMultipleSelect.propTypes = {
  placeholderText: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  contentContainerStyle: ViewPropTypes.style,
  onSelectionChange: PropTypes.func
};

//make this component available to the app
export default SezinMultipleSelect;
