import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import IcomoonIcon from "../components/IcomoonIcon";
import { colors } from "../assets/styles/colors";
import SezinTitle from "../components/SezinTitle";
import SezinHeader from "../components/SezinHeader";

const GetHelpScreen = props => {
  return (
    <View style={styles.container}>
      <SezinHeader
        onPressLeft={() => props.navigation.goBack()}
        leftIconName="chevron-left"
      />
      <SezinTitle text="Destek Al" />
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

GetHelpScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

export default GetHelpScreen;
