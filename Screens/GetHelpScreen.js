import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IcomoonIcon from "../components/IcomoonIcon";

const GetHelpScreen = () => {
  return (
    <View style={styles.container}>
      <Text>GET HELP SCREEN</Text>
      <IcomoonIcon name="plus" size={32} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

GetHelpScreen.navigationOptions = ({ navigation }) => ({
  header: <Text>BERK ELMAS</Text>
});

export default GetHelpScreen;
