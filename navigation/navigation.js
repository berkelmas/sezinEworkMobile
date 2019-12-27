import React from "react";
import { PixelRatio } from "react-native";

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
import BusinessOrdersScreen from "../Screens/BusinessOrdersScreen";
import SezinDrawer from "./CustomDrawer";
import IcomoonIcon from "../components/IcomoonIcon";
import { colors } from "../assets/styles/colors";
import NewBusinessOrderScreen from "../Screens/NewBusinessOrderScreen";

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

  const HomeStack = createStackNavigator(
    {
      Home: {
        screen: HomeScreen
      },
      NewBusinessOrder: {
        screen: NewBusinessOrderScreen
      },
      GetHelpAfterLoginScreen: {
        screen: GetHelpScreen
      }
    },
    {
      initialRouteName: "Home"
    }
  );

  const SecondCase = createDrawerNavigator(
    {
      Home: {
        screen: HomeStack,
        navigationOptions: {
          title: "Ana Sayfa",
          drawerIcon: <IcomoonIcon name="home" size={30} color={colors.dark} />
        }
      },
      AllAnnouncements: {
        screen: AllAnnouncementsScreen,
        navigationOptions: {
          title: "Duyurular",
          drawerIcon: (
            <IcomoonIcon name="megaphone" size={30} color={colors.dark} />
          )
        }
      },
      BusinessOrders: {
        screen: BusinessOrdersScreen,
        navigationOptions: {
          title: "İş Emirleri",
          drawerIcon: (
            <IcomoonIcon name="briefcase" size={30} color={colors.dark} />
          )
        }
      }
    },
    {
      contentComponent: SezinDrawer,
      contentOptions: {
        inactiveTintColor: colors.dark,
        activeTintColor: colors.dark,
        activeBackgroundColor: "#F5F7F9",
        labelStyle: {
          fontSize: 18 / PixelRatio.getFontScale(),
          fontFamily: "Airbnb-Medium"
        },
        iconContainerStyle: {
          height: 35,
          width: 34,
          opacity: 1
        }
      }
    }
  );

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
