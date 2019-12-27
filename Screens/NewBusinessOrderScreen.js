//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import SezinHeader from "../components/SezinHeader";
import SezinTitle from "../components/SezinTitle";
import SezinInput from "../components/SezinInput";
import SezinPicker from "../components/SezinPicker";
import SezinDatePicker from "../components/SezinDatePicker";

// create a component
const NewBusinessOrderScreen = props => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <SezinHeader
          onPressLeft={() => props.navigation.goBack()}
          leftIconName="chevron-left"
        />
        <SezinTitle text="Yeni İş Emri" />

        <SezinInput label="Başlık" containerStyle={{ marginTop: 10 }} />
        <SezinInput
          label="Açıklama"
          containerStyle={{ marginTop: 10 }}
          multiline={true}
        />
        <SezinPicker
          placeholderText="Görev Verilen Kişi"
          contentContainerStyle={{ marginTop: 30 }}
          items={[
            { label: "Berk Elmas", value: "football" },
            { label: "Ali Yilmaz", value: "baseball" },
            { label: "Emre Kara", value: "hockey" }
          ]}
        />

        <SezinPicker
          placeholderText="Personel Grubu"
          contentContainerStyle={{ marginTop: 30 }}
          items={[
            { label: "Ankara GMK Devlet Hastanesi", value: "football" },
            { label: "Sadi Konuk Devlet Hastanesi", value: "baseball" },
            { label: "Mazhar Osman Devlet Hastanesi", value: "hockey" }
          ]}
        />

        <SezinPicker
          placeholderText="Öncelik Durumu"
          contentContainerStyle={{ marginTop: 30 }}
          items={[
            { label: "Kritik", value: "football" },
            { label: "Normal", value: "baseball" },
            { label: "Acil Degil", value: "hockey" }
          ]}
        />

        <SezinDatePicker />
      </View>
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

NewBusinessOrderScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default NewBusinessOrderScreen;
