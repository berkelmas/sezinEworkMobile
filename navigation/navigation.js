import React from "react";
import { PixelRatio } from "react-native";

// NAVIGATION
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import NavigationService from "./NavigationService";

import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import GetHelpScreen from "../Screens/GetHelpScreen";
import AllAnnouncementsScreen from "../Screens/AllAnnouncementsScreen";
import BusinessOrdersScreen from "../Screens/BusinessOrdersScreen";
import SezinDrawer from "./CustomDrawer";
import IcomoonIcon from "../components/Typography/IcomoonIcon";
import { colors } from "../assets/styles/colors";
import NewBusinessOrderScreen from "../Screens/NewBusinessOrderScreen";
import TechnicalRoomScreen from "../Screens/TechnicalRoomScreen";
import NewBusinessReportScreen from "../Screens/NewBusinessReportScreen";
import LoadingScreen from "../Screens/LoadingScreen";
import DailyReportScreen from "../Screens/DailyReportScreen";
import IzinMainScreen from "../Screens/IzinMainScreen";
import NewIzinScreen from "../Screens/NewIzinScreen";
import MyIzinRequestsScreen from "../Screens/MyIzinRequestsScreen";
import IzinOnayScreen from "../Screens/IzinOnayScreen";
import IzinCancelApproveScreen from "../Screens/IzinCancelApproveScreen";
import BusinessReportsScreen from "../Screens/BusinessReportsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import ChangePasswordScreen from "../Screens/ChangePasswordScreen";

const customAppContainer = props => {
  const HomeStack = createStackNavigator(
    {
      Home: {
        screen: HomeScreen
      },
      NewBusinessOrder: {
        screen: NewBusinessOrderScreen
      },
      TechnicalRoom: {
        screen: TechnicalRoomScreen
      },
      NewBusinessReport: {
        screen: NewBusinessReportScreen
      },
      DailyReport: {
        screen: DailyReportScreen
      },
      GetHelpAfterLoginScreen: {
        screen: GetHelpScreen
      }
    },
    {
      initialRouteName: "Home"
    }
  );

  const IzinStack = createStackNavigator(
    {
      IzinMain: {
        screen: IzinMainScreen
      },
      NewIzin: {
        screen: NewIzinScreen
      },
      MyIzinRequests: {
        screen: MyIzinRequestsScreen
      },
      IzinOnay: {
        screen: IzinOnayScreen
      },
      IzinCancelApprove: {
        screen: IzinCancelApproveScreen
      }
    },
    {
      initialRouteName: "IzinMain"
    }
  );

  const ProfileStack = createStackNavigator(
    {
      ProfilePage: {
        screen: ProfileScreen
      },
      ChangePassword: {
        screen: ChangePasswordScreen
      }
    },
    {
      initialRouteName: "ProfilePage"
    }
  );

  const DrawerNav = createDrawerNavigator(
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
      },
      BusinessReport: {
        screen: BusinessReportsScreen,
        navigationOptions: {
          title: "Saha Takibi",
          drawerIcon: (
            <IcomoonIcon name="file-chart-line" size={30} color={colors.dark} />
          )
        }
      },
      Izin: {
        screen: IzinStack,
        navigationOptions: {
          title: "İzin Yönetimi",
          drawerIcon: (
            <IcomoonIcon name="user-chart" size={30} color={colors.dark} />
          )
        }
      },
      Profile: {
        screen: ProfileStack,
        navigationOptions: {
          title: "Profil",
          drawerIcon: (
            <IcomoonIcon name="id-card-alt" size={30} color={colors.dark} />
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
          fontFamily: "Airbnb-Medium",
          fontWeight: "normal",
          fontSize: 18 / PixelRatio.getFontScale(),
          color: colors.dark
        },
        iconContainerStyle: {
          height: 35,
          width: 40,
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
        screen: DrawerNav
      },
      Loading: {
        screen: LoadingScreen
      }
    },
    {
      initialRouteName: "Loading"
    }
  );

  const ContainerNavigator = createAppContainer(switchNavigator);

  return (
    <ContainerNavigator
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};

export default customAppContainer;
