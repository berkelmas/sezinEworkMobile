//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

// CUSTOM SEZIN COMPONENTS
import SezinPicker from "../components/Inputs/SezinPicker";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinHeader from "../components/General/SezinHeader";
import SezinInput from "../components/Inputs/SezinInput";
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";

//DATA
import { colors } from "../assets/styles/colors";
import SezinTimePicker from "../components/Inputs/SezinTimePicker";

// create a component
const DailyReportScreen = props => {
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    setDevices([
      {
        label: "KMD",
        value: "kmd"
      },
      {
        label: "MAMO",
        value: "mamo"
      },
      {
        label: "USG",
        value: "usg"
      },
      {
        label: "Rapor",
        value: "rapor"
      }
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <SezinHeader
        leftIconName="chevron-left"
        onPressLeft={() => props.navigation.goBack()}
      />
      <SezinTitle text="Günlük Raporlama" />
      <SezinPicker
        placeholderText="Cihaz"
        items={devices}
        initialSelection={devices[0]}
      />
      <SezinInput
        label="Günlük Çekim Sayısı"
        containerStyle={{ marginTop: 25 }}
        onChangeText={() => console.log("bekrelmas")}
      />
      <SezinInput
        label="Açıklama"
        multiline={true}
        containerStyle={{ marginTop: 25 }}
        onChangeText={() => console.log("sadas")}
      />
      <SezinTimePicker
        placeholderText="Bitiş Saati"
        onValueChange={date => console.log(date)}
      />
      <SezinLoadingButton
        loading={false}
        onPress={() => {
          console.log("berkelmas");
        }}
        color={colors.blue}
        overlayColor={colors.darkBlue}
        text="Giriş Yap"
        containerStyle={{ marginTop: 50 }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});

DailyReportScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default DailyReportScreen;
