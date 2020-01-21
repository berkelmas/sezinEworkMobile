//import liraries
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinDescription from "../components/Typography/SezinDescription";
import SezinInput from "../components/Inputs/SezinInput";
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";
import { colors } from "../assets/styles/colors";

// create a component
const ChangePasswordScreen = props => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* HEADER PART */}
        <SezinHeader
          onPressLeft={() => props.navigation.goBack()}
          leftIconName="chevron-left"
          containerStyle={{ paddingTop: 20 }}
        />
        <SezinTitle text="Şifre Değiştir" />
        <SezinDescription text="Buradan Sezin E-Work’e giriş için kullandığınız şifrenizi değiştirebilirsiniz." />

        <SezinInput label="Eski Şifre" containerStyle={{ paddingTop: 10 }} />
        <SezinInput label="Yeni Şifre" containerStyle={{ paddingTop: 10 }} />
        <SezinInput
          label="Yeni Şifre Tekrar"
          containerStyle={{ paddingTop: 10 }}
        />
        <SezinLoadingButton
          color={colors.blue}
          overlayColor={colors.darkBlue}
          text="Şifre Değiştir"
          loading={false}
          onPress={() => console.log("berkelmas")}
          containerStyle={{ marginTop: 40 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  }
});

ChangePasswordScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default ChangePasswordScreen;
