//import liraries
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// CUSTOM SEZIN COMPONENTS
import SezinTitle from "../components/Typography/SezinTitle";
import SezinHeader from "../components/General/SezinHeader";
import SezinSingleIzin from "../components/General/SezinSingleIzin";
import SezinDescription from "../components/Typography/SezinDescription";

// create a component
const MyIzinRequestsScreen = props => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SezinHeader
        leftIconName="chevron-left"
        onPressLeft={props.navigation.goBack.bind(this, null)}
      />
      <SezinTitle text="İzin Taleplerim" />
      <SezinDescription
        text="Buradan talep etmiş olduğunuz tüm izinlere erişebilirsiniz."
        textStyle={{ paddingBottom: 20 }}
      />

      <SezinSingleIzin
        date="2 Ock 2020"
        title="Ölüm İzni"
        status="Bekleniyor"
      />
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});

MyIzinRequestsScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default MyIzinRequestsScreen;
