import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";
import IcomoonIcon from "./IcomoonIcon";
import { colors } from "../assets/styles/colors";

const SezinHeader = props => {
  return (
    <View style={{ ...styles.header, ...props.containerStyle }}>
      <TouchableOpacity
        style={{ alignSelf: "flex-start" }}
        onPress={props.onPressLeft}
      >
        <IcomoonIcon
          name={props.leftIconName}
          size={props.leftIconSize ? props.leftIconSize : 42}
          color={props.leftIconColor ? props.leftIconColor : colors.dark}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center"
  }
});

SezinHeader.propTypes = {
  onPressLeft: PropTypes.func,
  leftIconName: PropTypes.string,
  leftIconSize: PropTypes.number,
  leftIconColor: PropTypes.string,
  containerStyle: ViewPropTypes.style
};

export default SezinHeader;
