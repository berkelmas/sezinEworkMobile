//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";

// SEZIN CUSTOM INPUTS
import SezinInput from "../Inputs/SezinInput";
import SezinPicker from "../Inputs/SezinPicker";
import SezinLoadingButton from "../Buttons/SezinLoadingButton";
import { colors } from "../../assets/styles/colors";

// create a component
const SezinMRForm = props => {
  const [loadingState, setLoadingState] = React.useState(false);

  const submitForm = () => {
    setLoadingState(true);

    setTimeout(() => {
      setLoadingState(false);
      props.navigation.navigate("Home", {
        toastColor: colors.green,
        toastText: "MR Teknik Oda Başarı İle Kaydedildi."
      });
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <SezinInput label="Helyum Seviyesi" containerStyle={{ marginTop: 20 }} />
      <SezinInput label="Basınç Seviyesi" containerStyle={{ marginTop: 20 }} />
      <SezinInput label="Su Sıcaklığı" containerStyle={{ marginTop: 20 }} />
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
        placeholderText="Chiller Durumu"
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
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {}
});

//make this component available to the app
export default withNavigation(SezinMRForm);
