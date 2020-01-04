//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { loginSuccessAction } from "../store/actions/AuthActions";
import { connect } from "react-redux";

// MATERIAL LOADING INDICATOR
import { MaterialIndicator } from "react-native-indicators";
import { colors } from "../assets/styles/colors";

// create a component
const LoadingScreen = props => {
  bootstrapAsync = async () => {
    const authValue = await AsyncStorage.getItem("auth-values");
    if (authValue) {
      props.navigation.navigate("Dashboard");
    } else {
      props.navigation.navigate("BeforeLogin");
    }
  };

  React.useEffect(() => {
    bootstrapAsync();
  }, []);

  return (
    <View style={styles.container}>
      <MaterialIndicator color={colors.blue} size={70}></MaterialIndicator>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  }
});

const mapStateToProps = state => ({
  username: state.AuthReducer.username
});

//make this component available to the app
export default connect(mapStateToProps)(LoadingScreen);
