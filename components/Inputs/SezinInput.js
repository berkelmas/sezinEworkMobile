import React, { useState } from "react";
import { View, StyleSheet, ViewPropTypes, PixelRatio } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../assets/styles/colors";

// NATIVE BASE
import { Item, Input, Label } from "native-base";

const SezinInput = props => {
  const [inputValue, setInputValue] = useState(
    props.inputProps && props.inputProps.value
  );

  return (
    <View style={{ ...props.containerStyle }}>
      <Item floatingLabel error={props.error}>
        <Label style={styles.labelStyle}>{props.label}</Label>
        <Input
          {...props.inputProps}
          value={inputValue}
          onChangeText={text => {
            props.onChangeText(text);
            setInputValue(text);
          }}
          multiline={props.multiline ? props.multiline : false}
          secureTextEntry={props.secureEntry}
          style={styles.inputStyle}
        />
      </Item>
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: "Airbnb-Book",
    fontSize: 17 / PixelRatio.getFontScale(),
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
  secureEntry: PropTypes.bool,
  multiline: PropTypes.bool,
  inputProps: PropTypes.any,
  onChangeText: PropTypes.func,
  error: PropTypes.bool
};

export default SezinInput;
