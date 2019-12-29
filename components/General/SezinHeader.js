import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";
import IcomoonIcon from "../Typography/IcomoonIcon";
import { colors } from "../../assets/styles/colors";

const SezinHeader = props => {
  return (
    <Animated.View
      style={{
        ...styles.header,
        ...props.containerStyle,
        height: props.height ? props.height : 100
      }}
    >
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
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
  containerStyle: ViewPropTypes.style,
  height: PropTypes.instanceOf(Animated.Value)
};

export default SezinHeader;
