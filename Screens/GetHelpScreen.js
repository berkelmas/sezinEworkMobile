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
import SezinLoadingButton from "../components/SezinLoadingButton";
import { colors } from "../assets/styles/colors";

const GetHelpScreen = props => {
  const [loadingState, setLoadingState] = React.useState(false);

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
        <SezinLoadingButton
          onPress={() => {
            setLoadingState(true);
            setTimeout(() => {
              setLoadingState(false);
              props.navigation.navigate("Login", {
                toastText: "Destek Talebiniz Başarı İle Gönderilmiştir."
              });
            }, 1000);
          }}
          loading={loadingState}
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
