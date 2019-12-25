import React from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../assets/styles/colors";

// NATIVE BASE
import { Item, Input, Label } from "native-base";

const SezinInput = props => {
  return (
    <View style={{ ...props.containerStyle }}>
      <Item floatingLabel>
        <Label style={styles.labelStyle}>{props.label}</Label>
        <Input secureTextEntry={props.secureEntry} style={styles.inputStyle} />
      </Item>
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: "Airbnb-Book",
    fontSize: 17,
    color: colors.dark
  },
  inputStyle: {
    fontFamily: "Airbnb-Light",
    color: colors.dark
  }
});

SezinInput.propTypes = {
  containerStyle: ViewPropTypes.style,
  label: PropTypes.string,
  secureEntry: PropTypes.bool
};

export default SezinInput;
