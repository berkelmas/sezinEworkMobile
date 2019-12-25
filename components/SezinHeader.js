import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import IcomoonIcon from "./IcomoonIcon";
import { colors } from "../assets/styles/colors";

const SezinHeader = props => {
  return (
    <View style={styles.header}>
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
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center"
  }
});

export default SezinHeader;
