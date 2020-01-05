//import liraries
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinDatePicker from "../components/Inputs/SezinDatePicker";
import SezinPicker from "../components/Inputs/SezinPicker";
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";
import SezinInput from "../components/Inputs/SezinInput";

import { izinTypes } from "../assets/data/izin-types.data";
import { colors } from "../assets/styles/colors";

// create a component
const NewIzinScreen = props => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss.bind(this)}>
      <ScrollView contentContainerStyle={styles.container}>
        <SezinHeader
          leftIconName="chevron-left"
          onPressLeft={() => props.navigation.goBack()}
        />
        <SezinTitle text="Yeni İzin Talebi" />
        <SezinDatePicker placeholderText="İzin Başlangıcı" />
        <SezinDatePicker placeholderText="İşe Başlama Tarihi" />
        <SezinPicker
          items={izinTypes}
          placeholderText="İzin Tipi"
          contentContainerStyle={{ marginBottom: 15 }}
        />
        <SezinInput
          onChangeText={console.log.bind(this, "BERKELMAS")}
          multiline={true}
          label="Açıklama"
        />
        <SezinLoadingButton
          onPress={() => console.log("berk")}
          loading={false}
          color={colors.green}
          overlayColor={colors.darkGreen}
          text="Gönder"
          containerStyle={{ marginTop: 40 }}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});

NewIzinScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default NewIzinScreen;
