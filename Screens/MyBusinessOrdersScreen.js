//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
const MyBusinessOrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MyBusinessOrdersScreen</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

//make this component available to the app
export default MyBusinessOrdersScreen;
