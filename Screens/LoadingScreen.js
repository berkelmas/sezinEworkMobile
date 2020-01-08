//import liraries
import React from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import {
  loginSuccessAction,
  getMenuAction
} from "../store/actions/AuthActions";
import { connect } from "react-redux";

// MATERIAL LOADING INDICATOR
import { MaterialIndicator } from "react-native-indicators";
import { colors } from "../assets/styles/colors";
import { menuService } from "../services/auth-service";

let loginData;
let menuData;
// create a component
const LoadingScreen = props => {
  bootstrapAsync = async () => {
    const authValue = await AsyncStorage.getItem("auth-values");
    const menuItems = await AsyncStorage.getItem("menu-items");

    if (!authValue) {
      return props.navigation.navigate("BeforeLogin");
    }

    try {
      const authResponse = await menuService(
        JSON.parse(authValue)["access_token"]
      );
      loginData = authValue;
      menuData = menuItems;
      props.navigation.navigate("Dashboard");
    } catch {
      AsyncStorage.clear();
      props.navigation.navigate("BeforeLogin");
    }
  };

  React.useEffect(() => {
    bootstrapAsync();

    return () => {
      if (loginData) {
        props.dispatch(loginSuccessAction(JSON.parse(loginData)));
        props.dispatch(getMenuAction(JSON.parse(menuData)));
      }
    };
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
