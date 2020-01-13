import React from "react";
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { logoutStartAction } from "../store/actions/AuthActions";
import { DrawerItems } from "react-navigation-drawer";
import { AntDesign } from "@expo/vector-icons";
import SezinLogoText from "../assets/images/sezin-logo-text.png";
import { colors } from "../assets/styles/colors";
import { useSelector, useDispatch } from "react-redux";

const SezinDrawer = props => {
  const dispatch = useDispatch();
  const refreshToken = useSelector(state => state.AuthReducer.refreshToken);

  const handleLogout = () => {
    dispatch(logoutStartAction(refreshToken));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ padding: 10, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          style={{ width: 230, height: 100, resizeMode: "contain" }}
          source={SezinLogoText}
        />
      </View>

      <DrawerItems {...props} />
      <TouchableOpacity
        onPress={handleLogout.bind(this)}
        style={{
          marginTop: "auto",
          backgroundColor: "#F5F7F9",
          height: 50,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <AntDesign
          name="logout"
          size={30}
          style={{ paddingHorizontal: 15 }}
          color="#484848"
        />
        <Text
          style={{
            fontFamily: "Airbnb-Medium",
            fontSize: 18,
            paddingHorizontal: 20,
            color: colors.dark
          }}
        >
          Çıkış Yap
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SezinDrawer;
