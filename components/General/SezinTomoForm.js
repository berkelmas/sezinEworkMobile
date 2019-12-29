//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../assets/styles/colors";
import { withNavigation } from "react-navigation";

// CUSTOM SEZIN INPUTS
import SezinInput from "../../components/Inputs/SezinInput";
import SezinPicker from "../../components/Inputs/SezinPicker";
import SezinLoadingButton from "../../components/Buttons/SezinLoadingButton";

// create a component
const SezinTomoForm = props => {
  const [loadingState, setLoadingState] = React.useState(false);

  const submitForm = () => {
    setLoadingState(true);

    setTimeout(() => {
      setLoadingState(false);
      props.navigation.navigate("Home", {
        toastColor: colors.green,
        toastText: "Tomografi Teknik Oda Başarı İle Kaydedildi."
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <SezinInput label="Oda Nem Seviyesi" containerStyle={{ marginTop: 20 }} />
      <SezinInput label="Klima Sıcaklığı" containerStyle={{ marginTop: 20 }} />
      <SezinPicker
        placeholderText="UPS Durumu"
        items={[
          { label: "Çalışıyor", value: "calisiyor" },
          { label: "Çalışmıyor", value: "calismiyor" }
        ]}
      />
      <SezinPicker
        placeholderText="Oda Temizliği"
        items={[
          { label: "Rutin", value: "rutin" },
          { label: "Yapılmadı", value: "yapilmadi" }
        ]}
      />
      <SezinLoadingButton
        onPress={submitForm.bind(this)}
        color={colors.green}
        overlayColor={colors.darkGreen}
        loading={loadingState}
        text="Kaydet"
        containerStyle={{ marginTop: 30 }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

//make this component available to the app
export default withNavigation(SezinTomoForm);
