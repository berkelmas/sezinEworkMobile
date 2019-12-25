import React from "react";
import { Text } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { connect, useSelector } from "react-redux";
import HomeScreen from "../Screens/HomeScreen";
import SecondScreen from "../Screens/SecondScreen";
import LoginScreen from "../Screens/LoginScreen";

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Second: {
    screen: SecondScreen
  }
});

const customAppContainer = props => {
  const username = useSelector(state => state.AuthReducer.username);
  const FirstCase = createAppContainer({
    Home: {
      screen: HomeScreen
    }
  });
  const SecondCase = createDrawerNavigator({
    Home: {
      screen: HomeScreen
    },
    Second: {
      screen: SecondScreen
    }
  });

  const switchNavigator = createSwitchNavigator(
    {
      Login: {
        screen: LoginScreen
      },
      Dashboard: {
        screen: SecondCase
      }
    },
    {
      initialRouteName: "Login"
    }
  );

  const ContainerNavigator = createAppContainer(switchNavigator);

  return <ContainerNavigator />;
};

const mapStateToProps = state => ({
  username: state.AuthReducer.username
});

export default connect(mapStateToProps)(customAppContainer);
