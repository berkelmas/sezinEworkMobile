//import liraries
import React from "react";
import {
  View,
  StyleSheet,
  ViewPropTypes,
  Picker,
  Text,
  PixelRatio,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import PropTypes, { instanceOf } from "prop-types";
import { colors } from "../../assets/styles/colors";
import IcomoonIcon from "../Typography/IcomoonIcon";

// create a component
const SezinPicker = props => {
  const bottomSheet = React.useRef(null);
  const [items, setItems] = React.useState([
    {
      label: `${props.placeholderText} Seçiniz`,
      value: null
    },
    ...props.items
  ]);
  const [selectedItem, setSelectedItem] = React.useState(
    props.initialSelection
      ? props.initialSelection
      : {
          value: null,
          label: props.placeholderText
        }
  );

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
        <ScrollView showsVerticalScrollIndicator={false}>
          {items.map((res, index) => (
            <TouchableNativeFeedback
              onPress={() => {
                setSelectedItem({
                  value: res.value,
                  label: res.label
                });
                props.onValueChange && props.onValueChange(res.value);
                bottomSheet.current.close();
              }}
              background={TouchableNativeFeedback.Ripple(colors.lightGray)}
              key={index}
              style={{
                width: "100%",
                marginTop: 10,
                ...props.contentContainerStyle
              }}
            >
              {/* CONTAINER FOR TOUCHABLE NATIVE FEEDBACK */}
              <View>
                <Text
                  style={{
                    paddingVertical: 20,
                    paddingHorizontal: 15,
                    fontFamily: index === 0 ? "Airbnb-Medium" : "Airbnb-Book",
                    fontSize: 18,
                    color: colors.dark
                  }}
                >
                  {res.label}
                </Text>
              </View>
            </TouchableNativeFeedback>
          ))}
        </ScrollView>
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
  onValueChange: PropTypes.func
};

//make this component available to the app
export default SezinPicker;
