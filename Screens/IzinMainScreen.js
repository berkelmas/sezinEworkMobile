//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Pi } from "react-native";

// CUSTOM SEZIN COMPONENTS
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";

//DATA
import { izinTypes } from "../assets/data/izin-types.data";
import { colors } from "../assets/styles/colors";
import SezinDescription from "../components/Typography/SezinDescription";
import SezinMainIzinScroll from "../components/General/SezinMainIzinScroll";
import SezinIzinler from "../components/General/SezinIzinler";
import SezinButton from "../components/Buttons/SezinButton";

// create a component
const IzinMainScreen = props => {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER PART */}
      <SezinHeader
        onPressLeft={() => props.navigation.toggleDrawer()}
        leftIconName="bars"
        containerStyle={{ marginHorizontal: 20, paddingTop: 20 }}
      />
      <SezinTitle
        text="İzin Yönetimi"
        textStyle={{ paddingHorizontal: 20, paddingBottom: 5 }}
      />
      <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
        <SezinDescription
          text="10 günlük"
          textStyle={{ color: colors.green }}
        />
        <SezinDescription text=" yıllık izin hakkınız bulunmaktadır." />
      </View>

      <SezinMainIzinScroll onPress={props.navigation.navigate.bind(this)} />

      <SezinTitle
        text="Son İzin Taleplerim"
        textStyle={{ marginHorizontal: 20, paddingTop: 10 }}
      />
      <SezinDescription
        text="Buradan talep etmiş olduğunuz son izinlere erişebilirsiniz."
        textStyle={{ marginHorizontal: 20 }}
      />

      <SezinIzinler onIzinPress={izin => console.log(izin)} />
      <SezinButton
        onPress={props.navigation.navigate.bind(this, "MyIzinRequests")}
        containerStyle={{ marginTop: 20, paddingHorizontal: 20 }}
        buttonTextStyle={{ fontSize: 22 }}
        color={colors.green}
        overlayColor={colors.darkGreen}
        text="Tümünü Gör"
      />
      <View style={{ height: 50, width: 100 }} />
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({});

IzinMainScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default IzinMainScreen;
