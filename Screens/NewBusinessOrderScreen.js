//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import SezinHeader from "../components/SezinHeader";
import SezinTitle from "../components/SezinTitle";

// create a component
const NewBusinessOrderScreen = props => {
  return (
    <View style={styles.container}>
      <SezinHeader
        onPressLeft={() => props.navigation.goBack()}
        leftIconName="chevron-left"
      />
      <SezinTitle text="Yeni İş Emri" />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});

NewBusinessOrderScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default NewBusinessOrderScreen;
