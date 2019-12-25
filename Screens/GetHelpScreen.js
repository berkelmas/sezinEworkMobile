import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import SezinTitle from "../components/SezinTitle";
import SezinHeader from "../components/SezinHeader";
import SezinInput from "../components/SezinInput";
import SezinButton from "../components/SezinButton";
import { colors } from "../assets/styles/colors";

const GetHelpScreen = props => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <SezinHeader
          onPressLeft={() => props.navigation.goBack()}
          leftIconName="chevron-left"
        />
        <SezinTitle text="Destek Al" />

        {/* FORM CONTAINER */}
        <View style={styles.formContainer}>
          <SezinInput label="Ad-Soyad" />
          <SezinInput label="Başlık" containerStyle={{ marginTop: 10 }} />
          <SezinInput
            label="Açıklama"
            containerStyle={{ marginTop: 10 }}
            multiline={true}
          />
        </View>
        <SezinButton
          onPress={() => console.log("GET CLOCKED")}
          color={colors.green}
          overlayColor={colors.darkGreen}
          text="Gönder"
          containerStyle={{ marginTop: 40 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center"
  },
  formContainer: {
    marginVertical: 20
  }
});

GetHelpScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

export default GetHelpScreen;
