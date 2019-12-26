import React from "react";
import { SafeAreaView, Image, Text, View } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { AntDesign } from "@expo/vector-icons";
import SezinLogoText from "../assets/images/sezin-logo-text.png";
import { colors } from "../assets/styles/colors";

const SezinDrawer = props => {
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
      <View
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
      </View>
    </SafeAreaView>
  );
};

export default SezinDrawer;
