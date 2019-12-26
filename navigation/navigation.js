import React from "react";

// NAVIGATION
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import { connect, useSelector } from "react-redux";
import HomeScreen from "../Screens/HomeScreen";
import SecondScreen from "../Screens/SecondScreen";
import LoginScreen from "../Screens/LoginScreen";
import GetHelpScreen from "../Screens/GetHelpScreen";
import AllAnnouncementsScreen from "../Screens/AllAnnouncementsScreen";

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
    AllAnnouncements: {
      screen: AllAnnouncementsScreen
    }
  });

  const BeforeLogin = createStackNavigator(
    {
      Login: {
        screen: LoginScreen
      },
      GetHelp: {
        screen: GetHelpScreen
      }
    },
    {
      initialRouteName: "Login"
    }
  );

  const switchNavigator = createSwitchNavigator(
    {
      BeforeLogin: {
        screen: BeforeLogin
      },
      Dashboard: {
        screen: SecondCase
      }
    },
    {
      initialRouteName: "BeforeLogin"
    }
  );

  const ContainerNavigator = createAppContainer(switchNavigator);

  return <ContainerNavigator />;
};

const mapStateToProps = state => ({
  username: state.AuthReducer.username
});

export default connect(mapStateToProps)(customAppContainer);
